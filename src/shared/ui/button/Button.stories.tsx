import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Button>

export const Filled: Story = {
  args: {
    children: 'Filled',
    variant: 'filled',
  },
}

export const Outlined: Story = {
  args: {
    children: 'Outlined',
    variant: 'outlined',
  },
}

export const Secondary: Story = {
  args: {
    children: 'Secondary',
    variant: 'secondary',
  },
}

export const Text: Story = {
  args: {
    children: 'Text',
    variant: 'text',
  },
}

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    variant: 'filled',
    disabled: true,
  },
}
