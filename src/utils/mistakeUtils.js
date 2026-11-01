export function toMistakeMap(value) {
  return value && typeof value === 'object' && !Array.isArray(value) ? value : {}
}

export function updateMistakes(mistakes, answers, questions, timestamp) {
  const nextMistakes = { ...toMistakeMap(mistakes) }

  answers.forEach((answer) => {
    const question = questions.find((item) => item.id === answer.questionId)
    if (!question) return

    if (answer.isCorrect) {
      delete nextMistakes[question.id]
      return
    }

    const current = nextMistakes[question.id]

    nextMistakes[question.id] = {
      questionId: question.id,
      category: question.category,
      wrongCount: (current?.wrongCount ?? 0) + 1,
      lastWrongAt: timestamp,
    }
  })

  return nextMistakes
}

export function getMistakeList(mistakes, category = 'all') {
  return Object.values(toMistakeMap(mistakes))
    .filter((item) => category === 'all' || item.category === category)
    .sort((a, b) => b.lastWrongAt - a.lastWrongAt)
}

export function getMistakeQuestionIds(mistakes, category = 'all') {
  return getMistakeList(mistakes, category).map((item) => item.questionId)
}

export function countMistakesByCategory(mistakes) {
  return getMistakeList(mistakes).reduce((counts, item) => {
    counts[item.category] = (counts[item.category] ?? 0) + 1
    return counts
  }, {})
}
