import toast from 'react-hot-toast'
import { Alert } from '@/shared/ui/alert'

const TOAST_DURATION = 5000

export const showErrorToast = (message: string) => {
  toast.custom(
    (t) => <Alert message={message} isError visible={t.visible} onClose={() => toast.dismiss(t.id)} />,
    { duration: TOAST_DURATION },
  )
}

export const showSuccessToast = (message: string) => {
  toast.custom((t) => <Alert message={message} visible={t.visible} onClose={() => toast.dismiss(t.id)} />, {
    duration: TOAST_DURATION,
  })
}
