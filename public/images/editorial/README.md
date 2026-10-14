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

`PageAtmosphere` places decorative ink/paper behind the entire document, without a defined image box, border or card. A feathered CSS mask blends the artwork into the paper background and keeps the text region quiet; multiply/screen blending absorbs source paper into the page palette. Home has the strongest right-side composition; About, Resume, Skills, Experience, Writing and Contact each use a different position, angle and intensity. Reading routes use deterministic per-path offsets with lower contrast that still exposes visible ink. The portrait stays on About only.

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
