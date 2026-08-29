# Design Brief: atreyusutton.com

The master prompt. Paste this whole file into your coding agent as the first
instruction for the redesign, or point the agent at it and say "build this."

Everything here is decided. Where something is genuinely open it is marked
DECIDE. Do not invent content: all copy comes from `docs/PROJECTS.md` and the
answers in `docs/INTAKE-QUESTIONS.md`.

---

## 0. The job this site has

Get Atreyu Sutton hired. He is an engineering graduate student in Boulder,
Colorado, applying at the same time to mechanical and automotive roles,
software roles, and hardware and embedded roles.

That breadth is the central design problem. Handled badly it reads as
unfocused: a powertrain manager sees a Next.js app next to an engine rebuild
and concludes hobbyist. Handled well it is the whole pitch, because companies
building physical products with software in them are short of people who can
do both.

The site resolves this two ways, and both are requirements, not suggestions:

1. A thesis stated in the first sentence of the hero. The argument is that he
   designs the part, builds it, and writes the code that runs it.
2. A **lane switcher** in the hero: three chips, Mechanical / Software /
   Hardware, that filter and reorder the project grid below in place, with no
   navigation and no page reload. "All" is the default state. A recruiter
   self-selects in one click and sees their discipline first.

---

## 1. Visual direction: technical notebook

The page should read like an engineering log or a drafting sheet. Not a design
agency site, not a startup landing page, not a developer portfolio template.

**Structure is visible.** Hairline rules, a left margin rail carrying section
numbers and small uppercase mono labels, content sitting on a real baseline
grid. The grid is drawn, not implied.

**Facts go in spec tables, not prose.** Role, duration, tools, measurements,
materials: all of it in bordered tables with `font-variant-numeric:
tabular-nums` so digits align in columns. Prose is for argument. Tables are for
fact.

**Photography carries the pages.** Full bleed build photos on case studies.
The objects are the content. Do not put decorative gradients, abstract
illustration, or generative background art anywhere on this site.

### Color

One accent, used sparingly, plus a deliberate neutral. Suggested palette,
described so you can implement it as CSS custom properties or Tailwind theme
tokens:

- Ground (light): a cool off-white with a slight green-grey bias, not pure
  white, not cream. Around `#EDEEE9`.
- Ink (light): near-black with the same green bias, around `#161A17`.
- Accent: a deep "layout blue," the color of machinist's marking dye, around
  `#2B3EA6`. This is the only strong color on the site.
- Warning: a single oxide red, around `#A62B1E`, used almost never.
- Rules and borders: around `#CBCEC5`.
- Dark theme inverts the ground and ink and lifts the accent to around
  `#93A1F5` so it stays legible on a dark ground.

Never a pure mid grey. Never a gradient.

### Typography

Three roles, three faces, used consistently and never interchanged:

- **Display:** a sturdy grotesque for headings. Archivo is a good choice.
  Explicitly not Inter and not Space Grotesk.
- **Body:** a readable serif for running text. Source Serif 4 is a good choice.
  A serif body is what makes it read as a document rather than an app.
- **Utility:** a mono for labels, captions, section numbers, spec tables and
  every numeric value. IBM Plex Mono is a good choice.

Set a type scale and stay on it. Running text near 65 characters wide.
`text-wrap: balance` on headings. A touch of letter-spacing on uppercase mono
labels.

### What this site must not look like

No gradient hero. No grid of rounded cards with an icon, a heading and a
blurb. No emoji as section markers. No everything-centered layout. No
`rounded-lg` on every surface. No accent bar on a rounded card. These are the
defaults every AI-generated portfolio lands on and they are exactly what this
site is trying not to be.

### Motion

Minimal and functional. The lane switcher animates the grid reordering.
Images fade in once on scroll. Nothing bounces, nothing parallaxes, no scroll
hijacking. `framer-motion` is already a dependency; use it for the grid
reorder and almost nothing else. Respect `prefers-reduced-motion`.

---

## 2. Structure

### Home

1. **Hero.** Name, the thesis line, one strong photograph of him working with
   his hands on something real. Below it, the three lane chips.
2. **Selected work.** The eight featured case studies in an asymmetric grid,
   not an even one. Each card carries one photograph, the project name, one
   line, a lane tag, and one hard number. The number on the card is a
   requirement, not a nice-to-have.
3. **Index.** A compact table of every other project: name, one line, lane tag,
   small thumbnail. Filters with the same lane chips.
4. **Writing.** A link to the essays, with the first essay's title.
5. **Footer.** Email, GitHub, LinkedIn, resume PDF.

### Case study template

One page per featured project, always in this order:

1. Full bleed hero image
2. One plain sentence, set large
3. Spec table: role, team size, duration, status, tools
4. **The constraint.** What made it hard.
5. **The decision.** What he chose, and the alternative he rejected, named.
6. **Evidence.** Photos, video, a chart, or measured numbers.
7. **What broke.** A real failure and the fix.
8. **What I'd do differently.** Two sentences.
9. Next project link.

Sections 4 and 5 are the reason the page exists. Give them typographic weight,
not a footnote treatment.

### Other pages

- `/projects` — the full index, filterable.
- `/writing/[slug]` — essays. First one covers Yestermorrow and the North
  Carolina build, with a linked photo set from the Mad River Valley credited to
  Archie by name.
- `/about` — a real photograph of him in the shop, three paragraphs, resume
  download, contact.

---

## 3. Technical

The repo already exists and already has the right stack. Keep it.

- Next.js 15.5.4, App Router, React 19, TypeScript, Tailwind v4
- `framer-motion` for the grid reorder, `next-themes` for the theme toggle
- Static export, deployed to Cloudflare Pages (`out/`)

### Content architecture

The current `src/data/projects.ts` is a single flat array with a
`fullDescription` string. Replace it. Adding or swapping a project must cost
exactly one content file and nothing else, because the project list will
change: the mosquito drone is unbuilt and will displace the phantom typewriter
when it flies.

Use MDX or typed content files per project under `src/content/projects/`. See
`docs/CONTENT-MODEL.md` for the required schema. No project copy lives in JSX.

### Non-negotiables

- `next/image` everywhere, with real width and height. Target LCP under 2.0s.
- Semantic HTML, correct heading hierarchy, alt text on every image.
- Visible keyboard focus on every interactive element.
- Per-page OG images so shared links look right.
- Lighthouse 95+ on performance and accessibility.
- Light and dark themes defined from one token set. Define the full palette on
  `:root`, override only the tokens for dark. Never define a color whose only
  declaration sits inside a media query or a `[data-theme]` block.

This repo is itself a code sample. Assume a hiring manager clones it. Keep
commits readable, keep the README to ten lines explaining the architecture, and
do not leave dead files from the previous version lying around.

---

## 4. Copy rules

- **No em dashes.** Anywhere. Use commas, colons, or full stops.
- First person, plainspoken, no marketing voice.
- Never "passionate about," never "leveraging," never "cutting-edge."
- Every featured project card carries at least one measured number.
- Never publish a project without an image.
- Never publish an unbuilt project, including in the index.

---

## 5. Assets already in the repo

`public/` already holds real photography. Use it. Notable sets:

- `1985-toyota-4runner/` — 24 images, the strongest existing set
- `photography-highlights/` — 46 images
- `2006-ducati-s2r/` — 9 images
- `brown-creek-designs/` — 6 images
- `risd-project-car/` — 4 images
- `green-burial-pitch/`, `fucking-awesome-skis/` — 5 each
- `pilots-license/` — 4 images

Several featured projects have no photography yet. See
`docs/MEDIA-CHECKLIST.md`. Do not ship placeholder images for them: leave the
project out of the build until its photos exist.

---

## 6. Open decisions

- **DECIDE: the thesis line.** Three candidates:
  1. "I design the part, machine it, and write the firmware that runs it."
  2. "Mechanical engineer who ships software. Software engineer who owns a lathe."
  3. "I build things that move, and the code that decides how."
- **DECIDE: slot 08.** Coleman camping frame or the custom 3D printed car
  radio. See `docs/PROJECTS.md`.
- **DECIDE: fresh start or refactor.** The existing repo has five pages and a
  working deploy. Given "completely redesigned," gutting `src/app` and
  `src/components` while keeping `public/`, the config, and the deploy pipeline
  is the faster path than a new repo.

---

## 7. Build order

1. Design tokens and the three typefaces. Get the type scale right first.
2. The case study template, with one real project in it end to end.
3. The home hero and the lane switcher.
4. The grid and the index.
5. Everything else.

Ship at eight projects. A live site with eight beats a perfect site with thirty
that never launches.
