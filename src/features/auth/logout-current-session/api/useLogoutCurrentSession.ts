'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { logoutCurrentSession } from './logoutCurrentSession'

export const useLogoutCurrentSession = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: logoutCurrentSession,
        onSuccess: () => {
            queryClient.clear()
        },
    })
}