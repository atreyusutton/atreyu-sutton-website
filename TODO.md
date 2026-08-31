# TODO

## Done

- Content model: one JSON file per project under `src/content/projects/`,
  loaded and validated at build time. 38 projects imported from
  `docs/INTAKE-QUESTIONS.md`, with the drafted answers kept as drafts.
- Redesign: tokens, three typefaces, section rail, spec tables, lane switcher,
  case study template, index, about, writing, 404.
- Education timeline with school logos, monogram tiles where no mark exists.
- `/studio`, the unlisted Q and A editor. Download bundle, then
  `npm run content:apply <file>`.
- 12 projects published as index rows, carried over from the old site.

## Current state, 31 Aug 2026

The site is fully populated for review, but it is NOT shippable. 28 projects
carry PLACEHOLDER copy and 24 carry generated stand-in images. `npm run build`
prints the list every time. Nothing here is evidence of real work.

- Mock copy: `grep -rl '"mock": true' src/content/`
- Generated images: everything under `public/generated/`
- Regenerate an image: `npm run images:generate -- --only <slug> --force`
- Review them all: `node scripts/contact-sheet.mjs`

Replacing a generated image with a real photograph is the single highest value
edit available, and it is one file plus one line of JSON.

## Next, in order

1. Answer the featured eight in `/studio`. A project needs a one line, a
   measured number, the constraint and the decision before it can be featured.
2. Rewrite the 12 carried over one liners in first person. They are the old
   site's third person copy and the studio flags each one.
3. Shoot the media in `docs/MEDIA-CHECKLIST.md`. The record player video is
   the highest value item on the whole site.
4. Write alt text for the gallery images in the studio. Images without it are
   hidden rather than shipped undescribed.
5. Write the about page bio, three paragraphs, in `src/content/about.json`.
6. Write the Yestermorrow essay. The writing nav link appears once it is
   published.

## Open

- Radford Racing and Journey's Aviation have no usable logo file. Both render
  a monogram tile. Drop a PNG in `public/logos/` and add `logo` to the entry in
  `src/content/education.ts` if you want the real mark.
- `public/fuelfed-motor-market/` holds a Classic Motor Market screenshot, not
  Japanese Motor Market. JMM has no image yet.
- Brown Creek Designs: the hero is an architectural render, but the old copy
  describes product design and fabrication. Left unpublished until that is
  settled.
