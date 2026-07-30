'use client'
import s from './Menu.module.scss'
import cn from 'clsx'

import home from '@/shared/ui/icon/icons/common/home-outline.svg'
import plus from '@/shared/ui/icon/icons/common/plus-square-outline.svg'
import message from '@/shared/ui/icon/icons/common/message-circle-outline.svg'
import search from '@/shared/ui/icon/icons/common/search.svg'
import person from '@/shared/ui/icon/icons/common/person-outline.svg'
import { Icon } from '@/shared/ui/icon'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const menuItems = [
  { id: 1, label: 'Home', href: '/', icon: 'home', img: home },
  { id: 2, label: 'Generate', href: '/generate', img: plus },
  { id: 3, label: 'Messenger', href: '/messenger', img: message },
  { id: 4, label: 'Search', href: '/search', img: search },
  { id: 5, label: 'Profile', href: '/profile', img: person },
]

export const Menu = ({ className, pathname: pathnameProp }: { className?: string; pathname?: string }) => {
  const currentPathname = usePathname()
  const pathname = pathnameProp ?? currentPathname

  return (
    <div className={cn(s.wrapper, className)}>
      {menuItems.map((el) => (
        <Link href={el.href} key={el.id}>
          <Icon icon={el.img} size={24} color={pathname === el.href ? 'var(--color-accent-500)' : ''} />
        </Link>
      ))}
    </div>
  )
}
