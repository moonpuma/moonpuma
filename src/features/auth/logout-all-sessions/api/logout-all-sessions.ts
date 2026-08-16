import { httpClient } from '@/shared/api'

export const logoutAllSessions = async () => {
  await httpClient.post('/auth/logout-all')
}
