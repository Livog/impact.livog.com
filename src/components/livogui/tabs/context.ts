'use client'

import { createContext, use } from "react"

interface TabContext {
  id: string
  active: string
  setActive: (v: string) => void
  orientation: 'horizontal' | 'vertical'
  order: string[]
}
export const TabsContext = createContext<TabContext | null>(null)

export const useTabs = () => {
  const ctx = use(TabsContext)
  if (!ctx) throw new Error('Tabs.* must be used inside <Tabs>')
  return ctx
}