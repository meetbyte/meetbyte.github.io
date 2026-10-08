# Prompt 08 — Verify the build and hand off

Verify the destination produced by the prior authorized stages. Required context: destination, MODE, `BUILD_SPEC.md`, target persona input for adaptation, source snapshot/manifest and the previous handoff. Do not substitute the old website's validation claims for checks on this destination.

On a clean destination run `npm ci` and `npx next typegen` first. Then run `npm run lint`, `npm run typecheck`, `npm test` and `npm run build`. Use the documented Windows webpack fallback only when needed, with the reason recorded. If a command/tool is unavailable, state that limitation and complete independent checks. Never claim it passed. Preserve meaningful inherited publishing, clock, reduced-motion, palette and reliability regression coverage; add tests only for newly changed behaviour requiring them.

Serve the final `out/` via an appropriate static preview. Verify status codes for enabled routes, unknown routes, disabled routes and the internal helper; verify CV/media references, sitemap, robots, canonical/social metadata and all local link/anchor targets. Disabled/sample/draft content must satisfy the specification's boundaries. Projects/Blog flags finish in the persona-requested state.

Perform and record these checks:

| Area | Cases |
| --- | --- |
| Responsive layout | 320px, 390px, 900px; ordinary large desktop and short-height desktop; no page overflow/header expansion. |
| Portrait | 290-to-180 full-width desktop crop, scale stability, reserved space, mobile header docking and route persistence. |
| Navigation | Native menu without JS, keyboard open/close/Escape focus return, outside dismissal, active state, route focus/reset, nested detail transitions. |
| Visual baseline | Light/night, all four seasons; fonts, opaque cards, slim scrollbars; no footer/progress identity label/mounted pause UI; match final source rather than outdated controls in older screenshots. |
| Preferences and motion | Session choices/reload/new tab, clock/date boundaries, sleep catch-up, blocked storage, reversed sun/moon travel, reduced motion, contrast during travel. |
| Resilience | Slow/Data Saver/offline hint fixture, light scenery/opt-in, stalled-navigation recovery, no-script/delayed scripts and image failures. |
| Content | Empty optional arrays, long career entries/titles/email, long article code/tables, optional case-study media, correct CV/contact/social destinations. |
| Accessibility | One h1, ordered headings, landmarks/skip link, focus outlines, control semantics/44px targets, meaningful image alternatives, stable screen-reader role wording and contrast. |

For reproduce mode compare source/asset hashes with the bundled manifest before intentional edits. For adaptation audit source and generated HTML/JSON/SVG/metadata for inherited name/username/mailbox/social URLs/CV/portrait/identity artwork. Preserve actual author/license attribution and explicitly marked provenance archives, but eliminate inherited identity from the target's public site. Inspect raster social images/icons/portrait visually as text searches cannot verify them.

Reproduction is assessed with matching source/assets/lockfile and actual visual/behaviour checks, not a claim that prompts alone are deterministic. Keep a controlled viewport, date/time, theme, season, scroll state and browser for image comparisons. If any approved persona style change differs from the baseline, list it explicitly.

Save a new dated handoff in `docs/planning/` with inputs/mode/baseline, changed files, command outcomes, measured/manual checks, unresolved missing content and release steps. Report the result concisely with links. Do not commit, push, dispatch workflows or deploy unless explicitly authorized.
