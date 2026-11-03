import { TIMER_OPTIONS } from '../utils/settingsUtils'
import './QuizSettings.css'

function QuizSettings({ settings, onChange }) {
  return (
    <div className="quiz-settings">
      <label className="setting-toggle">
        <input
          type="checkbox"
          checked={settings.shuffle}
          onChange={(event) => onChange({ shuffle: event.target.checked })}
        />
        <span className="setting-toggle-track" aria-hidden="true">
          <span className="setting-toggle-thumb" />
        </span>
        <span className="setting-text">
          <strong>Shuffle</strong>
          <span className="text-muted">Mix up question and answer order</span>
        </span>
      </label>

      <div className="setting-group">
        <span className="setting-text" id="timer-setting-label">
          <strong>Timer per question</strong>
          <span className="text-muted">Unanswered questions count as wrong</span>
        </span>

        <div className="setting-options" role="radiogroup" aria-labelledby="timer-setting-label">
          {TIMER_OPTIONS.map((value) => {
            const isSelected = settings.timerSeconds === value

            return (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={isSelected}
                className={isSelected ? 'setting-option selected' : 'setting-option'}
                onClick={() => onChange({ timerSeconds: value })}
              >
                {value === 0 ? 'Off' : `${value}s`}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default QuizSettings
