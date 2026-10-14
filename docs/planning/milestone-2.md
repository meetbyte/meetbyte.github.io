# Milestone 2 — Core website

Scope confirmed with the owner on 13 October 2026: Home, About, Resume, Skills and Contact. Source branch: `feature/CR002_subtle_changes`. Main merges and deployment wait until final owner approval of the website; milestone progress does not authorize release.

The owner reviewed the current local site and approved the colors/fonts. Homepage artwork is explicitly deferred. Do not replace it with an unrelated landscape, stock image or placeholder panel.

| Task | Current implementation scope | Remaining dependency |
| --- | --- | --- |
| MEE-14 Home | Typographic identity, verified summary/philosophy, quiet contact invitation, publication-gated previews | Deferred MEE-7/MEE-13 artwork and approved MEE-8/MEE-9 preview content |
| MEE-15 About | Compact reading layout, actual portrait only here, narrative/interests/learning preserved | Final visual/editorial validation |
| MEE-16 Resume/Skills | Chronology, CV link, grouped competencies, separate exploratory learning | Full QA and final visual validation |
| MEE-19 Contact/interactions | Verified email/social/CV actions; keyboard/theme/mobile behavior | Full QA, external destination availability and final approval |

MEE-11/MEE-12 foundations and MEE-10 schema are implemented checkpoints on the same branch. Linear remains In Progress where release/editorial acceptance evidence is pending. MEE-8/MEE-9 draft inventory is not final approved copy. Experience/Writing templates (MEE-17/MEE-18) are the following content integration work, not a redefinition of this milestone.

All current Home copy is reused verbatim from approved existing `src/data/{profile,home,contact}.ts`; no first-person claims are generated in page code. Source data remains authoritative until approved Markdown site copy is deliberately imported. Featured Home content must satisfy both explicit section visibility and genuine approved published state, in manifest order, with at most three writing teasers. An unavailable section is omitted entirely rather than shown as an empty card.

Evidence is recorded under `docs/qa/milestone-2/` and earlier `docs/qa/core-pages/`. Checks do not prove a live deployment. Keep developing/pushing CR002 for owner-local preview; do not merge or modify publishing controls.
