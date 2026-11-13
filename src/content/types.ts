export type Lane = 'mechanical' | 'software' | 'hardware' | 'fab' | 'writing'
export type Status = 'running' | 'shipped' | 'shelved' | 'in-progress'
export type Tier = 'featured' | 'swap' | 'index' | 'future' | 'writing' | 'sustainable'

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
  /* Set when an answer was written by an agent rather than by Atreyu, with no
     repo or intake sheet behind it. It renders as his words either way, so the
     flag is the only thing that can tell them apart. The studio clears it the
     moment he edits the answer. */
  unverified?: boolean
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

/* A case study is the long form for a finished project: an intro, then
   sections that can each carry prose, a flow diagram, screenshots, a code
   excerpt or a table of facts. All of it is data, so the page stays one
   content file. */

export interface FlowBox {
  step?: string
  title: string
  note?: string
}

export interface FlowStage {
  /** Printed on the connector leading into this stage. */
  label?: string
  /** One box, or several side by side when they run in parallel. */
  boxes: FlowBox[]
  /** A side note for the stage: an input it is fed, or a branch it can take. */
  aside?: string
}

export interface CaseStudyFlow {
  /** One sentence describing the whole diagram, for screen readers. */
  summary: string
  /** Work done ahead of time, shown above the request flow. */
  offline?: { label: string; lines: string[][] }
  stages: FlowStage[]
}

export interface CaseStudyCode {
  file: string
  text: string
}

export interface CaseStudySection {
  label: string
  title?: string
  body?: string[]
  flow?: CaseStudyFlow
  images?: Media[]
  /** `two` sets images side by side. Default is one per row. */
  imageLayout?: 'one' | 'two'
  code?: CaseStudyCode
  facts?: Record<string, string>
  after?: string[]
}

export interface CaseStudy {
  tags: string[]
  intro: string[]
  sections: CaseStudySection[]
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
  /** A title-only card with no page behind it yet. Skips the publish checks. */
  stub?: boolean
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
  /** Up to three short facts shown on the card. */
  chips?: string[]
  /** The long form write-up for a finished project. */
  caseStudy?: CaseStudy
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
