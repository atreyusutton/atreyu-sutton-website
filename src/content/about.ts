import data from './about.json'
import type { Media } from './types'

export interface About {
  /** Written by Atreyu in the studio. Empty means the page omits the section. */
  bio: string[]
  portrait: Media
  skills: Record<string, string>
}

export const about = data as About
