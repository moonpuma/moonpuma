import { redirect } from 'next/navigation'
import { SettingsPage, VALID_PARTS } from '@/views/settings'
import type { Part } from '@/views/settings'

export default async function Page({ searchParams }: { searchParams: Promise<{ part?: string }> }) {
  const { part } = await searchParams

  if (!part || !VALID_PARTS.includes(part as Part)) {
    redirect('/settings?part=info')
  }

  return <SettingsPage part={part as Part} />
}
