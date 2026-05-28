import s from "./alert.module.scss"

type Props = {
    isError: boolean
    message: string
    onClose?: () => void
}

export const Alert = ({ isError, message, onClose }: Props) => {
    const variant = isError ? "secondary" : "primary"

    return (
        <div className={`${s.alertWrapper} ${s[variant]}`} role="alert">
            <span className={s.text}>{message}</span>
            <button className={s.btn} onClick={onClose} aria-label="Закрыть уведомление" type="button">
                ✕
            </button>
        </div>
    )
}