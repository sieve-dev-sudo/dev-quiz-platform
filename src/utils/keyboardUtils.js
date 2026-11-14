const TEXT_INPUT_TAGS = ['INPUT', 'TEXTAREA', 'SELECT']

export function isTextInput(target) {
  if (!target) return false
  return TEXT_INPUT_TAGS.includes(target.tagName) || target.isContentEditable === true
}

export function isActiveControl(target) {
  if (!target) return false
  if (isTextInput(target)) return true

  const isControl = target.tagName === 'BUTTON' || target.tagName === 'A'
  return isControl && !target.disabled
}

export function hasModifier(event) {
  return event.ctrlKey || event.metaKey || event.altKey
}

export function isDialogOpen() {
  return document.querySelector('dialog[open]') !== null
}

export function getOptionIndexFromKey(key) {
  if (/^[1-9]$/.test(key)) {
    return Number(key) - 1
  }

  if (/^[a-f]$/i.test(key)) {
    return key.toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0)
  }

  return -1
}

// Uses the physical key (event.code) so shortcuts work with any keyboard layout,
// including Khmer. Falls back to event.key for older browsers.
export function getOptionIndexFromEvent(event) {
  const code = event.code ?? ''

  const digit = /^(?:Digit|Numpad)([1-9])$/.exec(code)
  if (digit) return Number(digit[1]) - 1

  const letter = /^Key([A-F])$/.exec(code)
  if (letter) return letter[1].charCodeAt(0) - 'A'.charCodeAt(0)

  return getOptionIndexFromKey(event.key ?? '')
}

export function getLetterFromEvent(event) {
  const match = /^Key([A-Z])$/.exec(event.code ?? '')
  if (match) return match[1].toLowerCase()

  if (typeof event.key === 'string' && event.key.length === 1) {
    return event.key.toLowerCase()
  }

  return null
}
