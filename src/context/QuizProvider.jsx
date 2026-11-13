import { useCallback, useEffect, useMemo, useReducer } from 'react'
import { QuizContext } from './QuizContext'
import { ACTIONS, QUIZ_STATUS, initialState, quizReducer } from './quizReducer'
import { filterQuestions, getQuestionsByIds } from '../utils/questionUtils'
import { clearSavedQuiz, toSavedQuiz } from '../utils/savedQuiz'
import { shuffleArray, shuffleQuestionOptions } from '../utils/shuffle'
import { writeStorage } from '../utils/storage'
import { STORAGE_KEYS } from '../utils/storageKeys'

function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(quizReducer, initialState)

  // Save the active quiz so it can be resumed after a refresh or closing the tab
  useEffect(() => {
    if (state.status === QUIZ_STATUS.ACTIVE && state.questions.length > 0) {
      writeStorage(STORAGE_KEYS.ACTIVE_QUIZ, toSavedQuiz(state))
    }

    if (state.status === QUIZ_STATUS.FINISHED) {
      clearSavedQuiz()
    }
  }, [state])

  const startQuiz = useCallback(
    ({
      mode = 'normal',
      category = 'all',
      difficulty = 'all',
      questionIds = null,
      shuffle = false,
    } = {}) => {
      const pool = Array.isArray(questionIds)
        ? getQuestionsByIds(questionIds)
        : filterQuestions({ category, difficulty })

      const questions = shuffle ? shuffleArray(pool).map(shuffleQuestionOptions) : pool

      dispatch({
        type: ACTIONS.START,
        payload: { mode, category, difficulty, questions, startedAt: Date.now() },
      })
    },
    [],
  )

  const restoreQuiz = useCallback((savedQuiz) => {
    dispatch({ type: ACTIONS.RESTORE, payload: savedQuiz })
  }, [])

  const answerQuestion = useCallback((selectedIndex) => {
    dispatch({ type: ACTIONS.ANSWER, payload: { selectedIndex } })
  }, [])

  const nextQuestion = useCallback(() => {
    dispatch({ type: ACTIONS.NEXT, payload: { timestamp: Date.now() } })
  }, [])

  const finishQuiz = useCallback(() => {
    dispatch({ type: ACTIONS.FINISH, payload: { timestamp: Date.now() } })
  }, [])

  const resetQuiz = useCallback(() => {
    clearSavedQuiz()
    dispatch({ type: ACTIONS.RESET })
  }, [])

  const value = useMemo(() => {
    const currentQuestion = state.questions[state.currentIndex] ?? null
    const currentAnswer = currentQuestion
      ? (state.answers.find((answer) => answer.questionId === currentQuestion.id) ?? null)
      : null
    const totalQuestions = state.questions.length
    const score = state.answers.filter((answer) => answer.isCorrect).length

    return {
      ...state,
      currentQuestion,
      currentAnswer,
      totalQuestions,
      score,
      isLastQuestion: state.currentIndex === totalQuestions - 1,
      isActive: state.status === QUIZ_STATUS.ACTIVE,
      isFinished: state.status === QUIZ_STATUS.FINISHED,
      startQuiz,
      restoreQuiz,
      answerQuestion,
      nextQuestion,
      finishQuiz,
      resetQuiz,
    }
  }, [state, startQuiz, restoreQuiz, answerQuestion, nextQuestion, finishQuiz, resetQuiz])

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>
}

export default QuizProvider
