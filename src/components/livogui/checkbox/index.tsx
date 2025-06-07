import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentPropsWithRef } from 'react'
import clsx from 'clsx'

const checkboxVariants = cva('checkbox', {
  variants: {
    size: {
      xs: 'checkbox-xs',
      sm: 'checkbox-sm',
      md: 'checkbox-md',
      lg: 'checkbox-lg'
    },
    color: {
      primary: 'checkbox-primary',
      secondary: 'checkbox-secondary',
      accent: 'checkbox-accent',
      destructive: 'checkbox-destructive',
      success: 'checkbox-success',
      warning: 'checkbox-warning',
      info: 'checkbox-info',
      error: 'checkbox-error'
    }
  },
  defaultVariants: {
    size: 'sm',
    color: 'primary'
  }
})

export type CheckboxProps = Omit<ComponentPropsWithRef<'input'>, 'size'> & VariantProps<typeof checkboxVariants>

const Checkbox = ({ className, size, color, ...props }: CheckboxProps) => (
  <input type="checkbox" className={clsx(checkboxVariants({ size, color, className }))} {...props} />
)

export { Checkbox }
