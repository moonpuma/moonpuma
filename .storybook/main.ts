import type { StorybookConfig } from '@storybook/nextjs-vite'
import svgr from 'vite-plugin-svgr'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@chromatic-com/storybook', '@storybook/addon-vitest', '@storybook/addon-a11y', '@storybook/addon-docs'],
  framework: {
    name: '@storybook/nextjs-vite',
    options: {
      // Встроенный обработчик next/image тоже перехватывает `.svg` (enforce: 'pre')
      // и превращает импорт в объект `{ src, ... }` — из-за этого Icon падал с
      // "Element type is invalid ... got: object". Исключаем svg из next-image,
      // чтобы файлы доставались нашему vite-plugin-svgr ниже.
      image: {
        excludeFiles: ['**/*.svg'],
      },
    },
  },
  staticDirs: ['..\\public'],
  // SVGR настроен только для Turbopack (next.config.ts). Storybook работает на Vite,
  // поэтому подключаем vite-plugin-svgr с теми же опциями, чтобы импорт `*.svg`
  // так же превращался в React-компонент (а не в URL ассета).
  viteFinal: async (viteConfig) => {
    viteConfig.plugins = viteConfig.plugins ?? []
    viteConfig.plugins.push(
      svgr({
        // Применяем ко всем svg, а не только к `*.svg?react`, чтобы работал
        // дефолтный импорт `import HomeIcon from '...home.svg'`.
        include: '**/*.svg',
        svgrOptions: {
          // Компонент — это default-экспорт (как ждёт src/shared/ui/icon/svg.d.ts).
          exportType: 'default',
          svgo: true,
          svgoConfig: {
            plugins: [
              {
                name: 'preset-default',
                params: { overrides: { removeViewBox: false } },
              },
              'prefixIds',
            ],
          },
          replaceAttrValues: {
            '#000': 'currentColor',
            '#000000': 'currentColor',
            black: 'currentColor',
          },
          dimensions: false,
        },
      }),
    )
    return viteConfig
  },
}
export default config
