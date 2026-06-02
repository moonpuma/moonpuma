import { redirect } from 'next/navigation'
import { ProfilePage } from '@/views/profile'
import { MOCK_SESSION } from '@/shared/session'

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ postId?: string; action?: string }>
}) {
  const { id } = await params
  const { postId, action } = await searchParams

  if (postId && action) {
    redirect(`/profile/${id}?postId=${postId}`)
  }

  const isOwnProfile = id === MOCK_SESSION.userId

  return (
    <ProfilePage
      id={id}
      isOwnProfile={isOwnProfile}
      postId={postId}
      action={action === 'create' ? 'create' : undefined}
    />
  )
}
