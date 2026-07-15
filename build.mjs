// Builds the ways-of-working demo site → dist/.
//
//   node build.mjs                    full site: every demo page + the index
//   node build.mjs --artifact <slug>  single self-contained HTML for one demo,
//                                     for private preview hosting (Artifact CSP
//                                     blocks external requests, so images get
//                                     inlined as data URIs)
//
// Each demos/<slug>/ holds deck.html (page content only — no <html>/<head>/
// <body>; this script wraps it), meta.json (index-card fields), and img/.
import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync, cpSync, rmSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const DEMOS = join(HERE, 'demos')
const DIST = join(HERE, 'dist')

function demo(slug) {
  const dir = join(DEMOS, slug)
  const meta = JSON.parse(readFileSync(join(dir, 'meta.json'), 'utf8'))
  const raw = readFileSync(join(dir, 'deck.html'), 'utf8')
  const title = (raw.match(/<title>(.*?)<\/title>/s) || [, meta.title])[1]
  const content = raw.replace(/<title>.*?<\/title>\s*/s, '')
  return { slug, meta, title, content }
}

function wrap({ title, meta, content }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${meta.hook}">
<meta property="og:title" content="${meta.title} — ways of working, demo ${meta.number}">
<meta property="og:description" content="${meta.hook}">
</head>
<body>
${content}
</body>
</html>
`
}

const artifactAt = process.argv.indexOf('--artifact')
if (artifactAt !== -1) {
  const slug = process.argv[artifactAt + 1]
  if (!slug) { console.error('usage: node build.mjs --artifact <slug>'); process.exit(1) }
  const d = demo(slug)
  const inlined = d.content.replace(/src="img\/([^"]+)"/g, (_, name) =>
    `src="data:image/jpeg;base64,${readFileSync(join(DEMOS, slug, 'img', name)).toString('base64')}"`)
  const out = join(HERE, `artifact-${slug}.html`)
  writeFileSync(out, `<title>${d.title}</title>\n${inlined}`)
  console.log(out)
  process.exit(0)
}

rmSync(DIST, { recursive: true, force: true })
mkdirSync(DIST, { recursive: true })

const slugs = readdirSync(DEMOS)
  .filter((s) => statSync(join(DEMOS, s)).isDirectory())
  .sort()

const cards = []
for (const slug of slugs) {
  const d = demo(slug)
  mkdirSync(join(DIST, slug), { recursive: true })
  writeFileSync(join(DIST, slug, 'index.html'), wrap(d))
  cpSync(join(DEMOS, slug, 'img'), join(DIST, slug, 'img'), { recursive: true })
  cards.push(d)
}

// The series is a teaching arc — the index reads 01 → 08.
cards.sort((a, b) => a.meta.number.localeCompare(b.meta.number))

const cardHtml = cards
  .map(({ slug, meta }) => `      <a class="card" href="/${slug}/" style="--acc: ${meta.accent}">
        <span class="card-preview"><img src="/${slug}/${meta.preview}" alt="${meta.previewAlt}" loading="lazy"></span>
        <span class="card-body">
          <span class="card-label"><i></i>demo ${meta.number} · ${meta.theme}</span>
          <span class="card-title">${meta.title}</span>
          <span class="card-hook">${meta.hook}</span>
          <span class="card-rows">
            <span class="row"><b>for</b>${meta.for}</span>
            <span class="row"><b>get</b>${meta.get}</span>
            <span class="row"><b>do</b>${meta.do}</span>
          </span>
          <span class="card-cta">open the demo →</span>
        </span>
      </a>`)
  .join('\n')

const arcHtml = cards
  .map(({ slug, meta }) => `      <a class="arc-item" href="/${slug}/" style="--acc: ${meta.accent}"><i></i><b>${meta.number}</b>${meta.theme}</a>`)
  .join('\n')

const index = readFileSync(join(HERE, 'site', 'index.html'), 'utf8')
  .replace('<!--ARC-->', arcHtml)
  .replace('<!--DEMOS-->', cardHtml)
writeFileSync(join(DIST, 'index.html'), index)
console.log(`dist/ — ${slugs.length} demo(s) + index`)
