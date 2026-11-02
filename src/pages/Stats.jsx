import { Link } from 'react-router-dom'
import StatCard from '../components/StatCard'
import RecentScores from '../components/RecentScores'
import TopicBreakdown from '../components/TopicBreakdown'
import { useBestScores } from '../hooks/useBestScores'
import { useMistakes } from '../hooks/useMistakes'
import { useQuizHistory } from '../hooks/useQuizHistory'
import { formatDuration, getGrade } from '../utils/resultUtils'
import {
  getCategoryStats,
  getHighlights,
  getOverallStats,
  getRecentScores,
} from '../utils/statsUtils'
import './Stats.css'

function Stats() {
  const { history, clearHistory } = useQuizHistory()
  const { bestScores, resetBestScores } = useBestScores()
  const { mistakes, mistakeList, clearMistakes } = useMistakes()

  const hasAnyData =
    history.length > 0 || Object.keys(bestScores).length > 0 || mistakeList.length > 0

  function handleReset() {
    const confirmed = window.confirm(
      'Reset all quiz data? This removes your history, best scores and saved mistakes. This cannot be undone.',
    )
    if (!confirmed) return

    clearHistory()
    resetBestScores()
    clearMistakes()
  }

  if (history.length === 0) {
    return (
      <section className="card stats-empty">
        <span className="stats-empty-icon" aria-hidden="true">
          📊
        </span>
        <h2>No stats yet</h2>
        <p className="text-muted">Finish a quiz to see your progress and statistics here.</p>
        <div className="stats-empty-actions">
          <Link to="/" className="btn btn-primary">
            Start a Quiz
          </Link>
          {hasAnyData && (
            <button type="button" className="btn btn-outline stats-reset" onClick={handleReset}>
              Reset data
            </button>
          )}
        </div>
      </section>
    )
  }

  const overall = getOverallStats(history)
  const categoryStats = getCategoryStats(history, bestScores, mistakes)
  const { strongest, weakest } = getHighlights(categoryStats)
  const recentScores = getRecentScores(history)

  return (
    <section className="stats">
      <div className="stats-header">
        <div>
          <h1 className="stats-title">Statistics</h1>
          <p className="text-muted">Your learning progress at a glance.</p>
        </div>
        <button type="button" className="btn btn-outline stats-reset" onClick={handleReset}>
          Reset data
        </button>
      </div>

      <div className="stats-grid">
        <StatCard icon="📝" label="Quizzes taken" value={overall.quizzes} />
        <StatCard
          icon="🎯"
          label="Accuracy"
          value={`${overall.accuracy}%`}
          hint={`${overall.correct} of ${overall.questions} correct`}
          tone={getGrade(overall.accuracy).tone}
        />
        <StatCard icon="⏱️" label="Time spent" value={formatDuration(overall.time)} />
        <StatCard
          icon="🔁"
          label="To review"
          value={mistakeList.length}
          hint={mistakeList.length > 0 ? 'Saved mistakes' : 'All clear'}
        />
      </div>

      <div className="stats-highlights">
        <div className="card highlight-card strong">
          <span className="highlight-label">💪 Strongest topic</span>
          {strongest ? (
            <>
              <span className="highlight-topic">
                {strongest.category.icon} {strongest.category.name}
              </span>
              <span className="highlight-value">{strongest.accuracy}% accuracy</span>
            </>
          ) : (
            <span className="text-muted">-</span>
          )}
        </div>

        <div className="card highlight-card weak">
          <span className="highlight-label">📚 Needs practice</span>
          {weakest ? (
            <>
              <span className="highlight-topic">
                {weakest.category.icon} {weakest.category.name}
              </span>
              <span className="highlight-value">{weakest.accuracy}% accuracy</span>
              <Link
                to={`/quiz?category=${weakest.category.id}&difficulty=all`}
                className="btn btn-outline highlight-action"
              >
                Practice {weakest.category.name}
              </Link>
            </>
          ) : (
            <span className="text-muted">Play at least two topics to compare.</span>
          )}
        </div>
      </div>

      <RecentScores entries={recentScores} />
      <TopicBreakdown stats={categoryStats} />
    </section>
  )
}

export default Stats
