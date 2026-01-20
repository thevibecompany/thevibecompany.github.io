import { Link, NavLink, Outlet } from 'react-router-dom'

import ThemeToggle from '../components/ThemeToggle'

const AppLayout = () => {
  return (
    <div className="app-shell">
      <header className="app-header">
        <Link to="/" className="brand">
          <span className="brand-mark">V</span>
          <div className="brand-text">
            <strong>The Vibe Company</strong>
            <small>Stories & Notes</small>
          </div>
        </Link>
        <nav className="nav-links">
          <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            홈
          </NavLink>
          <NavLink to="/tags" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            태그
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            소개
          </NavLink>
        </nav>
        <ThemeToggle />
      </header>

      <main className="app-main">
        <Outlet />
      </main>

      <footer className="app-footer">
        <div>© {new Date().getFullYear()} The Vibe Company</div>
        <div className="footer-links">
          <a href="/rss.xml">RSS</a>
          <a href="/sitemap.xml">Sitemap</a>
        </div>
      </footer>
    </div>
  )
}

export default AppLayout
