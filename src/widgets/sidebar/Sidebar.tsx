import clsx from 'clsx'
import type { CSSProperties } from 'react'

import { Icon, type IconComponent } from '@/shared/ui/icon'
import { Link } from '@/shared/i18n/navigation'
import { routes } from '@/shared/routing/routes'
import BookmarkOutlineIcon from '@/shared/ui/icon/icons/common/bookmark-outline.svg'
import HomeIcon from '@/shared/ui/icon/icons/common/home.svg'
import HomeOutlineIcon from '@/shared/ui/icon/icons/common/home-outline.svg'
import LogOutOutlineIcon from '@/shared/ui/icon/icons/common/log-out-outline.svg'
import MessageCircleOutlineIcon from '@/shared/ui/icon/icons/common/message-circle-outline.svg'
import PersonOutlineIcon from '@/shared/ui/icon/icons/common/person-outline.svg'
import PlusSquareOutlineIcon from '@/shared/ui/icon/icons/common/plus-square-outline.svg'
import SearchOutlineIcon from '@/shared/ui/icon/icons/common/search-outline.svg'
import TrendingUpOutlineIcon from '@/shared/ui/icon/icons/common/trending-up-outline.svg'

import s from './Sidebar.module.scss'

export type SidebarItemState = 'default' | 'active' | 'hover' | 'focus' | 'disabled'

export type SidebarItem = {
  id: string
  label: string
  href: string
  icon: IconComponent
  activeIcon?: IconComponent
  state?: SidebarItemState
}

export type SidebarProps = {
  items?: SidebarItem[]
  activeItemId?: string
  signInHref?: string
  logoutLabel?: string
  className?: string
  style?: CSSProperties
  onLogout?: () => void
}

const primaryItems: SidebarItem[] = [
  {
    id: 'feed',
    label: 'Feed',
    href: routes.home(),
    icon: HomeOutlineIcon,
    activeIcon: HomeIcon,
  },
  {
    id: 'create',
    label: 'Create',
    href: '/create',
    icon: PlusSquareOutlineIcon,
  },
  {
    id: 'profile',
    label: 'My Profile',
    href: routes.profile.root(),
    icon: PersonOutlineIcon,
  },
  {
    id: 'messenger',
    label: 'Messenger',
    href: '/messenger',
    icon: MessageCircleOutlineIcon,
  },
  {
    id: 'search',
    label: 'Search',
    href: '/search',
    icon: SearchOutlineIcon,
  },
]

const secondaryItems: SidebarItem[] = [
  {
    id: 'statistics',
    label: 'Statistics',
    href: '/statistics',
    icon: TrendingUpOutlineIcon,
  },
  {
    id: 'favorites',
    label: 'Favorites',
    href: '/favorites',
    icon: BookmarkOutlineIcon,
  },
]

export const defaultSidebarItems: SidebarItem[] = [...primaryItems, ...secondaryItems]

const getItemState = (item: SidebarItem, activeItemId?: string): SidebarItemState => {
  if (item.state) {
    return item.state
  }

  return item.id === activeItemId ? 'active' : 'default'
}

const renderItem = (item: SidebarItem, activeItemId?: string) => {
  const state = getItemState(item, activeItemId)
  const isDisabled = state === 'disabled'
  const isActive = state === 'active'
  const icon = isActive && item.activeIcon ? item.activeIcon : item.icon

  return (
    <li key={item.id}>
      <Link
        href={isDisabled ? '#' : item.href}
        className={clsx(s.item, s[state])}
        aria-current={isActive ? 'page' : undefined}
        aria-disabled={isDisabled || undefined}
        tabIndex={isDisabled ? -1 : undefined}
        onClick={isDisabled ? (event) => event.preventDefault() : undefined}
      >
        <Icon icon={icon} size={24} className={s.icon} aria-hidden='true' />
        <span className={s.label}>{item.label}</span>
      </Link>
    </li>
  )
}

export const Sidebar = ({
  items = defaultSidebarItems,
  activeItemId,
  signInHref = routes.auth.signIn(),
  logoutLabel = 'Log Out',
  className,
  style,
  onLogout,
}: SidebarProps) => {
  const primary = items.filter((item) => primaryItems.some((primaryItem) => primaryItem.id === item.id))
  const secondary = items.filter((item) => secondaryItems.some((secondaryItem) => secondaryItem.id === item.id))

  return (
    <aside className={clsx(s.sidebar, className)} style={style} aria-label='Main navigation'>
      <nav className={s.nav}>
        <ul className={s.group}>{primary.map((item) => renderItem(item, activeItemId))}</ul>
        <ul className={s.group}>{secondary.map((item) => renderItem(item, activeItemId))}</ul>
      </nav>

      <Link href={signInHref} className={s.logout} onClick={onLogout}>
        <Icon icon={LogOutOutlineIcon} size={24} className={s.icon} aria-hidden='true' />
        <span className={s.label}>{logoutLabel}</span>
      </Link>
    </aside>
  )
}
