# Website release checklist — MEE-21

Prepared 14 October 2026. This is a release-ready source checklist, not a signed approval or deployment record. The owner requested all website implementation on CR002; protected main and deployment remain approval-gated.

## Candidate and baseline

- Candidate: final `feature/CR002_subtle_changes` head; record the full SHA and the QA evidence link in the final PR/Linear record.
- Main observed before this implementation: `7f1970f7610ae916605b84664f602e352073e8d1`. Re-read main immediately before preparing the release; do not assume this remains the rollback baseline.
- Canonical site: `https://meetbyte.github.io`.
- Source includes seven main sections, four case studies and six essays; `/projects/` and `/blog/` are noindex compatibility pointers. Fictional legacy samples, unknown/draft/reserved URLs must remain 404.

## Ready before owner approval

- [x] Implement the website on CR002 and retain the owner-requested non-draft presentation.
- [x] Use original approved-reference artwork with page-wide Home and distinct subtle internal treatments.
- [x] Preserve verified identity, confidentiality, CV, email and social destinations; no invented dates or metrics.
- [x] Retain protected-main rules, workflow identity/permissions and the existing review task.
- [ ] Attach the final commit-specific QA report and final CI evidence to the release record.
- [ ] Owner checks the final Home composition, all four case studies and six essays, redaction and mobile/dark/light views.
- [ ] Owner explicitly authorizes the final code merge **and** its automatic Pages deployment.
- [ ] Final eligible approving reviewer and required CI checks are present at the unchanged PR head.

The connected owner account cannot approve a PR it authored. Use an existing authorized distinct bot/agent review path or an eligible separate human reviewer; do not bypass CODEOWNERS, rewrite protection or lower review requirements. No new reviewer/controller is enabled by this checklist.

## Merge and deploy — only after authorization

1. Re-read PR head, base, state and required checks. Verify final owner approval applies to that head and the deployment consequence. Stop on a changed head or missing approval.
2. Use the existing protected GitHub process. Do not merge directly from local Git, force-push main or dispatch a release as a shortcut.
3. The existing Pages workflow builds source and deploys from main. Record the merged SHA, actual workflow run and environment result; a local build is not a deployment.
4. Verify every canonical page and all ten reading URLs on the real domain, canonical/sitemap agreement, aliases, legacy/draft 404s, CV, public contact links, theme persistence, keyboard navigation and artwork in both modes.
5. Record actual release evidence in Linear. Complete release-dependent issues only after their acceptance evidence exists; a technical PASS does not substitute for approval.

## Rollback

Before merge, record the prior approved main SHA and Pages deployment/run. If the release has a material regression, prepare a narrowly scoped revert PR to the prior approved state, with owner approval and normal checks. Do not reset/force-push main or silently deploy a different ref. Verify the resulting Pages run and live routes after the approved revert. Retain the failed release SHA and incident evidence in Linear so the correction can be reproduced.

## Current boundary

No main merge, deployment, live-domain validation or rollback was executed as part of this implementation task. These unchecked gates cannot be completed without final owner authorization and actual release evidence.
