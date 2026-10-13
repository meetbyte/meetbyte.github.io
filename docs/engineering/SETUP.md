# Rollout checklist: MeetByte AI review pipeline

This file documents **proposed setup**, not completed integrations.

## Stage 1 — Protect repository and add deterministic evidence
- [x] GitHub `protect-main` ruleset created (ID `24987299`), active for `main`, one approving reviewer, no bypass actors, force-push/deletion prohibited.
- [ ] **Change `Dismiss stale pull request approvals when new commits are pushed` to ON**. It was OFF when last inspected.
- [ ] Merge the proposed `.github/workflows/ci.yml` through owner-approved PR once the reviewer-identity problem is solved.
- [ ] Observe `PR Quality / quality` succeed in a real PR; add that exact status check to the ruleset.
- [ ] Test that a source/config PR cannot merge without eligible approval; a new commit invalidates the old approval; and direct pushes to `main` are rejected.

## Stage 2 — PR review without copy-and-paste
- [ ] Verify Cursor's GitHub/Linear integration and its PR author identity (ideally a distinct bot).
- [ ] Configure an authorized ChatGPT Work GitHub PR event trigger, if available to this account, to review the linked Linear issue, current PR diff and final CI evidence.
- [ ] Test on one small documentation PR: a concise finding/comment and correct Linear status, with no duplicate processing.

## Stage 3 — Bounded autonomous task progression
- [ ] Permit autonomous feature branches only for eligible, pre-approved Linear issues.
- [ ] Allow at most one active Agent, two correction cycles and a spending limit initially.
- [ ] Require owner approval for merging executable or sensitive changes; publication/deployment remains owner-controlled.
- [ ] Evaluate a trusted allowlist-aware docs auto-merge mechanism separately. Do not disable the global reviewer requirement as a shortcut.

## Important operational facts
This repository is Next.js 16 static-exported to GitHub Pages. The existing `deploy.yml` triggers on any push to `main`, validates and deploys. No standalone PR CI workflow existed at inspection. The active GitHub identity is `meetbyte`, and that user cannot approve their own PR. These details must be validated again before enabling unattended actions.
