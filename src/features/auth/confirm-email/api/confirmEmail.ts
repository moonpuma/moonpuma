import { httpClient } from '@/shared/api'

export async function confirmEmail(code: string): Promise<void> {
  await httpClient.get('/auth/confirm', {
    params: { code },
  })
}
