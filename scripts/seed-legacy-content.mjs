// Carries the projects that already had a page on the old site into the new
// content model: their one line copy verbatim (it is Atreyu's, not invented
// here), their existing images, and hero alt text written from looking at the
// images themselves.
//
// Everything seeded here is flagged carriedOver so the studio can nag about
// rewriting third person copy in his own voice.
//
//   node scripts/seed-legacy-content.mjs

import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outDir = path.join(root, 'src/content/projects')

const INDEX_QUESTIONS = [
  {
    role: 'oneLine',
    question: 'One line for the index',
    hint: 'Carried over from the old site. Rewrite it in first person and cut the resume voice.',
    draft: '',
    answer: '',
  },
  {
    role: 'number',
    question: 'One number or spec',
    hint: 'Anything measured. Without one this stays a row rather than a card.',
    draft: '',
    answer: '',
  },
  {
    role: 'media',
    question: 'Best photo or video you have',
    hint: 'What else exists that is not already in public/.',
    draft: '',
    answer: '',
  },
]

// oneLine is the old site's copy, unchanged. heroAlt describes what is
// actually in the frame.
const LEGACY = [
  {
    slug: '4runners-and-the-pickup',
    lane: 'mechanical',
    status: 'running',
    oneLine:
      'Complete vehicle restoration featuring engine swap, custom fabrication, and suspension engineering.',
    dir: '1985-toyota-4runner',
    hero: 'hero.jpeg',
    heroAlt:
      'The 1985 Toyota 4Runner on a dirt driveway, white with the red and yellow factory stripe, lifted on knobby tires with the front bumper removed',
  },
  {
    slug: 'ducati-s2r',
    lane: 'mechanical',
    status: 'shipped',
    oneLine: 'Custom motorcycle build with electrical system redesign and fabrication work.',
    dir: '2006-ducati-s2r',
    hero: 'ducati-2-hero.jpeg',
    heroAlt: 'The 2006 Ducati S2R after the rebuild, trellis frame and exposed belt covers visible',
  },
  {
    slug: 'net-zero-home',
    lane: 'mechanical',
    status: 'shipped',
    oneLine: 'Sustainable energy system design with renewable integration and power management.',
    dir: 'net-zero-home',
    hero: 'zero-home-1-hero.jpeg',
    heroAlt:
      'The finished net zero house, two cedar clad volumes raised on piers above a cleared site with autumn woods behind',
    title: 'Net Zero Home',
  },
  {
    slug: 'pilots-license',
    lane: 'mechanical',
    status: 'in-progress',
    oneLine: 'FAA pilot certification demonstrating systems thinking and technical precision.',
    dir: 'pilots-license',
    hero: 'pilots-license-1-hero.jpeg',
    heroAlt: 'A high wing training aircraft parked on the ramp at sunrise, sun on the horizon behind it',
    title: "Pilot's License",
  },
  {
    slug: 'photography-highlights',
    lane: 'writing',
    status: 'running',
    oneLine: 'Selected shots of cars, landscapes, and lifestyle work.',
    dir: 'photography-highlights',
    hero: 'africa-1-hero.jpeg',
    heroAlt: 'A male lion lying in dry grass, head up and facing the camera',
    title: 'Photography',
  },
  {
    slug: 'green-burial-pitch',
    lane: 'writing',
    status: 'shipped',
    oneLine: 'Proposal for eco-friendly burial and land stewardship.',
    dir: 'green-burial-pitch',
    hero: 'burial-pitch-1-hero.png',
    heroAlt:
      'A plain wooden casket covered in flowers and greenery on a hillside meadow, two people standing beside it, wooded ridge behind',
    title: 'Green Burial Pitch',
  },
  {
    slug: 'ski-graphics',
    lane: 'fab',
    status: 'shipped',
    oneLine: 'Bold experimental ski design project.',
    dir: 'ski-graphics',
    hero: 'skis-build-1-hero.jpeg',
    heroAlt:
      'Ski topsheet graphics open in Photoshop, two black skis with repeated type running the length of the ski',
    title: 'Ski Graphics',
  },
  {
    slug: 'computer-case',
    lane: 'hardware',
    status: 'in-progress',
    oneLine: 'Custom machined chassis with CAD design and CNC fabrication.',
    dir: 'computer-case-build',
    hero: 'computer-case-1-hero.png',
    heroAlt:
      'Open frame computer chassis holding a motherboard, graphics card and closed loop cooler, lit against a dark background',
  },
  {
    slug: 'classic-motor-market',
    lane: 'software',
    status: 'running',
    oneLine: 'E-commerce platform with custom backend and database architecture.',
    dir: 'classic-motor-market',
    hero: 'classic-motor-1-hero.png',
    heroAlt:
      'The Classic Motor Market home page, a green Porsche photograph behind the site name and browse listings buttons',
    title: 'Classic Motor Market',
    links: [{ label: 'Live site', href: 'https://rileyshucks.com' }],
  },
  {
    slug: 'resume-maker',
    lane: 'software',
    status: 'running',
    oneLine: 'Web application with PDF generation and template rendering engine.',
    dir: 'resume-maker',
    hero: 'resume-1-hero.png',
    heroAlt:
      'The resume maker interface, an editor form on the left and a live paginated resume preview on the right',
    links: [{ label: 'Live site', href: 'https://resume-maker-dlc.pages.dev/' }],
  },
  {
    slug: 'valdra-outside',
    lane: 'software',
    status: 'running',
    oneLine: 'Outdoor gear brand with a first-aid line launching in 2026.',
    dir: 'valdra-outside',
    hero: 'valdra-outside-1-hero.png',
    heroAlt:
      'The Valdra Outside home page, a three panel banner of trail runners under the brand wordmark',
    links: [{ label: 'Live site', href: 'https://valdraoutside.com' }],
  },
  {
    slug: 'client-work',
    lane: 'software',
    status: 'running',
    oneLine:
      'Software engineering consultancy specializing in full-stack development and AI integration.',
    dir: 'sutton-web-solutions',
    hero: 'sutton-web-1-hero.png',
    heroAlt:
      'The Sutton Web Solutions home page, the headline web development that actually ships above a row of client names',
    links: [
      { label: 'Sutton Web Solutions', href: 'https://suttonwebsolutions.com' },
      { label: 'Ute Pass Vacation Rentals', href: 'https://utepassvacationrentals.com' },
      { label: 'The Real Estate Collaborative', href: 'https://trecprojects.com' },
    ],
    extraDirs: ['ute-pass-vacation-rentals', 'the-real-estate-collaborative'],
  },
]

function measure(file) {
  try {
    const out = execFileSync('sips', ['-g', 'pixelWidth', '-g', 'pixelHeight', file], {
      encoding: 'utf8',
    })
    const width = Number(out.match(/pixelWidth:\s*(\d+)/)?.[1])
    const height = Number(out.match(/pixelHeight:\s*(\d+)/)?.[1])
    return Number.isFinite(width) && Number.isFinite(height) ? { width, height } : null
  } catch {
    return null
  }
}

function imagesIn(dir, { skip = [] } = {}) {
  const abs = path.join(root, 'public', dir)
  if (!fs.existsSync(abs)) return []
  return fs
    .readdirSync(abs)
    .filter((f) => /\.(jpe?g|png|webp)$/i.test(f) && !skip.includes(f))
    .sort((a, b) => a.localeCompare(b, 'en', { numeric: true }))
    .map((f) => {
      const dims = measure(path.join(abs, f))
      if (!dims) return null
      // Empty alt means the loader hides it. The studio lists these as work to do.
      return { src: `/${dir}/${f}`, alt: '', width: dims.width, height: dims.height }
    })
    .filter(Boolean)
}

const titleFromSlug = (slug) =>
  slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

let updated = 0

for (const entry of LEGACY) {
  const file = path.join(outDir, `${entry.slug}.json`)
  const existing = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : null

  // An answer typed in the studio always wins over anything seeded here.
  const answered = existing?.intake?.some((q) => q.answer?.trim())
  if (answered) {
    console.log(`skip ${entry.slug}: has studio answers`)
    continue
  }

  const heroDims = measure(path.join(root, 'public', entry.dir, entry.hero))
  if (!heroDims) throw new Error(`Cannot measure hero for ${entry.slug}`)

  const gallery = [
    ...imagesIn(entry.dir, { skip: [entry.hero] }),
    ...(entry.extraDirs ?? []).flatMap((dir) => imagesIn(dir)),
  ]

  const intake = (existing?.intake?.length ? existing.intake : INDEX_QUESTIONS).map((q) => ({
    ...q,
    draft: q.role === 'oneLine' && !q.draft ? entry.oneLine : q.draft,
  }))

  const doc = {
    ...(existing ?? {}),
    slug: entry.slug,
    title: entry.title ?? existing?.title ?? titleFromSlug(entry.slug),
    lane: entry.lane,
    tier: existing?.tier === 'featured' ? 'featured' : (existing?.tier ?? 'index'),
    order: existing?.order ?? null,
    published: true,
    carriedOver: true,
    featured: existing?.featured ?? false,
    status: entry.status,
    oneLine: existing?.oneLine?.trim() ? existing.oneLine : entry.oneLine,
    headlineNumber: existing?.headlineNumber ?? { value: '', unit: '' },
    specs: existing?.specs ?? {},
    hero: {
      src: `/${entry.dir}/${entry.hero}`,
      alt: entry.heroAlt,
      width: heroDims.width,
      height: heroDims.height,
    },
    gallery,
    video: existing?.video ?? null,
    links: entry.links ?? existing?.links ?? [],
    intake,
  }

  fs.writeFileSync(file, JSON.stringify(doc, null, 2) + '\n')
  updated += 1
}

console.log(`legacy: ${updated} projects seeded and published as index rows`)
