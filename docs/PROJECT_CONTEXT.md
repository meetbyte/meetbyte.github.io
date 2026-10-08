# Website context for future work

Last reviewed: 8 October 2026. This is the repository handoff for future chats and agents. Continuing this website does not require the original ChatGPT project or conversation history.

## Start here

Inspect current source and local changes first. Read [the maintenance guide](MAINTENANCE.md) for file ownership and verification. Use [the prompt guide](prompts/README.md) for reproduction/adaptation, and [the ready-content follow-up](prompts/04_RESUME_PROJECTS_AND_BLOG.md) when adding real projects or writing. The [content intake template](planning/PROJECT_BLOG_CONTENT_TEMPLATE.md) captures facts without inventing them.

Author for source/module/function documentation: `meetbyte`. Follow [the commenting guide](COMMENTING_GUIDE.md). Keep this context current when behaviour or publishing choices change. A future persona input deliberately overrides the reference identity when adapting into a new destination.

## Current implementation

The website is Meet Thummar's portfolio at `https://meetbyte.github.io`, implemented with Next.js App Router, TypeScript, React, local fonts and a static GitHub Pages export. The source and local public assets live in this repository. The current professional content is in `src/data/`; [the completed questionnaire](planning/PERSONAL_WEBSITE_CONTENT_COMPLETED.md) is a preserved source record, not a instruction to replace newer approved data.

Public sections: Home, About, Resume, Skills, Contact. **Projects and Blog are implemented but hidden** by `src/constants/page-visibility.ts`. Their typed case-study and Markdown engines are ready; existing samples are fictional/illustrative. New genuine content is pending the owner's supplied material. One section may be enabled independently when expressly requested; do not enable the other automatically.

The shared shell keeps the scenic day/night design, persistent profile and reading panel. Desktop portrait cropping retains full width while shortening 290px to 180px; phone/short-window layouts dock the portrait into the header after it leaves view. There is no footer or visible pause control. `showSeasonPicker` is false. Day is 07:00–before 19:00 visitor-local; artistic seasons follow the reference India-inspired calendar. Theme travel passes behind opaque cards and can reverse mid-journey. Reduced motion remains supported. These choices should be preserved when adding content.

Limited connections use a light backdrop and navigation recovery. `SceneryQualityControl`/its full-artwork opt-in logic are retained but the control is not mounted. Do not restore removed controls during an unrelated content update.

## How the next projects/blog work should proceed

Use [04_RESUME_PROJECTS_AND_BLOG.md](prompts/04_RESUME_PROJECTS_AND_BLOG.md) in a fresh chat and provide the repository folder plus approved project/article material. Inspect the actual schemas/adapters before editing. Extend the existing engines; preserve current design, real personal content, static export and publication boundaries.

- Projects: edit `src/data/projects.ts`; optional case-study sections/media and genuine HTTPS links. Keep work/client names private unless explicitly approved. Never turn a fictional sample into a supposed real delivery merely by changing its placeholder flag.
- Blog: add `content/blog/<filename>.md` with validated YAML frontmatter. Slug determines the URL, published controls availability, and placeholder controls sample indexing. Published article headings start at h2 and must not skip levels. Local images must exist and have truthful alt text/dimensions.
- Use unique stable lowercase hyphenated slugs. Real published content uses `placeholder: false`; incomplete writing uses `published: false`. Preserve samples explicitly as samples unless replacement/removal is requested. A disabled section remains unavailable even if its content is ready.
- Enabling a section updates navigation, heading numbers, direct access, static params, sitemap and postbuild cleanup together. The normal build removes hidden and `_unpublished` export paths while preserving source content.

## Content and maintenance constraints

Current privacy preference: generalize client identities; use verified career facts and avoid invented metrics or outcomes. Distinguish professional experience from learning. Optional empty fields/arrays retain meaningful states. Contact is the approved public mailbox through mailto; no backend, CMS, analytics, authentication or runtime API.

Operational agent files remain at the repository root. Plans/handoffs belong under `docs/planning/`, decisions under `docs/decisions/`, active prompts under `docs/prompts/`, and original prompts under its `archive/`. The completed questionnaire and Stage 3 handoff exist only under `docs/planning/` inside this repository. Historical records can describe superseded controls; current source plus this context govern new work.

The full prompt pack and its source ZIP/manifest supply a portable implementation reference. Historical source paths and preview URLs recorded in older notes are provenance, not required services. Repository-contained copies hold the planning text, current data, public CV/portrait/artwork/fonts and active instructions. Original assistant replies represented only by reference markers were unavailable and were not reconstructed.

## Verification and release

Run `npm run lint`, `npm run typecheck`, `npm test` and `npm run build`. In a clean extraction run `npm ci` and `npx next typegen` before typechecking; use the documented Windows webpack fallback only if needed. Preview `out/` through a static host with real 404 responses. Check both themes, narrow/large layouts, keyboard navigation, reduced motion, Contact/CV, published detail routes and disabled/draft/sample boundaries. Save actual results in a new dated handoff under `docs/planning/`.

The GitHub Pages workflow builds from source and uploads `out/`; its deploy job is restricted to `main`. A local check is not proof of a live deployment. Do not commit, push, dispatch or deploy without explicit user authorization. Preserve any existing staged or unstaged changes when continuing.
