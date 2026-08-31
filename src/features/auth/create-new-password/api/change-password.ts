import { httpClient } from '@/shared/api'

interface ChangePasswordPayload {
  code: string
  password: string
  confirmPassword: string
}

// docs/API/README.md, POST /auth/change-password (AUTH.md, UC-3, шаги 9-12).
export const changePassword = async (payload: ChangePasswordPayload): Promise<void> => {
  await httpClient.post('/auth/change-password', payload)
}
