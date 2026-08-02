import { httpClient } from '@/shared/api'

export type LoginByEmailRequest = {
  email: string
  password: string
}

export const loginByEmail = async (body: LoginByEmailRequest) => {
  await httpClient.post('/auth/login', body)
}
