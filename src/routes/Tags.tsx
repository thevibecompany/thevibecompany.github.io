import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import MetaHead from '../components/MetaHead'
import TagCloud from '../components/TagCloud'
import { getTags, posts } from '../utils/content'

const Tags = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTag = searchParams.get('tag') ?? ''

  const tagList = getTags()
  const filtered = useMemo(() => {
    if (!activeTag) return []
    return posts.filter((post) => post.tags.includes(activeTag))
  }, [activeTag])

  const updateTag = (value: string | null) => {
    const params = new URLSearchParams(searchParams)
    if (value) params.set('tag', value)
    else params.delete('tag')
    setSearchParams(params)
  }

  return (
    <div className="page">
      <MetaHead title="태그" description="태그별 글 모음" />
      <section className="hero">
        <p className="eyebrow">Tags</p>
        <h1>태그로 찾아보기</h1>
        <p className="lede">주제별로 글을 묶었습니다.</p>
        <TagCloud tags={tagList} activeTag={activeTag || null} onSelect={updateTag} />
      </section>

      {activeTag && (
        <section className="tag-section">
          <header className="section-header">
            <h2>#{activeTag}</h2>
            <span>{filtered.length}개의 글</span>
          </header>
          <div className="tag-posts">
            {filtered.map((post) => (
              <Link key={post.slug} to={`/posts/${post.slug}`} className="tag-post-item">
                <div className="post-meta">
                  <span>{new Date(post.date).toLocaleDateString('ko')}</span>
                </div>
                <div className="tag-post-title">{post.title}</div>
                <p className="tag-post-excerpt">{post.excerpt}</p>
              </Link>
            ))}
            {filtered.length === 0 && <div className="empty-state">아직 이 태그의 글이 없습니다.</div>}
          </div>
        </section>
      )}
    </div>
  )
}

export default Tags
