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

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://moonpuma.site/api/v1'

async function readResponsePayload(response: Response): Promise<unknown> {
  const contentType = response.headers.get('content-type')

  if (contentType?.includes('application/json')) {
    return response.json().catch(() => null)
  }

  return response.text().catch(() => null)
}

export async function registerUser(data: RegisterUserRequest): Promise<void> {
  let response: Response

  try {
    response = await fetch(`${apiBaseUrl}/auth/register`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  } catch {
    throw new RegisterUserError(null)
  }

  if (response.status === 201) {
    return
  }

  throw new RegisterUserError(response.status, await readResponsePayload(response))
}
