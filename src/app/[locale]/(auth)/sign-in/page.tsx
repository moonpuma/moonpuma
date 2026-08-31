import type { Metadata } from 'next'
import { SignInForm } from '@/features/auth/sign-in'
import { GoogleAuthButton } from '@/features/auth/google-oauth'
import { GithubAuthButton } from '@/features/auth/github-oauth'
import s from './page.module.scss'

export const metadata: Metadata = {
  title: 'Sign In',
}

export default function SignInPage() {
  return (
    <div className={s.page}>
      <SignInForm
        oauthButtons={
          <>
            <GoogleAuthButton aria-label='Sign in with Google' />
            <GithubAuthButton aria-label='Sign in with GitHub' />
          </>
        }
      />
    </div>
  )
}
