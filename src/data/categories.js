export const CATEGORIES = [
  {
    id: 'html',
    name: 'HTML',
    icon: '🌐',
    description: 'Structure and semantics of web pages',
  },
  {
    id: 'css',
    name: 'CSS',
    icon: '🎨',
    description: 'Styling, layout and selectors',
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    icon: '⚡',
    description: 'Core language and async behavior',
  },
  {
    id: 'react',
    name: 'React',
    icon: '⚛️',
    description: 'Components, hooks and state',
  },
  {
    id: 'git',
    name: 'Git',
    icon: '🌿',
    description: 'Version control commands',
  },
]

export const DIFFICULTIES = [
  { id: 'easy', name: 'Easy', badge: 'badge-success' },
  { id: 'medium', name: 'Medium', badge: 'badge-warning' },
  { id: 'hard', name: 'Hard', badge: 'badge-error' },
]

export function getCategoryById(id) {
  return CATEGORIES.find((category) => category.id === id)
}

export function getDifficultyById(id) {
  return DIFFICULTIES.find((difficulty) => difficulty.id === id)
}
