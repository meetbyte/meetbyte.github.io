# Project and blog content intake

Copy the relevant section for each new item. This is an input worksheet: blank or `TBD` fields are not content to publish. Supply only facts and media approved for public use.

## Request scope

- Add: projects / articles / both
- Destination repository:
- Keep sections hidden, or explicitly enable which section locally:
- Content approval owner:
- Client/person/company names that must stay private:
- Existing samples to retain/remove/replace:
- Commit/push/deploy authorization: none unless explicitly provided

## One real project

- Stable lowercase hyphenated slug:
- Title:
- One-paragraph card summary:
- Actual technology/tools stack (can be empty if not relevant):
- Overview and context/problem:
- Your actual role, scope and collaborators:
- Architecture/approach:
- Engineering decisions and tradeoffs:
- Challenges and how they were addressed:
- Outcome supported by evidence (omit unsupported metrics):
- Lessons:
- Category (optional):
- Featured in listing: yes/no
- Source repository HTTPS URL (optional):
- Live demo HTTPS URL (optional):
- Cover/screenshots: supplied files, publication consent, truthful alt text, actual dimensions and captions
- Which facts are ready for public use:
- Missing/private details:

The current project schema has no individual draft/published flag. An unapproved real case study should remain outside the active `projects` array until ready. `placeholder` identifies an illustrative sample, not a private draft. Turning on Projects reveals all active entries.

## One blog article

- Stable lowercase hyphenated URL slug:
- Title:
- Approved publication date, `YYYY-MM-DD`:
- Short excerpt:
- Tags (or empty list):
- State: draft / approved published content
- Genuine article or explicitly illustrative sample:
- Draft body and source/reference material:
- Supplied cover/inline images with publication consent, alt text and actual dimensions:
- Requested editorial changes and tone:
- Technical claims to verify:
- Content/client names to redact:

Frontmatter fields: `title`, `slug`, `date`, `excerpt`, `tags`, `published`; use `placeholder: false` for genuine approved writing. Covers also need `cover`, `coverAlt`, `coverWidth`, `coverHeight`. Published headings begin at h2 without skips. Drafts use `published: false` and do not get routes; enabling Blog reveals every published article. Do not guess dates or publish input placeholders.

## Review checklist

Confirm factual accuracy, privacy approval, supplied media rights/alternatives, link destinations, final listing visibility, public slug stability and whether replacing samples affects existing links. Publication to the live host is a separate authorized action.
