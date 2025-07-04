import React from 'react'
import type { dynamicIconImports as LucideIcons } from 'lucide-react/dynamic'

type LucideIcon = keyof typeof LucideIcons

interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'name' | 'size'> {
  name: LucideIcon
  size?: number | string
}

export const Icon = ({ name, className, size = '1em', ...props }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      className={className}
      {...props}
    >
      <use href={`#icon-${name}`} />
    </svg>
  )
} 