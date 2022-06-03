import { h } from 'preact'
import { useState, useCallback } from 'preact/hooks'

export const useModalState = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = useCallback(() => {
    if (!isOpen) {
      setIsOpen(true)
    }
  }, [isOpen])

  const handleClose = useCallback(() => {
    if (isOpen) {
      setIsOpen(false)
    }
  }, [isOpen])

  return {
    isOpen,
    handleOpen,
    handleClose
  }
}
