import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Textarea } from './Textarea'

const meta: Meta<typeof Textarea> = {
    title: 'Components/Textarea',
    component: Textarea,
    tags: ['autodocs'],
    argTypes: {
        label: { control: 'text' },
        error: { control: 'text' },
        disabled: { control: 'boolean' },
    },
}

export default meta
type Story = StoryObj<typeof Textarea>

export const Default: Story = {
    args: {
        label: 'Комментарий',
        placeholder: 'Введите текст',
    },
}

export const WithError: Story = {
    args: {
        label: 'Комментарий',
        placeholder: 'Введите текст',
        error: 'Error text',
    },
}

export const Disabled: Story = {
    args: {
        label: 'Комментарий',
        placeholder: 'Введите текст',
        disabled: true,
    },
}

export const AllVariants: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '400px' }}>
            <Textarea label="Комментарий" placeholder="Введите текст" />
            <Textarea label="Комментарий с ошибкой" placeholder="Введите текст" error="Error text" />
            <Textarea label="Disabled" placeholder="Введите текст" disabled />
        </div>
    ),
}
