'use client'

import {
    type ReactNode,
    type HTMLAttributes,
    Children,
    cloneElement,
    isValidElement,
    type ReactElement,
    type ChangeEvent
} from 'react';
import clsx from 'clsx';
import s from './RadioGroup.module.scss';
import type { RadioProps } from './Radio';

export interface RadioGroupProps extends HTMLAttributes<HTMLDivElement> {
    name: string;
    defaultValue?: string;
    value?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    children: ReactNode;
}

export const RadioGroup = ({
                               name,
                               defaultValue,
                               value,
                               onChange,
                               children,
                               className,
                               ...restProps
                           }: RadioGroupProps) => {

    const clonnedChildren = Children.map(children, (child) => {
        if (!isValidElement(child)) return child;

        const radioChild = child as ReactElement<RadioProps>;

        return cloneElement(radioChild, {
            name,
            checked: value !== undefined
                ? radioChild.props.value === value
                : radioChild.props.checked,
            defaultChecked: value === undefined && defaultValue !== undefined
                ? radioChild.props.value === defaultValue
                : radioChild.props.defaultChecked,
            onChange: onChange || radioChild.props.onChange,
        });
    });

    return (
        <div className={clsx(s.radioGroupWrapper, className)} {...restProps}>
            {clonnedChildren}
        </div>
    );
};
