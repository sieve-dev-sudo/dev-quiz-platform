import { useEffect, useRef } from 'react'
import {
  getOptionIndexFromEvent,
  hasModifier,
  isActiveControl,
  isDialogOpen,
  isTextInput,
} from '../utils/keyboardUtils'

export function useQuizShortcuts({ enabled, optionCount, isAnswered, onSelect, onNext }) {
  const latestRef = useRef({ optionCount, isAnswered, onSelect, onNext })

  useEffect(() => {
    latestRef.current = { optionCount, isAnswered, onSelect, onNext }
  })

  useEffect(() => {
    if (!enabled) return undefined

    function handleKeyDown(event) {
      if (hasModifier(event) || event.repeat || isDialogOpen()) return

      const latest = latestRef.current

      if (event.key === 'Enter') {
        if (!latest.isAnswered || isActiveControl(event.target)) return

        event.preventDefault()
        latest.onNext()
        return
      }

      if (latest.isAnswered || isTextInput(event.target)) return

      const index = getOptionIndexFromEvent(event)

      if (index >= 0 && index < latest.optionCount) {
        event.preventDefault()
        latest.onSelect(index)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [enabled])
}
