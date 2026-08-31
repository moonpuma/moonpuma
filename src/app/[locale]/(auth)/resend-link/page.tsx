import type { Metadata } from 'next'
import Image from 'next/image'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/shared/i18n/navigation'
import { routes } from '@/shared/routing/routes'
import { Button } from '@/shared/ui/button'
import s from './page.module.scss'

export const metadata: Metadata = {
  title: 'Password recovery',
}

interface ResendLinkPageProps {
  params: Promise<{ locale: string }>
}

// UC-3, альт. сценарий №2: ссылка восстановления пароля истекла/невалидна. Отдельного
// backend-endpoint под "переотправить ссылку" нет (docs/API/README.md), а email пользователя
// на этом шаге неизвестен — recovery-код в /create-new-password непрозрачен, поэтому кнопка
// ведёт обратно на /forgot-password, где повторная отправка уже реализована.
export default async function ResendLinkPage({ params }: ResendLinkPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <div className={s.container}>
      <h1 className={s.title}>Email verification link expired</h1>
      <p className={s.description}>
        Looks like the verification link has expired. Not to worry, we can send the link again
      </p>
      <Button asChild className={s.button}>
        <Link href={routes.auth.forgotPassword()}>Resend link</Link>
      </Button>
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
