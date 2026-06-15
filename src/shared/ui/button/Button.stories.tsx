import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
    title: 'Components/Button',
    component: Button,
    tags: ['autodocs'],
    argTypes: {
        title: { control: 'text' },
        variant: { control: 'inline-radio', options: ['filled', 'secondary', 'outlined', 'text'] },
        disabled: { control: 'boolean' },
        onClick: { action: 'clicked' },
    },
}

export default meta
type Story = StoryObj<typeof Button>

export const Filled: Story = {
    args: {
        title: 'Filled',
        variant: 'filled',
    },
}

export const Outlined: Story = {
    args: {
        title: 'Outlined',
        variant: 'outlined',
    },
}

export const Secondary: Story = {
    args: {
        title: 'Secondary',
        variant: 'secondary',
    },
}

export const Text: Story = {
    args: {
        title: 'Text',
        variant: 'text',
    },
}

export const Disabled: Story = {
    args: {
        title: 'Disabled',
        variant: 'filled',
        disabled: true,
    },
}
