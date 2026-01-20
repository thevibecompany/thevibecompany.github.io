import { useEffect } from 'react'

type Props = {
  title?: string
  description?: string
}

const DEFAULT_TITLE = 'The Vibe Company — Blog'
const DEFAULT_DESCRIPTION = 'React와 Markdown으로 만든 개인 블로그'

const MetaHead = ({ title, description }: Props) => {
  useEffect(() => {
    document.title = title ? `${title} | The Vibe Company` : DEFAULT_TITLE

    const desc = description ?? DEFAULT_DESCRIPTION
    const meta = document.querySelector('meta[name="description"]')
    if (meta) {
      meta.setAttribute('content', desc)
    } else {
      const node = document.createElement('meta')
      node.name = 'description'
      node.content = desc
      document.head.appendChild(node)
    }
  }, [title, description])

  return null
}

export default MetaHead
