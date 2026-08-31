import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, fn, userEvent, waitFor, within } from 'storybook/test'
import { QueryProvider } from '@/app/providers'
import { httpClient } from '@/shared/api'
import { SignUpForm } from './SignUpForm'

const meta = {
  title: 'Auth/SignUpForm',
  component: SignUpForm,
  decorators: [
    (Story) => (
      <QueryProvider>
        <Story />
      </QueryProvider>
    ),
  ],
} satisfies Meta<typeof SignUpForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const SuccessfulRegistration: Story = {
  play: async ({ canvasElement }) => {
    const originalPost = httpClient.post
    const postMock = fn(() => Promise.resolve({ data: undefined, status: 201 }))
    httpClient.post = postMock as typeof httpClient.post

    try {
      const canvas = within(canvasElement)

      await userEvent.type(canvas.getByLabelText('Username'), 'moon_user')
      await userEvent.type(canvas.getByLabelText('Email'), 'user@example.com')
      await userEvent.type(canvas.getByLabelText('Password'), 'Password1!')
      await userEvent.type(canvas.getByLabelText('Password confirmation'), 'Password1!')
      await userEvent.click(canvas.getByRole('checkbox'))
      await userEvent.tab()

      const submitButton = await canvas.findByRole('button', { name: 'Sign Up' })
      await expect(submitButton).toBeEnabled()
      await userEvent.click(submitButton)

      await waitFor(() =>
        expect(postMock).toHaveBeenCalledWith(
          '/auth/register',
          expect.objectContaining({
            username: 'moon_user',
            email: 'user@example.com',
            password: 'Password1!',
            passwordConfirmation: 'Password1!',
          }),
        ),
      )

      const page = within(canvasElement.ownerDocument.body)
      expect(await page.findByText('We have sent a link to confirm your email to user@example.com')).toBeVisible()
      await userEvent.click(page.getByRole('button', { name: 'OK' }))

      await waitFor(() => expect(canvas.getByLabelText('Email')).toHaveValue(''))
    } finally {
      httpClient.post = originalPost
    }
  },
}
