import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
    title: 'Shared/Alert',
    component: Alert,
    tags: ['autodocs'],
    argTypes: {
        isError: { control: 'boolean' },
        message: { control: 'text' },
    },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Success: Story = {
    args: {
        isError: false,
        message: 'Всё получилось!',
        onClose: () => {},
    },
};

export const ErrorAlert: Story = {
    args: {
        isError: true,
        message: 'Ошибка соединения',
        onClose: () => {},
    },
};
