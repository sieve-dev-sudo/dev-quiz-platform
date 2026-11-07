import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import ProgressBar from '../components/ProgressBar'
import QuestionTimer from '../components/QuestionTimer'
import QuestionCard from '../components/QuestionCard'
import AnswerFeedback from '../components/AnswerFeedback'
import KeyboardHint from '../components/KeyboardHint'
import ResultSummary from '../components/ResultSummary'
import AnswerReview from '../components/AnswerReview'
import { getCategoryById, getDifficultyById } from '../data/categories'
import { QUIZ_STATUS } from '../context/quizReducer'
import { useBestScores } from '../hooks/useBestScores'
import { useMistakes } from '../hooks/useMistakes'
import { useQuiz } from '../hooks/useQuiz'
import { useQuizHistory } from '../hooks/useQuizHistory'
import { useQuizShortcuts } from '../hooks/useQuizShortcuts'
import { useSettings } from '../hooks/useSettings'
import { isBetterScore } from '../utils/bestScoreUtils'
import { createHistoryEntry } from '../utils/historyUtils'
import { getMistakeQuestionIds } from '../utils/mistakeUtils'
import { DEFAULT_SETTINGS, normalizeSettings } from '../utils/settingsUtils'
import { readStorage } from '../utils/storage'
import { STORAGE_KEYS } from '../utils/storageKeys'
import './Quiz.css'

function buildStartOptions(isMistakesMode, categoryId, difficultyId) {
  const { shuffle, questionCount } = normalizeSettings(
    readStorage(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS),
  )

  if (!isMistakesMode) {
    return { category: categoryId, difficulty: difficultyId, shuffle, limit: questionCount }
  }

  const storedMistakes = readStorage(STORAGE_KEYS.MISTAKES, {})

  return {
    category: categoryId,
    difficulty: 'all',
    questionIds: getMistakeQuestionIds(storedMistakes, categoryId),
    shuffle,
  }
}

function getQuizTitle(isMistakesMode, category) {
  if (isMistakesMode) {
    return category ? `🔁 ${category.name} Mistakes Review` : '🔁 Mistakes Review'
  }

  return category ? `${category.icon} ${category.name} Quiz` : 'Quiz'
}

function Quiz() {
  const [searchParams] = useSearchParams()
  const isMistakesMode = searchParams.get('mode') === 'mistakes'
  const categoryId = searchParams.get('category') || 'all'
  const difficultyId = isMistakesMode ? 'all' : searchParams.get('difficulty') || 'all'

  const category = getCategoryById(categoryId)
  const difficulty = getDifficultyById(difficultyId)
  const title = getQuizTitle(isMistakesMode, category)
  const difficultyName = isMistakesMode ? 'Mixed' : difficulty ? difficulty.name : 'All'

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
  const { bestScores, recordScore } = useBestScores()
  const { recordMistakes } = useMistakes()
  const { settings } = useSettings()
  const [bestRecord, setBestRecord] = useState(null)

  const isAnswered = currentAnswer !== null

  useEffect(() => {
    startQuiz(buildStartOptions(isMistakesMode, categoryId, difficultyId))
  }, [isMistakesMode, categoryId, difficultyId, startQuiz])

  function handleRestart() {
    startQuiz(buildStartOptions(isMistakesMode, categoryId, difficultyId))
  }

  function handleTimeUp() {
    answerQuestion(null)
  }

  function handleNext() {
    if (isLastQuestion && startedAt) {
      recordMistakes(answers, questions)

      if (!isMistakesMode) {
        const entry = createHistoryEntry({
          category: categoryId,
          difficulty: difficultyId,
          score,
          total: totalQuestions,
          startedAt,
          finishedAt: Date.now(),
        })

        addEntry(entry)

        if (category) {
          const previousBest = bestScores[categoryId] ?? null
          const isNewBest = isBetterScore(entry, previousBest)

          recordScore(entry)
          setBestRecord({ startedAt, isNewBest, previousBest })
        }
      }
    }

    nextQuestion()
  }

  useQuizShortcuts({
    enabled: status === QUIZ_STATUS.ACTIVE && currentQuestion !== null,
    optionCount: currentQuestion?.options.length ?? 0,
    isAnswered,
    onSelect: answerQuestion,
    onNext: handleNext,
  })

  const currentBestRecord = bestRecord?.startedAt === startedAt ? bestRecord : null
  const mistakesLink = category
    ? `/quiz?mode=mistakes&category=${categoryId}`
    : '/quiz?mode=mistakes'

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
        <p className="text-muted">
          {isMistakesMode
            ? 'No mistakes to review. Great job! 🎉'
            : 'No questions found for this selection.'}
        </p>
        <div className="quiz-actions">
          <Link to="/" className="btn btn-outline" onClick={resetQuiz}>
            Back to Home
          </Link>
        </div>
      </section>
    )
  }

  if (status === QUIZ_STATUS.FINISHED) {
    const hasWrongAnswers = score < totalQuestions

    return (
      <div className="quiz-result">
        <ResultSummary
          title={title}
          difficultyName={difficultyName}
          score={score}
          total={totalQuestions}
          startedAt={startedAt}
          finishedAt={finishedAt}
          isNewBest={currentBestRecord?.isNewBest ?? false}
          previousBest={currentBestRecord?.previousBest ?? null}
          bestScore={isMistakesMode ? null : (bestScores[categoryId] ?? null)}
        />

        <div className="quiz-actions quiz-result-actions">
          <button type="button" className="btn btn-primary" onClick={handleRestart}>
            Try Again
          </button>
          {hasWrongAnswers && !isMistakesMode && (
            <Link to={mistakesLink} className="btn btn-outline">
              Practice Mistakes
            </Link>
          )}
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

      {settings.timerSeconds > 0 && (
        <QuestionTimer
          key={`timer-${startedAt}-${currentQuestion.id}`}
          seconds={settings.timerSeconds}
          isRunning={!isAnswered}
          onExpire={handleTimeUp}
        />
      )}

      <QuestionCard
        key={`card-${startedAt}-${currentQuestion.id}`}
        question={currentQuestion}
        selectedIndex={currentAnswer ? currentAnswer.selectedIndex : null}
        isAnswered={isAnswered}
        onSelect={answerQuestion}
      />

      {currentAnswer && (
        <AnswerFeedback
          isCorrect={currentAnswer.isCorrect}
          timedOut={currentAnswer.timedOut}
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
          disabled={!isAnswered}
          aria-keyshortcuts="Enter"
        >
          {isLastQuestion ? 'Finish' : 'Next'}
        </button>
      </div>

      <KeyboardHint optionCount={currentQuestion.options.length} />
    </section>
  )
}

export default Quiz
