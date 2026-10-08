# Prompt audit and provenance

Reviewed on 8 October 2026 against the current working repository and its existing documentation.

## Findings from the earlier organization

- `docs/prompts/` contained one original website prompt. It was not a complete sequence for rebuilding the final implementation.
- The original described seven stages, while the later master plan described five. Neither captured all later refinements in one active workflow.
- Some artwork-generation prompts were embedded in implementation notes/JSON, and parent/task folders held original source copies. These are historical records, not a usable end-to-end build sequence.
- Early handoffs described desktop avatar docking, enabled Blog/Projects and footer season/motion controls. The final working source uses a full-width vertical portrait crop, hides Blog/Projects and has no footer.
- Personalization extends beyond `profile.ts`: page metadata literals, 404 wording, contact, origin, storage namespaces, CV/portrait, social image and icon all need inspection.

## Resolution

All newly authored build instructions live directly in `docs/prompts/`: the numbered sequence, specification, persona input template and usage guide. [The original prompt](archive/PERSONAL_WEBSITE_PROMPT.md) remains unchanged under `archive/`. Existing planning/decision files remain unchanged in their categories. The initial documentation index is archived separately under `docs/archive/`.

The reusable workflow combines the **final observed source behaviour** into a new specification. It is explicitly newly written; it does not pretend to recover missing conversation messages or prompts. Historical original image prompts remain linked in the decisions records and are not executed by default. The [reference snapshot](reference/README.md) supplies exact code, fonts and artwork for reproduction.

## Originals outside the active prompt folder

| Original location | Classification and organized reference |
| --- | --- |
| `D:\Projects\iMeetMinds\Promp for personal website.md` | Historical source, identical to the archived prompt under `docs/prompts/archive/`. |
| `D:\Projects\iMeetMinds\# Meet Thummar Personal Website.md` | Historical plan, copied verbatim into `docs/planning/MASTER_IMPLEMENTATION_PLAN.md`. |
| `D:\Projects\iMeetMinds\PERSONAL_WEBSITE_CONTENT_QUESTIONNAIRE.md` | Original questionnaire, copied verbatim into `docs/planning/`. |
| Earlier website task output folders | Original handoffs, implementation notes, screenshots and asset manifest; copied/indexed in the historical documentation. |

These external originals are preserved source material, consistent with the original instruction to preserve existing text. They are not dependencies or active prompt files. Copying the complete `docs/prompts/` folder is sufficient to carry the reusable instructions and source reference to another computer. No instruction in that workflow requires these absolute external paths.

## Repository-root documents consolidated

`PERSONAL_WEBSITE_CONTENT_COMPLETED.md` and `STAGE_3_HANDOFF.md` now exist only under `docs/planning/` within this repository. Their former root-level copies were removed after verifying identical SHA-256 hashes. The preserved records are planning/content inputs, not agent build prompts. Active build prompts remain numbered under `docs/prompts/`; original source prompts remain in `docs/prompts/archive/`.
## Source controls and limits

The baseline is the current **working tree**, not a claim about what is committed on main. `reference/SOURCE_MANIFEST.json` records each source/asset byte hash and the archive hash. The archive was read back and verified against that manifest and the current source. It excludes dependencies, build output, Git metadata and secrets, and includes the public reference identity so reproduction can retain it.

The active specification was checked against the existing config, data schemas, styles, shell/motion, theme/season/connection modules, content adapters and deployment workflow. Clean-destination framework type generation follows the installed Next.js CLI guide. Relative links, listed source paths and archive integrity were checked during preparation.

These checks do not constitute executing all prompts in a fresh agent session or validating a new persona's generated site. Future builds must perform prompt 08's actual command/visual/identity checks. Prompt-only regeneration can vary; matching code, locked dependencies and source assets is the reproducible baseline.

## Follow-up continuity review

The repository now has `docs/PROJECT_CONTEXT.md`, a standalone Step 4 content prompt, an intake worksheet and a commenting guide, linked by the root agent instructions and README. Source descriptions were audited across 76 authored code/style/config/test files; missing module/function documentation was added with author `meetbyte`. Executable TypeScript/JavaScript and stylesheet tokens were compared during preparation to keep this a comment-only source change.

The specification was corrected to distinguish the retained full-scenery opt-in component from mounted UI. The source snapshot is refreshed to include the current documented implementation; its earlier version is preserved under `docs/archive/reference-before-source-documentation/`. Historical absolute screenshot links remain unchanged, with portable copies of their images indexed in the continuity review. Actual final check outcomes belong in the dated repository review rather than inferred from older notes.
