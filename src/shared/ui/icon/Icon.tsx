import React from 'react'
import {IconProps} from "@shared/ui/icon/types";


/**
 * Тонкая обёртка над иконкой, импортированной напрямую из папки `icons`.
 *
 * @example
 * import HomeIcon from '@/shared/ui/icons/common/home.svg'
 * <Icon name={HomeIcon} size={24} color='var(--text-primary)' />
 */
export const Icon: React.FC<IconProps> = ({ name: IconSvg, size = 24, color, style, ...rest }) => {
  return (
    <IconSvg width={size} height={size} style={color ? { color, ...style } : style} {...rest} />
  )
}
