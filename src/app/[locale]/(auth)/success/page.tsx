'use client'

import Image from 'next/image'
import { Button } from '@/shared/ui/button'
import { useRouter } from '@/shared/i18n/navigation'
import { routes } from '@/shared/routing/routes'
import s from './page.module.scss'

// Экран успешного подтверждения email после регистрации (sign up).
// Логика авторизации пока не реализована — это статичная страница по макету Figma.
export default function SuccessPage() {
  const router = useRouter()

  return (
    <div className={s.container}>
      <h1 className={s.title}>Congratulations!</h1>
      <p className={s.description}>Your email has been confirmed</p>
      <Button title='Sign In' className={s.button} onClick={() => router.push(routes.auth.signIn())} />
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
