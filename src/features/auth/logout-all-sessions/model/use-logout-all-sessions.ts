'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { logoutAllSessions } from '../api/logout-all-sessions'

export const useLogoutAllSessions = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: logoutAllSessions,
    onSuccess: () => {
      queryClient.clear()
    },
  })
}
