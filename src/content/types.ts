export type Lane = 'mechanical' | 'software' | 'hardware' | 'fab' | 'writing'
export type Status = 'running' | 'shipped' | 'shelved' | 'in-progress'
export type Tier = 'featured' | 'swap' | 'index' | 'future' | 'writing'

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

/* A proposal is a different shape of page from a case study. A case study is
   written backwards from a finished thing. A proposal argues for one that does
   not exist yet, so it needs mechanism, plan and a closing ask instead of a
   failure and a hindsight note. Optional, so every existing project is
   unaffected. */

export interface ProposalPipeline {
  label: string
  steps: string[]
  note?: string
}

export interface ProposalTable {
  head: string[]
  rows: string[][]
  /** Row indices to lift with the accent. Use sparingly. */
  emphasize?: number[]
}

export interface ProposalColumn {
  label: string
  items: string[]
}

export interface ProposalTier {
  when: string
  status: string
  title: string
  body: string
}

export interface ProposalCapability {
  lead: string
  note: string
}

export interface ProposalCapabilityGroup {
  label: string
  items: ProposalCapability[]
}

export interface ProposalSection {
  label: string
  title?: string
  body?: string[]
  callout?: string
  pipelines?: ProposalPipeline[]
  table?: ProposalTable
  columns?: ProposalColumn[]
  tiers?: ProposalTier[]
  after?: string[]
}

/** The idea being replaced, stated fairly, then the case against it. */
export interface ProposalOrigin {
  label: string
  title: string
  was: string[]
  liked: string
  problems: ProposalCapability[]
  verdict: string
}

export interface Proposal {
  /** Who this is written for. Rendered as a standing note at the top. */
  audience: string
  summary: string[]
  /** The range the hardware affords. Sells by being specific, not loud. */
  origin?: ProposalOrigin
  capabilities?: { intro: string; groups: ProposalCapabilityGroup[]; caveat: string }
  sections: ProposalSection[]
  closing: {
    label: string
    lead: string
    body: string[]
    bar: { intro: string; items: string[]; outro: string }
  }
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
  /** Set by scripts/fill-mock-content.mjs. Placeholder copy, never shippable. */
  mock?: boolean
  status: Status
  oneLine: string
  headlineNumber: { value: string; unit: string }
  specs: Record<string, string>
  hero: Media | null
  gallery: Media[]
  video: { src: string; poster: string } | null
  links: { label: string; href: string }[]
  intake: IntakeQuestion[]
  /** Overrides the lane heuristic in scripts/generate-images.mjs. Subject only. */
  imagePrompt?: string
  /** Present only on projects argued for rather than reported on. */
  proposal?: Proposal
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
