import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Icon } from './Icon'
import HomeIcon from './icons/common/home.svg'
import HeartIcon from './icons/common/heart.svg'
import BellIcon from './icons/common/bell.svg'
import GoogleIcon from './icons/social/google.svg'
import GithubIcon from './icons/social/github.svg'

const meta: Meta<typeof Icon> = {
  title: 'Components/icon',
  component: Icon,
  tags: ['autodocs'],
  args: {
    name: HomeIcon,
    size: 24,
  },
  argTypes: {
    size: { control: { type: 'number' } },
    color: { control: 'color' },
  },
}

export default meta

type Story = StoryObj<typeof Icon>

export const Default: Story = {}

// Моно-иконка наследует цвет через currentColor.
export const Colored: Story = {
  args: {
    name: HeartIcon,
    size: 32,
    color: 'var(--text-primary)',
  },
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <Icon name={BellIcon} size={16} color='var(--text-primary)' />
      <Icon name={BellIcon} size={24} color='var(--text-primary)' />
      <Icon name={BellIcon} size={32} color='var(--text-primary)' />
      <Icon name={BellIcon} size={48} color='var(--text-primary)' />
    </div>
  ),
}

// Брендовые иконки сохраняют собственные цвета (в них нет чёрного).
export const Brand: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <Icon name={GoogleIcon} size={32} />
      <Icon name={GithubIcon} size={32} color='var(--text-primary)' />
    </div>
  ),
}
