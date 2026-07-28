import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { RadioGroup } from './RadioGroup'
import { Radio } from './Radio'
import type { CSSProperties } from 'react'

interface CustomCSSProperties extends CSSProperties {
  '--bg-primary'?: string
  '--text-primary'?: string
  '--radio-border-default'?: string
  '--radio-ripple'?: string
  '--radio-focus-outline'?: string
}

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof RadioGroup>

export const Default: Story = {
  args: {
    name: 'example-group',
    defaultValue: 'option1',
  },
  render: (args) => (
    <RadioGroup {...args}>
      <Radio value='option1' label='RadioGroup Option 1' />
      <Radio value='option2' label='RadioGroup Option 2' />
    </RadioGroup>
  ),
}

export const DarkThemeScenario: Story = {
  name: 'Dark Theme (All States)',
  render: (args) => {
    const darkStyles: CustomCSSProperties = {
      backgroundColor: '#121212',
      padding: '24px',
      borderRadius: '8px',
      '--bg-primary': '#121212',
      '--text-primary': '#ffffff',
      '--radio-border-default': '#8d8d8d',
      '--radio-ripple': 'rgba(255, 255, 255, 0.15)',
      '--radio-focus-outline': 'rgba(255, 255, 255, 0.6)',
    }

    return (
      <div style={darkStyles}>
        <RadioGroup {...args} name='dark-group' defaultValue='active'>
          <Radio value='default' label='Default state' />
          <Radio value='active' label='Active / Checked state' />
          <Radio value='disabled' label='Disabled state' disabled />
        </RadioGroup>
      </div>
    )
  },
}

export const LightThemeScenario: Story = {
  name: 'Light Theme (All States)',
  render: (args) => {
    const lightStyles: CustomCSSProperties = {
      backgroundColor: '#ffffff',
      padding: '24px',
      borderRadius: '8px',
      border: '1px solid #e0e0e0',
      '--bg-primary': '#ffffff',
      '--text-primary': '#000000',
      '--radio-border-default': '#626262',
      '--radio-ripple': 'rgba(0, 0, 0, 0.08)',
      '--radio-focus-outline': 'rgba(0, 0, 0, 0.4)',
    }

    return (
      <div style={lightStyles}>
        <RadioGroup {...args} name='light-group' defaultValue='active'>
          <Radio value='default' label='Default state' />
          <Radio value='active' label='Active / Checked state' />
          <Radio value='disabled' label='Disabled state' disabled />
        </RadioGroup>
      </div>
    )
  },
}
