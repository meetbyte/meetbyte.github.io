# Prompt 05 — Portrait behaviour and professional motion

Continue the destination from prompt 00 with `BUILD_SPEC.md`, the filled persona input, reference source and prior handoff. Preserve the final reference portrait behaviour, not the earlier handoff's miniature desktop dock. Reuse `shell-motion.tsx` and reference CSS in adaptation mode.

At viewport width >=1051px and height >=620px, profile scrolling advances a clamped progress from 0 to 1 across 110px. Crop the full-width portrait frame vertically from 290px to 180px; keep the image scale/width stable. Reserve the frame/spacer geometry so content does not jump or lose scroll position. At reduced motion render the final 180px frame without animated shrinking. At smaller/short-window layouts use the normal document portrait and replace only the header brand symbol with an in-header portrait once the original leaves view. Never float it over controls/content.

Retain the persistent profile shell, reading-progress indicator and main-area scroll reset/focus on route change. Support nested detail route entrances. Add/retain subtle CSS-transform page entries, one-time IntersectionObserver section reveals, navigation marker movement, modest decorative depth and hover/focus feedback. Text remains readable and opaque while revealing and when JavaScript fails.

Use native scrolling, passive listeners and at most one scheduled animation-frame paint. Avoid per-frame React state, wheel/touch interception and added animation packages. Handle viewport/content resize and reduced-motion changes; dispose listeners/observers/timers/frames on cleanup. Screen readers get the stable full professional-role list rather than repetitive rotation announcements.

Check portrait scroll at the start/midpoint/end, constant width/scale, independent reading/profile scroll, narrow-header docking, route persistence and route focus. Test both directions of navigation, direct loads, 320px phone, ordinary desktop, short-height desktop and reduced motion. Do not describe measurements or test results you did not perform. Record changes/checks and update the handoff. Do not commit, push or deploy.
