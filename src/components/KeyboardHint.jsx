import './KeyboardHint.css'

function ResultHint() {
  return (
    <p className="keyboard-hint">
      <span aria-hidden="true">⌨️</span>
      <span>
        <kbd>R</kbd> try again
      </span>
      <span className="keyboard-hint-separator" aria-hidden="true">
        ·
      </span>
      <span>
        <kbd>H</kbd> home
      </span>
    </p>
  )
}

function QuizHint({ optionCount }) {
  const lastNumber = Math.min(optionCount, 9)
  const lastLetter = String.fromCharCode('A'.charCodeAt(0) + optionCount - 1)

  return (
    <p className="keyboard-hint">
      <span aria-hidden="true">⌨️</span>
      <span>
        <kbd>1</kbd> to <kbd>{lastNumber}</kbd> or <kbd>A</kbd> to <kbd>{lastLetter}</kbd> to
        answer
      </span>
      <span className="keyboard-hint-separator" aria-hidden="true">
        ·
      </span>
      <span>
        <kbd>Enter</kbd> for next
      </span>
    </p>
  )
}

function KeyboardHint({ variant = 'quiz', optionCount = 4 }) {
  if (variant === 'result') return <ResultHint />
  return <QuizHint optionCount={optionCount} />
}

export default KeyboardHint
