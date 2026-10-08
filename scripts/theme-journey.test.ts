import assert from "node:assert/strict";
import { test } from "node:test";
import { contrast, createThemeJourney, journeyPalette, type JourneyClock } from "../src/lib/theme-journey";

test("sunset and twilight keep text and button labels at AA contrast", () => {
  for (let i = 0; i <= 200; i++) {
    const p = i / 200, palette = journeyPalette(p);
    for (const ink of ["ink", "ink-soft", "ink-muted", "accent", "accent-deep", "clay"]) {
      for (const surface of ["surface", "surface-quiet", "surface-hover"]) assert.ok(contrast(palette[ink], palette[surface]) >= 4.5, `${p}: ${ink} on ${surface}`);
    }
    for (const bg of ["accent", "accent-deep"]) assert.ok(contrast(palette["button-ink"], palette[bg]) >= 4.5, `${p}: button label`);
    assert.ok(contrast(palette["chrome-ink"], palette.page) >= 4.5, `${p}: header/footer on page tone`);
  }
});

function fixture(theme = "light") {
  let now = 0, id = 0;
  const pending = new Map<number, FrameRequestCallback>();
  const properties = new Map<string, string>();
  const root = { dataset: { theme } as DOMStringMap, style: {
    setProperty: (key: string, value: string) => properties.set(key, value),
    removeProperty: (key: string) => { const value = properties.get(key) ?? ""; properties.delete(key); return value; },
  } as unknown as CSSStyleDeclaration };
  const clock: JourneyClock = { now: () => now, request: (callback) => { pending.set(++id, callback); return id; }, cancel: (key) => { pending.delete(key); } };
  const advance = (ms: number) => { now += ms; const callbacks = [...pending.values()]; pending.clear(); callbacks.forEach((callback) => callback(now)); };
  return { root, clock, properties, pending, advance };
}

test("a second click reverses from the current position and removes palette overrides", () => {
  const f = fixture();
  const journey = createThemeJourney(f.root, () => false, f.clock);
  journey.go("dark"); f.advance(1000);
  const position = f.properties.get("--night-progress");
  assert.ok(Number(position) > 0 && Number(position) < 1);
  journey.go("light");
  assert.equal(f.properties.get("--night-progress"), position);
  f.advance(2800);
  assert.equal(f.root.dataset.theme, "light");
  assert.equal(f.properties.get("--night-progress"), "0");
  assert.equal(f.root.dataset.celestialTravel, undefined);
  assert.equal(f.pending.size, 0);
  assert.equal(f.properties.has("--surface"), false);
  assert.equal(f.properties.has("--chrome-ink"), false);
});

test("reduced motion skips travel, and a change during travel settles immediately", () => {
  const f = fixture("dark");
  let reduced = true;
  const journey = createThemeJourney(f.root, () => reduced, f.clock);
  journey.go("light");
  assert.equal(f.properties.get("--night-progress"), "0");
  assert.equal(f.pending.size, 0);
  reduced = false;
  journey.go("dark"); f.advance(700);
  reduced = true; journey.finish();
  assert.equal(f.properties.get("--night-progress"), "1");
  assert.equal(f.pending.size, 0);
  assert.equal(f.root.dataset.celestialTravel, undefined);
  assert.equal(f.properties.has("--surface"), false);
});

test("the texture changes during the deep hidden part of the orbit in both directions", () => {
  const f = fixture();
  const journey = createThemeJourney(f.root, () => false, f.clock);
  journey.go("dark"); f.advance(700);
  assert.equal(f.properties.get("--lunar-phase"), "0");
  f.advance(700);
  assert.equal(f.properties.get("--celestial-arc-progress"), "1.00000");
  assert.ok(Math.abs(Number(f.properties.get("--lunar-phase")) - .5) < .00001);
  f.advance(700);
  assert.equal(f.properties.get("--lunar-phase"), "1");
  f.advance(700); journey.go("light"); f.advance(700);
  assert.equal(f.properties.get("--lunar-phase"), "1");
  f.advance(1400);
  assert.equal(f.properties.get("--lunar-phase"), "0");
  f.advance(700);
  assert.equal(f.pending.size, 0);
});
