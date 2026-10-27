import './CategoryCard.css'

function CategoryCard({ category, count, isSelected, onSelect }) {
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
      <span className="category-card-count">{count} questions</span>
    </button>
  )
}

export default CategoryCard
