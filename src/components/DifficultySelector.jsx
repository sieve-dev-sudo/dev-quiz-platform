import { DIFFICULTIES } from '../data/categories'
import './DifficultySelector.css'

const options = [{ id: 'all', name: 'All' }, ...DIFFICULTIES]

function DifficultySelector({ value, onChange, counts }) {
  return (
    <div className="difficulty-selector" role="radiogroup" aria-label="Difficulty">
      {options.map((option) => {
        const isSelected = value === option.id

        return (
          <button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={isSelected}
            className={isSelected ? 'difficulty-option selected' : 'difficulty-option'}
            onClick={() => onChange(option.id)}
          >
            {option.name}
            <span className="difficulty-count">{counts[option.id] ?? 0}</span>
          </button>
        )
      })}
    </div>
  )
}

export default DifficultySelector
