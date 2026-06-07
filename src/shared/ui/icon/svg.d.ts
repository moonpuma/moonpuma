// Типизация прямого импорта SVG как React-компонента (через @svgr/webpack).
// Переопределяет дефолтное объявление Next, где `*.svg` имеет тип `any`.
declare module '*.svg' {
  import type { FC, SVGProps } from 'react'

  const ReactComponent: FC<SVGProps<SVGSVGElement>>

  export default ReactComponent
}
