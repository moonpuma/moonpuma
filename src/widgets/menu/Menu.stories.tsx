import { Menu } from './Menu'
import { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta: Meta<typeof Menu> = {
  title: 'Widgets/Menu',
  component: Menu,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    className: { control: 'text' },
    pathname: {
      control: 'select',
      options: ['/', '/generate', '/messenger', '/search', '/profile', '/unknown'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Menu>

// Варианты с разными активными пунктами

export const ActiveHome: Story = {
  args: {
    pathname: '/',
  },
}

export const ActiveGenerate: Story = {
  args: {
    pathname: '/generate',
  },
}

export const ActiveMessenger: Story = {
  args: {
    pathname: '/messenger',
  },
}

export const ActiveSearch: Story = {
  args: {
    pathname: '/search',
  },
}

export const ActiveProfile: Story = {
  args: {
    pathname: '/profile',
  },
}

// Если ни один не совпадает — все иконки будут серыми (или цвет по умолчанию)
export const NoActive: Story = {
  args: {
    pathname: '/unknown',
  },
}
