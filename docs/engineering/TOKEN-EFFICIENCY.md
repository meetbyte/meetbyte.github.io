# Token and compute efficiency policy

Goal: minimize unnecessary AI tokens without sacrificing correctness or asking the owner to copy messages between tools.

- Keep architecture, approved copy and task acceptance criteria in version-controlled documents linked from Linear. Point the Agent to the relevant document and issue, not a large chat transcript.
- One scoped issue per Agent PR. Read the file tree and relevant files first; avoid repeatedly loading all source files.
- Run deterministic CI for lint, typecheck, tests and build before requesting another model review. GitHub Actions minutes are not Cursor model tokens.
- Have Cursor provide a concise file summary, known risks and evidence; have ChatGPT review the actual Git diff and CI rather than ask Cursor to rewrite its analysis.
- Batch mechanical errors by root cause; two automatic fix loops max, then stop with evidence.
- Avoid recurrent prompts to ask whether work is done. Trigger on new PR/updated SHA only after the appropriate integration is enabled.
- Favor targeted tests during implementation; run required full checks for the final PR.
- Keep model choice per task risk/cost; do not assume Composer, Grok or other models have identical context consumption.
- Track PRs completed per model-spend unit, CI re-run rates, and defects found after review. Do not optimize for low tokens if it increases rework.
- Cloud Agent / on-demand spending must have separate caps and explicit authorization before unattended operation.
