import { useState } from 'react'
import './AnswerReview.css'

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F']

function AnswerReview({ questions, answers }) {
  const wrongCount = answers.filter((answer) => !answer.isCorrect).length
  const [showWrongOnly, setShowWrongOnly] = useState(wrongCount > 0)

  const items = questions.map((question, index) => ({
    question,
    number: index + 1,
    answer: answers.find((item) => item.questionId === question.id) ?? null,
  }))

  const visibleItems = showWrongOnly ? items.filter((item) => !item.answer?.isCorrect) : items

  return (
    <section className="card answer-review">
      <div className="answer-review-header">
        <h3>Review answers</h3>
        <div className="answer-review-tabs">
          <button
            type="button"
            className={showWrongOnly ? 'review-tab active' : 'review-tab'}
            onClick={() => setShowWrongOnly(true)}
            aria-pressed={showWrongOnly}
          >
            Wrong ({wrongCount})
          </button>
          <button
            type="button"
            className={!showWrongOnly ? 'review-tab active' : 'review-tab'}
            onClick={() => setShowWrongOnly(false)}
            aria-pressed={!showWrongOnly}
          >
            All ({questions.length})
          </button>
        </div>
      </div>

      {visibleItems.length === 0 ? (
        <p className="text-muted answer-review-empty">No mistakes. Great job! 🎉</p>
      ) : (
        <ol className="answer-review-list">
          {visibleItems.map(({ question, number, answer }) => {
            const isCorrect = answer?.isCorrect ?? false
            const selectedText = answer
              ? `${LETTERS[answer.selectedIndex]}. ${question.options[answer.selectedIndex]}`
              : 'Not answered'
            const correctText = `${LETTERS[question.answerIndex]}. ${question.options[question.answerIndex]}`

            return (
              <li key={question.id} className={isCorrect ? 'review-item correct' : 'review-item wrong'}>
                <div className="review-item-header">
                  <span className="review-item-number">Q{number}</span>
                  <span className={isCorrect ? 'badge badge-success' : 'badge badge-error'}>
                    {isCorrect ? 'Correct' : 'Wrong'}
                  </span>
                </div>

                <p className="review-item-question">{question.question}</p>

                <p className="review-item-line">
                  Your answer:{' '}
                  <span className={isCorrect ? 'review-answer correct' : 'review-answer wrong'}>
                    {selectedText}
                  </span>
                </p>

                {!isCorrect && (
                  <p className="review-item-line">
                    Correct answer: <span className="review-answer correct">{correctText}</span>
                  </p>
                )}

                <p className="review-item-explanation">{question.explanation}</p>
              </li>
            )
          })}
        </ol>
      )}
    </section>
  )
}

export default AnswerReview
