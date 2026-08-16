import { httpClient } from '@/shared/api'

export const googleLogin = async (code: string) => {
  await httpClient.post('/auth/google/login', null, { params: { code } })
}
