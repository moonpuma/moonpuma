'use client'

import clsx from 'clsx'
import { Icon } from '@/shared/ui/icon'
import { Select, SelectOption } from '@/shared/ui/select'
import ArrowBackIcon from '@/shared/ui/icon/icons/common/arrow-ios-back-outline.svg'
import ArrowForwardIcon from '@/shared/ui/icon/icons/common/arrow-ios-forward-outline.svg'
import { DOTS, getPaginationRange } from './getPaginationRange'
import s from './pagination.module.scss'

export interface PaginationProps {
  /** Текущая страница (нумерация с 1). */
  currentPage: number
  /** Общее количество страниц. */
  totalPages: number
  /** Текущий размер страницы (количество элементов). */
  pageSize: number
  /** Доступные размеры страницы. */
  pageSizeOptions?: number[]
  /** Количество соседних страниц вокруг текущей. */
  siblingCount?: number
  onPageChange: (page: number) => void
  onPageSizeChange: (pageSize: number) => void
  className?: string
}

const DEFAULT_PAGE_SIZE_OPTIONS = [10, 20, 30, 50, 100]

export const Pagination = ({
  currentPage,
  totalPages,
  pageSize,
  pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
  siblingCount = 1,
  onPageChange,
  onPageSizeChange,
  className,
}: PaginationProps) => {
  const pages = getPaginationRange(totalPages, currentPage, siblingCount)

  const isFirstPage = currentPage <= 1
  const isLastPage = currentPage >= totalPages

  const selectOptions: SelectOption[] = pageSizeOptions.map((option) => ({
    value: String(option),
    label: String(option),
  }))

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return
    onPageChange(page)
  }

  return (
    <nav className={clsx(s.pagination, className)} aria-label='Pagination'>
      <div className={s.pages}>
        <button type='button' className={s.arrow} onClick={() => goToPage(currentPage - 1)} disabled={isFirstPage} aria-label='Предыдущая страница'>
          <Icon icon={ArrowBackIcon} size={20} />
        </button>

        {pages.map((page, index) => {
          if (page === DOTS) {
            return (
              <span key={`dots-${index}`} className={s.dots} aria-hidden='true'>
                …
              </span>
            )
          }

          const isActive = page === currentPage

          return (
            <button key={page} type='button' className={clsx(s.item, { [s.active]: isActive })} onClick={() => goToPage(page)} aria-current={isActive ? 'page' : undefined}>
              {page}
            </button>
          )
        })}

        <button type='button' className={s.arrow} onClick={() => goToPage(currentPage + 1)} disabled={isLastPage} aria-label='Следующая страница'>
          <Icon icon={ArrowForwardIcon} size={20} />
        </button>
      </div>

      <div className={s.sizeSelector}>
        <span className={s.label}>Show</span>
        <Select size='sm' options={selectOptions} value={String(pageSize)} onChange={(value) => onPageSizeChange(Number(value))}/>
        <span className={s.label}>on page</span>
      </div>
    </nav>
  )
}
