import { useState } from 'react'
import './DonutChart.css'

// A radius of 15.915 makes the circle circumference about 100,
// so each segment length can be written directly as a percentage.
const RADIUS = 15.915
const CENTER = 21

function buildSegments(data) {
  const total = data.reduce((sum, item) => sum + item.value, 0)

  return data.reduce((segments, item) => {
    const previous = segments[segments.length - 1]
    const start = previous ? previous.start + previous.percent : 0
    const percent = total > 0 ? (item.value / total) * 100 : 0
    return [...segments, { ...item, start, percent }]
  }, [])
}

function getStateClass(baseClass, id, activeId) {
  if (activeId === null) return baseClass
  return id === activeId ? `${baseClass} active` : `${baseClass} dimmed`
}

function DonutChart({ title, description, data, centerValue, centerLabel }) {
  const [activeId, setActiveId] = useState(null)

  const segments = buildSegments(data)
  const hasGap = segments.length > 1
  const activeSegment = segments.find((segment) => segment.id === activeId) ?? null
  const summary = segments
    .map((segment) => `${segment.label} ${Math.round(segment.percent)}%`)
    .join(', ')

  return (
    <section className="card donut-card">
      <div className="donut-card-header">
        <h2>{title}</h2>
        {description && <p className="text-muted">{description}</p>}
      </div>

      <div className="donut-chart">
        <svg className="donut-svg" viewBox="0 0 42 42" role="img" aria-label={`${title}: ${summary}`}>
          <circle className="donut-track" cx={CENTER} cy={CENTER} r={RADIUS} />

          {segments.map((segment) => {
            const length = hasGap ? Math.max(segment.percent - 0.8, 0.1) : segment.percent

            return (
              <circle
                key={segment.id}
                className={getStateClass('donut-segment', segment.id, activeId)}
                cx={CENTER}
                cy={CENTER}
                r={RADIUS}
                style={{ stroke: segment.color }}
                strokeDasharray={`${length} ${100 - length}`}
                strokeDashoffset={25 - segment.start}
                onMouseEnter={() => setActiveId(segment.id)}
                onMouseLeave={() => setActiveId(null)}
              />
            )
          })}
        </svg>

        <div className="donut-center" aria-hidden="true">
          <span className="donut-center-value">
            {activeSegment ? `${Math.round(activeSegment.percent)}%` : centerValue}
          </span>
          <span className="donut-center-label">
            {activeSegment ? activeSegment.label : centerLabel}
          </span>
        </div>
      </div>

      <ul className="donut-legend">
        {segments.map((segment) => (
          <li
            key={segment.id}
            className={getStateClass('donut-legend-item', segment.id, activeId)}
            onMouseEnter={() => setActiveId(segment.id)}
            onMouseLeave={() => setActiveId(null)}
          >
            <span
              className="donut-legend-dot"
              style={{ backgroundColor: segment.color }}
              aria-hidden="true"
            />
            <span className="donut-legend-label">
              {segment.icon && <span aria-hidden="true">{segment.icon}</span>}
              {segment.label}
            </span>
            <span className="donut-legend-value">{segment.value}</span>
            <span className="donut-legend-percent">{Math.round(segment.percent)}%</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default DonutChart
