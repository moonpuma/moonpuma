'use client'

import { useMutation } from '@tanstack/react-query'
import { showErrorToast } from '@/shared/ui/toast'
import { getGoogleAuthUrl } from '../api/get-google-auth-url'

export const useGetGoogleAuthUrl = () =>
  useMutation({
    mutationFn: getGoogleAuthUrl,
    onSuccess: (url) => {
      window.location.assign(url)
    },
    onError: () => {
      showErrorToast('Unable to start Google sign-in. Please try again')
    },
  })
