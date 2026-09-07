// Generates a hero image per project with the OpenAI Images API and wires it
// into src/content/projects/*.json. Only touches projects still pointing at a
// /placeholder/ tile, so a real photograph is never overwritten.
//
// These are synthetic images of things Atreyu did not photograph. They are for
// reviewing layout, not for shipping. Everything written here lands in
// public/generated/ and keeps its mock flag, so it is one grep to find.
//
//   node scripts/generate-images.mjs --only engine-rebuild     one project
//   node scripts/generate-images.mjs --limit 3                 first three
//   node scripts/generate-images.mjs --dry-run                 print prompts only
//   node scripts/generate-images.mjs                           all remaining
//
// Flags: --quality low|medium|high  --size 1536x1024|1024x1024|1024x1536
//        --model gpt-image-1|dall-e-3   --force  regenerate existing generated images
//
// gpt-image-1 needs a verified organisation on some accounts. If it returns 403
// about verification, pass --model dall-e-3, which has no such requirement.

import fs from 'node:fs'
import { execFileSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const projectsDir = path.join(root, 'src/content/projects')
const outDir = path.join(root, 'public/generated')

const args = process.argv.slice(2)
const flag = (name, fallback = null) => {
  const i = args.indexOf(`--${name}`)
  return i === -1 ? fallback : args[i + 1]
}
const has = (name) => args.includes(`--${name}`)

const only = flag('only')
const limit = Number(flag('limit', '0')) || 0
const quality = flag('quality', 'low')
const model = flag('model', 'gpt-image-1')
const size = flag('size', model === 'dall-e-3' ? '1792x1024' : '1536x1024')
const dryRun = has('dry-run')
const force = has('force')

// .env.local is never committed and is read here, never written.
function loadKey() {
  if (process.env.OPENAI_API_KEY) return process.env.OPENAI_API_KEY
  const envFile = path.join(root, '.env.local')
  if (fs.existsSync(envFile)) {
    for (const raw of fs.readFileSync(envFile, 'utf8').split('\n')) {
      const line = raw.trim()
      if (!line || line.startsWith('#')) continue

      const named = line.match(/^(?:export\s+)?OPENAI_API_KEY\s*=\s*(.+?)\s*$/)
      if (named) return named[1].replace(/^["']|["']$/g, '')

      // A file holding nothing but the key itself is a common way to save it.
      const bare = line.replace(/^["']|["']$/g, '')
      if (/^sk-[A-Za-z0-9_-]{20,}$/.test(bare)) return bare
    }
  }
  return null
}

// Setting only. The subject is the project title itself: leading with the lane
// gave eight hardware projects the same breadboard photograph.
const LANE_SETTING = {
  mechanical: 'On a workshop bench, with a hint of machining tools nearby.',
  fab: 'On a fabrication bench, with a hint of welding and metalwork nearby.',
  hardware: 'On an electronics bench, with a hint of wiring and tools nearby.',
  software: 'Shown running on a screen on a plain desk.',
  writing: 'On a desk, with a notebook and pencil nearby.',
}

function promptFor(project) {
  const noPeople =
    'Absolutely no people, no hands, no arms, no bodies. No text, no logos, no lettering, ' +
    'no signage, no watermarks. Realistic and understated, not a render and not an advertisement.'
  const light = 'Plain natural light, muted colours, shallow depth of field.'

  // An imagePrompt on the project describes the subject in Atreyu's words and
  // wins over the lane heuristic below. The lane rules guess from a title, which
  // is wrong whenever the title is a product name rather than a description.
  if (project.imagePrompt) {
    return `Still life photograph of ${project.imagePrompt} ${light} ${noPeople}`
  }

  // Naming a software product makes the model render the name as a sign, in
  // garbled lettering. Physical projects are the opposite: the title is the
  // single most useful thing in the prompt.
  if (project.lane === 'software' || project.lane === 'writing') {
    const subject =
      project.lane === 'writing'
        ? 'an open blank notebook and a pencil on a plain desk'
        : 'a plain desktop monitor on a plain desk, screen showing an abstract blank grey interface'
    return `Still life photograph of ${subject}. ${light} ${noPeople}`
  }

  const setting = LANE_SETTING[project.lane] ?? LANE_SETTING.mechanical
  return (
    `Still life photograph of a ${project.title}. The subject of the photograph is the ` +
    `${project.title} itself, shown clearly as the main object in frame. ${setting} ` +
    `${light} ${noPeople}`
  )
}

function jpegDimensions(buffer) {
  let i = 2
  while (i < buffer.length - 9) {
    if (buffer[i] !== 0xff) {
      i += 1
      continue
    }
    const marker = buffer[i + 1]
    if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
      return { height: buffer.readUInt16BE(i + 5), width: buffer.readUInt16BE(i + 7) }
    }
    i += 2 + buffer.readUInt16BE(i + 2)
  }
  throw new Error('Could not read JPEG dimensions')
}

// A 2MB PNG per hero is 47MB across the set, against a Lighthouse 95 target on
// a static host. sips ships with macOS, so this adds no dependency.
function toJpeg(pngPath, jpegPath) {
  execFileSync(
    'sips',
    ['-s', 'format', 'jpeg', '-s', 'formatOptions', '82', '-Z', '1600', pngPath, '--out', jpegPath],
    { stdio: 'ignore' },
  )
  fs.unlinkSync(pngPath)
  return fs.readFileSync(jpegPath)
}

async function generate(key, project) {
  const response = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
    body: JSON.stringify(
      // The two models take different options: dall-e-3 needs an explicit
      // response_format and rejects the low/medium/high quality scale.
      model === 'dall-e-3'
        ? { model, prompt: promptFor(project), size, response_format: 'b64_json', n: 1 }
        : { model, prompt: promptFor(project), size, quality, n: 1 },
    ),
  })

  const text = await response.text()
  if (!response.ok) {
    let detail = text.slice(0, 400)
    try {
      detail = JSON.parse(text).error?.message ?? detail
    } catch {
      // Keep the raw body: a proxy or gateway error is not always JSON.
    }
    if (response.status === 403 && /verif/i.test(detail)) {
      detail += '  ->  retry with: npm run images:generate -- --model dall-e-3'
    }
    if (response.status === 401) {
      detail += '  ->  the key was rejected. Check it is an API key from platform.openai.com.'
    }
    if (response.status === 429) {
      detail += '  ->  rate limited or out of credit. Check billing at platform.openai.com.'
    }
    throw new Error(`OpenAI returned ${response.status}: ${detail}`)
  }

  const payload = JSON.parse(text)
  const b64 = payload.data?.[0]?.b64_json
  if (!b64) throw new Error('No image data in the response')
  return Buffer.from(b64, 'base64')
}

const key = loadKey()
if (!key && !dryRun) {
  console.error('No OPENAI_API_KEY found.')
  console.error('Put it in .env.local as:  OPENAI_API_KEY=sk-...')
  console.error('Then re-run. Use --dry-run to preview prompts without a key.')
  process.exit(1)
}

let projects = fs
  .readdirSync(projectsDir)
  .filter((f) => f.endsWith('.json'))
  .map((f) => ({ file: path.join(projectsDir, f), data: JSON.parse(fs.readFileSync(path.join(projectsDir, f), 'utf8')) }))
  .filter(({ data }) => {
    if (!data.hero) return true
    if (data.hero.src.startsWith('/placeholder/')) return true
    if (force && data.hero.src.startsWith('/generated/')) return true
    return false
  })
  .sort((a, b) => a.data.slug.localeCompare(b.data.slug))

if (only) projects = projects.filter(({ data }) => data.slug === only)
if (limit) projects = projects.slice(0, limit)

if (projects.length === 0) {
  console.log('Nothing to generate. Every project already has a non placeholder image.')
  process.exit(0)
}

console.log(
  `${projects.length} to generate, model=${model} size=${size}` +
    `${model === 'dall-e-3' ? '' : ` quality=${quality}`}${dryRun ? ' (dry run)' : ''}`,
)
fs.mkdirSync(outDir, { recursive: true })

let done = 0
let failed = 0
for (const { file, data } of projects) {
  if (dryRun) {
    console.log(`\n  ${data.slug}\n    ${promptFor(data)}`)
    continue
  }

  process.stdout.write(`  ${data.slug} ... `)
  try {
    const raw = await generate(key, data)
    const pngPath = path.join(outDir, `${data.slug}.png`)
    const jpegPath = path.join(outDir, `${data.slug}.jpg`)
    fs.writeFileSync(pngPath, raw)
    const buffer = toJpeg(pngPath, jpegPath)
    const { width, height } = jpegDimensions(buffer)
    const rel = `/generated/${data.slug}.jpg`

    data.hero = {
      src: rel,
      alt: `Generated stand-in image for ${data.title}. Not a photograph of the real build.`,
      width,
      height,
    }
    data.mock = true
    fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n')
    console.log(`${width}x${height}, ${(buffer.length / 1024).toFixed(0)}KB`)
    done += 1
  } catch (error) {
    console.log(`FAILED: ${error.message}`)
    failed += 1
  }
}

if (!dryRun) {
  console.log(`\ngenerated ${done}, failed ${failed}`)
  if (done > 0) console.log('Run `npm run content:bundle` to refresh the studio bundle.')
  if (failed > 0) process.exitCode = 1
}
