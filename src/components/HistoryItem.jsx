import { Link } from 'react-router-dom'
import { getCategoryById, getDifficultyById } from '../data/categories'
import { formatDate } from '../utils/historyUtils'
import { formatDuration, getGrade } from '../utils/resultUtils'
import './HistoryItem.css'

function HistoryItem({ entry, onDelete }) {
  const category = getCategoryById(entry.category)
  const difficulty = getDifficultyById(entry.difficulty)
  const tone = getGrade(entry.percent).tone

  return (
    <li className="history-item">
      <span className="history-item-icon" aria-hidden="true">
        {category?.icon ?? '❓'}
      </span>

      <div className="history-item-info">
        <div className="history-item-title">
          <strong>{category?.name ?? entry.category}</strong>
          <span className={difficulty ? `badge ${difficulty.badge}` : 'badge'}>
            {difficulty?.name ?? 'All'}
          </span>
        </div>
        <span className="history-item-meta">
          {formatDate(entry.finishedAt)} · {formatDuration(entry.duration)}
        </span>
      </div>

      <div className={`history-item-score tone-${tone}`}>
        <span className="history-item-percent">{entry.percent}%</span>
        <span className="history-item-fraction">
          {entry.score} / {entry.total}
        </span>
      </div>

      <div className="history-item-actions">
        <Link
          to={`/quiz?category=${entry.category}&difficulty=${entry.difficulty}`}
          className="btn btn-outline history-item-btn"
        >
          Retake
        </Link>
        <button
          type="button"
          className="history-item-delete"
          onClick={() => onDelete(entry.id)}
          aria-label="Delete this result"
          title="Delete"
        >
          ✕
        </button>
      </div>
    </li>
  )
}

export default HistoryItem
