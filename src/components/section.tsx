import type { ComponentPropsWithRef, ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

export const selectSpacingOptions = ['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge']

export const sectionVariants = cva('isolate block', {
  variants: {
    spacing: Object.fromEntries(selectSpacingOptions.map((option) => [option, ''])) as Record<
      (typeof selectSpacingOptions)[number],
      string
    >,
    hasBackground: {
      true: 'relative bg-[var(--section-background)] first:pt-18',
      false: 'first:mt-18'
    },
    accountForMask: {
      true: '',
      false: ''
    },
    compactToNext: {
      true: '',
      false: ''
    },
    compactToPrev: {
      true: '',
      false: ''
    }
  },
  compoundVariants: [
    // With background - padding
    { spacing: 'xxsmall', hasBackground: true, className: 'py-2 md:py-4' },
    { spacing: 'xsmall', hasBackground: true, className: 'py-4 md:py-8' },
    { spacing: 'small', hasBackground: true, className: 'py-8 md:py-16' },
    { spacing: 'medium', hasBackground: true, className: 'py-12 md:py-20' },
    { spacing: 'large', hasBackground: true, className: 'py-20 md:py-32' },
    { spacing: 'xlarge', hasBackground: true, className: 'py-24 md:py-36' },
    // Without background - margin
    { spacing: 'xxsmall', hasBackground: false, className: 'my-4 first:mt-18 md:my-8 md:first:mt-24' },
    { spacing: 'xsmall', hasBackground: false, className: 'my-6 first:mt-18 md:my-12 md:first:mt-24' },
    { spacing: 'small', hasBackground: false, className: 'my-8 first:mt-18 md:my-16 md:first:mt-24' },
    { spacing: 'medium', hasBackground: false, className: 'my-12 first:mt-18 md:my-20 md:first:mt-24' },
    { spacing: 'large', hasBackground: false, className: 'my-20 first:mt-18 md:my-32 md:first:mt-24' },
    { spacing: 'xlarge', hasBackground: false, className: 'my-24 first:mt-18 md:my-36 md:first:mt-24' },
    { spacing: 'xsmall', hasBackground: false, accountForMask: true, className: '[&:has(+[data-has-mask])]:mb-4 [[data-has-mask]+&]:mt-4' },
    { spacing: 'small', hasBackground: false, accountForMask: true, className: '[&:has(+[data-has-mask])]:mb-6 [[data-has-mask]+&]:mt-6' },
    { spacing: 'medium', hasBackground: false, accountForMask: true, className: '[&:has(+[data-has-mask])]:mb-8 [[data-has-mask]+&]:mt-8' },
    {
      spacing: 'large',
      hasBackground: false,
      accountForMask: true,
      className: '[&:has(+[data-has-mask])]:mb-10 [[data-has-mask]+&]:mt-10'
    },
    {
      spacing: 'xlarge',
      hasBackground: false,
      accountForMask: true,
      className: '[&:has(+[data-has-mask])]:mb-12 [[data-has-mask]+&]:mt-12'
    },
    // Compact spacing – separate margin (no background) vs padding (background)
    { compactToNext: true, hasBackground: true, className: 'pb-2 md:pb-2 [&+section]:pt-2' },
    { compactToNext: true, hasBackground: false, className: 'mb-2 md:mb-2 [&+section]:mt-2' },
    { compactToPrev: true, hasBackground: true, className: 'pt-2 md:pt-2 [section:has(+&)]:pb-2' },
    { compactToPrev: true, hasBackground: false, className: 'mt-2 md:mt-2 [section:has(+&)]:mb-2' }
  ],
  defaultVariants: {
    spacing: 'medium',
    hasBackground: false,
    accountForMask: true,
    compactToNext: false,
    compactToPrev: false
  }
})

export type SectionVariants = VariantProps<typeof sectionVariants>

type SectionProps = ComponentPropsWithRef<'section'> & SectionVariants & { background?: ReactNode | string }

export const Section = ({
  children,
  className,
  spacing,
  accountForMask = true,
  background,
  hasBackground,
  compactToNext,
  compactToPrev,
  ...props
}: SectionProps) => {
  const hasBackgroundClassName = typeof className === 'string' && /\bbg-[^\s]+/.test(className)
  const hasMaskClassName = typeof className === 'string' && /\bmask-[^\s]+/.test(className)

  const effectiveHasBackground = hasBackground || !!background || hasBackgroundClassName
  const effectiveHasMask = accountForMask && hasMaskClassName
  const style = { ...(props.style || {}) } as React.CSSProperties & { '--section-background'?: string }
  if (typeof background === 'string') {
    style['--section-background'] = background
  }

  return (
    <section
      data-has-background={effectiveHasBackground ? true : undefined}
      data-has-mask={effectiveHasMask ? true : undefined}
      className={cn(
        sectionVariants({ spacing, hasBackground: effectiveHasBackground, accountForMask, compactToNext, compactToPrev }),
        className
      )}
      style={style}
      {...props}
    >
      {typeof background !== 'string' ? background : null}
      {children}
    </section>
  )
}
