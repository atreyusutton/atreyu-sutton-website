// Fills EMPTY fields only, so every project renders and the layout can be
// reviewed end to end. Real answers are never overwritten. Anything this
// touches is marked "mock": true and says PLACEHOLDER on its face, so it can
// be found and removed with one grep.
//
//   node scripts/fill-mock-content.mjs

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const projectsDir = path.join(root, 'src/content/projects')

// Written from looking at the actual files. These are real descriptions, not mock.
const REAL_ALT = {
  'risd-car-design': 'Pencil concept sketches of a mid engine sports car, front, rear, side and three quarter views with wheel studies',
  'e-bike-build': 'White line drawing of an electric dirt bike on black, side view plus three front elevations showing the battery box',
  'nest-messages': 'NEST Messages landing page, a headline about timely messages beside a phone feed of three sample check in messages',
  'brown-creek-designs': 'Architectural render of two Mediterranean style houses standing in still water at sunset, reflected in the surface',
}

const MOCK = 'PLACEHOLDER'
const files = fs.readdirSync(projectsDir).filter((f) => f.endsWith('.json'))
const touched = []

for (const file of files) {
  const filePath = path.join(projectsDir, file)
  const project = JSON.parse(fs.readFileSync(filePath, 'utf8'))
  const before = JSON.stringify(project)
  let mocked = false

  if (!project.hero) {
    project.hero = {
      src: `/placeholder/${project.slug}.svg`,
      alt: `${MOCK} tile for ${project.title}. No photograph shot yet.`,
      width: 1600,
      height: 1200,
    }
    mocked = true
  } else if (!project.hero.alt.trim()) {
    if (REAL_ALT[project.slug]) {
      project.hero.alt = REAL_ALT[project.slug]
    } else {
      project.hero.alt = `${MOCK} description for ${project.title}.`
      mocked = true
    }
  }

  if (!project.oneLine.trim()) {
    project.oneLine = `${MOCK}. One line about ${project.title}, to be written in the studio.`
    mocked = true
  }

  // A number is only required on a featured card. Never invent a plausible one:
  // 000 / TBD reads as unfilled, which is the point.
  if (project.featured && !project.headlineNumber.value.trim()) {
    project.headlineNumber = { value: '000', unit: 'TBD' }
    mocked = true
  }

  if (project.featured) {
    for (const role of ['constraint', 'decision']) {
      const question = project.intake.find((q) => q.role === role)
      if (question && !question.answer.trim()) {
        question.answer = `${MOCK}. ${role === 'constraint' ? 'What made this hard' : 'What was chosen, and the alternative rejected'} goes here. Answer it in /studio.`
        mocked = true
      }
    }
  }

  if (!project.published) {
    project.published = true
    mocked = true
  }

  if (mocked) project.mock = true

  const next = JSON.stringify(project, null, 2) + '\n'
  if (next !== before) {
    fs.writeFileSync(filePath, next)
    if (mocked) touched.push(project.slug)
  }
}

console.log(`mock content: ${touched.length} projects filled`)
