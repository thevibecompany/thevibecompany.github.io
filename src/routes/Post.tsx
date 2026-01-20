import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import MarkdownRenderer from '../components/MarkdownRenderer'
import MetaHead from '../components/MetaHead'
import { formatDate, formatReadingTime } from '../utils/format'
import { loadPostContent, posts } from '../utils/content'
import type { Post as PostType } from '../types'

const Post = () => {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<PostType | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'notfound'>('idle')

  useEffect(() => {
    if (!slug) return
    setStatus('loading')
    loadPostContent(slug).then((data) => {
      if (!data) {
        setStatus('notfound')
        return
      }
      setPost(data)
      setStatus('ready')
    })
  }, [slug])

  const { prev, next } = useMemo(() => {
    const index = posts.findIndex((item) => item.slug === slug)
    return {
      prev: index > 0 ? posts[index - 1] : null,
      next: index >= 0 && index < posts.length - 1 ? posts[index + 1] : null,
    }
  }, [slug])

  if (status === 'loading' || status === 'idle') {
    return <div className="page"><div className="loading">불러오는 중...</div></div>
  }

  if (status === 'notfound' || !post) {
    return (
      <div className="page">
        <MetaHead title="글을 찾을 수 없습니다" />
        <div className="empty-state">
          글을 찾을 수 없습니다. <Link to="/">홈으로 이동</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="page post-page">
      <MetaHead title={post.title} description={post.excerpt} />
      <article className="post-detail">
        <header className="post-hero">
          <p className="eyebrow">Post</p>
          <h1 className="post-title">{post.title}</h1>
          <div className="post-meta">
            <span>{formatDate(post.date)}</span>
            <span>•</span>
            <span>{formatReadingTime(post.readingMinutes, post.readingWords)}</span>
          </div>
          <div className="post-tags">
            {post.tags.map((tag) => (
              <Link key={tag} to={`/?tag=${encodeURIComponent(tag)}`} className="tag-pill">
                #{tag}
              </Link>
            ))}
          </div>
        </header>

        <MarkdownRenderer content={post.content} />
      </article>

      <nav className="post-nav">
        {prev ? (
          <Link to={`/posts/${prev.slug}`} className="prev-post">
            ← {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link to={`/posts/${next.slug}`} className="next-post">
            {next.title} →
          </Link>
        )}
      </nav>
    </div>
  )
}

export default Post
