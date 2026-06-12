import type { Preview } from '@storybook/nextjs-vite'
// Подключаем глобальные стили приложения: они объявляют дизайн-токены на :root
// (через variables.scss) и базовые сбросы, чтобы компоненты в Storybook
// выглядели так же, как в приложении.
import '../src/app/globals.scss'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },

  // Рисуем каждую историю на фоне приложения (--bg-base), как на реальной странице.
  decorators: [
    (Story) => (
      <div style={{ background: 'var(--bg-base)', minHeight: '100vh', padding: '1rem' }}>
        <Story />
      </div>
    ),
  ],
}

export default preview
