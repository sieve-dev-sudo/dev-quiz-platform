import { useNavigate } from 'react-router-dom'
import CategoryCard from '../components/CategoryCard'
import DifficultySelector from '../components/DifficultySelector'
import MistakesBanner from '../components/MistakesBanner'
import QuizSettings from '../components/QuizSettings'
import { CATEGORIES, DIFFICULTIES } from '../data/categories'
import { useBestScores } from '../hooks/useBestScores'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useMistakes } from '../hooks/useMistakes'
import { useSettings } from '../hooks/useSettings'
import { countQuestions } from '../utils/questionUtils'
import { STORAGE_KEYS } from '../utils/storageKeys'
import './Home.css'

const VALID_DIFFICULTIES = ['all', ...DIFFICULTIES.map((item) => item.id)]

function getStartHint(category, availableCount, selectedCount) {
  if (!category) return 'Pick a topic to begin'
  if (availableCount === 0) return 'No questions for this difficulty yet'
  if (availableCount > selectedCount) {
    return `${selectedCount} of ${availableCount} questions, picked at random`
  }
  return `${selectedCount} questions ready`
}

function Home() {
  const navigate = useNavigate()
  const [storedCategory, setCategory] = useLocalStorage(STORAGE_KEYS.LAST_CATEGORY, null)
  const [storedDifficulty, setDifficulty] = useLocalStorage(STORAGE_KEYS.LAST_DIFFICULTY, 'all')
  const { bestScores } = useBestScores()
  const { mistakeList, countsByCategory } = useMistakes()
  const { settings, updateSettings } = useSettings()

  const category = CATEGORIES.some((item) => item.id === storedCategory) ? storedCategory : null
  const difficulty = VALID_DIFFICULTIES.includes(storedDifficulty) ? storedDifficulty : 'all'

  const countCategory = category ?? 'all'
  const difficultyCounts = Object.fromEntries([
    ['all', countQuestions(countCategory, 'all')],
    ...DIFFICULTIES.map((item) => [item.id, countQuestions(countCategory, item.id)]),
  ])

  const availableCount = category ? countQuestions(category, difficulty) : 0
  const selectedCount = Math.min(availableCount, settings.questionCount)
  const canStart = category !== null && availableCount > 0

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

      <MistakesBanner total={mistakeList.length} countsByCategory={countsByCategory} />

      <div className="home-section">
        <h2 className="home-section-title">1. Choose a topic</h2>
        <div className="category-grid">
          {CATEGORIES.map((item) => (
            <CategoryCard
              key={item.id}
              category={item}
              count={countQuestions(item.id, 'all')}
              bestScore={bestScores[item.id]}
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

      <div className="home-section">
        <h2 className="home-section-title">3. Settings</h2>
        <QuizSettings settings={settings} onChange={updateSettings} />
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
          {getStartHint(category, availableCount, selectedCount)}
        </p>
      </div>
    </section>
  )
}

export default Home
