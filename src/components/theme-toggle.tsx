"use client";

/**
 * @file Light and dark theme control with saved visitor preference.
 * @author meetbyte
 */
import { useEffect, useState } from "react";
import { siteContent } from "@/constants/content";
import { readSavedTheme, resolveTheme, saveTheme, type Theme } from "@/lib/theme";
import { Icon } from "./icons";

/**
 * Reads the saved theme and provides a manual light or dark switch.
 * @returns The accessible theme toggle button.
 * @author meetbyte
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  // Match React's button state to the theme selected before hydration. The
  // bootstrap script paints the saved theme before this effect can run.
  useEffect(() => {
    const root = document.documentElement;
    const selected = resolveTheme(readSavedTheme());
    root.dataset.theme = selected;
    setTheme(selected);
  }, []);

  /**
   * Applies the next theme immediately and remembers the choice if possible.
   * @author meetbyte
   */
  function toggleTheme() {
    const next: Theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    // CSS variables on <html> update the whole site as soon as this changes.
    document.documentElement.dataset.theme = next;
    saveTheme(next);
    setTheme(next);
  }

  const label = theme === "dark" ? siteContent.common.theme.switchToLight : siteContent.common.theme.switchToDark;

  return (
    <button type="button" className="theme-toggle icon-button" onClick={toggleTheme} aria-label={label} aria-pressed={theme === "dark"} title={label}>
      <Icon name={theme === "dark" ? "sun" : "moon"} size={19} />
    </button>
  );
}
