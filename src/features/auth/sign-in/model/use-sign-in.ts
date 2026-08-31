'use client'

import { useMutation } from '@tanstack/react-query'
import { signIn } from '../api/sign-in'

export const useSignIn = () =>
  useMutation({
    mutationFn: signIn,
  })
