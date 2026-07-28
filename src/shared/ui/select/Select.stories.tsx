import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { useState } from 'react';
import { Select } from './Select';
import RuFlag from '@/shared/ui/icon/icons/locale/flag-russia.svg';
import UkFlag from '@/shared/ui/icon/icons/locale/flag-united-kingdom.svg';

const meta: Meta<typeof Select> = {
    title: 'Components/Select',
    component: Select,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        placeholder: 'Select-box',
        options: [
            { value: 'option-1', label: 'Select-box первый' },
            { value: 'option-2', label: 'Select-box второй' },
            { value: 'option-3', label: 'Select-box третий' },
        ],
    },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
    args: {
        label: 'Select-box',
    },
};

export const SelectedValue: Story = {
    args: {
        label: 'Select-box',
        value: 'option-1',
    },
};

export const Disabled: Story = {
    args: {
        label: 'Select-box',
        disabled: true,
        value: 'option-1',
    },
};

export const LanguageSelect: Story = {
    args: {
        label: 'Language',
        value: 'ru',
        options: [
            { value: 'ru', label: 'Russian', icon: RuFlag },
            { value: 'en', label: 'English', icon: UkFlag },
        ],
    },
};

const SelectWithState = () => {
    const [value, setValue] = useState('');

    const options = [
        { value: 'ru', label: 'Russian', icon: RuFlag },
        { value: 'en', label: 'English', icon: UkFlag },
    ];

    return (
        <Select
            label="Интерактивный выбор языка"
            options={options}
            value={value}
            onChange={setValue}
        />
    );
};
export const Interactive: Story = {
    render: () => <SelectWithState />,
};
