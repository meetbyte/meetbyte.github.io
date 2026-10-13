"use client";
/**
 * @file Native accessible appearance selector with persistent and OS-aware preferences.
 * @author meetbyte
 */
import { useEffect, useState } from "react";
import { readThemePreference, saveThemePreference, parseThemePreference, type ThemePreference, resolvePreferredTheme } from "@/lib/theme";
/** Sync cross-tab and OS changes; keep manual choices in memory when storage is blocked. @author meetbyte */
export function ThemeToggle() {
  const [preference, setPreference] = useState<ThemePreference>("system");
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    let current = readThemePreference();
    const apply = () => {
      document.documentElement.dataset.theme = resolvePreferredTheme(current, media.matches);
      setPreference(current);
    };
    const choose = (event: Event) => {
      current = parseThemePreference((event as CustomEvent).detail);
      apply();
    };
    const storage = (event: StorageEvent) => {
      if (event.key !== "meetbyte-theme-preference" && event.key !== null) return;
      current = readThemePreference();
      apply();
    };
    apply(); setReady(true);
    media.addEventListener("change", apply);
    window.addEventListener("meetbyte:theme-preference", choose);
    window.addEventListener("storage", storage);
    return () => {
      media.removeEventListener("change", apply);
      window.removeEventListener("meetbyte:theme-preference", choose);
      window.removeEventListener("storage", storage);
    };
  }, []);
  return <label className="theme-choice">
    <span className="sr-only">Appearance</span>
    <select aria-label="Appearance" value={preference} disabled={!ready} onChange={(event) => {
      const next = parseThemePreference(event.target.value);
      saveThemePreference(next);
      window.dispatchEvent(new CustomEvent("meetbyte:theme-preference", { detail: next }));
    }}>
      <option value="system">System</option><option value="light">Light</option><option value="dark">Dark</option>
    </select>
  </label>;
}
