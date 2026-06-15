import type { ComponentPropsWithoutRef } from 'react'
import clsx from 'clsx'
import s from './Button.module.scss'

type ButtonVariant = 'filled' | 'secondary' | 'outlined' | 'text'

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
    /** Текст кнопки. */
    title: string
    /** Визуальный вариант кнопки. */
    variant?: ButtonVariant
}

export const Button = ({ title, variant = 'filled', type = 'button', className, ...restProps }: ButtonProps) => {
    return (
        <button type={type} className={clsx(s.button, s[variant], className)} {...restProps}>
            {title}
        </button>
    )
}
