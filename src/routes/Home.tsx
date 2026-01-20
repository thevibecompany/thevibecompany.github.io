import Fuse from 'fuse.js'
import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

import MetaHead from '../components/MetaHead'
import PostCard from '../components/PostCard'
import SearchBar from '../components/SearchBar'
import TagCloud from '../components/TagCloud'
import { posts, getTags } from '../utils/content'

const fuse = new Fuse(posts, {
  keys: ['title', 'excerpt', 'tags'],
  threshold: 0.35,
})

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const query = searchParams.get('q') ?? ''
  const activeTag = searchParams.get('tag') ?? ''

  const filtered = useMemo(() => {
    const base = activeTag ? posts.filter((post) => post.tags.includes(activeTag)) : posts
    if (!query) return base

    return fuse
      .search(query)
      .map((result) => result.item)
      .filter((post) => (activeTag ? post.tags.includes(activeTag) : true))
  }, [query, activeTag])

  const updateQuery = (value: string) => {
    const params = new URLSearchParams(searchParams)
    if (value) params.set('q', value)
    else params.delete('q')
    setSearchParams(params)
  }

  const updateTag = (value: string | null) => {
    const params = new URLSearchParams(searchParams)
    if (value) params.set('tag', value)
    else params.delete('tag')
    setSearchParams(params)
  }

  return (
    <div className="page home-shell">
      <MetaHead title="홈" description="Markdown 기반 개인 블로그" />

      <section className="home-hero">
        <p className="eyebrow">Personal Blog</p>
        <h1>Vibe에 담는 글들</h1>
        <p className="lede">
          생각과 실험을 기록하는 공간. Markdown으로 작성하고 GitHub Pages로 배포합니다.
        </p>
        <SearchBar query={query} onChange={updateQuery} placeholder="제목, 태그, 내용을 검색" />
      </section>

      <section className="home-content">
        <div className="home-main">
          <div className="post-grid">
            {filtered.length === 0 && <div className="empty-state">검색 결과가 없습니다.</div>}
            {filtered.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
        <aside className="home-tags">
          <TagCloud tags={getTags()} activeTag={activeTag || null} onSelect={updateTag} />
        </aside>
      </section>
    </div>
  )
}

export default Home
