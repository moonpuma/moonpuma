import type { ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import { Icon } from '@/shared/ui/icon/Icon';
import SearchIcon from '@/shared/ui/icon/icons/common/search-outline.svg';
import s from './SearchInput.module.scss';

interface SearchInputProps extends Omit<ComponentPropsWithoutRef<'input'>, 'type'> {
    /** Текст ошибки. Если задан — поле подсвечивается красным, текст выводится под полем. */
    error?: string;
}

export const SearchInput = ({ error, className, ...restProps }: SearchInputProps) => {
    return (
        <div className={s.inputWrapper}>
            <div className={s.inputContainer}>
                <span className={s.searchIcon} aria-hidden="true">
                    <Icon icon={SearchIcon} size={20} />
                </span>
                <input
                    type="text"
                    aria-invalid={error ? true : undefined}
                    className={clsx(s.input, { [s.inputError]: error }, className)}
                    {...restProps}
                />
            </div>
            {error && <span className={s.errorText}>{error}</span>}
        </div>
    );
};
