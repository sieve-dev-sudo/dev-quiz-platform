import { useCallback } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { addHistoryEntry } from '../utils/historyUtils'
import { STORAGE_KEYS } from '../utils/storageKeys'

function toArray(value) {
  return Array.isArray(value) ? value : []
}

export function useQuizHistory() {
  const [storedHistory, setHistory, removeHistory] = useLocalStorage(STORAGE_KEYS.HISTORY, [])
  const history = toArray(storedHistory)

  const addEntry = useCallback(
    (entry) => {
      setHistory((previous) => addHistoryEntry(toArray(previous), entry))
    },
    [setHistory],
  )

  const removeEntry = useCallback(
    (id) => {
      setHistory((previous) => toArray(previous).filter((item) => item.id !== id))
    },
    [setHistory],
  )

  return {
    history,
    addEntry,
    removeEntry,
    clearHistory: removeHistory,
  }
}
