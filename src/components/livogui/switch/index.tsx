import { useId, type CSSProperties, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import clsx from 'clsx'

export type SwitchProps = Omit<ComponentPropsWithoutRef<'input'>, 'size'> & {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  enabledIcon?: ReactNode
  disabledIcon?: ReactNode
}

export function Switch({
  size = 'sm',
  disabled = false,
  id,
  className,
  style: styleProp,
  checked,
  defaultChecked,
  enabledIcon,
  disabledIcon,
  ...props
}: SwitchProps) {
  const autoId = useId()
  const generatedId = id ?? autoId
  const style: CSSProperties = { ...(styleProp ?? {}) }

  const sizeValues = {
    xs: '1rem',
    sm: '1.25rem',
    md: '1.5rem',
    lg: '1.875rem',
    xl: '2rem'
  }

  const sizeValue = sizeValues[size] ?? sizeValues.md
  if (size !== 'md') style['--size'] = sizeValue

  const controlProps = checked !== undefined ? { checked } : { defaultChecked }

  if (enabledIcon || disabledIcon) {
    return (
      <label htmlFor={generatedId} className={clsx('switch', className)} style={style}>
        <input
          type="checkbox"
          id={generatedId}
          disabled={disabled}
          {...props}
          {...controlProps}
        />
        {disabledIcon}
        {enabledIcon}
      </label>
    )
  }

  return (
    <input
      type="checkbox"
      id={generatedId}
      className={clsx('switch peer', className)}
      disabled={disabled}
      style={style}
      {...props}
      {...controlProps}
    />
  )
}

export default Switch
