const PREFIX = 'devquiz:'

export function getStorageKey(key) {
  return `${PREFIX}${key}`
}

export function parseJSON(raw, fallback) {
  if (raw === null || raw === undefined) return fallback

  try {
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

export function readStorage(key, fallback) {
  try {
    const raw = window.localStorage.getItem(getStorageKey(key))
    return parseJSON(raw, fallback)
  } catch {
    return fallback
  }
}

export function writeStorage(key, value) {
  try {
    window.localStorage.setItem(getStorageKey(key), JSON.stringify(value))
    return true
  } catch (error) {
    console.warn(`Could not save "${key}" to localStorage`, error)
    return false
  }
}

export function removeStorage(key) {
  try {
    window.localStorage.removeItem(getStorageKey(key))
  } catch {
    // Storage is unavailable, nothing to remove
  }
}

export function clearAppStorage() {
  try {
    Object.keys(window.localStorage)
      .filter((key) => key.startsWith(PREFIX))
      .forEach((key) => window.localStorage.removeItem(key))
  } catch {
    // Storage is unavailable, nothing to clear
  }
}
