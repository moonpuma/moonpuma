"use client";

import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import React, { useState } from "react";
import { DatePicker } from "./DatePicker";

// ─── Мета ────────────────────────────────────────────────────────────────────

const meta: Meta = {
    title: "UI/DatePicker",
    component: DatePicker,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "Компонент выбора даты. Поддерживает одиночный выбор (`single`) и диапазон (`range`). Полностью controlled — требует `value` и `onChange`.",
            },
        },
    },
};

export default meta;
type Story = StoryObj;

// ─── Вспомогательные компоненты (имена с большой буквы — требование ESLint) ──

function SingleDefault({ label, placeholder }: { label?: string; placeholder?: string }) {
    const [value, setValue] = useState<Date | null>(null);
    return (
        <DatePicker
            mode="single"
            label={label}
            placeholder={placeholder}
            value={value}
            onChange={setValue}
        />
    );
}

function SinglePrefilled() {
    const [value, setValue] = useState<Date | null>(new Date(2022, 11, 22));
    return (
        <DatePicker
            mode="single"
            label="Date"
            value={value}
            onChange={setValue}
        />
    );
}

function SingleWithError() {
    const [value, setValue] = useState<Date | null>(new Date(2022, 11, 22));
    return (
        <DatePicker
            mode="single"
            label="Date"
            value={value}
            onChange={setValue}
            error="Error"
        />
    );
}

function RangeDefault({ label, placeholder }: { label?: string; placeholder?: string }) {
    const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);
    const [error, setError] = useState("");

    const handleChange = (v: [Date | null, Date | null]) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const [start] = v;
        setError(start && start.getTime() < today.getTime() ? "Нельзя выбрать прошедшую дату" : "");
        setValue(v);
    };

    return (
        <DatePicker
            mode="range"
            label={label}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            error={error}
        />
    );
}

function RangeStartOnly() {
    const [value, setValue] = useState<[Date | null, Date | null]>([new Date(2022, 11, 28), null]);
    return (
        <DatePicker
            mode="range"
            label="Date range"
            value={value}
            onChange={setValue}
        />
    );
}

function RangeSelected() {
    const [value, setValue] = useState<[Date | null, Date | null]>([
        new Date(2022, 11, 28),
        new Date(2023, 0, 10),
    ]);
    return (
        <DatePicker
            mode="range"
            label="Date range"
            value={value}
            onChange={setValue}
        />
    );
}

function ShowcaseAll() {
    const [single, setSingle] = useState<Date | null>(null);
    const [range, setRange] = useState<[Date | null, Date | null]>([null, null]);
    const [rangeError, setRangeError] = useState("");

    const handleRange = (v: [Date | null, Date | null]) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const [start] = v;
        setRangeError(start && start.getTime() < today.getTime() ? "Нельзя выбрать прошедшую дату" : "");
        setRange(v);
    };

    const label = (text: string) => (
        <p style={{ marginBottom: 8, fontSize: 12, color: "var(--text-secondary, #888)" }}>
            {text}
        </p>
    );

    const cell = (title: string, node: React.ReactNode) => (
        <div>
            {label(title)}
            {node}
        </div>
    );

    return (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, padding: 32 }}>
            {cell("Single / Default",
                <DatePicker mode="single" label="Date" value={single} onChange={setSingle} />
            )}
            {cell("Single / Pre-filled",
                <DatePicker mode="single" label="Date" value={new Date(2022, 11, 22)} onChange={() => {}} />
            )}
            {cell("Single / Error",
                <DatePicker mode="single" label="Date" value={new Date(2022, 11, 22)} onChange={() => {}} error="Error" />
            )}
            {cell("Single / Disabled",
                <DatePicker mode="single" label="Date" value={new Date(2022, 11, 22)} onChange={() => {}} disabled />
            )}
            {cell("Range / Default",
                <DatePicker mode="range" label="Date range" value={range} onChange={handleRange} error={rangeError} />
            )}
            {cell("Range / Selected",
                <DatePicker mode="range" label="Date range" value={[new Date(2022, 11, 28), new Date(2023, 0, 10)]} onChange={() => {}} />
            )}
            {cell("Range / Error",
                <DatePicker mode="range" label="Date range" value={[new Date(2022, 11, 28), new Date(2023, 0, 10)]} onChange={() => {}} error="Нельзя выбрать прошедшую дату" />
            )}
            {cell("Range / Disabled",
                <DatePicker mode="range" label="Date range" value={[new Date(2022, 11, 28), new Date(2023, 0, 10)]} onChange={() => {}} disabled />
            )}
        </div>
    );
}

// ─── Stories ──────────────────────────────────────────────────────────────────

export const Default: Story = {
    name: "Single / Default",
    render: () => <SingleDefault label="Date select" placeholder="Select date" />,
};

export const SingleSelectedStory: Story = {
    name: "Single / Selected",
    render: () => <SinglePrefilled />,
};

export const SingleErrorStory: Story = {
    name: "Single / Error",
    render: () => <SingleWithError />,
};

export const SingleDisabled: Story = {
    name: "Single / Disabled",
    render: () => (
        <DatePicker
            mode="single"
            label="Date"
            value={new Date(2022, 11, 22)}
            onChange={() => {}}
            disabled
        />
    ),
};

export const RangeDefaultStory: Story = {
    name: "Range / Default",
    render: () => <RangeDefault label="Date range" placeholder="Select period" />,
};

export const RangeSelectedStory: Story = {
    name: "Range / Selected",
    render: () => <RangeSelected />,
};

export const RangeStartOnlyStory: Story = {
    name: "Range / Start only",
    render: () => <RangeStartOnly />,
};

export const RangeErrorStory: Story = {
    name: "Range / Error",
    render: () => (
        <DatePicker
            mode="range"
            label="Date range"
            value={[new Date(2022, 11, 28), new Date(2023, 0, 10)]}
            onChange={() => {}}
            error="Нельзя выбрать прошедшую дату"
        />
    ),
};

export const RangeDisabled: Story = {
    name: "Range / Disabled",
    render: () => (
        <DatePicker
            mode="range"
            label="Date range"
            value={[new Date(2022, 11, 28), new Date(2023, 0, 10)]}
            onChange={() => {}}
            disabled
        />
    ),
};

export const VacationPicker: Story = {
    name: "Сценарий / Выбор отпуска",
    render: () => <RangeDefault label="Дата отпуска" placeholder="Выберите период" />,
    parameters: {
        docs: {
            description: {
                story: "Пользователь выбирает диапазон дат отпуска. Прошедшие даты подсвечены красным, при клике появляется ошибка.",
            },
        },
    },
};

export const Showcase: Story = {
    name: "Showcase / Все состояния",
    render: () => <ShowcaseAll />,
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                story: "Все визуальные состояния компонента на одном экране — для дизайн-ревью.",
            },
        },
    },
};