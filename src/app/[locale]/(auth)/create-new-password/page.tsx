import type { Metadata } from 'next'
import { CreateNewPasswordForm } from '@/features/auth/create-new-password'
import s from './page.module.scss'

export const metadata: Metadata = {
  title: 'Create New Password',
}

interface CreateNewPasswordPageProps {
  searchParams: Promise<{ code?: string | string[] }>
}

export default async function CreateNewPasswordPage({ searchParams }: CreateNewPasswordPageProps) {
  const { code } = await searchParams

  return (
    <div className={s.page}>
      <CreateNewPasswordForm code={typeof code === 'string' ? code : undefined} />
    </div>
  )
}
