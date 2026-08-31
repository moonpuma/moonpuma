'use client'

import type { ReactNode } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useRouter } from '@/shared/i18n/navigation'
import { routes } from '@/shared/routing/routes'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/cards'
import { ControlledInput } from '@/shared/ui/controlled-input'
import { Typography } from '@/shared/ui/typography'
import { getErrorStatus } from '@/shared/api'
import { useSignIn } from '../api'
import { signInSchema, type SignInFormValues } from '../model/schema'
import s from './SignInForm.module.scss'

const signInErrorMessage = 'The email or password are incorrect. Try again please'
const tooManyAttemptsMessage = 'Too many attempts. Please try again later'
const genericSignInErrorMessage = 'Something went wrong. Please try again'

export interface SignInFormProps {
  oauthButtons?: ReactNode
}

export function SignInForm({ oauthButtons }: SignInFormProps) {
  const router = useRouter()
  const signInMutation = useSignIn()

  const methods = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    mode: 'onChange',
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

  const onSubmit = async (data: SignInFormValues) => {
    try {
      await signInMutation.mutateAsync(data)
      router.push(routes.profile.root())
    } catch (error) {
      const status = getErrorStatus(error)

      if (status === 401) {
        setError('password', { message: signInErrorMessage })
        return
      }

      if (status === 403) {
        setError('password', { message: tooManyAttemptsMessage })
        return
      }

      setError('password', { message: genericSignInErrorMessage })
    }
  }

  return (
    <Card className={s.card}>
      <Typography variant='h1' className={s.title}>
        Sign In
      </Typography>

      <div className={s.oauthButtons}>{oauthButtons}</div>

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
            disabled={!isValid || isSubmitting || signInMutation.isPending}
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
