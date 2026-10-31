import { getPercent } from './resultUtils'

export const MAX_HISTORY = 50

export function createHistoryEntry({ category, difficulty, score, total, startedAt, finishedAt }) {
  return {
    id: `${startedAt}-${category}-${difficulty}`,
    category,
    difficulty,
    score,
    total,
    percent: getPercent(score, total),
    duration: finishedAt - startedAt,
    finishedAt,
  }
}

export function addHistoryEntry(history, entry) {
  const safeHistory = Array.isArray(history) ? history : []
  const alreadySaved = safeHistory.some((item) => item.id === entry.id)

  if (alreadySaved) return safeHistory
  return [entry, ...safeHistory].slice(0, MAX_HISTORY)
}

const dateFormatter = new Intl.DateTimeFormat('en', {
  dateStyle: 'medium',
  timeStyle: 'short',
})

export function formatDate(timestamp) {
  if (!timestamp) return '-'
  return dateFormatter.format(new Date(timestamp))
}
