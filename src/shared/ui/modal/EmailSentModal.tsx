"use client";

import { useRouter } from "next/navigation";
import { Modal } from "../modal";
import { Button } from "../button";
import { Typography } from "../typography";

export interface EmailSentModalProps {
    isOpen: boolean;
    onClose: () => void;
    email: string;
    redirectTo?: string;
}

export function EmailSentModal({
                                   isOpen,
                                   onClose,
                                   email,
                                   redirectTo = "/sign-in",
                               }: EmailSentModalProps) {
    const router = useRouter();

    const handleConfirm = () => {
        onClose();
        router.push(redirectTo);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Email sent"
            footer={<Button title="OK" onClick={handleConfirm} />}
        >
            <Typography variant="regular_text_16">
                We have sent a link to confirm your email to {email}
            </Typography>
        </Modal>
    );
}