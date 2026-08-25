import type { Metadata } from 'next'
import { GoogleCallback } from './_components/GoogleCallback'

export const metadata: Metadata = {
  title: 'Signing in with Google',
}

interface GoogleCallbackPageProps {
  searchParams: Promise<{ code?: string | string[]; error?: string | string[] }>
}

export default async function GoogleCallbackPage({ searchParams }: GoogleCallbackPageProps) {
  const { code, error } = await searchParams

  return (
    <GoogleCallback
      code={typeof code === 'string' ? code : undefined}
      error={typeof error === 'string' ? error : undefined}
    />
  )
}
