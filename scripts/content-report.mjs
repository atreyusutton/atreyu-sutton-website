// Says what on this site is not real yet. Three questions, one answer each:
// which projects carry placeholder copy, which images are synthetic, and what
// each project still needs before it could be one of the featured eight.
//
//   node scripts/content-report.mjs              the full report
//   node scripts/content-report.mjs --summary    three lines, printed by the build
//   node scripts/content-report.mjs --json       the same data, machine readable
//   node scripts/content-report.mjs --only <slug>
//   node scripts/content-report.mjs --strict     exit 1 if anything placeholder is published
//
// The build used to print a bare list of slugs carrying "mock": true. That flag
// is set by two different scripts for two different reasons, so the list ran
// together "the copy is fake" with "the photograph is fake" and could not say
// which. This reads the content instead of the flag, and separates them.

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const projectsDir = path.join(root, 'src/content/projects')
const publicDir = path.join(root, 'public')

/* The marks each generator leaves behind. Detecting the copy itself rather than
   trusting a flag means a hand edit that fixes a line also clears the report,
   with nothing to remember to unset. */
const PLACEHOLDER = 'PLACEHOLDER'
const GENERATED = '/generated/'
const PLACEHOLDER_TILE = '/placeholder/'
const GENERATED_ALT = /^Generated stand-in image for /
const UNFILLED_NUMBER = /^0+$/
const UNFILLED_UNIT = 'TBD'

/* The bar for the featured eight, from docs/CONTENT-MODEL.md and TODO.md. The
   loader enforces the first three at build time. The last two it cannot: "000"
   is a non-empty string and a generated hero is a real file, so both pass a
   check for presence and fail a check for truth. */
const FEATURE_BAR = [
  { id: 'oneLine', label: 'a one line' },
  { id: 'number', label: 'a measured number' },
  { id: 'constraint', label: 'the constraint' },
  { id: 'decision', label: 'the decision' },
  { id: 'hero', label: 'a real photograph' },
]

/* Not blockers. A project can be featured without these and the template omits
   the section, but the case study is thinner for missing them. */
const CASE_STUDY_BAR = [
  { id: 'broke', label: 'what broke' },
  { id: 'differently', label: 'what I would do differently' },
  { id: 'evidence', label: 'a described gallery image' },
  { id: 'specs', label: 'a spec table' },
]

function readProjects() {
  return fs
    .readdirSync(projectsDir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => JSON.parse(fs.readFileSync(path.join(projectsDir, f), 'utf8')))
    .sort((a, b) => a.slug.localeCompare(b.slug))
}

const answer = (project, role) =>
  (project.intake.find((q) => q.role === role)?.answer ?? '').trim()

const images = (project) => [
  ...(project.hero ? [{ field: 'hero', ...project.hero }] : []),
  ...(project.gallery ?? []).map((image, i) => ({ field: `gallery[${i}]`, ...image })),
]

/** Copy a human did not write. Each entry names the field and what it reads as. */
function placeholderCopy(project) {
  const found = []

  if (project.oneLine.includes(PLACEHOLDER)) {
    found.push({ field: 'oneLine', note: 'one line says PLACEHOLDER' })
  }
  const { value, unit } = project.headlineNumber
  if (value.trim() && UNFILLED_NUMBER.test(value.trim())) {
    found.push({ field: 'headlineNumber', note: `headline number reads "${value} ${unit}"` })
  } else if (unit.trim() === UNFILLED_UNIT) {
    found.push({ field: 'headlineNumber', note: `headline number has no unit, reads "${value} ${unit}"` })
  }
  for (const image of images(project)) {
    if (image.alt.includes(PLACEHOLDER)) {
      found.push({ field: `${image.field}.alt`, note: 'alt text says PLACEHOLDER' })
    } else if (GENERATED_ALT.test(image.alt) && !isSynthetic(image)) {
      // Honest alt text on a synthetic image. On a photograph it is a lie, and
      // it describes the file rather than the object either way.
      found.push({ field: `${image.field}.alt`, note: 'a real photograph is described as a generated stand-in' })
    }
  }
  for (const question of project.intake) {
    if (question.answer.includes(PLACEHOLDER)) {
      found.push({ field: `intake.${question.role}`, note: `the ${question.role} answer says PLACEHOLDER` })
    }
  }

  return found
}

const isSynthetic = (image) =>
  image.src.startsWith(GENERATED) || image.src.startsWith(PLACEHOLDER_TILE)

/** Images that stand in for a photograph nobody has taken. */
function syntheticImages(project) {
  return images(project)
    .filter(isSynthetic)
    .map((image) => ({
      field: image.field,
      src: image.src,
      kind: image.src.startsWith(GENERATED) ? 'generated' : 'placeholder tile',
      onDisk: fs.existsSync(path.join(publicDir, image.src.replace(/^\//, ''))),
      width: image.width,
      height: image.height,
    }))
}

/** Images wired into a project whose file is not in public/. These render broken. */
function missingFiles(project) {
  return images(project)
    .filter((image) => !fs.existsSync(path.join(publicDir, image.src.replace(/^\//, ''))))
    .map((image) => ({ field: image.field, src: image.src }))
}

/* A proposal argues for a thing that does not exist yet, so it carries its own
   sections instead of a constraint, a decision and a failure. Holding it to the
   case study bar would report four gaps it is not supposed to fill. */
const isProposal = (project) => Boolean(project.proposal)

/** What stands between this project and a slot in the eight. */
function featureBlockers(project) {
  const blockers = []
  const placeholders = placeholderCopy(project)
  const has = (field) => placeholders.some((p) => p.field === field)

  if (!project.oneLine.trim() || has('oneLine')) blockers.push('oneLine')
  if (!project.headlineNumber.value.trim() || has('headlineNumber')) blockers.push('number')
  if (!isProposal(project) && !answer(project, 'constraint')) blockers.push('constraint')
  if (!isProposal(project) && !answer(project, 'decision')) blockers.push('decision')

  const hero = project.hero
  if (!hero) blockers.push('hero')
  else if (isSynthetic(hero)) blockers.push('hero')
  else if (!hero.alt.trim() || has('hero.alt')) blockers.push('hero')

  return blockers
}

/** Present but not in Atreyu's voice. The one line came off the old site. */
function voiceWarnings(project) {
  const warnings = []
  if (project.carriedOver && project.oneLine.trim() && !project.oneLine.includes(PLACEHOLDER)) {
    warnings.push('one line is the old site\'s third person copy')
  }
  return warnings
}

/** The sections a case study wants and this project cannot fill yet. */
function caseStudyGaps(project) {
  const gaps = []
  if (!isProposal(project)) {
    if (!answer(project, 'broke')) gaps.push('broke')
    if (!answer(project, 'differently')) gaps.push('differently')
  }
  if (!(project.gallery ?? []).some((image) => image.alt.trim())) gaps.push('evidence')
  if (Object.keys(project.specs ?? {}).length === 0) gaps.push('specs')
  return gaps
}

export function report() {
  const projects = readProjects().map((project) => {
    const placeholders = placeholderCopy(project)
    const synthetic = syntheticImages(project)
    const blockers = featureBlockers(project)
    return {
      slug: project.slug,
      title: project.title,
      lane: project.lane,
      tier: project.tier,
      order: project.order,
      published: project.published,
      featured: project.featured,
      mockFlag: Boolean(project.mock),
      carriedOver: Boolean(project.carriedOver),
      heroSrc: project.hero?.src ?? null,
      placeholderCopy: placeholders,
      syntheticImages: synthetic,
      missingFiles: missingFiles(project),
      featureBlockers: blockers,
      voiceWarnings: voiceWarnings(project),
      caseStudyGaps: caseStudyGaps(project),
      featurable: blockers.length === 0,
    }
  })

  const live = projects.filter((p) => p.published)
  return {
    generatedAt: new Date().toISOString().slice(0, 10),
    totals: {
      projects: projects.length,
      published: live.length,
      featured: projects.filter((p) => p.featured).length,
      placeholderCopy: live.filter((p) => p.placeholderCopy.length > 0).length,
      syntheticImages: live.reduce((n, p) => n + p.syntheticImages.length, 0),
      syntheticHeroes: live.filter((p) => p.syntheticImages.some((i) => i.field === 'hero')).length,
      featurable: projects.filter((p) => p.featurable).length,
      staleMockFlags: projects.filter((p) => p.mockFlag && p.placeholderCopy.length === 0).length,
      missingFiles: projects.reduce((n, p) => n + p.missingFiles.length, 0),
    },
    projects,
  }
}

export function summaryLines(data) {
  const t = data.totals
  return [
    `placeholder copy:   ${t.placeholderCopy} published projects`,
    `synthetic imagery:  ${t.syntheticHeroes} of ${t.published} published heroes`,
    `ready to feature:   ${t.featurable} of ${t.projects} projects`,
  ]
}

/* ---------------------------------------------------------------- printing */

const rule = (title) => `\n${'-'.repeat(72)}\n${title}\n${'-'.repeat(72)}\n`
const list = (ids, bar) => ids.map((id) => bar.find((b) => b.id === id)?.label ?? id).join(', ')

function pad(projects) {
  return Math.max(...projects.map((p) => p.slug.length)) + 2
}

function print(data, { only } = {}) {
  const all = only ? data.projects.filter((p) => p.slug === only) : data.projects
  if (all.length === 0) {
    console.error(`No project called "${only}". Look in src/content/projects/ for the list.`)
    process.exitCode = 1
    return
  }
  const t = data.totals
  const w = pad(all)

  if (only) {
    console.log(`CONTENT REPORT   ${data.generatedAt}   ${only} only`)
  } else {
    console.log(`CONTENT REPORT   ${data.generatedAt}`)
    console.log(
      `${t.projects} projects, ${t.published} published, ${t.featured} featured, ` +
        `${t.projects - t.published} held back`,
    )
    console.log('')
    for (const line of summaryLines(data)) console.log(`  ${line}`)
  }

  /* 1. Copy nobody wrote. */
  console.log(rule('1  PLACEHOLDER COPY'))
  console.log('Written by scripts/fill-mock-content.mjs to make the layout reviewable.')
  console.log('It reads as PLACEHOLDER or 000 TBD on the page. Answer it in /studio.')
  console.log('')

  const withCopy = all.filter((p) => p.placeholderCopy.length > 0)
  if (withCopy.length === 0) {
    console.log(only ? '  None.' : '  None. Every line on the site was written by a person.')
  } else {
    for (const p of withCopy) {
      const flag = p.published ? (p.featured ? `FEATURED, slot ${p.order}` : 'live') : 'held back'
      console.log(`  ${p.slug.padEnd(w)}${flag}`)
      for (const item of p.placeholderCopy) console.log(`  ${' '.repeat(w)}${item.note}`)
    }
  }

  const stale = all.filter((p) => p.mockFlag && p.placeholderCopy.length === 0)
  if (stale.length > 0) {
    console.log('')
    console.log(`  Carrying "mock": true with no placeholder copy left (${stale.length}).`)
    console.log('  The image generator and the copy filler set the same flag, so this is')
    console.log('  either a synthetic photograph, listed below, or a flag left set after')
    console.log('  the copy was fixed. Nothing here still reads as placeholder.')
    console.log(wrap(stale.map((p) => p.slug).join(', '), '    '))
  }

  /* 2. Images nobody took. */
  console.log(rule('2  SYNTHETIC IMAGERY'))
  console.log('From scripts/generate-images.mjs, labelled as stand-ins wherever they render.')
  console.log('Replacing one is one file and one command:')
  console.log('  npm run image:add -- <slug> <file.jpeg> --hero --alt "what is in the frame"')
  console.log('')

  const synthetic = all.flatMap((p) =>
    p.syntheticImages.map((image) => ({
      dir: image.src.slice(0, image.src.lastIndexOf('/') + 1),
      file: image.src.slice(image.src.lastIndexOf('/') + 1),
      where: p.featured ? `slot ${p.order}` : p.published ? p.tier : 'held back',
      size: image.onDisk ? `${image.width}x${image.height}` : 'NOT ON DISK',
      slug: p.slug,
      field: image.field,
    })),
  )

  if (synthetic.length === 0) {
    console.log(only ? '  None.' : '  None. Every image on the site is a photograph of something real.')
  } else {
    for (const dir of [...new Set(synthetic.map((i) => i.dir))].sort()) {
      const group = synthetic.filter((i) => i.dir === dir)
      console.log(`  ${dir}  (${group.length})`)
      for (const i of group) {
        // Every generator names the file after the slug, so printing it again
        // costs a column and says nothing. Print it only when it does not match.
        const named = i.file.replace(/\.[^.]+$/, '') === i.slug ? '' : `  ${i.file}`
        console.log(`    ${i.slug.padEnd(w)}${i.where.padEnd(11)}${i.field.padEnd(11)}${i.size}${named}`)
      }
    }
  }

  const broken = all.filter((p) => p.missingFiles.length > 0)
  if (broken.length > 0) {
    console.log('')
    console.log('  Wired to a file that is not in public/. These render broken.')
    for (const p of broken) {
      for (const file of p.missingFiles) console.log(`    ${p.slug.padEnd(w)}${file.field}  ${file.src}`)
    }
  }

  /* 3. The gap to a featured slot. */
  console.log(rule('3  WHAT EACH PROJECT NEEDS BEFORE IT COULD BE FEATURED'))
  console.log('The bar, from docs/CONTENT-MODEL.md and TODO.md: a one line, a measured')
  console.log('number, the constraint, the decision, and a real photograph with alt text.')
  console.log('"thin" is what the case study page would omit, which does not block a slot.')

  const featured = all.filter((p) => p.featured).sort((a, b) => (a.order ?? 99) - (b.order ?? 99))
  if (featured.length > 0) {
    console.log('')
    console.log('The eight, in slot order. Anything listed here is on the site now.')
    console.log('')
    for (const p of featured) printProject(p, w, `${String(p.order).padStart(2)}  `)
  }

  const rest = all
    .filter((p) => !p.featured)
    .sort((a, b) => a.featureBlockers.length - b.featureBlockers.length || a.slug.localeCompare(b.slug))
  if (rest.length > 0) {
    console.log('')
    console.log('Everything else, closest to featurable first. The leading digit is how')
    console.log('many of the five it still needs.')
    console.log('')
    for (const p of rest) printProject(p, w, `${String(p.featureBlockers.length)}   `)
  }

  console.log('')
}

function printProject(p, w, prefix) {
  const indent = ' '.repeat(prefix.length + w)
  const needs = p.featureBlockers.length === 0 ? 'ready' : list(p.featureBlockers, FEATURE_BAR)
  const tag = p.published ? '' : ' (held back)'
  console.log(wrap(needs + tag, indent, `${prefix}${p.slug.padEnd(w)}`))
  for (const warning of p.voiceWarnings) console.log(wrap(`voice: ${warning}`, indent))
  if (p.caseStudyGaps.length > 0) {
    console.log(wrap(`thin: ${list(p.caseStudyGaps, CASE_STUDY_BAR)}`, indent))
  }
}

/** Keeps the long comma lists inside 80 columns without hand wrapping them. */
function wrap(text, indent, firstPrefix = indent) {
  const lines = []
  let line = firstPrefix
  let start = firstPrefix
  for (const word of text.split(' ')) {
    if (line.length + word.length + 1 > 80 && line !== start) {
      lines.push(line)
      line = indent
      start = indent
    }
    line += (line === start ? '' : ' ') + word
  }
  lines.push(line)
  return lines.join('\n')
}

/* -------------------------------------------------------------------- main */

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  const args = process.argv.slice(2)
  const onlyIndex = args.indexOf('--only')
  const data = report()

  if (args.includes('--json')) {
    console.log(JSON.stringify(data, null, 2))
  } else if (args.includes('--summary')) {
    for (const line of summaryLines(data)) console.log(`  ${line}`)
  } else {
    print(data, { only: onlyIndex === -1 ? null : args[onlyIndex + 1] })
  }

  // A published project reading PLACEHOLDER is the one failure that costs a job.
  if (args.includes('--strict') && data.totals.placeholderCopy > 0) {
    console.error(`\n${data.totals.placeholderCopy} published projects carry placeholder copy.`)
    process.exitCode = 1
  }
}
