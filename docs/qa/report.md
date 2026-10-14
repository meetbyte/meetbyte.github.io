# Complete CR002 website: local validation

Latest functional evidence: 14 October 2026. This validates the feature-branch static export, not the deployed website or owner acceptance. The final tested source commit is linked in Linear after pushing.

## Implemented scope

Seven canonical sections and ten reading routes: four detailed Experience narratives and six original Writing essays with pull quotes. Home uses the approved concise identity/motto direction; borderless paper/ink artwork fills the viewport, and each inner section has a distinct subtle composition. Portrait only on About. Legacy Projects/Blog indexes are noindex canonical pointers, with fictional/sample detail routes still unavailable. Theme controls, contact links, CV, metadata, sitemap and static export remain available. No source was merged to main or deployed.

## Checks and evidence

| Check | Actual result |
| --- | --- |
| `npm run lint` | Passed |
| `npm run typecheck` | Passed; generates Next route types before TypeScript |
| `npm test` | 38 tests passed |
| `npm run build` | Passed; 25 static export entries before hidden helper cleanup |
| Layout matrix | 17 canonical routes × 5 widths (320/375/768/1024/1440) × 2 themes = 170 passing checks |
| Axe WCAG 2/2.1 A/AA rules | 34 route/theme runs; zero detected violations |
| Local linked routes/assets | 24 unique linked targets returned 200, including CV |
| Compatibility boundaries | Legacy aliases return 200 with noindex/canonical links; sample, unknown and reserved paths return 404 |
| Interaction | Theme persistence/System changes, mobile Escape focus, route focus and same-route loading recovery passed |
| Browser exceptions | None detected |

Latest machine evidence: [results.json](header-seo/results.json); the earlier checkpoint remains in [complete-site/results.json](complete-site/results.json) and [performance-summary.json](complete-site/performance-summary.json). Screenshots were inspected locally for full-page composition and legibility; generated screenshots/raw lab traces are not shipped as website assets.

Axe marked color contrast as requiring manual judgment on every route/theme because text overlaps masked decorative backgrounds. Zero detected violations does **not** establish full WCAG conformance. Visual inspection covered the artwork and reading layouts, but a formal screen-reader assessment and comprehensive manual contrast certification have not been performed.

## Previous checkpoint performance lab

Measured on previous commit c51d53b, before the latest visual refinement; these scores have not been remeasured for the new composition. Lighthouse, one sequential run per scenario against the local static export with Chromium 153. Scores vary with environment; these are simulated lab results, not field Core Web Vitals or production hosting measurements.

| Scenario | Performance | Accessibility / Best practices / SEO | FCP | LCP | Blocking | Layout shift |
| --- | ---: | --- | ---: | ---: | ---: | ---: |
| Home, mobile simulation | 79 | 100 / 100 / 100 | 1.2 s | 5.7 s | 39 ms | 0 |
| Home, desktop simulation | 96 | 100 / 100 / 100 | 0.3 s | 1.4 s | 0 ms | 0 |
| Resume, mobile simulation | 79 | 100 / 100 / 100 | 1.2 s | 5.8 s | 38 ms | 0 |

Slow-mobile LCP remains an optimization opportunity. Audits also identified framework JavaScript/CSS overhead and cache/compression opportunities; the local fixture deliberately does not claim production CDN headers. No remote fonts or runtime API are required. A final production pass should measure actual hosting behavior before asserting performance targets.

## Reproduction

Run the normal npm checks above. `scripts/qa/complete-site.mjs` uses externally installed Playwright and axe-core, supplied by `PLAYWRIGHT_MODULE_PATH`, `FOUNDATION_BROWSER_EXECUTABLE` and `AXE_SCRIPT_PATH`. It starts `scripts/qa/static-server.mjs` against `out/` with real 404/RSC handling. `scripts/qa/performance.mjs` requires `LIGHTHOUSE_CLI_PATH` and the browser executable variable. QA tools are separate from the website dependency/lockfile; neither tool installation nor browser binaries are shipped.

## Remaining owner/release gates

Owner visual/content/privacy acceptance; final PR and required GitHub CI/current eligible review; explicit authorization for main merge and its automatic Pages deployment; then actual live smoke checks. External mail delivery/social destinations and live hosting were not tested. MEE-21 release preparation and MEE-22 revision protocol are written, but a successful live release has not occurred from this work. Do not mark deployment complete or represent this local report as a live release certificate.

## 14 October visual correction

The owner rejected the earlier visual match. Compared the rendered Home to the approved top ink/paper portfolio reference, rather than treating responsive test success as design acceptance. Changed header identity to Meet.; Experience/Writing use the same visible-order numbering as Skills/Contact (04 and 05). Replaced the selector with a half-disc light/dark button; initial OS preference, manual persistence and blocked-storage behavior remain supported.

Home typography is lighter, its introduction sits higher, navigation is quieter, and the reference eyebrow hairline is restored. Removed the solid vertical paper fade and viewport cutoff; art now covers the full document, uses feathered masks and multiply/screen palette blending. Internal page opacity is visibly stronger, with distinct route positions/angles and restrained reading-page backgrounds. Desktop and mobile screenshots were inspected against the reference for composition and edge continuity. Final owner acceptance remains pending; the original reference is a direction, not a pixel-identical implementation promise.

## 14 October content, portrait and viewport follow-up

Reused the actual favicon asset in the header. Repositioned Home introduction to match the approved reference's upper-left composition; Home now fits the five standard widths at 900px height and eight additional light/dark short-viewport scenarios (1440×600, 1024×768, 375×667, 320×568). Narrow 320×400 reflow remains scrollable with Explore/footer reachable; no overflow hiding is used to force a fit. Evidence: [home-viewports.json](editorial-polish/home-viewports.json), reproduced with scripts/qa/home-viewport.mjs.

Artwork uses cover sizing without transforms, so neither a raster boundary nor an off-document rotated crop can hide the Skills treatment. Final full-route checks include document coverage and Skills visibility. Home footer links sit in the quiet left region, and the theme icon has a palette backdrop for contrast. No artificial footer strip remains. Both-theme screenshots of Home, Skills, About, APEX and an essay were inspected for type hierarchy, spacing and art continuity.

All four Experience records have additional source-grounded explanation and responsibility tables, plus semantic visual reading maps. Maps summarize the described responsibilities; they are not presented as undocumented production topologies. No new historical incidents, measured outcomes, infrastructure specifics or client identities were invented. Essay quotations are short, attributed and linked to inspected sources; the full provenance is docs/planning/quotation-sources.md.

About uses a new alpha cutout on the left with the original face/pose/orientation, plus a CSS lower-edge fade. Original portrait files remain unchanged. Asset, exact image-edit prompt, dimensions and hash are documented in public/images/portrait-notes.md. The final feature-branch content and portrait still require owner acceptance before main release.

## 14 October header and search-readiness follow-up

Header letters now sit within the opaque portion of a feathered page-colour veil rather than over textured ink. The m-dot logo geometry is rendered as inline SVG with theme tokens. The standalone favicon uses the same palette with OS theme media selection; unlike the inline header mark, favicon theme follows the browser/OS rather than the page's manual preference.

Dedicated checks: 126 header link/theme/viewport contrast cases at >=4.5:1, with desktop text confirmed above the veil fade and mobile menu text checked against its own surface; inline mark fill equals the current accent token. Reproduction: scripts/qa/header-contrast.mjs; evidence: docs/qa/header-seo/header-contrast.json.

Static SEO audit checks 17 unique titles/descriptions, canonical equality, indexable HTML, one h1, anchors, OG/Twitter tags, robots/sitemap and sample/alias exclusions. It caught the missing name in the root title (root-level layout template did not append it); the page now uses an explicit absolute name/role title. Experience metadata is corrected to describe its actual subject. Reproduction: scripts/qa/seo-check.mjs; evidence: docs/qa/header-seo/seo-results.json. Social PNG dimensions checked at 1200×630. No live search indexing/ranking, Search Console access or fresh Lighthouse score is claimed.

Linear acceptance reconciliation: docs/planning/pr-readiness.md. Reports/process/schema completion does not authorize an application-source merge or publication. All normal tests and the final full-site responsive/accessibility/browser checks remain required for the pushed head.
