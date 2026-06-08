import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Alert } from './Alert';

const meta = {
    component: Alert,
    argTypes: {
        isError: { control: 'boolean' },
        message: { control: 'text' },
    },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
    args: {
        isError: false,
        message: 'Всё получилось!',
    },
};

export const ErrorAlert: Story = {
    args: {
        isError: true,
        message: 'Ошибка соединения',
    },
};