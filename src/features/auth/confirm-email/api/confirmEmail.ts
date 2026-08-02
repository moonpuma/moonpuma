import { isAxiosError } from 'axios'
import { httpClient } from '@/shared/api'

export class ConfirmEmailError extends Error {
  constructor(public readonly status: number | null) {
    super('Unable to confirm email')
    this.name = 'ConfirmEmailError'
  }
}

export async function confirmEmail(code: string): Promise<void> {
  try {
    await httpClient.get('/auth/confirm', {
      params: { code },
    })
  } catch (error) {
    if (isAxiosError(error)) {
      throw new ConfirmEmailError(error.response?.status ?? null)
    }

    throw new ConfirmEmailError(null)
  }
}
