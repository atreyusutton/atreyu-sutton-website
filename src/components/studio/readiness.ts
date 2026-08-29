import type { Project } from '@/content/types'

/**
 * Mirrors the rules the build enforces in src/content/loader.ts, so the studio
 * can say exactly what a project still needs instead of failing the build later.
 */
export function readiness(project: Project) {
  const missing: string[] = []

  if (!project.oneLine.trim()) missing.push('One line')
  if (!project.hero) missing.push('Hero image')
  else if (!project.hero.alt.trim()) missing.push('Hero alt text')

  if (project.featured) {
    if (!project.headlineNumber.value.trim()) missing.push('Headline number')
    if (project.order === null) missing.push('Slot number')
    for (const role of ['constraint', 'decision'] as const) {
      const answered = project.intake.find((q) => q.role === role)?.answer.trim()
      if (!answered) missing.push(role === 'constraint' ? 'The constraint' : 'The decision')
    }
  }

  const hiddenImages = project.gallery.filter((image) => !image.alt.trim()).length

  return {
    missing,
    hiddenImages,
    publishable: missing.length === 0,
  }
}
