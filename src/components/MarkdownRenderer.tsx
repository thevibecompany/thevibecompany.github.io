import type { ReactNode } from 'react'

import ReactMarkdown from 'react-markdown'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import Prism from 'prismjs'

import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-markdown'

type CodeProps = {
  inline?: boolean
  className?: string
  children?: ReactNode
}

type Props = {
  content: string
}

const CodeBlock = ({ className, children }: CodeProps) => {
  const language = className?.replace('language-', '') ?? ''
  const code = String(children ?? '').trim()

  if (language && Prism.languages[language]) {
    const html = Prism.highlight(code, Prism.languages[language], language)
    return (
      <pre className={`code-block language-${language}`}>
        <code dangerouslySetInnerHTML={{ __html: html }} />
      </pre>
    )
  }

  return (
    <pre className="code-block">
      <code>{code}</code>
    </pre>
  )
}

const MarkdownRenderer = ({ content }: Props) => {
  return (
    <div className="markdown-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: 'wrap',
            },
          ],
          [
            rehypeExternalLinks,
            {
              rel: ['noopener', 'noreferrer'],
              target: '_blank',
            },
          ],
        ]}
        components={{
          code: CodeBlock,
          h1: (props) => <h1 className="md-heading" {...props} />,
          h2: (props) => <h2 className="md-heading" {...props} />,
          h3: (props) => <h3 className="md-heading" {...props} />,
          h4: (props) => <h4 className="md-heading" {...props} />,
          img: (props) => <img className="md-image" loading="lazy" {...props} />,
          a: (props) => <a className="md-link" {...props} />,
          ul: (props) => <ul className="md-list" {...props} />,
          ol: (props) => <ol className="md-list" {...props} />,
          blockquote: (props) => <blockquote className="md-quote" {...props} />,
          table: (props) => <table className="md-table" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

export default MarkdownRenderer
