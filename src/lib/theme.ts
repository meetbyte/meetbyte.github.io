/**
 * @file Theme selection helpers and the script used before React paints.
 * @author meetbyte
 */
import { siteConfig } from "@/constants/config";

export type Theme = "light" | "dark";

/**
 * Chooses a saved theme when valid and defaults new visits to light.
 * @param saved - Value previously stored by the visitor.
 * @returns The theme to display.
 * @author meetbyte
 */
export function resolveTheme(saved: string | null): Theme {
  return saved === "dark" ? "dark" : "light";
}

/**
 * Reads the saved choice without breaking the page if storage is blocked.
 * @returns The saved value or null.
 * @author meetbyte
 */
export function readSavedTheme(): string | null {
  try {
    return window.localStorage.getItem(siteConfig.themeStorageKey);
  } catch {
    return null;
  }
}

/**
 * Persists a manual choice when browser storage is available.
 * @param theme - Theme chosen by the visitor.
 * @author meetbyte
 */
export function saveTheme(theme: Theme): void {
  try {
    window.localStorage.setItem(siteConfig.themeStorageKey, theme);
  } catch {
    // The selected theme remains active for this visit.
  }
}

/**
 * Creates a small head script to apply the theme before hydration.
 * @returns Self-contained browser code using the shared storage key.
 * @author meetbyte
 */
export function createThemeBootstrapScript(): string {
  // Keep this script in the document head so a saved dark choice is applied
  // before the CSS paints; the client component synchronizes its icon later.
  return `(() => {
    try {
      const saved = localStorage.getItem(${JSON.stringify(siteConfig.themeStorageKey)});
      document.documentElement.dataset.theme = saved === "dark" ? "dark" : "light";
    } catch {
      document.documentElement.dataset.theme = "light";
    }
  })();`;
}
