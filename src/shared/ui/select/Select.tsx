"use client";

import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { Icon } from '@/shared/ui/icon/Icon';
import { IconComponent } from '@/shared/ui/icon/types';
import ArrowDownIcon from '@/shared/ui/icon/icons/common/arrow-ios-down-outline.svg';
import styles from './Select.module.scss';

export interface SelectOption {
    value: string;
    label: string;
    icon?: IconComponent; // Иконка опциональна (нужна только для флагов)
}

export interface SelectProps {
    label?: string;
    options: SelectOption[];
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    disabled?: boolean;
    placeholder?: string;
    /** Размер: 'md' — стандартный (Header), 'sm' — компактный инлайн (Pagination). */
    size?: 'md' | 'sm';
    /** Доп. класс на контейнер — для кастомной ширины у потребителя. */
    className?: string;
}

export const Select = ({
                           label,
                           options,
                           value,
                           defaultValue,
                           onChange,
                           disabled = false,
                           placeholder = 'Select-box',
                           size = 'md',
                           className,
                       }: SelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [internalValue, setInternalValue] = useState(defaultValue);
    const containerRef = useRef<HTMLDivElement>(null);
    const currentValue = value ?? internalValue;

    const selectedOption = options.find((opt) => opt.value === currentValue);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleDropdown = () => {
        if (!disabled) setIsOpen((prev) => !prev);
    };

    const handleSelect = (optionValue: string) => {
        if (value === undefined) {
            setInternalValue(optionValue);
        }
        onChange?.(optionValue);
        setIsOpen(false);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
        if (event.key === 'Escape') {
            setIsOpen(false);
        }
    };

    return (
        <div className={clsx(styles.container, { [styles.sm]: size === 'sm' }, className)} ref={containerRef}>
            {label && <span className={styles.label}>{label}</span>}

            <button
                type="button"
                className={clsx(styles.trigger, { [styles.active]: isOpen })}
                onClick={toggleDropdown}
                onKeyDown={handleKeyDown}
                disabled={disabled}
                aria-expanded={isOpen}
                aria-haspopup="listbox"
            >
        <span className={styles.valueWrapper}>
          {selectedOption?.icon && (
              <Icon icon={selectedOption.icon} size={16} className={styles.optionIcon} />
          )}
            {selectedOption ? selectedOption.label : placeholder}
        </span>

                <span className={clsx(styles.arrowWrapper, { [styles.rotated]: isOpen })}>
                    <Icon icon={ArrowDownIcon} size={16} />
        </span>
            </button>

            {isOpen && (
                <ul className={styles.dropdown} role="listbox">
                    {options.map((option) => (
                        <li
                            key={option.value}
                            className={clsx(styles.option, {
                                [styles.selected]: option.value === currentValue,
                            })}
                            onClick={() => handleSelect(option.value)}
                            role="option"
                            aria-selected={option.value === currentValue}
                        >
                            {option.icon && (
                                <Icon icon={option.icon} size={16} className={styles.optionIcon} />
                            )}
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
