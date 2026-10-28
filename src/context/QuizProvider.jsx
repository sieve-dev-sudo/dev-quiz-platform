import { useCallback, useMemo, useReducer } from 'react'
import { QuizContext } from './QuizContext'
import { ACTIONS, QUIZ_STATUS, initialState, quizReducer } from './quizReducer'
import { filterQuestions } from '../utils/questionUtils'

function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(quizReducer, initialState)

  const startQuiz = useCallback(({ category = 'all', difficulty = 'all' } = {}) => {
    const questions = filterQuestions({ category, difficulty })

    dispatch({
      type: ACTIONS.START,
      payload: { category, difficulty, questions, startedAt: Date.now() },
    })
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
      answerQuestion,
      nextQuestion,
      finishQuiz,
      resetQuiz,
    }
  }, [state, startQuiz, answerQuestion, nextQuestion, finishQuiz, resetQuiz])

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>
}

export default QuizProvider
