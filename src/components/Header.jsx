import { Link, NavLink } from 'react-router-dom'
import './Header.css'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/history', label: 'History' },
  { to: '/stats', label: 'Stats' },
]

function Header() {
  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="header-logo">
          <span className="header-logo-icon">&lt;/&gt;</span>
          <span>DevQuiz</span>
        </Link>

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
      </div>
    </header>
  )
}

export default Header
