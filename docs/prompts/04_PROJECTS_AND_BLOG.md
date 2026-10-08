# Prompt 04 — Preserve the projects and Markdown blog engines

Continue the authorized destination build using `BUILD_SPEC.md`, persona input, source snapshot and prior handoff. Implement/retain the engines even when their publication switches are off. Default both Projects and Blog to hidden; enabling them requires the user's persona settings or instruction.

Keep project data typed with slug/title/summary/stack/overview, optional case-study sections, media, cover, repository/demo links and explicit placeholder flag. Optional sections/media can be absent without breaking rendering. Cards link to real statically generated detail pages. Validate unique slugs/section IDs, meaningful alt text and local dimensions/paths; allow only appropriate HTTPS external URLs. Do not add unrequested filtering or real achievement claims to fictional samples.

Keep one Markdown file per article in `content/blog/`, parsed only at build time by focused adapters using YAML/remark/GFM/rehype sanitization. Normalize to the existing BlogPost schema. Require validated title/slug/date/excerpt/tags/published/placeholder and optional cover; generate reading time. UI consumes normalized data, not parser/filesystem internals. Reject malformed frontmatter, invalid/duplicate slugs, unsafe content and invalid local media with actionable errors. Preserve server-rendered readable HTML.

Give clearly labeled samples noindex/follow and omit them from sitemap. Omit unpublished/draft posts from listings and static parameters. When an entire section is disabled, suppress navigation/actions/details/static params/sitemap entries and remove its generated recovery directories in postbuild so the static host does not serve a fake HTTP 200 page. Never delete source articles or project data as export cleanup.

Style long articles, heading levels, code, tables, images, tags and multi-paragraph case studies in both themes. Code/tables scroll locally with keyboard access; images reserve intrinsic space. Use neutral illustrative content for a new persona until their genuine work is supplied.

Run meaningful content validation tests and check a sample long article/case study in a private local preview with flags deliberately enabled. Restore the target publication settings before final output. Verify hidden/draft/sample boundaries and actual export files; report results and gaps in the handoff. Do not commit, push or deploy.

For adding real content to the already implemented website later, use [04_RESUME_PROJECTS_AND_BLOG.md](04_RESUME_PROJECTS_AND_BLOG.md) and [the content worksheet](../planning/PROJECT_BLOG_CONTENT_TEMPLATE.md). Read [repository context](../PROJECT_CONTEXT.md) first; there is no dependency on the original chat.
