# Prompt 06 — Clock, seasons, sun/moon journey and connection fallback

Continue the destination from prompt 00. Read `BUILD_SPEC.md`, persona settings, reference `src/lib/theme*.ts`, `season.ts`, `atmosphere-clock.ts`, scenery components/styles and prior handoff. Reuse exact source assets for visual reproduction. Generating an image again from the same words is not a guarantee of the same artwork.

Implement/retain prepaint visitor-local day/night selection (07:00 to before 19:00 is day), session-scoped manual theme choice, blocked-storage fallback and a single boundary scheduler with focus/visibility catch-up after sleep. Use persona-namespaced preference keys consistently. Preserve the distinction: theme/season/quality overrides are per-tab; inherited scenery-motion preference uses local storage and reduced motion always wins.

Keep the reference visual calendar unless the persona explicitly supplies another: March–May summer, June–September monsoon, October–November autumn, December–February winter. It is artistic scenery, not live local weather. No geolocation/weather requests. Use all reference active seasonal plates plus transparent foliage/cloud/moon assets, CSS sun and lightweight CSS weather, with fewer mobile particles. Keep reading cards opaque and weather behind them.

Preserve the one apparent celestial disc, complementary header/sky clipping, behind-card dip/hidden texture change and approximately 2.8-second reversible journey through readable sunset/pink/purple palettes. A second toggle reverses from current progress. Keep reference desktop/mobile paths and foreground/background contrast throughout. Reduced motion instantly switches themes and stills decorative motion; no layout/scroll resets.

Keep `showSeasonPicker: false` by default and no footer. If explicitly enabled, show a small header disclosure with Auto and the four seasons; disabled previews ignore stale saved values. Do not restore the removed footer or mounted pause control as a side effect.

Before paint apply a CSS-only light backdrop for offline/Data Saver/slow optional network hints, omitting decorative photographic/weather fetches. Retain visit-only full-scenery opt-in logic and its unmounted component without restoring visible controls. Preserve native navigation on limited connections, delayed-navigation status/direct-load recovery and dismissible offline feedback. Missing browser hint APIs use the regular experience. Do not promise a fully cached offline site or add a service worker without instruction.

For reproduction, use assets in the source snapshot and verify their manifest hashes. If new artwork is explicitly requested, use supplied references and clearly label it a visual variant; preserve composition, opaque text areas and no baked-in sun/moon on active plates. Existing original image-edit prompts/provenance are historical reference, not instructions to regenerate by default.

Check all eight seasonal/theme combinations; clock boundaries, manual choice/reload/new-tab behaviour, blocked storage, Auto override, reversed journey, reduced motion and connection hints. Use controlled preview fixtures instead of changing the system clock or introducing production debug switches. Record actual outcomes and any variants in the handoff. Do not commit, push or deploy.
