import axios, { isAxiosError, type InternalAxiosRequestConfig } from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://moonpuma.site/api/v1'
const REFRESH_TOKEN_PATH = '/auth/refresh-token'

export const httpClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

type RetryableRequestConfig = InternalAxiosRequestConfig & { _isRetry?: boolean }

let onSessionExpired: (() => void) | undefined
let refreshRequest: Promise<unknown> | null = null

/**
 * Регистрирует колбэк на потерю сессии (невалидный refresh_token).
 * Вызывать из app-слоя (например, из auth-провайдера при монтировании), а не отсюда:
 * shared/api не должен знать про очистку auth-состояния или редирект на /sign-in.
 */
export const setOnSessionExpired = (callback: (() => void) | undefined) => {
  onSessionExpired = callback
}

const refreshAccessToken = () => {
  refreshRequest ??= httpClient.post(REFRESH_TOKEN_PATH).finally(() => {
    refreshRequest = null
  })

  return refreshRequest
}

httpClient.interceptors.response.use(
  (response) => response,
  async (error: unknown) => {
    if (!isAxiosError(error) || error.response?.status !== 401) {
      return Promise.reject(error)
    }

    const originalRequest = error.config as RetryableRequestConfig | undefined
    const isRefreshRequest = originalRequest?.url === REFRESH_TOKEN_PATH

    // 401 на самом refresh-token: refresh_token просрочен/невалиден, сессия окончена.
    if (isRefreshRequest) {
      onSessionExpired?.()
      return Promise.reject(error)
    }

    // Уже пытались обновить токен для этого запроса — второй раз не пробуем.
    if (!originalRequest || originalRequest._isRetry) {
      return Promise.reject(error)
    }

    originalRequest._isRetry = true

    try {
      // Общий refreshRequest дедуплицирует параллельные 401 (несколько queries сразу)
      // в один вызов /auth/refresh-token вместо нескольких одновременных.
      await refreshAccessToken()

      return httpClient(originalRequest)
    } catch (refreshError) {
      onSessionExpired?.()
      return Promise.reject(refreshError)
    }
  },
)
