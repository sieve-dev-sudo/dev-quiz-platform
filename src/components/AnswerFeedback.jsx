import './AnswerFeedback.css'

function getFeedback(isCorrect, timedOut) {
  if (isCorrect) return { icon: '✓', title: 'Correct!' }
  if (timedOut) return { icon: '⏰', title: "Time's up!" }
  return { icon: '✗', title: 'Not quite.' }
}

function AnswerFeedback({ isCorrect, timedOut = false, correctAnswer, explanation }) {
  const feedback = getFeedback(isCorrect, timedOut)

  return (
    <div
      className={isCorrect ? 'answer-feedback correct' : 'answer-feedback wrong'}
      role="status"
      aria-live="polite"
    >
      <p className="answer-feedback-title">
        <span aria-hidden="true">{feedback.icon}</span>
        {feedback.title}
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
