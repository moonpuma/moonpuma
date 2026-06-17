import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { BackLink } from './BackLink'

const meta: Meta<typeof BackLink> = {
  title: 'Components/BackLink',
  component: BackLink,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    href: '/sign-up',
    title: 'Back to Sign Up',
  },
  argTypes: {
    href: { control: 'text' },
    title: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof BackLink>

export const Default: Story = {}

export const LongTitle: Story = {
  args: {
    title: 'Назад к восстановлению пароля',
  },
}
