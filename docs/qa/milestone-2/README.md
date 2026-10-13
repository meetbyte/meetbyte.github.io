# Milestone 2 — Core website checkpoint

Verified 13 October 2026, development on CR002 only. No main merge, deployment or new PR. See `docs/planning/milestone-2.md` for the confirmed task grouping.

Home now has Meet Thummar as its single typographic focal point, existing verified professional summary and engineering perspective, native reading flow and a quiet contact invitation. Repeated feature cards and CTA clutter are removed. No portrait or substitute artwork is rendered. The owner explicitly deferred artwork; its task remains pending.

Experience/writing preview wiring uses manifest order, genuine approved published state and explicit section visibility. Writing is capped at three. All current editorial inventory records remain drafts and sections disabled, so no draft teasers, empty cards or unpublished links appear. Current profile/home/contact wording is reused verbatim, with no source-data changes or fabricated claims. Approved final copy/artwork are still dependencies of MEE-14's full acceptance.

Observed evidence:

- ESLint passed with zero warnings; TypeScript passed.
- All 36 source tests passed, including a new Home-selection boundary test for visibility, publication, placeholder exclusion, manifest ordering and teaser limit.
- Production Next.js compilation/typecheck/static generation passed. Export cleanup removed Experience/Writing/Projects/Blog; no source publication flags were changed.
- All 50 browser page/theme/viewport checks passed (Home/About/Resume/Skills/Contact × light/dark × 320/375/768/1024/1440). One h1, portrait only About, no page overflow, no footer overlap, no page runtime errors.
- Persistent/manual/OS theme behavior, denied storage, mobile Escape focus, client navigation focus, disabled/unknown URL HTTP 404s and CV HTTP 200 passed. An inherited no-wrap Home label caused initial 320px overflow and was corrected before the successful matrix.
- Visually inspected Home at 1440px light and 320px dark; prior core-page report covers internal-page composition. Captures remain local; the committed matrix and harness are reproducible.

Reproduce with `npm run build`, then run `scripts/qa/foundation-browser.mjs` with `QA_OUTPUT_DIR=docs/qa/milestone-2` and `QA_ALL_PAGES=1`. Use separately installed Playwright/Chromium paths as documented under `../foundation/README.md`. Sandbox checks use the documented `node --import tsx` equivalents where the tsx CLI IPC socket is denied. This is local verification, not live hosting, full WCAG certification or Lighthouse evidence.

MEE-14/MEE-15/MEE-16/MEE-19 remain In Progress while final QA, editorial dependencies and owner release approval are outstanding. Colors/fonts were approved by the owner; this approval does not authorize merging or deployment.
