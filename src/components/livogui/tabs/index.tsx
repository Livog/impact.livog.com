'use client'

import React, {
  createContext,
  use,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode,
  type RefObject
} from 'react'
import clsx from 'clsx'

type TabPosition = 'top' | 'right' | 'bottom' | 'left'
type TabAnimation = 'directional' | 'slide' | 'fade' | 'none'

type TabsContextValue = {
  activeValue: string
  previewValue: string | null
  changeTab: (next: string) => void
  setPreviewValue: (v: string | null) => void
  registerTab: (value: string) => number
  registerPanel: (value: string) => number
  nextAutoTabValue: () => string
  nextAutoPanelValue: () => string
  orderRef: RefObject<string[]>
  position: TabPosition
  animation: TabAnimation
  animateHeight: boolean
  equalHeight: boolean
  unmount: boolean
  rootRef: RefObject<HTMLDivElement | null>
  contentRef: RefObject<HTMLDivElement | null>
  valueProp?: string
  defaultValueProp?: string
}

const TabsContext = createContext<TabsContextValue | null>(null)
const useTabs = () => use(TabsContext) as TabsContextValue

const freezeContainerHeight = (rootRef: RefObject<HTMLDivElement | null>) => {
  const c = rootRef.current?.querySelector<HTMLDivElement>('.tab-content')
  if (!c) return

  heightObservers.get(c)?.disconnect()
  heightObservers.delete(c)
  targetCache.delete(c)

  c.style.height = `${c.offsetHeight}px`
}

export function Tabs({
  children,
  defaultValue,
  value: valueProp,
  onValueChange,
  position = 'top',
  animation = 'none',
  animateHeight = false,
  equalHeight = false,
  unmount = true,
  ...rest
}: {
  children: ReactNode
  defaultValue?: string
  value?: string
  onValueChange?: (v: string) => void
  position?: TabPosition
  animation?: TabAnimation
  animateHeight?: boolean
  equalHeight?: boolean
  unmount?: boolean
} & React.HTMLAttributes<HTMLDivElement>) {
  const orderRef = useRef<string[]>([])
  const panelOrderRef = useRef<string[]>([])

  const registerTab = useCallback((v: string) => {
    const i = orderRef.current.indexOf(v)
    if (i !== -1) return i
    orderRef.current.push(v)
    return orderRef.current.length - 1
  }, [])

  const registerPanel = useCallback((v: string) => {
    const i = panelOrderRef.current.indexOf(v)
    if (i !== -1) return i
    panelOrderRef.current.push(v)
    return panelOrderRef.current.length - 1
  }, [])

  const autoTabCounter = useRef(0)
  const autoPanelCounter = useRef(0)
  autoTabCounter.current = 0
  autoPanelCounter.current = 0
  const nextAutoTabValue = () => String(autoTabCounter.current++)
  const nextAutoPanelValue = () => String(autoPanelCounter.current++)

  const controlled = valueProp !== undefined

  const [controlledValue, setControlledValue] = useState(() => valueProp ?? '')
  const [uncontrolledValue, setUncontrolledValue] = useState(() => defaultValue ?? '')
  const [previewValue, setPreviewValue] = useState<string | null>(null)

  useEffect(() => {
    if (!controlled || valueProp === undefined || valueProp === controlledValue) return
    if (!animateHeight) {
      setControlledValue(valueProp)
      return
    }
    freezeContainerHeight(rootRef)
    setPreviewValue(valueProp)
    requestAnimationFrame(() => {
      setControlledValue(valueProp)
      setPreviewValue(null)
    })
  }, [valueProp, controlled, animateHeight, controlledValue])

  const updateActive = useCallback(
    (v: string) => {
      if (controlled) onValueChange?.(v)
      else {
        setUncontrolledValue(v)
        onValueChange?.(v)
      }
    },
    [controlled, onValueChange]
  )

  const currentActive = controlled ? controlledValue : uncontrolledValue

  const changeTab = useCallback(
    (next: string) => {
      if (next === currentActive) return
      const doPreview = animateHeight || unmount
      if (!doPreview) {
        updateActive(next)
        return
      }
      if (animateHeight) freezeContainerHeight(rootRef)
      setPreviewValue(next)
      requestAnimationFrame(() => {
        updateActive(next)
        setPreviewValue(null)
      })
    },
    [currentActive, animateHeight, unmount, updateActive]
  )

  const rootRef = useRef<HTMLDivElement | null>(null)
  const contentRef = useRef<HTMLDivElement | null>(null)

  return (
    <TabsContext.Provider
      value={{
        activeValue: currentActive,
        previewValue,
        changeTab,
        setPreviewValue,
        registerTab,
        registerPanel,
        nextAutoTabValue,
        nextAutoPanelValue,
        orderRef,
        position,
        animation,
        animateHeight,
        equalHeight,
        unmount,
        rootRef,
        contentRef,
        valueProp,
        defaultValueProp: defaultValue
      }}>
      <div
        {...rest}
        ref={rootRef}
        data-position={position}
        data-animation={animation}
        data-equal-height={equalHeight || undefined}
        className={clsx('tabs', rest.className)}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}

export function TabsList(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div role="tablist" className="tab-list" {...props} />
}

export function TabsTrigger({
  value: valueProp,
  children,
  className,
  ...rest
}: { value?: string; children: ReactNode } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const {
    activeValue,
    changeTab,
    orderRef,
    position,
    registerTab,
    valueProp: ctxValueProp,
    defaultValueProp: ctxDefaultValue,
    previewValue,
    nextAutoTabValue
  } = useTabs()

  const memoRef = useRef<{ value: string; index: number } | null>(null)
  if (!memoRef.current) {
    const provisional = valueProp ?? nextAutoTabValue()
    const idx = registerTab(provisional)
    memoRef.current = { value: provisional, index: idx }
  }
  const { value, index } = memoRef.current

  const isActive = useMemo(() => {
    if (previewValue) return previewValue === value
    if (activeValue) return activeValue === value
    if (ctxValueProp !== undefined) return ctxValueProp === value
    if (ctxDefaultValue !== undefined) return ctxDefaultValue === value
    return index === 0
  }, [previewValue, ctxValueProp, activeValue, ctxDefaultValue, index, value])

  const onKeyDown: React.KeyboardEventHandler<HTMLButtonElement> = (e) => {
    const order = orderRef.current
    const i = activeValue ? order.indexOf(activeValue) : 0
    const wrap = (n: number) => (n + order.length) % order.length
    const horiz = position === 'top' || position === 'bottom'
    const next: Record<string, () => void> = {
      ArrowLeft: () => horiz && changeTab(order[wrap(i - 1)]),
      ArrowRight: () => horiz && changeTab(order[wrap(i + 1)]),
      ArrowUp: () => !horiz && changeTab(order[wrap(i - 1)]),
      ArrowDown: () => !horiz && changeTab(order[wrap(i + 1)]),
      Home: () => changeTab(order[0]),
      End: () => changeTab(order[order.length - 1])
    }
    const fn = next[e.key]
    if (!fn) return
    e.preventDefault()
    fn()
  }

  return (
    <button
      role="tab"
      type="button"
      aria-selected={isActive}
      data-active={isActive}
      data-value={value}
      className={clsx('tab-trigger', className)}
      onClick={() => changeTab(value)}
      onKeyDown={onKeyDown}
      {...rest}>
      {children}
    </button>
  )
}

export function TabsContent({ children, className, ...rest }: ComponentPropsWithoutRef<'div'>) {
  const { activeValue, animateHeight, rootRef, contentRef } = useTabs()

  useEffect(() => {
    if (!animateHeight || !rootRef.current) return
    requestAnimationFrame(() => lockHeight(rootRef, activeValue))
  }, [activeValue, animateHeight, rootRef])

  return (
    <div ref={contentRef} className={clsx('tab-content', className)} {...rest}>
      {children}
    </div>
  )
}

type TabPanelProps = ComponentPropsWithoutRef<'div'> & { children: ReactNode; value?: string }

export function TabPanel({ children, className, value: valueProp, ...rest }: TabPanelProps) {
  const {
    unmount,
    orderRef,
    previewValue,
    activeValue,
    valueProp: ctxValueProp,
    defaultValueProp: ctxDefaultValue,
    registerPanel,
    nextAutoPanelValue,
    equalHeight,
    contentRef,
  } = useTabs()

  /* stable mapping ----------------------------------------------------- */
  const memoRef = useRef<{ value: string; index: number } | null>(null)
  if (!memoRef.current) {
    const slot = nextAutoPanelValue()
    const provisional = valueProp ?? orderRef.current[parseInt(slot, 10)] ?? slot
    const idx = registerPanel(provisional)
    memoRef.current = { value: provisional, index: idx }
  }
  const { value: derivedValue } = memoRef.current

  /* derived flags ------------------------------------------------------ */
  const isActive = useMemo(() => {
    if (previewValue) return previewValue === derivedValue
    if (activeValue) return activeValue === derivedValue
    if (ctxValueProp !== undefined) return ctxValueProp === derivedValue
    if (ctxDefaultValue !== undefined) return ctxDefaultValue === derivedValue
    return orderRef.current.indexOf(derivedValue) === 0
  }, [previewValue, ctxValueProp, activeValue, ctxDefaultValue, derivedValue, orderRef])

  const isPreview = previewValue === derivedValue

  const activeIdx = useMemo(() => {
    const val =
      previewValue ??
      (ctxValueProp !== undefined ? ctxValueProp : activeValue ?? ctxDefaultValue ?? '')
    const i = orderRef.current.indexOf(val)
    return i !== -1 ? i : /^\d+$/.test(val) ? parseInt(val, 10) : 0
  }, [previewValue, ctxValueProp, activeValue, ctxDefaultValue, orderRef])

  const myIdx = orderRef.current.indexOf(derivedValue)
  const state = myIdx === activeIdx ? 'active' : myIdx < activeIdx ? 'before' : 'after'

  /* lazy‑mount / unmount ---------------------------------------------- */
  const ref = useRef<HTMLDivElement>(null)
  const [showChildren, setShowChildren] = useState(isActive || isPreview)

  useEffect(() => {
    if (!unmount) { setShowChildren(true); return }
  
    if (isActive || isPreview) {           // entering panel stays mounted
      setShowChildren(true)
      return
    }
  
    const node = ref.current
    if (!node) return
  
    const cs      = getComputedStyle(node)
    const durs    = cs.transitionDuration.split(',').map(s => s.trim())
    const delays  = cs.transitionDelay.split(',').map(s => s.trim())
    const toMs    = (v: string) => (v.endsWith('ms') ? parseFloat(v) : parseFloat(v||'0')*1000)
    const longest = durs.reduce((m, d, i) => Math.max(m, toMs(d)+toMs(delays[i] ?? '0')), 0)
  
    const tidy = () => setShowChildren(false)

    if (longest === 0) {
      const raf = requestAnimationFrame(() => tidy())
      return () => cancelAnimationFrame(raf)
    }
  
    node.addEventListener('transitionend', tidy, { once: true })
    const timer = window.setTimeout(tidy, (longest || 100) + 50)
  
    return () => {
      node.removeEventListener('transitionend', tidy)
      clearTimeout(timer)
    }
  }, [isActive, isPreview, unmount])

  const shouldShow = showChildren || isActive || isPreview || equalHeight

  /* render ------------------------------------------------------------- */
  return (
    <div
      ref={ref}
      role="tabpanel"
      className={clsx('tab-panel', className)}
      data-state={state}
      data-value={derivedValue}
      data-active={isActive}
      onTransitionEnd={() => {
        if (isActive && contentRef.current) {
          contentRef.current.style.removeProperty('height')
        }
      }}
      {...rest}
    >
      {shouldShow ? children : null}
    </div>
  )
}


const heightObservers = new WeakMap<HTMLElement, ResizeObserver>()
const distanceCache = new WeakMap<HTMLElement, number>()
const targetCache = new WeakMap<HTMLElement, number>()

export function lockHeight(rootRef: RefObject<HTMLDivElement | null>, nextVal: string) {
  if (!rootRef.current) return
  const c = rootRef.current.querySelector<HTMLDivElement>('.tab-content')
  const p = rootRef.current.querySelector<HTMLDivElement>(`.tab-panel[data-value="${CSS.escape(nextVal)}"]`)
  if (!c || !p) return

  const to = p.scrollHeight
  if (targetCache.get(c) === to) return
  const from = c.offsetHeight
  if (from === to) return

  heightObservers.get(c)?.disconnect()

  const prev = c.style.transition
  c.style.height = `${from}px`

  const durStr = getComputedStyle(c).transitionDuration.split(',')[0].trim()
  const base = durStr.endsWith('ms') ? parseFloat(durStr) : parseFloat(durStr) * 1000
  const last = distanceCache.get(c) ?? Math.abs(from - to)
  const dur = Math.max(base * Math.min(Math.abs(from - to) / last, 1), 150)

  distanceCache.set(c, Math.abs(from - to))

  c.style.transition = prev || ''
  c.style.transitionDuration = `${dur}ms`
  c.style.height = `${to}px`
  targetCache.set(c, to)

  const tidy = () => {
    heightObservers.get(c)?.disconnect()
    targetCache.delete(c)
    c.style.height = ''
    c.style.removeProperty('transition-duration')
  }

  const ro = new ResizeObserver((e) => {
    for (const t of e) if (Math.abs((t.target as HTMLElement).offsetHeight - to) < 1) tidy()
  })
  ro.observe(c)
  heightObservers.set(c, ro)
}
