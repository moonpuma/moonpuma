import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, fn, waitFor, within } from 'storybook/test'
import { QueryProvider } from '@/app/providers'
import { httpClient } from '@/shared/api'
import { EmailConfirmation } from './EmailConfirmation'

const getMock = fn(() => Promise.resolve({ data: undefined, status: 200 }))

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
    const originalGet = httpClient.get
    getMock.mockClear()
    httpClient.get = getMock as typeof httpClient.get

    return () => {
      httpClient.get = originalGet
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
      expect(getMock).toHaveBeenCalledWith('/auth/confirm', {
        params: { code: '00000000-0000-4000-8000-000000000000' },
      }),
    )

    expect(await canvas.findByText('Congratulations!')).toBeVisible()
    expect(canvas.getByText('Your email has been confirmed')).toBeVisible()
    expect(canvas.getByRole('link', { name: 'Sign In' })).toHaveAttribute('href', expect.stringContaining('/sign-in'))
  },
}
