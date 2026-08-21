import type { Metadata } from 'next'
import { SignUpForm } from '@/features/auth/sign-up'
import s from './page.module.scss'

export const metadata: Metadata = {
  title: 'Sign Up',
}

export default function SignUpPage() {
  return (
    <div className={s.page}>
      <SignUpForm />
    </div>
  )
}
