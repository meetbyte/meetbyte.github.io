# Reusable personal website build prompts

Use this folder as the single entry point for building this portfolio or adapting it for another person. These prompts were written on 8 October 2026 from the **current working source**, including the changes made after the original implementation plan. They are newly authored instructions, not recovered historical conversations.

## Continue the existing website when content is ready

Read [repository context](../PROJECT_CONTEXT.md), then use [the Step 4 follow-up](04_RESUME_PROJECTS_AND_BLOG.md) with approved project details or article drafts. This is a standalone prompt for a fresh chat; it reuses the implemented engines and preserves the current design. Capture inputs in [the content worksheet](../planning/PROJECT_BLOG_CONTENT_TEMPLATE.md). Projects and Blog remain hidden until explicitly enabled; neither the old ChatGPT project nor its messages are required.

## Choose your starting point

**Reproduce the current website:** use the source archive in [reference](reference/README.md), its lockfile, fonts and existing artwork. Extract it into a new empty folder, read [BUILD_SPEC.md](BUILD_SPEC.md), then give the agent [00_START_HERE.md](00_START_HERE.md) with `MODE: reproduce` and the paths to those files. Keep the supplied personal data and media. Run stage 08 to verify the result.

**Create another person's website with the same design:** copy [PERSONA_TEMPLATE.md](PERSONA_TEMPLATE.md) to a separate `PERSONA.md`, fill in the new person's approved content, extract the same source archive into a new empty folder, then use stage 00 with `MODE: adapt`. Work through the relevant numbered prompts in order. Stage 03 and the identity checks in stage 08 are required; other stages preserve existing features unless changes are requested.

**Build from scratch:** use `MODE: fresh`, the same specification, persona file and reference assets, and run all numbered stages in order. This reconstructs the design and features; it does not guarantee identical source code or pixels. AI responses, regenerated images, browser rendering and dependency changes can vary. Source reuse is the reliable way to preserve this implementation.

The source archive includes the current uncommitted website implementation. Checking out the public repository's `main` branch may give a different website. The archive is a local reference artifact; creating it does not commit, push or deploy anything.

For a clean extracted destination, initialize generated framework types before checking them:

```sh
npm ci
npx next typegen
npm run lint
npm run typecheck
npm test
npm run build
```

`next typegen` is provided by the installed, locked Next.js package. It recreates route types and `next-env.d.ts`; generated `.next/` files are intentionally absent from the archive. This bootstrap is documented in the installed Next.js CLI guide.

## What to provide to the agent

Keep the prompts and reference folder available beside the destination project. Give the agent:

1. The destination project path and explicit mode: `reproduce`, `adapt` or `fresh`.
2. This folder and [BUILD_SPEC.md](BUILD_SPEC.md).
3. The filled `PERSONA.md` for adaptation/fresh work, plus the person's portrait, CV and approved media.
4. The source archive or an extracted copy and [reference/SOURCE_MANIFEST.json](reference/SOURCE_MANIFEST.json).
5. Any deliberately requested departures from the baseline design. The default is to keep the current design.

Use a new destination for a different person. Do not ask the agent to replace the current website unless you intend to change it. Never publish the reference persona's biography, portrait, CV, email or social links as someone else's identity.

## Run the prompts in this order

| Prompt | Work and expected result |
| --- | --- |
| [00 — Start here](00_START_HERE.md) | Establish inputs, mode, baseline and a clear implementation checklist. |
| [01 — Foundation](01_FOUNDATION.md) | Static export, dependencies, folder ownership and build commands. |
| [02 — Design and navigation](02_DESIGN_AND_NAVIGATION.md) | Responsive workspace, typography, palette, persistent profile and usable navigation. |
| [03 — Persona and content](03_PERSONA_AND_CONTENT.md) | Approved identity, career, skills, CV, copy and all metadata replacements. |
| [04 — Projects and blog](04_PROJECTS_AND_BLOG.md) | Typed case studies and sanitized Markdown, hidden by default. |
| [04 follow-up — Real content](04_RESUME_PROJECTS_AND_BLOG.md) | Resume later with supplied projects/articles; review drafts, samples and local visibility. |
| [05 — Portrait and motion](05_PORTRAIT_AND_MOTION.md) | Full-width vertical portrait crop, mobile identity docking and restrained route/scroll motion. |
| [06 — Time, scenery and themes](06_TIME_SCENERY_AND_THEMES.md) | Day/night clock, seasons, reversible sun/moon journey and weak-connection fallback. |
| [07 — Contact and release configuration](07_CONTACT_AND_RELEASE.md) | Direct contact, SEO, real 404 export behaviour and local deployment preparation. |
| [08 — Verify and hand off](08_VERIFY_AND_HANDOFF.md) | Commands, visual/interaction checks, identity audit and a reviewable final report. |

Read each complete Markdown file as the prompt. Each stage repeats its required inputs so it can be used in a separate chat. Carry the destination, persona file, specification and previous handoff into that chat. Report actual results and missing inputs; never present a historical test result as a new check. Advance to the next stage when the user requests it or has explicitly authorized the whole sequence.

## Which files are authoritative?

The [audit and provenance report](AUDIT_AND_PROVENANCE.md) explains why some original source copies remain outside this folder and how the active workflow replaces conflicting earlier instructions.

- `BUILD_SPEC.md` describes the final reference behaviour. It supersedes conflicting old prompts and handoffs for this reusable workflow.
- `PERSONA.md` supplies the target person's facts and requested settings.
- Numbered files are the active build instructions. Future prompt updates belong here.
- [The archived original prompt](archive/PERSONAL_WEBSITE_PROMPT.md) is preserved verbatim as history. It describes an earlier seven-stage approach.
- Older plans remain in `docs/planning/`, and existing implementation notes remain in `docs/decisions/`. They explain provenance; they are not additional prompts to execute.
- The original files outside the repository remain historical source copies. The reusable workflow has no dependency on those external paths.

Prompt-pack maintenance should update the specification, affected stage prompts and reference snapshot together when the intended baseline changes. Do not silently regenerate the snapshot from a different persona.

No build was regenerated from these prompts during their preparation. The reference snapshot was checked against the current source; the prompts were checked for source paths, consistency and links. Stage 08 specifies the checks a future build must actually perform.
