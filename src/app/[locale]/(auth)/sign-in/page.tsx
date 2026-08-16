import type { Metadata } from 'next'
import { LoginByEmailForm } from '@/features/auth/sign-in/login-by-email'
import s from './page.module.scss'

export const metadata: Metadata = {
  title: 'Sign In',
}

export default function SignInPage() {
  return (
    <div className={s.page}>
      <LoginByEmailForm />
    </div>
  )
}
