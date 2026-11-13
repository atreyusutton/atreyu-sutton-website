import fs from 'node:fs'
import path from 'node:path'
import type { Project } from './types'

// Reads every JSON file in src/content/projects at build time. Adding, removing
// or swapping a project costs exactly one file here and nothing else, which is
// the hard architectural requirement in CLAUDE.md.

const dir = path.join(process.cwd(), 'src/content/projects')

function validate(project: Project, file: string) {
  function fail(message: string): never {
    throw new Error(`Content error in ${file}: ${message}`)
  }

  if (!project.slug) fail('missing slug')
  if (!project.title) fail('missing title')
  if (!project.published) return

  if (project.featured && project.order === null) fail('featured project needs an order')
  if (project.tier === 'sustainable' && project.order === null) {
    fail('sustainable project needs an order')
  }

  // A stub is a title-only card with nothing behind it yet.
  if (project.stub) return

  if (!project.oneLine.trim()) fail('published with no oneLine')

  // A card may ship without a photograph and say so, but an image that is
  // present must be described. Headline numbers are optional: none is better
  // than an invented one.
  if (project.hero) {
    if (!project.hero.alt.trim()) fail('published hero image has no alt text')
    if (!project.hero.width || !project.hero.height) fail('hero image has no dimensions')
  }
}

let cache: Project[] | null = null

export function allProjects(): Project[] {
  if (cache) return cache

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.json'))
  const projects = files.map((file) => {
    const project = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8')) as Project
    validate(project, file)
    return project
  })

  const orders = new Map<number, string>()
  for (const project of projects) {
    if (!project.published || !project.featured || project.order === null) continue
    const clash = orders.get(project.order)
    if (clash) {
      throw new Error(
        `Content error: ${project.slug} and ${clash} both claim featured slot ${project.order}.`,
      )
    }
    orders.set(project.order, project.slug)
  }

  cache = projects.sort((a, b) => a.title.localeCompare(b.title))
  return cache
}

export function publishedProjects(): Project[] {
  return allProjects().filter((p) => p.published)
}

/** Selected work, in slot order. */
export function featuredProjects(): Project[] {
  return publishedProjects()
    .filter((p) => p.featured)
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99))
}

/** Everything published that is not featured, not an essay and not still ahead. */
export function indexProjects(): Project[] {
  return publishedProjects()
    .filter(
      (p) => !p.featured && p.tier !== 'writing' && p.tier !== 'future' && p.tier !== 'sustainable',
    )
    .sort((a, b) => a.title.localeCompare(b.title))
}

/** The sustainability projects, in the order Atreyu listed them. */
export function sustainableProjects(): Project[] {
  return publishedProjects()
    .filter((p) => p.tier === 'sustainable')
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99))
}

/** Work that is planned but not built. Listed, never presented as finished. */
export function futureProjects(): Project[] {
  return publishedProjects()
    .filter((p) => p.tier === 'future')
    .sort((a, b) => a.title.localeCompare(b.title))
}

/** Essays live on /writing, not in the work index. */
export function essays(): Project[] {
  return publishedProjects().filter((p) => p.tier === 'writing')
}

export function projectBySlug(slug: string): Project | undefined {
  return publishedProjects().find((p) => p.slug === slug && !p.stub)
}

/** A published project earns a case study page once it has answers to write one from. */
export function hasCaseStudy(project: Project): boolean {
  const roles = ['constraint', 'decision', 'broke', 'differently']
  return project.intake.some((q) => roles.includes(q.role) && q.answer.trim().length > 0)
}
