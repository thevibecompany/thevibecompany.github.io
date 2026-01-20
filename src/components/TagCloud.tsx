type Props = {
  tags: { tag: string; count: number }[]
  activeTag: string | null
  onSelect: (tag: string | null) => void
}

const TagCloud = ({ tags, activeTag, onSelect }: Props) => {
  if (!tags.length) return null

  return (
    <div className="tag-cloud">
      <button
        type="button"
        className={`tag-pill ${activeTag === null ? 'is-active' : ''}`}
        onClick={() => onSelect(null)}
      >
        전체
      </button>
      {tags.map(({ tag, count }) => (
        <button
          type="button"
          key={tag}
          className={`tag-pill ${activeTag === tag ? 'is-active' : ''}`}
          onClick={() => onSelect(tag)}
        >
          #{tag} ({count})
        </button>
      ))}
    </div>
  )
}

export default TagCloud
