'use client'

import Link from 'next/link'
import { SearchButton } from './search-button'
import { Container } from './container'
import { appConfig } from '@/config/app'

export function Header() {
  return (
    <header className="border-grid bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b py-2 backdrop-blur">
      <Container className="flex h-12 items-center gap-4">
        <Link href="/" className="text-xl font-bold">
          UI Impact
        </Link>
        <div className="mx-auto max-w-md flex-1">
          <SearchButton />
        </div>
        <Link href={appConfig.social.x} target="_blank" className="text-muted-foreground hover:text-foreground"></Link>
      </Container>
    </header>
  )
}
