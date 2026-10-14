"use client";
/**
 * @file One-click accessible appearance toggle with persistent and OS-aware preferences.
 * @author meetbyte
 */
import { useEffect, useState } from "react";
import { readThemePreference, saveThemePreference, parseThemePreference, resolvePreferredTheme } from "@/lib/theme";
/** Sync cross-tab and OS changes; keep manual choices in memory when storage is blocked. @author meetbyte */
export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    let current = readThemePreference();
    const apply = () => {
      document.documentElement.dataset.theme = resolvePreferredTheme(current, media.matches);
      setTheme(resolvePreferredTheme(current, media.matches));
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
  return <button className="theme-toggle" type="button" disabled={!ready}
    aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
    title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
    onClick={() => {
      const next = theme === "dark" ? "light" : "dark";
      saveThemePreference(next);
      window.dispatchEvent(new CustomEvent("meetbyte:theme-preference", { detail: next }));
    }}>
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.25" />
      <path d="M12 4a8 8 0 0 1 0 16Z" fill="currentColor" />
    </svg>
  </button>;
}
