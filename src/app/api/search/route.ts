import { NextResponse } from 'next/server'
import { getSearchIndex } from '@/lib/search-index'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const q = (searchParams.get('q') || '').toLowerCase()
  const tokens = q.split(/\s+/).filter(Boolean)
  const data = await getSearchIndex()
  const filtered = tokens.length ? data.filter((item) => tokens.every((t) => item.path.join(' ').toLowerCase().includes(t))) : []
  return NextResponse.json(filtered)
}
