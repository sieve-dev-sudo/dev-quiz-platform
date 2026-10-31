export function getPercent(score, total) {
  if (!total) return 0
  return Math.round((score / total) * 100)
}

export function getGrade(percent) {
  if (percent >= 90) {
    return {
      label: 'Excellent!',
      message: 'Outstanding work. You really know this topic.',
      tone: 'success',
    }
  }

  if (percent >= 70) {
    return {
      label: 'Great job!',
      message: 'Solid knowledge. A little more practice and you will master it.',
      tone: 'success',
    }
  }

  if (percent >= 50) {
    return {
      label: 'Good effort',
      message: 'You are getting there. Review the explanations below.',
      tone: 'warning',
    }
  }

  return {
    label: 'Keep practicing',
    message: 'Every mistake is a lesson. Check the explanations and try again.',
    tone: 'error',
  }
}

export function formatDuration(ms) {
  if (ms === null || ms === undefined || ms < 0) return '-'

  const totalSeconds = Math.round(ms / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  if (minutes === 0) return `${seconds}s`
  return `${minutes}m ${String(seconds).padStart(2, '0')}s`
}
