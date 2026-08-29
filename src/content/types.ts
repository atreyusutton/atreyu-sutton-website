export type Lane = 'mechanical' | 'software' | 'hardware' | 'fab' | 'writing'
export type Status = 'running' | 'shipped' | 'shelved' | 'in-progress'
export type Tier = 'featured' | 'swap' | 'index' | 'writing'

/** Maps an intake answer onto the part of the case study it renders as. */
export type QuestionRole =
  | 'oneLine'
  | 'meta'
  | 'constraint'
  | 'decision'
  | 'number'
  | 'broke'
  | 'media'
  | 'differently'
  | 'note'

export interface Media {
  src: string
  alt: string
  width: number
  height: number
  caption?: string
}

export interface IntakeQuestion {
  role: QuestionRole
  question: string
  hint: string
  /** Written from reading the repos. Not publishable until Atreyu confirms it. */
  draft: string
  answer: string
}

export interface Project {
  slug: string
  title: string
  lane: Lane
  tier: Tier
  order: number | null
  published: boolean
  featured: boolean
  carriedOver?: boolean
  status: Status
  oneLine: string
  headlineNumber: { value: string; unit: string }
  specs: Record<string, string>
  hero: Media | null
  gallery: Media[]
  video: { src: string; poster: string } | null
  links: { label: string; href: string }[]
  intake: IntakeQuestion[]
}

export const LANE_LABELS: Record<Lane, string> = {
  mechanical: 'Mechanical',
  software: 'Software',
  hardware: 'Hardware',
  fab: 'Fabrication',
  writing: 'Writing',
}

export const STATUS_LABELS: Record<Status, string> = {
  running: 'Running',
  shipped: 'Shipped',
  shelved: 'Shelved',
  'in-progress': 'In progress',
}

/** The three chips in the hero. Fabrication folds into mechanical for filtering. */
export const FILTER_LANES: { id: 'all' | Lane; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'mechanical', label: 'Mechanical' },
  { id: 'software', label: 'Software' },
  { id: 'hardware', label: 'Hardware' },
]

export function answerFor(project: Project, role: QuestionRole): string {
  return project.intake.find((q) => q.role === role)?.answer.trim() ?? ''
}

/** Images with no alt text never render. Missing alt is a content bug, not a render bug. */
export function describedImages(images: Media[]): Media[] {
  return images.filter((image) => image.alt.trim().length > 0)
}
