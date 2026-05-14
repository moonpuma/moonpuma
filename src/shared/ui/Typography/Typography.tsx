import React from 'react';
import Link from 'next/link';
import s from './Typography.module.css';

export type TypographyVariant =

    | 'large'
    | 'h1'
    | 'h2'

    | 'h3'
    | 'regular_text_16'
    | 'bold_text_16'

    | 'regular_text_14'
    | 'medium_text_14'
    | 'bold_text_14'

    | 'small_text'
    | 'semi_bold_small_text'
    | 'regular_link'

    | 'small_link';

interface TypographyProps {
    variant?: TypographyVariant;
    children: React.ReactNode;
    className?: string;
    href?: string;
}

export const Typography = ({
                               variant = 'regular_text_16',
                               children,
                               className = '',
                               href,
                           }: TypographyProps) => {
    const combinedClassName = `${s[variant]} ${className}`.trim();

    if (variant === 'regular_link' || variant === 'small_link') {
        return (
            <Link href={href || '#'} className={combinedClassName}>
                {children}
            </Link>
        );
    }

    const tags: Record<string, keyof React.JSX.IntrinsicElements> = {
        large: 'h1',
        h1: 'h1',
        h2: 'h2',
        h3: 'h3',
        regular_text_16: 'p',
        bold_text_16: 'p',
        regular_text_14: 'p',
        medium_text_14: 'p',
        bold_text_14: 'p',
        small_text: 'span',
        semi_bold_small_text: 'span',
    };

    const Component = tags[variant] || 'p';

    return <Component className={combinedClassName}>{children}</Component>;
};