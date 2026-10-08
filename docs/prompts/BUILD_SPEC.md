# Reference website specification — 8 October 2026

This specification records the website found in the working repository, after the footer/menu/scrollbar cleanup. Use it with a persona input and the numbered prompts. Details below are observed requirements; optional new choices must be recorded as departures from this baseline.

## Implementation and hosting

- Next.js App Router, React, TypeScript and Tailwind CSS 4 with the established token-based CSS files. Baseline `package.json` has Next.js `16.3.8`, React `^19.2.0`, Node `>=20.9.0`; the bundled `package-lock.json` pins the actual dependency tree. Use `npm ci` for reproduction. Read the installed Next.js guides when changing framework behaviour. Do not automatically upgrade dependencies.
- Fully static: `output: "export"`, `trailingSlash: true`, `images.unoptimized: true`, `devIndicators: false`; localhost development allows `127.0.0.1`. No runtime server, database, API routes, CMS, authentication, contact service or analytics.
- Baseline is a GitHub **user site**, served at the root of `https://<username>.github.io` from `<username>.github.io`. For this mode there is no repository-name `basePath`. A project site or other origin is an explicit variant needing a separate verified path configuration; never assume the root configuration works at a subpath.
- Scripts: `dev`, `lint`, `typecheck`, `test`, `build`, `postbuild`. After `npm ci` in a clean extracted destination, run `npx next typegen` before typecheck; generated route types are excluded from the archive. `npm run build` runs export finalization automatically. The documented Windows fallback is `npm run build -- --webpack`. Preview `out/` with a static host that returns a real 404 status for missing files, rather than `next start` or an all-routes SPA fallback.
- The workflow builds from source and uploads `out/`; it does not require keeping only `out/` on `main`. Preserve the observed workflow structure, but leave committing, pushing, dispatching and deployment to explicit user authorization.

## Folder ownership

| Path | Responsibility |
| --- | --- |
| `src/app/` | Pages, shared document shell, nested detail routes, metadata exports, 404, sitemap and robots. |
| `src/data/` | Typed personal content, navigation, CV and case studies. |
| `src/data/types.ts` | Shared content schemas; optional fields and empty states. |
| `src/constants/` | UI wording, behaviour configuration, routes and publication switches. |
| `src/components/` | Profile, navigation, theme/connection interactions and reusable presentation. |
| `src/lib/` | Focused theme, season, navigation, motion, metadata and export logic. |
| `src/lib/content/` | Build-time Markdown, project and local-media validation; normalized UI models. |
| `src/styles/` | `colors.css`, `globals.css`, `scenery.css`, `seasons.css`, `polish.css`, loaded in that order. |
| `src/assets/fonts/` | Local Manrope and Bricolage Grotesque variable WOFF2 fonts with their existing licenses. |
| `content/blog/` | Individual Markdown articles and frontmatter. |
| `public/` | Portraits, CV, icons, social image and scenery assets. |
| `scripts/` | Meaningful content, scenery, journey, atmosphere and reliability tests; export finalizer. |

Preserve meaningful comments, module responsibilities and attribution. A person's identity in UI is separate from historical code attribution. Do not rewrite original author credits as if the new persona wrote the inherited source.

## Pages and publication

Implemented routes: `/`, `/about/`, `/resume/`, `/skills/`, `/projects/`, `/projects/[slug]/`, `/blog/`, `/blog/[slug]/`, `/contact/` plus custom 404. Public baseline: Home, About, Resume, Skills and Contact. Projects and Blog implementations remain available but their switches are `false`.

One `pageVisibility` map controls navigation, direct access, detail static parameters, sitemap, linked actions and export cleanup. Home remains available. Page heading numbers follow visible navigation order: 00, 01, 02, 03, 04 for the public baseline. Home feature-card numbers are a separate list order. Hidden directories and the internal `_unpublished` route are removed from the generated export; source content is retained. Unknown/disabled URLs must produce real HTTP 404 responses under a suitable static host.

Case studies use typed optional sections, media and HTTPS external links with intrinsic dimensions/alt text. Blog uses build-time YAML frontmatter + remark/GFM/rehype sanitization and a normalized `BlogPost` with reading time. UI components do not parse files. Samples are visibly labeled, have `noindex, follow`, and are excluded from the sitemap; draft/unpublished posts are omitted. Placeholder samples do not claim real achievements.

## Visual design and responsive shell

- Original scenic portfolio with a compact sticky header, persistent identity card and an opaque reading panel. No footer, progress/in-progress identity label or mounted pause-motion control. The reading-progress line inside the reading panel remains.
- Local Manrope body text and Bricolage Grotesque display headings; original editorial numbering, generous spacing, rounded 22px card edges and clear large headings.
- Preserve the full token palette from `src/styles/colors.css`, and the intermediate palette stops from `src/lib/theme-journey.ts`. Key light tokens: page `#f8f5ee`, surface `#fcfaf6`, ink `#263340`, accent `#496a86`, clay `#a55f4d`. Key dark tokens: page `#0d1725`, surface `#202936`, ink `#f6f2eb`, accent `#a5bed5`, clay `#dea38d`. Images never substitute for opaque reading surfaces.
- Large workspace at width >=1051px and height >=620px fits the viewport, with independently scrollable profile and main panels. Smaller widths/short windows use ordinary document scrolling. The maximum shell width is 1440px; baseline desktop gutter is 72px total. Preserve all reference stylesheet breakpoint rules instead of approximating them from this summary.
- At <=1050px, profile becomes a horizontal card above content; <=560px it stacks. Native mobile disclosure navigation appears at <=900px, with an absolute panel below the header rather than expanding the header. Baseline header band is 94px, reducing to 72px on phones.
- Desktop active navigation is an underline/marker. Mobile active links have readable filled feedback. Native `<details>/<summary>` navigation works before scripts load; Escape closes and returns focus, outside click dismisses, and completed route changes close the menu and focus the main reading area.
- Native thin scrollbars throughout scroll regions, with `--scrollbar-size: 4px` legacy WebKit fallback; forced-colors mode retains system scrollbars. No horizontal page overflow at 320px. Wider code/tables scroll in their own keyboard-usable regions.

## Portrait and motion

- Use the supplied portrait with correct intrinsic dimensions and meaningful alt text; retain a useful initials/image-failure fallback. Never silently substitute another person's face.
- Desktop profile scroll changes the portrait frame from 290px to 180px across the first 110px of profile scrolling. The frame stays full width and the image keeps its scale; it is a **vertical crop**, not a tiny floating avatar or horizontally squeezed image. Reserved spacer geometry avoids scroll jumps. With reduced motion the final 180px frame is used without animated shrink.
- On mobile/short windows the portrait replaces the header brand symbol when the original portrait leaves view. It sits within the header and does not cover page controls or content.
- Persistent shell survives client navigation; routed main content scrolls to the start and receives focus. Nested article/project route changes receive entrances too. Restrained page entries, single-use section reveals, card/link feedback, navigation marker and small decorative depth use CSS transforms/IntersectionObserver/passive scroll scheduling.
- No wheel/touch interception, continuous React scroll state updates, animation library or hidden text waiting for JavaScript. Reading text stays opaque during reveals. All listeners, observers, timers and animation frames are cleaned up. Reduced motion takes priority.

## Clock, scenery and theme

- Visitor-local clock selects daylight from 07:00 inclusive to 19:00 exclusive; night otherwise. Manual theme choice lasts for the tab visit using session storage, including reloads/navigation. Storage failures retain usable in-memory choices. One boundary scheduler and focus/visibility catch-up handle sleep and local midnight/calendar changes.
- Visual calendar, without geolocation/weather API: summer March–May, monsoon June–September, autumn October–November, winter December–February. Snow is an artistic atmosphere. Other calendars require an explicit persona setting and clear wording.
- Eight active day/night plates: summer `daylight-v2.webp`/`moonlight-v2.webp`; monsoon `monsoon-day-v1.webp`/`monsoon-night-v1.webp`; autumn `autumn-day-v1.webp`/`autumn-night-v1.webp`; winter `winter-day-v1.webp`/`winter-night-v1.webp`. Shared transparent `foliage-v1.webp`, `clouds-v1.webp`, `moon-disc-v1.webp`; CSS-drawn sun and CSS rain/leaves/snow. Retain v1 summer originals as source references, not active plates.
- One apparent sun/moon travels behind the opaque cards, changes texture while hidden and emerges at the other side, with sunset/twilight lighting. Manual travel is approximately 2.8 seconds and reverses smoothly from current progress on a second click. Narrow screens use the reference shorter path. Maintain readable intermediate foreground/background contrast. Reduced motion changes theme instantly and stops decorative movement.
- `showSeasonPicker: false` by default. An optional header disclosure appears only when enabled. Disabled preview ignores stale saved season choices. No restored footer controls.
- A scenery pause preference remains in the inherited implementation and respects reduced motion, but the pause component is unmounted. Reproduce that baseline; any added visible pause UI is an explicit design change.
- Before paint, offline/Data Saver/slow network hints select a CSS-only light backdrop and omit decorative photographic/weather requests. The visit-only full-scenery opt-in logic/component is retained but not mounted after footer removal; enabling a visible control is an explicit variant. Browser hints are optional; absent hints leave the ordinary experience. Native navigation on limited connections, delayed client-navigation feedback/direct-load recovery and dismissible offline feedback retain readable content. No service worker or promise of full offline browsing.

## Persona replacements

The reference includes Meet's approved personal data. For a new persona, replace **all** target identity and facts, including page metadata literals, 404 recovery wording, site origin, brand symbol/lines, contact subject/opportunities, social image text, icons, CV file/filename, portrait, article authors where applicable and sample content wording. See [03_PERSONA_AND_CONTENT.md](03_PERSONA_AND_CONTENT.md). Changing only `profile.ts` is insufficient: page descriptions and some assets are person-specific.

Keep current professional experience separate from learning. Do not invent employers, dates, skills, metrics, client claims or a profession. Optional missing arrays/fields produce sensible empty states. Fictional samples are distinctly identified and hidden by default. A missing CV produces a disabled action; missing social profiles are omitted.

## SEO, reliability and accessibility

Canonical origin is persona-specific. Include accurate page titles/descriptions, social metadata, local icons, a 1200x630 social image, robots and a sitemap containing only published genuine content. 404 has `noindex`, no canonical and a working recovery link. Direct Contact is a visible email + encoded `mailto:` subject, using approved public details, with no backend.

Server-rendered content remains readable before hydration/without JavaScript. Images reserve space and have failure fallbacks. One h1 per page; meaningful landmarks; skip link; ordered headings; visible keyboard focus; semantic links/buttons; 44px mobile control targets; accessible external-link warnings. Verify colour contrast, including intermediate theme travel and photographic header contexts; tests do not replace visual/manual review.

## Validation contract

`npm run lint`, `npm run typecheck`, `npm test`, `npm run build` must succeed in the destination. Add tests only for meaningful changed boundaries. Inspect the actual exported routes, link/media targets, 404 status, both themes, all seasons, 320/390/900px mobile/tablet, ordinary and short-window desktop, long content, portrait scroll, menu keyboard flow, blocked storage, reduced motion, limited connections and failed images. For adaptation, audit generated HTML/SVG/metadata for leftover reference identity and remove unused reference persona assets from the new destination. Record results and unresolved limits in a new dated handoff. No automatic commit/push/deploy.
