'use client'

import { useId, type ComponentPropsWithoutRef } from 'react'
import clsx from 'clsx'
import s from './Textarea.module.scss'

interface TextareaProps extends ComponentPropsWithoutRef<'textarea'> {
    /** Подпись над полем. */
    label?: string
    /** Текст ошибки. Если задан — поле подсвечивается красным, текст выводится под полем. */
    error?: string
}

export const Textarea = ({ label, error, className, id, disabled, ...restProps }: TextareaProps) => {
    const generatedId = useId()
    const textareaId = id || generatedId

    return (
        <div className={clsx(s.textareaWrapper, { [s.disabled]: disabled })}>
            {label && (
                <label htmlFor={textareaId} className={s.label}>
                    {label}
                </label>
            )}
            <textarea
                id={textareaId}
                disabled={disabled}
                aria-invalid={error ? true : undefined}
                className={clsx(s.textarea, { [s.textareaError]: error }, className)}
                {...restProps}
            />
            {error && <span className={s.errorText}>{error}</span>}
        </div>
    )
}
