'use client'

import { getErrorStatus } from '@/shared/api'
import { useRouter } from '@/shared/i18n/navigation'
import { routes } from '@/shared/routing/routes'

interface UseLogoutRedirectOptions {
  signInHref?: string
  onSettled?: () => void
}

/**
 * 401 при logout/logout-all значит, что сессии на бэке уже нет — всё равно уводим на sign-in,
 * как при успехе. Остальные ошибки (сеть, 500) пробрасываем вызывающему коду без редиректа.
 */
export function useLogoutRedirect(mutateAsync: () => Promise<void>, options: UseLogoutRedirectOptions = {}) {
  const router = useRouter()
  const { signInHref = routes.auth.signIn(), onSettled } = options

  return async () => {
    try {
      await mutateAsync()
    } catch (error) {
      if (getErrorStatus(error) !== 401) {
        throw error
      }
    }

    onSettled?.()
    router.push(signInHref)
  }
}
