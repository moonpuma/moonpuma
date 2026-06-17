import { Header } from '@/widgets/header'

// Группа для страниц, доступных только авторизованным пользователям.
// TODO: добавить guard/редирект на /sign-in, а в дальнейшем — Sidebar.
export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header isLoggedIn />
      <main>{children}</main>
    </>
  )
}
