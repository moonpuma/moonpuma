import type { ComponentPropsWithoutRef } from 'react'
import clsx from 'clsx'
import s from './Tabs.module.scss'

export interface TabProps extends Omit<ComponentPropsWithoutRef<'button'>, 'value' | 'onSelect'> {
  /** Значение вкладки — связывает её с активным значением группы `Tabs`. */
  value: string
  /** Текст вкладки. */
  label: string
  /**
   * Признак активной вкладки. Проставляется автоматически родителем `Tabs`,
   * руками передавать не нужно.
   */
  selected?: boolean
  /** Колбэк выбора вкладки. Внедряется родителем `Tabs`. */
  onSelect?: (value: string) => void
}

export const Tab = ({ value, label, selected = false, onSelect, disabled, className, ...restProps }: TabProps) => {
  return (
    <button
      type='button'
      role='tab'
      aria-selected={selected}
      // roving tabindex: в табуляцию попадает только активная вкладка,
      // остальные доступны стрелками внутри группы
      tabIndex={selected ? 0 : -1}
      data-value={value}
      disabled={disabled}
      className={clsx(s.tab, selected && s.selected, className)}
      onClick={() => onSelect?.(value)}
      {...restProps}
    >
      {label}
    </button>
  )
}
