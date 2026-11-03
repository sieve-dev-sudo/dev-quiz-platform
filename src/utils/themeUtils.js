export const THEMES = ['light', 'dark', 'system']

export const DEFAULT_THEME = 'system'

export function normalizeTheme(value) {
  return THEMES.includes(value) ? value : DEFAULT_THEME
}

export function applyTheme(theme) {
  const root = document.documentElement

  if (theme === 'system') {
    root.removeAttribute('data-theme')
    return
  }

  root.setAttribute('data-theme', theme)
}
