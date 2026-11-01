import { useCallback } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { toScoreMap, updateBestScores } from '../utils/bestScoreUtils'
import { STORAGE_KEYS } from '../utils/storageKeys'

export function useBestScores() {
  const [storedScores, setStoredScores, removeScores] = useLocalStorage(
    STORAGE_KEYS.BEST_SCORES,
    {},
  )
  const bestScores = toScoreMap(storedScores)

  const recordScore = useCallback(
    (entry) => {
      setStoredScores((previous) => updateBestScores(previous, entry))
    },
    [setStoredScores],
  )

  return {
    bestScores,
    recordScore,
    resetBestScores: removeScores,
  }
}
