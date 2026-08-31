// Generates a stand-in hero for any project that has no image yet, so the
// layout can be reviewed end to end. These are deliberately not photographs:
// they say PLACEHOLDER on their face so nothing here can be mistaken for work.
//
//   node scripts/make-placeholders.mjs

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const projectsDir = path.join(root, 'src/content/projects')
const outDir = path.join(root, 'public/placeholder')

export const PLACEHOLDER_W = 1600
export const PLACEHOLDER_H = 1200

const escape = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

// Wraps on spaces so a long title does not run off the tile.
function wrap(text, perLine) {
  const words = text.split(/\s+/)
  const lines = []
  let line = ''
  for (const word of words) {
    if (line && (line + ' ' + word).length > perLine) {
      lines.push(line)
      line = word
    } else {
      line = line ? line + ' ' + word : word
    }
  }
  if (line) lines.push(line)
  return lines
}

/** Deterministic per slug, so a tile never changes shape between runs. */
function seedFrom(text) {
  let h = 2166136261
  for (let i = 0; i < text.length; i += 1) {
    h ^= text.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function rng(seed) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// Four grounds, so a grid of these has tonal rhythm instead of reading as one
// flat block. All four are the site's own surface tones.
const GROUNDS = ['#e9eae5', '#e3e5de', '#dcdfd6', '#d4d8ce']

/** A drafting sheet, not a picture: outlined forms, a grid, dimension ticks. */
function composition(random) {
  const cx = PLACEHOLDER_W / 2
  const cy = PLACEHOLDER_H / 2
  const stroke = '#b6bbaf'
  const parts = []
  const kind = Math.floor(random() * 4)
  const r = 210 + random() * 130

  if (kind === 0) {
    parts.push(`<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${stroke}" stroke-width="3"/>`)
    parts.push(`<circle cx="${cx}" cy="${cy}" r="${r * 0.58}" fill="none" stroke="${stroke}" stroke-width="3"/>`)
  } else if (kind === 1) {
    const w = r * 1.9
    const h = r * 1.25
    parts.push(`<rect x="${cx - w / 2}" y="${cy - h / 2}" width="${w}" height="${h}" fill="none" stroke="${stroke}" stroke-width="3"/>`)
    parts.push(`<line x1="${cx - w / 2}" y1="${cy - h / 2}" x2="${cx + w / 2}" y2="${cy + h / 2}" stroke="${stroke}" stroke-width="2"/>`)
  } else if (kind === 2) {
    parts.push(`<polygon points="${cx},${cy - r} ${cx + r},${cy + r * 0.7} ${cx - r},${cy + r * 0.7}" fill="none" stroke="${stroke}" stroke-width="3"/>`)
  } else {
    parts.push(`<path d="M ${cx - r} ${cy + r * 0.6} A ${r} ${r} 0 0 1 ${cx + r} ${cy + r * 0.6}" fill="none" stroke="${stroke}" stroke-width="3"/>`)
    parts.push(`<line x1="${cx - r}" y1="${cy + r * 0.6}" x2="${cx + r}" y2="${cy + r * 0.6}" stroke="${stroke}" stroke-width="3"/>`)
  }

  // Dimension ticks along the bottom, offset per project.
  const step = 120 + Math.floor(random() * 60)
  for (let x = step; x < PLACEHOLDER_W; x += step) {
    parts.push(`<line x1="${x}" y1="${PLACEHOLDER_H - 44}" x2="${x}" y2="${PLACEHOLDER_H - 20}" stroke="#c3c7bc" stroke-width="2"/>`)
  }
  return parts.join('\n  ')
}

export function placeholderSvg(title, slug) {
  const random = rng(seedFrom(slug))
  const ground = GROUNDS[Math.floor(random() * GROUNDS.length)]
  const art = composition(random)

  const lines = wrap(title, 18)
  // Cards crop these tiles with object-cover, so everything that identifies the
  // tile as a placeholder sits in the middle where no crop can reach it.
  const startY = PLACEHOLDER_H / 2 - (lines.length - 1) * 46 - 40
  const body = lines
    .map(
      (line, i) =>
        `<text x="${PLACEHOLDER_W / 2}" y="${startY + i * 92}" text-anchor="middle" ` +
        `font-family="Archivo, Helvetica Neue, Arial, sans-serif" font-size="76" font-weight="600" ` +
        `fill="#4c534d">${escape(line)}</text>`,
    )
    .join('\n  ')
  const labelY = startY + (lines.length - 1) * 92 + 96

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${PLACEHOLDER_W}" height="${PLACEHOLDER_H}" viewBox="0 0 ${PLACEHOLDER_W} ${PLACEHOLDER_H}" role="img">
  <defs>
    <pattern id="g" width="80" height="80" patternUnits="userSpaceOnUse">
      <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#d0d4c9" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="${PLACEHOLDER_W}" height="${PLACEHOLDER_H}" fill="${ground}"/>
  <rect width="${PLACEHOLDER_W}" height="${PLACEHOLDER_H}" fill="url(#g)"/>
  ${art}
  <rect x="1" y="1" width="${PLACEHOLDER_W - 2}" height="${PLACEHOLDER_H - 2}" fill="none" stroke="#a4aa9c" stroke-width="2"/>
  ${body}
  <text x="${PLACEHOLDER_W / 2}" y="${labelY}" text-anchor="middle" font-family="IBM Plex Mono, ui-monospace, monospace" font-size="34" letter-spacing="7" fill="#5f665e">PLACEHOLDER IMAGE</text>
  <text x="${PLACEHOLDER_W / 2}" y="${labelY + 52}" text-anchor="middle" font-family="IBM Plex Mono, ui-monospace, monospace" font-size="26" letter-spacing="3" fill="#767d73">${escape(slug)}</text>
</svg>
`
}

if (import.meta.url === `file://${process.argv[1]}`) {
  fs.mkdirSync(outDir, { recursive: true })
  let written = 0
  for (const file of fs.readdirSync(projectsDir).filter((f) => f.endsWith('.json'))) {
    const project = JSON.parse(fs.readFileSync(path.join(projectsDir, file), 'utf8'))
    if (project.hero && !project.hero.src.startsWith('/placeholder/')) continue
    fs.writeFileSync(path.join(outDir, `${project.slug}.svg`), placeholderSvg(project.title, project.slug))
    written += 1
  }
  console.log(`placeholders: ${written} written to public/placeholder/`)
}
