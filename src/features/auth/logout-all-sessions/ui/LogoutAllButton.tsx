'use client'

import { isAxiosError } from 'axios'
import { useRouter } from '@/shared/i18n/navigation'
import { routes } from '@/shared/routing/routes'
import { Button } from '@/shared/ui/button'
import { useLogoutAllSessions } from '../api'

export function LogoutAllButton() {
  const router = useRouter()
  const logoutAllMutation = useLogoutAllSessions()

  const handleClick = async () => {
    try {
      await logoutAllMutation.mutateAsync()
      router.push(routes.auth.signIn())
    } catch (error) {
      // 401 значит сессии уже нет на бэке — всё равно уводим на sign-in.
      if (isAxiosError(error) && error.response?.status === 401) {
        router.push(routes.auth.signIn())
      }
    }
  }

  return (
    <Button variant='outlined' onClick={handleClick} disabled={logoutAllMutation.isPending}>
      Log out of all devices
    </Button>
  )
}
