"use client";
/**
 * @file One-click accessible appearance toggle with persistent preferences and a light default.
 * @author meetbyte
 */
import { siteConfig } from "@/constants/config";
import { siteContent } from "@/constants/content";
import { prepareThemeAssets } from "@/lib/theme-assets";
import { useEffect, useState } from "react";
import {
  readThemePreference,
  saveThemePreference,
  parseThemePreference,
  resolvePreferredTheme,
} from "@/lib/theme";
/** Sync cross-tab changes; keep manual choices in memory when storage is blocked. @author meetbyte */
export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [ready, setReady] = useState(false);
  const [pending, setPending] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let current = readThemePreference();
    const apply = () => {
      document.documentElement.dataset.theme = resolvePreferredTheme(current);
      setTheme(resolvePreferredTheme(current));
    };
    let generation = 0;
    // Keep the previous palette and decoded images visible throughout a cold request.
    const select = async (preference: ReturnType<typeof readThemePreference>, persist: boolean) => {
      const request = ++generation;
      const next = resolvePreferredTheme(preference);
      setPending(true);
      setFailed(false);
      const loaded = await prepareThemeAssets(next);
      if (request !== generation) return;
      setPending(false);
      if (!loaded) { setFailed(true); return; }
      current = preference;
      if (persist) saveThemePreference(next);
      apply();
    };
    const choose = (event: Event) => {
      void select(parseThemePreference((event as CustomEvent).detail), true);
    };
    const storage = (event: StorageEvent) => {
      if (event.key !== siteConfig.themePreferenceStorageKey && event.key !== null) return;
      void select(readThemePreference(), false);
    };
    apply();
    setReady(true);
    void prepareThemeAssets(resolvePreferredTheme(current) === "light" ? "dark" : "light");
    window.addEventListener(siteConfig.themePreferenceEvent, choose);
    window.addEventListener("storage", storage);
    return () => {
      generation++;
      window.removeEventListener(siteConfig.themePreferenceEvent, choose);
      window.removeEventListener("storage", storage);
    };
  }, []);
  const label =
    theme === "dark"
      ? siteContent.common.theme.switchToLight
      : siteContent.common.theme.switchToDark;
  return (
    <>
    <button
      className="theme-toggle"
      type="button"
      disabled={!ready || pending}
      aria-busy={pending}
      aria-label={label}
      title={label}
      onClick={() => {
        const next = theme === "dark" ? "light" : "dark";
        window.dispatchEvent(
          new CustomEvent(siteConfig.themePreferenceEvent, { detail: next }),
        );
      }}
    >
      <svg
        viewBox="0 0 24 24"
        width="20"
        height="20"
        aria-hidden="true"
        focusable="false"
      >
        <circle
          cx="12"
          cy="12"
          r="8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
        />
        <path d="M12 4a8 8 0 0 1 0 16Z" fill="currentColor" />
      </svg>
    </button>
    <span className="sr-only" role="status">{failed ? "Appearance images could not load. Please try again." : pending ? "Preparing appearance" : ""}</span>
    </>
  );
}
