import './ProgressBar.css'

function ProgressBar({ current, total, answeredCount, steps = [] }) {
  const percent = total > 0 ? Math.round((answeredCount / total) * 100) : 0

  return (
    <div className="progress">
      <div className="progress-header">
        <span className="progress-label">
          Question <strong>{current}</strong> of {total}
        </span>
        <span className="progress-percent">{percent}%</span>
      </div>

      <div
        className="progress-track"
        role="progressbar"
        aria-label="Quiz progress"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={answeredCount}
      >
        <div className="progress-fill" style={{ width: `${percent}%` }} />
      </div>

      {steps.length > 0 && (
        <ol className="progress-steps" aria-hidden="true">
          {steps.map((step, index) => (
            <li key={index} className={`progress-step ${step}`} />
          ))}
        </ol>
      )}
    </div>
  )
}

export default ProgressBar
