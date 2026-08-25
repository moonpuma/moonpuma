'use client'

import { Icon } from '@/shared/ui/icon'
import GoogleIcon from '@/shared/ui/icon/icons/social/google.svg'
import { useGetGoogleAuthUrl } from '../api'
import s from './GoogleAuthButton.module.scss'

interface GoogleAuthButtonProps {
  'aria-label': string
}

// UC-5: один и тот же backend-флоу (GET /auth/google/url → редирект → /google/callback)
// обслуживает и вход, и регистрацию — компонент общий для Sign In и Sign Up.
export function GoogleAuthButton({ 'aria-label': ariaLabel }: GoogleAuthButtonProps) {
  const getUrlMutation = useGetGoogleAuthUrl()

  return (
    <button
      type='button'
      className={s.oauthBtn}
      onClick={() => getUrlMutation.mutate()}
      disabled={getUrlMutation.isPending}
      aria-label={ariaLabel}
    >
      <Icon icon={GoogleIcon} size={36} />
    </button>
  )
}
