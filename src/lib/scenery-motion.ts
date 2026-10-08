/** Visitor preference for decorative scenery, independent of route motion. @author meetbyte */
import { siteConfig } from "@/constants/config";

export const sceneryMotionStorageKey = "meet-thummar-scenery-motion";
export type SceneryMotion = "playing" | "paused";

/** Reduced motion always takes priority over a saved preference. @author meetbyte */
export function resolveSceneryMotion(saved: string | null, reduced: boolean): SceneryMotion {
  return reduced || saved === "paused" ? "paused" : "playing";
}

/** Apply the preference before paint; blocked storage still respects reduced motion. @author meetbyte */
export function createSceneryBootstrapScript(): string {
  return `(() => {
    let saved = null;
    try { saved = localStorage.getItem(${JSON.stringify(sceneryMotionStorageKey)}); } catch {}
    const reduced = matchMedia(${JSON.stringify(siteConfig.prefersReducedMotionQuery)}).matches;
    document.documentElement.dataset.sceneryMotion = reduced || saved === "paused" ? "paused" : "playing";
  })();`;
}
