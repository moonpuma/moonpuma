'use client'

import { Modal } from '@/shared/ui/modal'
import { Button } from '@/shared/ui/button'
import { Typography } from '@/shared/ui/typography'

export interface EmailSentModalProps {
  isOpen: boolean
  /**
   * Закрытие сообщения по [ OK ] или крестику.
   * По спеке (AUTH.md, UC-1 шаг 7 / UC-3 шаг 7) обе кнопки ведут себя одинаково:
   * пользователь остаётся на текущей странице. Редиректа на /sign-in здесь нет —
   * он происходит только после перехода по ссылке из письма (UC-1 шаг 9).
   * Очистку полей формы выполняет родитель в обработчике onClose.
   */
  onClose: () => void
  email: string
}

export function EmailSentModal({ isOpen, onClose, email }: EmailSentModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title='Email sent' footer={<Button title='OK' onClick={onClose} />}>
      <Typography variant='regular_text_16'>We have sent a link to confirm your email to {email}</Typography>
    </Modal>
  )
}
