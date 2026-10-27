import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CategoryCard from '../components/CategoryCard'
import DifficultySelector from '../components/DifficultySelector'
import { CATEGORIES, DIFFICULTIES } from '../data/categories'
import { countQuestions } from '../utils/questionUtils'
import './Home.css'

function Home() {
  const navigate = useNavigate()
  const [category, setCategory] = useState(null)
  const [difficulty, setDifficulty] = useState('all')

  const countCategory = category ?? 'all'
  const difficultyCounts = Object.fromEntries([
    ['all', countQuestions(countCategory, 'all')],
    ...DIFFICULTIES.map((item) => [item.id, countQuestions(countCategory, item.id)]),
  ])

  const selectedCount = category ? countQuestions(category, difficulty) : 0
  const canStart = category !== null && selectedCount > 0

  function handleStart() {
    if (!canStart) return
    navigate(`/quiz?category=${category}&difficulty=${difficulty}`)
  }

  return (
    <section className="home">
      <div className="home-hero">
        <h1>Dev Quiz Platform</h1>
        <p className="text-muted">Test your coding knowledge, fully offline.</p>
      </div>

      <div className="home-section">
        <h2 className="home-section-title">1. Choose a topic</h2>
        <div className="category-grid">
          {CATEGORIES.map((item) => (
            <CategoryCard
              key={item.id}
              category={item}
              count={countQuestions(item.id, 'all')}
              isSelected={category === item.id}
              onSelect={setCategory}
            />
          ))}
        </div>
      </div>

      <div className="home-section">
        <h2 className="home-section-title">2. Choose a difficulty</h2>
        <DifficultySelector
          value={difficulty}
          onChange={setDifficulty}
          counts={difficultyCounts}
        />
      </div>

      <div className="home-start">
        <button
          type="button"
          className="btn btn-primary home-start-btn"
          onClick={handleStart}
          disabled={!canStart}
        >
          Start Quiz
        </button>
        <p className="text-muted home-start-hint">
          {category ? `${selectedCount} questions ready` : 'Pick a topic to begin'}
        </p>
      </div>
    </section>
  )
}

export default Home
