import { getCategoryById } from '../data/categories'
import { formatDate } from '../utils/historyUtils'
import { getGrade } from '../utils/resultUtils'
import './RecentScores.css'

function RecentScores({ entries }) {
  return (
    <section className="card recent-scores">
      <div className="recent-scores-header">
        <h2>Recent scores</h2>
        <span className="text-muted">
          Last {entries.length} {entries.length === 1 ? 'quiz' : 'quizzes'}
        </span>
      </div>

      <div className="recent-scores-chart" role="list">
        {entries.map((entry) => {
          const category = getCategoryById(entry.category)
          const tone = getGrade(entry.percent).tone
          const label = `${category?.name ?? entry.category}: ${entry.percent}% on ${formatDate(entry.finishedAt)}`

          return (
            <div
              key={entry.id}
              className="recent-bar"
              role="listitem"
              aria-label={label}
              title={label}
            >
              <span className="recent-bar-value">{entry.percent}%</span>
              <div className="recent-bar-track">
                <div
                  className={`recent-bar-fill tone-${tone}`}
                  style={{ height: `${Math.max(entry.percent, 4)}%` }}
                />
              </div>
              <span className="recent-bar-label" aria-hidden="true">
                {category?.icon ?? '❓'}
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default RecentScores
