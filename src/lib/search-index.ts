import { unstable_cache } from "next/cache";
import { getBuildStats } from "./get-build-stats";

export interface SearchEntry {
  kit: string;
  component: string;
  sizeUp: number;
}

async function computeSearch(): Promise<SearchEntry[]> {
  const stats = await getBuildStats({ routePattern: /^\/bundles\/ui\// });
  const baseline = stats.find((s) => s.route === "/base") ?? stats[0];
  return stats
    .filter((s) => s.route.startsWith("/bundles/ui/"))
    .map((s) => {
      const parts = s.route.split("/");
      const kit = parts[3];
      const component = parts[4];
      return {
        kit,
        component,
        sizeUp: s.firstLoad - baseline.firstLoad,
      };
    });
}

export const getSearchIndex = unstable_cache(computeSearch, ["search-index"]);
