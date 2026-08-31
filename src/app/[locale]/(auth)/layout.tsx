import { Header } from '@/widgets/header'
import s from './layout.module.scss'

// Группа для процесса аутентификации (доступна неавторизованным пользователям).
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={s.layout}>
      <Header />
      <main className={s.main}>{children}</main>
    </div>
  )
}
