import type { Metadata } from 'next'
import Image from 'next/image'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/shared/i18n/navigation'
import { routes } from '@/shared/routing/routes'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import s from './page.module.scss'

export const metadata: Metadata = {
  title: 'Sign Up',
}

interface ResendConfirmationLinkPageProps {
  params: Promise<{ locale: string }>
}

// UC-1, альт. сценарий №3: ссылка подтверждения email истекла/невалидна. Отдельного
// backend-endpoint под "переотправить ссылку подтверждения" нет (docs/API/README.md) —
// POST /auth/register принимает только полную форму регистрации, не email в одиночку.
// Поэтому поле email здесь информационное, а кнопка ведёт обратно на /sign-up, где
// пользователь заполняет форму заново (UC-1, альт. сценарий №2).
export default async function ResendConfirmationLinkPage({ params }: ResendConfirmationLinkPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <div className={s.container}>
      <h1 className={s.title}>Email verification link expired</h1>
      <p className={s.description}>
        Looks like the verification link has expired. Not to worry, we can send the link again
      </p>
      <div className={s.form}>
        <Input type='email' label='Email' placeholder='Epam@epam.com' />
        <Button asChild className={s.button}>
          <Link href={routes.auth.signUp()}>Resend verification link</Link>
        </Button>
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
