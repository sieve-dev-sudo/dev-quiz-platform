import { useLocation } from 'react-router-dom'
import { QUIZ_STATUS } from '../context/quizReducer'
import { useQuiz } from './useQuiz'

export function useQuizInProgress() {
  const { status, answers } = useQuiz()
  const { pathname } = useLocation()

  return pathname === '/quiz' && status === QUIZ_STATUS.ACTIVE && answers.length > 0
}
