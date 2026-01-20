import manifestData from '../data/manifest.json'
import type { Post, PostMeta } from '../types'

const contentFiles = import.meta.glob('/src/content/**/*.md', {
  query: '?raw',
  import: 'default',
})

export const posts: PostMeta[] = manifestData

const stripFrontmatter = (raw: string) => {
  if (!raw.startsWith('---')) return raw
  const end = raw.indexOf('\n---', 3)
  if (end === -1) return raw
  return raw.slice(end + 4)
}

export const getTags = () => {
  const tagCount = new Map<string, number>()
  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagCount.set(tag, (tagCount.get(tag) ?? 0) + 1)
    })
  })

  return Array.from(tagCount.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag))
}

export const loadPostContent = async (slug: string): Promise<Post | null> => {
  const meta = posts.find((post) => post.slug === slug)
  if (!meta) return null

  const raw = (await contentFiles[meta.source]?.()) as string | undefined
  if (!raw) return null

  return {
    ...meta,
    content: stripFrontmatter(raw).trim(),
  }
}
