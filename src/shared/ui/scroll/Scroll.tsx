import { PropsWithChildren } from 'react'
import cn from 'clsx'

import styles from './Scroll.module.scss'

type ScrollProps = PropsWithChildren<{
  className?: string
  orientation?: 'vertical' | 'horizontal'
}>

export const Scroll = ({ children, className, orientation = 'vertical' }: ScrollProps) => {
  return <div className={cn(styles.scroll, styles[orientation], className)}>{children}</div>
}
