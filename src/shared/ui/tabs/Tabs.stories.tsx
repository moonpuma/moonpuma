import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { useState } from 'react'
import { Tabs } from './Tabs'
import { Tab } from './Tab'

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Tabs>

// Неконтролируемый режим: состояние держит сам компонент через defaultValue
export const Default: Story = {
  args: {
    defaultValue: 'devices',
  },
  render: (args) => (
    <Tabs {...args}>
      <Tab value='general' label='General information' />
      <Tab value='devices' label='Devices' />
      <Tab value='account' label='Account Management' />
      <Tab value='payments' label='My payments' />
    </Tabs>
  ),
}

// Контролируемый режим: значение и onChange управляются снаружи
export const Controlled: Story = {
  render: () => {
    const TabsWithState = () => {
      const [value, setValue] = useState('general')

      return (
        <Tabs value={value} onChange={setValue}>
          <Tab value='general' label='General information' />
          <Tab value='devices' label='Devices' />
          <Tab value='account' label='Account Management' />
          <Tab value='payments' label='My payments' />
        </Tabs>
      )
    }

    return <TabsWithState />
  },
}

// Отдельная отключённая вкладка — её нельзя выбрать ни кликом, ни стрелками
export const WithDisabledTab: Story = {
  args: {
    defaultValue: 'general',
  },
  render: (args) => (
    <Tabs {...args}>
      <Tab value='general' label='General information' />
      <Tab value='devices' label='Devices' disabled />
      <Tab value='account' label='Account Management' />
    </Tabs>
  ),
}

// Витрина состояний из макета Figma: активная (синяя) и неактивная (серая) вкладки
export const AllStates: Story = {
  name: 'All States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ color: 'var(--text-secondary)', fontSize: 12 }}>Active</span>
        <Tabs defaultValue='active'>
          <Tab value='active' label='Tabs' />
          <Tab value='default' label='Tabs' />
          <Tab value='disabled' label='Tabs' disabled />
        </Tabs>
      </div>

      <span style={{ color: 'var(--text-secondary)', fontSize: 12 }}>
        Наведи курсор (hover), зажми (active) и пройдись Tab/стрелками (focus), чтобы увидеть остальные состояния.
      </span>
    </div>
  ),
}
