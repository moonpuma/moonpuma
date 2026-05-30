'use client'

import { useState } from 'react';
import s from './pagination.module.scss';

export const Pagination = () => {

    const pages = [1, 2, 3, 4, 5]; // это временное решение т.к. пока неизвестно в каком формате будут приходить данные в компонент
    const defaultOptions = [10, 20, 30, 50, 100]; // это временное решение т.к. пока неизвестно в каком формате будут приходить данные в компонент

    const [selectedOption, setSelectedOption] = useState(defaultOptions[0]);
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (value: number) => {
        setSelectedOption(value);
        setIsOpen(false);
    };

    return (
        <div className={s.paginationWrapper}>
            <div className={s.pagesWrapper}>
                <button className={s.btn}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
                {pages.map((page) => (
                    <button key={page} className={s.btn}>{page}</button>
                ))}
                <button className={s.btn}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            </div>

            <div className={s.selectWrapper}>
                <span className={s.selectLabel}>Show</span>
                <div className={s.selectContainer}>
                    <div className={`${s.select} ${isOpen ? s.selectOpen : ''}`} onClick={() => setIsOpen(prev => !prev)} tabIndex={0} onBlur={() => setIsOpen(false)}>
                        <span>{selectedOption}</span>
                        <svg className={s.customArrow} width="16" height="16" viewBox="0 0 24 24" fill="none">
                            {isOpen ? (
                                <path d="M6 15L12 9L18 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            ) : (
                                <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            )}
                        </svg>
                    </div>
                    {isOpen && (
                        <ul className={s.optionsList}>
                            {defaultOptions.map((option) => (
                                <li
                                    key={option}
                                    className={`${s.option} ${option === selectedOption ? s.selected : ''}`}
                                    onClick={() => handleSelect(option)}
                                    onMouseDown={(e) => e.preventDefault()}
                                >
                                    {option}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <span className={s.selectLabel}>on page</span>
            </div>
        </div>
    );
};