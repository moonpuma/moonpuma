// Route Key Factory — единственный источник истины по путям приложения (без локали:
// её подставляет `Link`/`useRouter` из `@/shared/i18n/navigation`). Каждый путь — функция,
// а не голая строка, чтобы динамические сегменты (`profile.byId(id)`) не собирались руками
// в местах использования и любое переименование маршрута правилось в одном месте.
export const routes = {
  home: () => '/',

  auth: {
    signIn: () => '/sign-in',
    signUp: () => '/sign-up',
    forgotPassword: () => '/forgot-password',
    resendLink: () => '/resend-link',
    success: () => '/success',
  },

  legal: {
    privacyPolicy: () => '/privacy-policy',
    termsOfService: () => '/terms-of-service',
  },

  profile: {
    root: () => '/profile',
    byId: (id: string) => `/profile/${id}`,
  },

  settings: () => '/settings',
} as const
