import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import ConfirmDialog from './ConfirmDialog'
import ThemeToggle from './ThemeToggle'
import { useQuiz } from '../hooks/useQuiz'
import { useQuizInProgress } from '../hooks/useQuizInProgress'
import './Header.css'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/history', label: 'History' },
  { to: '/stats', label: 'Stats' },
  { to: '/analytics', label: 'Analytics' },
]

function Header() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { resetQuiz } = useQuiz()
  const isQuizInProgress = useQuizInProgress()
  const [pendingPath, setPendingPath] = useState(null)

  // Warn on refresh or tab close while a quiz is in progress
  useEffect(() => {
    if (!isQuizInProgress) return undefined

    function handleBeforeUnload(event) {
      event.preventDefault()
      event.returnValue = ''
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [isQuizInProgress])

  function handleNavigate(event, to) {
    if (!isQuizInProgress || to === pathname) return

    event.preventDefault()
    setPendingPath(to)
  }

  function handleStay() {
    setPendingPath(null)
  }

  function handleLeave() {
    const path = pendingPath
    setPendingPath(null)
    resetQuiz()
    navigate(path)
  }

  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="header-logo" onClick={(event) => handleNavigate(event, '/')}>
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
                onClick={(event) => handleNavigate(event, link.to)}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <ThemeToggle />
        </div>
      </div>

      <ConfirmDialog
        open={pendingPath !== null}
        title="Leave quiz?"
        message="Your progress will be lost and this quiz will not be saved."
        confirmLabel="Leave quiz"
        cancelLabel="Stay"
        onConfirm={handleLeave}
        onCancel={handleStay}
      />
    </header>
  )
}

export default Header
