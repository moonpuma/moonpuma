'use client'

import { useState } from 'react'
import clsx from 'clsx'
import Link from 'next/link'
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
  onLoginClick?: () => void
  onSignupClick?: () => void
}

const languageOptions: SelectOption[] = [
  { value: 'en', label: 'English', icon: ukFlagIcon },
  { value: 'ru', label: 'Русский', icon: ruFlagIcon },
]

export const Header = ({ isLoggedIn = false, className, onLoginClick, onSignupClick }: HeaderProps) => {
  const [lang, setLang] = useState<'en' | 'ru'>('en')

  const handleLanguageChange = (value: string) => {
    setLang(value as 'en' | 'ru')
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
          <Select options={languageOptions} value={lang} onChange={handleLanguageChange} />

          {isLoggedIn ? (
            <button className={s.bellButton} aria-label='Notifications'>
              <Icon icon={bellIcon} size={24} color='var(--text-primary)' className={s.bellIcon} />
              <span className={s.notificationBadge}>3</span>
            </button>
          ) : (
            <>
              <Button variant='outlined' asChild className={s.loginBtn}>
                <Link href='/sign-in' onClick={onLoginClick}>
                  Sign In
                </Link>
              </Button>
              <Button variant='filled' asChild className={s.signupBtn}>
                <Link href='/sign-up' onClick={onSignupClick}>
                  Sign up
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
