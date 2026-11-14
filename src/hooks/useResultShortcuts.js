import { useEffect, useRef } from 'react'
import { getLetterFromEvent, hasModifier, isDialogOpen, isTextInput } from '../utils/keyboardUtils'

const KEY_ACTIONS = {
  r: 'onRetry',
  h: 'onHome',
}

export function useResultShortcuts({ enabled, onRetry, onHome }) {
  const latestRef = useRef({ onRetry, onHome })

  useEffect(() => {
    latestRef.current = { onRetry, onHome }
  })

  useEffect(() => {
    if (!enabled) return undefined

    function handleKeyDown(event) {
      if (hasModifier(event) || event.repeat || isDialogOpen() || isTextInput(event.target)) {
        return
      }

      const action = KEY_ACTIONS[getLetterFromEvent(event)]
      if (!action) return

      event.preventDefault()
      latestRef.current[action]()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [enabled])
}
