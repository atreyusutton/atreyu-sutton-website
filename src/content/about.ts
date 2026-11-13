import data from './about.json'
import type { Media } from './types'

export interface About {
  /** The role this version of the site is written for. Shown above the headline. */
  applyingFor: string
  headline: string
  intro: string
  /** The six facts a reader should leave the home page with. */
  atAGlance: Record<string, string>
  sustainableIntro: string
  /** Clients and businesses worked for. Shown under Work on the about page. */
  work: { name: string; what: string; href?: string }[]
  /** Written by Atreyu in the studio. Empty means the page omits the section. */
  bio: string[]
  portrait: Media
  skills: Record<string, string>
}

export const about = data as About
