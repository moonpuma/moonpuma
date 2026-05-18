'use client';

import { useState } from 'react';
import s from './Input.module.css';

type Props = {
    title: string;
    type: string;
    placeholder: string;
    error?: string | undefined;
    showPasswordToggle?: boolean;
}

export const Input = ({
                          title,
                          type,
                          placeholder,
                          error,
                          showPasswordToggle,
                      }: Props) => {

    const [passwordVisible, setPasswordVisible] = useState(false);

    const inputType = type === 'password' && showPasswordToggle && passwordVisible
        ? 'text'
        : type;

    const inputClassName = `${s.input} ${error ? s.inputError : ''}`;

    const togglePasswordVisibility = () => {
        setPasswordVisible(prev => !prev);
    };

    return (
        <div className={s.inputWrapper}>
            <span className={s.title}>{title}</span>
            <div className={s.inputContainer}>
                <input
                    type={inputType}
                    placeholder={placeholder}
                    className={inputClassName}
                />
                {showPasswordToggle && type === 'password' && (
                    <button
                        type="button"
                        className={s.eyeButton}
                        onClick={togglePasswordVisibility}
                        aria-label={passwordVisible ? 'Hide password' : 'Show password'}
                    >
                        {passwordVisible ? (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="#8D9094" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <circle cx="12" cy="12" r="3" stroke="#8D9094" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        ) : (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.88 9.88C9.3225 10.4376 9.00046 11.1889 8.99998 12C8.99998 13.6569 10.3431 15 12 15C12.8111 15.0005 13.5624 14.6785 14.12 14.12" stroke="#8D9094" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M17.94 17.94C16.2306 19.243 14.1491 19.9649 12 20C5 20 1 12 1 12C2.24389 9.68192 3.96914 7.65663 6.06 6.06" stroke="#8D9094" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M22 12C22 12 18.68 18 12 18C11.3549 18.0008 10.7109 17.9246 10.08 17.78" stroke="#8D9094" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M2 2L22 22" stroke="#8D9094" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                        )}
                    </button>
                )}
            </div>
            {error && <span className={s.errorText}>{error}</span>}
        </div>
    );
};