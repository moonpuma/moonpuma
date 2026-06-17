import { BackLink } from '@/shared/ui/back-link'

// Заглушка. Публичная страница условий использования.
export default function TermsOfServicePage() {
  return (
    <>
      <BackLink href='/sign-up' title='Back to Sign Up' />
      <h1>Условия использования (Terms of Service)</h1>
    </>
  )
}
