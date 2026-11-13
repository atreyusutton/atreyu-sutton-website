// Rolls src/content/projects/*.json plus about.json into a single file the
// studio can fetch at runtime. Runs before every build and dev start.
//
//   node scripts/build-content-bundle.mjs

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { report, summaryLines } from './content-report.mjs'

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

// Nothing unfinished should reach a hiring manager by accident. The detail is a
// report of its own rather than a wall of slugs printed on every build.
const state = report()
console.log('')
for (const line of summaryLines(state)) console.log(`  ${line}`)
console.log('')
console.log('  npm run content:report   what each project is still missing')
console.log('')
