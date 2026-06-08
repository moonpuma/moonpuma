import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Header } from './Header'

const meta: Meta<typeof Header> = {
  title: 'Widgets/Header',
  component: Header,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Header>

export const LoggedOut: Story = {
  args: {
    isLoggedIn: false,
  },
}

export const LoggedIn: Story = {
  args: {
    isLoggedIn: true,
  },
}
