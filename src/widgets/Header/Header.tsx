'use client'

import { useState } from 'react'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import s from './Header.module.scss'
import { Button } from '@/shared/ui/Button'
import { Typography } from '@/shared/ui/Typography'

import bellIcon from '@/shared/ui/icons/common/bell-outline.svg'
import arrowDownIcon from '@/shared/ui/icons/common/arrow-ios-down-outline.svg'
import ukFlagIcon from '@/shared/ui/icons/locale/flag-united-kingdom.svg'
import ruFlagIcon from '@/shared/ui/icons/locale/flag-russia.svg'

interface HeaderProps {
  isLoggedIn?: boolean
  className?: string
  onLoginClick?: () => void
  onSignupClick?: () => void
}

export const Header = ({
  isLoggedIn = false,
  className,
  onLoginClick = () => {},
  onSignupClick = () => {},
}: HeaderProps) => {
  const [lang, setLang] = useState<'en' | 'ru'>('en')

  const currentFlag = lang === 'en' ? ukFlagIcon : ruFlagIcon

  return (
    <header className={clsx(s.headerWrapper, className)}>
      <div className={s.headerContainer}>
        <Link href='/' className={s.logoLink}>
          <Typography variant='h1' className={s.logo}>
            Inctagram
          </Typography>
        </Link>

        <div className={s.actionsBlock}>
          <div className={s.languageSelectorWrapper}>
            <Image src={currentFlag} alt='' className={s.flagIcon} aria-hidden />

            <select
              className={s.languageSelector}
              value={lang}
              onChange={(e) => setLang(e.target.value as 'en' | 'ru')}
            >
              <option value='en'>English</option>
              <option value='ru'>Русский</option>
            </select>

            <Image src={arrowDownIcon} alt='' className={s.arrowIcon} aria-hidden />
          </div>

          {isLoggedIn ? (
            <button className={s.bellButton} aria-label='Notifications'>
              <Image src={bellIcon} alt='Notifications' className={s.bellIcon} />
              <span className={s.notificationBadge}>3</span>
            </button>
          ) : (
            <>
              <Button variant='outlined' onClick={onLoginClick} className={s.loginBtn} title='Log in' />
              <Button variant='filled' onClick={onSignupClick} className={s.signupBtn} title='Sign up' />
            </>
          )}
        </div>
      </div>
    </header>
  )
}
