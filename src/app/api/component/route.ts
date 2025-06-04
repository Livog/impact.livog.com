import { NextResponse } from 'next/server'
import { getSearchIndex } from '@/lib/search-index'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const name = (searchParams.get('component') || '').toLowerCase().trim()
  const exact = searchParams.get('exactMatch')
  const exactMatch = exact === 'true' || exact === '1'

  if (!name) {
    return NextResponse.json([])
  }

  const index = await getSearchIndex()
  const filtered = index.filter(
    (entry) => entry.type === 'ui' && (exactMatch ? entry.path[1].toLowerCase() === name : entry.path[1].toLowerCase().includes(name))
  )

  return NextResponse.json(filtered)
}
