/** Маркер многоточия в диапазоне страниц. */
export const DOTS = 'dots'

export type PaginationItem = number | typeof DOTS

const range = (start: number, end: number): number[] => Array.from({ length: end - start + 1 }, (_, i) => start + i)

/**
 * Строит диапазон элементов пагинации: всегда показывает первую и последнюю
 * страницу, `siblingCount` соседей вокруг текущей и многоточия для пропусков.
 *
 * @example getPaginationRange(55, 1)  // [1, 2, 3, 4, 5, DOTS, 55]
 * @example getPaginationRange(55, 7)  // [1, DOTS, 6, 7, 8, DOTS, 55]
 */
export const getPaginationRange = (totalPages: number, currentPage: number, siblingCount = 1): PaginationItem[] => {
  // первая + последняя + текущая + по siblingCount с каждой стороны + 2 многоточия
  const totalPageNumbers = siblingCount * 2 + 5

  // Страниц мало — показываем все без многоточий.
  if (totalPageNumbers >= totalPages) {
    return range(1, totalPages)
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages)

  const shouldShowLeftDots = leftSiblingIndex > 2
  const shouldShowRightDots = rightSiblingIndex < totalPages - 2

  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = 3 + 2 * siblingCount
    return [...range(1, leftItemCount), DOTS, totalPages]
  }

  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = 3 + 2 * siblingCount
    return [1, DOTS, ...range(totalPages - rightItemCount + 1, totalPages)]
  }

  return [1, DOTS, ...range(leftSiblingIndex, rightSiblingIndex), DOTS, totalPages]
}
