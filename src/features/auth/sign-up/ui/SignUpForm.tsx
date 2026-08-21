'use client'

import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Icon } from '@/shared/ui/icon'
import { Link } from '@/shared/i18n/navigation'
import { routes } from '@/shared/routing/routes'
import { ControlledInput } from '@/shared/ui/controlled-input'
import { ControlledCheckbox } from '@/shared/ui/controlled-checkbox'
import { Button } from '@/shared/ui/button'
import { Typography } from '@/shared/ui/typography'
import { Card } from '@/shared/ui/cards'
import { EmailSentModal } from '@/features/auth/email-sent-modal'
import { GoogleAuthButton } from '@/features/auth/google-oauth'
import GithubIcon from '@/shared/ui/icon/icons/social/github.svg'
import { registerUser, RegisterUserError, getConflictField } from '../api/register-user'
import { signUpSchema, type SignUpFormValues } from '../model/schema'
import s from './SignUpForm.module.scss'

export function SignUpForm() {
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null)

  const methods = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    mode: 'onBlur',
    defaultValues: {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      agree: false,
    },
  })

  const {
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors, isValid, isSubmitting },
  } = methods

  const registerMutation = useMutation({ mutationFn: registerUser })

  const onSubmit = async (values: SignUpFormValues) => {
    clearErrors('root.server')

    const data = {
      username: values.username,
      email: values.email,
      password: values.password,
      passwordConfirmation: values.passwordConfirmation,
    }

    try {
      await registerMutation.mutateAsync(data)
      setSubmittedEmail(data.email)
    } catch (error) {
      if (error instanceof RegisterUserError && error.status === 409) {
        const conflictField = getConflictField(error.payload)

        if (conflictField === 'email') {
          setError('email', { message: 'User with this email is already registered' }, { shouldFocus: true })
          return
        }

        if (conflictField === 'username') {
          setError('username', { message: 'User with this username is already registered' }, { shouldFocus: true })
          return
        }

        setError('root.server', { message: 'User with this email or username is already registered' })
        return
      }

      setError('root.server', { message: 'Unable to register. Please try again' })
    }
  }

  const handleEmailSentClose = () => {
    setSubmittedEmail(null)
    reset()
  }

  const handleGithubSignUp = () => {
    // TODO: подключить OAuth через GitHub (UC-5)
    console.log('GitHub sign up')
  }

  return (
    <Card className={s.card}>
      <Typography variant='h1' className={s.title}>
        Sign Up
      </Typography>

      {/* OAuth-кнопки */}
      <div className={s.oauthButtons}>
        <GoogleAuthButton aria-label='Sign up with Google' />
        <button type='button' className={s.oauthBtn} onClick={handleGithubSignUp} aria-label='Sign up with GitHub'>
          <Icon icon={GithubIcon} size={36} color='var(--color-light-100)' />
        </button>
      </div>

      {/* Форма */}
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className={s.form} noValidate>
          <ControlledInput name='username' label='Username' placeholder='Epam11' />

          <ControlledInput name='email' label='Email' type='email' placeholder='Epam@epam.com' />

          <ControlledInput
            name='password'
            label='Password'
            type='password'
            showPasswordToggle
            placeholder='******************'
          />

          <ControlledInput
            name='passwordConfirmation'
            label='Password confirmation'
            type='password'
            showPasswordToggle
            placeholder='******************'
          />

          <div className={s.agreement}>
            <div className={s.agreementRow}>
              <ControlledCheckbox name='agree' />
              <span className={s.agreementText}>
                I agree to the{' '}
                <Link href={routes.legal.termsOfService()} className={s.link}>
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href={routes.legal.privacyPolicy()} className={s.link}>
                  Privacy Policy
                </Link>
              </span>
            </div>
            {errors.agree && <span className={s.errorText}>{errors.agree.message}</span>}
          </div>

          <Button
            type='submit'
            disabled={!isValid || isSubmitting || registerMutation.isPending}
            className={s.submitButton}
          >
            {isSubmitting || registerMutation.isPending ? 'Signing Up...' : 'Sign Up'}
          </Button>

          {errors.root?.server && (
            <span className={s.formError} role='alert'>
              {errors.root.server.message}
            </span>
          )}
        </form>
      </FormProvider>

      {/* Ссылка на вход */}
      <div className={s.footer}>
        <Typography variant='regular_text_16'>Do you have an account?</Typography>
        <Typography variant='regular_link' href={routes.auth.signIn()}>
          Sign In
        </Typography>
      </div>

      <EmailSentModal isOpen={submittedEmail !== null} onClose={handleEmailSentClose} email={submittedEmail ?? ''} />
    </Card>
  )
}
