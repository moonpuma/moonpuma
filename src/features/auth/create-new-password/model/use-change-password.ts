'use client'

import { useMutation } from '@tanstack/react-query'
import { changePassword } from '../api/change-password'

export const useChangePassword = () => useMutation({ mutationFn: changePassword })
