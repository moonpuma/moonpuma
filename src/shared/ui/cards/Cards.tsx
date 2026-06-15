import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import clsx from 'clsx'
import styles from './Cards.module.scss'

export type CardProps = {
  children: ReactNode
  className?: string
  variant?: 'default' | 'elevated' | 'outlined'
} & ComponentPropsWithoutRef<'div'>

export const Card = ({ children, className, variant = 'default', ...props }: CardProps) => {
  return (
    <div className={clsx(styles.card, styles[variant], className)} {...props}>
      {children}
    </div>
  )
}

export const Cards = Card
