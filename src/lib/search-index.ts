import { unstable_cache } from "next/cache";
import { getBuildStats } from "./get-build-stats";
import { match } from "path-to-regexp";
export interface SearchEntry {
  kit: string;
  component: string;
  sizeUp: number;
}

async function computeSearch(): Promise<SearchEntry[]> {
  const stats = await getBuildStats({ routePattern: /^\/bundles\/ui\// });
  const baseline = stats.find((s) => s.route === "/base") ?? { route: "/base", firstLoad: 102194, chunks: [] };
  const pathMatcher = match("/bundles/ui/:kit/:component");

  return stats
    .filter((s) => s.route.startsWith("/bundles/ui/"))
    .map((s) => {
      const match = pathMatcher(s.route);
      if (!match) {
        return null;
      }
      const { kit, component } = match.params;
      const sizeUp = s.firstLoad - baseline.firstLoad;
      return {
        kit,
        component,
        sizeUp,
      };
    })
    .filter((s): s is SearchEntry => s !== null);
}

export const getSearchIndex = unstable_cache(computeSearch, ["search-index"]);
