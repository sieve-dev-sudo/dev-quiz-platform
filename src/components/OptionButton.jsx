import Icon from './Icon'
import './OptionButton.css'

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F']

const STATUS_ICONS = {
  correct: 'check',
  wrong: 'x',
}

function OptionButton({
  index,
  text,
  status = 'idle',
  isSelected,
  isDisabled,
  isCode = false,
  onSelect,
}) {
  const className = status === 'idle' ? 'option-button' : `option-button ${status}`
  const icon = STATUS_ICONS[status]

  return (
    <button
      type="button"
      className={className}
      onClick={() => onSelect(index)}
      disabled={isDisabled}
      aria-pressed={isSelected}
      aria-keyshortcuts={`${index + 1} ${LETTERS[index]}`}
    >
      <span className="option-letter" aria-hidden={icon ? 'true' : undefined}>
        {icon ? <Icon name={icon} size={16} strokeWidth={3} /> : LETTERS[index]}
      </span>
      <span className={isCode ? 'option-text code' : 'option-text'}>{text}</span>
    </button>
  )
}

export default OptionButton
