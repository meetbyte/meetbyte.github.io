"use client";

/** Clock-based defaults and an interruptible manual sun/moon journey. @author meetbyte */
import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/constants/config";
import { siteContent } from "@/constants/content";
import { createThemeJourney } from "@/lib/theme-journey";
import { watchAtmosphere } from "@/lib/atmosphere-clock";
import { parseSeasonChoice, readVisitSeason, seasonChoiceEvent } from "@/lib/season";
import { readVisitTheme, resolveTheme, saveVisitTheme, type Theme } from "@/lib/theme";
import { Icon } from "./icons";

export function ThemeToggle() {
  const [ready, setReady] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");
  const selected = useRef<Theme>("light");
  const atmosphere = useRef<ReturnType<typeof watchAtmosphere> | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    const manualChoice = readVisitTheme();
    selected.current = manualChoice ?? resolveTheme();
    root.dataset.theme = selected.current;
    setTheme(selected.current);
    const media = window.matchMedia(siteConfig.prefersReducedMotionQuery);
    const journey = createThemeJourney(root, () => media.matches);
    const watcher = watchAtmosphere({
      theme(next) {
        if (selected.current === next) return;
        selected.current = next;
        setTheme(next);
        journey.go(next);
      },
      season(next) { root.dataset.season = next; },
    }, undefined, manualChoice, readVisitSeason());
    atmosphere.current = watcher; setReady(true);
    const stopForReducedMotion = () => { if (media.matches) journey.finish(); };
    const onVisibility = () => { if (document.hidden) journey.finish(); else watcher.synchronize(); };
    const onFocus = () => watcher.synchronize();
    const onSeasonChoice = () => watcher.chooseSeason(parseSeasonChoice(root.dataset.seasonChoice));
    media.addEventListener("change", stopForReducedMotion);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("focus", onFocus);
    window.addEventListener(seasonChoiceEvent, onSeasonChoice);
    return () => {
      watcher.dispose(); atmosphere.current = null; journey.dispose();
      media.removeEventListener("change", stopForReducedMotion);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("focus", onFocus);
      window.removeEventListener(seasonChoiceEvent, onSeasonChoice);
    };
  }, []);

  function toggleTheme() {
    const next: Theme = selected.current === "dark" ? "light" : "dark";
    saveVisitTheme(next);
    if (atmosphere.current) atmosphere.current.choose(next);
    else { selected.current = next; setTheme(next); document.documentElement.dataset.theme = next; }
  }
  const label = theme === "dark" ? siteContent.common.theme.switchToLight : siteContent.common.theme.switchToDark;
  return <button type="button" className="theme-toggle icon-button" onClick={toggleTheme} disabled={!ready} aria-label={label} aria-pressed={theme === "dark"} title={label}>
    <Icon name={theme === "dark" ? "sun" : "moon"} size={19} />
  </button>;
}
