import { useEffect, useRef } from 'react'
import './ConfirmDialog.css'

function ConfirmDialog({
  open,
  icon = '⚠️',
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
}) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  function handleCancel(event) {
    event.preventDefault()
    onCancel()
  }

  function handleBackdropClick(event) {
    if (event.target === event.currentTarget) onCancel()
  }

  return (
    <dialog
      ref={dialogRef}
      className="confirm-dialog"
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-message"
      onCancel={handleCancel}
      onClick={handleBackdropClick}
    >
      <div className="confirm-dialog-body">
        <span className="confirm-dialog-icon" aria-hidden="true">
          {icon}
        </span>
        <h2 id="confirm-dialog-title">{title}</h2>
        <p id="confirm-dialog-message" className="text-muted">
          {message}
        </p>
      </div>

      <div className="confirm-dialog-actions">
        <button type="button" className="btn btn-outline" onClick={onCancel}>
          {cancelLabel}
        </button>
        <button type="button" className="btn btn-danger" onClick={onConfirm}>
          {confirmLabel}
        </button>
      </div>
    </dialog>
  )
}

export default ConfirmDialog
