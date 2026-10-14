# Post-release validation and revision protocol — MEE-22

Prepared 14 October 2026. Reproducible workflow for a future owner-approved release; it does not claim the unreleased website is live.

## Establish the reference

Record the released full SHA, Pages run, deployment URL, final source/design approval and QA report. Compare the actual release with the approved Home example: borderless page-wide art, concise identity and introduction, no portrait except About, current typography/colors and distinct restrained page atmospheres. Compare all four case studies and six essays with their accepted source files, not memory or a stale mockup.

## Review sequence

1. Open each canonical URL directly and after internal navigation. Check aliases and known legacy/sample/draft/unknown URLs, CV and mailto/social destinations.
2. Check 320/375/768/1024/1440 views in light/dark, OS default and one-click manual persistence, keyboard menu/skip link/focus, reduced motion and denied storage. Distinguish a first development compile from real production navigation behavior.
3. Check reading hierarchy, image/asset failures, content facts/redaction, optional real dates, computed reading time and sourced quotations and accurate attribution. Do not infer editorial approval from a published source flag.
4. Re-run the committed complete-site harness and selected Lighthouse checks. Keep automated violations, manual checks, lab measurements and live observations separate; never call an unperformed check passed.
5. Record a discrepancy with the route, released SHA, environment, viewport/theme, exact reproduction, expected versus actual result and a screenshot/log when useful. Never put personal/payment screenshots into broadly shared reports.

## Convert feedback into a Linear task

Reuse a matching open issue before creating another. Separate factual/confidentiality edits, functional bugs and visual changes when their acceptance differs. Specify severity and the smallest correction scope. Link the source record/design decision; do not broaden scope through comments or logs.

A useful task contains:

- Problem and concrete trigger, including route/viewport/theme/released SHA.
- Expected and actual behavior with relevant evidence.
- In-scope files/subsystem and preserved boundaries.
- Acceptance checks that distinguish a real correction from a cosmetic workaround.
- Owner decisions needed, especially a changed factual claim or publishing choice.

## Implementation handoff

Use this task prompt, substituting verified evidence:

> Implement the linked Linear correction against the recorded released SHA. Read protected repository instructions and relevant current context. Reproduce the reported issue, change only the named scope, preserve unrelated work and verified content, run the meaningful regression and required build checks, and commit on an authorized feature branch. Record the actual diff, full head SHA, tests and limitations. Do not merge main, deploy, dispatch another reviewer or change controls without owner authorization.

Keep code/source history in Git and intent/evidence in Linear. Update an existing evidence record where appropriate; avoid duplicate reviews or contradictory status claims. Preserve original approved editorial copy in history and identify why each revision changed. Count repeated corrections and stop with a concrete blocker when the existing bounded protocol requires it.

## Close the loop

Owner approves the correction and any release consequence. After the protected merge and actual Pages deployment, repeat the failed check against the released correction SHA and verify surrounding behavior. Only then close release-dependent work. If publication is blocked, keep active work In Progress with the precise remaining gate; never create new workflow/status controls to make the report look complete.
