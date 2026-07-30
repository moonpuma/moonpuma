export type LoginByEmailRequest = {
    email: string
    password: string
    recaptchaValue: string
}

const API_BASE_URL = 'https://moonpuma.site/api/v1'

export class LoginByEmailError extends Error {
    constructor(
        message: string,
        public readonly status: number,
    ) {
        super(message)
        this.name = 'LoginByEmailError'
    }
}

export const loginByEmail = async (body: LoginByEmailRequest) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    })

    if (response.ok) {
        return
    }

    let serverMessage = 'The email or password are incorrect. Try again please'
    try {
        const data = await response.json()
        if (data?.message) {
            serverMessage = Array.isArray(data.message) ? data.message.join(', ') : data.message
        }
    } catch {
        // тело ответа не JSON — оставляем дефолтное сообщение
    }

    throw new LoginByEmailError(serverMessage, response.status)
}