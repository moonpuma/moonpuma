export class ConfirmEmailError extends Error {
  constructor(public readonly status: number | null) {
    super('Unable to confirm email')
    this.name = 'ConfirmEmailError'
  }
}

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://moonpuma.site/api/v1'

export async function confirmEmail(code: string): Promise<void> {
  let response: Response

  try {
    const query = new URLSearchParams({ code })
    response = await fetch(`${apiBaseUrl}/auth/confirm?${query}`, {
      method: 'GET',
      credentials: 'include',
    })
  } catch {
    throw new ConfirmEmailError(null)
  }

  if (response.status === 200) {
    return
  }

  throw new ConfirmEmailError(response.status)
}
