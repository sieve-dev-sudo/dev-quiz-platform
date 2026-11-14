import { CATEGORIES, DIFFICULTIES } from '../data/categories'

const DIFFICULTY_COLORS = {
  easy: 'var(--color-success)',
  medium: 'var(--color-warning)',
  hard: 'var(--color-error)',
  all: 'var(--color-primary)',
}

export function getTopicDistribution(history) {
  return CATEGORIES.map((category) => ({
    id: category.id,
    label: category.name,
    icon: category.icon,
    value: history.filter((entry) => entry.category === category.id).length,
    color: category.color,
  })).filter((item) => item.value > 0)
}

export function getAnswerDistribution(history) {
  const totals = history.reduce(
    (sum, entry) => ({
      correct: sum.correct + (entry.score ?? 0),
      wrong: sum.wrong + ((entry.total ?? 0) - (entry.score ?? 0)),
    }),
    { correct: 0, wrong: 0 },
  )

  return [
    {
      id: 'correct',
      label: 'Correct',
      icon: 'check',
      value: totals.correct,
      color: 'var(--color-success)',
    },
    { id: 'wrong', label: 'Wrong', icon: 'x', value: totals.wrong, color: 'var(--color-error)' },
  ].filter((item) => item.value > 0)
}

export function getDifficultyDistribution(history) {
  const options = [...DIFFICULTIES, { id: 'all', name: 'All' }]

  return options
    .map((difficulty) => ({
      id: difficulty.id,
      label: difficulty.name,
      value: history.filter((entry) => entry.difficulty === difficulty.id).length,
      color: DIFFICULTY_COLORS[difficulty.id],
    }))
    .filter((item) => item.value > 0)
}

export function getAnswerTotals(history) {
  return history.reduce(
    (sum, entry) => ({
      correct: sum.correct + (entry.score ?? 0),
      total: sum.total + (entry.total ?? 0),
    }),
    { correct: 0, total: 0 },
  )
}
