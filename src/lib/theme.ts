/**
 * @file Persistent light-default theme preferences plus retained legacy scenery helpers.
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
  return hour >= siteConfig.dayStartHour && hour < siteConfig.nightStartHour
    ? "light"
    : "dark";
}

/**
 * Reads a valid manual theme from per-tab storage, returning null for absent, invalid or inaccessible preferences.
 * @author meetbyte
 */
export function readVisitTheme(): Theme | null {
  try {
    const saved = window.sessionStorage.getItem(
      siteConfig.themeVisitStorageKey,
    );
    return saved === "light" || saved === "dark" ? saved : null;
  } catch {
    return null;
  }
}

/**
 * Persists the manual theme for this tab visit while allowing in-memory behaviour when storage is blocked.
 * @author meetbyte
 */
export function saveVisitTheme(theme: Theme): void {
  try {
    window.sessionStorage.setItem(siteConfig.themeVisitStorageKey, theme);
  } catch {
    /* The in-memory choice still works. */
  }
}

export type ThemePreference = Theme | "system";
/** Fresh, absent or corrupt preferences default to light; explicit choices remain persistent. @author meetbyte */
export function parseThemePreference(value: unknown): ThemePreference {
  return value === "light" || value === "dark" ? value : "light";
}
/** Legacy System preferences also resolve to the owner-requested light default. @author meetbyte */
export function resolvePreferredTheme(preference: ThemePreference): Theme {
  return preference === "system" ? "light" : preference;
}
/** Ignore obsolete visit-only clock settings; persistent preference is a new storage key. @author meetbyte */
export function readThemePreference(): ThemePreference {
  try {
    return parseThemePreference(
      window.localStorage.getItem(siteConfig.themePreferenceStorageKey),
    );
  } catch {
    return "light";
  }
}
/** Native controls still work in memory if browser privacy settings deny storage. @author meetbyte */
export function saveThemePreference(preference: ThemePreference): void {
  try {
    window.localStorage.setItem(
      siteConfig.themePreferenceStorageKey,
      preference,
    );
  } catch {
    /* In-memory selection remains usable. */
  }
}
/** Apply the light default before CSS paints, preserving explicit dark choices and blocked-storage fallback. @author meetbyte */
export function createThemeBootstrapScript(): string {
  return `(() => { let choice = null; try { choice = localStorage.getItem(${JSON.stringify(siteConfig.themePreferenceStorageKey)}); } catch {} document.documentElement.dataset.theme = choice === "dark" ? "dark" : "light"; })();`;
}
