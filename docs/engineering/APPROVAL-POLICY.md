# Approval and merge policy

## Non-negotiable rules
- `main` is protected by the `protect-main` ruleset. No Agent, workflow or connector may directly write, force-push, or bypass it.
- Source code, tests, database/API files, dependencies and lockfiles, runtime/publishing content, media, build/deploy configuration, `AGENTS.md`, AI instructions, and all security-related files **require explicit human owner approval before merging to main**.
- A mixture of safe docs and any other path is classified as human-approval-required.
- Every PR needs passing required CI and a current review of the PR's final commit. Do not rely on a stale approval after new commits.
- A ChatGPT technical `PASS` is not the owner's GitHub approval.

## Proposed future documentation allowlist
Only **after** an independently enforced, path-aware approval mechanism is tested may reports under `docs/audit/**/*.md` be considered for automated merge. `README.md`, `docs/planning/`, `docs/prompts/`, `docs/engineering/`, `content/`, `.github/`, and all other paths are **not** in the allowlist. Changes to symlinks, renames, deletions, executable files, sensitive content, or mixed PRs always require human review. Text extension alone is insufficient.

**Current state: all merges require the GitHub ruleset's approving reviewer. Automated docs merging is NOT enabled.** We must never set required reviews to zero for all PRs as a workaround.

## Human decision gates
Pause for owner approval when a task changes: architecture or product scope materially; authentic career details, stories or essays for publication; access/auth/security; hosting, domains or deployments; data migrations; spend limits; or application-visible behavior beyond approved acceptance criteria.

## Review identity
The connected GitHub account is `meetbyte`. That account cannot approve its own PR. PRs should be created by a distinct authorized Agent/bot identity if `meetbyte` is the designated reviewer. Validate bot identity and review eligibility with a harmless PR before enabling a closed-loop controller.

## Fail closed
If checks are missing, classification fails, the reviewed head SHA changes, owner approval cannot be established, or GitHub rejects the operation: do not merge. Record a concise Blocked reason in Linear and ask the owner only for the specific missing decision.
