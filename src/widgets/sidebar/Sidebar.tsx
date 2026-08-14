'use client'

import clsx from 'clsx'
import { isAxiosError } from 'axios'
import { useState, type CSSProperties, type MouseEvent } from 'react'

import { useLogoutCurrentSession } from '@/features/auth/logout-current-session'
import { Icon, type IconComponent } from '@/shared/ui/icon'
import { Link, useRouter } from '@/shared/i18n/navigation'
import { routes } from '@/shared/routing/routes'
import { Modal } from '@/shared/ui/modal'
import { Button } from '@/shared/ui/button'
import { Typography } from '@/shared/ui/typography'
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
    /**
     * Email текущего пользователя — подставляется в текст confirm-модалки логаута.
     * Пока в проекте нет GET /auth/me, поэтому проп необязательный:
     * если не передан, используется нейтральный текст "your account".
     */
    userEmail?: string
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
                            userEmail,
                            className,
                            style,
                            onLogout,
                        }: SidebarProps) => {
    const router = useRouter()
    const logoutMutation = useLogoutCurrentSession()
    const [isLogoutModalOpen, setLogoutModalOpen] = useState(false)

    const primary = items.filter((item) => primaryItems.some((primaryItem) => primaryItem.id === item.id))
    const secondary = items.filter((item) => secondaryItems.some((secondaryItem) => secondaryItem.id === item.id))

    const openLogoutModal = (event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault()
        setLogoutModalOpen(true)
    }

    const closeLogoutModal = () => {
        if (logoutMutation.isPending) {
            return
        }
        setLogoutModalOpen(false)
    }

    const confirmLogout = async () => {
        try {
            await logoutMutation.mutateAsync()
            setLogoutModalOpen(false)
            onLogout?.()
            router.push(signInHref)
        } catch (error) {
            // 401 значит сессия уже недействительна на бэке — всё равно уводим на sign-in.
            if (isAxiosError(error) && error.response?.status === 401) {
                setLogoutModalOpen(false)
                onLogout?.()
                router.push(signInHref)
                return
            }
            // Прочие ошибки (сеть, 500 и т.д.) — оставляем модалку открытой,
            // пользователь может попробовать ещё раз или закрыть модалку сам.
        }
    }

    return (
        <aside className={clsx(s.sidebar, className)} style={style} aria-label='Main navigation'>
            <nav className={s.nav}>
                <ul className={s.group}>{primary.map((item) => renderItem(item, activeItemId))}</ul>
                <ul className={s.group}>{secondary.map((item) => renderItem(item, activeItemId))}</ul>
            </nav>

            <Link href={signInHref} className={s.logout} onClick={openLogoutModal}>
                <Icon icon={LogOutOutlineIcon} size={24} className={s.icon} aria-hidden='true' />
                <span className={s.label}>{logoutLabel}</span>
            </Link>

            <Modal
                isOpen={isLogoutModalOpen}
                onClose={closeLogoutModal}
                title='Log out'
                footer={
                    <>
                        <Button variant='secondary' onClick={closeLogoutModal} disabled={logoutMutation.isPending}>
                            No
                        </Button>
                        <Button variant='filled' onClick={confirmLogout} disabled={logoutMutation.isPending}>
                            Yes
                        </Button>
                    </>
                }
            >
                <Typography variant='regular_text_16'>
                    Are you really want to log out of your account &quot;{userEmail ?? 'your account'}&quot;?
                </Typography>
            </Modal>
        </aside>
    )
}