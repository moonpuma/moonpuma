'use client';

import { useId, useState, type ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import { Icon } from '@/shared/ui/icon/Icon';
import EyeIcon from '@/shared/ui/icon/icons/common/eye-outline.svg';
import EyeOffIcon from '@/shared/ui/icon/icons/common/eye-off-outline.svg';
import s from './Input.module.scss';

export interface InputProps extends Omit<ComponentPropsWithoutRef<'input'>, 'type'> {
    /** Подпись над полем. */
    label?: string;
    /** Тип поля. Для `password` вместе с `showPasswordToggle` появляется кнопка показа пароля. */
    type?: 'text' | 'password' | 'email' | 'number';
    /** Текст ошибки. Если задан — поле подсвечивается красным, текст выводится под полем. */
    error?: string;
    /** Показывать кнопку-«глаз» для переключения видимости пароля. */
    showPasswordToggle?: boolean;
}

export const Input = ({
                          label,
                          type = 'text',
                          error,
                          showPasswordToggle = false,
                          className,
                          id,
                          disabled,
                          ...restProps
                      }: InputProps) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const [passwordVisible, setPasswordVisible] = useState(false);

    const hasPasswordToggle = type === 'password' && showPasswordToggle;
    const inputType = hasPasswordToggle && passwordVisible ? 'text' : type;

    const togglePasswordVisibility = () => {
        setPasswordVisible((prev) => !prev);
    };

    return (
        <div className={s.inputWrapper}>
            {label && (
                <label htmlFor={inputId} className={s.label}>
                    {label}
                </label>
            )}
            <div className={s.inputContainer}>
                <input
                    id={inputId}
                    type={inputType}
                    disabled={disabled}
                    aria-invalid={error ? true : undefined}
                    className={clsx(s.input, { [s.inputError]: error, [s.withToggle]: hasPasswordToggle }, className)}
                    {...restProps}
                />
                {hasPasswordToggle && (
                    <button
                        type="button"
                        className={s.eyeButton}
                        onClick={togglePasswordVisibility}
                        disabled={disabled}
                        aria-label={passwordVisible ? 'Скрыть пароль' : 'Показать пароль'}
                    >
                        <Icon icon={passwordVisible ? EyeOffIcon : EyeIcon} size={24} />
                    </button>
                )}
            </div>
            {error && <span className={s.errorText}>{error}</span>}
        </div>
    );
};
