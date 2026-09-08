import { httpClient } from '@/shared/api'

export const getGoogleAuthUrl = async () => {
  const { data } = await httpClient.get<{ url: string }>('/auth/google/url')
  return data.url
}
