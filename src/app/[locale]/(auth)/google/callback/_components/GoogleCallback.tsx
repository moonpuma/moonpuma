'use client'

import { useEffect, useRef } from 'react'
import { useGoogleLogin } from '@/features/auth/google-oauth'
import { useRouter } from '@/shared/i18n/navigation'
import { routes } from '@/shared/routing/routes'
import { getErrorStatus } from '@/shared/api'
import { showErrorToast } from '@/shared/ui/toast'
import s from '../page.module.scss'

interface GoogleCallbackProps {
  code?: string
  error?: string
}

const googleLoginErrorMessage = 'Google sign-in failed. Please try again'
const googleAccessDeniedMessage = 'Google sign-in was cancelled'
const tooManyAttemptsMessage = 'Too many attempts. Please try again later'

// UC-5, шаг 3: Google вернул пользователя на redirect_uri либо с ?code=..., либо (если
// пользователь отменил согласие на экране Google, или запрос к Google был некорректен) с
// ?error=... — в обоих случаях без code, только error. code обмениваем на сессию через
// POST /auth/google/login, error показываем тостом и уводим на страницу входа.
export function GoogleCallback({ code, error }: GoogleCallbackProps) {
  const router = useRouter()
  const loginStarted = useRef(false)
  const { mutate } = useGoogleLogin()

  useEffect(() => {
    if (loginStarted.current) {
      return
    }

    loginStarted.current = true

    if (error) {
      showErrorToast(error === 'access_denied' ? googleAccessDeniedMessage : googleLoginErrorMessage)
      router.replace(routes.auth.signIn())
      return
    }

    if (!code) {
      showErrorToast(googleLoginErrorMessage)
      router.replace(routes.auth.signIn())
      return
    }

    mutate(code, {
      onSuccess: () => router.replace(routes.home()),
      onError: (mutationError) => {
        const message = getErrorStatus(mutationError) === 429 ? tooManyAttemptsMessage : googleLoginErrorMessage
        showErrorToast(message)
        router.replace(routes.auth.signIn())
      },
    })
  }, [code, error, mutate, router])

  return (
    <div className={s.container} role='status' aria-live='polite'>
      <p className={s.status}>Signing you in...</p>
    </div>
  )
}
