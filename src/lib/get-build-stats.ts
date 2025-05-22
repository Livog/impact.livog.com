import { promises as fs } from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

export interface RouteStats {
  route: string;
  firstLoad: number; // gzipped bytes
  chunks: string[];
}

// Reads and parses a JSON file.
async function readJson<T = unknown>(filePath: string): Promise<T> {
  const raw = await fs.readFile(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

// Gzips a file and returns its compressed size in bytes.
async function gzipSizeOf(filePath: string): Promise<number> {
  const buf = await fs.readFile(filePath);
  return zlib.gzipSync(buf).length;
}

// Converts the internal route key from the build manifest to the public route path.
function resolveRoutePath(routeKey: string, pathManifest: Record<string, string>): string {
  if (routeKey in pathManifest) return pathManifest[routeKey]!;
  if (routeKey === "/page") return "/";
  return routeKey.replace(/\/page$/, "");
}

// Calculates total gzipped size for the given chunk list.
async function totalGzippedSize(chunks: string[], buildDir: string): Promise<number> {
  const sizes = await Promise.all(
    chunks.map((relative) => gzipSizeOf(path.join(buildDir, relative)))
  );
  return sizes.reduce((a, b) => a + b, 0);
}

export type BuildStatsOptions = {
  /** Only include routes that match this RegExp */
  routePattern?: RegExp;
  /** Skip layout routes, default true */
  skipLayouts?: boolean;
};

export async function getBuildStats({
  routePattern,
  skipLayouts = true,
}: BuildStatsOptions = {}): Promise<RouteStats[]> {
  const buildDir = path.join(process.cwd(), ".next");
  const buildManifestPath = path.join(buildDir, "app-build-manifest.json");
  const pathManifestPath = path.join(buildDir, "app-path-routes-manifest.json");

  const buildManifest = await readJson<{ pages: Record<string, string[]> }>(
    buildManifestPath
  );
  const pathManifest = await readJson<Record<string, string>>(pathManifestPath);

  const stats: RouteStats[] = [];

  for (const [routeKey, chunks] of Object.entries(buildManifest.pages)) {
    if (skipLayouts && (routeKey.endsWith("/layout") || routeKey === "/layout")) {
      continue;
    }

    const routePath = resolveRoutePath(routeKey, pathManifest);
    if (routePattern && !routePattern.test(routePath) && routePath !== "/base") {
      continue;
    }

    const firstLoad = await totalGzippedSize(chunks, buildDir);
    stats.push({ route: routePath, firstLoad, chunks });
  }

  return stats;
} 