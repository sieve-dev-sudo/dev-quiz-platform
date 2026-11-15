import Icon from './Icon'
import './StatCard.css'

function StatCard({ icon, label, value, hint, tone }) {
  return (
    <div className={tone ? `stat-card tone-${tone}` : 'stat-card'}>
      <span className="stat-card-icon" aria-hidden="true">
        <Icon name={icon} size={20} />
      </span>
      <div className="stat-card-body">
        <span className="stat-card-label">{label}</span>
        <span className="stat-card-value">{value}</span>
        {hint && <span className="stat-card-hint">{hint}</span>}
      </div>
    </div>
  )
}

export default StatCard
