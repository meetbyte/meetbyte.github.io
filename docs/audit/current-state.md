# MEE-5: MeetByte repository audit

Audited 13 October 2026 by Codex for MeetByte. Source author: meetbyte.

## Evidence and scope

Source inspected: `20d374f47501a881053bfad4ea8c4d5eb8705ef7`, the fetched main baseline. The owner requested work on `feature/CR002_subtle_changes`. That branch was clean at `9bb21ae`, an ancestor four commits behind main, with no branch-only commits. It was fast-forwarded to the baseline locally before this report; no application source was altered. This is a repository audit, not a live-site or browser accessibility certification.

Authoritative task: [MEE-5](https://linear.app/meet-thummar/issue/MEE-5/a01-audit-repository-routes-and-publishing-constraints). Read `AGENTS.md`, `docs/PROJECT_CONTEXT.md`, `docs/MAINTENANCE.md`, the engineering protocol and approval policy, and `docs/COMMENTING_GUIDE.md`. Next.js dependency internals were not changed. No main push, merge, release dispatch or deployment was performed.

## Verified stack and build

| Area | Repository evidence | Finding |
| --- | --- | --- |
| Framework | `package.json`, `package-lock.json` | Next.js 16.3.8, React/React DOM 19.2 ranges, TypeScript; npm lockfile |
| Routing | `src/app/`, `src/constants/routes.ts` | App Router with static index and dynamic content pages |
| Hosting | `next.config.ts`, `.github/workflows/deploy.yml` | GitHub Pages static `out/` export, trailing slashes, unoptimized images |
| Runtime | `package.json` | Node >=20.9; CI uses Node 20; audit environment used Node 24.19 |
| Styling | `src/styles/`, `postcss.config.mjs` | CSS token/presentation modules; Tailwind 4/PostCSS dependencies |
| Fonts | `src/app/layout.tsx`, `src/assets/fonts/` | Local Manrope body and Bricolage Grotesque headings; no font CDN request |
| Content processing | `src/lib/content/posts.ts` | Build-time YAML + unified/remark/rehype pipeline with sanitization |
| Checks | `package.json`, `scripts/*.test.ts` | ESLint 9, tsc, 26 Node tests through tsx; static build + cleanup |
| Backend | Route inventory/config | No API routes, database, CMS or authentication backend |

Server-rendered static content remains appropriate. There is no evidence justifying a framework replacement or paid backend.

## Routes and publishing boundaries

| URL | Implementation | Current publication |
| --- | --- | --- |
| `/` | `src/app/page.tsx`, `src/data/home.ts` | Enabled |
| `/about/` | `src/app/about/page.tsx`, `src/data/about.ts` | Enabled |
| `/resume/` | `src/app/resume/page.tsx`, `src/data/resume.ts` | Enabled; CV points to `/files/Meet-Thummar-CV.pdf`, which exists |
| `/skills/` | `src/app/skills/page.tsx`, `src/data/skills.ts` | Enabled |
| `/contact/` | `src/app/contact/page.tsx`, `src/data/contact.ts` | Enabled; direct mailto, no form |
| `/projects/`, `/projects/[slug]/` | Project pages and adapter | Disabled globally |
| `/blog/`, `/blog/[slug]/` | Blog pages and adapter | Disabled globally |
| `/404.html` | `src/app/not-found.tsx` | Static error document |
| `/robots.txt`, `/sitemap.xml` | Static metadata routes | Enabled; sitemap excludes disabled sections and samples |

`src/constants/page-visibility.ts` drives navigation and route guards through `src/lib/page-visibility.ts`; static parameters and `scripts/finalize-export.ts` remove disabled generated directories and `_unpublished` helper paths. Merely hiding navigation is not sufficient. Preserve this coordinated behavior during any route rename. Proposed Experience/Writing routes must coexist with old URLs through real static alias pages where needed; GitHub Pages cannot use Next.js runtime redirects. Existing disabled sample detail URLs should continue returning 404 until an explicit publication decision.

## Current content and component inventory

Identity and page copy live in `src/data/{profile,home,about,resume,skills,contact,cv}.ts`; models in `src/data/types.ts`. Preserve the supplied Meet Thummar identity, verified career facts, public contact/CV/social links and confidentiality boundaries. The completed questionnaire under `docs/planning/` is preserved evidence, not permission to overwrite newer source facts.

Projects contain exactly two explicitly fictional samples (`workflow-workspace`, `learning-notebook`) in `src/data/projects.ts`. Blog has one sample Markdown file, `content/blog/a-place-for-technical-notes.md`, with `published: true` and `placeholder: true`, but the whole section is disabled. These are not the four genuine experience stories or six original essays required by MEE-8/MEE-9. Do not relabel sample work as delivered experience.

The project adapter validates slugs, unique sections, HTTPS links and media. The blog adapter validates YAML, published dates, heading hierarchy, local images and duplicate slugs; strips raw HTML/unsafe markup; computes reading time at 200 words/minute. Drafts are excluded. Important migration gap: published posts currently require a date, whereas the new brief allows omitted dates unless authentic; project content is TypeScript rather than Markdown. Extend adapters deliberately under MEE-6/MEE-10 instead of introducing a parallel publishing engine.

There are 18 shared component files. Major shell modules are `navigation`, `profile-card`, `theme-toggle`, `site-link`, `site-image`, `connection-provider`, `shell-motion`, `celestial-body` and `site-scenery`. Content uses `page-heading`, `timeline`, `project-visual` and `section-placeholder`. Season picker, scenery-motion toggle and role rotator exist; existence alone does not imply mounting. The global layout currently includes portrait/profile UI on every route and no footer. Native links and skip navigation, reduced-motion handling and blocked-storage fallbacks must survive the redesign.

## Design and asset audit

`src/styles/colors.css` currently has warm neutral surfaces, blue accents and navy dark surfaces. `globals.css`, `polish.css`, `scenery.css` and `seasons.css` implement layout, responsive detail and animated landscapes. Theme initialization in `src/lib/theme.ts` uses visitor-local day/night hours and session storage, rather than the new OS-preference-first editorial theme brief.

| Asset family | Evidence | Provenance/licensing conclusion |
| --- | --- | --- |
| Manrope/Bricolage fonts | Local WOFF2 files and respective OFL text files | License notices present; retain them |
| Seasonal landscapes | `public/images/scenery/README.md`, `docs/decisions/seasonal-assets.json` | Repository records imagegen provenance; not the new abstract artwork deliverable |
| Portrait | `public/images/meet-thummar.{png,webp}`, profile data | Supplied personal portrait; no independent photographer license record verified |
| CV | `public/files/Meet-Thummar-CV.pdf` | Supplied public document; keep link and obtain approval before replacement |
| Icons/social/diagram | `public/icons/`, `public/images/{social-preview.png,note-flow.svg}` | Local assets; comprehensive third-party license/provenance record not verified |
| New Newsreader/Inter and abstract compositions | Absent from active implementation | Obtain licensed font files/notices and approved A03 artwork before integration |

No broad repository code license was found. Do not describe all assets or code as freely redistributable. Generated-art provenance is not a legal ownership determination. Unknown media rights must be resolved before reusing them in a new publication context.

## Deployment, SEO and risks

The Pages build workflow triggers on main pushes or explicit workflow dispatch, builds/tests source and uploads `out/`; only its deploy job on main has Pages write/OIDC permissions. A merge to main can automatically release the website. Therefore owner merge and deployment authorization must be considered together before any release PR; this audit does not change that workflow.

PR CI is `.github/workflows/ci.yml`; main includes CODEOWNERS and the engineering safeguards. CR002 does not match the `agent/**` bot workflow or the Work review task branch condition. A CR002 PR created through the owner connection will not receive that bot-only automation and cannot be self-approved by that same account. Do not bypass protection or silently rename the authorized branch; arrange an eligible human review separately. These are review-routing constraints, not blockers to preparing drafts.

`src/lib/metadata.ts` supplies canonical origin, OG/Twitter metadata and the local social image; `sitemap.ts` excludes samples and disabled sections. Keep those exclusions and update canonical URLs consistently if names change. Images are unoptimized for static export, so source dimensions/formats and loading priorities need performance review. Retained raster references and archived ZIP snapshots add repository weight; avoid unrelated cleanup in the redesign.

Potential clean-deploy concern: the Pages build runs typecheck before explicit route type generation; PR CI explicitly runs `next typegen`. Baseline typechecking was verified after generation here. Confirm the actual clean Pages job before release; no deployment success is inferred from local checks.

## Minimal-change architecture and dependencies

1. Retain Next.js App Router/static export, current verified content, safe Markdown renderer, validation, route visibility, SEO helpers and test harness.
2. MEE-6 defines the new seven-page IA, exact semantic palette, Newsreader/Inter typography, responsive shell and content schema before broad styling changes. It must explicitly resolve the conflict between older scenic-preservation documents and newer editorial tasks: portrait only About, quiet footer, abstract artwork, OS-first theme.
3. MEE-7 supplies approved original artwork/provenance; MEE-8/MEE-9 supply authentic experience/essay copy and redaction decisions. These are content dependencies, not permission to fabricate stories.
4. MEE-10 extends the existing content adapters with reviewed draft/review/published state, manifest and optional genuine dates. Preserve sanitation, permalink validation and sample exclusions.
5. Implement MEE-11/12 foundations and then page tasks in dependency order, with small reviewable commits. Do not publish hidden sections until approved copy and explicit visibility approval exist.
6. MEE-20 checks actual responsive renderings/accessibility/performance; MEE-21 owns preview, editorial approval, release/rollback; MEE-22 owns subsequent review. An audit is not release signoff.

## Reproducible verification, 13 October 2026

| Check | Observed result |
| --- | --- |
| `npm ci` | Passed: 462 packages installed; ESLint support/deprecation warning observed |
| `npx next typegen` | Passed |
| `npm run lint` | Passed, zero warnings |
| `npm run typecheck` | Passed after route type generation |
| `npm test` | Environment failure: tsx CLI cannot create IPC pipe (`EPERM`) |
| Equivalent `node --import tsx --test` with the five existing test files | Passed: 26/26, no skips/failures |
| `npm run build` | Next.js compile/typecheck/static generation succeeded; postbuild tsx CLI hit the same IPC restriction |
| `node --import tsx scripts/finalize-export.ts` | Passed; removed generated projects/blog directories |
| Source diff | Only this audit document is intended; no application/config/dependency changes |
| Browser, live routes, Lighthouse, deployed CI | Not performed; no claims made |

The loader fallback executes the same TypeScript scripts without the CLI IPC server. It does not modify package scripts or establish compatibility on every Node version.

## Regression checklist for subsequent PRs

- Preserve the five existing public page URLs, real CV/contact/social links and identity.
- Verify real 404s for disabled sections, drafts, samples and unknown slugs; check sitemap/canonical agreement.
- Test both themes, no initialization flash, persisted explicit choice, unavailable storage and reduced motion.
- Verify keyboard mobile navigation, visible focus, skip link, heading hierarchy and long code/table overflow.
- Check 320/375/768/1024/1440 layouts; portrait only About after approved redesign; decorative artwork must not obstruct text.
- Verify exact 4 experience/6 essay inventory only when factual/editorial approval exists; no invented dates, metrics or clients.
- Run clean install, type generation, lint, typecheck, tests, static build and generated-output cleanup; record failures honestly.
- Before release inspect main approval, deployment authorization, Pages build, rollback commit and actual deployed routes.
