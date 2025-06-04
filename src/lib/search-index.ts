import { unstable_cache } from 'next/cache'
import { getBuildStats } from './get-build-stats'
import { match } from 'path-to-regexp'
export interface SearchEntry {
  type: 'ui' | 'form' | 'general'
  path: string[]
  sizeUp: number
}

async function computeSearch(): Promise<SearchEntry[]> {
  const stats = await getBuildStats({ routePattern: '/bundles/*path' })
  const baseline = stats.find((s) => s.route === '/base') ?? { route: '/base', firstLoad: 102194, chunks: [] }

  const uiMatcher = match('/bundles/ui/:kit/:component')
  const formMatcher = match('/bundles/form/:lib')
  const generalMatcher = match('/bundles/:category/:component')

  return stats
    .filter((s) => s.route.startsWith('/bundles/'))
    .map((s) => {
      const uiMatch = uiMatcher(s.route)
      if (uiMatch) {
        const { kit, component } = uiMatch.params
        const sizeUp = s.firstLoad - baseline.firstLoad
        return {
          type: 'ui',
          path: [kit, component],
          sizeUp
        }
      }

      const formMatch = formMatcher(s.route)
      if (formMatch) {
        const { lib } = formMatch.params
        const sizeUp = s.firstLoad - baseline.firstLoad
        return {
          type: 'form',
          path: [lib],
          sizeUp
        }
      }

      const generalMatch = generalMatcher(s.route)
      if (generalMatch) {
        const { category, component } = generalMatch.params
        const sizeUp = s.firstLoad - baseline.firstLoad
        return {
          type: 'general',
          path: [category, component],
          sizeUp
        }
      }

      return null
    })
    .filter((s): s is SearchEntry => s !== null)
}

export const getSearchIndex = unstable_cache(computeSearch, ['search-index'])
