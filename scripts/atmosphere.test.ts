/**
 * @file Clock boundaries and pre-paint seasonal behavior.
 * @author meetbyte
 */
import test from "node:test";
import assert from "node:assert/strict";
import { runInNewContext } from "node:vm";
import { resolveTheme, createThemeBootstrapScript, type Theme } from "../src/lib/theme";
import { resolveSeason, createSeasonBootstrapScript, parseSeasonChoice, type Season, type SeasonChoice } from "../src/lib/season";
import { nextAtmosphereCheck, watchAtmosphere } from "../src/lib/atmosphere-clock";

test("day starts at 07:00 and night at 19:00 in the visitor's local clock", () => {
  for (const [hour, minute, expected] of [[0, 0, "dark"], [6, 59, "dark"], [7, 0, "light"], [18, 59, "light"], [19, 0, "dark"], [23, 59, "dark"]] as const) {
    assert.equal(resolveTheme(new Date(2026, 9, 8, hour, minute)), expected);
  }
  assert.equal(nextAtmosphereCheck(new Date(2026, 9, 8, 6, 59)), 60_000);
  assert.equal(nextAtmosphereCheck(new Date(2026, 9, 8, 18, 59)), 60_000);
  assert.equal(nextAtmosphereCheck(new Date(2026, 9, 8, 23, 59)), 60_000);
});

test("every month has the chosen visual season and bootstrap ignores old saved themes", () => {
  const months: Season[] = ["winter", "winter", "summer", "summer", "summer", "monsoon", "monsoon", "monsoon", "monsoon", "autumn", "autumn", "winter"];
  months.forEach((expected, month) => {
    for (const hour of [6, 7, 18, 19]) {
      const date = new Date(2026, month, 1, hour);
      assert.equal(resolveSeason(date), expected);
      const dataset: Record<string, string> = {};
      class VisitDate extends Date { constructor() { super(date.getTime()); } }
      const context = { Date: VisitDate, document: { documentElement: { dataset } }, get localStorage() { throw new Error("A new visit must ignore saved manual themes"); } };
      runInNewContext(createThemeBootstrapScript() + createSeasonBootstrapScript(), context);
      assert.equal(dataset.theme, hour >= 7 && hour < 19 ? "light" : "dark");
      assert.equal(dataset.season, expected);
    }
  });
});

test("manual choices survive page navigation in this tab but a fresh visit uses the clock", () => {
  class VisitDate extends Date { getHours() { return 10; } }
  for (const [saved, expected] of [["dark", "dark"], ["light", "light"], [null, "light"], ["invalid", "light"]]) {
    const dataset: Record<string, string> = {};
    runInNewContext(createThemeBootstrapScript(), { Date: VisitDate, sessionStorage: { getItem: () => saved }, document: { documentElement: { dataset } } });
    assert.equal(dataset.theme, expected);
  }
});

/**
 * Builds a controllable fake boundary clock to inspect scheduled checks, selected themes/seasons and disposal.
 * @author meetbyte
 */
function clockFixture(date: Date, initialSeason: SeasonChoice = "auto") {
  let current = date, id = 0;
  const pending = new Map<number, () => void>();
  const themes: Theme[] = [], seasons: Season[] = [];
  const watcher = watchAtmosphere({ theme: (value) => themes.push(value), season: (value) => seasons.push(value) }, {
    now: () => current, delay: (callback) => { pending.set(++id, callback); return id; }, clear: (key) => { pending.delete(key); },
  }, null, initialSeason);
  return { watcher, themes, seasons, pending, date(value: Date) { current = value; }, fire() { const callbacks = [...pending.values()]; pending.clear(); callbacks.forEach((callback) => callback()); } };
}

test("an open automatic visit follows sunset and catches up after sleep", () => {
  const f = clockFixture(new Date(2026, 8, 30, 18, 59));
  assert.equal(f.themes.at(-1), "light");
  f.date(new Date(2026, 8, 30, 19)); f.fire();
  assert.equal(f.themes.at(-1), "dark");
  f.date(new Date(2026, 9, 1, 9)); f.watcher.synchronize();
  assert.equal(f.themes.at(-1), "light");
  assert.equal(f.seasons.at(-1), "autumn");
  assert.equal(f.pending.size, 1);
  f.watcher.dispose(); assert.equal(f.pending.size, 0);
});

test("manual choices last for this visit while the season continues to update", () => {
  const f = clockFixture(new Date(2026, 10, 30, 18));
  f.watcher.choose("light");
  const calls = f.themes.length;
  f.date(new Date(2026, 11, 1, 1)); f.fire();
  assert.equal(f.themes.length, calls);
  assert.equal(f.themes.at(-1), "light");
  assert.equal(f.seasons.at(-1), "winter");
  f.watcher.dispose();
  const nextVisit = clockFixture(new Date(2026, 11, 1, 1));
  assert.equal(nextVisit.themes.at(-1), "dark");
  nextVisit.watcher.dispose();
});

test("season previews survive navigation, reject invalid storage and return to Auto", () => {
  class VisitDate extends Date { getMonth() { return 9; } }
  for (const saved of ["summer", "monsoon", "autumn", "winter", "auto", "invalid", null]) {
    const dataset: Record<string, string> = {};
    runInNewContext(createSeasonBootstrapScript(true), { Date: VisitDate, sessionStorage: { getItem: () => saved }, document: { documentElement: { dataset } } });
    const choice = parseSeasonChoice(saved);
    assert.equal(dataset.seasonChoice, choice);
    assert.equal(dataset.season, choice === "auto" ? "autumn" : choice);
  }
  assert.equal(parseSeasonChoice({ season: "winter" }), "auto");
});

test("a preview survives calendar boundaries and focus; Auto resumes the current month", () => {
  const f = clockFixture(new Date(2026, 10, 30, 18), "monsoon");
  assert.equal(f.seasons.at(-1), "monsoon");
  f.watcher.chooseSeason("summer");
  f.date(new Date(2026, 11, 1, 1)); f.fire(); f.watcher.synchronize();
  assert.equal(f.seasons.at(-1), "summer");
  assert.equal(f.themes.at(-1), "dark");
  f.watcher.chooseSeason("auto");
  assert.equal(f.seasons.at(-1), "winter");
  assert.equal(f.pending.size, 1);
  f.watcher.dispose();
});

test("blocked season storage still applies the calendar before paint", () => {
  const dataset: Record<string, string> = {};
  class VisitDate extends Date { getMonth() { return 6; } }
  runInNewContext(createSeasonBootstrapScript(), { Date: VisitDate, get sessionStorage() { throw new Error("blocked"); }, document: { documentElement: { dataset } } });
  assert.equal(dataset.season, "monsoon");
  assert.equal(dataset.seasonChoice, "auto");
});

test("disabled season preview ignores stale saved choices before paint", () => {
  class VisitDate extends Date { getMonth() { return 9; } }
  const dataset: Record<string, string> = {};
  runInNewContext(createSeasonBootstrapScript(false), {
    Date: VisitDate,
    get sessionStorage() { throw new Error("Hidden preview should not access saved choices"); },
    document: { documentElement: { dataset } },
  });
  assert.equal(dataset.seasonChoice, "auto");
  assert.equal(dataset.season, "autumn");
});
