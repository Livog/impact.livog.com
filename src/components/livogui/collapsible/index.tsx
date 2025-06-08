'use client'

import React, { useId, use } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import clsx from 'clsx'

import { AccordionContext } from '@/components/livogui/accordion/use-accordion'

const cvaCollapsibleContent = cva('collapsible-content', {
  variants: {
    animation: {
      fade: 'collapsible-content-fade',
      'scale-fade': 'collapsible-content-scale-fade',
      none: ''
    }
  }
})

interface Ctx {
  id: string
  openByDefault: boolean
  animation?: CollapsibleProps['animation']
}

export type CollapsibleProps = React.ComponentPropsWithRef<'div'> &
  VariantProps<typeof cvaCollapsibleContent> & {
    className?: string
    openByDefault?: boolean
    duration?: number
  }

const Collapsible: React.FC<CollapsibleProps> = ({
  children,
  className,
  openByDefault = false,
  animation,
  ...props
}) => {
  const id = useId()
  const ctx: Ctx = { id, openByDefault, animation }

  const mappedChildren = React.Children.map(children, (child) =>
    React.isValidElement(child) ? React.cloneElement(child as React.ReactElement<Record<string, unknown>>, { ctx } as Record<string, unknown>) : child
  )

  return (
    <div className={clsx('collapsible', className)} {...props}>
      {mappedChildren}
    </div>
  )
}
Collapsible.displayName = 'Collapsible'

export type CollapsibleTriggerProps = Omit<React.ComponentPropsWithRef<'label'>, 'id'> & {
  ctx?: Ctx
  id?: string
  openByDefault?: boolean
}

const CollapsibleTrigger: React.FC<CollapsibleTriggerProps> = ({
  ctx,
  id,
  children,
  className,
  openByDefault,
  ...props
}) => {
  const accordionContext = use(AccordionContext)
  const isWithinAccordion = Boolean(accordionContext)

  const checkboxForSingle = isWithinAccordion && accordionContext!.type === 'single' && accordionContext!.collapsible

  const inputType: 'radio' | 'checkbox' = (() => {
    if (!isWithinAccordion) return 'checkbox'
    if (accordionContext!.type === 'multiple') return 'checkbox'
    return checkboxForSingle ? 'checkbox' : 'radio'
  })()

  const inputName = isWithinAccordion ? accordionContext!.accordionId : undefined

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!isWithinAccordion) return

    const { type: accordionType, collapsible } = accordionContext!
    const target = e.target as HTMLInputElement
    const group = document.getElementsByName(target.name)

    if (accordionType === 'single') {
      if (!collapsible || !target.checked) return

      group.forEach((el) => {
        if (el instanceof HTMLInputElement && el !== target) {
          el.checked = false
        }
      })
      return
    }

    if (collapsible) return

    const anyOtherChecked = Array.from(group).some(
      (el) => el instanceof HTMLInputElement && el !== target && (el as HTMLInputElement).checked
    )

    if (!target.checked && !anyOtherChecked) target.checked = true
  }

  return (
    <>
      <input
        type={inputType}
        name={inputName}
        id={id || ctx?.id}
        className="peer sr-only"
        defaultChecked={openByDefault ?? ctx?.openByDefault}
        onChange={handleChange}
      />
      <label
        id={`${id || ctx?.id}-trigger`}
        htmlFor={id || ctx?.id}
        className={clsx('collapsible-trigger', className)}
        role="button"
        tabIndex={0}
        aria-controls={`${id || ctx?.id}-content`}
        aria-expanded={openByDefault ?? ctx?.openByDefault ?? false}
        {...props}
      >
        {children}
      </label>
    </>
  )
}
CollapsibleTrigger.displayName = 'CollapsibleTrigger'

export type CollapsibleContentProps = React.ComponentPropsWithoutRef<'div'> & {
  ctx?: Ctx
  innerClassName?: string
} & VariantProps<typeof cvaCollapsibleContent>

const CollapsibleContent: React.FC<CollapsibleContentProps> = ({
  ctx,
  children,
  className,
  innerClassName,
  animation,
  ...props
}) => {
  const contentId = ctx?.id ? `${ctx.id}-content` : undefined
  const labelledBy = ctx?.id ? `${ctx.id}-trigger` : undefined

  return (
    <div
      id={contentId}
      role="region"
      aria-labelledby={labelledBy}
      className={clsx(
        cvaCollapsibleContent({
          animation: animation ?? ctx?.animation ?? 'scale-fade'
        }),
        className
      )}
      {...props}
    >
      <div className={clsx('min-h-0', innerClassName)}>{children}</div>
    </div>
  )
}
CollapsibleContent.displayName = 'CollapsibleContent'

export { Collapsible, CollapsibleContent, CollapsibleTrigger }
