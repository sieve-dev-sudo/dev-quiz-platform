export const QUIZ_STATUS = {
  IDLE: 'idle',
  ACTIVE: 'active',
  FINISHED: 'finished',
}

export const ACTIONS = {
  START: 'START_QUIZ',
  RESTORE: 'RESTORE_QUIZ',
  ANSWER: 'ANSWER_QUESTION',
  NEXT: 'NEXT_QUESTION',
  FINISH: 'FINISH_QUIZ',
  RESET: 'RESET_QUIZ',
}

export const initialState = {
  status: QUIZ_STATUS.IDLE,
  mode: 'normal',
  category: 'all',
  difficulty: 'all',
  questions: [],
  currentIndex: 0,
  answers: [],
  startedAt: null,
  finishedAt: null,
  resumed: false,
}

export function quizReducer(state, action) {
  switch (action.type) {
    case ACTIONS.START: {
      const { mode, category, difficulty, questions, startedAt } = action.payload

      return {
        ...initialState,
        status: QUIZ_STATUS.ACTIVE,
        mode: mode ?? 'normal',
        category,
        difficulty,
        questions,
        startedAt,
      }
    }

    case ACTIONS.RESTORE: {
      const { mode, category, difficulty, questions, currentIndex, answers, startedAt } =
        action.payload

      return {
        ...initialState,
        status: QUIZ_STATUS.ACTIVE,
        mode: mode ?? 'normal',
        category,
        difficulty,
        questions,
        currentIndex,
        answers,
        startedAt,
        resumed: true,
      }
    }

    case ACTIONS.ANSWER: {
      if (state.status !== QUIZ_STATUS.ACTIVE) return state

      const question = state.questions[state.currentIndex]
      if (!question) return state

      const alreadyAnswered = state.answers.some((answer) => answer.questionId === question.id)
      if (alreadyAnswered) return state

      const { selectedIndex } = action.payload
      const timedOut = selectedIndex === null || selectedIndex === undefined

      return {
        ...state,
        answers: [
          ...state.answers,
          {
            questionId: question.id,
            selectedIndex: timedOut ? null : selectedIndex,
            isCorrect: !timedOut && selectedIndex === question.answerIndex,
            timedOut,
          },
        ],
      }
    }

    case ACTIONS.NEXT: {
      if (state.status !== QUIZ_STATUS.ACTIVE) return state

      const isLastQuestion = state.currentIndex >= state.questions.length - 1

      if (isLastQuestion) {
        return {
          ...state,
          status: QUIZ_STATUS.FINISHED,
          finishedAt: action.payload.timestamp,
          resumed: false,
        }
      }

      return {
        ...state,
        currentIndex: state.currentIndex + 1,
        resumed: false,
      }
    }

    case ACTIONS.FINISH: {
      if (state.status !== QUIZ_STATUS.ACTIVE) return state

      return {
        ...state,
        status: QUIZ_STATUS.FINISHED,
        finishedAt: action.payload.timestamp,
        resumed: false,
      }
    }

    case ACTIONS.RESET:
      return initialState

    default:
      return state
  }
}
