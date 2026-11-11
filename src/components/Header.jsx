import { Link, NavLink } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'
import './Header.css'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/history', label: 'History' },
  { to: '/stats', label: 'Stats' },
  { to: '/analytics', label: 'Analytics' },
]

function Header() {
  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="header-logo">
          DevQuiz Platform
        </Link>

        <div className="header-actions">
          <nav className="header-nav" aria-label="Main navigation">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) => (isActive ? 'header-link active' : 'header-link')}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

export default Header
