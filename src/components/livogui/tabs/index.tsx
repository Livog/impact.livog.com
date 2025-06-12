'use client'

import React, { createContext, useContext, type ComponentPropsWithRef, type ReactNode } from 'react'
import clsx from 'clsx'

interface TabsCtx {
  id: string
  value: string
  orientation: 'horizontal' | 'vertical'
  rootRef: React.RefObject<HTMLDivElement | null>
  setValue: (val: string) => void
  registerTrigger: (val?: string) => { value: string; index: number }
  registerPanel: (val?: string, el?: HTMLDivElement | null) => { value: string; index: number }
}

type BaseProps = Omit<ComponentPropsWithRef<'div'>, 'onChange'>

const TabsContext = createContext<TabsCtx | null>(null)

const useTabs = () => {
