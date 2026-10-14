/** @file Select decorative ink before first paint and once per client route visit. @author meetbyte */
/** Browser-only selection; serialized into the existing prepaint bootstrap without external dependencies. @author meetbyte */
export function selectInkVisit(pathname: string): void {
  const root = document.documentElement;
  const route = pathname.replace(/\/+$/, "") || "/";
  if (root.dataset.inkPath === route) return;
  root.dataset.inkPath = route;
  if (route === "/") return;
  let next = 1;
  try {
    const key = "meetbyte-ink-visit";
    const saved = Number(sessionStorage.getItem(key));
    next = (Number.isFinite(saved) ? saved : 0) + 1;
    sessionStorage.setItem(key, String(next));
  } catch { next = crypto.getRandomValues(new Uint32Array(1))[0] % 24 + 1; }
  root.dataset.inkVariant = String(next % 24);
}
/** Discover the current decorative image early; CSS/native SVG remain usable without hydration. @author meetbyte */
export function createInkBootstrapScript(): string {
  return `(${selectInkVisit.toString()})(location.pathname);(() => { const mode = document.documentElement.dataset.theme === "dark" ? "dark" : "light"; const home = location.pathname.replace(/\\/+$/, "") === ""; const shape = matchMedia("(max-aspect-ratio: 1/1)").matches ? "portrait" : "landscape"; const link = document.createElement("link"); link.rel = "preload"; link.as = "image"; link.href = home ? "/images/editorial/home-" + mode + "-" + shape + ".webp" : "/images/editorial/hero-" + mode + "-600.webp"; document.head.appendChild(link); })();`;
}
