export const QUIZ_STATUS = {
  IDLE: 'idle',
  ACTIVE: 'active',
  FINISHED: 'finished',
}

export const ACTIONS = {
  START: 'START_QUIZ',
  ANSWER: 'ANSWER_QUESTION',
  NEXT: 'NEXT_QUESTION',
  FINISH: 'FINISH_QUIZ',
  RESET: 'RESET_QUIZ',
}

export const initialState = {
  status: QUIZ_STATUS.IDLE,
  category: 'all',
  difficulty: 'all',
  questions: [],
  currentIndex: 0,
  answers: [],
  startedAt: null,
  finishedAt: null,
}

export function quizReducer(state, action) {
  switch (action.type) {
    case ACTIONS.START: {
      const { category, difficulty, questions, startedAt } = action.payload

      return {
        ...initialState,
        status: QUIZ_STATUS.ACTIVE,
        category,
        difficulty,
        questions,
        startedAt,
      }
    }

    case ACTIONS.ANSWER: {
      if (state.status !== QUIZ_STATUS.ACTIVE) return state

      const question = state.questions[state.currentIndex]
      if (!question) return state

      const alreadyAnswered = state.answers.some((answer) => answer.questionId === question.id)
      if (alreadyAnswered) return state

      const { selectedIndex } = action.payload

      return {
        ...state,
        answers: [
          ...state.answers,
          {
            questionId: question.id,
            selectedIndex,
            isCorrect: selectedIndex === question.answerIndex,
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
        }
      }

      return {
        ...state,
        currentIndex: state.currentIndex + 1,
      }
    }

    case ACTIONS.FINISH: {
      if (state.status !== QUIZ_STATUS.ACTIVE) return state

      return {
        ...state,
        status: QUIZ_STATUS.FINISHED,
        finishedAt: action.payload.timestamp,
      }
    }

    case ACTIONS.RESET:
      return initialState

    default:
      return state
  }
}
