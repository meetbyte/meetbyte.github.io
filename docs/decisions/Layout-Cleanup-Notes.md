# Layout cleanup — 8 October 2026

Implemented in `D:/Projects/iMeetMinds/meetbyte.github.io`.

- Removed the footer, its season/motion/scenery buttons, the progress label and unused footer styles/copy. The cards use the recovered vertical space.
- Fixed the mobile disclosure panel. A late generic positioning rule had overridden its absolute dropdown layout and caused the header to grow to about 305 px. Phone headers now stay at 72 px and tablet headers at 94 px when the menu opens. Escape returns focus; a completed route closes the menu and focuses the reading area.
- Applied native thin scrollbars to document and reading regions, with a 4 px fallback for browsers that use WebKit scrollbar styling. Exact native sizing varies by browser. High-contrast mode retains system scrollbars.
- Added `siteConfig.showSeasonPicker: false` in `src/constants/config.ts`. Set it to `true` and rebuild to show a compact Season disclosure beside the theme toggle. The footer stays removed. With the flag off, stale tab previews cannot override the automatic calendar.
- Preserved the scenery, full-width portrait shrink, fonts, clock-based theme and sun/moon journey. Reduced-motion support remains; the visible pause component is retained in source but is not mounted.
- Expanded navigation code into readable functions, replaced an unnecessary non-null assertion, documented behavior and made its active indicator use actual rendered link padding.
- Added `docs/MAINTENANCE.md` and updated the README. The guide maps personal content, flags, palette, season artwork, reusable logic and checks to their files. It documents the existing ESLint exception rather than claiming universal coding-standard compliance.

## Season calendar

| Season | Visitor-local months |
| --- | --- |
| Summer | March–May |
| Monsoon | June–September |
| Autumn | October–November |
| Winter | December–February |

This is an India-inspired visual calendar. Winter snow is an artistic treatment; no live weather or location request is used. Day remains 07:00–19:00, with night outside those hours.

## Verification

26 regression tests pass, lint passes, production compilation and TypeScript checks pass, postbuild cleanup completes, and the repository whitespace check passes. The new test covers disabled-preview storage isolation; the existing enabled-preview/calendar and theme tests still pass.

Browser checks at 320, 390 and 900 px show no horizontal overflow and no header growth when opening the menu. Escape, Contact navigation, main-content focus and the night transition were exercised. Desktop verification confirmed the footer/progress/preview controls are absent and reading cards retain their native scroll behavior. Screenshots accompany these notes.

Changes have not been committed, pushed or published.
