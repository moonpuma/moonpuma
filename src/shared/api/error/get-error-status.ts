import { isAxiosError } from 'axios'

export const getErrorStatus = (error: unknown): number | null =>
  isAxiosError(error) ? (error.response?.status ?? null) : null

export const getErrorPayload = (error: unknown): unknown =>
  isAxiosError(error) ? (error.response?.data ?? null) : null
