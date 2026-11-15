import Icon from './Icon'
import './AnswerFeedback.css'

function getFeedback(isCorrect, timedOut) {
  if (isCorrect) return { icon: 'check', title: 'Correct!' }
  if (timedOut) return { icon: 'clock', title: "Time's up!" }
  return { icon: 'x', title: 'Not quite.' }
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
        <Icon name={feedback.icon} size={20} strokeWidth={2.5} />
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
