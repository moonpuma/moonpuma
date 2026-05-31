import { useId, type ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import s from './RadioGroup.module.scss';

export interface RadioProps extends Omit<ComponentPropsWithoutRef<'input'>, 'type'> {
    label?: string;
}

export const Radio = ({ label, className = '', id, ...restProps }: RadioProps) => {
    const generatedId = useId();
    const radioId = id || generatedId;
    const combinedClassName = clsx(s.radioLabelContainer, className);

    return (
        <label htmlFor={radioId} className={combinedClassName}>
            <input
                type="radio"
                id={radioId}
                className={s.nativeRadioInput}
                {...restProps}
            />
            <span className={s.customRadioCircle} />
            {label && <span className={s.radioLabelText}>{label}</span>}
        </label>
    );
};
