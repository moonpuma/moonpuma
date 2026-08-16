import type { Metadata } from 'next'
import { GoogleCallback } from './_components/GoogleCallback'

export const metadata: Metadata = {
  title: 'Signing in with Google',
}

interface GoogleCallbackPageProps {
  searchParams: Promise<{ code?: string | string[] }>
}

export default async function GoogleCallbackPage({ searchParams }: GoogleCallbackPageProps) {
  const { code } = await searchParams

  return <GoogleCallback code={typeof code === 'string' ? code : undefined} />
}
