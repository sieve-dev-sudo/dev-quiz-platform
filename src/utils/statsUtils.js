import { CATEGORIES } from '../data/categories'
import { getMistakeList } from './mistakeUtils'
import { getPercent } from './resultUtils'

function sumEntries(entries) {
  return entries.reduce(
    (totals, entry) => ({
      quizzes: totals.quizzes + 1,
      questions: totals.questions + (entry.total ?? 0),
      correct: totals.correct + (entry.score ?? 0),
      time: totals.time + (entry.duration ?? 0),
    }),
    { quizzes: 0, questions: 0, correct: 0, time: 0 },
  )
}

export function getOverallStats(history) {
  const totals = sumEntries(history)

  return {
    ...totals,
    accuracy: getPercent(totals.correct, totals.questions),
  }
}

export function getCategoryStats(history, bestScores = {}, mistakes = {}) {
  const mistakeList = getMistakeList(mistakes)

  return CATEGORIES.map((category) => {
    const entries = history.filter((entry) => entry.category === category.id)
    const totals = sumEntries(entries)

    return {
      category,
      quizzes: totals.quizzes,
      questions: totals.questions,
      correct: totals.correct,
      accuracy: getPercent(totals.correct, totals.questions),
      best: bestScores[category.id]?.percent ?? null,
      mistakes: mistakeList.filter((item) => item.category === category.id).length,
    }
  })
}

export function getHighlights(categoryStats) {
  const played = categoryStats.filter((item) => item.quizzes > 0)

  if (played.length === 0) {
    return { strongest: null, weakest: null }
  }

  const sorted = [...played].sort(
    (a, b) => b.accuracy - a.accuracy || b.questions - a.questions,
  )

  return {
    strongest: sorted[0],
    weakest: sorted.length > 1 ? sorted[sorted.length - 1] : null,
  }
}

export function getRecentScores(history, limit = 10) {
  return history.slice(0, limit).reverse()
}
