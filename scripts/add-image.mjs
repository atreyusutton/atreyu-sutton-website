// Copies an image into public/, measures it, and wires it into a project.
// Dimensions are read from the file rather than typed, which is the bug that
// was sitting in home.jpeg for months.
//
//   node scripts/add-image.mjs <slug> <file> [--hero] [--alt "what is in the frame"]
//
// Without --hero the image is appended to the gallery. An image with no alt
// text never renders, by design, so pass --alt or add it later in /studio.

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const [slug, file, ...rest] = process.argv.slice(2)

if (!slug || !file) {
  console.error('Usage: node scripts/add-image.mjs <slug> <file> [--hero] [--alt "text"]')
  process.exit(1)
}

const isHero = rest.includes('--hero')
const altIndex = rest.indexOf('--alt')
const alt = altIndex === -1 ? '' : (rest[altIndex + 1] ?? '')

const projectFile = path.join(root, 'src/content/projects', `${slug}.json`)
if (!fs.existsSync(projectFile)) {
  console.error(`No project called "${slug}". Look in src/content/projects/ for the list.`)
  process.exit(1)
}
const source = path.resolve(process.cwd(), file)
if (!fs.existsSync(source)) {
  console.error(`No such file: ${source}`)
  process.exit(1)
}

function dimensions(buffer) {
  if (buffer.subarray(0, 8).toString('hex') === '89504e470d0a1a0a') {
    return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) }
  }
  if (buffer[0] === 0xff && buffer[1] === 0xd8) {
    let i = 2
    while (i < buffer.length - 9) {
      if (buffer[i] !== 0xff) { i += 1; continue }
      const marker = buffer[i + 1]
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
        return { height: buffer.readUInt16BE(i + 5), width: buffer.readUInt16BE(i + 7) }
      }
      i += 2 + buffer.readUInt16BE(i + 2)
    }
  }
  throw new Error('Only PNG and JPEG are handled. Convert it first.')
}

const project = JSON.parse(fs.readFileSync(projectFile, 'utf8'))

// Put it beside the project's existing images where there are any, so the
// folder names already in public/ are kept rather than a new one per slug.
const existing = project.hero?.src ?? project.gallery[0]?.src ?? null
const folder =
  existing && !existing.startsWith('/generated/') && !existing.startsWith('/placeholder/')
    ? path.posix.dirname(existing)
    : `/${slug}`

const destDir = path.join(root, 'public', folder)
fs.mkdirSync(destDir, { recursive: true })

const name = path.basename(source)
fs.copyFileSync(source, path.join(destDir, name))

const buffer = fs.readFileSync(path.join(destDir, name))
const { width, height } = dimensions(buffer)
const media = { src: path.posix.join(folder, name), alt, width, height }

if (isHero) project.hero = media
else project.gallery.push(media)

fs.writeFileSync(projectFile, JSON.stringify(project, null, 2) + '\n')

console.log(`${isHero ? 'hero' : 'gallery'}: ${media.src}  ${width}x${height}`)
if (!alt.trim()) {
  console.log('No alt text yet, so this image will not render. Add it in /studio or pass --alt.')
}
