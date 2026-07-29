'use client'

import Image from 'next/image'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import s from './page.module.scss'

// Экран повторной отправки ссылки подтверждения email (UC-1, альт. сценарий №3:
// истекло время перехода по ссылке из письма). Логика пока не реализована
export default function ResendLinkPage() {
  return (
    <div className={s.container}>
      <h1 className={s.title}>Email verification link expired</h1>
      <p className={s.description}>
        Looks like the verification link has expired. Not to worry, we can send the link again
      </p>
      <div className={s.form}>
        <Input type='email' label='Email' placeholder='Epam@epam.com' />
        <Button title='Resend verification link' className={s.button} />
      </div>
      <Image
        className={s.image}
        src='/images/rafiki.svg'
        alt='Expired verification link illustration'
        width={473}
        height={352}
        priority
        unoptimized
      />
    </div>
  )
}
