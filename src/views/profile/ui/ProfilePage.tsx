import { PlusSquareOutlineIcon } from '@/shared/ui/icons'
import styles from './ProfilePage.module.css'

type Props = {
  id: string
  isOwnProfile: boolean
  postId?: string
  action?: 'create'
}

export function ProfilePage({ id, isOwnProfile, postId, action }: Props) {
  return (
    <div className={styles.page}>
      <PlusSquareOutlineIcon />
      <h1>Profile {id}</h1>
      {isOwnProfile && <p>Own profile: post management controls</p>}
      {postId && <p>Post modal: {postId}</p>}
      {action === 'create' && <p>Create post modal</p>}
    </div>
  )
}
