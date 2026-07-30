'use client'

import { forwardRef } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import clsx from 'clsx'
import s from './Recaptcha.module.scss'

const GOOGLE_TEST_SITE_KEY = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'

export interface RecaptchaProps {
  /** Site key from the Google reCAPTCHA admin console. Defaults to NEXT_PUBLIC_RECAPTCHA_SITE_KEY. */
  siteKey?: string
  onChange?: (token: string | null) => void
  className?: string
}

export const Recaptcha = forwardRef<ReCAPTCHA, RecaptchaProps>(
  ({ siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || GOOGLE_TEST_SITE_KEY, onChange, className }, ref) => {
    if (!siteKey) {
      throw new Error('Recaptcha: siteKey is not set (NEXT_PUBLIC_RECAPTCHA_SITE_KEY environment variable)')
    }

    return (
      <div className={clsx(s.wrapper, className)}>
        <ReCAPTCHA ref={ref} sitekey={siteKey} theme='dark' onChange={onChange} />
      </div>
    )
  },
)

Recaptcha.displayName = 'Recaptcha'
