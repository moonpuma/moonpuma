'use client'

import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Icon } from '@/shared/ui/icon'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/cards'
import { ControlledInput } from '@/shared/ui/controlled-input'
import { Typography } from '@/shared/ui/typography'
import GoogleIcon from '@/shared/ui/icon/icons/social/google.svg'
import GithubIcon from '@/shared/ui/icon/icons/social/github.svg'
import { useLoginByEmail } from '../api/use-login-by-email'
import { loginByEmailSchema, type LoginByEmailFormValues } from '../model/schema'
import s from './LoginByEmailForm.module.scss'

const loginErrorMessage = 'The email or password are incorrect. Try again please'

export function LoginByEmailForm() {
  const router = useRouter()
  const loginMutation = useLoginByEmail()

  const methods = useForm<LoginByEmailFormValues>({
    resolver: zodResolver(loginByEmailSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const {
    handleSubmit,
    setError,
    formState: { isSubmitting, isValid },
  } = methods

  const onSubmit = async (data: LoginByEmailFormValues) => {
    try {
      await loginMutation.mutateAsync(data)
      router.push('/profile')
    } catch {
      setError('password', {
        message: loginErrorMessage,
      })
    }
  }

  const handleGoogleSignIn = () => {
    // TODO: подключить OAuth через Google (docs/AUTH.md, UC-5).
    console.log('Google sign in')
  }

  const handleGithubSignIn = () => {
    // TODO: GitHub OAuth не реализуем без backend-контракта (docs/API/README.md).
    console.log('GitHub sign in')
  }

  return (
    <Card className={s.card}>
      <Typography variant='h1' className={s.title}>
        Sign In
      </Typography>

      <div className={s.oauthButtons}>
        <button type='button' className={s.oauthBtn} onClick={handleGoogleSignIn} aria-label='Sign in with Google'>
          <Icon icon={GoogleIcon} size={36} />
        </button>
        <button type='button' className={s.oauthBtn} onClick={handleGithubSignIn} aria-label='Sign in with GitHub'>
          <Icon icon={GithubIcon} size={36} color='var(--color-light-100)' />
        </button>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className={s.form} noValidate>
          <ControlledInput name='email' label='Email' type='email' placeholder='Epam@epam.com' />

          <ControlledInput
            name='password'
            label='Password'
            type='password'
            showPasswordToggle
            placeholder='******************'
          />

          <Link href='/forgot-password' className={s.forgotPassword}>
            <Typography variant='regular_text_14'>Forgot Password</Typography>
          </Link>

          <Button
            type='submit'
            disabled={!isValid || isSubmitting || loginMutation.isPending}
            className={s.submitButton}
          >
            Sign In
          </Button>
        </form>
      </FormProvider>

      <div className={s.footer}>
        <Typography variant='regular_text_16'>Don&apos;t have an account?</Typography>
        <Typography variant='regular_link' href='/sign-up'>
          Sign Up
        </Typography>
      </div>
    </Card>
  )
}
