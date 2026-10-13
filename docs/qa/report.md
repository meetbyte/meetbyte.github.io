# Complete CR002 website: local validation

Evidence date: 13 October 2026. This validates the feature-branch static export, not the deployed website or owner acceptance. The final tested source commit is linked in Linear after pushing.

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

Machine evidence: [results.json](complete-site/results.json) and [performance-summary.json](complete-site/performance-summary.json). Screenshots were inspected locally for full-page composition and legibility; generated screenshots/raw lab traces are not shipped as website assets.

Axe marked color contrast as requiring manual judgment on every route/theme because text overlaps masked decorative backgrounds. Zero detected violations does **not** establish full WCAG conformance. Visual inspection covered the artwork and reading layouts, but a formal screen-reader assessment and comprehensive manual contrast certification have not been performed.

## Performance lab

Lighthouse, one sequential run per scenario against the local static export with Chromium 153. Scores vary with environment; these are simulated lab results, not field Core Web Vitals or production hosting measurements.

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
