import { httpClient } from '@/shared/api'

export const recoverPassword = async (email: string) => {
  await httpClient.post('/auth/recover-password', { email })
}
