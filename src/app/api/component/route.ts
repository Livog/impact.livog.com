import { NextResponse } from 'next/server'
import { getSearchIndex } from '@/lib/search-index'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const rawComponents = searchParams.getAll('component')
  const names = rawComponents
    .flatMap((c) => c.split(',').map((n) => n.toLowerCase().trim()))
    .filter(Boolean)
  const exact = searchParams.get('exactMatch')
  const exactMatch = exact === 'true' || exact === '1'

  if (!names.length) {
    return NextResponse.json([])
  }

  const index = await getSearchIndex()
  const filtered = index.filter((entry) => {
    if (entry.type !== 'ui') return false
    const componentName = entry.path[1].toLowerCase()
    return exactMatch
      ? names.includes(componentName)
      : names.some((n) => componentName.includes(n))
  })

  return NextResponse.json(filtered)
}
