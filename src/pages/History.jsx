import { useState } from 'react'
import { Link } from 'react-router-dom'
import HistoryItem from '../components/HistoryItem'
import { CATEGORIES } from '../data/categories'
import { useQuizHistory } from '../hooks/useQuizHistory'
import './History.css'

function History() {
  const { history, removeEntry, clearHistory } = useQuizHistory()
  const [filter, setFilter] = useState('all')

  const filteredHistory =
    filter === 'all' ? history : history.filter((entry) => entry.category === filter)

  function handleClear() {
    const confirmed = window.confirm('Clear all quiz history? This cannot be undone.')
    if (confirmed) clearHistory()
  }

  if (history.length === 0) {
    return (
      <section className="card history-empty">
        <span className="history-empty-icon" aria-hidden="true">
          📜
        </span>
        <h2>No quiz history yet</h2>
        <p className="text-muted">Finish a quiz and your results will show up here.</p>
        <Link to="/" className="btn btn-primary">
          Start a Quiz
        </Link>
      </section>
    )
  }

  return (
    <section className="history">
      <div className="history-header">
        <div>
          <h1 className="history-title">Quiz History</h1>
          <p className="text-muted">
            {history.length} {history.length === 1 ? 'quiz' : 'quizzes'} completed
          </p>
        </div>
        <button type="button" className="btn btn-outline history-clear" onClick={handleClear}>
          Clear history
        </button>
      </div>

      <div className="history-toolbar">
        <label htmlFor="history-filter" className="history-filter-label">
          Topic
        </label>
        <select
          id="history-filter"
          className="history-filter"
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        >
          <option value="all">All topics</option>
          {CATEGORIES.map((item) => (
            <option key={item.id} value={item.id}>
              {item.icon} {item.name}
            </option>
          ))}
        </select>
        <span className="text-muted history-count">
          Showing {filteredHistory.length} of {history.length}
        </span>
      </div>

      {filteredHistory.length === 0 ? (
        <p className="card text-muted history-no-match">No results for this topic yet.</p>
      ) : (
        <ul className="history-list">
          {filteredHistory.map((entry) => (
            <HistoryItem key={entry.id} entry={entry} onDelete={removeEntry} />
          ))}
        </ul>
      )}
    </section>
  )
}

export default History
