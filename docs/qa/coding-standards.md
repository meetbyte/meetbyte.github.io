# CR002 coding standards maintenance — 14 October 2026

Scope: the repository's AGENTS.md, COMMENTING_GUIDE.md and MAINTENANCE.md conventions, current CR002 runtime modules, authored scripts/config/style files and the current production export. This is a standards/maintenance pass, not owner content approval or release certification.

## Findings and corrections

- Experience/Writing duplicated their index, entry metadata, detail rendering, static parameter resolution, slug lookup and canonical metadata. Shared server components and focused route helpers now own these responsibilities. The route files still export the required Next.js functions. Sanitized Markdown, development-only drafts, production publication gates and previous/next order are retained.
- Theme preference key, preference event, OS query and navigation stall delay now come from config.ts. Editorial count/schema/status/reading settings live in constants/editorial.ts; ink visit key/count/aspect/assets configuration lives in constants/artwork.ts. Serialized head routines embed literal configuration rather than referring to server module variables.
- Approved index copy, Home labels, conceptual experience maps and theme-aware portrait settings are stored in data modules rather than embedded in JSX. Shared date validation/UTC display replaces duplicated date-only logic; legacy formatPostDate remains an exported compatibility alias.
- Added missing module/function responsibility comments and author tags. Corrected stale descriptions of draft pages, deferred artwork and route animation. Expanded compressed edited JSX and QA scripts with Prettier 3.6.2; no formatter dependency or blanket repository reformat was added.
- Removed the unmounted desktop indicator's resize listener/calculation, unused Home teaser selectors and obsolete theme dropdown selectors. The current transparent header, artwork CSS geometry/assets and visual design are retained.
- Historical foundation/correction runners now use the shared static server and current Home asset/visible portrait checks. Their assertion scope remains smaller than complete-site QA. Previous QA artifacts are historical; formatting a runner does not establish a new browser result.

## Fresh verification

| Check | Result |
| --- | --- |
| npm run lint | Pass, zero warnings under existing project rules |
| npm run typecheck | Pass, generated Next.js route types plus TypeScript |
| npm test | 41 passed; includes persisted/OS prepaint theme behavior and three new serialized ink regressions |
| node --test scripts/ai-review-ready.test.mjs | 27 passed; live controls/workflows unchanged |
| npm run build | Pass, static export and hidden/reserved cleanup |
| node scripts/qa/seo-check.mjs | 17 canonical pages pass static title/description/canonical/H1/OG/Twitter/sitemap checks |
| Before/after exported main markup | All 21 exported HTML page main regions match after normalizing React comments and whitespace |
| Shared QA server | Canonical pages, unknown/draft 404, CV MIME and exported RSC responses verified through local HTTP |
| Comment inventory | 116 authored TS/TSX/MJS/CSS files contain file descriptions and @author meetbyte; all named function declarations have responsibility comments/author tags |
| git diff --check | Pass |

The comment inventory uses TypeScript AST function declarations plus file-header checks. Meaningful arrow helpers and side effects were inspected manually; anonymous callbacks/obvious assignments, declarations, generated Next.js files, JSON/media/font licenses are not treated as missing-comment defects. Existing authored comments/provenance remain.

New prepaint regressions execute the real serialized head routine without React/module imports: one selection despite hydration replay, wrap at 24 compositions, Home skip, denied storage and unavailable optional browser APIs, and theme/aspect-specific Home image preloading. Existing theme tests caught an initial serialization mistake during this maintenance pass; it was corrected before the final successful checks.

## Limits and release boundary

This pass did not rerun browser screenshots, axe or Lighthouse. The environment has no supported browser-control capability for this workflow; stored earlier browser evidence is not claimed as a fresh result. Static main-markup equality and unchanged artwork geometry/assets support preservation of the design, but do not constitute a new rendered visual audit. Mobile LCP and final editorial/privacy/visual acceptance remain the previously documented open owner decisions.

The repository deliberately retains its documented ESLint react-hooks/set-state-in-effect exception. Passing these checks verifies the configured repository conventions, not every possible external coding standard. No framework/dependency/lockfile, workflow, release control, publication flag, article text, main merge or deployment change is included. Active Linear work remains In Progress until its existing acceptance gates are satisfied.
