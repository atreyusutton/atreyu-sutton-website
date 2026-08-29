# atreyusutton.com

Next.js 15 App Router, React 19, TypeScript, Tailwind v4, static export to
Cloudflare Pages. Design rules live in `docs/DESIGN-BRIEF.md` and `CLAUDE.md`.

- `src/content/projects/*.json` is the content. One file per project, holding
  its metadata, images and the intake questions with Atreyu's answers.
- `src/content/loader.ts` reads them at build time and fails the build on a
  published project with no one line, no hero, or no alt text on the hero.
  A featured project also needs a measured number and a slot.
- Copy is never written in JSX. A page renders an answer or omits the section.
- `/studio` is an unlisted editor for those JSON files. Edits stay in the
  browser until you download the bundle and run `npm run content:apply`.
- `npm run dev`, `npm run build`. Node 20 or newer.

## Adding or swapping a project

Write one file in `src/content/projects/`, put its images in `public/`, set
`published` to true. Nothing else needs to change.
