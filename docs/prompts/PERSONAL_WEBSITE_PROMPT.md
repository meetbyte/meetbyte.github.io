Act as a senior full-stack developer who specializes in modern static/JAMstack sites.
Help me build my personal website: a multi-page portfolio + blog, to be deployed for
free on GitHub Pages at https://<my-username>.github.io (a GitHub "user site", not a
project site).

IMPORTANT REPO CONSTRAINT
Because I want the final URL to be exactly https://<my-username>.github.io with no
sub-path, the GitHub repository MUST be named exactly <my-username>.github.io. Confirm
you understand this before writing any config, because it changes how basePath and
static asset paths need to be handled versus a normal project repo.

GOAL
A professional personal website that:
1. Showcases me as a full-stack developer with broad technical range (I'll supply the
   actual skills/tech list as structured data — don't hardcode a narrow specialization
   like "frontend only" or "ML only").
2. Has a resume/experience timeline.
3. Has a projects/portfolio section that can grow over time as I add more projects.
4. Has a blog section I will keep publishing to (this needs to be easy for me to add
   new posts to later, ideally by just adding a new content file, not editing code).
5. Has a contact section with no backend dependency.

TECH STACK
- Next.js (latest stable), configured for fully static export (`output: 'export'`),
  so the entire site is pre-rendered HTML/CSS/JS with zero server runtime — deployable
  as static files to GitHub Pages.
- Pick whichever Next.js routing approach (App Router or Pages Router) you can most
  reliably get working end-to-end with static export AND a working blog (MDX or
  Markdown-based). Prioritize "actually builds and deploys successfully" over using the
  newest router — tell me which you're choosing and why in one or two sentences before
  you start.
- TypeScript.
- Plain CSS Modules or Tailwind CSS (your call — tell me which and why) for styling.
  No component library that requires a backend or paid service.
- No database, no CMS, no serverless functions, no API routes that require a server at
  runtime. Everything must work as flat static files.

SITE STRUCTURE (multi-page, not a single scroll page — I will be adding projects and
blog posts over time so this needs real routes)
- `/` — Home: short hero/intro, a snapshot of who I am, links into the other sections.
- `/about` — About: fuller bio, background, interests.
- `/resume` — Resume/experience timeline: work history, education, presented as a
  clean vertical timeline component driven by structured data (not hardcoded HTML per
  entry).
- `/skills` — Skills: grouped by category (e.g. Languages, Frameworks, Cloud/DevOps,
  Tools, etc.) — the category list itself should come from data, since my skill set is
  broad and I don't want the layout to assume a fixed set of categories.
- `/projects` — Projects: a grid/list of project cards (title, short description, tech
  tags, links), each linking to `/projects/[slug]` for a fuller write-up page.
- `/blog` — Blog: a list of posts (title, date, excerpt), each linking to
  `/blog/[slug]`. Author posts as MDX or Markdown files in a content folder with
  frontmatter (title, date, tags, excerpt) — I should be able to add a new post by just
  dropping in a new file, no code changes.
- `/contact` — Contact: my email displayed as text and as a `mailto:` link (with
  subject line pre-filled), plus links to my social/professional profiles. No form
  submission, no third-party form service, no API keys — mailto only for now (I may add
  a proper form service later, but not in this build).

DATA LAYER
- All personal content (name, bio, skills list, work history/timeline entries, project
  list, social links, contact email) must live in clearly separated data files (e.g.
  JSON or TypeScript config objects under a `/data` or `/content` folder) — NOT
  hardcoded inside JSX/TSX components. I will be filling these in myself once you scaffold
  them, so give me clean, obviously-shaped placeholder data with comments showing what
  each field is for.
- Blog posts live as individual Markdown/MDX files with frontmatter, separate from the
  data files above.

DESIGN DIRECTION
- Original design, not a copy of any commercial theme. Clean, modern, developer-
  portfolio aesthetic: a strong hero section, card-based project grid, a readable
  timeline component, good typography, generous whitespace.
- Full dark/light mode support with a manual toggle in the site header/nav, persisted
  across visits (localStorage), defaulting to system preference on first load.
- Fully responsive: mobile nav (hamburger or similar), fluid layouts, no fixed-pixel
  breakpita layouts.
- Subtle, tasteful motion (fade/slide-in on scroll, hover states) — nothing heavy,
  and respect prefers-reduced-motion.
- Consistent shared layout: header/nav across all pages, footer with social links and
  copyright.

SEO & POLISH
- Per-page <title> and meta description, driven by data/frontmatter where relevant.
- Open Graph tags for social sharing previews (project pages and blog posts especially).
- `sitemap.xml` and `robots.txt` generated at build time.
- Favicon.
- Basic accessibility: semantic landmarks, proper heading hierarchy, alt text, visible
  focus states, sufficient color contrast in both themes.

DEPLOYMENT
- Set up a GitHub Actions workflow that, on every push to the main branch, builds the
  Next.js static export and deploys it to GitHub Pages automatically (using either the
  official `actions/deploy-pages` flow or `peaceiris/actions-gh-pages` — pick one, tell
  me why).
- Document the exact one-time GitHub repo settings I need to change (Pages source =
  GitHub Actions, etc.) and any `next.config.js` settings required for a user-site
  (root-path) deployment.
- Give me a short README explaining: how to run the site locally, how to add a new
  project, how to add a new blog post, and how deployment is triggered.

OUT OF SCOPE FOR THIS BUILD
- No backend/server, no database, no CMS, no authentication, no comments system, no
  analytics, no contact form service, no e-commerce, no multi-language support. These
  can all be considered later as separate follow-up work, not now.

HOW I WANT TO WORK WITH YOU
- Build this in stages, not as one giant dump: (1) project scaffold + config +
  deployment workflow first, confirm it builds and deploys as a blank/skeleton site,
  (2) shared layout, nav, dark/light toggle, (3) data layer + Home/About/Skills,
  (4) Resume timeline, (5) Projects list + detail pages, (6) Blog list + detail pages +
  one sample MDX post, (7) Contact page + SEO/meta/sitemap pass.
- At each stage, tell me exactly which files you created or changed, and any manual
  step I need to take (npm installs, config values, GitHub settings).
- Ask me before assuming any content — use obvious placeholder data, marked as
  placeholders, rather than inventing fake bio/work history details as if they were
  real.

Start with stage 1: project scaffold, TypeScript + styling setup, static export config,
and the GitHub Actions deployment workflow. Confirm the repo naming assumption with me
first if anything is unclear.




https://preview.themeforest.net/item/ryancv-vcard-resume-wordpress-theme/full_screen_preview/22890097