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

Latest full-site matrix before the targeted original-art restoration: [results.json](ribbon-art/results.json); the earlier checkpoint remains in [complete-site/results.json](complete-site/results.json) and [performance-summary.json](complete-site/performance-summary.json). Screenshots were inspected locally for full-page composition and legibility; generated screenshots/raw lab traces are not shipped as website assets.

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

The chronological checkpoints below describe earlier iterations; the final atmosphere revision at the end supersedes their artwork framing, portrait and header details.

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

## 14 October free-header and mobile navigation revision

Owner rejected the veil. It is removed from both themes; the header has a transparent background and no ::after panel. The natural Home artwork crop, dark light-theme lettering and modest weight/size increase keep navigation readable. The name moves about 36px lower on a 900px desktop viewport and 20px lower on tall phones; screens <=700px retain compact top spacing to preserve fit. The light m-dot logo/favicon uses deep burgundy; the dark mark retains its previous palette.

Mobile controls are borderless Menu/Close text and a smaller theme glyph with no backing circle. Open navigation is a transparent two-column editorial list; the header makes room so it does not cover the hero. Native details behavior, pre-JavaScript availability, outside dismissal, route dismissal, Escape and focus return are retained. Button names match Menu/Close state through the native toggle event.

Contrast validation now samples actual screenshot pixels behind text rectangles after hiding glyphs/underlines (with transitions disabled for stable background sampling), not a presumed opaque header surface. Sampled values are in docs/qa/free-header/header-contrast.json. This is a regression test for the measured combinations, not comprehensive WCAG certification. Both-theme closed/open phone/tablet/desktop images were inspected locally. Full 170-layout/34-axe matrix and eight short-viewport fits are recorded under docs/qa/free-header/; artifacts from the earlier veil checkpoint are historical.

Final free-header result: 168 sampled header/menu text cases passed, minimum sampled contrast 5.09:1; eight short-viewport fits passed. Keyboard Menu focus uses a visible underline, rather than a button-shaped outline. The 170-layout/34-axe regression reports zero detected violations and no browser exceptions.

## 14 October final atmosphere, placement and portrait revision

The owner’s latest screenshot showed an enlarged Home crop and an introduction still too high. Home now shows the entire approved 4:5 original at viewport height on desktop, with a feathered local edge and deliberate smaller-screen right bleed. The artwork continues behind the transparent header, with no cut or backing panel. Home introduction top space increases to 20svh on taller desktop screens and 15svh on taller phones; short-height layouts retain compact spacing. Screenshots of both themes and the mobile menu were visually inspected.

Inner-page visits select among eight motionless compositions using organic SVG silhouettes, approved ink/paper grain, different positions/rotations and radial edge masks. Refresh and route return advance the scene; theme switching preserves it; Home remains fixed. Skills and long-form routes include a quiet lower-edge echo. About has two transparent shirt recolours: warm ivory/oatmeal in light mode and subdued plum-brown in dark, with exactly one visible/accessible portrait. Original photo and blue-shirt cutout are preserved. Exact editing prompts, asset hashes and limitations are in public/images/portrait-notes.md.

Mobile navigation adds a small Explore caption, route indices and restrained 21px links, retaining the transparent two-column flow layout, native details, Escape/outside/route dismissal and focus return. A texture contrast regression was found and corrected by using the deep accent for active light-theme header text.

Final evidence: docs/qa/atmosphere-revision/results.json (170 layouts, 34 axe runs, zero detected violations/browser exceptions and 24 linked targets); home-viewports.json (eight ordinary short-viewport fits plus reachable small-screen reflow); ink-visits.json (refresh/return variation, no theme-induced scene change, stable natural-ratio Home and matching visible portrait); header-contrast.json (952 sampled text cases including all eight inner-page variants across both themes and phone/tablet/desktop sizes). The 17 static metadata/crawlability checks pass. Normal lint, typecheck, 38 tests and production build pass. These are local implementation checks, not live hosting, search ranking, comprehensive accessibility certification or owner visual acceptance. No main merge or deployment was performed.

## 14 October two-sided workbook spill follow-up

The latest owner feedback requested broader Home artwork, a lower identity block and stains beyond the right margin. Home now preserves the source 4:5 ratio while broadening coverage to 96svh × 120svh on desktop with modest viewport bleed. A separate faint fixed spill occupies the left. Home’s tall-screen introduction starts at 26svh on desktop and 20svh on phones; compact-height layouts still fit. The concise original line is now “Building software. Staying curious.” with tighter letter spacing and balanced wrapping.

Inner compositions alternate their dominant stain between left/right, adding smaller opposite-side spills, organic spray droplets and a faint lower echo on every inner page. The texture comes from the approved original assets; no third-party image or animation was added. A feathered full-page reading-lane mask keeps wording clear without an opaque text/header panel. While the mobile menu is open, the entire Home art is quieter, avoiding a header-only cut.

Evidence: docs/qa/spilled-surface/. Lint/typecheck, 38 tests and production build pass; 170 route/width/theme layouts and 34 axe runs report no detected violations/browser exceptions; 24 linked targets pass; eight short-viewport fits and reachable small reflow content pass; theme/portrait behavior, inner refresh/navigation variation and fixed Home remain correct; all 17 static metadata/crawlability checks pass. Expanded raster contrast checks cover 952 navigation samples plus 832 visible first-viewport body samples across both themes, four widths and all eight representative inner-page variants. Minimum normal-text contrast is 4.9:1 (navigation minimum 6.1:1); sampled large headings minimum 6.27:1. These checks found and corrected mobile/edge reading contrast and open tablet-menu contrast. They do not certify every pixel, route/state or full WCAG conformance. Both-theme Home and two-sided Skills/Writing viewport images were visually inspected. Owner visual acceptance and live release remain pending; no main merge/deployment occurred.

## 14 October lower identity, diagonal Home and stronger inner ink

Home introduction is now bottom-anchored above the footer rather than positioned with a growing top padding. At the checked 1440×900 desktop size the name begins at y≈475, below the midpoint. The original 4:5 artwork tilts upward toward the right (34° desktop, 28° tablet, 22° phone). An elliptical source-edge mask removes straight rotated boundaries, while a separate page-coordinate fade protects the identity column. The fixed left spill remains. No bottle or other literal object was added; the workbook/spill idea stays abstract.

Inner ink and long-form ink contrast are stronger in both themes; opposite-side spills and spray are more pronounced. A responsive mask reaches the quiet reading level just before the text margin instead of fading a wide portion of the whole page. This preserves stronger visible margins with legible content. The menu regression now checks actual separation between the open navigation bottom and main content, rather than requiring the already bottom-anchored Home to move when spare upper space is available.

Current evidence: docs/qa/diagonal-ink/. Lint/typecheck, 38 tests, production build, 170 canonical route/width/theme layouts, 34 axe runs with zero detected violations/browser exceptions, 24 local linked targets, eight short-viewport fits/reachable tiny reflow and 17 static SEO checks pass. Artwork/portrait behavior checks verify per-visit inner variation, theme-stable arrangement, fixed unstretched diagonal Home and desktop name placement below the midpoint. The expanded raster contrast check passes 1,784 text samples (952 navigation + 832 visible first-viewport body samples) across both themes, four widths and all eight representative inner variants. Actual sampled minima are in header-contrast.json. Visual inspection covered final Home in both themes and stronger inner art. These remain local sampled checks, not full accessibility certification, owner visual acceptance, live search ranking or a deployment. Main/release approval remains with the owner.

## 14 October screenshot correction: organic band and expanded designs

Read the owner’s supplied screenshot from 14 October. It exposed the rounded paper-colour bulge left by the rotated bitmap/elliptical fade. Home now renders an organic native SVG band from lower-middle to upper-right; the original light/dark 4:5 texture is painted only inside the displaced/feathered path with multiply/screen blending. No rotated rectangle, paper-coloured oval or backing block is mounted. The lower identity placement, motto, header/footer and portrait are preserved. Final Home screenshots at the supplied wide-screen proportions were inspected in both themes.

Inner artwork expands from eight arrangements of one silhouette to 24 combinations of six genuinely different silhouettes and eight arrangements, with varied grain/counter-spills. The shared visit counter now selects the next scene directly, removing route-hash collisions that could repeat a design on successive different pages. Home stays fixed; theme changes and reading do not change the current inner arrangement.

Current evidence: docs/qa/ribbon-art/. Normal lint/typecheck, 38 tests and production build pass; 170 canonical layouts, 34 axe runs with zero detected violations/browser exceptions, 24 linked targets, eight short-viewport fits/reachable tiny reflow, 17 static metadata checks and art/portrait/theme behavior pass. Expanded raster contrast passes 2,404 samples, covering all 24 inner combinations on desktop and all six silhouette families on smaller viewports in both themes. Counts and actual minima are in header-contrast.json. These sampled local checks do not establish complete accessibility certification, owner design acceptance or a live release. Older checkpoints remain historical; no main merge/deployment occurred.

## 14 October owner correction: original artwork restored

The owner rejected the replacement SVG band and clarified that the original right-side artwork should be retained and rotated. Removed HomeRibbon and restored the exact unchanged paired hero-light/hero-dark bitmap sources, using a full 4:5 image plane rotated 48° desktop, 44° tablet and 40° phone. Only positioning/rotation/source-edge feathering and the identity-side fade are applied; there is no replacement silhouette, oval mask or new painted ribbon. Final wide Home screenshots were inspected in both themes. Small Home navigation uses slightly deeper light-theme ink after a measured contrast regression, preserving artwork strength without adding a header panel.

All 24 accepted inner designs remain, with opacity lowered roughly 10% to .49/.54 (light/dark) and .38/.41 for reading pages. No font, name placement, menu layout, content, portrait, release control or source artwork bytes changed.

Current targeted evidence: docs/qa/original-art-diagonal/. Lint/typecheck, 38 tests and production build pass. Eight short-viewport Home fits/reachable small reflow and artwork/portrait/theme/visit behavior pass. Dedicated Home raster checks cover 88 open-mobile-menu/desktop text cases and 60 closed-menu cases across both themes/four widths, with normal-text minimum 4.89:1 and large-text minimum 5.95:1. Home’s current asset/unstretched source and below-midpoint desktop name placement are checked. The full-site matrix and all-24-design checks from the previous checkpoint remain historical; they were not rerun for this small restoration and opacity reduction. These sampled local checks are not full accessibility certification or owner design acceptance. No main merge or deployment occurred.
