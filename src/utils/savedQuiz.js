import { readStorage, removeStorage } from './storage'
import { STORAGE_KEYS } from './storageKeys'

export function toSavedQuiz(state) {
  return {
    mode: state.mode,
    category: state.category,
    difficulty: state.difficulty,
    questions: state.questions,
    currentIndex: state.currentIndex,
    answers: state.answers,
    startedAt: state.startedAt,
    savedAt: Date.now(),
  }
}

function isValidSavedQuiz(value) {
  return (
    Boolean(value) &&
    typeof value === 'object' &&
    Array.isArray(value.questions) &&
    value.questions.length > 0 &&
    Array.isArray(value.answers) &&
    Number.isInteger(value.currentIndex) &&
    value.currentIndex >= 0 &&
    value.currentIndex < value.questions.length
  )
}

export function readSavedQuiz() {
  const saved = readStorage(STORAGE_KEYS.ACTIVE_QUIZ, null)
  return isValidSavedQuiz(saved) ? saved : null
}

export function clearSavedQuiz() {
  removeStorage(STORAGE_KEYS.ACTIVE_QUIZ)
}

export function isSameQuiz(saved, { mode, category, difficulty }) {
  return saved.mode === mode && saved.category === category && saved.difficulty === difficulty
}

export function getSavedQuizUrl(saved) {
  if (saved.mode === 'mistakes') {
    return saved.category && saved.category !== 'all'
      ? `/quiz?mode=mistakes&category=${saved.category}`
      : '/quiz?mode=mistakes'
  }

  return `/quiz?category=${saved.category}&difficulty=${saved.difficulty}`
}
