'use client'

import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { GoogleAuthButton } from '@/features/auth/google-oauth'
import { Link, useRouter } from '@/shared/i18n/navigation'
import { routes } from '@/shared/routing/routes'
import { Icon } from '@/shared/ui/icon'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/cards'
import { ControlledInput } from '@/shared/ui/controlled-input'
import { Typography } from '@/shared/ui/typography'
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
      router.push(routes.profile.root())
    } catch {
      setError('password', {
        message: loginErrorMessage,
      })
    }
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
        <GoogleAuthButton aria-label='Sign in with Google' />
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

          <Link href={routes.auth.forgotPassword()} className={s.forgotPassword}>
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
        <Typography variant='regular_link' href={routes.auth.signUp()}>
          Sign Up
        </Typography>
      </div>
    </Card>
  )
}
