'use client'

import React, {
  createContext,
  use,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
  type RefObject
} from 'react'
import { createPortal } from 'react-dom'
import { clsx } from 'clsx'
import { type Side, type Align, usePopoverPosition } from './use-popover-position'

const focusableSelector =
  'a[href],button:not([disabled]),input:not([disabled]):not([type="hidden"]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'

const getFocusableElements = (container: HTMLElement): HTMLElement[] => {
  return Array.from(container.querySelectorAll<HTMLElement>(focusableSelector))
}

/** Focus the first focusable descendant of `container`, or the container itself. */
const focusFirstFocusable = (container: HTMLElement) => {
  const next = getFocusableElements(container)[0] ?? container
  next.focus({ preventScroll: true })
}

/** Two-frame focus helper – waits for the element to be fully rendered. */
const focusFirstFocusableNextFrame = (container: HTMLElement) => {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      focusFirstFocusable(container)
    })
  })
}

interface Refs {
  trigger: RefObject<HTMLElement | null>
  anchor: RefObject<HTMLElement | null>
  arrow: RefObject<HTMLElement | null>
}

interface Ctx {
  id: string
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  refs: Refs
  side: Side
  align: Align
  offset: number
  smart: boolean
  backdropClose: boolean
  escClose: boolean
}

const PopoverContext = createContext<Ctx | null>(null)

const usePopoverContext = () => {
  const ctx = use(PopoverContext)
  if (!ctx) throw new Error('Component must be inside <Popover>')
  return ctx
}

interface PopoverProps {
  children: ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  side?: Side
  align?: Align
  offset?: number
  smart?: boolean
  backdropClose?: boolean
  escClose?: boolean
}

type ValueOrUpdater<T> = T | ((prev: T) => T)

/**
 * Generic controlled/uncontrolled value hook – mirrors React state API while
 * supporting a `value` / `defaultValue` pattern.
 */
function useControllableState<T>(controlledValue: T | undefined, defaultValue: T, onChange?: (value: T) => void) {
  const isControlled = controlledValue !== undefined
  const [internalValue, setInternalValue] = useState(defaultValue)

  const value = isControlled ? (controlledValue as T) : internalValue

  const setValue = useCallback(
    (next: ValueOrUpdater<T>) => {
      const newValue = typeof next === 'function' ? (next as (prev: T) => T)(value) : next

      if (!isControlled) setInternalValue(newValue)
      onChange?.(newValue)
    },
    [isControlled, value, onChange]
  )

  return [value, setValue] as const
}

export const Popover = ({
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  side = 'bottom',
  align = 'center',
  offset = 6,
  smart = true,
  backdropClose = true,
  escClose = true
}: PopoverProps): ReactElement => {
  const id = `popover-${useId().replace(/[:«»]/g, '')}`

  const [open, setOpen] = useControllableState(controlledOpen, defaultOpen, onOpenChange)

  const trigger = useRef<HTMLElement>(null)
  const anchor = useRef<HTMLElement>(null)
  const arrow = useRef<HTMLElement>(null)
  const refs = useMemo<Refs>(() => ({ trigger, anchor, arrow }), [])

  const ctxValue = useMemo<Ctx>(
    () => ({
      id,
      open,
      setOpen,
      refs,
      side,
      align,
      offset,
      smart,
      backdropClose,
      escClose
    }),
    [id, open, setOpen, refs, side, align, offset, smart, backdropClose, escClose]
  )

  return (
    <PopoverContext.Provider value={ctxValue}>
      <div className="popover">{children}</div>
    </PopoverContext.Provider>
  )
}

interface TriggerProps extends React.ComponentPropsWithRef<'button'> {
  as?: React.ElementType
}

export const PopoverTrigger = ({
  as: Comp = 'button',
  children,
  className = 'button button-outline',
  ...rest
}: TriggerProps): ReactElement => {
  const { id, setOpen, refs } = usePopoverContext()

  return (
    <Comp
      ref={refs.trigger}
      aria-controls={id}
      aria-haspopup="dialog"
      onClick={() => setOpen((prev) => !prev)}
      onKeyDown={(e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          setOpen((prev) => !prev)
        }
      }}
      className={clsx('popover-trigger', className)}
      {...rest}>
      {children}
    </Comp>
  )
}

interface AnchorProps extends React.ComponentPropsWithRef<'span'> {
  as?: React.ElementType
}

export const PopoverAnchor = ({ as: Comp = 'span', children, className, ...rest }: AnchorProps): ReactElement => {
  const { refs } = usePopoverContext()

  return (
    <Comp ref={refs.anchor} className={clsx('popover-anchor', className)} {...rest}>
      {children}
    </Comp>
  )
}

interface ContentProps extends React.ComponentPropsWithRef<'div'> {
  as?: React.ElementType
}

export const PopoverContent = ({ as: Comp = 'div', children, className, style, ...rest }: ContentProps): ReactElement | null => {
  const { id, open, setOpen, refs, side, align, offset, smart, backdropClose, escClose } = usePopoverContext()

  const referenceRef = refs.anchor.current ? refs.anchor : refs.trigger

  const { dialogRef, setDialogRef, openPopover, closePopover } = usePopoverPosition({
    open,
    refs,
    side,
    align,
    offset,
    smart
  })

  const [mounted, setMounted] = useState(open)
  const previouslyFocused = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (open) setMounted(true)
  }, [open])

  useEffect(() => {
    const el = dialogRef.current
    if (!el || !mounted) return

    if (open) {
      previouslyFocused.current = document.activeElement as HTMLElement | null
      openPopover()

      focusFirstFocusableNextFrame(el)
    } else {
      closePopover(() => {
        setMounted(false)
        previouslyFocused.current?.focus()
      })
    }

    if (!open) return

    // Use capture phase so we reliably catch events before other handlers stopPropagation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && escClose) {
        setOpen(false)
        return
      }
      if (e.key === 'Tab') {
        const tabbables = getFocusableElements(el)
        if (tabbables.length === 0) {
          e.preventDefault()
          el.focus()
          return
        }
        const first = tabbables[0]
        const last = tabbables[tabbables.length - 1]
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault()
            last.focus()
          }
        } else if (document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    const handleClick = (e: MouseEvent) => {
      if (!backdropClose || !open) return
      const target = e.target as Node
      if (el.contains(target) || referenceRef.current?.contains(target)) return

      setTimeout(() => setOpen(false), 0)
    }

    addEventListener('keydown', handleKeyDown, true)
    addEventListener('click', handleClick, true)

    return () => {
      removeEventListener('keydown', handleKeyDown, true)
      removeEventListener('click', handleClick, true)
    }
  }, [open, setOpen, mounted, referenceRef, escClose, backdropClose, openPopover, closePopover, dialogRef])

  useEffect(() => {
    return () => {
      closePopover()
      previouslyFocused.current?.focus()
    }
  }, [closePopover])

  if (!mounted) return null

  return createPortal(
    <Comp ref={setDialogRef} id={id} role="dialog" tabIndex={-1} className="popover-wrapper" {...rest}>
      <div data-align={align} data-side={side} style={style} className={clsx('popover-content border-base-300 bg-base-100', className)}>
        {children}
      </div>
    </Comp>,
    document.body
  )
}

export const PopoverArrow = ({ className, ...props }: React.ComponentPropsWithRef<'span'>) => {
  const { refs } = usePopoverContext()

  return <span ref={refs.arrow} className={clsx('popover-arrow', className)} data-popover-arrow {...props} />
}
