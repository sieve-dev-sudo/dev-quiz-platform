import { useTheme } from '../hooks/useTheme'
import Icon from './Icon'
import './ThemeToggle.css'

const THEME_OPTIONS = [
  { id: 'light', label: 'Light', icon: 'sun' },
  { id: 'dark', label: 'Dark', icon: 'moon' },
  { id: 'system', label: 'System', icon: 'monitor' },
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
            <Icon name={option.icon} className="theme-icon" />
          </button>
        )
      })}
    </div>
  )
}

export default ThemeToggle
