import { BackLink } from '@/shared/ui/back-link'

// Заглушка. Публичная страница политики конфиденциальности.
export default function PrivacyPolicyPage() {
  return (
    <>
      <BackLink href='/sign-up' title='Back to Sign Up' />
      <h1>Политика конфиденциальности (Privacy Policy)</h1>
    </>
  )
}
