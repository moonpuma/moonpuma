'use client'

import { useEffect, useRef } from 'react'
import { useMutation } from '@tanstack/react-query'
import { googleLogin } from '@/features/auth/google-oauth'
import { useRouter } from '@/shared/i18n/navigation'
import { routes } from '@/shared/routing/routes'
import s from '../page.module.scss'

interface GoogleCallbackProps {
  code?: string
}

// UC-5, шаг 3: Google вернул пользователя на redirect_uri с ?code=... — обмениваем его
// на сессию через POST /auth/google/login и уводим на домашнюю страницу.
export function GoogleCallback({ code }: GoogleCallbackProps) {
  const router = useRouter()
  const loginStarted = useRef(false)
  const { mutate } = useMutation({ mutationFn: googleLogin })

  useEffect(() => {
    if (loginStarted.current) {
      return
    }

    loginStarted.current = true

    if (!code) {
      router.replace(routes.auth.signIn())
      return
    }

    mutate(code, {
      onSuccess: () => router.replace(routes.home()),
      onError: () => router.replace(routes.auth.signIn()),
    })
  }, [code, mutate, router])

  return (
    <div className={s.container} role='status' aria-live='polite'>
      <p className={s.status}>Signing you in...</p>
    </div>
  )
}
