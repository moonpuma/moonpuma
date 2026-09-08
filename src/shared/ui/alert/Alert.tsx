import type { ComponentPropsWithoutRef } from 'react'
import clsx from 'clsx'
import { Icon } from '@shared/ui/icon'
import CloseIcon from '@shared/ui/icon/icons/common/close.svg'
import s from './Alert.module.scss'

interface AlertProps extends ComponentPropsWithoutRef<'div'> {
  message: string
  isError?: boolean
  visible?: boolean
  onClose?: () => void
}

export const Alert = ({ message, isError = false, visible = true, onClose, className = '', ...restProps }: AlertProps) => {
  const variantClassName = isError ? s.error : s.success
  const combinedClassName = clsx(s.alertWrapper, variantClassName, !visible && s.exiting, className)

  return (
    <div className={combinedClassName} role='alert' {...restProps}>
      <span className={s.text}>{message}</span>
      {onClose && (
        <button type='button' className={s.btn} onClick={onClose} aria-label='Закрыть уведомление'>
          <Icon icon={CloseIcon} size={20} />
        </button>
      )}
    </div>
  )
}
