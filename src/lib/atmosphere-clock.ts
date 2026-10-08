/** One boundary timer keeps local time and the seasonal calendar current. @author meetbyte */
import { siteConfig } from "@/constants/config";
import { resolveTheme, type Theme } from "./theme";
import { resolveSeason, type Season, type SeasonChoice } from "./season";

export function nextAtmosphereCheck(date: Date): number {
  const boundary = new Date(date);
  const hour = date.getHours();
  boundary.setHours(hour < siteConfig.dayStartHour ? siteConfig.dayStartHour : hour < siteConfig.nightStartHour ? siteConfig.nightStartHour : 24 + siteConfig.dayStartHour, 0, 0, 0);
  const midnight = new Date(date);
  midnight.setHours(24, 0, 0, 0);
  return Math.max(1, Math.min(boundary.getTime(), midnight.getTime()) - date.getTime());
}

export interface AtmosphereClock {
  now(): Date;
  delay(callback: () => void, milliseconds: number): number;
  clear(id: number): void;
}

export function watchAtmosphere(apply: { theme(theme: Theme): void; season(season: Season): void }, clock: AtmosphereClock = {
  now: () => new Date(), delay: (callback, ms) => window.setTimeout(callback, ms), clear: (id) => window.clearTimeout(id),
}, initialChoice: Theme | null = null, initialSeason: SeasonChoice = "auto") {
  let manual = initialChoice !== null;
  let seasonChoice = initialSeason;
  let timer = 0;
  const synchronize = () => {
    clock.clear(timer);
    const date = clock.now();
    apply.season(seasonChoice === "auto" ? resolveSeason(date) : seasonChoice);
    if (!manual) apply.theme(resolveTheme(date));
    timer = clock.delay(synchronize, nextAtmosphereCheck(date) + 25);
  };
  if (initialChoice) apply.theme(initialChoice);
  synchronize();
  return {
    synchronize,
    choose(theme: Theme) { manual = true; apply.theme(theme); },
    chooseSeason(choice: SeasonChoice) { seasonChoice = choice; synchronize(); },
    dispose() { clock.clear(timer); },
  };
}
