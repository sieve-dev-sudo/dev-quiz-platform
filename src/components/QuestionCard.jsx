import { getCategoryById, getDifficultyById } from '../data/categories'
import OptionButton from './OptionButton'
import './QuestionCard.css'

function getOptionStatus(index, selectedIndex, answerIndex, isAnswered) {
  if (!isAnswered) return 'idle'
  if (index === answerIndex) return 'correct'
  if (index === selectedIndex) return 'wrong'
  return 'dimmed'
}

function QuestionCard({ question, selectedIndex, isAnswered, onSelect }) {
  const category = getCategoryById(question.category)
  const difficulty = getDifficultyById(question.difficulty)

  return (
    <article className="question-card">
      <header className="question-card-tags">
        {category && (
          <span className="badge">
            {category.icon} {category.name}
          </span>
        )}
        {difficulty && <span className={`badge ${difficulty.badge}`}>{difficulty.name}</span>}
      </header>

      <h2 className="question-card-title">{question.question}</h2>

      <div className="question-card-options" role="group" aria-label="Answer options">
        {question.options.map((option, index) => (
          <OptionButton
            key={option}
            index={index}
            text={option}
            status={getOptionStatus(index, selectedIndex, question.answerIndex, isAnswered)}
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
