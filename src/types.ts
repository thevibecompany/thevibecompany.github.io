export type PostMeta = {
  slug: string
  title: string
  date: string
  tags: string[]
  excerpt: string
  cover?: string
  readingMinutes: number
  readingWords: number
  source: string
}

export type Post = PostMeta & {
  content: string
}
