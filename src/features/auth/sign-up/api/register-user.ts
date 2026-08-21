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

/**
 * Определяет, какое поле конфликтует в теле 409-ответа /auth/register.
 * Формат error body бэкенд не гарантирует (docs/API/README.md), поэтому вместо
 * опоры на конкретную структуру просто ищем "email"/"username" по всем строкам payload.
 */
export function getConflictField(payload: unknown): 'email' | 'username' | null {
  const text = collectPayloadStrings(payload).join(' ').toLowerCase()

  if (text.includes('email')) {
    return 'email'
  }

  if (text.includes('username') || text.includes('user name')) {
    return 'username'
  }

  return null
}

function collectPayloadStrings(payload: unknown): string[] {
  if (typeof payload === 'string') {
    return [payload]
  }

  if (Array.isArray(payload)) {
    return payload.flatMap(collectPayloadStrings)
  }

  if (payload && typeof payload === 'object') {
    return Object.values(payload).flatMap(collectPayloadStrings)
  }

  return []
}
