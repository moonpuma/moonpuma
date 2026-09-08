'use client'

import { useMutation } from '@tanstack/react-query'
import { recoverPassword } from '../api/recover-password'

export const useRecoverPassword = () => useMutation({ mutationFn: recoverPassword })
