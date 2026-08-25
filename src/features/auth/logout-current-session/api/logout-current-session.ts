import { httpClient } from '@/shared/api'

export const logoutCurrentSession = async () => {
  await httpClient.post('/auth/logout')
}
