import { environmentManager, QueryClient } from '@tanstack/react-query'

const STALE_TIME = 60 * 1000

export const makeQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: STALE_TIME,
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
