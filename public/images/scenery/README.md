# Portfolio nature scenery

These images were generated for Meet Thummar's portfolio using the imagegen skill and built-in image generation/editing tool. They are compressed WebP assets; foliage, clouds and the lunar texture retain alpha transparency.

Seasonal pairs (selected by the local calendar or the footer preview control):

- autumn-day-v1.webp / autumn-night-v1.webp: copper and amber foliage.
- monsoon-day-v1.webp / monsoon-night-v1.webp: lush wet greenery, layered clouds and valley mist.
- winter-day-v1.webp / winter-night-v1.webp: frosted branches and snowy landscape.
- Summer uses daylight-v2.webp / moonlight-v2.webp.

The six seasonal variants were created with the built-in imagegen tool in lighting/weather edit mode, keeping the original composition and excluding sun/moon discs. Exact prompts and generated source paths are recorded in this chat’s seasonal-assets.json deliverable. The generated PNGs were encoded to 1536 × 1024 WebP at quality 85 without other image changes. Animated rain, snow and leaves are code-native CSS shapes; no video or extra raster particle assets are used.

Shared assets:

- daylight-v2.webp: daylight landscape plate, edited to remove the fixed sun disc.
- moonlight-v2.webp: night landscape plate, edited to remove the fixed moon disc.
- moon-disc-v1.webp: isolated silver full-moon texture, transparent outside the circle.
- foliage-v1.webp: transparent peripheral leaves for wind sway, strongest in daylight.
- clouds-v1.webp: transparent cloud wisps, used at two depths in both themes.

The sun is drawn with CSS. One visible travelling disc is rendered across complementary header/sky clips. It dips behind the opaque cards, changes texture while hidden and emerges as the other light, controlled by src/components/celestial-body.tsx, src/lib/theme-journey.ts and src/styles/scenery.css. Both sky plates are blended with sunset/twilight colour washes during the journey. The cards remain opaque for readability. Narrow screens retain a shorter horizontal path and the same dip behind the cards.

Retained originals daylight-v1.webp and moonlight-v1.webp contain fixed sun/moon discs and are not used by the current scenery styles. Keep them as reversible source references. Original PNGs and the exact edit prompts are recorded in this chat's celestial implementation notes. To replace an active asset, add a new version and update src/styles/scenery.css.
