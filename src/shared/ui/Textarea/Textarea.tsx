'use client'

import { TextareaHTMLAttributes } from 'react'
import s from './Textarea.module.css'

type PropsType = {
  className?: string
  error?: string | undefined
} & TextareaHTMLAttributes<HTMLTextAreaElement>

export const Textarea = ({ className, error, ...restProps }: PropsType) => {
  return (
    <div className='textarea-wrapper'>
      <textarea className={`${s.textarea} ${error ? s.error : ''} ${className || ''}`} {...restProps} />
      {error && <span className={s.errorText}>{error}</span>}
    </div>
  )
}
