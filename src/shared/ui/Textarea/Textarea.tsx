'use client'

import { TextareaHTMLAttributes } from 'react'

type PropsType = {
  className?: string
} & TextareaHTMLAttributes<HTMLTextAreaElement>

export const Textarea = ({ className, ...restProps }: PropsType) => {
  return <textarea className={className} {...restProps}></textarea>
}
