# Calendar and seasonal portfolio scenery

Page heading numbers use the visible navigation order: Home 00, About 01, Resume 02, Skills 03 and Contact 04. Re-enabling Projects or Blog updates the numbering automatically. Home’s two feature cards keep their separate editorial list numbering.

New tab visits start from the visitor’s local clock: day from 07:00 inclusive to 19:00 exclusive, night otherwise. Manual choices last within the current tab visit, including page navigation and reloads, using session storage rather than a permanent saved preference. Old permanently saved theme choices are ignored. Automatic visits also follow the 07:00/19:00 boundaries while the page is open; returning after sleep resynchronizes the clock.

| Local months | Visual season | Scenery |
|---|---|---|
| March–May | Summer | Existing green landscape and slow foliage |
| June–September | Monsoon | Wet forest, mist, layered clouds and subtle rain |
| October–November | Autumn | Copper/amber foliage and a few falling leaves |
| December–February | Winter | Frosted branches, snowy hills and sparse snowflakes |

This is an India-inspired visual calendar, rather than a live weather report. Winter snow is an artistic touch. No geolocation or weather service is used.

All seasons have matching day/night artwork and retain the travelling sun/moon transition. Weather stays behind the opaque reading cards, ignores pointer input, uses fewer particles on phones and follows the existing Pause scenery control. Reduced motion hides weather particles and switches the celestial theme instantly while keeping seasonal artwork visible.

The six new image assets were created using built-in `image_gen.imagegen` reference-image edit mode with `transparent_background: false`. Each remains 1536 × 1024 and is encoded to WebP at quality 85. The original summer plates and moon texture remain in use. Exact prompts, source references, generated PNG paths and installed project paths are in [seasonal-assets.json](./seasonal-assets.json).

Repository: `D:/Projects/iMeetMinds/meetbyte.github.io`. Changes remain local; no commit, push or deployment is included.

## Verification

- Lint, production static export and TypeScript compilation passed; all 16 tests passed.
- Tests cover 07:00/19:00 boundaries, every seasonal month, pre-paint defaults, ignored permanent preferences, visit-scoped choices, automatic sunset updates, resynchronization after sleep and timer cleanup. The existing content, motion-preference and theme-journey checks remain passing.
- Browser checks confirmed Home 00, About 01, Resume 02, Skills 03 and Contact 04; manual night mode remained active through page navigation. A new tab started from the local clock.
- Local calendar fixtures verified summer, monsoon and winter alongside the current October autumn. Rain paused/resumed correctly. A 390px phone displayed 12 winter particles with no horizontal overflow and clear moon/menu spacing. A reduced-motion fixture hid all snow and switched themes instantly.

Actual website screenshots: [autumn day](./season-autumn-day.png), [autumn night and Contact 04](./season-autumn-night-contact.png), [monsoon day](./season-monsoon-day.png), [winter night](./season-winter-night.png), [winter phone](./season-winter-phone.png), [summer day](./season-summer-day.png). The winter/summer/monsoon screenshots use local date fixtures, without changing the system clock or adding preview controls to the product.
