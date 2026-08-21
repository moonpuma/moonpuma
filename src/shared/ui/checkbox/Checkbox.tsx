import { useId, type ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import s from './Checkbox.module.scss';

export interface CheckboxProps extends Omit<ComponentPropsWithoutRef<'input'>, 'type'> {
    label?: string;
}

export const Checkbox = ({
                             label,
                             className = '',
                             id,
                             ...restProps
                         }: CheckboxProps) => {
    const generatedId = useId();
    const checkboxId = id || generatedId;
    const combinedClassName = clsx(s.labelContainer, className);

    return (
        <label htmlFor={checkboxId} className={combinedClassName}>
            <input
                type="checkbox"
                id={checkboxId}
                className={s.checkboxInput}
                {...restProps}
            />
            <span className={s.customCheckbox} />
            {label && <span className={s.labelText}>{label}</span>}
        </label>
    );
};

