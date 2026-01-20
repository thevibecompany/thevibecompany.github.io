import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

const getPreferredTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light'
  const stored = window.localStorage.getItem('theme') as Theme | null
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const applyTheme = (theme: Theme) => {
  document.documentElement.setAttribute('data-theme', theme)
  window.localStorage.setItem('theme', theme)
}

const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>(() => getPreferredTheme())

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (event: MediaQueryListEvent) => {
      const stored = window.localStorage.getItem('theme') as Theme | null
      if (stored) return
      setTheme(event.matches ? 'dark' : 'light')
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const toggle = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))

  return (
    <button className="theme-toggle" type="button" onClick={toggle} aria-label="테마 전환">
      {theme === 'light' ? '🌞' : '🌙'}
    </button>
  )
}

export default ThemeToggle
