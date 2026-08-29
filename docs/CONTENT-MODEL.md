# Content model

Replaces `src/data/projects.ts`. One file per project under
`src/content/projects/<slug>.mdx`, so adding or swapping a project costs one
file and nothing else.

## Why the old shape does not work

`src/data/projects.ts` is a flat array with a `description` and a
`fullDescription` string. It has no place for a constraint, a rejected
alternative, a failure, or a measured number, which are the four things a case
study exists to carry. It also means every content change is a code change.

## Frontmatter schema

```yaml
---
slug: digital-record-player
title: Digital Record Player
lane: hardware              # mechanical | software | hardware | fab | writing
featured: true              # true puts it in the eight
order: 3                    # position within the featured grid
status: running             # running | shipped | shelved | in-progress
oneLine: >
  A 1byone turntable retrofitted with a Raspberry Pi 4 into a Spotify Connect
  player, with album art spinning on a round display in the middle of the
  platter.
headlineNumber:
  value: "97"
  unit: commits             # what the card shows; pick the most persuasive one
specs:                      # renders as the spec table
  Role: Solo
  Duration: Feb to Apr 2026
  Status: Running at home
  Tools: Raspberry Pi 4, Python, Flask, systemd, PCM5122 DAC
hero:
  src: /recordplayer/hero.jpeg
  alt: The turntable with album art spinning on the round center display
  width: 2400
  height: 1600
gallery:
  - src: /recordplayer/internals.jpeg
    alt: Raspberry Pi with the DAC HAT stacked, inside the plinth
    width: 2400
    height: 1600
    caption: The Pi and DAC share the 12V rail with the original motor circuit.
video:                      # optional, for anything that moves
  src: /recordplayer/spinning.mp4
  poster: /recordplayer/spinning-poster.jpeg
links:
  - label: Repo
    href: https://github.com/atreyusutton/recordplayer
---
```

## Body

The MDX body is the case study, always in this order, with these exact
headings so the template can style them consistently:

```mdx
## The constraint

One or two paragraphs. What made this hard.

## The decision

What I chose, and the option I rejected, named explicitly.

## Evidence

Photos, a chart, or measured results.

## What broke

A real failure and what I did about it.

## What I'd do differently

Two sentences.
```

Any section with no content is omitted entirely rather than rendered empty.

## Index-only projects

Projects with `featured: false` render as a row in the index table and need
only `slug`, `title`, `lane`, `oneLine`, `headlineNumber` and a `thumb`. They
do not need an MDX body.

## Rules the loader should enforce at build time

Fail the build, do not warn, on any of these:

- A featured project with no `hero`.
- Any project with no `oneLine`.
- A featured project with no `headlineNumber`.
- An image without `alt`, `width` or `height`.
- Duplicate `order` values among featured projects.

Failing the build is deliberate. It makes the rules from `CLAUDE.md`
mechanical rather than a matter of remembering them.

## Types

```ts
export type Lane = 'mechanical' | 'software' | 'hardware' | 'fab' | 'writing'
export type Status = 'running' | 'shipped' | 'shelved' | 'in-progress'

export interface Media {
  src: string
  alt: string
  width: number
  height: number
  caption?: string
}

export interface Project {
  slug: string
  title: string
  lane: Lane
  featured: boolean
  order?: number
  status: Status
  oneLine: string
  headlineNumber?: { value: string; unit: string }
  specs?: Record<string, string>
  hero?: Media
  gallery?: Media[]
  video?: { src: string; poster: string }
  links?: { label: string; href: string }[]
}
```
