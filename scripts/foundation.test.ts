/**
 * @file Verify actual editorial palette contrast and persistent pre-paint preference failures.
 * @author meetbyte
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import { contrast } from "../src/lib/theme-journey";
import { createThemeBootstrapScript, parseThemePreference, resolvePreferredTheme } from "../src/lib/theme";
import { isActiveRoute } from "../src/lib/navigation";
import { pageVisibility } from "../src/constants/page-visibility";

test("editorial text and button labels meet AA on all reading surfaces in both themes", () => {
  const source = readFileSync(new URL("../src/styles/colors.css", import.meta.url), "utf8");
  for (const section of source.split('html[data-theme="dark"]')) {
    const colors = Object.fromEntries([...section.matchAll(/--([\w-]+):\s*(#[a-fA-F0-9]{6})\s*;/g)].map(match => [match[1], match[2]]));
    for (const foreground of ["ink", "ink-soft", "ink-muted", "accent", "accent-deep"]) {
      for (const background of ["page", "surface", "surface-quiet", "surface-hover"]) {
        assert.ok(contrast(colors[foreground], colors[background]) >= 4.5, `${foreground}/${background}`);
      }
    }
    assert.ok(contrast(colors["button-ink"], colors.accent) >= 4.5);
    assert.ok(contrast(colors.focus, colors.page) >= 3);
  }
});

test("theme bootstrap handles missing browser APIs and persistent explicit choices", () => {
  for (const saved of ["dark", "light", "corrupt", null]) {
    const dataset: Record<string, string> = {};
    runInNewContext(createThemeBootstrapScript(), { localStorage: { getItem: () => saved }, document: { documentElement: { dataset } } });
    assert.equal(dataset.theme, saved === "dark" ? "dark" : "light");
  }
  assert.equal(parseThemePreference({ bad: true }), "system");
  assert.equal(resolvePreferredTheme("system", true), "dark");
  assert.equal(resolvePreferredTheme("light", true), "light");
  assert.equal(resolvePreferredTheme("dark", false), "dark");
});

test("nested nav states and editorial routes preserve explicit visibility boundaries", () => {
  assert.equal(isActiveRoute("/experience/example/", "/experience/"), true);
  assert.equal(isActiveRoute("/experience-other/", "/experience/"), false);
  assert.equal(isActiveRoute("/about/", "/"), false);
  for (const key of ["projects", "blog"] as const) assert.equal(pageVisibility[key], false);
  for (const key of ["experience", "writing"] as const) assert.equal(pageVisibility[key], true);
});
