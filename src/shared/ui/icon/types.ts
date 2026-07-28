import type { ComponentType, SVGProps } from 'react'

/** Компонент иконки, импортированный напрямую из папки `icons` (через SVGR). */
export type IconComponent = ComponentType<SVGProps<SVGSVGElement>>

export type IconProps = {
    /** Иконка, импортированная напрямую: `import HomeIcon from '@/shared/ui/icon/icons/common/home.svg'`. */
    icon: IconComponent
    /** Размер в пикселях (ширина и высота). По умолчанию 24. */
    size?: number
    /** Цвет иконки. Применяется к моно-иконкам через `currentColor`; брендовые цвета не меняются. */
    color?: string
} & Omit<SVGProps<SVGSVGElement>, 'color' | 'width' | 'height'>
