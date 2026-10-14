# MeetByte editorial artwork

Created 14 October 2026 with the built-in image-generation tool, using the owner-approved **MeetByte Editorial Portfolio Variations.png** (12 October 2026) as the visual reference. These are standalone artwork outputs derived from its top ink/paper composition; they are not the UI mockup or stock imagery. Final website merge/deployment still requires the owner.

## Assets and placement

| Asset | Dimensions | Bytes | Use |
| --- | --- | ---: | --- |
| hero-light-600.webp | 600 × 750 | 49,570 | Light responsive source |
| hero-light-1120.webp | 1120 × 1400 | 172,284 | Light larger source |
| hero-dark-600.webp | 600 × 750 | 49,090 | Dark responsive source |
| hero-dark-1120.webp | 1120 × 1400 | 173,478 | Dark larger source |

WebP exports were resized/compressed from the generated PNGs with ImageMagick, quality 80. No text, brand mark, portrait, animation or external font is embedded. Generated for this project; this record does not declare a license for unrelated repository assets.

`PageAtmosphere` places decorative ink/paper behind the entire document using cover sizing, without a defined image box, border or card. A feathered CSS mask blends the artwork into the paper background and keeps the text region quiet; multiply/screen blending absorbs source paper into the page palette. Home has the strongest right-side composition; About, Resume, Skills, Experience, Writing and Contact each use a different crop position and intensity. Reading routes use deterministic per-path positions with lower contrast that still exposes visible ink. The portrait stays on About only.

Root `data-theme` selects the light/dark CSS background. Mobile uses the 600px source and desktops the 1120px source; the browser requests the active themed asset. Backgrounds are hidden from the accessibility tree and do not receive focus or intercept clicks. No artwork animation, artificial image panel or extra per-page bitmap is added. The source palette remains usable if a decorative asset fails to load.

## Exact generation prompts

Light asset:

> Use case: stylized-concept. Asset type: standalone original homepage artwork for MeetByte, NOT a website screenshot. Reference image: approved editorial art direction; use the TOP variant's right-side rich ink and layered handmade paper composition. Create only a refined abstract artwork, portrait 4:5 composition: translucent torn ivory and blush paper layers, a substantial deep burgundy ink mass gathering along the right edge, subtle stone/paper grain, delicate hairline geometric arc accents subordinate to the textures. Match the approved sophisticated warm ivory, muted red, burgundy palette. Leave the left edge airy and pale for graceful integration beside separate HTML typography. The whole artwork must be complete and substantial, with visual depth, not a few generic curved lines. No text, letters, UI, website mockup, navigation, names, numbers, watermark, portrait, people, landscape, flowers, photo frame or border. Output one clean artwork asset suitable for light and dark website themes; the HTML will own all typography.

Dark variant (light output supplied as edit reference):

> Use case: lighting-weather. Asset type: dark-theme variant of the exact supplied abstract editorial artwork. Preserve the composition, torn paper shapes, ink mass, delicate hairlines, grain, dimensions and framing. Change only the color and illumination to a sophisticated charcoal/burgundy night palette: near-charcoal paper backdrop, dark burgundy ink mass, muted dusty rose translucent paper highlights, restrained warm gray texture. Maintain enough tonal separation to see all the original layered forms. Same artwork, same shapes and registration, intended to swap seamlessly with the light variant on a website. No text, symbols, UI, portrait, new objects, frame, watermark, neon or glossy effects.

## Export SHA-256

- hero-light-600.webp: `73d50ef4d7c6b7407c9f0dce04ef5c5f315e6e58361ac07834047d4330bf84e8`
- hero-light-1120.webp: `f4c649ec81cd5d36a5966294e22ec0519b95010e88e470cdd25237f7eb8f8c92`
- hero-dark-600.webp: `20deb52f3ef53d9a1ab87c1b49b904486739b2eb2326595086bf0a813bad163d`
- hero-dark-1120.webp: `2f771e7e451bf4f9bff8538c7ae20d3e0532d59d25725dbd11b16c8780a4fb63`

Latest correction: cover sizing keeps every raster edge outside the document, and route crops no longer use transformed oversized layers that could move ink out of the Skills reading area. Home layout fits ordinary viewports through flex/document flow; it is not cropped to prevent scrolling at browser zoom.

## Current composition — 14 October 2026

Home keeps its fixed approved raster and displays the complete 4:5 artwork at viewport height on desktop rather than stretching it with full-width cover. Its left edge has a local feathered mask; the header uses the same uninterrupted background. Smaller screens retain the ratio with a controlled right bleed and lower opacity, preserving legible copy. No header backing panel is added.

Inner pages vary among eight SVG ink arrangements on each navigation/refresh, using organic silhouettes, grain displacement and locally masked samples of these original textures. A session-only counter advances the composition; blocked storage uses browser randomness. The chosen art stays motionless while reading and stays the same when switching theme. Home does not use this counter. Skills/long reading routes receive a restrained lower-edge echo. This is decorative only, inaccessible to focus/assistive technology, and does not change content, routes or layout.

## Two-sided workbook spill revision — 14 October 2026

The latest owner feedback requested more artwork coverage and spills across the page. Home keeps the same approved 4:5 source, broadened to 96svh × 120svh on desktop with modest top/right bleed, plus a faint fixed left-side SVG spill. Smaller screens use the same ratio with deliberate right bleed and reduced opacity. This replaces the previous viewport-height framing; no image is stretched horizontally.

Inner compositions now alternate dominant stains between sides and add smaller opposite-side spills, irregular droplets and a faint lower echo on every inner page. Native vector silhouettes retain the approved paper texture. Their page-wide mask smoothly reduces ink through the reading lane rather than placing a white panel behind text. Refresh/route return variation remains; theme changes do not change the arrangement. No new external assets or animation are introduced.

## Diagonal Home and visible inner ink — 14 October 2026

Home’s source keeps its 4:5 ratio and now tilts 34° on desktop (28° on tablets, 22° on phones), creating a lower-middle-to-upper-right composition. An elliptical mask feathers all rotated raster edges; a separate page-coordinate fade protects the identity column. The original artwork and subtle fixed left spill remain; no literal wine bottle is added. Home identity is anchored above the footer instead of moved with increasing top padding. Small viewports remain free to scroll if content/menu/zoom needs more room.

Inner artwork opacity is now .55 in light and .60 in dark; long-form pages use .42/.46. Counter-spills and spray are stronger. The reading-lane fade reaches its quieter level just before the actual text margin (20px phone, 32px tablet, responsive desktop), so stronger margin ink does not run through words. Source textures, per-visit variation and theme-stable composition are preserved.

## Organic diagonal band and 24 compositions — 14 October 2026

The owner’s screenshot exposed the rounded pale paper bulge produced by the rotated bitmap’s ellipse mask. Home now uses a native SVG band following an organic lower-middle-to-upper-right path. A turbulence/displacement mask feathers the boundary; the original paired light/dark 4:5 texture is painted only inside it using multiply/screen blending. There is no rotated rectangle, ellipse or paper-coloured backing to bulge out at the right edge. Home’s quiet left spill and low identity placement stay fixed. No source bitmap or portrait is edited.

Inner-page inventory is expanded to 24 compositions: six genuinely different path silhouettes (pool, streak, split pools, curl, broad wash and splash) combined with eight arrangements, varied grain and counter-spills. One session-wide visit counter selects each new arrangement, avoiding the previous route-seed collision between different pages. Refresh/navigation changes the design; reading and theme changes keep it fixed. There is no continuous animation.

## Owner correction: restore original artwork — 14 October 2026

The owner rejected the SVG band: the request was to rotate the original right-side artwork, not replace its composition. Home now uses the exact unchanged hero-light/hero-dark source files again, rendered as a complete 4:5 image plane and rotated 48° desktop, 44° tablet, 40° phone. The replacement HomeRibbon component/paint paths have been removed. Source edges feather before the outermost pixels; a page-coordinate fade keeps the identity column quiet. The original torn paper, wine colour and fine linework are retained, without an elliptical mask or a new ribbon silhouette. Do not reinterpret a future placement request as authority to redraw this artwork.

The accepted 24 inner-page designs are retained, with intensity reduced roughly 10%: .55→.49 light, .60→.54 dark, .42→.38 light reading, .46→.41 dark reading. This is a small tone adjustment, not another design replacement.

## Continuous original Home — 14 October 2026

The owner rejected the artificial diagonal cut/fade. All old Home image masks, identity-side masks and extra Home stains are removed, including obsolete stylesheet rules. The original paired bitmap now covers the entire Home through a 48° rotated, container-sized overscan plane. Its 4:5 ratio is preserved; raster boundaries remain outside the page. The normal viewport crops the background at the screen boundary, but no internal contour, oval, ribbon or strip cuts the artwork. Uniform .50 opacity applies across the whole image in each theme; no region is faded differently and opening the menu does not change artwork intensity. Clear Home text ink retains the established two-tone name.

The fine curved lines are part of the original source image, not added by the renderer. No source bitmap is edited. The artificial straight diagonal seam from earlier compositing is removed. Other-page artwork/designs and their accepted tone remain unchanged.


## Current Home: line-free native compositions — 14 October 2026

Supersedes all earlier Home framing entries. Owner selected removal of the curved lines. Built-in image editing adapted the original artwork into landscape and portrait counterparts, retaining the wine palette, organic pigment shapes and paper character. These are edited adaptations, not pixel-identical originals. Original hero sources and inner-page artwork remain unchanged.

Prompt set: remove all thin arcs/circles/lines; retain original burgundy/blush/ivory pigment and fine paper texture; zoom out into a broad landscape, generous quiet left space, organic wine flow from middle bottom toward upper right; no frame, geometry, bottle, text or macro grain. Dark edit changes only palette to the original charcoal/plum/burgundy family while retaining composition. Mobile edit adapts the same artwork to tall 9:19 framing, quiet left two-thirds and right/bottom pigment, then a matching dark palette edit.

Actual editor output: landscape 1672×941 both themes; portrait 863×1822 light / 864×1821 dark. A 3840×2160 landscape was requested but not delivered; these are not native 4K assets. No artificial upscaling was performed. Encoded WebP at quality 92, effort 6. Native diagonal composition replaces CSS rotation and overscan. Aspect ratio selects tall sources for portrait screens; cover still naturally crops at different screen ratios. No internal masks/fades, added lines or extra Home stains. Uniform opacity .50 light/.44 dark passes targeted text contrast. Retina and larger-than-tested displays can still resample these finite sources; no universal pixel-perfect sharpness claim.

- `home-dark-landscape.webp`: 337,010 bytes; SHA-256 `dea66ccde26db8501753d47cea088226d17d31367ff3b66fd47eeaea4d788082`.
- `home-dark-portrait.webp`: 278,728 bytes; SHA-256 `90971123e23c0e2ba008152b8dbca6c009e25ca2b459d937d8a98ed41572e2c9`.
- `home-light-landscape.webp`: 280,898 bytes; SHA-256 `8f60c5907b67290bd0d12a617461234c4f0e5a64764a11d26a61b2d718f5cc2b`.
- `home-light-portrait.webp`: 197,024 bytes; SHA-256 `485153fd704df626f305bb6d0648897141c323b717c99c471263b98760d2e48b`.


14 October follow-up: owner accepted the Home image and requested slightly stronger opacity: current .54 light/.47 dark. Inner visits select once and reveal after texture decode, avoiding a visible composition-0 hydration swap. Texture failures leave native SVG ink and readable content; no late layout movement. Current release-candidate evidence: `docs/qa/pr-ready/`.
