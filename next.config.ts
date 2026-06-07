import path from 'path'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactCompiler: true,
  sassOptions: {
    // Next.js передаёт этот путь sass-компилятору как loadPaths.
    // Файл variables.scss лежит в src/styles, поэтому @use 'variables' ищется там.
    loadPaths: [path.resolve(__dirname, 'src/styles')],
  },
  turbopack: {
    root: __dirname,
    // Импорт *.svg отдаём в @svgr/webpack — каждый файл становится React-компонентом.
    rules: {
      '*.svg': {
        loaders: [
          {
            loader: '@svgr/webpack',
            options: {
              svgo: true,
              svgoConfig: {
                plugins: [
                  {
                    name: 'preset-default',
                    // viewBox нужен, чтобы иконка масштабировалась по width/height.
                    params: { overrides: { removeViewBox: false } },
                  },
                  // Префиксуем id (напр. clipPath) именем файла, чтобы при выводе
                  // нескольких инлайн-иконок на странице их id не конфликтовали.
                  'prefixIds',
                ],
              },
              // Моно-иконки наследуют цвет через currentColor; брендовые
              // (google, browser, payment…) сохраняют свои hex-цвета, т.к. в них нет чёрного.
              replaceAttrValues: {
                '#000': 'currentColor',
                '#000000': 'currentColor',
                black: 'currentColor',
              },
              // Размер задаётся пропсами компонента, а не зашит в svg.
              dimensions: false,
            },
          },
        ],
        as: '*.js',
      },
    },
  },
}

export default nextConfig
