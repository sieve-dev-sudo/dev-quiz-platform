import { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import ProgressBar from '../components/ProgressBar'
import QuestionCard from '../components/QuestionCard'
import AnswerFeedback from '../components/AnswerFeedback'
import ResultSummary from '../components/ResultSummary'
import AnswerReview from '../components/AnswerReview'
import { getCategoryById, getDifficultyById } from '../data/categories'
import { QUIZ_STATUS } from '../context/quizReducer'
import { useQuiz } from '../hooks/useQuiz'
import { useQuizHistory } from '../hooks/useQuizHistory'
import { createHistoryEntry } from '../utils/historyUtils'
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
    questions,
    answers,
    currentQuestion,
    currentAnswer,
    currentIndex,
    totalQuestions,
    score,
    isLastQuestion,
    startedAt,
    finishedAt,
    startQuiz,
    answerQuestion,
    nextQuestion,
    resetQuiz,
  } = useQuiz()

  const { addEntry } = useQuizHistory()

  useEffect(() => {
    startQuiz({ category: categoryId, difficulty: difficultyId })
  }, [categoryId, difficultyId, startQuiz])

  function handleRestart() {
    startQuiz({ category: categoryId, difficulty: difficultyId })
  }

  function handleNext() {
    if (isLastQuestion && startedAt) {
      addEntry(
        createHistoryEntry({
          category: categoryId,
          difficulty: difficultyId,
          score,
          total: totalQuestions,
          startedAt,
          finishedAt: Date.now(),
        }),
      )
    }

    nextQuestion()
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
      <div className="quiz-result">
        <ResultSummary
          title={title}
          difficultyName={difficultyName}
          score={score}
          total={totalQuestions}
          startedAt={startedAt}
          finishedAt={finishedAt}
        />

        <div className="quiz-actions quiz-result-actions">
          <button type="button" className="btn btn-primary" onClick={handleRestart}>
            Try Again
          </button>
          <Link to="/history" className="btn btn-outline" onClick={resetQuiz}>
            View History
          </Link>
          <Link to="/" className="btn btn-outline" onClick={resetQuiz}>
            Back to Home
          </Link>
        </div>

        <AnswerReview questions={questions} answers={answers} />
      </div>
    )
  }

  const steps = questions.map((question, index) => {
    const answer = answers.find((item) => item.questionId === question.id)
    if (answer) return answer.isCorrect ? 'correct' : 'wrong'
    return index === currentIndex ? 'current' : 'upcoming'
  })

  return (
    <section className="card quiz-box">
      <ProgressBar
        current={currentIndex + 1}
        total={totalQuestions}
        answeredCount={answers.length}
        steps={steps}
      />

      <QuestionCard
        key={currentQuestion.id}
        question={currentQuestion}
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
          onClick={handleNext}
          disabled={currentAnswer === null}
        >
          {isLastQuestion ? 'Finish' : 'Next'}
        </button>
      </div>
    </section>
  )
}

export default Quiz
