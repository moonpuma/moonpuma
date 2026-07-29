'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Icon } from '@/shared/ui/icon'
import { Link, useRouter } from '@/shared/i18n/navigation'
import { Input } from '@/shared/ui/input'
import { Checkbox } from '@/shared/ui/checkbox'
import { Button } from '@/shared/ui/button'
import { Typography } from '@/shared/ui/typography'
import { Card } from '@/shared/ui/cards'
import GoogleIcon from '@/shared/ui/icon/icons/social/google.svg'
import GithubIcon from '@/shared/ui/icon/icons/social/github.svg'
import { signUpSchema, type SignUpFormValues } from './signUpSchema'
import s from './SignUpForm.module.scss'

export function SignUpForm() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SignUpFormValues>({
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

  const onSubmit = async (data: SignUpFormValues) => {
    // TODO: заменить на реальный API-запрос через TanStack Query (UC-1, docs/AUTH.md)
    console.log('Sign up data:', data)
    router.push('/sign-in')
  }

  const handleGoogleSignUp = () => {
    // TODO: подключить OAuth через Google (UC-5)
    console.log('Google sign up')
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
        <button type='button' className={s.oauthBtn} onClick={handleGoogleSignUp} aria-label='Sign up with Google'>
          <Icon icon={GoogleIcon} size={36} />
        </button>
        <button type='button' className={s.oauthBtn} onClick={handleGithubSignUp} aria-label='Sign up with GitHub'>
          <Icon icon={GithubIcon} size={36} color='var(--color-light-100)' />
        </button>
      </div>

      {/* Форма */}
      <form onSubmit={handleSubmit(onSubmit)} className={s.form} noValidate>
        <Input label='Username' placeholder='Epam11' error={errors.username?.message} {...register('username')} />

        <Input
          label='Email'
          type='email'
          placeholder='Epam@epam.com'
          error={errors.email?.message}
          {...register('email')}
        />

        <Input
          label='Password'
          type='password'
          showPasswordToggle
          placeholder='******************'
          error={errors.password?.message}
          {...register('password')}
        />

        <Input
          label='Password confirmation'
          type='password'
          showPasswordToggle
          placeholder='******************'
          error={errors.passwordConfirmation?.message}
          {...register('passwordConfirmation')}
        />

        <div className={s.agreement}>
          <div className={s.agreementRow}>
            <Checkbox {...register('agree')} />
            <span className={s.agreementText}>
              I agree to the{' '}
              <Link href='/terms-of-service' className={s.link}>
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href='/privacy-policy' className={s.link}>
                Privacy Policy
              </Link>
            </span>
          </div>
          {errors.agree && <span className={s.errorText}>{errors.agree.message}</span>}
        </div>

        <Button type='submit' disabled={!isValid || isSubmitting} className={s.submitButton}>
          Sign Up
        </Button>
      </form>

      {/* Ссылка на вход */}
      <div className={s.footer}>
        <Typography variant='regular_text_16'>Do you have an account?</Typography>
        <Typography variant='regular_link' href='/sign-in'>
          Sign In
        </Typography>
      </div>
    </Card>
  )
}
