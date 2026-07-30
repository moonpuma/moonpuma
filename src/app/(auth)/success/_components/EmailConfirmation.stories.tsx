import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, fn, waitFor, within } from 'storybook/test'
import { QueryProvider } from '@/app/providers'
import { EmailConfirmation } from './EmailConfirmation'

const fetchMock = fn(() => Promise.resolve(new Response(null, { status: 200 })))

const meta = {
  title: 'Auth/EmailConfirmation',
  component: EmailConfirmation,
  decorators: [
    (Story) => (
      <QueryProvider>
        <Story />
      </QueryProvider>
    ),
  ],
  beforeEach: () => {
    const originalFetch = globalThis.fetch
    fetchMock.mockClear()
    globalThis.fetch = fetchMock

    return () => {
      globalThis.fetch = originalFetch
    }
  },
} satisfies Meta<typeof EmailConfirmation>

export default meta
type Story = StoryObj<typeof meta>

export const SuccessfulConfirmation: Story = {
  args: {
    code: '00000000-0000-4000-8000-000000000000',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await waitFor(() =>
      expect(fetchMock).toHaveBeenCalledWith(
        'https://moonpuma.site/api/v1/auth/confirm?code=00000000-0000-4000-8000-000000000000',
        {
          method: 'GET',
          credentials: 'include',
        },
      ),
    )

    expect(await canvas.findByText('Congratulations!')).toBeVisible()
    expect(canvas.getByText('Your email has been confirmed')).toBeVisible()
    expect(canvas.getByRole('link', { name: 'Sign In' })).toHaveAttribute('href', '/sign-in')
  },
}
