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
        disabled: {
            control: 'boolean',
        },
    },
};

export default meta;
type Story = StoryObj<typeof SearchInput>;

export const Default: Story = {
    args: {
        placeholder: 'Input search',
    },
};

export const WithError: Story = {
    args: {
        placeholder: 'Input search',
        error: 'Error text',
    },
};

export const Disabled: Story = {
    args: {
        placeholder: 'Input search',
        disabled: true,
    },
};
