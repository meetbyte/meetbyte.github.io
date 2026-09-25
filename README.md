# Meet Thummar | meetbyte.github.io

A personal corner of the internet for software, ideas, and a life in motion.

**Software engineer. Thinker. Student of life.**

This repository contains the coming-soon page for [meetbyte.github.io](https://meetbyte.github.io/), built with plain HTML, CSS, and JavaScript. No framework, package installation, or build step is required.

## Features

- Responsive glass-style card with a compact desktop layout that keeps the countdown in the initial viewport.
- Countdown to **11 November 2026 at 12:00 AM IST (Asia/Kolkata)**, using one UTC target for all visitors.
- Light and dark themes, with the chosen preference saved in the browser.
- Animated countdown digits and ambient background, with reduced-motion support.
- GitHub, LinkedIn, and X profile links.
- Automatic footer year and a launch message when the countdown reaches zero.

## Project files

| File | Purpose |
| --- | --- |
| `index.html` | Page content, identity, metadata, launch-date label, and profile links. |
| `style.css` | Layout, responsive rules, themes, and animations. |
| `script.js` | Countdown, theme selection, and footer year. |
| `.gitignore` | Excludes local editor settings, temporary files, and environment files. |

## Preview locally

Open `index.html` in a modern browser for a quick preview. For local HTTP testing, serve this directory with your preferred static server and open its localhost address. Keep the HTML, CSS, and JavaScript files together so their relative paths resolve.

## Customize

- **Identity and copy:** edit the heading, introduction, and `.identity-title` in `index.html`.
- **Launch date:** update `TARGET_DATE_UTC` in `script.js` and the visible `.launch-date` text in `index.html` together. The current value, `2026-11-10T18:30:00Z`, corresponds to midnight IST on 11 November 2026.
- **Profiles:** update the links inside the social navigation in `index.html`.
- **Appearance:** edit the theme variables and layout rules in `style.css`.
- **Search preview:** update the title and description in the HTML head.

The countdown uses the visitor's device clock. Reaching zero only displays the launch message; it does not publish the full website. Replace the coming-soon page with the finished site at launch and check the destination of the "Enter the site" link, which currently points to the same site root.

## Publishing

This repository targets GitHub Pages at [meetbyte.github.io](https://meetbyte.github.io/). Keep `index.html`, `style.css`, and `script.js` at the repository root. Commit and push your changes to the branch configured as the Pages publishing source, and confirm that deployment succeeds in GitHub before checking the public page.

## Before publishing changes

- Check the countdown and displayed launch date agree.
- Preview desktop and mobile widths, including a short laptop viewport.
- Check both themes, keyboard focus, and profile links.
- Refresh the published page after deployment to confirm the latest version is visible.
