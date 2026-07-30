'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { confirmEmail } from '@/features/auth/confirm-email'
import { Button } from '@/shared/ui/button'
import s from '../page.module.scss'

interface EmailConfirmationProps {
  code?: string
}

const uuidV4Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

export function EmailConfirmation({ code }: EmailConfirmationProps) {
  const router = useRouter()
  const confirmationStarted = useRef(false)
  const { mutate, isSuccess } = useMutation({ mutationFn: confirmEmail })

  useEffect(() => {
    if (confirmationStarted.current) {
      return
    }

    confirmationStarted.current = true

    if (!code || !uuidV4Regex.test(code)) {
      router.replace('/resend-link')
      return
    }

    mutate(code, {
      onError: () => router.replace('/resend-link'),
    })
  }, [code, mutate, router])

  if (!isSuccess) {
    return (
      <div className={s.container} role='status' aria-live='polite'>
        <p className={s.status}>Confirming your email...</p>
      </div>
    )
  }

  return (
    <div className={s.container}>
      <h1 className={s.title}>Congratulations!</h1>
      <p className={s.description}>Your email has been confirmed</p>
      <Button asChild className={s.button}>
        <Link href='/sign-in'>Sign In</Link>
      </Button>
      <Image
        className={s.image}
        src='/images/email-confirmed.svg'
        alt='Email confirmed illustration'
        width={432}
        height={300}
        priority
        unoptimized
      />
    </div>
  )
}
