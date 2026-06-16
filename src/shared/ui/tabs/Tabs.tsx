'use client'

import {
  Children,
  cloneElement,
  isValidElement,
  useRef,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactElement,
  type ReactNode,
} from 'react'
import clsx from 'clsx'
import s from './Tabs.module.scss'
import type { TabProps } from './Tab'

export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Контролируемое активное значение. */
  value?: string
  /** Начальное значение для неконтролируемого режима. */
  defaultValue?: string
  /** Вызывается при выборе вкладки. */
  onChange?: (value: string) => void
  /** Вкладки — элементы `Tab`. */
  children: ReactNode
}

const NAV_KEYS = ['ArrowLeft', 'ArrowRight', 'Home', 'End']

export const Tabs = ({ value, defaultValue, onChange, children, className, ...restProps }: TabsProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue)
  const currentValue = value ?? internalValue
  const listRef = useRef<HTMLDivElement>(null)

  const selectValue = (next: string) => {
    // в контролируемом режиме состояние держит потребитель
    if (value === undefined) setInternalValue(next)
    onChange?.(next)
  }

  // значения активных (не disabled) вкладок — для навигации стрелками
  const enabledValues = (Children.toArray(children).filter(isValidElement) as ReactElement<TabProps>[])
    .filter((tab) => !tab.props.disabled)
    .map((tab) => tab.props.value)

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!NAV_KEYS.includes(event.key) || enabledValues.length === 0) return
    event.preventDefault()

    const activeIndex = enabledValues.indexOf(currentValue ?? '')
    let nextIndex = activeIndex

    switch (event.key) {
      case 'ArrowLeft':
        nextIndex = activeIndex <= 0 ? enabledValues.length - 1 : activeIndex - 1
        break
      case 'ArrowRight':
        nextIndex = activeIndex === enabledValues.length - 1 ? 0 : activeIndex + 1
        break
      case 'Home':
        nextIndex = 0
        break
      case 'End':
        nextIndex = enabledValues.length - 1
        break
    }

    const nextValue = enabledValues[nextIndex]
    selectValue(nextValue)
    listRef.current?.querySelector<HTMLButtonElement>(`[data-value="${nextValue}"]`)?.focus()
  }

  const clonedChildren = Children.map(children, (child) => {
    if (!isValidElement(child)) return child

    const tab = child as ReactElement<TabProps>

    return cloneElement(tab, {
      selected: tab.props.value === currentValue,
      onSelect: selectValue,
    })
  })

  return (
    <div ref={listRef} role='tablist' className={clsx(s.tabs, className)} onKeyDown={handleKeyDown} {...restProps}>
      {clonedChildren}
    </div>
  )
}
