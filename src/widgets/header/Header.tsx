'use client'

import clsx from 'clsx'
import { useLocale } from 'next-intl'
import { Link, usePathname, useRouter } from '@/shared/i18n/navigation'
import { routing } from '@/shared/i18n/routing'
import s from './Header.module.scss'
import { Icon } from '@/shared/ui/icon'
import { Button } from '@/shared/ui/button'
import { Typography } from '@/shared/ui/typography'
import { Select, SelectOption } from '@/shared/ui/select'

import bellIcon from '@/shared/ui/icon/icons/common/bell-outline.svg'
import ukFlagIcon from '@/shared/ui/icon/icons/locale/flag-united-kingdom.svg'
import ruFlagIcon from '@/shared/ui/icon/icons/locale/flag-russia.svg'

interface HeaderProps {
  isLoggedIn?: boolean
  className?: string
}

type Locale = (typeof routing.locales)[number]

const isLocale = (value: string): value is Locale => (routing.locales as readonly string[]).includes(value)

const languageOptions: SelectOption[] = [
  { value: 'en', label: 'English', icon: ukFlagIcon },
  { value: 'ru', label: 'Русский', icon: ruFlagIcon },
]

export const Header = ({ isLoggedIn = false, className }: HeaderProps) => {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  const handleLanguageChange = (value: string) => {
    if (!isLocale(value) || value === locale) return
    router.push(pathname, { locale: value })
  }

  return (
    <header className={clsx(s.headerWrapper, className)}>
      <div className={s.headerContainer}>
        <Link href='/' className={s.logoLink}>
          <Typography variant='h1' className={s.logo}>
            Inctagram
          </Typography>
        </Link>

        <div className={s.actionsBlock}>
          <Select options={languageOptions} value={locale} onChange={handleLanguageChange} />

          {isLoggedIn ? (
            <button className={s.bellButton} aria-label='Notifications'>
              <Icon icon={bellIcon} size={24} color='var(--text-primary)' className={s.bellIcon} />
              <span className={s.notificationBadge}>3</span>
            </button>
          ) : (
            <>
              <Button asChild variant='outlined' className={s.loginBtn}>
                <Link href='/sign-in'>Log in</Link>
              </Button>
              <Button asChild variant='filled' className={s.signupBtn}>
                <Link href='/sign-up'>Sign up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
