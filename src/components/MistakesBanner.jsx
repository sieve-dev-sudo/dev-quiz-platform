import { Link } from 'react-router-dom'
import { getCategoryById } from '../data/categories'
import './MistakesBanner.css'

function MistakesBanner({ total, countsByCategory }) {
  if (total === 0) return null

  const entries = Object.entries(countsByCategory)

  return (
    <section className="mistakes-banner">
      <div className="mistakes-banner-info">
        <span className="mistakes-banner-icon" aria-hidden="true">
          🔁
        </span>
        <div>
          <h2 className="mistakes-banner-title">Review your mistakes</h2>
          <p className="text-muted">
            {total} {total === 1 ? 'question is' : 'questions are'} waiting for another try. Answer
            correctly to clear them.
          </p>
        </div>
      </div>

      <div className="mistakes-banner-actions">
        {entries.map(([categoryId, count]) => {
          const category = getCategoryById(categoryId)

          return (
            <Link
              key={categoryId}
              to={`/quiz?mode=mistakes&category=${categoryId}`}
              className="mistakes-chip"
            >
              <span aria-hidden="true">{category?.icon}</span>
              {category?.name ?? categoryId}
              <span className="mistakes-chip-count">{count}</span>
            </Link>
          )
        })}

        <Link to="/quiz?mode=mistakes" className="btn btn-primary mistakes-banner-btn">
          Practice all
        </Link>
      </div>
    </section>
  )
}

export default MistakesBanner
