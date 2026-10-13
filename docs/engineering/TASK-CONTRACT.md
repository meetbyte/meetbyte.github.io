# Standard task and PR contract

Each development issue must link to a Linear source requirement. Avoid copy-pasting the same instructions into multiple tools; store the canonical task once.

## Required task inputs
- Linear issue ID and stable URL
- Objective and acceptance criteria, including testable expected behavior
- Explicit in-scope paths or affected subsystem; out-of-scope constraints
- Dependencies, owner decisions and publication/privacy boundaries
- Evidence required for technical completion

## Cursor completion record (in PR description)
Use a compact machine-readable block followed by optional notes:

```yaml
issue: MEE-XX
task_status: evidence_ready
scope: [list-of-directories]
changes: [short-summary]
tests:
  lint: pass|fail|not_run
  typecheck: pass|fail|not_run
  test: pass|fail|not_run
  build: pass|fail|not_run
review_head_sha: <full-commit-sha>
known_risks: []
owner_decisions_needed: []
```

Never invent `pass` results or a SHA. Include relevant log/artifact URLs if available. The GitHub PR head SHA and CI run remain authoritative over the description.

## ChatGPT review output
- `PASS`: Acceptance checks supported by source diff and successful required checks.
- `CHANGES_REQUIRED`: Actionable defects, severity, exact changed path/line, and missing evidence.
- `HUMAN_DECISION`: Explicitly identify the undecidable product, factual or security choice.
- `BLOCKED`: Missing permissions, unavailable CI, ambiguous repository state, or failed retries.

A PASS can advance a Linear issue to **Ready for Owner Review**, not merge protected source code. For documentation-only investigations with no merge requirement, close only when the accepted artifact exists and the acceptance conditions are met.

## Idempotency and traceability
Before starting or acting on any event, check whether the same issue/PR/head SHA has already been processed. Avoid duplicate branches, PRs, comments and reruns. Never infer success from the Agent's own summary alone.
