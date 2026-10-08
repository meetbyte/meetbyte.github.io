/**
 * @file India-inspired visual seasons, rather than live local weather.
 * @author meetbyte
 */
import { siteConfig } from "@/constants/config";

// January through December, using the visitor's local month.
export const seasonByMonth = ["winter", "winter", "summer", "summer", "summer", "monsoon", "monsoon", "monsoon", "monsoon", "autumn", "autumn", "winter"] as const;
export type Season = typeof seasonByMonth[number];
export type SeasonChoice = Season | "auto";
export const seasonVisitStorageKey = "meetbyte-season-visit";
export const seasonChoiceEvent = "meetbyte:season-choice";

/**
 * Accepts a known visual season and maps unrecognized input to the automatic calendar choice.
 * @author meetbyte
 */
export function parseSeasonChoice(value: unknown): SeasonChoice {
  return typeof value === "string" && seasonByMonth.some((season) => season === value) ? value as Season : "auto";
}

/** Hidden previews must not leave an old tab choice overriding the calendar. @author meetbyte */
export function readVisitSeason(): SeasonChoice {
  if (!siteConfig.showSeasonPicker) return "auto";
  try { return parseSeasonChoice(sessionStorage.getItem(seasonVisitStorageKey)); } catch { return "auto"; }
}

/**
 * Persists a per-tab preview or removes its override for Auto, tolerating unavailable storage.
 * @author meetbyte
 */
export function saveVisitSeason(choice: SeasonChoice): void {
  try {
    if (choice === "auto") sessionStorage.removeItem(seasonVisitStorageKey);
    else sessionStorage.setItem(seasonVisitStorageKey, choice);
  } catch { /* The current visit still works when storage is unavailable. */ }
}

/** Resolve the visual season without location permissions or a weather request. @author meetbyte */
export function resolveSeason(date = new Date()): Season {
  return seasonByMonth[date.getMonth()];
}

/** Apply the same calendar/preview policy before paint and after hydration. @author meetbyte */
export function createSeasonBootstrapScript(previewEnabled: boolean = siteConfig.showSeasonPicker): string {
  return `(() => { const seasons = ${JSON.stringify(seasonByMonth)}; let saved; if (${JSON.stringify(previewEnabled)}) try { saved = sessionStorage.getItem(${JSON.stringify(seasonVisitStorageKey)}); } catch {} const choice = seasons.includes(saved) ? saved : 'auto'; const root = document.documentElement; root.dataset.seasonChoice = choice; root.dataset.season = choice === 'auto' ? seasons[new Date().getMonth()] : choice; })();`;
}
