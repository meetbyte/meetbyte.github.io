/**
 * @file Persistent OS-aware theme preferences plus retained legacy scenery helpers.
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

export type ThemePreference = Theme | "system";
/** Normalize absent, corrupt or unknown preferences to OS-controlled mode. @author meetbyte */
export function parseThemePreference(value: unknown): ThemePreference {
  return value === "light" || value === "dark" ? value : "system";
}
/** Resolve explicit choices independently of the operating system. @author meetbyte */
export function resolvePreferredTheme(preference: ThemePreference, systemDark: boolean): Theme {
  return preference === "system" ? (systemDark ? "dark" : "light") : preference;
}
/** Ignore obsolete visit-only clock settings; persistent preference is a new storage key. @author meetbyte */
export function readThemePreference(): ThemePreference {
  try { return parseThemePreference(window.localStorage.getItem("meetbyte-theme-preference")); }
  catch { return "system"; }
}
/** Native controls still work in memory if browser privacy settings deny storage. @author meetbyte */
export function saveThemePreference(preference: ThemePreference): void {
  try { window.localStorage.setItem("meetbyte-theme-preference", preference); } catch { /* In-memory selection remains usable. */ }
}
/** Resolve the theme before CSS paints, including blocked storage and unavailable media queries. @author meetbyte */
export function createThemeBootstrapScript(): string {
  return `(() => { let choice = null; try { choice = localStorage.getItem("meetbyte-theme-preference"); } catch {} let dark = false; try { dark = matchMedia("(prefers-color-scheme: dark)").matches; } catch {} document.documentElement.dataset.theme = choice === "light" || choice === "dark" ? choice : dark ? "dark" : "light"; })();`;
}
