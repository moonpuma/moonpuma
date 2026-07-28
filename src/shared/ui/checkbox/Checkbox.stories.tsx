import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Checkbox } from './Checkbox';
import type { CSSProperties } from 'react';

interface CustomCSSProperties extends CSSProperties {
    '--bg-primary'?: string;
    '--text-primary'?: string;
    '--checkbox-border-default'?: string;
    '--checkbox-ripple'?: string;
    '--checkbox-focus-outline'?: string;
}

const meta: Meta<typeof Checkbox> = {
    title: 'Components/Checkbox',
    component: Checkbox,
    tags: ['autodocs'],
    argTypes: {
        disabled: { control: 'boolean' },
        checked: { control: 'boolean' },
    },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
    args: {
        label: 'I agree to the Terms of Service',
    },
};

export const DarkThemeScenario: Story = {
    name: 'Dark Theme (All States)',
    render: (args) => {
        const darkStyles: CustomCSSProperties = {
            backgroundColor: '#121212',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            borderRadius: '8px',
            '--bg-primary': '#121212',
            '--text-primary': '#ffffff',
            '--checkbox-border-default': '#8d8d8d',
            '--checkbox-ripple': 'rgba(255, 255, 255, 0.15)',
            '--checkbox-focus-outline': 'rgba(255, 255, 255, 0.6)',
        };

        return (
            <div style={darkStyles}>
                <Checkbox {...args} label="Default unchecked" />
                <Checkbox {...args} label="Checked state" defaultChecked />
                <Checkbox {...args} label="Disabled state" disabled />
            </div>
        );
    },
    args: {},
};

export const LightThemeScenario: Story = {
    name: 'Light Theme (All States)',
    render: (args) => {
        const lightStyles: CustomCSSProperties = {
            backgroundColor: '#ffffff',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            borderRadius: '8px',
            border: '1px solid #e0e0e0',
            '--bg-primary': '#ffffff',
            '--text-primary': '#000000',
            '--checkbox-border-default': '#626262',
            '--checkbox-ripple': 'rgba(0, 0, 0, 0.08)',
            '--checkbox-focus-outline': 'rgba(0, 0, 0, 0.4)',
        };

        return (
            <div style={lightStyles}>
                <Checkbox {...args} label="Default unchecked" />
                <Checkbox {...args} label="Checked state" defaultChecked />
                <Checkbox {...args} label="Disabled state" disabled />
            </div>
        );
    },
    args: {},
};
