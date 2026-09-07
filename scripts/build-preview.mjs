// Builds a single self-contained HTML preview of the exported site: the real
// markup and the real stylesheet, with fonts and photographs inlined as data
// URIs so it renders with no network at all.
//
//   node scripts/build-preview.mjs <output.html>

import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const out = path.join(root, 'out')
const target = path.resolve(process.cwd(), process.argv[2] ?? 'preview.html')
const tmp = fs.mkdtempSync('/tmp/preview-')

const PAGES = [
  { id: 'home', label: 'Home', file: 'index.html', route: '/' },
  { id: 'work', label: 'Work', file: 'projects/index.html', route: '/projects/' },
  {
    id: 'case',
    label: 'Case study',
    file: 'projects/4runners-and-the-pickup/index.html',
    route: '/projects/4runners-and-the-pickup/',
  },
  { id: 'about', label: 'About', file: 'about/index.html', route: '/about/' },
]

function dataUri(file, mime) {
  return `data:${mime};base64,${fs.readFileSync(file).toString('base64')}`
}

/** Shrinks a photograph to the size it actually renders at. Logos stay lossless. */
function inlineImage(publicPath, maxWidth) {
  const source = path.join(out, publicPath.replace(/^\//, ''))
  if (!fs.existsSync(source)) return null

  if (publicPath.startsWith('/logos/')) return dataUri(source, 'image/png')

  const copy = path.join(tmp, `${maxWidth}-${publicPath.replace(/[/.]/g, '_')}.jpg`)
  execFileSync(
    'sips',
    ['-Z', String(maxWidth), '-s', 'format', 'jpeg', '-s', 'formatOptions', '58', source, '--out', copy],
    { stdio: 'ignore' },
  )
  return dataUri(copy, 'image/jpeg')
}

// The stylesheet, with its woff2 faces inlined.
const cssFile = fs
  .readdirSync(path.join(out, '_next/static/chunks'))
  .find((f) => f.endsWith('.css'))
let css = fs.readFileSync(path.join(out, '_next/static/chunks', cssFile), 'utf8')

// Inline the latin subset of each face and drop the rest. Cyrillic, Greek and
// Vietnamese subsets would triple the file for glyphs this site never sets.
css = css.replace(/@font-face\{[^}]*\}/g, (rule) => {
  const url = rule.match(/url\(\.\.\/media\/([^)]+\.woff2)\)/)?.[1]
  if (!url) return rule
  if (!/unicode-range:U\+\?\?/.test(rule)) return ''

  const file = path.join(out, '_next/static/media', url)
  return fs.existsSync(file)
    ? rule.replace(/url\(\.\.\/media\/[^)]+\.woff2\)/, `url(${dataUri(file, 'font/woff2')})`)
    : ''
})

const cache = new Map()

function preparePage(file) {
  let html = fs.readFileSync(path.join(out, file), 'utf8')
  html = html.slice(html.indexOf('<body'), html.lastIndexOf('</body>'))
  html = html.slice(html.indexOf('>') + 1)

  // No Next runtime in the preview: it would try to hydrate against markup
  // that is not its own.
  html = html.replace(/<script[\s\S]*?<\/script>/g, '')
  html = html.replace(/\ssrcset="[^"]*"/g, '')

  // Sized per occurrence: a 64px index thumbnail does not need a 1200px file.
  html = html.replace(/<img[^>]+>/gi, (tag) => {
    const src = tag.match(/src="(\/[^"]+\.(?:jpe?g|png|webp))"/i)?.[1]
    if (!src) return tag

    const width = /\bw-16\b/.test(tag) ? 200 : /\bh-8 w-8\b/.test(tag) ? 128 : 1100
    const key = `${width}:${src}`
    if (!cache.has(key)) cache.set(key, inlineImage(src, width))

    const uri = cache.get(key)
    return uri ? tag.replace(/src="[^"]*"/i, `src="${uri}"`) : tag
  })

  return html
}

const pages = PAGES.map((page) => ({ ...page, html: preparePage(page.file) }))

const shell = `<title>Atreyu Sutton, site preview</title>
<style>
${css}

/* Preview shell only. Everything above is the site's own stylesheet. */
.preview-bar {
  position: sticky;
  top: 0;
  z-index: 60;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.5rem 1.25rem;
  padding: 0.6rem 1.25rem;
  border-bottom: 1px solid var(--rule);
  background: var(--ground-sunken);
}
.preview-bar p {
  font-family: var(--font-plex-mono), ui-monospace, monospace;
  font-size: 0.6875rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink-faint);
}
.preview-tabs { display: flex; flex-wrap: wrap; gap: 0.4rem; }
.preview-tabs button {
  font-family: var(--font-plex-mono), ui-monospace, monospace;
  font-size: 0.6875rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink-faint);
  border: 1px solid var(--rule);
  background: transparent;
  padding: 0.3rem 0.7rem;
  cursor: pointer;
}
.preview-tabs button[aria-selected="true"] {
  border-color: var(--accent);
  background: var(--accent);
  color: var(--accent-ink);
}
.preview-note {
  padding: 0.5rem 1.25rem;
  border-bottom: 1px solid var(--rule);
  font-family: var(--font-plex-mono), ui-monospace, monospace;
  font-size: 0.7rem;
  color: var(--ink-faint);
}
.preview-page[hidden] { display: none; }
</style>

<div class="preview-bar">
  <p>Static preview</p>
  <div class="preview-tabs" role="tablist" aria-label="Pages">
${pages
  .map(
    (page, i) =>
      `    <button type="button" role="tab" id="tab-${page.id}" aria-controls="page-${page.id}" aria-selected="${i === 0}">${page.label}</button>`,
  )
  .join('\n')}
  </div>
</div>

<p class="preview-note">
  Real markup and real stylesheet, photographs inlined. No JavaScript runs here,
  so the lane filter, the theme button and /studio need <code>npm run dev</code>.
  This page follows your system light or dark setting.
</p>

${pages
  .map(
    (page, i) =>
      `<div class="preview-page" id="page-${page.id}" role="tabpanel" aria-labelledby="tab-${page.id}"${i === 0 ? '' : ' hidden'}>\n${page.html}\n</div>`,
  )
  .join('\n')}

<script>
  const routes = ${JSON.stringify(Object.fromEntries(pages.map((p) => [p.route, p.id])))};
  const tabs = Array.from(document.querySelectorAll('.preview-tabs button'));

  function show(id) {
    tabs.forEach((tab) => tab.setAttribute('aria-selected', String(tab.id === 'tab-' + id)));
    document.querySelectorAll('.preview-page').forEach((panel) => {
      panel.hidden = panel.id !== 'page-' + id;
    });
    window.scrollTo({ top: 0 });
  }

  tabs.forEach((tab) => tab.addEventListener('click', () => show(tab.id.replace('tab-', ''))));

  // Internal links move between previewed pages instead of going nowhere.
  document.addEventListener('click', (event) => {
    const link = event.target.closest('a');
    if (!link) return;
    const href = link.getAttribute('href') || '';
    if (!href.startsWith('/') || href.startsWith('//')) return;
    event.preventDefault();
    if (routes[href]) show(routes[href]);
  });
</script>
`

fs.writeFileSync(target, shell)
fs.rmSync(tmp, { recursive: true, force: true })

const mb = (fs.statSync(target).size / 1024 / 1024).toFixed(2)
console.log(`preview: ${pages.length} pages, ${cache.size} images, ${mb} MB -> ${target}`)
