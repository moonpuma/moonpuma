import type { Metadata } from 'next'
import { SignInForm } from './_components/SignInForm'
import s from './page.module.scss'

export const metadata: Metadata = {
  title: 'Sign In',
}

export default function SignInPage() {
  return (
    <div className={s.page}>
      <SignInForm />
    </div>
  )
}
