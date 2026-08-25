import { httpClient } from '@/shared/api'

export type SignInRequest = {
  email: string
  password: string
}

export const signIn = async (body: SignInRequest) => {
  await httpClient.post('/auth/login', body)
}
