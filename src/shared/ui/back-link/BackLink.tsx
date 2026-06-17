import Link from 'next/link'
import clsx from 'clsx'
import { Icon } from '@/shared/ui/icon'
import ArrowBackIcon from '@/shared/ui/icon/icons/common/arrow-back-outline.svg'
import s from './BackLink.module.scss'

interface BackLinkProps {
  /** Куда вернуть пользователя. */
  href: string
  /** Текст ссылки. */
  title: string
  className?: string
}

/**
 * Ссылка «назад» со стрелкой. Навигация нативная (next/link).
 *
 * @example
 * <BackLink href='/sign-up' title='Back to Sign Up' />
 */
export const BackLink = ({ href, title, className }: BackLinkProps) => {
  return (
    <Link href={href} className={clsx(s.backLink, className)}>
      <Icon icon={ArrowBackIcon} size={24} color='currentColor' />
      {title}
    </Link>
  )
}
