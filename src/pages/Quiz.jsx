import { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { getCategoryById, getDifficultyById } from '../data/categories'
import { QUIZ_STATUS } from '../context/quizReducer'
import { useQuiz } from '../hooks/useQuiz'
import './Quiz.css'

function Quiz() {
  const [searchParams] = useSearchParams()
  const categoryId = searchParams.get('category') || 'all'
  const difficultyId = searchParams.get('difficulty') || 'all'

  const category = getCategoryById(categoryId)
  const difficulty = getDifficultyById(difficultyId)
  const title = category ? `${category.icon} ${category.name} Quiz` : 'Quiz'
  const difficultyName = difficulty ? difficulty.name : 'All'

  const {
    status,
    currentQuestion,
    currentAnswer,
    currentIndex,
    totalQuestions,
    score,
    isLastQuestion,
    startQuiz,
    answerQuestion,
    nextQuestion,
    resetQuiz,
  } = useQuiz()

  useEffect(() => {
    startQuiz({ category: categoryId, difficulty: difficultyId })
  }, [categoryId, difficultyId, startQuiz])

  function handleRestart() {
    startQuiz({ category: categoryId, difficulty: difficultyId })
  }

  if (status === QUIZ_STATUS.IDLE) {
    return (
      <section className="card quiz-box">
        <p className="text-muted">Loading quiz...</p>
      </section>
    )
  }

  if (totalQuestions === 0) {
    return (
      <section className="card quiz-box">
        <h2>{title}</h2>
        <p className="text-muted">No questions found for this selection.</p>
        <div className="quiz-actions">
          <Link to="/" className="btn btn-outline" onClick={resetQuiz}>
            Back to Home
          </Link>
        </div>
      </section>
    )
  }

  if (status === QUIZ_STATUS.FINISHED) {
    return (
      <section className="card quiz-box">
        <h2>{title}</h2>
        <p className="text-muted">Difficulty: {difficultyName}</p>
        <p className="quiz-score">
          You scored {score} / {totalQuestions}
        </p>
        <div className="quiz-actions">
          <button type="button" className="btn btn-primary" onClick={handleRestart}>
            Try Again
          </button>
          <Link to="/" className="btn btn-outline" onClick={resetQuiz}>
            Back to Home
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="card quiz-box">
      <div className="quiz-meta">
        <span className="badge">
          {title} · {difficultyName}
        </span>
        <span className="text-muted">
          Question {currentIndex + 1} of {totalQuestions}
        </span>
      </div>

      <h3>{currentQuestion.question}</h3>

      <div className="quiz-options">
        {currentQuestion.options.map((option, index) => {
          const isSelected = currentAnswer?.selectedIndex === index

          return (
            <button
              key={option}
              type="button"
              className={isSelected ? 'btn btn-primary quiz-option' : 'btn btn-outline quiz-option'}
              onClick={() => answerQuestion(index)}
              disabled={currentAnswer !== null}
            >
              {option}
            </button>
          )
        })}
      </div>

      {currentAnswer && (
        <p className="text-muted">
          {currentAnswer.isCorrect ? 'Correct!' : 'Wrong answer.'} Score: {score}
        </p>
      )}

      <div className="quiz-actions">
        <button
          type="button"
          className="btn btn-primary"
          onClick={nextQuestion}
          disabled={currentAnswer === null}
        >
          {isLastQuestion ? 'Finish' : 'Next'}
        </button>
      </div>
    </section>
  )
}

export default Quiz
