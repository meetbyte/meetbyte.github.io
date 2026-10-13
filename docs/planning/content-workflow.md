# MEE-10: Editorial source and publishing workflow

Development checkpoint, 13 October 2026. [Linear MEE-10](https://linear.app/meet-thummar/issue/MEE-10/e03-create-content-library-manifest-and-publishing-workflow). Implementation stays on CR002; the final owner-approved main merge releases the website.

## Source contract

`content/experience/` holds four deterministic inventory files from MEE-8. `content/writing/` holds six from MEE-9. These initial files are unpublished preparation records, **not completed or approved personal narratives**. `content/site/` is reserved for approved site copy; current verified `src/data/` remains authoritative until deliberate import. Do not create competing versions of career facts.

Each Markdown filename equals its stable `id` plus `.md`. Required YAML fields: `id`, `title`, `slug`, `summary`, `category`, `seoDescription`, `status` (`draft`, `review`, `published`). IDs/slugs use lowercase hyphenated words. Optional fields: `tags` (string array), `placeholder` (boolean), `publishedAt`/`updatedAt` (genuine date-only ISO strings), `ownerApproval` (reference to actual owner signoff), `cover` (`src`, `alt`, `width`, `height`). Never fabricate dates or signoff references. Reading time is computed from whitespace-separated source words at 200 words/minute; it cannot be set in frontmatter.

Published records require genuine body copy, a recorded owner approval reference and `placeholder != true`. The reference documents a decision; it does not independently authenticate an owner or authorize main deployment. Draft and review records still validate their schema, headings, media and links, but never become public entries. A file's presence is not publication permission.

`content/manifest.json` has `schemaVersion: 1`, exactly four `experienceIds`, six `writingIds`, and ordered `homeFeaturedExperienceIds`/`homeFeaturedWritingIds`. Featured writing is limited to three. No featured selection can refer to missing, wrong-kind, duplicate or unpublished content. The initial featured lists are empty. Duplicate IDs or same-section slugs fail validation across all statuses, preventing hidden collision surprises at publication.

## Lifecycle and responsibilities

1. ChatGPT prepares original drafts under MEE-8/MEE-9 using verified inputs, retaining source records and uncertainty in editorial notes. Drafts stay `draft`; no invented anecdotes, metrics, employers or client names.
2. Technical/factual read-through and privacy/redaction checks move suitable copy to `review`. Record unresolved questions in Linear, including the APEX email/export boundary and unconfirmed security claims.
3. Owner verifies first-person claims, editorial voice and confidentiality. Record the exact signoff link/reference before changing status to `published`. Preserve approved source text and review notes in Git/Linear.
4. Implementation imports approved copy using the normalized build-time model. Public page/list/metadata code must use `getPublishedEditorial`, not `getEditorialLibrary().entries`. Section visibility is a separate explicit owner decision; publishing a record does not enable Experience/Writing.
5. QA verifies real routes, compatibility links, image dimensions, sanitization, accessibility, Home selections and sitemap. Final owner-approved main merge/deployment remains the release gate. Keep Linear In Progress while release-dependent evidence is pending.

Do not promote legacy samples by changing their flag. Existing blog/project adapters and their sample exclusions remain intact; editorial content reuses the shared sanitized Markdown renderer. Raw HTML is discarded, unsafe/non-HTTPS external Markdown links are rejected, images must exist locally under `/images/`, and body headings start at h2 without skipped levels. Build-time filesystem/parsing code belongs in server page/data imports; never import it into a client component.

## Validation evidence

`scripts/editorial.test.ts` checks inventory count, publication gating, signoff references, filename/slug safety, genuine date validation, computed reading time, sanitized HTML, rejected unsafe links/media/headings, route/ID collisions and unpublished Home selections. Legacy content tests protect normalization and sanitization parity. Static sitemap generation validates the entire inventory even while both new sections remain hidden; it adds no draft URLs.

Run normal repository lint/typecheck/tests/build. In the sandbox, documented `node --import tsx` equivalents avoid the tsx CLI IPC restriction. MEE-17/MEE-18 own actual page templates and canonical/compatibility route integration. MEE-8/MEE-9 still own final four/six approved copy files; this schema checkpoint does not satisfy their editorial acceptance criteria.
