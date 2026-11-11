import { Link } from 'react-router-dom'
import DonutChart from '../components/DonutChart'
import { useQuizHistory } from '../hooks/useQuizHistory'
import {
  getAnswerDistribution,
  getAnswerTotals,
  getDifficultyDistribution,
  getTopicDistribution,
} from '../utils/analyticsUtils'
import { getPercent } from '../utils/resultUtils'
import './Analytics.css'

function Analytics() {
  const { history } = useQuizHistory()

  if (history.length === 0) {
    return (
      <section className="card analytics-empty">
        <span className="analytics-empty-icon" aria-hidden="true">
          🥧
        </span>
        <h2>No analytics yet</h2>
        <p className="text-muted">Finish a quiz to see your charts here.</p>
        <Link to="/" className="btn btn-primary">
          Start a Quiz
        </Link>
      </section>
    )
  }

  const quizLabel = history.length === 1 ? 'quiz' : 'quizzes'
  const totals = getAnswerTotals(history)
  const accuracy = getPercent(totals.correct, totals.total)

  return (
    <section className="analytics">
      <div className="analytics-header">
        <h1 className="analytics-title">Analytics</h1>
        <p className="text-muted">How your practice is spread across topics, answers and difficulty.</p>
      </div>

      <div className="analytics-grid">
        <DonutChart
          title="Quizzes by topic"
          description="Which topics you practice the most"
          data={getTopicDistribution(history)}
          centerValue={history.length}
          centerLabel={quizLabel}
        />

        <DonutChart
          title="Correct vs wrong"
          description={`${totals.correct} of ${totals.total} answers correct`}
          data={getAnswerDistribution(history)}
          centerValue={`${accuracy}%`}
          centerLabel="accuracy"
        />

        <DonutChart
          title="Quizzes by difficulty"
          description="How challenging your quizzes were"
          data={getDifficultyDistribution(history)}
          centerValue={history.length}
          centerLabel={quizLabel}
        />
      </div>
    </section>
  )
}

export default Analytics
