/** Local-time defaults; manual choices belong to the current tab visit. @author meetbyte */
import { siteConfig } from "@/constants/config";
export type Theme = "light" | "dark";

export function resolveTheme(date = new Date()): Theme {
  const hour = date.getHours();
  return hour >= siteConfig.dayStartHour && hour < siteConfig.nightStartHour ? "light" : "dark";
}

export function readVisitTheme(): Theme | null {
  try {
    const saved = window.sessionStorage.getItem(siteConfig.themeVisitStorageKey);
    return saved === "light" || saved === "dark" ? saved : null;
  } catch { return null; }
}

export function saveVisitTheme(theme: Theme): void {
  try { window.sessionStorage.setItem(siteConfig.themeVisitStorageKey, theme); } catch { /* The in-memory choice still works. */ }
}

/** Runs before CSS paints. Old saved choices intentionally do not override the clock. */
export function createThemeBootstrapScript(): string {
  return `(() => { let manual = null; try { manual = sessionStorage.getItem(${JSON.stringify(siteConfig.themeVisitStorageKey)}); } catch {} const hour = new Date().getHours(); document.documentElement.dataset.theme = manual === "light" || manual === "dark" ? manual : hour >= ${siteConfig.dayStartHour} && hour < ${siteConfig.nightStartHour} ? "light" : "dark"; })();`;
}
