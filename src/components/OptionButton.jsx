import './OptionButton.css'

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F']

function OptionButton({ index, text, isSelected, isDisabled, onSelect }) {
  const className = isSelected ? 'option-button selected' : 'option-button'

  return (
    <button
      type="button"
      className={className}
      onClick={() => onSelect(index)}
      disabled={isDisabled}
      aria-pressed={isSelected}
    >
      <span className="option-letter">{LETTERS[index]}</span>
      <span className="option-text">{text}</span>
    </button>
  )
}

export default OptionButton
