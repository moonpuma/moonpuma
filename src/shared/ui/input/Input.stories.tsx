import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
    title: 'Shared/Input',
    component: Input,
    tags: ['autodocs'],
    argTypes: {
        type: {
            control: 'select',
            options: ['text', 'password', 'email', 'number'],
        },
        error: {
            control: 'text',
        },
        showPasswordToggle: {
            control: 'boolean',
        },
        disabled: {
            control: 'boolean',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
    args: {
        label: 'Email',
        type: 'text',
        placeholder: 'Epam@epam.com',
    },
};

export const Password: Story = {
    args: {
        label: 'Пароль',
        type: 'password',
        placeholder: 'Введите пароль',
        showPasswordToggle: true,
    },
};

export const WithError: Story = {
    args: {
        label: 'Email',
        type: 'text',
        placeholder: 'Epam@epam.com',
        error: 'Error text',
    },
};

export const PasswordWithError: Story = {
    args: {
        label: 'Пароль',
        type: 'password',
        placeholder: 'Введите пароль',
        showPasswordToggle: true,
        error: 'Пароль слишком короткий',
    },
};

export const Disabled: Story = {
    args: {
        label: 'Email',
        type: 'text',
        placeholder: 'Epam@epam.com',
        disabled: true,
    },
};

export const AllVariants: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '400px' }}>
            <Input label="Email" type="text" placeholder="Epam@epam.com" />
            <Input label="Email с ошибкой" type="text" placeholder="Epam@epam.com" error="Error text" />
            <Input label="Пароль" type="password" placeholder="Введите пароль" showPasswordToggle />
            <Input
                label="Пароль с ошибкой"
                type="password"
                placeholder="Введите пароль"
                showPasswordToggle
                error="Пароль слишком короткий"
            />
            <Input label="Disabled" type="text" placeholder="Epam@epam.com" disabled />
        </div>
    ),
};
