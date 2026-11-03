import { useCallback } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { DEFAULT_SETTINGS, normalizeSettings } from '../utils/settingsUtils'
import { STORAGE_KEYS } from '../utils/storageKeys'

export function useSettings() {
  const [storedSettings, setStoredSettings] = useLocalStorage(
    STORAGE_KEYS.SETTINGS,
    DEFAULT_SETTINGS,
  )
  const settings = normalizeSettings(storedSettings)

  const updateSettings = useCallback(
    (partial) => {
      setStoredSettings((previous) => ({ ...normalizeSettings(previous), ...partial }))
    },
    [setStoredSettings],
  )

  return { settings, updateSettings }
}
