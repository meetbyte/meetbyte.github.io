# MEE-6: Editorial MeetByte design specification

Prepared 13 October 2026. Status: proposed for owner design approval; not implementation or publication approval.
Depends on [MEE-5 audit](../audit/current-state.md). Task: https://linear.app/meet-thummar/issue/MEE-6/a02-prepare-final-ia-design-tokens-and-content-schema

## Direction and precedence

Retain Next.js/static export and existing validated content engines. Apply the newer Linear editorial brief: quiet typographic composition, blush/red light mode, charcoal/burgundy dark mode, Newsreader + Inter, original abstract art, portrait ONLY About. This proposed redesign supersedes the scenic shell/portrait-on-all-pages/no-footer constraints in the older PROJECT_CONTEXT and MAINTENANCE documents only after owner approval. Until approval, those source constraints remain in force. Preserve verified facts, URLs, confidentiality, publishing flags and GitHub controls.

## Route and navigation contract

| Label | Canonical route | Compatibility |
| --- | --- | --- |
| Home | / | Existing URL |
| About | /about/ | Existing URL |
| Resume | /resume/ | Existing URL |
| Skills | /skills/ | Existing URL |
| Experience | /experience/ | /projects/ static alias only when section is authorized |
| Writing | /writing/ | /blog/ static alias only when section is authorized |
| Contact | /contact/ | Existing URL |

Experience and Writing remain hidden until approved content and visibility signoff. Detail routes use /experience/slug/ and /writing/slug/. Preserve real existing content slugs when migrating; do not expose fictional sample aliases. Compatibility pages use a real accessible link, canonical target and noindex; no server-dependent redirects. Sitemap contains only enabled genuine published canonicals. Static unknown/draft routes must return 404.

## Exact semantic palette

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| page | #FFF8F5 | #181417 | Document background |
| surface | #FFFFFF | #231C20 | Quiet panels/reading surface |
| surface-muted | #F6E9E6 | #30232A | Subtle inset regions |
| text | #30252A | #F7EDE9 | Primary copy |
| text-secondary | #67565F | #CEB9C1 | Supporting copy |
| accent | #8C3448 | #E3A4B4 | Links and emphasis |
| accent-hover | #6E2537 | #F0BFCC | Hover/active links |
| border | #DFC9CF | #725B66 | Decorative dividers |
| focus | #8C3448 | #F0BFCC | 2px outline, 3px offset |

Verify final rendered contrast: normal copy 4.5:1, large text/control boundaries 3:1. Border is decorative; interactive controls also have shape/text/focus indication. Links in prose stay underlined. Do not apply accent to long body paragraphs. No gradients behind reading text; original art can use palette variants.

## Typography, spacing and responsive behavior

Local licensed Newsreader variable font for headings and editorial quotations; Inter for body, controls and metadata. Retain OFL/license notices and use Georgia/serif and system-ui/sans-serif fallbacks. Obtain font files before MEE-11; never rename existing fonts to claim compliance.
Base body 18px desktop, 17px mobile, line-height 1.7. H1 clamp(2.75rem, 7vw, 5.5rem), line-height 1.08; H2 clamp(1.75rem, 3vw, 2.5rem), line-height 1.2; H3 1.375rem/1.3. Metadata 0.875rem/1.5. Reading width <=68ch; long-form headings start h2 below one page h1.
Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96px. Site max width 1200px; page gutters 20px below 640px, 32px at 640–1023px, 48px above. Section gaps 48px mobile/80px desktop. Reading prose centered within shell; long code/table regions scroll horizontally.
Below 960px use one-column pages and collapsed menu; above use slim inline navigation. At 320px no page-level horizontal overflow. Touch controls >=44px. Artwork stacks after heading/copy on small screens; About portrait is inline, not sticky or repeated in the header.
Slim header: brand, enabled navigation, theme control. Quiet footer: copyright identity and verified contact/social links. No repeated oversized internal hero or persistent profile sidebar.

## Theme and interaction contract

Before paint resolve valid persisted explicit light/dark choice, else OS prefers-color-scheme; use localStorage with blocked-storage fallback. Track OS changes only while no manual selection exists. Provide accessible named theme toggle and explicit System option. Initial HTML/prepaint must avoid visible hydration flash. This intentionally replaces clock-driven theme after approval.
Navigation is keyboard operable, has aria-current, visible focus and Escape-to-close mobile menu. Closed menu does not leave hidden controls focusable; return focus to its trigger. Native scrolling, no scroll-jacking/parallax. Reduced motion removes animated transforms/travel; use at most 150–200ms opacity/color transitions otherwise. Preserve route focus handling, image/error and unavailable-storage resilience.

## Page composition constraints

| Page | Desktop composition | Mobile and content constraints |
| --- | --- | --- |
| Home | Typographic identity/introduction beside original abstract art; experience previews; <=3 writing teasers; contact invitation | Stack art after intro; no portrait, badges, carousel or fictional cards; omit unpublished sections |
| About | Narrow narrative with actual portrait; interests and verified professional perspective | Portrait only here, truthful alt; no invented anecdote/pull quote |
| Resume | Chronology, education/certifications, verified CV action | Single readable timeline; preserve dates/roles and CV path |
| Skills | Engineering groups and separately labeled learning topics | No unverified ratings/progress bars or keyword wallpaper |
| Experience | Text-led index, category/summary; lead APEX/modernization narrative | Only approved genuine stories; no fabricated screenshots or metrics |
| Writing | Editorial list and long-form article layout | Category, computed reading time, optional genuine publication date |
| Contact | Verified email, LinkedIn, GitHub and CV links | Direct actions; no form/backend/private details without approval |

Artwork delivery is MEE-7: original Home composition, light/dark-compatible variants and 2–3 restrained crops. Do not substitute current landscapes or third-party illustrations for approved new art. Decorative imagery uses empty alt; meaningful content uses truthful descriptive alt. Optimize source dimensions/format and specify sizes; prioritize only above-fold art. Preserve portrait original as source.

## Content schema and publication

Extend the existing server-only adapters; sanitized Markdown remains the renderer. Proposed source directories: content/experience/, content/writing/, content/site/. Keep legacy inputs readable during migration and test normalization parity.
Frontmatter fields: id (stable unique), title, slug (lowercase hyphenated unique), summary, category, status (draft|review|published), seoDescription; optional publishedAt/updatedAt in real ISO date format, tags, featured, cover metadata. Reading time is computed at 200 words/minute, not manually asserted. Dates are omitted when unknown, never invented for schema satisfaction.
Manifest: schemaVersion=1, experienceIds (exact four approved entries), writingIds (exact six approved essays), homeFeaturedExperienceIds, homeFeaturedWritingIds (<=3). Draft/review entries can exist in the inventory but cannot reach lists, routes, metadata or sitemap. Runtime UI receives normalized models; no filesystem/parser code in client bundle.
Preserve the existing placeholder flag while legacy samples remain; samples never become genuine merely by changing status. Slug collisions/unsafe media/URLs/invalid headings fail build. Raw HTML/scripts are excluded; HTTPS external links and local validated images only.

## Implementation and review gate

MEE-11 implements tokens/fonts/theme after MEE-5 evidence and owner approval of this specification. MEE-12 implements shell/route compatibility. MEE-7/8/9 supply artwork and factual/editorial copy; MEE-10 implements content schema/manifest. Then MEE-13–19 implement pages, MEE-20 checks rendered behavior, MEE-21 owns release signoff and MEE-22 follow-up.
Check 320/375/768/1024/1440 widths in both modes, keyboard/reduced motion/storage failures, contrast, sanitization, sample/draft exclusion, old links, CV/contact and static build cleanup.
Owner design decisions requested: approve this editorial shell replacing the older scenic shell, these exact tokens/typography, and Experience/Writing route names with compatibility pages. No career facts, artwork, content visibility, main merge or deployment are approved by this document.
