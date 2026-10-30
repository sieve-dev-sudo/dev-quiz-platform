import './AnswerFeedback.css'

function AnswerFeedback({ isCorrect, correctAnswer, explanation }) {
  return (
    <div
      className={isCorrect ? 'answer-feedback correct' : 'answer-feedback wrong'}
      role="status"
      aria-live="polite"
    >
      <p className="answer-feedback-title">
        <span aria-hidden="true">{isCorrect ? '✓' : '✗'}</span>
        {isCorrect ? 'Correct!' : 'Not quite.'}
      </p>

      {!isCorrect && (
        <p className="answer-feedback-answer">
          Correct answer: <strong>{correctAnswer}</strong>
        </p>
      )}

      <p className="answer-feedback-explanation">{explanation}</p>
    </div>
  )
}

export default AnswerFeedback
