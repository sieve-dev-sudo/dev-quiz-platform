import { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import QuestionCard from '../components/QuestionCard'
import AnswerFeedback from '../components/AnswerFeedback'
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
      <QuestionCard
        key={currentQuestion.id}
        question={currentQuestion}
        questionNumber={currentIndex + 1}
        totalQuestions={totalQuestions}
        selectedIndex={currentAnswer ? currentAnswer.selectedIndex : null}
        onSelect={answerQuestion}
      />

      {currentAnswer && (
        <AnswerFeedback
          isCorrect={currentAnswer.isCorrect}
          correctAnswer={currentQuestion.options[currentQuestion.answerIndex]}
          explanation={currentQuestion.explanation}
        />
      )}

      <div className="quiz-actions">
        <span className="quiz-live-score">
          Score: <strong>{score}</strong> / {totalQuestions}
        </span>
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
