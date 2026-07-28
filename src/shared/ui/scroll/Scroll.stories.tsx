
import { Scroll } from './Scroll'
import { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta: Meta<typeof Scroll> = {
  title: 'Components/Scroll',
  component: Scroll,
  parameters: {
    layout: 'centered',
  },
  args: {
    orientation: 'vertical',
  },
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['vertical', 'horizontal'],
    },
  },
}

export default meta

type Story = StoryObj<typeof Scroll>

export const Vertical: Story = {
  render: (args) => (
    <div
      style={{
        width: 320,
        height: 240,
        border: '1px solid #333',
      }}
    >
      <Scroll {...args}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            padding: 16,
          }}
        >
          {Array.from({ length: 30 }).map((_, index) => (
            <div
              key={index}
              style={{
                minHeight: 40,
                padding: '12px 16px',
                border: '1px solid #444',
                borderRadius: 8,
              }}
            >
              Item {index + 1}
            </div>
          ))}
        </div>
      </Scroll>
    </div>
  ),
}

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
  },
  render: (args) => (
    <div
      style={{
        width: 500,
        height: 180,
        border: '1px solid #333',
      }}
    >
      <Scroll {...args}>
        <div
          style={{
            display: 'flex',
            gap: 16,
            width: 'max-content',
            padding: 16,
          }}
        >
          {Array.from({ length: 15 }).map((_, index) => (
            <div
              key={index}
              style={{
                width: 160,
                height: 120,
                flexShrink: 0,
                border: '1px solid #444',
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              Card {index + 1}
            </div>
          ))}
        </div>
      </Scroll>
    </div>
  ),
}
