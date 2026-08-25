import { httpClient } from '@/shared/api'

export interface RegisterUserRequest {
  username: string
  email: string
  password: string
  passwordConfirmation: string
}

export async function registerUser(data: RegisterUserRequest): Promise<void> {
  await httpClient.post('/auth/register', data)
}
