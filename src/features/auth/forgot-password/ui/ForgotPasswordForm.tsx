'use client'

import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card } from '@/shared/ui/cards'
import { Typography } from '@/shared/ui/typography'
import { ControlledInput } from '@/shared/ui/controlled-input'
import { Button } from '@/shared/ui/button'
import { Recaptcha } from '@/shared/ui/recaptcha'
import { Link } from '@/shared/i18n/navigation'
import { routes } from '@/shared/routing/routes'
import { EmailSentModal } from '@/features/auth/email-sent-modal'
import { forgotPasswordSchema, type ForgotPasswordFormValues } from '../model/schema'
import s from './ForgotPasswordForm.module.scss'

export function ForgotPasswordForm() {
  const [isSent, setIsSent] = useState(false)
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)
  const [sentEmail, setSentEmail] = useState<string | null>(null)

  const methods = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
    mode: 'onChange',
  })
  const {
    handleSubmit,
    setError,
    formState: { isSubmitting, isValid },
  } = methods

  const canSubmit = isSent || (isValid && Boolean(recaptchaToken))

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    try {
      // TODO: заменить на реальный API-запрос через TanStack Query
      console.log('Forgot password data:', data)
      setIsSent(true)
      setSentEmail(data.email)
    } catch {
      setError('email', {
        message: "User with this email doesn't exist",
      })
    }
  }

  const closeSentModal = () => setSentEmail(null)

  return (
    <Card className={s.card}>
      <Typography variant='h1' className={s.title}>
        Forgot Password
      </Typography>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className={s.form} noValidate>
          <ControlledInput name='email' label='Email' type='email' placeholder='Epam@epam.com' />

          <Typography variant='regular_text_14' className={s.hint}>
            Enter your email address and we will send you further instructions
          </Typography>

          {isSent && (
            <Typography variant='regular_text_14' className={s.sentMessage}>
              The link has been sent by email.
              <br />
              If you don&apos;t receive an email send link again
            </Typography>
          )}

          <Button type='submit' disabled={isSubmitting || !canSubmit} className={s.submitButton}>
            {isSent ? 'Send Link Again' : 'Send Link'}
          </Button>

          <Button asChild variant='text' className={s.backLink}>
            <Link href={routes.auth.signIn()}>Back to Sign In</Link>
          </Button>

          {!isSent && (
            <div className={s.recaptcha}>
              <Recaptcha onChange={setRecaptchaToken} />
            </div>
          )}
        </form>
      </FormProvider>

      <EmailSentModal isOpen={sentEmail !== null} onClose={closeSentModal} email={sentEmail ?? ''} />
    </Card>
  )
}
