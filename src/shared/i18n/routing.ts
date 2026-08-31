import { defineRouting } from 'next-intl/routing'

// Единственный источник истины по локалям для next-intl (middleware, навигация, конфиг запроса).
export const routing = defineRouting({
  locales: ['en', 'ru'],
  defaultLocale: 'en',
  // Локаль всегда присутствует в URL (/en, /ru/sign-in, …), варианта без префикса нет.
  localePrefix: 'always',
})
