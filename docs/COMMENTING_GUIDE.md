# Source descriptions and comments

Source documentation author: **meetbyte**. Describe what a module/function does and the reason for non-obvious behaviour; avoid comments that merely restate the next line.

## File descriptions

Authored TypeScript/TSX, stylesheets, tests and JavaScript configuration files have a descriptive `@file` comment with `@author meetbyte`. Keep `"use client"` directives intact. Do not edit generated Next.js declarations, lockfiles, JSON, media files, dependency source or font licenses to add comments.

```ts
/**
 * @file Validates project content before static route generation.
 * @author meetbyte
 */
```

## Function descriptions

Describe exported components/helpers and meaningful internal helpers before their declaration. Include `@author meetbyte`; add parameter/return descriptions when types alone do not explain semantics. Existing useful JSDoc and inline explanations should remain. Anonymous render callbacks and obvious assignments do not need boilerplate comments.

```ts
/**
 * Finds a validated case study by slug, returning undefined when it does not exist.
 * @author meetbyte
 */
```

## Explain boundaries and side effects

Document behaviour that can surprise the next maintainer: sample versus draft publication, the reserved `_unpublished` route, cleanup confined to generated output, local-media validation, before-paint preferences, blocked storage, visitor-local dates, timer/observer disposal, native navigation fallback, accessible role announcements and constant-width portrait cropping.

These responsibilities live in focused `src/lib/` and content-adapter modules rather than an unrelated catch-all utility file. Keep descriptions accurate when changing functionality. A retained component such as the season/pause/scenery-quality control may be unmounted; document that distinction rather than implying it is visible.

Existing author/asset/font provenance is retained. Replacing the website persona does not rewrite original code authorship. Comments do not substitute for meaningful checks or excuse unsafe publication logic.
