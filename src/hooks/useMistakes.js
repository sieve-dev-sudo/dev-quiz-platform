import { useCallback } from 'react'
import { useLocalStorage } from './useLocalStorage'
import {
  countMistakesByCategory,
  getMistakeList,
  toMistakeMap,
  updateMistakes,
} from '../utils/mistakeUtils'
import { STORAGE_KEYS } from '../utils/storageKeys'

export function useMistakes() {
  const [storedMistakes, setStoredMistakes, removeMistakes] = useLocalStorage(
    STORAGE_KEYS.MISTAKES,
    {},
  )

  const mistakes = toMistakeMap(storedMistakes)
  const mistakeList = getMistakeList(mistakes)
  const countsByCategory = countMistakesByCategory(mistakes)

  const recordMistakes = useCallback(
    (answers, questions) => {
      const timestamp = Date.now()
      setStoredMistakes((previous) => updateMistakes(previous, answers, questions, timestamp))
    },
    [setStoredMistakes],
  )

  return {
    mistakes,
    mistakeList,
    countsByCategory,
    recordMistakes,
    clearMistakes: removeMistakes,
  }
}
