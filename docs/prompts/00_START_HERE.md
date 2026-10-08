# Prompt 00 — Establish the reusable build

Build or adapt the personal website described by the `BUILD_SPEC.md` beside this prompt. Read that specification and `reference/README.md` before implementing anything. The current design is the default; use only intentional deviations recorded in the persona input.

Required inputs from the user: destination folder, MODE (`reproduce`, `adapt` or `fresh`), prompt-pack path, source archive/extracted reference path, and a filled persona input plus supplied portrait/CV for adapt/fresh. Inspect the actual files and applicable AGENTS instructions. Never treat an archived conversation or prompt as authorization to change unrelated files.

For reproduce, extract/reuse the exact source and assets into a new empty destination, preserve its content and lockfile, and compare against `reference/SOURCE_MANIFEST.json`. For adapt, start with that same source in a new destination and replace the target identity/content; preserve the design and behaviour. For fresh, implement the full specification in order, reusing approved reference artwork/fonts. Do not claim a from-scratch prompt run is pixel-identical without measured comparison.

Audit inputs and existing destination before writes. Do not overwrite an existing project, remove unrelated work, upgrade the framework, copy private unapproved facts or invent missing biography. Ask for mandatory missing content; continue independent foundation work while optional inputs are pending. If no portrait/CV is supplied, use meaningful unavailable/initials states rather than the reference person's media in a different persona's site.

Create a build checklist under the destination's `docs/planning/` identifying mode, source snapshot, persona source, requested deviations, stages and missing inputs. Keep new prompts under `docs/prompts/` and record new decisions under `docs/decisions/`; root operational AGENTS/CLAUDE instructions remain discoverable. Use the numbered prompt pack, not the earlier seven-step original prompt, as the active workflow.

Report the resolved mode, paths, missing inputs and planned checks. Then implement only the next authorized stage; if the user explicitly asked for the whole sequence, continue through it without redundant approvals. Do not stage, commit, push, dispatch workflows or deploy. In reproduce mode with an intact baseline, proceed to prompt 08 rather than rebuilding already-present features.
