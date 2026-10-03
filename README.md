# Meet Thummar personal website

Technical foundation, design shell, and Stage 3 content architecture for [meetbyte.github.io](https://meetbyte.github.io/). The portfolio is being built in five stages; this branch contains Stages 1–3.

## Requirements

- Node.js 20.9 or later
- npm

## Local development

```sh
npm install
npm run dev
```

Run `npm install` once after cloning, or again when dependencies change. Open `http://localhost:3000` after starting the development server. The navigation shows only enabled pages. Projects and Blog start hidden while their content is being prepared; Contact remains a preview.

## Validate the static site

```sh
npm run typecheck
npm run build
```

`next build` writes deployable files to `out/`. Check that each main route has an `index.html` and that assets exist under `out/_next/`. A static file server pointed at `out/` can be used to check direct navigation to every route.

## Deployment

The GitHub Actions workflow builds with `npm ci` and uploads `out/` when a change reaches `main`. It uses the official GitHub Pages actions. The repository is a **user site**, so `https://meetbyte.github.io/` is the root; there is no project `basePath`. `trailingSlash: true` produces route directories with `index.html` for direct requests to `/about/` and later pages. `.nojekyll` keeps GitHub Pages from processing Next.js `_next` assets as Jekyll files.

In **Settings → Pages → Build and deployment**, choose **GitHub Actions** as the source. If the `github-pages` environment has branch restrictions, allow `main`. Automatic runs start when Stage 1 is merged into `main`; a manual run on the feature branch can build the site but cannot deploy it. The public countdown page stays live until the merge.

## Architecture

- `src/app/`: App Router pages and root layout
- `src/data/`: typed profile, navigation, Home, About, Skills, Resume, and CV data
- `src/data/types.ts`: Stage 3 content schemas, including optional fields and timeline entries
- `src/components/`: profile card, navigation, theme switcher, role rotator, and route placeholder
- `src/constants/content.ts`: shared interface wording and Stage 4/5 route previews
- `src/constants/routes.ts`: canonical paths used by navigation and links
- `src/constants/page-visibility.ts`: one publish switch for each page
- `src/constants/config.ts`: behavior settings such as theme storage and role timing
- `src/lib/navigation.ts`, `src/lib/theme.ts`: reusable route and theme helpers
- `src/styles/colors.css`: all light, dark, artwork, and shadow colors in one editable palette
- `src/styles/globals.css`: Tailwind CSS entry, layouts, and component styles that use the palette tokens
- `content/blog/`: future Markdown posts
- `public/images/`, `public/icons/`, `public/files/`: static assets

The site uses Next.js static export. It has no production Node server, runtime API, database, or Vercel dependency. Dynamic project and blog routes added in Stage 4 will need `generateStaticParams()` so every page is emitted during the build.

## How the current pages work

### Show or hide pages

Edit `src/constants/page-visibility.ts` and set a page to `true` or `false`. Home stays enabled as the site's entry point. About, Resume, Skills, and Contact start enabled; Projects and Blog start disabled. A disabled page disappears from navigation and home feature cards. Its direct URL shows the 404 page, and any profile action pointing to it is hidden. If all home feature cards are disabled, the scroll prompt and card area disappear too. Rebuild and deploy the site after changing a switch; a static export does not change until the next build.

These switches control whether a page is published. Keep `projects` and `blog` set to `false` until their content is ready. The content files remain in the source so they can be filled in before enabling the pages.

- `src/app/layout.tsx` supplies the header, navigation, profile card, main content area, and footer on every route. Its small head script sets the theme before the page is painted.
- `src/app/page.tsx` is the home page, populated by `src/data/home.ts`. The hero fills the main area, with Projects and Blog links at the bottom of its content card.
- About, Skills, and Resume render from `src/data/`, with explicit empty states for details Meet has not supplied.
- Projects, Blog, and Contact select their preview entry from `src/constants/content.ts`; `src/components/section-placeholder.tsx` renders the shared preview.
- `src/app/template.tsx` wraps route content so the page entry animation runs after navigation.
- `src/components/navigation.tsx` marks the active route, opens the mobile menu, and closes it after navigation.
- `src/components/theme-toggle.tsx` starts in light mode on a first visit and stores a manual light or dark choice locally. `src/components/role-rotator.tsx` cycles profile roles and stops cycling when reduced motion is preferred.
- `src/styles/colors.css` holds the full palette; `src/styles/globals.css` uses its tokens for responsive layouts and motion. On desktop, the shell fits the viewport and the profile or content card scrolls internally when needed. Short windows, tablets, and mobile screens use normal document scrolling so content remains reachable.

Source files use JSDoc-style `/** ... */` comments with `@author meetbyte` for page and function documentation. CSS uses section comments to explain layout and theme rules. Keep comments focused on purpose and behavior as content is added in later stages.

## Edit wording and settings

Edit `src/data/profile.ts` for identity, roles, and social links. Its name and title flow into site metadata and shared labels. Edit `src/data/navigation.ts` for navigation, `src/data/home.ts` for Home, and the other `src/data/` files for Stage 3 pages. `src/constants/content.ts` holds shared interface labels and later-stage previews. Components read these values rather than embedding personal details in JSX.

## Stage 3 content updates

- `src/data/about.ts`: replace the biography placeholder with Meet's verified story; add optional expertise descriptions and interest or learning entries. Empty lists show labeled placeholders.
- `src/data/skills.ts`: add, remove, or reorder category objects in `categories`. Add skills as `{ name, note? }` inside each category. Categories and chips are entirely data-driven. Do not add percentage scores.
- `src/data/resume.ts`: add experience and education entries with a unique `id`, `title`, and optional `organization`, `location`, `period`, `summary`, and `highlights`. Empty timelines show a labeled placeholder. Use real dates and organizations only.
- `src/data/cv.ts`: once a real PDF exists under `public/files/`, set `href` to its root-relative path, optionally set `filename`, and set `available: true`. A verified external CV URL can also be used. Until then, the profile action stays disabled and the Resume page explains why.
- `src/data/types.ts`: the schemas for the above data. Optional fields are omitted from the page when empty.

Meet still needs to provide a biography, interests, specific skills, professional experience, education, and a CV file or link. The current broad expertise and current-learning labels come from the existing Stage 2 profile wording. No employment, education, achievements, or skill ratings are implied by them.

Edit `src/constants/routes.ts` when a route path changes; navigation and calls to action use those paths. Edit `src/constants/config.ts` for behavior settings such as the theme storage key or role rotation interval. Change colors in `src/styles/colors.css`; `src/styles/globals.css` refers to those named color tokens instead of repeating color values.

## Stage 2 design shell

The profile card stays beside routed content on desktop, becomes a horizontal identity area on tablet, and stacks above content on mobile. Navigation changes to a menu on narrow screens. The current portrait artwork is an explicit placeholder; the CV button is disabled until a real PDF is supplied. No work history, skills, or project results have been invented.

Light and dark themes use a slate blue, warm clay, and ivory palette defined in `src/styles/colors.css`. The first visit starts in light mode; a manual dark or light choice is saved in local storage. A small script in the document head applies a saved theme before the main content paints. The theme button changes the `data-theme` attribute on `<html>`, which selects the palette in `colors.css`. The development server accepts both `localhost` and `127.0.0.1`; each address has its own saved browser preference. Page entry and role text use restrained CSS motion, and `prefers-reduced-motion` disables those effects. Keyboard users can skip directly to the main content. Desktop cards show a thin native scrollbar when they need to scroll, so additional content remains visible and easy to find.
