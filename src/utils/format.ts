export const formatDate = (value: string) => {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value

  return new Intl.DateTimeFormat('ko', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date)
}

export const formatReadingTime = (minutes: number, words: number) =>
  `${minutes}분 • ${words.toLocaleString('ko-KR')}자`
