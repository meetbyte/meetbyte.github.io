# Meet Thummar personal website

A responsive personal portfolio for [meetbyte.github.io](https://meetbyte.github.io/), built with Next.js 16, TypeScript, App Router and Tailwind CSS. Stages 1–5 are implemented locally: identity, career, skills, sample case studies, a Markdown blog, direct Contact and release polish. The original biography, résumé, social profiles and supplied CV are preserved.

Page heading numbers follow the same visible route order as the navigation, via `src/lib/page-label.ts`: Home 00, About 01, Resume 02, Skills 03 and Contact 04 with the current switches. Re-enabling a section automatically updates the sequence. Home feature-card numbers are their own editorial list order.

Projects and Blog are currently hidden with `projects: false` and `blog: false` in `src/constants/page-visibility.ts`. Their implementation and **clearly labeled samples** are retained for later use. Samples make no claims about real client deliveries or outcomes. They have `noindex, follow` metadata and are excluded from the sitemap. Replace them with verified content when ready. Publication is separate from local implementation; Meet handles commits and pushes.

## Setup and commands

Use Node.js 20.9+ and npm. From the repository folder:

```sh
npm ci
npm run dev
```

Open `http://localhost:3000` or `http://127.0.0.1:3000`. New tab visits use the visitor’s local clock: daylight from 07:00 inclusive until 19:00 exclusive, and night otherwise. A manual theme choice lasts within the current tab visit, using session storage so it survives page navigation and reloads. It is not saved permanently across visits. If storage is blocked, the in-memory choice still works. The two hosts have separate browser storage.

```sh
npm run lint
npm run typecheck
npm run test
npm run build
```

The production build writes the fully static website to `out/`. On Windows, if Turbopack cannot start its CSS worker, use the supported fallback `npm run build -- --webpack`. No production Node server, runtime API, database, secrets or Vercel dependency is required. Serve `out/` with a static file server for production checks; do not use `next start` with static export.

## Architecture

- `src/app/`: index pages, static project/article detail routes, 404, sitemap and robots.
- `src/data/`: editable personal content, typed projects and Contact.
- `src/data/types.ts`: shared content models with optional fields.
- `src/lib/content/projects.ts`: validated project access.
- `src/lib/content/posts.ts`: build-time Markdown adapter returning normalized `BlogPost` objects. The Blog UI does not read files or parse Markdown.
- `content/blog/*.md`: articles and frontmatter.
- `src/lib/metadata.ts`: canonical origin and shared page/social metadata.
- `src/components/`: persistent profile/navigation/theme, concept visuals and motion.
- `src/constants/page-visibility.ts`: publication switches. Disabled pages disappear from navigation and reject direct access; their details are omitted from static parameters and sitemap.
- `src/styles/colors.css`: light/dark palette. `globals.css` uses those tokens for layouts, components and motion.
- `public/images/`, `public/icons/`, `public/files/`: static media, app icons and CV.
- `scripts/content.test.ts`: meaningful publishing-boundary tests, including malformed frontmatter, drafts, sanitization and sample indexing.

The installed Next.js guides under `node_modules/next/dist/docs/` describe this version's conventions. Read relevant guides before changing routing or export behavior. Source comments explain important behavior and use `@author meetbyte`.

## Update personal content

- **Profile:** edit `src/data/profile.ts` for name, title, roles, summary, learning line, portrait and public social profiles.
- **Home:** edit `src/data/home.ts` for headline, actions and featured links. Internal actions respect publication switches.
- **About:** edit `src/data/about.ts`. `biography` supports a string or paragraphs. Optional story sections use `id`, `title`, `paragraphs`; empty sections are omitted.
- **Skills:** edit the `categories` array in `src/data/skills.ts`. Add skills as `{ name, note? }`. Categories, order and skill chips are fully data-driven; avoid artificial percentages.
- **Résumé:** edit `src/data/resume.ts`. Timeline entries have `id`, `title` and optional organization, location, period, summary and highlights. Certifications appear when populated. Empty experience/education retain explanatory states.
- **Contact:** edit `src/data/contact.ts` for the approved public email, prefilled subject, invitation and opportunity wording. Social links use the profile data. Email is a standard `mailto:` link; there is no contact form or backend.

Use verified personal details. Keep client identities and confidential system information private, as previously confirmed. The completed questionnaire records the approved content and Contact details.

## Add a project or case study

Add an object to the `projects` array in `src/data/projects.ts`:

```ts
{
  slug: "my-project",
  title: "Project title",
  summary: "One clear sentence about the project.",
  overview: "Context and purpose, based on real information.",
  stack: ["TypeScript"],
  featured: true,
  placeholder: false,
  sections: [
    { id: "problem", title: "Problem", paragraphs: ["Verified context."] },
    { id: "decisions", title: "Engineering decisions", bullets: ["A meaningful tradeoff."] },
  ],
}
```

Enable the Projects publication switch when ready to show this section. Use a unique lowercase hyphenated slug. When enabled, the build generates `/projects/my-project/index.html`. Required fields are slug, title, summary, overview and stack; stack may be empty. `featured`, `category`, sections, screenshots, cover, GitHub and demo are optional. Empty sections are omitted. No category filters are included in Version 1.

A cover uses `{ src, alt, width, height }`; screenshots accept the same fields plus optional `caption`. Store assets under `public/images/` and use descriptive alt text. `github` and `demo` links must use HTTPS. With no cover, the UI shows a small generic concept illustration; real screenshots can replace it without changing the layout.

Sections can describe Context, Problem, Role, Architecture, Challenges, Solution, Engineering Decisions, Outcome or Lessons Learned. Publish only supported results and metrics. Set `placeholder: true` while the entry is illustrative; set it to `false` or omit it only when the case study is real. Validation reports invalid or duplicate slugs and section IDs with actionable errors.

## Add a blog post

Enable the Blog publication switch when ready to show this section. Create `content/blog/my-note.md`:

```markdown
---
title: "A useful question"
slug: "my-note"
date: "2026-10-07"
excerpt: "A short introduction for the listing and social metadata."
tags: [Engineering, Learning]
published: true
placeholder: false
---

An introduction.

## The question

Explain the context, then show a concrete example.
```

The filename can differ from the slug. Use a unique lowercase hyphenated slug, a quoted real `YYYY-MM-DD` date and an array of tags (or `[]`). Required published metadata is title, slug, date, excerpt, tags and published. An optional cover uses `cover: "/images/photo.webp"`, `coverAlt`, `coverWidth` and `coverHeight`; dimensions reserve its space, and the image must exist under `public/`.

Set `published: false` to keep an unfinished draft out of the listing, static routes and sitemap. Drafts may have incomplete metadata. Malformed YAML or invalid published metadata fails the build with the filename and corrective guidance, preventing a broken article from being deployed. The adapter sorts by date and estimates reading time. No authoring code changes are required for a new Markdown file.

Use `##` for article sections, since the page already renders the title as `h1`. Standard Markdown and GitHub-flavored tables, lists, code fences, images and links are supported. The sample article demonstrates them. Raw HTML is dropped; generated HTML is sanitized, including unsafe URLs. MDX/JSX is intentionally not enabled. Article typography and code blocks use the shared light/dark palette.

Later, a CMS/API can return the same `BlogPost` model from another adapter; the listing and article UI can stay unchanged.

## Replace the CV or portrait

- The supplied CV lives at `public/files/Meet-Thummar-CV.pdf`. Set the download URL/filename and availability in `src/data/cv.ts`. Profile and Resume use this single configuration. Keep the existing PDF until you have a replacement.
- The original portrait PNG is retained. The website serves a full-resolution 1122 × 1402 WebP at quality 92 (about 138 KB instead of 1.98 MB). To replace it, add your optimized image under `public/images/`, update its path, dimensions and alt text in `src/data/profile.ts`, and keep the crop visually centered.
- `public/images/social-preview.png` is the 1200 × 630 social card. The favicon and Apple icon live under `public/icons/`. Edit the path/origin in `src/lib/metadata.ts` and layout icon settings if replacing them.

## Scenery and typography

Seasonal scenery uses an India-inspired visual calendar, with no geolocation, weather API or network lookup. The visitor’s local month selects summer (March–May), monsoon (June–September), autumn (October–November) or winter (December–February). Winter snow is an artistic atmosphere. Each season has matching day/night landscape plates; summer retains the original clean sky plates. Rain, falling leaves and snow are small CSS shapes behind the opaque reading cards. Mobile renders fewer particles; reduced motion hides the weather particles, leaving the seasonal artwork visible.

The footer and progress label are intentionally removed. Set `showSeasonPicker: true` in `src/constants/config.ts` to show the compact **Season** header preview; its default is `false`. Auto follows the calendar, while a preview lasts only for the tab visit. With the flag disabled, previously saved previews are ignored. `src/lib/season.ts` owns the month mapping and preview preference; `src/styles/seasons.css` owns artwork and weather. `src/lib/atmosphere-clock.ts` checks 07:00, 19:00 and midnight and catches up after sleep. Theme and season choices are independent and applied before paint.


The website uses matching generated cinematic nature images: luminous daylight and a moonlit landscape. The active sky plates have no fixed celestial discs. One visible sun/moon sits at the upper left in daylight and upper right at night. Two synchronized render layers use complementary viewport clips: the header portion clears the sticky veil, and the lower portion sits behind the opaque cards. The clips never overlap. Versioned compressed WebP assets live in `public/images/scenery/`; narrow screens use responsive crops and a shorter horizontal orbit.

Theme switching takes about 2.8 seconds: the body dips down behind the cards and rises on the other side, while the sky, cards, borders and shadows pass through warm orange, pink and purple palettes. Its sun/moon texture changes during the hidden middle of the orbit. The actual cards occlude the body rather than fading it out. A second click reverses from the current position. The controller in `src/lib/theme-journey.ts` updates CSS variables in one animation frame without per-frame React renders or a motion dependency. It preserves the portrait, layout and reading position. Reduced motion switches instantly; changing that preference or hiding the tab finishes the latest selected theme and cancels the pending frame.

Ambient motion uses photographic foliage with uneven wind sway, two cloud depths drifting at different speeds, shifting dappled light, layered rain streaks, floating snow and fluttering leaves with small veins. The movements use CSS transforms and opacity with staggered positions and speeds, no continuous JavaScript loop or video downloads. Desktop renders 72 rain streaks, 36 snowflakes or 18 leaves; mobile limits these to 28, 20 or 10. Artwork and the reading cards remain calm.

The reading cards stay opaque. Intermediate text and button colours are checked for AA contrast across their reading surfaces; a shared surface tone is used at the light/dark crossover. Directional highlights follow the travelling light. The visible pause control has been removed at Meet’s request. Operating-system reduced-motion preferences still disable ambient movement, and existing saved pause preferences are respected. `SceneryMotionToggle` remains a reusable, unmounted component if a pause control is wanted later.

Bricolage Grotesque is used for headings and Manrope for body text and controls. Local variable WOFF2 files under `src/assets/fonts/` are served by Next.js with preload, swap and fallback metrics. Their original Google Fonts OFL notices are retained beside the font files; there are no visitor requests to a font CDN. Replacement seasonal artwork is configured in `src/styles/seasons.css`, with shared crops in `src/styles/scenery.css`, with directional border/shadow tokens in `src/styles/colors.css`.

## Motion and responsive behavior

Desktop keeps the established independent profile/content scroll areas. Scrolling the profile shortens its portrait from 290px to a 180px sticky crop while retaining the full card width and the original photo scale. A reserved spacer keeps the content below it stable; there is no narrow avatar or empty space to its right. On tablet/mobile and short windows, ordinary document scrolling remains; after the portrait leaves the viewport, a small portrait replaces the existing brand mark in the header. It does not create a floating overlay.

The shared motion system adds route entrances (including nested detail routes), one-time section reveals, a sliding navigation marker, modest decorative depth, restrained card interactions and a reading-progress line. It uses native scrolling, CSS transforms, IntersectionObserver and passive listeners batched into one animation frame. No animation package, wheel interception or continuous React scroll updates are used.

Reduced motion disables entry/reveal/parallax/hover motion and smooth scrolling. On desktop it uses the compact static portrait from the start. Content remains visible and usable without JavaScript; motion is an enhancement. The mobile menu supports Escape, outside-click dismissal and ordinary keyboard navigation. The skip link and route focus target the main content.

## SEO and publishing

All seven section pages and every project/article have titles, descriptions, canonical URLs, Open Graph/Twitter metadata and the shared social image. Article dates and tags come from frontmatter. `sitemap.xml` and `robots.txt` are statically generated. Samples are `noindex` and excluded from the sitemap; drafts generate no routes. No invented publish/update dates are added to project metadata.

GitHub Pages uses the user-site root `https://meetbyte.github.io/`; do not add a project `basePath`. `trailingSlash: true` emits route directories for direct URL refreshes. `public/.nojekyll` preserves `_next` assets. The custom `404.html` gives readers a path home.

In **Settings → Pages → Build and deployment**, select **GitHub Actions**. Allow `main` in any `github-pages` environment branch restrictions. The existing workflow installs locked dependencies, checks types, builds and uploads `out/`; deployment runs only from `main`. A manual feature-branch run can validate a build, but cannot publish it. The current changes stay local until Meet commits/pushes and merges to `main`.

Before publishing, run all validation commands, review desktop/tablet/mobile in both themes, check article/case-study direct refreshes, Contact links, CV download, SEO files and unknown-route 404 behavior. A successful local export is not proof of a successful GitHub Pages deployment; verify the Actions deployment and live routes after publication.


## UX, accessibility and connection reliability

- Mobile navigation uses a native disclosure: it works before hydration and with JavaScript unavailable. Escape, outside clicks and completed route changes close the hydrated menu.
- Reduced-motion preferences stop weather, clouds, foliage and rotating roles. Screen readers receive the full stable list of roles. There is no footer or visible pause button.
- Data Saver, 2G/3G, high latency, low bandwidth and offline hints select a CSS-only scenic backdrop before paint. Content stays server-rendered, local fonts use `swap`, and links use normal page navigation on limited connections. Browsers without connection hints keep the normal experience. The full-scenery opt-in component is retained but no longer mounted with the removed footer.
- Normal connections use client navigation without speculative page prefetch. A nonblocking status appears after 300 ms; after three seconds readers can choose **Open page directly** if a route stalls. Already loaded content remains available offline, with a clear status. New uncached pages still need an internet connection. No service worker or full offline cache is installed.
- Images reserve their dimensions and show a stable fallback on failure. Inline Markdown images must be local, exist, have descriptive alt text, and receive intrinsic dimensions and lazy loading. Cover and case-study media are validated at build time.
- Article sections start at `##` and must not skip heading levels. Wide tables and code blocks are keyboard-focusable scrolling regions.
- The postbuild step removes disabled Blog/Projects export folders and the reserved `_unpublished` slug so GitHub Pages serves `404.html` with a genuine missing-page status. The 404 has its own title, `noindex`, recovery links and no canonical URL. Enable sections using `src/constants/page-visibility.ts` and rebuild normally.
- Run `npm test`, `npm run lint`, and `npm run build -- --webpack` before deployment. The suite contains 26 regression tests, including content validation and static export cleanup.

## Maintenance guide

See [docs/MAINTENANCE.md](docs/MAINTENANCE.md) for the edit map, conventions, shared utility ownership and verification steps.

## Continue without the original chat

Start with [repository context](docs/PROJECT_CONTEXT.md), which records the current implementation, publishing choices and future content work. When projects or articles are ready, use [the Step 4 follow-up prompt](docs/prompts/04_RESUME_PROJECTS_AND_BLOG.md) and [content intake worksheet](docs/planning/PROJECT_BLOG_CONTENT_TEMPLATE.md). Blog/Projects remain hidden until explicitly enabled.

[The reusable prompt guide](docs/prompts/README.md) supports reproduction and other personas. [The commenting guide](docs/COMMENTING_GUIDE.md) describes module/function documentation with author `meetbyte`. These instructions, current content and runtime assets are retained in this repository; the original ChatGPT project is not required for continued development.
