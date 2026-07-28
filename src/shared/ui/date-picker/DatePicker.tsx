"use client";

import {
    useState,
    useRef,
    useEffect,
    useMemo,
    useCallback,
    forwardRef,
    KeyboardEvent,
} from "react";
import clsx from "clsx";
import { Icon } from "../icon/Icon";

import CalendarIcon from "../icon/icons/common/calendar-outline.svg";
import ChevronLeft from "../icon/icons/common/arrow-ios-up.svg";
import ChevronRight from "../icon/icons/common/arrow-ios-down-outline.svg";

import styles from "./DatePicker.module.scss";

// ─── Утилиты ─────────────────────────────────────────────────────────────────

function normalizeDate(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function isSameDay(d1: Date | null, d2: Date | null): boolean {
    if (!d1 || !d2) return false;
    return (
        d1.getDate() === d2.getDate() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getFullYear() === d2.getFullYear()
    );
}

function isBetween(date: Date, start: Date | null, end: Date | null): boolean {
    if (!start || !end) return false;
    const t = normalizeDate(date).getTime();
    return t > normalizeDate(start).getTime() && t < normalizeDate(end).getTime();
}

const MONTHS = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December",
] as const;

const WEEK_DAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"] as const;

// ─── Типы ─────────────────────────────────────────────────────────────────────

type SingleValue = Date | null;
type RangeValue = [Date | null, Date | null];

type DatePickerProps =
    | {
    mode?: "single";
    value: SingleValue;
    onChange: (value: SingleValue) => void;
    label?: string;
    error?: string;
    disabled?: boolean;
    placeholder?: string;
    minDate?: Date;
    maxDate?: Date;
    locale?: string;
}
    | {
    mode: "range";
    value: RangeValue;
    onChange: (value: RangeValue) => void;
    label?: string;
    error?: string;
    disabled?: boolean;
    placeholder?: string;
    minDate?: Date;
    maxDate?: Date;
    locale?: string;
};

interface CalendarCell {
    date: Date;
    isCurrentMonth: boolean;
    isWeekend: boolean;
}

// ─── Компонент ────────────────────────────────────────────────────────────────

export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
    (props, ref) => {
        const {
            label,
            error,
            disabled = false,
            placeholder = "Select date",
            minDate,
            maxDate,
            locale = "ru-RU",
        } = props;

        const isRange = props.mode === "range";

        const startDate: Date | null = isRange
            ? (props.value as RangeValue)[0]
            : (props.value as SingleValue);

        const endDate: Date | null = isRange
            ? (props.value as RangeValue)[1]
            : null;

        // onChange всегда актуален — без stale closure
        const onChangeRef = useRef(props.onChange);
        useEffect(() => {
            onChangeRef.current = props.onChange;
        });

        // ─── UI состояние ─────────────────────────────────────────────────────

        const [isOpen, setIsOpen] = useState(false);
        const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
        const [currentViewDate, setCurrentViewDate] = useState<Date>(
            () => normalizeDate(startDate ?? new Date())
        );

        const containerRef = useRef<HTMLDivElement>(null);
        const triggerRef = useRef<HTMLDivElement>(null);

        // Синхронизируем вьюпорт при открытии
        useEffect(() => {
            if (isOpen && startDate) {
                setCurrentViewDate(normalizeDate(startDate));
            }
        }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

        // Закрытие по клику снаружи
        useEffect(() => {
            const handleClickOutside = (e: MouseEvent) => {
                if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                    setIsOpen(false);
                }
            };
            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }, []);

        // ─── Ячейки календаря ─────────────────────────────────────────────────

        const year = currentViewDate.getFullYear();
        const month = currentViewDate.getMonth();

        const cells = useMemo<CalendarCell[]>(() => {
            const firstDayOfWeek = new Date(year, month, 1).getDay();
            const shiftIndex = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            const daysInPrevMonth = new Date(year, month, 0).getDate();
            const result: CalendarCell[] = [];

            for (let i = shiftIndex - 1; i >= 0; i--) {
                const date = new Date(year, month - 1, daysInPrevMonth - i);
                result.push({ date, isCurrentMonth: false, isWeekend: date.getDay() === 0 || date.getDay() === 6 });
            }
            for (let i = 1; i <= daysInMonth; i++) {
                const date = new Date(year, month, i);
                result.push({ date, isCurrentMonth: true, isWeekend: date.getDay() === 0 || date.getDay() === 6 });
            }
            const totalCells = result.length > 35 ? 42 : 35;
            for (let i = 1; result.length < totalCells; i++) {
                const date = new Date(year, month + 1, i);
                result.push({ date, isCurrentMonth: false, isWeekend: date.getDay() === 0 || date.getDay() === 6 });
            }
            return result;
        }, [year, month]);

        // ─── Вспомогательные функции ──────────────────────────────────────────

        const today = useMemo(() => normalizeDate(new Date()), []);

        // Прошедшая дата — только визуальная подсветка, клик не блокирует (блокировку делает внешний error)
        const isPastDate = useCallback(
            (date: Date): boolean => normalizeDate(date).getTime() < today.getTime(),
            [today]
        );

        // Полная блокировка (disabled) — minDate/maxDate
        const isDisabledDate = useCallback(
            (date: Date): boolean => {
                const t = normalizeDate(date).getTime();
                if (minDate && t < normalizeDate(minDate).getTime()) return true;
                if (maxDate && t > normalizeDate(maxDate).getTime()) return true;
                return false;
            },
            [minDate, maxDate]
        );

        const isPreviewRange = useCallback(
            (date: Date): boolean => {
                if (!isRange || !startDate || endDate || !hoveredDate) return false;
                const current = normalizeDate(date).getTime();
                const start = normalizeDate(startDate).getTime();
                const hover = normalizeDate(hoveredDate).getTime();
                const min = Math.min(start, hover);
                const max = Math.max(start, hover);
                return current > min && current < max;
            },
            [isRange, startDate, endDate, hoveredDate]
        );

        // ─── Обработчики ──────────────────────────────────────────────────────

        const changeMonth = useCallback(
            (direction: number) => setCurrentViewDate(new Date(year, month + direction, 1)),
            [year, month]
        );

        const handleDayClick = useCallback(
            (date: Date) => {
                if (isDisabledDate(date)) return;

                const selected = normalizeDate(date);
                const onChange = onChangeRef.current;

                if (!isRange) {
                    (onChange as (v: SingleValue) => void)(selected);
                    setIsOpen(false);
                    return;
                }

                const rangeOnChange = onChange as (v: RangeValue) => void;

                // Нет начала или диапазон уже завершён — начинаем заново
                if (!startDate || endDate) {
                    rangeOnChange([selected, null]);
                    return;
                }

                // Выбрали дату раньше startDate — сдвигаем начало
                if (selected.getTime() < normalizeDate(startDate).getTime()) {
                    rangeOnChange([selected, null]);
                    return;
                }

                // Завершаем диапазон
                rangeOnChange([startDate, selected]);
                setHoveredDate(null);
                setIsOpen(false);
            },
            [isRange, isDisabledDate, startDate, endDate]
        );

        const handleTriggerKeyDown = useCallback(
            (e: KeyboardEvent<HTMLDivElement>) => {
                if (disabled) return;
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setIsOpen((prev) => !prev);
                }
                if (e.key === "Escape") setIsOpen(false);
            },
            [disabled]
        );

        const handleDropdownKeyDown = useCallback(
            (e: KeyboardEvent<HTMLDivElement>) => {
                if (e.key === "Escape") {
                    setIsOpen(false);
                    triggerRef.current?.focus();
                }
            },
            []
        );

        // ─── Форматирование ───────────────────────────────────────────────────

        const formatDate = useCallback(
            (date: Date): string =>
                date.toLocaleDateString(locale, { day: "2-digit", month: "2-digit", year: "numeric" }),
            [locale]
        );

        const displayValue = useMemo((): string => {
            if (!isRange) return startDate ? formatDate(startDate) : "";
            if (startDate && endDate) return `${formatDate(startDate)} – ${formatDate(endDate)}`;
            if (startDate) return `${formatDate(startDate)} – ...`;
            return "";
        }, [isRange, startDate, endDate, formatDate]);

        // ─── Рендер ───────────────────────────────────────────────────────────

        return (
            <div
                ref={(node) => {
                    containerRef.current = node;
                    if (typeof ref === "function") ref(node);
                    else if (ref) ref.current = node;
                }}
                className={styles.wrapper}
            >
                {label && (
                    <span className={styles.label} id="datepicker-label">
                        {label}
                    </span>
                )}

                <div
                    ref={triggerRef}
                    role="combobox"
                    aria-expanded={isOpen}
                    aria-haspopup="dialog"
                    aria-labelledby={label ? "datepicker-label" : undefined}
                    aria-disabled={disabled}
                    tabIndex={disabled ? -1 : 0}
                    className={clsx(styles.inputWrapper, {
                        [styles.focus]: isOpen,
                        [styles.error]: !!error,
                        [styles.disabled]: disabled,
                    })}
                    onClick={() => { if (!disabled) setIsOpen((prev) => !prev); }}
                    onKeyDown={handleTriggerKeyDown}
                >
                    <span className={clsx(styles.value, { [styles.placeholder]: !displayValue })}>
                        {displayValue || placeholder}
                    </span>
                    <div className={styles.icon} aria-hidden="true">
                        <Icon icon={CalendarIcon} />
                    </div>
                </div>

                {error && (
                    <span className={styles.errorText} role="alert">
                        {error}
                    </span>
                )}

                {isOpen && (
                    <div
                        className={styles.dropdown}
                        role="dialog"
                        aria-modal="false"
                        aria-label="Calendar"
                        onKeyDown={handleDropdownKeyDown}
                    >
                        <div className={styles.header}>
                            <button
                                type="button"
                                className={styles.navBtn}
                                onClick={() => changeMonth(-1)}
                                aria-label="Previous month"
                            >
                                <Icon icon={ChevronLeft} style={{ transform: "rotate(-90deg)" }} />
                            </button>
                            <span className={styles.monthTitle} aria-live="polite">
                                {MONTHS[month]} {year}
                            </span>
                            <button
                                type="button"
                                className={styles.navBtn}
                                onClick={() => changeMonth(1)}
                                aria-label="Next month"
                            >
                                <Icon icon={ChevronRight} style={{ transform: "rotate(-90deg)" }} />
                            </button>
                        </div>

                        <div className={styles.grid} onMouseLeave={() => setHoveredDate(null)}>
                            {WEEK_DAYS.map((day) => (
                                <div key={day} className={styles.weekDay} aria-hidden="true">
                                    {day}
                                </div>
                            ))}

                            {cells.map((cell, index) => {
                                const { date, isCurrentMonth, isWeekend } = cell;

                                const isDisabled = disabled || isDisabledDate(date);
                                const isPast = isPastDate(date);
                                const isToday = isSameDay(date, today);

                                const isSingleSelected = !isRange && isSameDay(date, startDate);
                                const isStart = isRange && isSameDay(date, startDate);
                                const isEnd = isRange && isSameDay(date, endDate);
                                const isMiddle = isRange && isBetween(date, startDate, endDate);
                                const isPreview = isPreviewRange(date);
                                const isRangeDay = isStart || isEnd || isMiddle || isPreview;

                                return (
                                    <div
                                        key={index}
                                        className={clsx(styles.dayWrapper, {
                                            [styles.rangeMiddle]: isMiddle || isPreview,
                                            [styles.rangeStart]: isStart,
                                            [styles.rangeEnd]: isEnd,
                                        })}
                                    >
                                        <button
                                            type="button"
                                            disabled={isDisabled}
                                            aria-label={date.toLocaleDateString(locale, {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                            })}
                                            aria-pressed={isSingleSelected || isStart || isEnd}
                                            aria-current={isToday ? "date" : undefined}
                                            onMouseEnter={() => {
                                                if (isRange && startDate && !endDate) {
                                                    setHoveredDate(date);
                                                }
                                            }}
                                            onClick={() => handleDayClick(date)}
                                            className={clsx(styles.dayCell, {
                                                [styles.dayOutside]: !isCurrentMonth,
                                                [styles.dayWeekend]: isWeekend && isCurrentMonth && !isPast,
                                                [styles.dayToday]: isToday,
                                                [styles.dayPast]: isPast && isCurrentMonth,
                                                [styles.daySelected]: isSingleSelected,
                                                [styles.dayRangeSelected]: isRangeDay,
                                                [styles.dayStart]: isStart,
                                                [styles.dayEnd]: isEnd,
                                            })}
                                        >
                                            {date.getDate()}
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        );
    }
);

DatePicker.displayName = "DatePicker";