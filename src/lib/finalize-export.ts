/**
 * @file Remove generated soft-404 paths so a static host returns a real 404.
 * @author meetbyte
 */
import { existsSync, realpathSync, rmSync } from "node:fs";
import path from "node:path";

/**
 * Validates all generated cleanup targets, removes disabled/helper export directories and returns their paths while preserving source content.
 * @author meetbyte
 */
export function finalizeExport(directory: string, disabled: readonly string[]): string[] {
  const root = realpathSync(directory);
  if (!existsSync(path.join(root, "404.html"))) throw new Error("Static export must contain 404.html before cleanup.");
  if (disabled.some((route) => !/^[a-z0-9-]+$/.test(route))) throw new Error("Unsafe disabled route; use one route directory name.");
  const targets = [...disabled, "blog/_unpublished", "projects/_unpublished"].map((route) => path.resolve(root, route));
  // Validate every existing target before removing any generated file.
  for (const target of targets) {
    if (!existsSync(target)) continue;
    const relative = path.relative(root, realpathSync(target));
    if (!relative || relative.startsWith("..") || path.isAbsolute(relative)) throw new Error("Export cleanup target escaped the output directory.");
  }
  const removed: string[] = [];
  for (const target of targets) {
    if (!existsSync(target)) continue;
    rmSync(target, { recursive: true }); removed.push(path.relative(root, target));
  }
  return removed;
}
