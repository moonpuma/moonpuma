'use client'

import { useMutation } from '@tanstack/react-query'
import { loginByEmail } from './login-by-email'

export const useLoginByEmail = () =>
  useMutation({
    mutationFn: loginByEmail,
  })
