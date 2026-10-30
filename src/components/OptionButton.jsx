import './OptionButton.css'

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F']

const STATUS_ICONS = {
  correct: '✓',
  wrong: '✗',
}

function OptionButton({ index, text, status = 'idle', isSelected, isDisabled, onSelect }) {
  const className = status === 'idle' ? 'option-button' : `option-button ${status}`
  const icon = STATUS_ICONS[status]

  return (
    <button
      type="button"
      className={className}
      onClick={() => onSelect(index)}
      disabled={isDisabled}
      aria-pressed={isSelected}
    >
      <span className="option-letter" aria-hidden={icon ? 'true' : undefined}>
        {icon ?? LETTERS[index]}
      </span>
      <span className="option-text">{text}</span>
    </button>
  )
}

export default OptionButton
