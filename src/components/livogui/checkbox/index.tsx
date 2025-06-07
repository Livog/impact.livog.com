"use client"

import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentPropsWithRef } from 'react'
import { useState } from 'react'
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

export type CheckboxProps = Omit<ComponentPropsWithRef<'input'>, 'size' | 'checked' | 'onChange'> & 
  VariantProps<typeof checkboxVariants> & {
    checked?: boolean
    defaultChecked?: boolean
    onChange?: (checked: boolean) => void
  }

const Checkbox = ({ 
  className, 
  size, 
  color, 
  checked: controlledChecked,
  defaultChecked = false,
  onChange,
  ...props 
}: CheckboxProps) => {
  const isControlled = controlledChecked !== undefined
  const [internalChecked, setInternalChecked] = useState<boolean>(defaultChecked)
  
  const checked = isControlled ? controlledChecked : internalChecked

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = event.target.checked
    
    if (!isControlled) {
      setInternalChecked(newChecked)
    }
    onChange?.(newChecked)
  }

  return (
    <input 
      type="checkbox" 
      checked={checked}
      onChange={handleChange}
      className={clsx(checkboxVariants({ size, color, className }))} 
      {...props} 
    />
  )
}

export { Checkbox }
