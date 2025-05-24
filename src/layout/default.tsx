import type { ReactNode } from 'react'

interface DefaultLayoutProps {
  children: ReactNode
}

export function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <header className="sticky top-0 z-2 h-0 w-full text-black dark:text-white">{/* Header content will go here */}</header>
      <main className="grow">{children}</main>
      <footer>{/* Footer content will go here */}</footer>
    </div>
  )
}
