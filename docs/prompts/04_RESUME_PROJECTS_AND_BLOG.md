# Step 4 follow-up — Add real projects and blog posts when ready

Use this prompt in a new chat when approved content becomes available. Provide the local repository folder, this file and the actual project/article materials. Conversation history is not required.

## Ready-to-use instruction

Continue my existing personal website in the repository I provide. Read `AGENTS.md`, `docs/PROJECT_CONTEXT.md`, `docs/MAINTENANCE.md` and this prompt before editing. Inspect current source and Git changes. Projects and Blog engines are already implemented but hidden; extend them rather than rebuilding the site. Preserve the final design, portrait behaviour, scenic theme/motion, accessibility, static hosting and current personal content. Source documentation author is `meetbyte`.

I will supply project details and/or article drafts. Use `docs/planning/PROJECT_BLOG_CONTENT_TEMPLATE.md` to identify missing facts. Establish which content I want added, whether it is draft or ready to publish, and which section I want visible. Ask for required missing information while continuing independent work. Do not invent clients, contributions, outcomes, metrics, dates or links. Generalize client identities unless I explicitly approve names for publication.

### Projects

Inspect `src/data/types.ts`, `src/data/projects.ts`, `src/lib/content/projects.ts`, `src/lib/content/images.ts` and the existing index/detail components. Add each real case study with unique lowercase hyphenated slug, title, summary, actual stack, overview, optional featured/category/visual/cover fields and supported optional sections. Useful sections are Context/Problem, My Role, Architecture, Decisions/Tradeoffs, Challenges, Outcome and Lessons. Use only supplied sections/results; omit unsupported or empty sections. The generic `github` field is for the actual source link and `demo` for the actual live link; both must be valid HTTPS URLs when present.

Local cover/screenshots use existing assets under `public/images/`, descriptive alt text and positive intrinsic width/height consistent with the actual image. Ask for missing supplied media if essential; do not make up screenshots of real deliveries. Replace/remove fictional examples only when requested. `placeholder: false` identifies an actual case study but is not a per-project draft switch: the current Project schema has no published field. Keep incomplete/private real projects out of the active exported `projects` array until approved, or propose a tested draft extension only if explicitly needed.

### Blog

Inspect `src/lib/content/posts.ts` and the current Markdown sample before authoring. Add one Markdown file under `content/blog/` for each supplied article. Frontmatter has nonempty title, unique slug, real quoted `YYYY-MM-DD` date, excerpt, tags array, explicit published boolean and a placeholder boolean when relevant. Use `published: false` for incomplete/unapproved writing. Real published writing uses `published: true` and `placeholder: false`. Do not invent a publication date; ask or use the owner's explicit date choice.

If a cover is supplied, use its local `/images/...` path plus coverAlt/coverWidth/coverHeight. Body headings start at `##`, follow an ordered hierarchy, and include descriptive alternatives for local inline images. Do not add unsafe raw HTML/MDX execution. Preserve sanitized GFM, readable code/tables, intrinsic image sizing and reading time. The frontmatter slug determines the URL independently of the filename. Duplicate published slugs must fail clearly.

### Publishing boundaries

Do not enable Projects or Blog merely because files were added. Adding draft material authorizes local content work, not public publication. If I explicitly request local activation of a section, change only that section's flag in `src/constants/page-visibility.ts`; leave the other as requested. Ensure navigation, feature links, editorial numbering, static parameters, sitemap and export cleanup follow the common visibility rules. Enabling a section exposes all its active case studies/published posts, so review the complete listing. Samples remain visibly identified, noindex and omitted from sitemap; Blog drafts have no listings/routes. Keep `/blog/_unpublished/` and `/projects/_unpublished/` absent from the final export.

### Verification and handoff

Run lint, typecheck, existing tests and the normal production build including postbuild. Exercise new listing/detail pages in a local static preview, with direct URL refreshes, correct HTTP status, readable long content, optional media, stable slug links, metadata, sitemap, both themes, mobile/desktop and keyboard access. Verify the requested final visibility state; do not leave unrelated sections enabled from private tests. Add meaningful tests only for any new schema/publishing behaviour. Preserve module/function descriptions with `@author meetbyte`; update the maintenance/context documents when behaviour changes.

Save a new dated content handoff under `docs/planning/` listing added files/slugs, confirmed content sources, draft/publication states, final flags, checks actually performed and missing inputs. Do not reuse historical validation claims. Do not stage, commit, push, dispatch or deploy without my explicit authorization.
