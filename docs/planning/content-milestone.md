# Content milestone — development checkpoint

Owner direction on 13 October 2026: proceed with the next milestone, add Writing, and defer audit/review for now. All implementation stays on CR002; main merging and deployment still require final owner approval. No formal MEE-20 audit, independent AI review or editorial signoff is claimed.

## Delivered drafts and templates

MEE-9 now has all six original draft essays in `content/writing/`, replacing preparation records. They use the exact approved titles, stable IDs/slugs, source-owned prose, computed reading time and no invented dates. Technical essays are approximately 687–731 words; the reflection is 550 words. No external quotations, borrowed anecdotes or invented client outcomes were introduced.

MEE-8 now has four draft case studies in `content/experience/`, led by the 453-word APEX narrative, with shorter modernization, tooling and production-investigation narratives. Verified contribution statements come from the completed repository questionnaire, current data and task brief. There are no client identifiers, quantified improvements, invented incidents or legal-compliance claims. Unconfirmed APEX details are explicitly unresolved, not asserted as delivered controls.

MEE-17/MEE-18 implement text-led indexes and sanitized reading pages, category/reading-time metadata, optional real dates, canonical metadata and ordered previous/next links. No stock art or fake screenshots. Artwork remains deferred.

## Local preview boundary

Run `npm run dev`: Experience and Writing navigation/routes are available locally, including all ten draft entries labeled Draft. Unknown slugs retain the route not-found behavior. Development preview metadata is noindex. This runtime exception was added for owner-local preview; the production `pageVisibility` switches and all content statuses are unchanged.

Production builds still expose only explicitly enabled, genuine owner-approved published content. All ten records remain `draft`, with no invented approval reference. Production static export removes the disabled Experience/Writing directories. Home continues to omit unpublished teasers and has no empty preview cards. This preview is not publication authorization.

## Deferred owner checklist

This checklist records pending decisions; it does not initiate a review now.

- Confirm the first-person voice and perspective of all six essays.
- Confirm factual contribution, chronology and redaction for each case study.
- For APEX: clarify email versus export delivery, dynamic-query behavior, exact User/Supervisor/Admin responsibilities, Microsoft directory/LDAP integration, masking, audit, scheduling, installation and HTML/CSS specifics before claiming their delivered implementation.
- Confirm genuine outcomes without adding unsupported metrics; confirm anonymity/client confidentiality.
- Decide final content edits, publication statuses, Home selections and section visibility at the final owner-release stage.
- Formal accessibility/performance/SEO/responsive audit, independent review and deployment verification remain deferred.

Do not mark MEE-8/MEE-9 Done from draft existence or MEE-17/MEE-18 Done from local routes alone. Record actual basic implementation checks in Linear. Keep approved source prose in Git and its discussion/approval evidence in Linear; no automatic rewriting in page code.

## Basic implementation checks

Observed 13 October 2026: lint and TypeScript passed; 37 source tests passed; production compile/typecheck and all 17 static-generation steps passed; export cleanup removed disabled sections. A local development HTTP smoke check returned 200 for both indexes and all ten reading pages, confirmed Draft/noindex metadata and sanitized reading containers, and confirmed local navigation with unpublished Home teasers still absent. No browser screenshot matrix, Lighthouse/accessibility audit, independent PR review or editorial approval was performed for this checkpoint. The sandbox used documented Node-loader equivalents where tsx CLI IPC is restricted.
