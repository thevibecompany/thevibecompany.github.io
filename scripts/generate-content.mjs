import fs from 'node:fs/promises'
import path from 'node:path'

import fg from 'fast-glob'
import matter from 'gray-matter'

const siteUrl = 'https://thevibecompany.github.io'
const projectRoot = process.cwd()
const contentDir = path.resolve(projectRoot, 'src/content')
const dataDir = path.resolve(projectRoot, 'src/data')
const publicDir = path.resolve(projectRoot, 'public')

const ensureDir = async (dir) => {
  await fs.mkdir(dir, { recursive: true })
}

const toPosix = (p) => p.split(path.sep).join('/')

const summarize = (body) => {
  const firstParagraph = body
    .trim()
    .split(/\n\s*\n/)
    .map((p) => p.replace(/\s+/g, ' ').trim())
    .find(Boolean)

  if (!firstParagraph) return ''
  return firstParagraph.length > 180
    ? `${firstParagraph.slice(0, 177)}...`
    : firstParagraph
}

const countWords = (body) => {
  const words = body
    .replace(/[`*_>#-]/g, ' ')
    .replace(/[\n\r]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
  return words.length
}

const escapeXml = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')

const buildRss = (posts) => {
  const items = posts
    .map((post) => {
      const link = `${siteUrl}/posts/${post.slug}`
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${link}</link>
      <guid>${link}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${escapeXml(post.excerpt ?? '')}</description>
    </item>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>The Vibe Company — Blog</title>
    <link>${siteUrl}</link>
    <description>Personal blog powered by React & Markdown</description>
${items}
  </channel>
</rss>
`
}

const buildSitemap = (posts) => {
  const staticPaths = ['/', '/tags', '/about']
  const urls = [
    ...staticPaths.map((loc) => ({ loc, lastmod: new Date().toISOString() })),
    ...posts.map((post) => ({
      loc: `/posts/${post.slug}`,
      lastmod: new Date(post.date).toISOString(),
    })),
  ]

  const entries = urls
    .map(
      (item) => `  <url>
    <loc>${siteUrl}${item.loc}</loc>
    <lastmod>${item.lastmod}</lastmod>
  </url>`
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>`
}

const parseDate = (input) => {
  if (input instanceof Date && !Number.isNaN(input.getTime())) return input
  const value = typeof input === 'string' ? input : ''
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? new Date() : date
}

const normalizeTags = (tags) => {
  if (!Array.isArray(tags)) return []
  return tags.map(String).map((tag) => tag.trim()).filter(Boolean)
}

const buildManifest = async () => {
  const files = await fg('**/*.md', { cwd: contentDir, absolute: true, dot: false })

  const posts = await Promise.all(
    files.map(async (file) => {
      const raw = await fs.readFile(file, 'utf8')
      const parsed = matter(raw)
      const slug = path.basename(file, path.extname(file))
      const source = `/src/${toPosix(path.relative(path.resolve(projectRoot, 'src'), file))}`
      const date = parseDate(parsed.data.date).toISOString()
      const tags = normalizeTags(parsed.data.tags)
      const excerpt = parsed.data.excerpt ?? summarize(parsed.content)
      const words = countWords(parsed.content)

      return {
        slug,
        title: parsed.data.title ?? slug,
        date,
        tags,
        excerpt,
        cover: parsed.data.cover ?? '',
        readingMinutes: Math.max(1, Math.ceil(words / 220)),
        readingWords: words,
        source,
      }
    })
  )

  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  return posts
}

const main = async () => {
  await ensureDir(dataDir)
  await ensureDir(publicDir)

  const posts = await buildManifest()
  const manifestPath = path.join(dataDir, 'manifest.json')
  await fs.writeFile(manifestPath, JSON.stringify(posts, null, 2))

  const rss = buildRss(posts)
  const sitemap = buildSitemap(posts)
  await fs.writeFile(path.join(publicDir, 'rss.xml'), rss)
  await fs.writeFile(path.join(publicDir, 'sitemap.xml'), sitemap)

  console.log(`Generated ${posts.length} posts -> manifest, RSS, sitemap`)
}

main().catch((error) => {
  console.error('generate-content failed', error)
  process.exit(1)
})
