'use client'

import type { PolymorphicProps } from '../shared/polymorphic'
import { clsx } from 'clsx'
import { XIcon } from 'lucide-react'
import type { ElementType } from 'react'
import * as React from 'react'
import { createPortal } from 'react-dom'

export const PLACEMENTS = [
  'top',
  'right',
  'bottom',
  'left',
  'center',
  'top-start',
  'top-end',
  'bottom-start',
  'bottom-end'
] as const
export type Placement = (typeof PLACEMENTS)[number]

export type ScrollBehavior = 'inside' | 'outside'

type DialogContextValue = {
  open: boolean
  onOpenChange: (open: boolean) => void
  triggerRef: React.RefObject<HTMLElement | null>
  placement: Placement
  closeOnEsc: boolean
  closeOnBackdrop: boolean
  disableBackdrop: boolean
  noInTransition: boolean
  noOutTransition: boolean
  /** Whether to lock body scrolling while the dialog is open (default: true) */
  lockScroll: boolean
  scrollBehavior: ScrollBehavior
  /** Optional class applied to the outer dialog wrapper */
  className?: string
  /**
   * Callback fired once the dialog is fully closed and has been unmounted from the DOM.
   * Unlike `onOpenChange` (often referred to as `onClose`), this runs **after** the
   * exit animation finishes, making it ideal for cleanup logic that depends on the
   * dialog element being gone.
   */
  onClosed?: () => void
}

// Context
const DialogContext = React.createContext<DialogContextValue | null>(null)

const useDialog = () => {
  const context = React.useContext(DialogContext)
  if (!context) {
    throw new Error('Dialog components must be used within a Dialog')
  }
  return context
}

// Utilities
const useFocusTrap = (containerRef: React.RefObject<HTMLElement | null>, active: boolean) => {
  React.useEffect(() => {
    if (!active || !containerRef.current) return

    const container = containerRef.current
    const focusableElements = Array.from(
      container.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
    ) as HTMLElement[]

    const isElementInView = (el: HTMLElement) => {
      const elemRect = el.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()
      return elemRect.top >= containerRect.top && elemRect.bottom <= containerRect.bottom
    }

    const firstElement = focusableElements.find(isElementInView) || focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement?.focus({ preventScroll: true })
          e.preventDefault()
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement?.focus({ preventScroll: true })
          e.preventDefault()
        }
      }
    }

    container.addEventListener('keydown', handleTabKey)
    firstElement?.focus({ preventScroll: true })

    return () => {
      container.removeEventListener('keydown', handleTabKey)
    }
  }, [active, containerRef])
}

const useBodyScrollLock = (lock: boolean) => {
  React.useEffect(() => {
    if (!lock) return

    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth

    document.body.classList.add('!overflow-hidden')
    document.body.classList.add('!mr-[var(--scroll-bar-width)]')
    document.body.style.setProperty('--scroll-bar-width', `${scrollBarWidth}px`)

    return () => {
      document.body.classList.remove('!overflow-hidden')
      document.body.classList.remove('!mr-[var(--scroll-bar-width)]')
      document.body.style.removeProperty('--scroll-bar-width')
    }
  }, [lock])
}

// Main Dialog Component
interface DialogProps {
  children: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  placement?: Placement
  closeOnEsc?: boolean
  closeOnBackdrop?: boolean
  disableBackdrop?: boolean
  noInTransition?: boolean
  noOutTransition?: boolean
  scrollBehavior?: ScrollBehavior
  /** Whether to lock body scrolling while the dialog is open (default: true) */
  lockScroll?: boolean
  /** Optional class applied to the outer dialog wrapper */
  className?: string
  onClosed?: () => void
}

export function Dialog({
  children,
  open,
  defaultOpen = false,
  onOpenChange,
  onClosed,
  placement = 'center',
  closeOnEsc = true,
  closeOnBackdrop = true,
  disableBackdrop = false,
  noInTransition = false,
  noOutTransition = false,
  scrollBehavior = 'inside',
  lockScroll = true,
  className
}: DialogProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen)
  const triggerRef = React.useRef<HTMLElement | null>(null)

  const isControlled = open !== undefined
  const isOpen = isControlled ? open : internalOpen

  const handleOpenChange = React.useCallback(
    (newOpen: boolean) => {
      if (!isControlled) {
        setInternalOpen(newOpen)
      }
      onOpenChange?.(newOpen)
    },
    [isControlled, onOpenChange]
  )

  const contextValue = React.useMemo(
    () => ({
      open: isOpen,
      onOpenChange: handleOpenChange,
      triggerRef,
      placement,
      closeOnEsc,
      closeOnBackdrop,
      disableBackdrop,
      noInTransition,
      noOutTransition,
      lockScroll,
      scrollBehavior,
      className,
      onClosed
    }),
    [
      isOpen,
      handleOpenChange,
      placement,
      closeOnEsc,
      closeOnBackdrop,
      disableBackdrop,
      noInTransition,
      noOutTransition,
      lockScroll,
      scrollBehavior,
      className,
      onClosed
    ]
  )

  return <DialogContext.Provider value={contextValue}>{children}</DialogContext.Provider>
}

const DEFAULT_TRIGGER_ELEMENT = 'button'
type DialogTriggerProps<E extends ElementType = typeof DEFAULT_TRIGGER_ELEMENT> = PolymorphicProps<E>

export function DialogTrigger<E extends ElementType = typeof DEFAULT_TRIGGER_ELEMENT>({
  as,
  children,
  ...props
}: DialogTriggerProps<E>) {
  const { onOpenChange, triggerRef } = useDialog()
  const Component = as || DEFAULT_TRIGGER_ELEMENT

  return (
    <Component
      ref={triggerRef as unknown as React.Ref<HTMLButtonElement>}
      onClick={(event: React.MouseEvent<HTMLElement>) => {
        onOpenChange(true)
        props.onClick?.(event)
      }}
      {...props}>
      {children}
    </Component>
  )
}

// Dialog Content
interface DialogContentProps {
  children: React.ReactNode
  className?: string
}

export function DialogContent({ children, className: contentClassName }: DialogContentProps) {
  const {
    open,
    onOpenChange,
    placement,
    closeOnEsc,
    closeOnBackdrop,
    disableBackdrop,
    noInTransition,
    noOutTransition,
    triggerRef,
    scrollBehavior,
    lockScroll,
    className: outerClassName,
    onClosed
  } = useDialog()

  const [mounted, setMounted] = React.useState(false)
  const [dataState, setDataState] = React.useState<'open' | 'closed'>('closed')
  const contentRef = React.useRef<HTMLDivElement>(null)

  useFocusTrap(contentRef, open && mounted)
  useBodyScrollLock(mounted && lockScroll)

  // Handle mounting and animations
  React.useEffect(() => {
    if (open) {
      setMounted(true)
    } else {
      setDataState('closed')
    }
  }, [open])

  React.useEffect(() => {
    if (mounted) {
      const id = requestAnimationFrame(() => setDataState('open'))
      return () => cancelAnimationFrame(id)
    }
  }, [mounted])

  // Unmount component after exit animation completes
  React.useEffect(() => {
    const node = contentRef.current
    if (!node) return

    const handleAnimationEnd = (event: AnimationEvent | TransitionEvent) => {
      if (event.target === node && dataState === 'closed') {
        setMounted(false)
        onClosed?.()
      }
    }

    node.addEventListener('transitionend', handleAnimationEnd)
    node.addEventListener('animationend', handleAnimationEnd)
    return () => {
      node.removeEventListener('transitionend', handleAnimationEnd)
      node.removeEventListener('animationend', handleAnimationEnd)
    }
  }, [dataState, onClosed])

  // Handle keyboard events
  React.useEffect(() => {
    if (!mounted || !closeOnEsc) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onOpenChange(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [mounted, closeOnEsc, onOpenChange])

  React.useEffect(() => {
    if (!mounted || !closeOnBackdrop) return

    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node
      if (contentRef.current?.contains(target) || triggerRef.current?.contains(target)) return
      setTimeout(() => onOpenChange(false), 0)
    }

    document.addEventListener('click', handleClick, true)
    return () => document.removeEventListener('click', handleClick, true)
  }, [mounted, closeOnBackdrop, onOpenChange, triggerRef])

  if (!mounted) return null

  const content = (
    <>
      {!disableBackdrop && (
        <DialogBackdrop
          data-state={dataState}
          data-no-in-transition={noInTransition}
          data-no-out-transition={noOutTransition}
          className="dialog-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget && closeOnBackdrop) {
              onOpenChange(false)
            }
          }}
        />
      )}
      <div
        className={clsx('dialog', outerClassName)}
        data-state={dataState}
        data-placement={placement}
        data-scroll={scrollBehavior}
        data-disable-backdrop={disableBackdrop}
        data-no-in-transition={noInTransition}
        data-no-out-transition={noOutTransition}>
        <div
          ref={contentRef}
          className={clsx('dialog-content', contentClassName)}
          data-state={dataState}
          data-no-in-transition={noInTransition}
          data-no-out-transition={noOutTransition}
          role="dialog"
          aria-modal="true">
          {children}
        </div>
      </div>
    </>
  )

  return createPortal(content, document.body)
}

// Dialog Header
interface DialogHeaderProps {
  children: React.ReactNode
  className?: string
}

export function DialogHeader({ children, className }: DialogHeaderProps) {
  return <div className={clsx('dialog-header', className)}>{children}</div>
}

// Dialog Footer
interface DialogFooterProps {
  children: React.ReactNode
  className?: string
}

export function DialogFooter({ children, className }: DialogFooterProps) {
  return <div className={clsx('dialog-footer', className)}>{children}</div>
}

// Dialog Title
interface DialogTitleProps {
  children: React.ReactNode
  className?: string
}

export function DialogTitle({ children, className }: DialogTitleProps) {
  return <h2 className={clsx('dialog-title', className)}>{children}</h2>
}

interface DialogDescriptionProps {
  children: React.ReactNode
  className?: string
}

export function DialogDescription({ children, className }: DialogDescriptionProps) {
  return <p className={clsx('dialog-description', className)}>{children}</p>
}

const DEFAULT_CLOSE_ELEMENT = 'button'
type DialogCloseProps<E extends ElementType = typeof DEFAULT_CLOSE_ELEMENT> = PolymorphicProps<E>

export function DialogClose<E extends ElementType = typeof DEFAULT_CLOSE_ELEMENT>({
  as,
  children,
  ...props
}: DialogCloseProps<E>) {
  const { onOpenChange } = useDialog()
  const Component = as || DEFAULT_CLOSE_ELEMENT

  return (
    <Component
      onClick={(event: React.MouseEvent<HTMLElement>) => {
        onOpenChange(false)
        props.onClick?.(event)
      }}
      {...props}>
      {children}
    </Component>
  )
}

type DialogCloseIconProps = React.ComponentPropsWithoutRef<typeof DEFAULT_CLOSE_ELEMENT>
export function DialogCloseIcon({ className, ...props }: DialogCloseIconProps) {
  return (
    <DialogClose {...props}>
      <XIcon className={clsx('size-5', className)} />
    </DialogClose>
  )
}

interface DialogBackdropProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

function DialogBackdrop({ className, ...props }: DialogBackdropProps) {
  return <div className={clsx('dialog-backdrop', className)} {...props} />
}

DialogBackdrop.displayName = 'DialogBackdrop'

export { DialogBackdrop }
