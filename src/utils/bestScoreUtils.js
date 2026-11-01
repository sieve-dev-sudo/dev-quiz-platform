export function toScoreMap(value) {
  return value && typeof value === 'object' && !Array.isArray(value) ? value : {}
}

export function isBetterScore(candidate, current) {
  if (!candidate) return false
  if (!current) return true

  if (candidate.percent !== current.percent) {
    return candidate.percent > current.percent
  }

  return candidate.total > current.total
}

export function updateBestScores(bestScores, entry) {
  const safeScores = toScoreMap(bestScores)
  const current = safeScores[entry.category]

  if (!isBetterScore(entry, current)) return safeScores

  return {
    ...safeScores,
    [entry.category]: {
      percent: entry.percent,
      score: entry.score,
      total: entry.total,
      difficulty: entry.difficulty,
      achievedAt: entry.finishedAt,
    },
  }
}
