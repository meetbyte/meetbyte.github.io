# Editing the portfolio

## Where to change things

Paths below are relative to the repository root.

| Change | File | Notes |
| --- | --- | --- |
| Show the season preview | `src/constants/config.ts` | Change `showSeasonPicker` from `false` to `true`, then rebuild. A small Season disclosure appears beside the theme button; it does not restore the footer. |
| Day/night hours | `src/constants/config.ts` | `dayStartHour: 7`, `nightStartHour: 19`; visitor-local clock, no location request. |
| Seasonal calendar | `src/lib/season.ts` | `seasonByMonth` has 12 entries, January first. Summer March–May; monsoon June–September; autumn October–November; winter December–February. Snow is artistic, not live weather. |
| Publish Blog/Projects | `src/constants/page-visibility.ts` | Both remain `false`. Navigation, route numbering, sitemap and export cleanup share these flags. |
| Name, portrait and social links | `src/data/profile.ts` | Use a local image and descriptive alt text. |
| Home/About/Resume/Skills/Contact | Matching file under `src/data/` | Edit content here instead of embedding it in page components. Email and subject are in `contact.ts`. |
| Interface wording | `src/constants/content.ts` | Labels used across components. The progress label and footer copy were removed. |
| Articles | `content/blog/*.md` | Validated frontmatter and Markdown; start sections at `##`. |
| Project case studies | `src/data/projects.ts` | Typed sections, optional media and links; replace illustrative content before publishing. |
| Colours and typography | `src/styles/colors.css`, `src/app/layout.tsx` | Palette tokens and local font declarations. |
| Page/card layout | `src/styles/globals.css` | Responsive grids, profile sizing and reading panels. |
| Mobile dropdown, scrollbar width, finishing details | `src/styles/polish.css` | Modern browsers use native thin scrollbars; `--scrollbar-size: 4px` is the legacy WebKit fallback. Menu panel is explicitly absolute to prevent header expansion. |
| Landscape artwork and weather | `src/styles/scenery.css`, `src/styles/seasons.css` | Files under `public/images/scenery/`. |
| Global shell | `src/app/layout.tsx` | Persistent header/profile/main. There is no footer or mounted pause control. |

## Shared functionality

Use the existing focused modules instead of introducing a miscellaneous `utils.ts`:

- `src/lib/navigation.ts`: active-route matching.
- `src/lib/page-visibility.ts`, `page-label.ts`: publication and visible section numbering.
- `src/lib/theme.ts`, `season.ts`: clock/calendar choices, tab storage and prepaint scripts. Hidden seasonal preview ignores old saved choices.
- `src/lib/atmosphere-clock.ts`: boundary scheduling and catch-up after sleep.
- `src/lib/theme-journey.ts`: interruptible sun/moon orbit and intermediate colour palettes.
- `src/lib/scenery-motion.ts`: saved ambient preference and reduced-motion resolution. The reusable `SceneryMotionToggle` component is not mounted.
- `src/lib/connection.ts`: optional slow/offline hints; `ConnectionProvider` and `SiteLink` handle navigation feedback and recovery.
- `src/lib/metadata.ts`: shared SEO origin, descriptions and social metadata.
- `src/lib/content/`: build-time article/project/image validation; UI receives normalized data.
- `src/lib/finalize-export.ts`: validated cleanup of generated hidden routes, preserving source content.

## Conventions used here

- TypeScript, typed content models, descriptive names and small components with clear responsibilities.
- App Router pages/layouts render content on the server; use `"use client"` only for interaction/browser state.
- Behaviour settings in `constants`, personal content in `data`, reusable logic in focused `lib` modules, presentation in `components` and token-based styles.
- Function/module comments explain responsibilities and non-obvious decisions: native menu fallback, route focus, storage failures, prepaint selection, clock boundaries and export safety. Avoid comments that merely repeat a line of code.
- Effects release listeners, observers, timers and animation frames. Native scrolling is retained; animation avoids per-frame React renders.
- Real links/buttons/disclosures, ordered headings, visible keyboard focus and alternative text. Reduced-motion preferences remain supported after removing the visible pause control.
- Build-time content validation and meaningful tests cover publishing boundaries and failure cases. Do not assume lint proves every design or accessibility requirement.

The current ESLint configuration deliberately disables `react-hooks/set-state-in-effect` for components that synchronize browser preferences. This is an explicit project exception, not a claim that every external coding standard is satisfied. No all-project reformat was performed during the visual fix.

## Verify a change

Run `npm run lint`, `npm run typecheck`, `npm test` and `npm run build`. On Windows, `npm run build -- --webpack` is the documented fallback. The normal npm build also runs the postbuild cleanup.

Preview the generated `out/` through a static server. Check both themes, the mobile menu at 320/390/900 px, the desktop reading panels, keyboard navigation, reduced motion, an unknown URL and Contact/CV links. If the season flag is enabled, compare all four previews, choose Auto, and verify the header stays the same height when its disclosure opens.

## Source descriptions and future content

Use [the commenting guide](COMMENTING_GUIDE.md) for authored file/function descriptions and `@author meetbyte`. [Repository context](PROJECT_CONTEXT.md) records the active implementation and choices for future chats. Add genuine projects/articles through [the Step 4 follow-up](prompts/04_RESUME_PROJECTS_AND_BLOG.md), using [the content worksheet](planning/PROJECT_BLOG_CONTENT_TEMPLATE.md); preserve the existing engines and publication flags.
