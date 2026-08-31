// Builds a single HTML page of every generated hero, for reviewing the whole
// set at a glance. Screenshot it, or just open it in a browser.
//
//   node scripts/contact-sheet.mjs [outfile.html]

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const projectsDir = path.join(root, 'src/content/projects')
const out = process.argv[2] ?? path.join(root, 'contact-sheet.html')

const projects = fs
  .readdirSync(projectsDir)
  .filter((f) => f.endsWith('.json'))
  .map((f) => JSON.parse(fs.readFileSync(path.join(projectsDir, f), 'utf8')))
  .filter((p) => p.hero?.src.startsWith('/generated/'))
  .sort((a, b) => a.slug.localeCompare(b.slug))

const cells = projects
  .map(
    (p) => `<figure>
      <img src="${path.join(root, 'public')}${p.hero.src}" alt="">
      <figcaption><b>${p.title}</b><span>${p.lane} / ${p.slug}</span></figcaption>
    </figure>`,
  )
  .join('\n')

fs.writeFileSync(
  out,
  `<!doctype html><meta charset="utf-8"><title>Generated heroes</title>
<style>
  body { margin: 0; padding: 24px; background: #edeee9; font: 13px/1.4 -apple-system, system-ui, sans-serif; color: #161a17 }
  h1 { font-size: 20px; margin: 0 0 4px }
  p.count { margin: 0 0 20px; color: #4c534d }
  .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px }
  figure { margin: 0 }
  img { width: 100%; aspect-ratio: 3/2; object-fit: cover; display: block; border: 1px solid #cbcec5 }
  figcaption { padding-top: 6px; display: flex; flex-direction: column }
  figcaption span { color: #6f7770; font-family: ui-monospace, monospace; font-size: 11px }
</style>
<h1>Generated heroes</h1>
<p class="count">${projects.length} images. All synthetic, all marked mock.</p>
<div class="grid">${cells}</div>
`,
)

console.log(`contact sheet: ${projects.length} images -> ${out}`)
