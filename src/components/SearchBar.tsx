type Props = {
  query: string
  onChange: (value: string) => void
  placeholder?: string
}

const SearchBar = ({ query, onChange, placeholder }: Props) => {
  return (
    <div className="search-bar">
      <input
        type="search"
        value={query}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder ?? '검색어를 입력하세요'}
        aria-label="검색"
      />
    </div>
  )
}

export default SearchBar
