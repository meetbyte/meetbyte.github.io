/**
 * @file Local-time defaults; manual choices belong to the current tab visit.
 * @author meetbyte
 */
import { siteConfig } from "@/constants/config";
export type Theme = "light" | "dark";

/**
 * Selects daylight or night from the configured visitor-local hour boundaries.
 * @author meetbyte
 */
export function resolveTheme(date = new Date()): Theme {
  const hour = date.getHours();
  return hour >= siteConfig.dayStartHour && hour < siteConfig.nightStartHour ? "light" : "dark";
}

/**
 * Reads a valid manual theme from per-tab storage, returning null for absent, invalid or inaccessible preferences.
 * @author meetbyte
 */
export function readVisitTheme(): Theme | null {
  try {
    const saved = window.sessionStorage.getItem(siteConfig.themeVisitStorageKey);
    return saved === "light" || saved === "dark" ? saved : null;
  } catch { return null; }
}

/**
 * Persists the manual theme for this tab visit while allowing in-memory behaviour when storage is blocked.
 * @author meetbyte
 */
export function saveVisitTheme(theme: Theme): void {
  try { window.sessionStorage.setItem(siteConfig.themeVisitStorageKey, theme); } catch { /* The in-memory choice still works. */ }
}

/** Runs before CSS paints. Old saved choices intentionally do not override the clock. @author meetbyte */
export function createThemeBootstrapScript(): string {
  return `(() => { let manual = null; try { manual = sessionStorage.getItem(${JSON.stringify(siteConfig.themeVisitStorageKey)}); } catch {} const hour = new Date().getHours(); document.documentElement.dataset.theme = manual === "light" || manual === "dark" ? manual : hour >= ${siteConfig.dayStartHour} && hour < ${siteConfig.nightStartHour} ? "light" : "dark"; })();`;
}
