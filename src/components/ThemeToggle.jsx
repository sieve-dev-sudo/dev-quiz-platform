import { useTheme } from '../hooks/useTheme'
import './ThemeToggle.css'

const THEME_OPTIONS = [
  { id: 'light', icon: '☀️', label: 'Light' },
  { id: 'dark', icon: '🌙', label: 'Dark' },
  { id: 'system', icon: '💻', label: 'System' },
]

function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="theme-toggle" role="radiogroup" aria-label="Color theme">
      {THEME_OPTIONS.map((option) => {
        const isSelected = theme === option.id

        return (
          <button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={isSelected}
            aria-label={`${option.label} theme`}
            title={option.label}
            className={isSelected ? 'theme-option selected' : 'theme-option'}
            onClick={() => setTheme(option.id)}
          >
            <span aria-hidden="true">{option.icon}</span>
          </button>
        )
      })}
    </div>
  )
}

export default ThemeToggle
