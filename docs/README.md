# Personal website documentation

This folder collects the existing plans, original prompts, implementation handoffs and architecture notes for `meetbyte.github.io`. Organized on 8 October 2026.

All imported documents and supporting files are byte-for-byte copies. Their original text, line endings, dates and historical claims have been preserved. Original files remain in their existing locations; no existing file was overwritten. Only this index is newly written.

## Start here

- [Master implementation plan](planning/MASTER_IMPLEMENTATION_PLAN.md): product direction, architecture, five implementation stages and existing commands for starting stages.
- [Completed content questionnaire](planning/PERSONAL_WEBSITE_CONTENT_COMPLETED.md): confirmed source material for the personal content. The current website wording lives in `src/data/`.
- [Maintenance guide](MAINTENANCE.md): the existing guide to editing content, configuration, shared modules and styles, with verification steps.
- [Repository README](../README.md): setup, commands, content authoring and deployment information.

## Folder guide

| Folder | Contents |
| --- | --- |
| `planning/` | The master plan, questionnaires, stage handoffs, status and review records. |
| `prompts/` | The original website-building agent prompt. No missing prompts have been reconstructed. |
| `decisions/` | Existing implementation notes explaining design choices and their verification. These are original notes, not newly invented architecture decision records. |

### Planning

| Document | Purpose |
| --- | --- |
| [Master implementation plan](planning/MASTER_IMPLEMENTATION_PLAN.md) | Original five-stage plan, static hosting constraints, data architecture and stage workflow. |
| [Content questionnaire](planning/PERSONAL_WEBSITE_CONTENT_QUESTIONNAIRE.md) | Original unfilled questionnaire. |
| [Completed questionnaire](planning/PERSONAL_WEBSITE_CONTENT_COMPLETED.md) | Confirmed answers and later updates, preserved as a source record. |
| [Stage 3 handoff](planning/STAGE_3_HANDOFF.md) | The repository's current Stage 3 handoff. |
| [Earlier Stage 3 handoff](planning/STAGE_3_HANDOFF_EARLIER.md) | A distinct earlier version retained without merging or rewriting it. |
| [Stage 3 status](planning/STAGE_3_STATUS.md) | Follow-up status, skills additions and remaining assets. |
| [Stages 4 and 5 handoff](planning/STAGE_4_5_HANDOFF.md) | Original content-engine, Contact, SEO and motion implementation record. |
| [UX, SEO and accessibility review](planning/WEBSITE_UX_SEO_ACCESSIBILITY_REVIEW.md) | Review and validation record from 8 October 2026. |

### Prompts

[Original website prompt](prompts/PERSONAL_WEBSITE_PROMPT.md) is copied from the existing `Promp for personal website.md`, including its spelling and content as written in the source. Its seven-step workflow differs from the later five-stage master plan; both records are retained. Existing stage-start commands remain in the master plan's **Commands for Starting Future Stages** section.

Exact artwork-generation prompts also exist in [celestial implementation notes](decisions/celestial-implementation-notes.md) and [the seasonal asset manifest](decisions/seasonal-assets.json). These original records are preserved in place within the decisions collection rather than rewritten as new prompts.

The operational [AGENTS.md](../AGENTS.md) and [CLAUDE.md](../CLAUDE.md) remain at the repository root so tools can continue discovering them.

### Decisions and implementation notes

| Document | Choices recorded |
| --- | --- |
| [Celestial implementation](decisions/celestial-implementation-notes.md) | Interruptible sun/moon theme transitions, CSS variables, reduced motion and original image-edit prompts. |
| [Seasonal implementation](decisions/seasonal-implementation-notes.md) | Visitor-local time, the visual seasonal calendar, scenery assets and provenance. |
| [Season previews and motion](decisions/season-preview-and-motion-notes.md) | Preview persistence, behind-card transitions and ambient movement. |
| [Layout cleanup](decisions/Layout-Cleanup-Notes.md) | Footer removal, native thin scrollbars, mobile disclosure fixes and optional header season preview. |

The seasonal manifest, ten linked PNG screenshots and one linked WebP animation are copied beside the original notes so their relative links still resolve. Website media under `public/` is unchanged.

## Reading historical records

Handoffs describe the website when they were written. Later work changed some behaviour: the Stages 4/5 handoff describes enabled Blog/Projects and an earlier portrait treatment; later records describe hidden sections and subsequent layout changes. Season-preview notes mention footer controls that the layout cleanup later removed. Use the maintenance guide and current source for today's behaviour.

Archived validation results were not rerun as part of organizing these files. Local preview URLs may no longer be running. Absolute screenshot paths in the Stages 4/5 handoff still point to their original local files; they have not been rewritten and will not work on another computer. Relative media links in the seasonal notes have their supporting files included.

## Source provenance

The source labels below identify original locations on the computer used for this organization:

| Label | Original folder |
| --- | --- |
| `Parent` | `D:\Projects\iMeetMinds` |
| `Repository` | `D:\Projects\iMeetMinds\meetbyte.github.io` |
| `Content outputs` | `C:\Users\Meet.Thummar\Documents\Codex\2026-10-06\referenced-chatgpt-conversation-this-is-an\outputs` |
| `Stage 3 outputs` | `C:\Users\Meet.Thummar\Documents\Codex\2026-10-07\see-now-header-looks-superficial-i\outputs` |
| `Stage 4/5 outputs` | `C:\Users\Meet.Thummar\Documents\Codex\2026-10-07\referenced-chatgpt-conversation-this-is-an\outputs` |

| Organized file | Original source |
| --- | --- |
| `planning/MASTER_IMPLEMENTATION_PLAN.md` | Parent: `# Meet Thummar Personal Website.md` |
| `planning/PERSONAL_WEBSITE_CONTENT_QUESTIONNAIRE.md` | Parent: `PERSONAL_WEBSITE_CONTENT_QUESTIONNAIRE.md` |
| `planning/PERSONAL_WEBSITE_CONTENT_COMPLETED.md` | Repository: `PERSONAL_WEBSITE_CONTENT_COMPLETED.md` |
| `planning/STAGE_3_HANDOFF.md` | Repository: `STAGE_3_HANDOFF.md`; identical to Stage 3 outputs: `Stage-3-Handoff.md` |
| `planning/STAGE_3_HANDOFF_EARLIER.md` | Content outputs: `Stage-3-Handoff.md`; differs from the repository version |
| `planning/STAGE_3_STATUS.md` | Stage 3 outputs: `Stage-3-Status.md` |
| `planning/STAGE_4_5_HANDOFF.md` | Stage 4/5 outputs: `Stage-4-5-Handoff.md` |
| `planning/WEBSITE_UX_SEO_ACCESSIBILITY_REVIEW.md` | Stage 4/5 outputs: `Website-UX-SEO-Accessibility-Review.md` |
| `prompts/PERSONAL_WEBSITE_PROMPT.md` | Parent: `Promp for personal website.md` |
| `decisions/celestial-implementation-notes.md` | Stage 4/5 outputs: same filename |
| `decisions/seasonal-implementation-notes.md` | Stage 4/5 outputs: same filename |
| `decisions/season-preview-and-motion-notes.md` | Stage 4/5 outputs: same filename |
| `decisions/Layout-Cleanup-Notes.md` | Stage 4/5 outputs: same filename |
| `decisions/seasonal-assets.json` and linked screenshots/animation | Stage 4/5 outputs: same filenames |
| Existing `MAINTENANCE.md` | Already in repository `docs/`; identical to Stage 4/5 outputs: `Website-Maintenance-Guide.md`, so no duplicate was added |

## Missing or unavailable sources

- No separate Stage 1 or Stage 2 handoff Markdown files were found in the repository, its parent or the inspected earlier website-task folders. Their planned scope remains available in the master plan. An earlier Stage 1 repository snapshot contains an old README and operational agent files; those were left as historical code-snapshot documentation.
- No separate later-stage agent-prompt Markdown files were found. Stage-start commands in the master plan are preserved, but they are not substitutes for missing original prompts.
- No standalone architecture decision record files were found. The original architecture material in the master plan, repository README, maintenance guide and imported implementation notes is indexed above.
- The referenced **GitHub Deployment Steps** conversation returns reference markers for its assistant replies, not their actual text or attached Markdown files. No deployment prompt/document was reconstructed from those markers.

The current ChatGPT project mirror's `sources/` folder contained no files during inspection. No synced project files were changed.

## Adding future documents

Put plans and handoffs in `planning/`, original agent prompts in `prompts/`, and decision explanations in `decisions/`. Add a link and source/date here. Keep distinct revisions under distinct filenames and document which later record supersedes an older one. Leave operational agent instructions at the repository root and published articles under `content/blog/`.

This organization does not stage, commit, push or deploy anything.
