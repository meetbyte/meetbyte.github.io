# Meet Thummar | meetbyte.github.io

A personal corner of the internet for software, ideas, and a life in motion.

**Software engineer. Thinker. Student of life.**

This repository contains the coming-soon page for [meetbyte.github.io](https://meetbyte.github.io/), built with plain HTML, CSS, and JavaScript. No framework, package installation, or build step is required.

## Features

- Responsive glass-style card with a compact desktop layout that keeps the countdown in the initial viewport.
- Countdown to **11 November 2026 at 12:00 AM IST (Asia/Kolkata)**, using one UTC target for all visitors.
- Light and dark themes, with the chosen preference saved in the browser.
- Animated countdown digits, drifting colour, and an orbital constellation inspired by connected ideas and exploration. Outside the card, drifting code, an original margin note, a music waveform, and a travel route reflect personal interests. Respects reduced-motion preferences.
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

## Editing guide

Search for **EDIT** in the source files to find the main customization points. Make one small change at a time, save, and refresh your preview.

| I want to change... | Where to look | What to edit |
| --- | --- | --- |
| Browser title or search description | `index.html`, inside `head` | The `title` text and description `content`. |
| Name, headline, or identity | `index.html`, `brand-name`, `page-title`, `identity`, footer | Visible text; your name appears in multiple places. |
| Launch date | `script.js`, `TARGET_DATE_UTC`; HTML `launch-date` | Change the timestamp and the human-readable label together, then update this README. |
| Social destinations | `index.html`, `socials` | Each link's `href`; keep its accessible label appropriate to the destination. |
| Page and card colours | `style.css`, palette blocks at the top | `--bg`, `--bg-elevated`, text and accent variables. |
| Card width or spacing | `style.css`, `.hero`, `.hero-card` | Width/padding; check the compact desktop and mobile overrides too. |
| Heading size | `style.css`, `.hero h1` | Font size and line height; longer text takes more vertical space. |
| Constellation inside the card | `style.css`, `.thought-field`, `.thought-orbit` | Size, position, opacity, and rotation duration. |
| Outer artwork colours | `style.css`, `.life-fragments` colour variables | Accent/text mix; colours automatically follow the active theme. |
| Outer artwork visibility | `style.css`, `.life-fragment` | Opacity; narrow-screen overrides use separate values. |
| Code or notebook text outside the card | `index.html`, `fragment-code`, `fragment-notebook` | Display-only code, captions and original thought. The code fragment does not run. |
| Outer artwork position/speed | `style.css`, individual `.fragment-...` rules | Edge offsets, `--tilt`, animation duration, and delay. |
| Music waveform | `style.css`, `.music-wave i` | Bar dimensions and pulse timing; HTML `i` elements are the bars. |
| Travel route | `index.html`, `fragment-route`; CSS `.route-line` | SVG path shape, caption, dash pattern, and animation speed. |

### Theme colours

There are two light palettes and two dark palettes: defaults based on the operating system, and explicit selections under `html[data-theme="light"]` / `html[data-theme="dark"]`. Keep matching palettes in sync. A saved manual theme takes priority over the system setting.

The outer artwork mixes accents with `--text` to produce deeper ink on light backgrounds and brighter colours on dark backgrounds. Its opacity is separate from its colour. The inside-card constellation has its own opacity setting.

### Layout and animation tips

- `padding` is space inside an element; `margin` is space outside it.
- `clamp(minimum, fluid value, maximum)` allows a size to scale within limits.
- Animation durations such as `18s` are seconds: increase them for slower movement.
- Negative animation delays start different elements partway through their cycles.
- Opacity ranges from `0` (invisible) to `1` (solid).
- Rules later in the stylesheet can override earlier rules. Search all occurrences of a selector before editing.
- At widths up to 760px the main layout changes; up to 440px it tightens further. Desktop windows up to 740px tall get compact spacing.
- Outer code and notebook fragments are hidden at widths up to 1100px to avoid crowding. At 1600px and above, artwork positions move inward.
- Keep reduced-motion rules so visitors who request less motion get a static background.
- To remove an outer fragment, remove its complete `life-fragment` HTML block. To remove the inner constellation, remove its complete `thought-field` block.

### Keep these connections intact

The IDs `countdown`, `live-message`, `theme-toggle`, and `footer-year`, plus the `time-value` class and `data-unit` values, are used by JavaScript. If renamed in HTML, update the corresponding JavaScript selectors too. Keep the script's `defer` attribute so it runs after the page has been parsed.

The decorative SVGs use their own coordinate systems, defined by `viewBox`. Use CSS width/position for normal resizing; editing SVG path coordinates changes the actual drawing.

### After an edit

Check a 1366 x 768 desktop window, a shorter laptop window, and a narrow phone width. Confirm the countdown stays visible on desktop, text does not overlap, both themes look good, links work, and the theme button still responds. For animation changes, also check your device's reduced-motion setting.

If a saved change does not appear, try a hard refresh (Ctrl+F5). For the public site, ensure the commit was pushed and the deployment completed.

### Git ignore rules

`.gitignore` only prevents matching untracked files from being added by default; it does not remove files already committed. The `!.env.example` exception allows a placeholder configuration example to be tracked. This static site does not need environment files or Node dependencies.
