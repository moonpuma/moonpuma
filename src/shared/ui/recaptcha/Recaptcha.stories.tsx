import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { useState } from 'react'
import { Recaptcha } from './Recaptcha'

// Google's public test site key (always passes verification, no challenge
// shown): https://developers.google.com/recaptcha/docs/faq
// Demo purposes only — the app itself reads the key from
// NEXT_PUBLIC_RECAPTCHA_SITE_KEY.
const GOOGLE_TEST_SITE_KEY = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'

const meta: Meta<typeof Recaptcha> = {
  title: 'Components/Recaptcha',
  component: Recaptcha,
  parameters: {
    layout: 'centered',
    // The widget loads a script from google.com and renders in an iframe —
    // this story needs internet access and isn't a pure visual snapshot.
  },
  tags: ['autodocs'],
  args: {
    siteKey: GOOGLE_TEST_SITE_KEY,
  },
}

export default meta
type Story = StoryObj<typeof Recaptcha>

export const Default: Story = {}

const RecaptchaWithState = () => {
  const [token, setToken] = useState<string | null>(null)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
      <Recaptcha siteKey={GOOGLE_TEST_SITE_KEY} onChange={setToken} />
      <span style={{ color: 'var(--text-secondary)' }}>Token: {token ?? '—'}</span>
    </div>
  )
}

export const Interactive: Story = {
  render: () => <RecaptchaWithState />,
}
