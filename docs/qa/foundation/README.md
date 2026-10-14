# Foundation milestone validation

Verified 13 October 2026 against the implementation on CR002. Scope: MEE-11 design foundation and MEE-12 shared shell. Development checkpoint on CR002; not a live release. The owner will review locally and approve the final website merge.

## What changed

- Local licensed Inter and Newsreader with font notices/fallbacks; approved semantic light/dark palette and responsive typography.
- System/Light/Dark appearance control, OS-first before-paint initialization, persistent explicit override, cross-tab synchronization and blocked-storage fallback.
- Slim native keyboard navigation, reading-region focus after client navigation, document scrolling, footer links; portrait only About.
- Scenic shell/travel unmounted. Existing five public routes/content/CV/social links preserved. Experience/Writing route slots remain hidden along with Projects/Blog; no content publication or fake case studies.

## Actual results

- Next.js route type generation and production build passed, including TypeScript. Static output cleanup passed using `node --import tsx scripts/finalize-export.ts`.
- ESLint passed with zero warnings.
- 29 TypeScript tests passed, including actual light/dark token contrast, theme startup failure cases and hidden-route boundaries. Existing 27 signal safety tests passed.
- Browser: headless Chromium 153 through Playwright; 50 route/theme/viewport cases (Home/About/Resume/Skills/Contact × light/dark × 320/375/768/1024/1440). No page horizontal overflow, one h1 per page, portrait only About, no footer overlap, no JavaScript runtime errors.
- Persistent override survives reload and ignores OS changes; System tracks OS changes. Denied localStorage still permits in-memory selection. Menu Escape returns focus to summary; client navigation focuses main. Disabled/unknown paths returned 404; CV returned 200.
- Body/supporting/link text and primary button labels meet 4.5:1 for declared reading surfaces; focus color meets 3:1. This is not a complete WCAG certification or Lighthouse report; full audit belongs to MEE-20.

Screenshot filenames encode route, mode and viewport. `browser-results.json` records the checked matrix. The current Home/About copy is inherited; final page composition and original artwork belong to subsequent milestones.

## Reproduction

Run a clean `npm ci`, `npx next typegen`, `npm run lint`, `npm run typecheck`, `npm test`, and `npm run build`. In this sandbox the tsx CLI IPC socket is denied; the same scripts were run with `node --import tsx --test scripts/*.test.ts` and `node --import tsx scripts/finalize-export.ts`. No package script was changed to mask this environment restriction.

For browser checks, install Playwright in a separate tooling environment and its Chromium browser. From the repository root run `node scripts/qa/foundation-browser.mjs`. Optional environment variables: PLAYWRIGHT_MODULE_PATH points to that environment's Playwright module; FOUNDATION_BROWSER_EXECUTABLE selects an existing Chromium executable. The harness hosts `out/` on localhost:4173 and handles exported RSC text responses. It regenerates the screenshot/result evidence. No production service or account is contacted.

## Milestone boundary

Main remains unchanged by this work. MEE-11/MEE-12 stay In Progress with implementation evidence; final owner approval and merge are required for release completion. Experience/Writing stay unavailable until real content and visibility are approved. Content, artwork, release and post-release tasks are not completed by this milestone.
