import createMiddleware from 'next-intl/middleware'
import { routing } from '@/shared/i18n/routing'

// В Next.js 16 конвенция middleware.ts устарела в пользу proxy.ts, но next-intl
// экспортирует обычную default-функцию, совместимую с обеими конвенциями.
export default createMiddleware(routing)

export const config = {
  // Пропускаем статику, ассеты и внутренние пути Next.js — им локаль не нужна.
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
