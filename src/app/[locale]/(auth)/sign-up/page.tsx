import type { Metadata } from 'next'
import { SignUpForm } from '@/features/auth/sign-up'
import { GoogleAuthButton } from '@/features/auth/google-oauth'
import { GithubAuthButton } from '@/features/auth/github-oauth'
import s from './page.module.scss'

export const metadata: Metadata = {
  title: 'Sign Up',
}

export default function SignUpPage() {
  return (
    <div className={s.page}>
      <SignUpForm
        oauthButtons={
          <>
            <GoogleAuthButton aria-label='Sign up with Google' />
            <GithubAuthButton aria-label='Sign up with GitHub' />
          </>
        }
      />
    </div>
  )
}
