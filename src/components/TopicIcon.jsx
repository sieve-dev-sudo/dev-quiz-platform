import { getCategoryById } from '../data/categories'
import Icon from './Icon'
import './TopicIcon.css'

// A colored rounded square with a line icon inside.
// Pass a category (object or id), or a custom icon and color.
function TopicIcon({ category, icon, color, size = 'md' }) {
  const item = typeof category === 'string' ? getCategoryById(category) : category
  const iconName = icon ?? item?.icon ?? 'help'
  const iconColor = color ?? item?.color ?? 'var(--color-primary)'

  return (
    <span
      className={`topic-icon topic-icon-${size}`}
      style={{ '--topic-color': iconColor }}
      aria-hidden="true"
    >
      <Icon name={iconName} />
    </span>
  )
}

export default TopicIcon
