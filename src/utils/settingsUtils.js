export const TIMER_OPTIONS = [0, 15, 30, 60]

export const DEFAULT_SETTINGS = {
  shuffle: true,
  timerSeconds: 0,
}

export function normalizeSettings(value) {
  const safeValue = value && typeof value === 'object' && !Array.isArray(value) ? value : {}

  return {
    shuffle: typeof safeValue.shuffle === 'boolean' ? safeValue.shuffle : DEFAULT_SETTINGS.shuffle,
    timerSeconds: TIMER_OPTIONS.includes(safeValue.timerSeconds)
      ? safeValue.timerSeconds
      : DEFAULT_SETTINGS.timerSeconds,
  }
}
