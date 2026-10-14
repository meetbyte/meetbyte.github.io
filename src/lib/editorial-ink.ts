/**
 * @file Selects decorative ink before first paint and once per client route visit.
 * @author meetbyte
 */
import { inkConfig } from "@/constants/artwork";

/**
 * Self-contained browser routine: configuration is an argument because this body is serialized into the head.
 * The path guard prevents hydration or Strict Mode replay from advancing the chosen visit twice.
 * Native CSS remains the fallback if storage or browser randomness is unavailable.
 * @author meetbyte
 */
function selectBrowserInk(pathname: string, config: typeof inkConfig): void {
  const root = document.documentElement;
  const route = pathname.replace(/\/+$/, "") || "/";
  if (root.dataset.inkPath === route) return;
  root.dataset.inkPath = route;
  if (route === "/") return;
  let next = 1;
  try {
    const saved = Number(sessionStorage.getItem(config.visitStorageKey));
    next = (Number.isFinite(saved) ? saved : 0) + 1;
    sessionStorage.setItem(config.visitStorageKey, String(next));
  } catch {
    try {
      next =
        (crypto.getRandomValues(new Uint32Array(1))[0] %
          config.compositionCount) +
        1;
    } catch {
      /* Retain a deterministic native composition when randomness is unavailable. */
    }
  }
  root.dataset.inkVariant = String(next % config.compositionCount);
}

/** Client navigation uses exactly the same routine/settings as the prepaint script. @author meetbyte */
export function selectInkVisit(pathname: string): void {
  selectBrowserInk(pathname, inkConfig);
}

/** Discovers the current image early without gating native SVG on hydration or image decoding. @author meetbyte */
export function createInkBootstrapScript(): string {
  const config = JSON.stringify(inkConfig);
  return `(${selectBrowserInk.toString()})(location.pathname,${config});(() => { const config = ${config}; const mode = document.documentElement.dataset.theme === "dark" ? "dark" : "light"; const home = location.pathname.replace(/\\/+$/, "") === ""; let portrait = false; try { portrait = matchMedia(config.portraitQuery).matches; } catch {} const link = document.createElement("link"); link.rel = "preload"; link.as = "image"; link.href = config.assetDirectory + (home ? "home-" + mode + "-" + (portrait ? "portrait" : "landscape") : "hero-" + mode + "-600") + ".webp"; document.head.appendChild(link); })();`;
}
