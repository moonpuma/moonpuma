import type { Metadata } from 'next'
import { EmailConfirmation } from './EmailConfirmation'

export const metadata: Metadata = {
  title: 'Email confirmation',
}

interface ConfirmEmailPageProps {
  searchParams: Promise<{ code?: string | string[] }>
}

export default async function ConfirmEmailPage({ searchParams }: ConfirmEmailPageProps) {
  const { code } = await searchParams

  return <EmailConfirmation code={typeof code === 'string' ? code : undefined} />
}
