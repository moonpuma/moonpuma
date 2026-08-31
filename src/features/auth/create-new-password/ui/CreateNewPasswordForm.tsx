'use client'

import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card } from '@/shared/ui/cards'
import { Typography } from '@/shared/ui/typography'
import { ControlledInput } from '@/shared/ui/controlled-input'
import { Button } from '@/shared/ui/button'
import { useRouter } from '@/shared/i18n/navigation'
import { routes } from '@/shared/routing/routes'
import { getErrorStatus, getErrorPayload, getConflictField } from '@/shared/api'
import { useChangePassword } from '../model/use-change-password'
import { createNewPasswordSchema, type CreateNewPasswordFormValues } from '../model/schema'
import s from './CreateNewPasswordForm.module.scss'

interface CreateNewPasswordFormProps {
  code?: string
}

export function CreateNewPasswordForm({ code }: CreateNewPasswordFormProps) {
  const router = useRouter()

  const methods = useForm<CreateNewPasswordFormValues>({
    resolver: zodResolver(createNewPasswordSchema),
    mode: 'onBlur',
    defaultValues: { password: '', passwordConfirmation: '' },
  })

  const {
    handleSubmit,
    setError,
    formState: { errors, isValid, isSubmitting },
  } = methods

  const changePasswordMutation = useChangePassword()

  // Без кода ссылка точно невалидна — незачем показывать форму, которую нельзя отправить.
  useEffect(() => {
    if (!code) {
      router.replace(routes.auth.resendLink())
    }
  }, [code, router])

  const onSubmit = async (values: CreateNewPasswordFormValues) => {
    if (!code) {
      return
    }

    try {
      await changePasswordMutation.mutateAsync({
        code,
        password: values.password,
        confirmPassword: values.passwordConfirmation,
      })
      router.replace(routes.auth.signIn())
    } catch (error) {
      if (getErrorStatus(error) === 400) {
        // 400 покрывает и невалидный/просроченный код, и непрошедшее валидацию тело
        // (docs/API/README.md) — формат error body не зафиксирован, поэтому как и для
        // 409 /auth/register (см. SignUpForm) ищем ключевое слово по тексту payload.
        const conflictField = getConflictField(getErrorPayload(error), { password: ['password'] })

        if (conflictField === 'password') {
          setError(
            'password',
            { message: 'Something is wrong with this password. Please try another one' },
            { shouldFocus: true },
          )
          return
        }

        router.replace(routes.auth.resendLink())
        return
      }

      setError('root.server', { message: 'Something went wrong. Please try again' })
    }
  }

  if (!code) {
    return null
  }

  return (
    <Card className={s.card}>
      <Typography variant='h1' className={s.title}>
        Create New Password
      </Typography>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className={s.form} noValidate>
          <ControlledInput
            name='password'
            label='New password'
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

          <Typography variant='regular_text_14' className={s.hint}>
            Your password must be between 6 and 20 characters
          </Typography>

          <Button
            type='submit'
            disabled={!isValid || isSubmitting || changePasswordMutation.isPending}
            className={s.submitButton}
          >
            {isSubmitting || changePasswordMutation.isPending ? 'Creating...' : 'Create new password'}
          </Button>

          {errors.root?.server && (
            <span className={s.formError} role='alert'>
              {errors.root.server.message}
            </span>
          )}
        </form>
      </FormProvider>
    </Card>
  )
}
