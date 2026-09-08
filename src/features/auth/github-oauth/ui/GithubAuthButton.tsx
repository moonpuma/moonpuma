'use client'

import { Icon } from '@/shared/ui/icon'
import GithubIcon from '@/shared/ui/icon/icons/social/github.svg'
import s from './GithubAuthButton.module.scss'

interface GithubAuthButtonProps {
  'aria-label': string
}

// UC-5 описывает GitHub наравне с Google, но API-скриншоты содержат только Google
// endpoint'ы (docs/API/README.md) — GitHub-запросы делать не на что, поэтому пока заглушка,
// общая для Sign In и Sign Up.
export function GithubAuthButton({ 'aria-label': ariaLabel }: GithubAuthButtonProps) {
  const handleClick = () => {
    console.log('GitHub auth is not implemented yet')
  }

  return (
    <button type='button' className={s.oauthBtn} onClick={handleClick} aria-label={ariaLabel}>
      <Icon icon={GithubIcon} size={36} color='var(--color-light-100)' />
    </button>
  )
}
