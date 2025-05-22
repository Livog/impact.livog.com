import { promises as fs } from "node:fs";
import path from "node:path";
import { unstable_cache } from "next/cache";

export interface UiKitInfo {
  name: string;
  components: string[];
}

async function computeIndex(): Promise<UiKitInfo[]> {
  const base = path.join(process.cwd(), "src/app/bundles/ui");
  const kits = await fs.readdir(base);
  const result: UiKitInfo[] = [];
  for (const kit of kits) {
    const kitDir = path.join(base, kit);
    const entries = await fs.readdir(kitDir);
    const components: string[] = [];
    for (const entry of entries) {
      const stat = await fs.stat(path.join(kitDir, entry));
      if (stat.isDirectory()) components.push(entry);
    }
    result.push({ name: kit, components });
  }
  return result;
}

export const getUiIndex = unstable_cache(computeIndex, ["ui-index"]);
