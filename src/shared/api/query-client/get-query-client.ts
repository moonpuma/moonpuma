import { environmentManager, QueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'

const STALE_TIME = 60 * 1000
const MAX_RETRY_COUNT = 3
// 401/403 не лечатся повтором без refresh (об этом заботится http-client), 404/429 — тем более.
const NO_RETRY_STATUS_CODES = new Set([401, 403, 404, 429])

const shouldRetryQuery = (failureCount: number, error: unknown) => {
  if (isAxiosError(error) && error.response && NO_RETRY_STATUS_CODES.has(error.response.status)) {
    return false
  }

  return failureCount < MAX_RETRY_COUNT
}

export const makeQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: STALE_TIME,
        retry: shouldRetryQuery,
      },
      mutations: {
        // Мутации (login/register/change-password…) не ретраятся молча — см. docs/API/README.md про 429.
        retry: false,
      },
    },
  })

let browserQueryClient: QueryClient | undefined

export const getQueryClient = () => {
  if (environmentManager.isServer()) {
    return makeQueryClient()
  }

  browserQueryClient ??= makeQueryClient()

  return browserQueryClient
}
