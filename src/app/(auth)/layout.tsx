import { Header } from '@/widgets/header'
import s from './layout.module.scss'

// Группа для процесса аутентификации (доступна неавторизованным пользователям).
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className={s.main}>{children}</main>
    </>
  )
}
