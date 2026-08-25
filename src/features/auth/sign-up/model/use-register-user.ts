'use client'

import { useMutation } from '@tanstack/react-query'
import { registerUser } from '../api/register-user'

export const useRegisterUser = () => useMutation({ mutationFn: registerUser })
