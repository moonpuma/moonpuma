'use client'

import { TextareaHTMLAttributes } from 'react'
import s from './Textarea.module.css'

type PropsType = {
  className?: string
} & TextareaHTMLAttributes<HTMLTextAreaElement>

export const Textarea = ({ className, ...restProps }: PropsType) => {
  return <textarea className={`${s.textarea} ${className || ''}`} {...restProps}></textarea>
}
