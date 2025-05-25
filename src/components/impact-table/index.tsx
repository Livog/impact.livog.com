import { getBuildStats } from '@/lib/get-build-stats'
import { pathToRegexp } from 'path-to-regexp'
import { ImpactTableClient, type ImpactRow } from './client'

function trimRoutePrefix(route: string, trimPrefix: string | string[] | false): string {
  if (trimPrefix === false) {
    return route
  }

  if (typeof trimPrefix === 'string') {
    return route.startsWith(trimPrefix) ? route.slice(trimPrefix.length) : route
  }

  for (const prefix of trimPrefix) {
    if (route.startsWith(prefix)) {
      return route.slice(prefix.length)
    }
  }

  return route
}

export interface ImpactTableProps {
  /**
   * Route filter.
   * - If RegExp: used directly.
   * - If string: treated as glob (e.g., "/shadcn/*") where * is a wildcard.
   */
  routePattern?: RegExp | string
  /** Baseline route to subtract */
  baselineRoute?: string
  /** Trim the prefix from the route */
  trimPrefix?: string | string[] | false
}

export async function ImpactTable({ routePattern, baselineRoute = '/base', trimPrefix = false }: ImpactTableProps) {
  const regexPattern = typeof routePattern === 'string' ? (pathToRegexp(routePattern).regexp as RegExp) : routePattern

  const stats = await getBuildStats({ routePattern: regexPattern })

  if (!stats.length) {
    return <p className="p-4">No matching routes found.</p>
  }

  const baseline = stats.find((s) => s.route === baselineRoute) ?? stats[0]

  const rows: ImpactRow[] = stats
    .filter((s) => s.route !== baseline.route)
    .map((s) => ({
      name: trimRoutePrefix(s.route, trimPrefix),
      bundle: s.firstLoad,
      delta: s.firstLoad - baseline.firstLoad
    }))
    .sort((a, b) => a.name.localeCompare(b.name))

  return <ImpactTableClient data={rows} deltaLabel={baseline.route} />
}
