# CLAUDE.md

Instructions for any coding agent working in this repo.

## What this is

The personal portfolio site for Atreyu Sutton. Its single purpose is getting
him hired. Read `docs/DESIGN-BRIEF.md` before writing any code. It is the
source of truth for design, structure and stack.

## Non-negotiable rules

### Copy

- **No em dashes.** Anywhere, in any file, including code comments and commit
  messages. Use commas, colons or full stops.
- First person, plainspoken. No marketing voice, no "passionate about," no
  "leveraging," no "cutting-edge," no "seamless."
- Never write project copy yourself. All of it comes from
  `docs/INTAKE-QUESTIONS.md` once Atreyu has answered it. If a field is
  unanswered, leave the section out rather than inventing it.
- Never invent a number. Measured quantities come from Atreyu only. A
  fabricated spec on a portfolio is the one mistake that actually costs a job.

### Content

- Project content lives in `src/content/projects/`, one file per project, in
  the schema defined in `docs/CONTENT-MODEL.md`. Never put project copy in JSX.
- Adding, removing or swapping a project must cost one content file and
  nothing else. This is a hard architectural requirement: the project list will
  change.
- Never publish a project without at least one real image.
- Never publish a project that has not been built.

### Design

- Three typefaces, three roles: display grotesque, body serif, utility mono.
  Never substitute one for another.
- One accent color. If something needs emphasis, use weight, size or space
  before reaching for color.
- Facts go in spec tables with `tabular-nums`. Prose is for argument.
- No gradients, no rounded-card grids, no emoji section markers, no
  scroll-jacking, no decorative illustration.
- Light and dark are defined from one token set on `:root`. A color must never
  be declared only inside a media query or a `[data-theme]` block.

### Code

- Next.js 15 App Router, React 19, TypeScript, Tailwind v4. Static export to
  Cloudflare Pages.
- `next/image` with explicit dimensions everywhere.
- Semantic HTML, correct heading order, alt text on every image, visible
  keyboard focus.
- `framer-motion` is for the lane-switcher grid reorder and scroll fade-ins.
  Nothing else.
- Respect `prefers-reduced-motion`.

## Definition of done for any page

- Renders correctly in light and dark, including the un-stamped system default.
- No horizontal scroll on the body at 360px wide.
- Lighthouse 95+ on performance and accessibility.
- Every image has alt text that describes the object, not the file.
- No lorem, no placeholder images, no TODO left in shipped copy.

## Assume the repo gets cloned

A hiring manager may read the source. Keep commits readable and scoped. Keep
the README to about ten lines explaining the architecture. Delete dead files
from the previous version of the site rather than leaving them around.
