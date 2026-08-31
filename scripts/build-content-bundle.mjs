// Rolls src/content/projects/*.json plus about.json into a single file the
// studio can fetch at runtime. Runs before every build and dev start.
//
//   node scripts/build-content-bundle.mjs

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const projectsDir = path.join(root, 'src/content/projects')
const outFile = path.join(root, 'public/content/bundle.json')

const projects = fs
  .readdirSync(projectsDir)
  .filter((f) => f.endsWith('.json'))
  .map((f) => JSON.parse(fs.readFileSync(path.join(projectsDir, f), 'utf8')))
  .sort((a, b) => a.title.localeCompare(b.title))

const about = JSON.parse(fs.readFileSync(path.join(root, 'src/content/about.json'), 'utf8'))

fs.mkdirSync(path.dirname(outFile), { recursive: true })
fs.writeFileSync(
  outFile,
  JSON.stringify({ version: 1, projects, about }, null, 2) + '\n',
)

console.log(`bundle: ${projects.length} projects written to public/content/bundle.json`)

// Placeholder copy must never reach a hiring manager by accident.
const mock = projects.filter((p) => p.mock).map((p) => p.slug)
if (mock.length > 0) {
  console.log('')
  console.log(`  !!  ${mock.length} projects carry PLACEHOLDER content and are set to published.`)
  console.log('  !!  Do not deploy this. Answer them in /studio, then clear the mock flag.')
  console.log(`  !!  ${mock.join(', ')}`)
  console.log('')
}
