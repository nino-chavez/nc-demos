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
import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync, cpSync, rmSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { fileURLToPath } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const DEMOS = join(HERE, 'demos')
const DIST = join(HERE, 'dist')
const PUBLIC_SITE = 'https://ninochavez.co'
const PUBLISHER_ORIGIN = 'https://nc-demos.pages.dev'

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

function story({ kind, slug, title, content }) {
  const style = content.match(/<style>([\s\S]*?)<\/style>/)?.[1]
  const sections = [...content.matchAll(/<section\b([^>]*)>([\s\S]*?)<\/section>/g)]
    .filter((match) => /\bclass="[^"]*\bslide\b[^"]*"/.test(match[1]))
    .map((match, index) => {
      const attributes = match[1]
      const className = attributes.match(/\bclass="([^"]+)"/)?.[1] ?? 'slide'
      const label =
        attributes.match(/\baria-label="([^"]+)"/)?.[1] ??
        `Section ${index + 1}`

      return {
        id: `s${index + 1}`,
        label,
        className,
        html: match[2].trim(),
      }
    })

  if (!style || sections.length === 0) {
    throw new Error(`${kind} ${slug} is missing its style or story sections.`)
  }

  const sourcePath =
    kind === 'session' ? `/${slug}/` : `/applied/${slug}/`

  return {
    schemaVersion: 1,
    kind,
    slug,
    title,
    sourcePath,
    assetBase: `${PUBLISHER_ORIGIN}${sourcePath}`,
    sourceHash: createHash('sha256').update(content).digest('hex'),
    sectionCount: sections.length,
    style,
    sections,
  }
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

// The series is a teaching arc — keep the source-defined publication order.
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

// Applied strand — technique companions to the session receipts. Each gets a
// page at /applied/<slug>/ and a card in the labeled homepage "Applied"
// section, kept distinct from the numbered session arc.
const APPLIED = join(HERE, 'applied')
const appliedCards = []
const appliedEntries = []
if (existsSync(APPLIED)) {
  for (const slug of readdirSync(APPLIED).filter((s) => statSync(join(APPLIED, s)).isDirectory()).sort()) {
    const dir = join(APPLIED, slug)
    const meta = JSON.parse(readFileSync(join(dir, 'meta.json'), 'utf8'))
    const raw = readFileSync(join(dir, 'deck.html'), 'utf8')
    const title = (raw.match(/<title>(.*?)<\/title>/s) || [, meta.title])[1]
    const content = raw.replace(/<title>.*?<\/title>\s*/s, '')
    mkdirSync(join(DIST, 'applied', slug), { recursive: true })
    writeFileSync(join(DIST, 'applied', slug, 'index.html'), `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${meta.description}">
<meta property="og:title" content="${meta.title} — ways of working, applied">
<meta property="og:description" content="${meta.description}">
</head>
<body>
${content}
</body>
</html>
`)
    if (existsSync(join(dir, 'img'))) cpSync(join(dir, 'img'), join(DIST, 'applied', slug, 'img'), { recursive: true })
    appliedEntries.push({ slug, meta, title, content })
    appliedCards.push(`      <a class="applied-card" href="/applied/${slug}/" style="--acc: ${meta.accent || '#6ea8fe'}">
        <span class="at">applied · technique</span>
        <span class="an">${meta.title}</span>
        <span class="ad">${meta.cardDesc || meta.description}</span>
        <span class="card-cta">open →</span>
      </a>`)
  }
}

const index = readFileSync(join(HERE, 'site', 'index.html'), 'utf8')
  .replace('<!--ARC-->', arcHtml)
  .replace('<!--DEMOS-->', cardHtml)
  .replace('<!--APPLIED-->', appliedCards.join('\n'))
writeFileSync(join(DIST, 'index.html'), index)

const techniques = appliedEntries.map(({ slug, meta }) => ({
  slug,
  title: meta.title,
  summary: meta.cardDesc || meta.description,
  description: meta.description,
  principles: meta.principles || [],
  relatedSessionSlugs: meta.relatedSessionSlugs || [],
  href: `${PUBLIC_SITE}/demos/applied/${slug}`,
  storyHref: `${PUBLISHER_ORIGIN}/content/techniques/${slug}.json`,
}))
const techniqueBySession = new Map()
for (const technique of techniques) {
  for (const sessionSlug of technique.relatedSessionSlugs) {
    if (!techniqueBySession.has(sessionSlug)) {
      techniqueBySession.set(sessionSlug, technique.slug)
    }
  }
}

const sessions = cards.map(({ slug, meta }) => ({
  number: meta.number,
  slug,
  title: meta.title,
  summary: meta.hook,
  audience: meta.for,
  evidence: meta.get,
  practice: meta.do,
  date: meta.date,
  theme: meta.theme,
  accent: meta.accent,
  artifact: {
    src: `${PUBLISHER_ORIGIN}/${slug}/${meta.preview}`,
    alt: meta.previewAlt,
  },
  relatedTechniqueSlug: techniqueBySession.get(slug),
  href: `${PUBLIC_SITE}/demos/${slug}`,
  storyHref: `${PUBLISHER_ORIGIN}/content/sessions/${slug}.json`,
}))
const sourceRevision = execFileSync('git', ['rev-parse', 'HEAD'], {
  cwd: HERE,
  encoding: 'utf8',
}).trim()
for (const [kind, entries] of [
  ['sessions', cards.map(({ slug, title, content }) =>
    story({ kind: 'session', slug, title, content }))],
  ['techniques', appliedEntries.map(({ slug, title, content }) =>
    story({ kind: 'technique', slug, title, content }))],
]) {
  const destination = join(DIST, 'content', kind)
  mkdirSync(destination, { recursive: true })
  for (const entry of entries) {
    writeFileSync(
      join(destination, `${entry.slug}.json`),
      `${JSON.stringify({ ...entry, sourceRevision }, null, 2)}\n`,
    )
  }
}
writeFileSync(
  join(DIST, 'content-index.json'),
  `${JSON.stringify({
    schemaVersion: 1,
    source: 'apps/nc-demos',
    sourceRevision,
    generatedAt: new Date().toISOString(),
    sessionCount: sessions.length,
    techniqueCount: techniques.length,
    sessions,
    techniques,
  }, null, 2)}\n`,
)
writeFileSync(
  join(DIST, '_headers'),
  `/content-index.json
  Access-Control-Allow-Origin: *
  Cache-Control: public, max-age=300, s-maxage=300, stale-while-revalidate=3600

/content/*
  Access-Control-Allow-Origin: *
  Cache-Control: public, max-age=300, s-maxage=300, stale-while-revalidate=3600
`,
)
console.log(`dist/ — ${slugs.length} demo(s) + index${appliedCards.length ? ` + ${appliedCards.length} applied` : ''}`)
execFileSync('node', [join(HERE, 'tools', 'lib', 'encounter-audit.mjs'), `--root=${HERE}`, '--strict'], { stdio: 'inherit' })
