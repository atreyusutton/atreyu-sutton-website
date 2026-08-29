// Parses docs/INTAKE-QUESTIONS.md into one JSON file per project under
// src/content/projects/. Existing files are left alone unless --force is
// passed, so answers written in the studio are never clobbered by a re-run.
//
//   node scripts/intake-to-content.mjs [--force]

import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const intakePath = path.join(root, 'docs/INTAKE-QUESTIONS.md')
const outDir = path.join(root, 'src/content/projects')
const force = process.argv.includes('--force')

// Question order maps onto the case study template. The role is what the page
// renders the answer as, so the studio and the site stay in one vocabulary.
const ROLE_BY_INDEX = ['oneLine', 'meta', 'constraint', 'decision', 'number', 'broke', 'media']
const INDEX_ROLE_BY_INDEX = ['oneLine', 'number', 'media']

// Added to featured projects only. The case study template requires it and the
// intake doc predates that decision.
const DIFFERENTLY = {
  role: 'differently',
  question: "What would you do differently?",
  hint: 'Two sentences. Not self criticism, a design judgement you would make differently now.',
  draft: '',
  answer: '',
}

const SLUGS = {
  'LandedTheJob': 'landedthejob',
  'Engine Rebuild': 'engine-rebuild',
  'Digital Record Player': 'digital-record-player',
  'FSAE Team': 'fsae-team',
  'Japanese Motor Market': 'japanese-motor-market',
  'RISD Car Design': 'risd-car-design',
  'Phantom Typewriter': 'phantom-typewriter',
  'Coleman Frame': 'coleman-frame',
  'Mosquito Drone': 'mosquito-drone',
  'NEST Messages': 'nest-messages',
  'EchoPilot': 'echopilot',
  'Valdra Outside': 'valdra-outside',
  'Land Finder ("something")': 'land-finder',
  'Client Work (Sutton Web Solutions, Ute Pass)': 'client-work',
  'Yosemite Sam Alarm Clock': 'yosemite-sam-alarm-clock',
  'Computer Case': 'computer-case',
  'Custom Car Radio (3D print)': 'custom-car-radio',
  'Backpack Frame': 'backpack-frame',
  '4Runners and the Pickup': '4runners-and-the-pickup',
  'PICO-8 Games': 'pico-8-games',
  'Creative Tech Coursework': 'creative-tech-coursework',
  'Resume Maker': 'resume-maker',
  'Flame Thrower': 'flame-thrower',
  'Plasma Gun': 'plasma-gun',
  'Motorized La-Z-Boy': 'motorized-la-z-boy',
  'Angel Pyro Sculpture': 'angel-pyro-sculpture',
  'Bird Cage': 'bird-cage',
  'Physical Scrabble Work Finder': 'physical-scrabble-work-finder',
  'Car Exhaust': 'car-exhaust',
  '3D Printed Car Parts': '3d-printed-car-parts',
  'Ducati': 'ducati-s2r',
  'Yestermorrow + North Carolina (essay)': 'yestermorrow-north-carolina',
}

const LANES = {
  Software: 'software',
  Mech: 'mechanical',
  Hardware: 'hardware',
  Fab: 'fab',
  Writing: 'writing',
}

// Image folders already in public/, mapped to the project that owns them.
// hero is the first entry. Dimensions get measured, never guessed.
const MEDIA = {
  '4runners-and-the-pickup': { dir: '1985-toyota-4runner', hero: 'hero.jpeg' },
  'ducati-s2r': { dir: '2006-ducati-s2r', hero: 'ducati-2-hero.jpeg' },
  'risd-car-design': { dir: 'risd-project-car', hero: 'risd-car-1-hero.jpeg' },
  'computer-case': { dir: 'computer-case-build', hero: 'computer-case-1-hero.png' },
  'resume-maker': { dir: 'resume-maker', hero: 'resume-1-hero.png' },
  'nest-messages': { dir: 'nest-messages', hero: 'nest-messages-1-hero.png' },
  'valdra-outside': { dir: 'valdra-outside', hero: 'valdra-outside-1-hero.png' },
  'japanese-motor-market': { dir: 'fuelfed-motor-market', hero: null },
  'client-work': { dir: 'sutton-web-solutions', hero: 'sutton-web-1-hero.png' },
}

function measure(file) {
  try {
    const out = execFileSync('sips', ['-g', 'pixelWidth', '-g', 'pixelHeight', file], {
      encoding: 'utf8',
    })
    const width = Number(out.match(/pixelWidth:\s*(\d+)/)?.[1])
    const height = Number(out.match(/pixelHeight:\s*(\d+)/)?.[1])
    return Number.isFinite(width) && Number.isFinite(height) ? { width, height } : null
  } catch {
    return null
  }
}

function mediaFor(slug) {
  const entry = MEDIA[slug]
  if (!entry) return { hero: null, gallery: [] }
  const dir = path.join(root, 'public', entry.dir)
  if (!fs.existsSync(dir)) return { hero: null, gallery: [] }

  const files = fs
    .readdirSync(dir)
    .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
    .sort()

  const build = (file) => {
    const dims = measure(path.join(dir, file))
    if (!dims) return null
    // alt is left empty on purpose. The loader fails the build on a published
    // image with no alt, which forces a real description rather than a filename.
    return { src: `/${entry.dir}/${file}`, alt: '', width: dims.width, height: dims.height }
  }

  const heroFile = entry.hero && files.includes(entry.hero) ? entry.hero : null
  const hero = heroFile ? build(heroFile) : null
  const gallery = files.filter((f) => f !== heroFile).map(build).filter(Boolean)
  return { hero, gallery }
}

function parseIntake(markdown) {
  const lines = markdown.split('\n')
  const projects = []
  let tier = null
  let current = null
  let question = null
  let buffer = []
  let mode = null // 'hint' | 'draft'

  const flush = () => {
    if (!question) return
    const text = buffer.join('\n').trim()
    if (mode === 'draft') question.draft = text
    question.hint = question.hint.trim()
    buffer = []
    mode = null
  }

  const closeProject = () => {
    flush()
    if (current) projects.push(current)
    current = null
    question = null
  }

  for (const line of lines) {
    const h1 = line.match(/^# (.+)/)
    if (h1) {
      closeProject()
      const heading = h1[1].toUpperCase()
      if (heading.includes('FEATURED')) tier = 'featured'
      else if (heading.includes('SWAP')) tier = 'swap'
      else if (heading.includes('INDEX')) tier = 'index'
      else if (heading.includes('WRITING')) tier = 'writing'
      continue
    }

    const h2 = line.match(/^## (.+)/)
    if (h2 && tier) {
      closeProject()
      const raw = h2[1].trim()
      const laneMatch = raw.match(/\s*\[([^\]]+)\]\s*$/)
      const lane = LANES[laneMatch?.[1]?.trim()] ?? 'mechanical'
      const withoutLane = raw.replace(/\s*\[[^\]]+\]\s*$/, '').trim()
      const orderMatch = withoutLane.match(/^(\d+)\.\s*(.+)$/)
      const title = (orderMatch ? orderMatch[2] : withoutLane).trim()
      const slug = SLUGS[title]
      if (!slug) throw new Error(`No slug mapped for project "${title}". Add it to SLUGS.`)
      current = {
        slug,
        title,
        lane,
        tier,
        order: orderMatch ? Number(orderMatch[1]) : null,
        intake: [],
      }
      continue
    }

    if (!current) continue

    const h3 = line.match(/^### (.+)/)
    if (h3) {
      flush()
      const text = h3[1].replace(/^Q\d+\.\s*/, '').trim()
      const roles = current.tier === 'index' ? INDEX_ROLE_BY_INDEX : ROLE_BY_INDEX
      question = {
        role: roles[current.intake.length] ?? 'note',
        question: text,
        hint: '',
        draft: '',
        answer: '',
      }
      current.intake.push(question)
      mode = 'hint'
      continue
    }

    if (!question) continue

    if (/^\*\*DRAFTED FROM YOUR REPO/.test(line)) {
      flush()
      mode = 'draft'
      continue
    }
    if (/^_{5,}/.test(line)) {
      flush()
      continue
    }
    if (/^---\s*$/.test(line)) {
      flush()
      continue
    }

    if (mode === 'hint') {
      const quoted = line.match(/^>\s?(.*)$/)
      if (quoted) question.hint += (question.hint ? ' ' : '') + quoted[1].trim()
      continue
    }
    if (mode === 'draft') buffer.push(line)
  }

  closeProject()
  return projects
}

const parsed = parseIntake(fs.readFileSync(intakePath, 'utf8'))
fs.mkdirSync(outDir, { recursive: true })

let written = 0
let skipped = 0

for (const project of parsed) {
  const file = path.join(outDir, `${project.slug}.json`)
  if (fs.existsSync(file) && !force) {
    skipped += 1
    continue
  }

  const intake = [...project.intake]
  if (project.tier === 'featured' || project.tier === 'swap') intake.push({ ...DIFFERENTLY })

  const { hero, gallery } = mediaFor(project.slug)

  const doc = {
    slug: project.slug,
    title: project.title,
    lane: project.lane,
    tier: project.tier,
    order: project.order,
    // Nothing publishes until it is answered and confirmed in the studio.
    published: false,
    featured: project.tier === 'featured',
    status: 'in-progress',
    oneLine: '',
    headlineNumber: { value: '', unit: '' },
    specs: {},
    hero,
    gallery,
    video: null,
    links: [],
    intake,
  }

  fs.writeFileSync(file, JSON.stringify(doc, null, 2) + '\n')
  written += 1
}

console.log(`content: ${written} written, ${skipped} left alone (use --force to overwrite)`)
