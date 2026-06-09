import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Card } from './Cards'

const meta: Meta<typeof Card> = {
  title: 'Shared UI/Card',
  component: Card,
  tags: ['autodocs'],
  args: {
    children: 'Card content',
    variant: 'default',
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS class for the root element',
    },
    children: {
      control: 'text',
      description: 'Card content',
    },
    variant: {
      control: 'select',
      options: ['default', 'elevated', 'outlined'],
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: '420px',
          maxWidth: '100%',
          padding: '24px',
          background: 'var(--bg-base)',
        }}
      >
        <Story />
      </div>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof Card>

export const Default: Story = {
  args: {
    children: 'Default card content',
  },
}

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    children: 'Elevated card content',
  },
}

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: 'Outlined card content',
  },
}

export const WithContent: Story = {
  render: (args) => (
    <Card {...args}>
      <h3 style={{ marginBottom: '8px', fontSize: '18px', lineHeight: 1.3 }}>Profile card</h3>
      <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.5 }}>
        A universal wrapper for grouped UI content.
      </p>
    </Card>
  ),
}
