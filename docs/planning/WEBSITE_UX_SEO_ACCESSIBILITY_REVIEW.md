# Website review — 8 October 2026

The portfolio’s source, shared components, content adapters, styles, generated pages and GitHub Pages workflow were reviewed. The requested fixes are implemented in the existing repository. Projects and Blog remain disabled; their sample content is preserved for later use.

## SEO and recovery

`robots.txt`, `sitemap.xml`, canonical URLs, page descriptions, social preview metadata, icons and `404.html` are present. The sitemap contains only Home, About, Resume, Skills and Contact. The homepage title now includes the professional role and name.

Disabled Blog/Projects folders previously contained recovery pages that a static host could serve with HTTP 200. The new postbuild cleanup removes those generated folders and the reserved `_unpublished` helper route. Source content is retained. Unknown and hidden URLs now return HTTP 404 in the static-host preview. The recovery page has a descriptive title, `noindex`, no canonical URL, and a working “Back to home” link. GitHub Pages publishing uses the normal npm build, which runs this cleanup automatically.

## UX review

| Requested area | Review and outcome |
| --- | --- |
| Route transitions | Shared profile persists during normal client navigation. Reading content receives focus on arrival. Entry movement respects reduced motion; scroll reveals now keep text at full contrast. |
| Loading perception | Content is rendered into HTML. Local fonts use swap, images reserve space, and delayed navigation shows nonblocking feedback with a direct-page recovery action. |
| Hover interactions | Keyboard focus receives equivalent feedback on cards and links; prominent controls have clear focus outlines. |
| Visual consistency and spacing | Existing typography, palette, cards and editorial layout are retained. Long headings and tags wrap. Header/footer text has a protective background. |
| Mobile navigation | Native disclosure works before scripts load and with JavaScript absent. Enter opens it; Escape closes it and returns focus. Completed route changes close it. Mobile controls have comfortable touch targets. |
| Long articles | A private 11-minute reading fixture was checked. Wide code and tables scroll with the keyboard without widening the page. Images receive intrinsic dimensions and lazy loading. Heading levels are validated, with styles through h6. |
| Long resume entries | Real multi-paragraph entries and long highlight lists remain readable. The desktop panel can be reached with Tab and scrolled with Page Down; mobile uses normal document scrolling. |
| Project case studies | The sample case was checked in a private build. Optional media/sections/links are supported. Media paths, alt text, aspect ratios and HTTPS URLs are checked before publishing. |
| Theme consistency | Both day and night were checked across all public pages and the 404. Existing time-based themes, seasonal controls and celestial transition are retained. |
| Image presentation | Portrait width stayed 343 px while its frame shortened from 290 to 180 px. Failed images show an accessible fallback without collapsing their space. |
| Empty states | Source review confirmed explicit messages for empty Blog/Projects listings, resume timelines, skills/categories and unavailable CV actions. |
| External links | New-tab links include a warning and safe relationship attributes. Spoken labels include the visible social abbreviations. |
| Broken links | 210 local page, anchor and asset references were checked with no missing targets. The CV responds successfully. |
| 404 behaviour | Unknown URLs, hidden sections and unpublished helper paths return 404; recovery returns to Home. |

## Accessibility pass

- One h1 per public page, ordered headings, main/header/footer/navigation landmarks and a skip link were verified. The sidebar identity no longer introduces an h2 before the page title.
- Both desktop scroll panels remain usable by keyboard. The main reading panel is now in the Tab order. Menu opening, dismissal, route focus and keyboard scrolling were exercised.
- Images have meaningful alternative text or are explicitly decorative. Failed media retains its accessible description.
- Buttons, links and the native season selector retain their appropriate semantics. Unnecessary labelling on a generic social container was replaced with a labelled navigation landmark. IDs and ARIA references were checked.
- The role caption exposes one stable list to screen readers. “Pause motion” stops both background movement and role rotation; the caption stayed unchanged across the pause test. Reduced-motion tests showed no page, cloud or weather animation.
- Narrow reflow was checked at 320 px: every public page and the 404 had no horizontal page overflow. Menu interaction was also checked at 390 px.
- Eighteen automated axe scans—six pages in each desktop theme, plus six narrow mobile pages—reported **zero detected violations** after repairs. Photography, gradients, pseudo-elements and clipped panels still produce contrast items requiring manual review. Reading/control palette pairs were checked separately: ordinary text pairs are at least 5:1 in day mode; button labels exceed 5.6:1; night pairs exceed 5.9:1. The clay display/decorative colour was assessed against its relevant large-text/non-text threshold. Existing regression tests also check intermediate sunset/twilight palettes.

The shared pause behaviour follows [W3C’s pause, stop and hide guidance](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html).

## Weak connections

Data Saver, slow-network and offline hints select a CSS-only scenic backdrop before paint. Decorative photographic/weather layers are omitted, while reading, contact links and native navigation remain available. “Load full scenery” provides a visit-only opt-in. Browsers without connection hints use the normal experience.

Normal connections use client navigation without speculative route prefetch. A delayed route shows a small status after 300 ms; after three seconds “Open page directly” offers native navigation. This recovery was exercised against delayed route responses. Offline clicks keep the loaded page in place with a dismissible message. Dismissal and the scenery opt-in were checked in a connection-hint fixture.

Server-rendered reading and the mobile menu were checked with scripts removed. Delayed-script checks also left the text visible with the lightweight backdrop. An image-request failure retained the portrait’s space and description.

This provides graceful degradation rather than a complete offline cache: new uncached pages still need a connection. There is no service worker.

## Validation and remaining limits

- 25 regression tests pass; lint, TypeScript checking and the production static build pass.
- All public routes return 200; five representative hidden/missing routes return 404; the CV returns 200.
- GitHub and X endpoints, and the sample article’s TypeScript documentation link, respond with HTTP 200. LinkedIn returns its automated-access restriction (999), so its profile needs a manual check. HTTP availability alone does not verify every part of a login-gated social profile.
- Long-form/case-study checks used an isolated test build; these sections remain hidden in the actual website.
- A full assistive-technology session and formal WCAG certification were not performed. The automated results supplement the manual/source checks.
- Changes are local and have not been published. Live-host status should be confirmed after the next deployment.

Evidence files accompany this report: `UX-audit-browser.json`, `UX-audit-mobile.json`, `UX-audit-export.json`, `UX-audit-http.json`, `UX-audit-contrast.json`, and the `UX-polish-*.png` previews.
