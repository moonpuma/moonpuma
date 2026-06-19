'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from '@/shared/ui/button'
import s from './page.module.scss'

// Экран успешного подтверждения email после регистрации (sign up).
// Логика авторизации пока не реализована — это статичная страница по макету Figma.
export default function SuccessPage() {
  const router = useRouter()

  return (
    <div className={s.container}>
      <h1 className={s.title}>Congratulations!</h1>
      <p className={s.description}>Your email has been confirmed</p>
      <Button title='Sign In' className={s.button} onClick={() => router.push('/sign-in')} />
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
