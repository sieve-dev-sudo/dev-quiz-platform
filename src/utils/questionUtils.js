import questions from '../data/questions.json'

export function getAllQuestions() {
  return questions
}

export function getQuestionById(id) {
  return questions.find((question) => question.id === id)
}

export function filterQuestions({ category = 'all', difficulty = 'all' } = {}) {
  return questions.filter((question) => {
    const matchCategory = category === 'all' || question.category === category
    const matchDifficulty = difficulty === 'all' || question.difficulty === difficulty
    return matchCategory && matchDifficulty
  })
}

export function countQuestions(category = 'all', difficulty = 'all') {
  return filterQuestions({ category, difficulty }).length
}

export function isCorrectAnswer(question, selectedIndex) {
  return question.answerIndex === selectedIndex
}
