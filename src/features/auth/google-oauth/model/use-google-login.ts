'use client'

import { useMutation } from '@tanstack/react-query'
import { googleLogin } from '../api/google-login'

export const useGoogleLogin = () => useMutation({ mutationFn: googleLogin })
