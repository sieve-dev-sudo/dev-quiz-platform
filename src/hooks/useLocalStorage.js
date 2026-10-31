import { useCallback, useEffect, useRef, useState } from 'react'
import { getStorageKey, parseJSON, readStorage, removeStorage, writeStorage } from '../utils/storage'

export function useLocalStorage(key, initialValue) {
  const initialValueRef = useRef(initialValue)
  const [value, setValue] = useState(() => readStorage(key, initialValue))

  const setStoredValue = useCallback(
    (nextValue) => {
      setValue((previousValue) => {
        const resolvedValue =
          typeof nextValue === 'function' ? nextValue(previousValue) : nextValue
        writeStorage(key, resolvedValue)
        return resolvedValue
      })
    },
    [key],
  )

  const removeValue = useCallback(() => {
    removeStorage(key)
    setValue(initialValueRef.current)
  }, [key])

  useEffect(() => {
    function handleStorageChange(event) {
      if (event.key !== getStorageKey(key)) return
      setValue(parseJSON(event.newValue, initialValueRef.current))
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [key])

  return [value, setStoredValue, removeValue]
}
