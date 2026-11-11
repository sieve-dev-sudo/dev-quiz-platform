import { getCategoryById } from '../data/categories'
import { formatDate } from '../utils/historyUtils'
import { getGrade } from '../utils/resultUtils'
import './RecentScores.css'

const shortDateFormatter = new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' })

const AXIS_LABELS = [100, 50, 0]

const LEGEND = [
  { tone: 'success', label: '70% and above' },
  { tone: 'warning', label: '50% to 69%' },
  { tone: 'error', label: 'Below 50%' },
]

function getAverage(entries) {
  if (entries.length === 0) return 0
  const total = entries.reduce((sum, entry) => sum + entry.percent, 0)
  return Math.round(total / entries.length)
}

function RecentScores({ entries }) {
  const count = entries.length
  const average = getAverage(entries)

  return (
    <section className="card recent-scores">
      <div className="recent-scores-header">
        <h2>Recent scores</h2>
        <p className="recent-scores-summary">
          Last {count} {count === 1 ? 'quiz' : 'quizzes'} · Average <strong>{average}%</strong>
        </p>
      </div>

      <div className="recent-chart" style={{ '--count': count }}>
        <div className="recent-chart-axis" aria-hidden="true">
          {AXIS_LABELS.map((value) => (
            <span key={value}>{value}%</span>
          ))}
        </div>

        <div className="recent-chart-plot">
          <div className="recent-chart-grid" aria-hidden="true">
            {AXIS_LABELS.map((value) => (
              <span key={value} />
            ))}
          </div>

          <ol className="recent-chart-bars">
            {entries.map((entry) => {
              const category = getCategoryById(entry.category)
              const tone = getGrade(entry.percent).tone
              const label = `${category?.name ?? entry.category}: ${entry.percent}% on ${formatDate(entry.finishedAt)}`

              return (
                <li key={entry.id} className="recent-bar" aria-label={label} title={label}>
                  <div
                    className={`recent-bar-fill tone-${tone}`}
                    style={{ height: `${Math.max(entry.percent, 2)}%` }}
                  >
                    <span className="recent-bar-value">{entry.percent}%</span>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>

        <ol className="recent-chart-labels" aria-hidden="true">
          {entries.map((entry) => {
            const category = getCategoryById(entry.category)

            return (
              <li key={entry.id} className="recent-label">
                <span className="recent-label-icon">{category?.icon ?? '❓'}</span>
                <span className="recent-label-date">
                  {shortDateFormatter.format(new Date(entry.finishedAt))}
                </span>
              </li>
            )
          })}
        </ol>
      </div>

      <ul className="recent-legend">
        {LEGEND.map((item) => (
          <li key={item.tone} className="recent-legend-item">
            <span className={`recent-legend-dot tone-${item.tone}`} aria-hidden="true" />
            {item.label}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default RecentScores
