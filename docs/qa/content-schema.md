# Content schema checkpoint — MEE-10

13 October 2026, CR002 development branch. No release, main merge or deployment.

Implemented an exact four-experience/six-essay inventory with deterministic filenames, draft/review/published schema, optional genuine dates, computed reading time, explicit signoff references and Home selection validation. All ten current preparation records are drafts; no finished or approved editorial copy is claimed. Static sitemap generation validates the inventory without exposing URLs. The shared Markdown renderer preserves legacy behavior and applies stricter link validation to new editorial content.

Observed checks:

- ESLint passed with zero warnings; TypeScript passed.
- 35 source tests passed, including six new editorial safety tests and legacy adapter tests. All 27 CI-signal safety tests passed unchanged.
- Production Next.js compilation, TypeScript and all 15 static page generation steps passed. Export cleanup passed; disabled Experience/Writing/Projects/Blog output removed.
- New test cases reject missing signoff, placeholders marked published, filename mismatch, unsafe slugs, invalid dates, authored reading time, duplicate IDs/routes, unsafe links, missing media, skipped headings, unknown manifest references and draft Home selections. Published fixtures with no authentic date remain valid without fabricated dates.

Environment: use the equivalent `node --import tsx --test` and cleanup command documented in the foundation report when the sandbox denies tsx CLI IPC. No new dependency or approval-control change. Browser checks are unchanged from the foundation; this checkpoint introduces no new visible UI. MEE-8/MEE-9 remain responsible for approved final copy, MEE-17/MEE-18 for real page templates. MEE-10 stays In Progress pending complete content import and final release evidence.
