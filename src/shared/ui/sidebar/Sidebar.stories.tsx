import type { CSSProperties } from 'react'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { defaultSidebarItems, Sidebar, type SidebarItemState } from './Sidebar'

const meta: Meta<typeof Sidebar> = {
  title: 'Shared/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  argTypes: {
    activeItemId: {
      control: 'select',
      options: defaultSidebarItems.map((item) => item.id),
    },
    signInHref: {
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof Sidebar>

export const Default: Story = {
  args: {
    signInHref: '/sign-in',
  },
}

export const Active: Story = {
  args: {
    activeItemId: 'feed',
    signInHref: '/sign-in',
  },
}

export const AllStates: Story = {
  name: 'All States',
  render: () => {
    const states: Array<{ title: string; state: SidebarItemState }> = [
      { title: 'Default', state: 'default' },
      { title: 'Active', state: 'active' },
      { title: 'Hover', state: 'hover' },
      { title: 'Focus', state: 'focus' },
      { title: 'Disabled', state: 'disabled' },
    ]

    const wrapperStyles: CSSProperties = {
      minHeight: '720px',
      display: 'grid',
      gridTemplateColumns: 'repeat(5, minmax(220px, 1fr))',
      gap: 0,
      padding: '24px 32px 40px',
      color: '#ffffff',
      backgroundColor: '#0d0d0d',
    }

    const titleStyles: CSSProperties = {
      marginBottom: '28px',
      fontSize: '18px',
      fontWeight: 500,
      lineHeight: '24px',
    }

    return (
      <div style={wrapperStyles}>
        {states.map(({ title, state }) => (
          <section key={state}>
            <h3 style={titleStyles}>{title}</h3>
            <Sidebar
              items={defaultSidebarItems.map((item) => (item.id === 'feed' ? { ...item, state } : item))}
              signInHref='/sign-in'
              style={
                {
                  '--sidebar-min-height': '560px',
                  '--sidebar-width': '100%',
                  '--sidebar-padding': '72px 32px 32px',
                } as CSSProperties
              }
            />
          </section>
        ))}
      </div>
    )
  },
}
