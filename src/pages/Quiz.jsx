import { Link, useSearchParams } from 'react-router-dom'
import { getCategoryById, getDifficultyById } from '../data/categories'
import { filterQuestions } from '../utils/questionUtils'

function Quiz() {
  const [searchParams] = useSearchParams()
  const categoryId = searchParams.get('category') || 'all'
  const difficultyId = searchParams.get('difficulty') || 'all'

  const category = getCategoryById(categoryId)
  const difficulty = getDifficultyById(difficultyId)
  const questions = filterQuestions({ category: categoryId, difficulty: difficultyId })

  return (
    <section className="card page-placeholder">
      <h2>{category ? `${category.icon} ${category.name} Quiz` : 'Quiz'}</h2>
      <p className="text-muted">
        Difficulty: {difficulty ? difficulty.name : 'All'} · {questions.length} questions
      </p>
      <p className="text-muted">The quiz screen is coming in the next steps.</p>
      <div>
        <Link to="/" className="btn btn-outline">
          Back to Home
        </Link>
      </div>
    </section>
  )
}

export default Quiz
