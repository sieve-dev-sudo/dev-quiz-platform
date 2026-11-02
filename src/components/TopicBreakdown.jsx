import { Link } from 'react-router-dom'
import { getGrade } from '../utils/resultUtils'
import './TopicBreakdown.css'

function TopicBreakdown({ stats }) {
  return (
    <section className="card topic-breakdown">
      <h2>Topics</h2>

      <ul className="topic-list">
        {stats.map((item) => {
          const hasPlayed = item.quizzes > 0
          const tone = hasPlayed ? getGrade(item.accuracy).tone : 'none'

          return (
            <li key={item.category.id} className="topic-row">
              <div className="topic-row-name">
                <span aria-hidden="true">{item.category.icon}</span>
                <strong>{item.category.name}</strong>
              </div>

              <div className="topic-row-bar">
                <div className="topic-bar-track">
                  <div
                    className={`topic-bar-fill tone-${tone}`}
                    style={{ width: `${item.accuracy}%` }}
                  />
                </div>
                <span className="topic-row-accuracy">{hasPlayed ? `${item.accuracy}%` : '-'}</span>
              </div>

              <div className="topic-row-meta">
                <span>
                  {item.quizzes} {item.quizzes === 1 ? 'quiz' : 'quizzes'}
                </span>
                <span>Best {item.best !== null ? `${item.best}%` : '-'}</span>
                {item.mistakes > 0 && (
                  <Link
                    to={`/quiz?mode=mistakes&category=${item.category.id}`}
                    className="topic-row-mistakes"
                  >
                    {item.mistakes} to review
                  </Link>
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default TopicBreakdown
