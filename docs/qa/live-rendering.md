# Live rendering incident — MEE-24

Owner reports on 14 October 2026: theme switching leaves artwork/portrait absent for 2–3 seconds, native links feel slow, and long pages become plain below the artwork. Earlier live navigation also displayed a stalled-route notice (MEE-12, PR #13).

## Causes and correction

Hidden theme-specific CSS artwork is discovered when the theme changes; About images used default lazy loading and the alternate portrait was display:none. Cold transfer/decode can outlast the palette switch. Preparation now warms the alternate route-specific artwork; a switch keeps the previous appearance until the exact new artwork/portrait decode succeeds. Failed requests keep the old theme, announce a retryable error, and do not persist a failed choice. A bounded image timeout prevents an indefinitely disabled control. About variants are eagerly loaded, stacked without changing dimensions, with a single accessible portrait description. Assets, art framing and palette remain unchanged.

The inner SVG was capped at 1100px within an absolute document layer. Inner-page atmosphere is now fixed to the viewport, including both SVG layers, so it remains behind the reading lane while scrolling. Home retains its approved document composition; this does not repeat or stretch Home artwork along articles.

Links intentionally use full HTML loads after the static-host routing incident. Browser-managed document prefetch on pointer/focus intent can reduce latency without depending on Next RSC responses. It skips external links, downloads, other targets, offline, save-data and 2G connections; unsupported browsers retain ordinary anchors. Network/server latency cannot be eliminated or guaranteed by this change.

## Lessons for future sites

- Validate production export against the actual hosting semantics; the previous local server's RSC-to-index.txt mapping concealed the GitHub Pages response mismatch.
- Test a cold-cache theme switch, not only a fresh page already set to each theme. Include delayed images, decode, failed images, storage denial and reduced motion.
- Check the bottom of long articles, not only the first viewport. Document versus viewport atmosphere must be deliberate.
- Record document navigation, rendering, hydration and transfer timings separately; don't call a fast localhost test proof of live performance.
- Preserve approval/release controls. Technical checks don't replace owner validation of the deployed result.

## Verification

Lint, typecheck, 43 unit tests, production build/export cleanup and static-navigation checks pass (18 native HTML anchor destinations; fresh-light and saved-dark bootstrap). New tests cover route/viewport asset selection, waiting for decode, successful cache reuse and failed-load retry. Fresh browser results are recorded separately below if available; production latency is not claimed fixed from unit tests alone.

Browser limitation: no local Chromium executable was available. Installing the test browser failed because the download returned an invalid/truncated archive. No fresh cold-cache browser screenshots, click timings or production performance measurements are claimed. Owner preview must verify light↔dark on Home/About, image failure, mobile, and scrolling to the bottom of a long article before merge.
