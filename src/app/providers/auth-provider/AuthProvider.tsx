'use client'

import { useEffect, type PropsWithChildren } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { setOnSessionExpired } from '@/shared/api'
import { useRouter } from '@/shared/i18n/navigation'
import { routes } from '@/shared/routing/routes'

/**
 * Замыкает response-интерцептор httpClient (src/shared/api/http-client): при невосстановимой
 * потере сессии (401 на самом /auth/refresh-token) чистит кэш и уводит на /sign-in.
 * shared/api сам не знает про роутер/кэш — колбэк регистрируется отсюда, из app-слоя.
 */
export const AuthProvider = ({ children }: PropsWithChildren) => {
  const queryClient = useQueryClient()
  const router = useRouter()

  useEffect(() => {
    setOnSessionExpired(() => {
      queryClient.clear()
      router.push(routes.auth.signIn())
    })

    return () => setOnSessionExpired(undefined)
  }, [queryClient, router])

  return children
}
