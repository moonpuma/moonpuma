import type { Metadata } from 'next'
import { EmailConfirmation } from './_components/EmailConfirmation'

export const metadata: Metadata = {
  title: 'Email confirmation',
}

interface SuccessPageProps {
  searchParams: Promise<{ code?: string | string[] }>
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const { code } = await searchParams

  return <EmailConfirmation code={typeof code === 'string' ? code : undefined} />
}
