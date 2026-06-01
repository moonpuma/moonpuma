import type { FC, SVGProps } from 'react'
import type { IconName } from './types'

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName
  size?: number
}

export const Icon: FC<IconProps> = ({ name, size = 24, width, height, ...props }) => (
  <svg width={width ?? size} height={height ?? size} {...props}>
    <use href={`/icon-sprite.svg#${name}`} />
  </svg>
)
