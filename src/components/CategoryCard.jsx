import './CategoryCard.css'

function CategoryCard({ category, count, bestScore, isSelected, onSelect }) {
  return (
    <button
      type="button"
      className={isSelected ? 'category-card selected' : 'category-card'}
      onClick={() => onSelect(category.id)}
      aria-pressed={isSelected}
    >
      <span className="category-card-icon" aria-hidden="true">
        {category.icon}
      </span>
      <span className="category-card-name">{category.name}</span>
      <span className="category-card-desc">{category.description}</span>

      <span className="category-card-footer">
        <span className="category-card-count">{count} questions</span>
        {bestScore ? (
          <span className="category-card-best" title="Best score">
            🏆 {bestScore.percent}%
          </span>
        ) : (
          <span className="category-card-best empty">Not played</span>
        )}
      </span>
    </button>
  )
}

export default CategoryCard
