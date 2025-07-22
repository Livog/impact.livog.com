import { cva, type VariantProps } from 'class-variance-authority'
import clsx from 'clsx'
import type { ElementType } from 'react'
import type { PolymorphicProps } from '../shared/polymorphic'

const buttonVariants = cva('button', {
  variants: {
    variant: {
      default: 'button-default',
      destructive: 'button-destructive',
      outline: 'button-outline',
      secondary: 'button-secondary',
      ghost: 'button-ghost',
      link: 'button-link'
    },
    size: {
      default: '',
      xs: 'button-xs',
      sm: 'button-sm',
      lg: 'button-lg',
      icon: 'button-icon'
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'default'
  }
})


type ButtonOwnProps = VariantProps<typeof buttonVariants>

export type ButtonProps<E extends ElementType = 'button'> = PolymorphicProps<E, ButtonOwnProps>

const Button = <E extends ElementType = 'button'>({ as, className, variant, size, ...props }: ButtonProps<E>) => {
  const Component = as || 'button'
  return <Component className={clsx(buttonVariants({ variant, size, className }))} {...props} />
}

export { Button, buttonVariants }
