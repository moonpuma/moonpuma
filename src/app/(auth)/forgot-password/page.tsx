import type { Metadata } from 'next'
import { ForgotPasswordForm } from '@/features/auth/forgot-password'
import s from './page.module.scss'

export const metadata: Metadata = {
  title: 'Forgot Password',
}

export default function ForgotPasswordPage() {
  return (
    <main className={s.page}>
      <ForgotPasswordForm />
    </main>
  )
}
