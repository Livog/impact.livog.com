import { getBuildStats } from "@/lib/get-build-stats";
import { pathToRegexp } from "path-to-regexp";

function formatKB(bytes: number) {
  return `${(bytes / 1024).toFixed(1)} kB`;
}

function trimRoutePrefix(route: string, trimPrefix: string | string[] | false): string {
  if (trimPrefix === false) {
    return route;
  }
  
  if (typeof trimPrefix === "string") {
    return route.startsWith(trimPrefix) ? route.slice(trimPrefix.length) : route;
  }
  
  for (const prefix of trimPrefix) {
    if (route.startsWith(prefix)) {
      return route.slice(prefix.length);
    }
  }
  
  return route;
}

export interface ImpactTableProps {
  /**
   * Route filter.
   * - If RegExp: used directly.
   * - If string: treated as glob (e.g., "/shadcn/*") where * is a wildcard.
   */
  routePattern?: RegExp | string;
  /** Baseline route to subtract */
  baselineRoute?: string;
  /** Trim the prefix from the route */
  trimPrefix?: string | string[] | false;
}

export async function ImpactTable({
  routePattern,
  baselineRoute = "/base",
  trimPrefix = false,
}: ImpactTableProps) {
  const regexPattern =
    typeof routePattern === "string"
      ? (pathToRegexp(routePattern).regexp as RegExp)
      : routePattern;

  const stats = await getBuildStats({ routePattern: regexPattern });

  if (!stats.length) {
    return <p className="p-4">No matching routes found.</p>;
  }

  const baseline = stats.find((s) => s.route === baselineRoute) ?? stats[0];

  const rows = stats
    .filter((s) => s.route !== baseline.route)
    .sort((a, b) => b.firstLoad - a.firstLoad);

  return (
    <table className="w-full text-sm border-collapse">
      <thead>
        <tr>
          <th className="text-left pb-2">Route</th>
          <th className="text-right pb-2">First Load JS</th>
          <th className="text-right pb-2">Δ vs {baseline.route}</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.route} className="border-t">
            <td className="py-2 pr-4 font-mono">{trimRoutePrefix(r.route, trimPrefix)}</td>
            <td className="py-2 text-right">{formatKB(r.firstLoad)}</td>
            <td className="py-2 text-right font-medium">
              {formatKB(r.firstLoad - baseline.firstLoad)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
