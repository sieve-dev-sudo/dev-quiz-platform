import { useEffect, useRef, useState } from 'react'
import './QuestionTimer.css'

function getLevel(timeLeft, seconds) {
  if (timeLeft <= 5) return 'danger'
  if (timeLeft <= seconds / 2) return 'warning'
  return 'normal'
}

function QuestionTimer({ seconds, isRunning, onExpire }) {
  const [timeLeft, setTimeLeft] = useState(seconds)
  const onExpireRef = useRef(onExpire)

  useEffect(() => {
    onExpireRef.current = onExpire
  }, [onExpire])

  useEffect(() => {
    if (!isRunning) return undefined

    const intervalId = window.setInterval(() => {
      setTimeLeft((previous) => (previous <= 1 ? 0 : previous - 1))
    }, 1000)

    return () => window.clearInterval(intervalId)
  }, [isRunning])

  useEffect(() => {
    if (isRunning && timeLeft === 0) {
      onExpireRef.current?.()
    }
  }, [isRunning, timeLeft])

  const percent = seconds > 0 ? (timeLeft / seconds) * 100 : 0
  const level = getLevel(timeLeft, seconds)
  const className = [
    'question-timer',
    level !== 'normal' ? level : '',
    !isRunning ? 'paused' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={className} role="timer" aria-label={`${timeLeft} seconds left`}>
      <span className="question-timer-value">
        <span aria-hidden="true">⏱</span> {timeLeft}s
      </span>
      <div className="question-timer-track">
        <div className="question-timer-fill" style={{ width: `${percent}%` }} />
      </div>
    </div>
  )
}

export default QuestionTimer
