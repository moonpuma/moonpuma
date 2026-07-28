import type { ComponentPropsWithoutRef } from 'react'
import { Slot } from '@radix-ui/react-slot'
import clsx from 'clsx'
import s from './Button.module.scss'

type ButtonVariant = 'filled' | 'secondary' | 'outlined' | 'text'

type ButtonProps = {
  /** Choose from 4 style variants. Default: 'filled'. */
  variant?: ButtonVariant
  /** Render the Button using any element if asChild true */
  asChild?: boolean
} & ComponentPropsWithoutRef<'button'>

export const Button = ({ variant = 'filled', asChild, className, ...rest }: ButtonProps) => {
  const Component = asChild ? Slot : 'button'

  return <Component className={clsx(s.button, s[variant], className)} {...rest} />
}
