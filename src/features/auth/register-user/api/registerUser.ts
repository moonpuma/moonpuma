import { isAxiosError } from 'axios'
import { httpClient } from '@/shared/api'

export interface RegisterUserRequest {
  username: string
  email: string
  password: string
  passwordConfirmation: string
}

export class RegisterUserError extends Error {
  constructor(
    public readonly status: number | null,
    public readonly payload: unknown = null,
  ) {
    super('Unable to register user')
    this.name = 'RegisterUserError'
  }
}

export async function registerUser(data: RegisterUserRequest): Promise<void> {
  try {
    await httpClient.post('/auth/register', data)
  } catch (error) {
    if (isAxiosError(error)) {
      throw new RegisterUserError(error.response?.status ?? null, error.response?.data ?? null)
    }

    throw new RegisterUserError(null)
  }
}
