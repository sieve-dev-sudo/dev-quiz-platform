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

export function getOptionIndexFromKey(key) {
  if (/^[1-9]$/.test(key)) {
    return Number(key) - 1
  }

  if (/^[a-f]$/i.test(key)) {
    return key.toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0)
  }

  return -1
}
