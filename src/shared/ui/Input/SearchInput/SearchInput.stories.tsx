import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SearchInput } from './SearchInput';

const meta: Meta<typeof SearchInput> = {
    title: 'Components/SearchInput',
    component: SearchInput,
    tags: ['autodocs'],
    argTypes: {
        placeholder: {
            control: 'text',
        },
        error: {
            control: 'text',
        },
    },
};

export default meta;
type Story = StoryObj<typeof SearchInput>;

export const Default: Story = {
    args: {
        placeholder: 'Поиск...',
    },
};

export const WithError: Story = {
    args: {
        placeholder: 'Поиск...',
        error: 'Введите поисковый запрос',
    },
};

export const CustomPlaceholder: Story = {
    args: {
        placeholder: 'Найти товар или категорию',
    },
};