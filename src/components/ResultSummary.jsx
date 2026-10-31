import { formatDuration, getGrade, getPercent } from '../utils/resultUtils'
import './ResultSummary.css'

function ResultSummary({ title, difficultyName, score, total, startedAt, finishedAt }) {
  const percent = getPercent(score, total)
  const grade = getGrade(percent)
  const wrong = total - score
  const duration = startedAt && finishedAt ? finishedAt - startedAt : null

  return (
    <section className={`card result-summary tone-${grade.tone}`}>
      <p className="result-summary-quiz">
        {title} · {difficultyName}
      </p>

      <div
        className="result-ring"
        style={{ '--percent': percent }}
        role="img"
        aria-label={`Score ${percent} percent`}
      >
        <span className="result-ring-value">{percent}%</span>
      </div>

      <div className="result-summary-text">
        <h2 className="result-summary-grade">{grade.label}</h2>
        <p className="text-muted">{grade.message}</p>
      </div>

      <dl className="result-stats">
        <div className="result-stat">
          <dt>Score</dt>
          <dd>
            {score} / {total}
          </dd>
        </div>
        <div className="result-stat correct">
          <dt>Correct</dt>
          <dd>{score}</dd>
        </div>
        <div className="result-stat wrong">
          <dt>Wrong</dt>
          <dd>{wrong}</dd>
        </div>
        <div className="result-stat">
          <dt>Time</dt>
          <dd>{formatDuration(duration)}</dd>
        </div>
      </dl>
    </section>
  )
}

export default ResultSummary
