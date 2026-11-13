import { Link } from 'react-router-dom'
import { getCategoryById, getDifficultyById } from '../data/categories'
import { getSavedQuizUrl } from '../utils/savedQuiz'
import './ResumeBanner.css'

function getTitle(savedQuiz, category) {
  if (savedQuiz.mode === 'mistakes') {
    return category ? `${category.name} Mistakes Review` : 'Mistakes Review'
  }

  return category ? `${category.name} Quiz` : 'Quiz'
}

function ResumeBanner({ savedQuiz, onDiscard }) {
  const category = getCategoryById(savedQuiz.category)
  const difficulty = savedQuiz.mode === 'mistakes' ? null : getDifficultyById(savedQuiz.difficulty)
  const answered = savedQuiz.answers.length
  const total = savedQuiz.questions.length
  const percent = Math.round((answered / total) * 100)

  return (
    <section className="resume-banner" aria-label="Unfinished quiz">
      <span className="resume-banner-icon" aria-hidden="true">
        {savedQuiz.mode === 'mistakes' ? '🔁' : (category?.icon ?? '📝')}
      </span>

      <div className="resume-banner-info">
        <p className="resume-banner-eyebrow">Unfinished quiz</p>
        <h2 className="resume-banner-title">
          {getTitle(savedQuiz, category)}
          {difficulty && <span className={`badge ${difficulty.badge}`}>{difficulty.name}</span>}
        </h2>

        <div className="resume-banner-progress">
          <div className="resume-banner-track">
            <div className="resume-banner-fill" style={{ width: `${percent}%` }} />
          </div>
          <span>
            {answered} of {total} answered
          </span>
        </div>
      </div>

      <div className="resume-banner-actions">
        <button type="button" className="btn btn-outline" onClick={onDiscard}>
          Discard
        </button>
        <Link to={getSavedQuizUrl(savedQuiz)} className="btn btn-primary">
          Continue
        </Link>
      </div>
    </section>
  )
}

export default ResumeBanner
