import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
    title: 'Components/Input',
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
    },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
    args: {
        title: 'Email',
        type: 'text',
        placeholder: 'Введите email',
    },
};

export const Password: Story = {
    args: {
        title: 'Пароль',
        type: 'password',
        placeholder: 'Введите пароль',
        showPasswordToggle: true,
    },
};

export const WithError: Story = {
    args: {
        title: 'Email',
        type: 'text',
        placeholder: 'Введите email',
        error: 'Некорректный email',
    },
};

export const PasswordWithError: Story = {
    args: {
        title: 'Пароль',
        type: 'password',
        placeholder: 'Введите пароль',
        showPasswordToggle: true,
        error: 'Пароль слишком короткий',
    },
};

export const PasswordWithoutToggle: Story = {
    args: {
        title: 'Пароль',
        type: 'password',
        placeholder: 'Введите пароль',
        showPasswordToggle: false,
    },
};

export const AllVariants: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '400px' }}>
            <Input
                title="Email"
                type="text"
                placeholder="Введите email"
            />
            <Input
                title="Email с ошибкой"
                type="text"
                placeholder="Введите email"
                error="Некорректный email"
            />
            <Input
                title="Пароль"
                type="password"
                placeholder="Введите пароль"
                showPasswordToggle
            />
            <Input
                title="Пароль с ошибкой"
                type="password"
                placeholder="Введите пароль"
                showPasswordToggle
                error="Пароль слишком короткий"
            />
        </div>
    ),
};