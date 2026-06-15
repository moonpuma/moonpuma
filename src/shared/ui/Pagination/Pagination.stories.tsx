import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { useState } from 'react'
import { Pagination, PaginationProps } from './Pagination'

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    totalPages: 55,
    currentPage: 1,
    pageSize: 100,
  },
}

export default meta
type Story = StoryObj<typeof Pagination>

// Контролируемый компонент — оборачиваем в локальный стейт, чтобы клики работали.
const PaginationDemo = (args: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(args.currentPage)
  const [pageSize, setPageSize] = useState(args.pageSize)

  return (
    <Pagination
      {...args}
      currentPage={currentPage}
      pageSize={pageSize}
      onPageChange={setCurrentPage}
      onPageSizeChange={setPageSize}
    />
  )
}

export const Default: Story = {
  render: (args) => <PaginationDemo {...args} />,
}

export const MiddlePage: Story = {
  args: {
    currentPage: 7,
  },
  render: (args) => <PaginationDemo {...args} />,
}

export const LastPage: Story = {
  args: {
    currentPage: 55,
  },
  render: (args) => <PaginationDemo {...args} />,
}

export const FewPages: Story = {
  args: {
    totalPages: 4,
    currentPage: 2,
  },
  render: (args) => <PaginationDemo {...args} />,
}
