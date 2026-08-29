// Takes a bundle.json downloaded from /studio and writes it back into
// src/content/projects/*.json and src/content/about.json, one file per project.
// This is the only way studio edits become site content.
//
//   node scripts/apply-content-bundle.mjs ~/Downloads/bundle.json

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const projectsDir = path.join(root, 'src/content/projects')

const input = process.argv[2]
if (!input) {
  console.error('Usage: node scripts/apply-content-bundle.mjs <path-to-bundle.json>')
  process.exit(1)
}

const bundlePath = path.resolve(process.cwd(), input)
if (!fs.existsSync(bundlePath)) {
  console.error(`No such file: ${bundlePath}`)
  process.exit(1)
}

let bundle
try {
  bundle = JSON.parse(fs.readFileSync(bundlePath, 'utf8'))
} catch (error) {
  console.error(`That file is not valid JSON: ${error.message}`)
  process.exit(1)
}

if (!Array.isArray(bundle?.projects)) {
  console.error('Bundle has no projects array. Wrong file?')
  process.exit(1)
}

const changed = []

for (const project of bundle.projects) {
  if (!project.slug) {
    console.error('Skipping a project with no slug.')
    continue
  }
  const file = path.join(projectsDir, `${project.slug}.json`)
  const next = JSON.stringify(project, null, 2) + '\n'
  const previous = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : null
  if (previous === next) continue
  fs.writeFileSync(file, next)
  changed.push(project.slug)
}

if (bundle.about) {
  const file = path.join(root, 'src/content/about.json')
  const next = JSON.stringify(bundle.about, null, 2) + '\n'
  if (fs.readFileSync(file, 'utf8') !== next) {
    fs.writeFileSync(file, next)
    changed.push('about')
  }
}

if (changed.length === 0) {
  console.log('apply: nothing changed.')
} else {
  console.log(`apply: updated ${changed.length} file(s):`)
  for (const slug of changed) console.log(`  ${slug}`)
  console.log('\nReview with `git diff`, then commit.')
}
