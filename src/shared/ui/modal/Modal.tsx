"use client";

import { useEffect, useRef, MouseEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Icon } from "../icon";
import { Typography } from "../typography";
import CloseIcon from "../icon/icons/common/close-outline.svg";
import styles from "./Modal.module.scss";

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
    footer?: ReactNode;
}

export function Modal({ isOpen, onClose, title, children, footer }: ModalProps) {
    const dialogRef = useRef<HTMLDivElement>(null);

    // Закрытие по Escape
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    // Блокировка скролла фона, пока модалка открыта
    useEffect(() => {
        if (!isOpen) return;

        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
        // Закрываем только если клик именно по оверлею, а не по содержимому модалки
        if (e.target === e.currentTarget) onClose();
    };

    return createPortal(
        <div className={styles.overlay} onMouseDown={handleOverlayClick}>
            <div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                className={styles.dialog}
            >
                <div className={styles.header}>
                    <Typography
                        variant="h3"
                        className={styles.title}
                    >
                        <span id="modal-title">{title}</span>
                    </Typography>
                    <button
                        type="button"
                        className={styles.closeButton}
                        onClick={onClose}
                        aria-label="Close"
                    >
                        <Icon icon={CloseIcon} size={20} />
                    </button>
                </div>

                <div className={styles.body}>{children}</div>

                {footer && <div className={styles.footer}>{footer}</div>}
            </div>
        </div>,
        document.body
    );
}