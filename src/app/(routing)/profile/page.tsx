import { redirect } from 'next/navigation';
import { MOCK_SESSION } from '@/shared/session';

export default function ProfileRedirectPage() {
  redirect(`/profile/${MOCK_SESSION.userId}`);
}
