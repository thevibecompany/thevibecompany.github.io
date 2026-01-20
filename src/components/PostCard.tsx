import { Link } from 'react-router-dom'

import { formatDate, formatReadingTime } from '../utils/format'
import type { PostMeta } from '../types'

type Props = {
  post: PostMeta
}

const PostCard = ({ post }: Props) => {
  return (
    <article className="post-card">
      <div className="post-card-header">
        <div className="post-meta">
          <span>{formatDate(post.date)}</span>
          <span>•</span>
          <span>{formatReadingTime(post.readingMinutes, post.readingWords)}</span>
        </div>
        <Link to={`/posts/${post.slug}`} className="post-title">
          {post.title}
        </Link>
        <p className="post-excerpt">{post.excerpt}</p>
      </div>
      <div className="post-card-footer">
        <div className="post-tags">
          {post.tags.map((tag) => (
            <Link key={tag} to={`/?tag=${encodeURIComponent(tag)}`} className="tag-pill">
              #{tag}
            </Link>
          ))}
        </div>
        <Link to={`/posts/${post.slug}`} className="read-more">
          읽기
        </Link>
      </div>
    </article>
  )
}

export default PostCard
