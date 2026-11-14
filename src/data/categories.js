export const CATEGORIES = [
  {
    id: 'html',
    name: 'HTML',
    icon: 'code',
    color: '#ea580c',
    description: 'Structure and semantics of web pages',
  },
  {
    id: 'css',
    name: 'CSS',
    icon: 'palette',
    color: '#3b82f6',
    description: 'Styling, layout and selectors',
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    icon: 'braces',
    color: '#ca8a04',
    description: 'Core language and async behavior',
  },
  {
    id: 'react',
    name: 'React',
    icon: 'atom',
    color: '#06b6d4',
    description: 'Components, hooks and state',
  },
  {
    id: 'git',
    name: 'Git',
    icon: 'git-branch',
    color: '#a855f7',
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
