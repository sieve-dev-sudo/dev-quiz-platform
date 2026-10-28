import { getCategoryById, getDifficultyById } from '../data/categories'
import OptionButton from './OptionButton'
import './QuestionCard.css'

function QuestionCard({ question, questionNumber, totalQuestions, selectedIndex, onSelect }) {
  const category = getCategoryById(question.category)
  const difficulty = getDifficultyById(question.difficulty)
  const isAnswered = selectedIndex !== null && selectedIndex !== undefined

  return (
    <article className="question-card">
      <header className="question-card-header">
        <div className="question-card-tags">
          {category && (
            <span className="badge">
              {category.icon} {category.name}
            </span>
          )}
          {difficulty && <span className={`badge ${difficulty.badge}`}>{difficulty.name}</span>}
        </div>
        <span className="question-card-number">
          Question {questionNumber} / {totalQuestions}
        </span>
      </header>

      <h2 className="question-card-title">{question.question}</h2>

      <div className="question-card-options" role="group" aria-label="Answer options">
        {question.options.map((option, index) => (
          <OptionButton
            key={option}
            index={index}
            text={option}
            isSelected={selectedIndex === index}
            isDisabled={isAnswered}
            onSelect={onSelect}
          />
        ))}
      </div>
    </article>
  )
}

export default QuestionCard
