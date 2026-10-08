# Season previews and natural motion

Implemented in the existing repository at `D:\Projects\iMeetMinds\meetbyte.github.io`. The local build is available at [the website preview](http://127.0.0.1:4174/).

## Try the changes

Use **Season** in the footer to choose Summer, Monsoon, Autumn or Winter. Switch day/night independently with the header theme button. **Auto** restores India's visual seasonal calendar immediately. A preview lasts for the current tab visit, including page navigation and reloads; new visits return to the calendar.

The sun now dips down behind the portrait card and rises on the other side as the moon. The reverse journey works the same way. The real opaque cards hide the body during the middle of the orbit, when the sun/moon texture changes. Orange, pink and purple palettes accompany the journey. A second click reverses smoothly from the current position.

The background has stronger, more natural ambient movement: uneven foliage sway, two drifting cloud depths, moving dappled light, rain of varying lengths and speeds, floating snow and fluttering leaves with small veins. These are animated photographic layers and decorative shapes. No stock video or new media assets were downloaded for this update.

**Pause scenery** freezes all ambient layers, including leaf flutter and snow drift. Reduced-motion visitors see still seasonal artwork and instant theme changes. Both footer controls have 44px targets on phones, with no horizontal overflow at the tested 390px and 320px widths.

## Verification

- Production static export and its TypeScript check passed.
- Lint passed; all 20 automated tests passed.
- Tests cover valid/invalid season previews, blocked storage, calendar boundaries, returning to Auto, theme reversals and accessible intermediate palettes.
- Browser checks covered all four choices, Auto, navigation/reload persistence, day/night travel behind cards, a docked phone header, both pause layers, narrow footer layouts and an isolated reduced-motion preview.
- Browser console had no warnings or errors in the final preview; tracked changes passed the whitespace check.

Existing portrait behavior, navigation, fonts, personal content, hidden Projects/Blog settings and Contact subject remain in place. No commit, push or deployment was performed.

## Actual browser captures

The motion recording packages 61 unchanged browser screenshots, recorded at the natural capture cadence; the live preview runs the full animation independently of this recording's frame rate.

![Both directions of the behind-card transition](behind-card-theme-journey.webp)

[Summer](season-preview-summer.png) · [Monsoon](season-preview-monsoon.png) · [Winter](season-preview-winter.png) · [Phone controls](season-preview-phone.png)

The seasonal artwork and its original generation prompts are documented in [the existing asset manifest](seasonal-assets.json).

## Implementation locations

- `src/components/season-picker.tsx`: accessible native selector.
- `src/lib/season.ts`: calendar, validated visit preference and pre-paint bootstrap.
- `src/lib/atmosphere-clock.ts` and `src/components/theme-toggle.tsx`: keep previews selected at time/month boundaries and after sleep.
- `src/components/celestial-body.tsx`, `src/lib/theme-journey.ts`, `src/styles/scenery.css`: complementary header/sky clips, deep orbit, hidden texture change and natural cloud/foliage motion.
- `src/components/site-scenery.tsx`, `src/styles/seasons.css`: layered weather with reduced mobile particle counts.
- `src/app/layout.tsx`: shared footer control.
- `scripts/atmosphere.test.ts`, `scripts/theme-journey.test.ts`: added behavioral regression coverage.

The repository README describes the resulting behavior and architecture.
