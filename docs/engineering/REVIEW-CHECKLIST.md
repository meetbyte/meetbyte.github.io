# Independent PR review checklist

Review **the actual GitHub diff at the current head SHA**, the linked Linear acceptance criteria, and CI statuses. Do not infer correctness from an Agent's completion message.

1. **Identity:** Correct repository, issue, base branch, PR author, latest SHA; no unrelated files or silent scope change.
2. **Safety:** No secret or credential exposure; no changes to merge rules, CI permissions or deployment scope without owner review; no data/privacy regression.
3. **Behavior:** Acceptance criteria demonstrably met; existing routes, drafts/hidden sections, user content and backwards compatibility preserved.
4. **Implementation:** Reasonable reuse of existing modules and types; no unapproved framework rewrite or new dependencies; no fabricated claims or metrics.
5. **Quality:** Required PR CI passed for the final commit. Where applicable, review typecheck, lint, unit tests, static export, accessibility and relevant responsive screenshots.
6. **Evidence:** Logs/screenshots/preview are linked where necessary; tests and deployment are not claimed based solely on written summaries.
7. **Policy:** Classify every changed file. Mixed or sensitive changes require owner review regardless of the extension.
8. **Result:** Return PASS, CHANGES_REQUIRED, HUMAN_DECISION or BLOCKED with a short, actionable explanation.

After an Agent correction, re-review the updated diff/CI evidence; do not carry approval forward automatically. Stop after two automated rework cycles.
