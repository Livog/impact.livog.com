'use client'

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverAnchor, PopoverContent } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import useSWR from 'swr'
import { Badge } from './ui/badge'

export interface SearchResult {
  type: 'ui' | 'general'
  path: string[]
  sizeUp: number
}

interface SearchCommandProps {
  placeholder?: string
  className?: string
  onSelect?: (result: SearchResult) => void
}

export function SearchCommand({ placeholder = 'Search components...', onSelect }: SearchCommandProps) {
  const [query, setQuery] = useState('')
  const controllerRef = useRef<AbortController | null>(null)

  const fetcher = useCallback(async (url: string) => {
    controllerRef.current?.abort()
    controllerRef.current = new AbortController()
    const res = await fetch(url, { signal: controllerRef.current.signal })
    if (!res.ok) throw new Error('Request failed')
    return (await res.json()) as SearchResult[]
  }, [])

  const { data: results = [], isLoading } = useSWR<SearchResult[]>(query ? `/api/search?q=${encodeURIComponent(query)}` : null, fetcher, {
    keepPreviousData: Boolean(query)
  })

  useEffect(() => () => controllerRef.current?.abort(), [])

  const router = useRouter()

  const handleSelect = (result: SearchResult) => {
    onSelect?.(result)
    if (!onSelect) router.push(`/${result.type}/${result.path.join('/')}`)
    setQuery('')
  }

  const handleInputChange = (value: string) => {
    setQuery(value)
  }

  const memoizedResults = useMemo(() => {
    if (results.length === 0) return <CommandEmpty>No results found.</CommandEmpty>

    return (
      <CommandGroup heading="Results">
        {results.map((r) => (
          <CommandItem key={r.path.join('/')} value={r.path.join('/')} onSelect={() => handleSelect(r)}>
            <span>
              <Badge
                variant="default"
                className={cn(r.type === 'ui' && 'bg-blue-500/10 text-blue-400', r.type === 'general' && 'bg-green-500/10 text-green-400')}>
                {r.type}
              </Badge>{' '}
              {r.path.map((p) => (
                <span key={p} className="before:text-muted-foreground before:mx-1 before:content-['/'] first:before:content-['']">
                  {p}
                </span>
              ))}
            </span>
            <span className="text-muted-foreground ml-auto text-xs tabular-nums">{(r.sizeUp / 1024).toFixed(1)} kB</span>
          </CommandItem>
        ))}
      </CommandGroup>
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results])

  return (
    <Command>
      <Popover open={Boolean(query)} modal={false}>
        <PopoverAnchor asChild className="bg-background">
          <div>
            <CommandInput
              data-slot="command-input"
              className={cn(
                `h-11 w-full bg-background`
              )}
              placeholder={placeholder}
              value={query}
              onValueChange={handleInputChange}
            />
            <Loader2 className={cn('absolute right-2 top-1/2 -translate-y-1/2 hidden text-muted-foreground size-4 shrink-0 animate-spin', isLoading && 'inline-flex')} />
          </div>
        </PopoverAnchor>
        <PopoverContent
          asChild
          align="center"
          sideOffset={4}
          className="w-[var(--radix-popper-anchor-width)] p-0"
          onOpenAutoFocus={(e) => e.preventDefault()}
          onCloseAutoFocus={(e) => e.preventDefault()}>
          <CommandList>{query && memoizedResults}</CommandList>
        </PopoverContent>
      </Popover>
    </Command>
  )
}
