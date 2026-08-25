'use client'

import { useState } from 'react'
import { useLogoutRedirect } from '@/entities/auth/logout-redirect'
import { Button } from '@/shared/ui/button'
import { useLogoutAllSessions } from '../api'
import s from './LogoutAllButton.module.scss'

export function LogoutAllButton() {
  const [hasError, setHasError] = useState(false)
  const logoutAllMutation = useLogoutAllSessions()
  const logoutAndRedirect = useLogoutRedirect(logoutAllMutation.mutateAsync)

  const handleClick = async () => {
    setHasError(false)

    try {
      await logoutAndRedirect()
    } catch {
      setHasError(true)
    }
  }

  return (
    <div className={s.wrapper}>
      <Button variant='outlined' onClick={handleClick} disabled={logoutAllMutation.isPending}>
        Log out of all devices
      </Button>

      {hasError && (
        <span className={s.error} role='alert'>
          Unable to log out of all devices. Please try again
        </span>
      )}
    </div>
  )
}
