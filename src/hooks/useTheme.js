import { useEffect } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { DEFAULT_THEME, applyTheme, normalizeTheme } from '../utils/themeUtils'
import { STORAGE_KEYS } from '../utils/storageKeys'

export function useTheme() {
  const [storedTheme, setTheme] = useLocalStorage(STORAGE_KEYS.THEME, DEFAULT_THEME)
  const theme = normalizeTheme(storedTheme)

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  return { theme, setTheme }
}
