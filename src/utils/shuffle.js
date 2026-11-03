export function shuffleArray(items) {
  const result = [...items]

  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = result[i]
    result[i] = result[j]
    result[j] = temp
  }

  return result
}

export function shuffleQuestionOptions(question) {
  const order = shuffleArray(question.options.map((_, index) => index))

  return {
    ...question,
    options: order.map((index) => question.options[index]),
    answerIndex: order.indexOf(question.answerIndex),
  }
}
