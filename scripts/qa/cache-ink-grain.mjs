/** @file Bake the native SVG noise map once; preserve organic edges without live fractal computation. @author meetbyte */
import sharp from "sharp";
import fs from "node:fs";
const { chromium } = await import(
  process.env.PLAYWRIGHT_MODULE_PATH || "playwright"
);
const browser = await chromium.launch({
  executablePath: process.env.FOUNDATION_BROWSER_EXECUTABLE,
  args: ["--no-sandbox"],
});
try {
  const page = await browser.newPage({ viewport: { width: 512, height: 512 } });
  await page.setContent(
    '<style>html,body{margin:0;background:transparent}</style><svg width="512" height="512" viewBox="0 0 1000 1000"><defs><filter id="grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".015 .024" numOctaves="3" seed="3"/></filter></defs><rect width="1000" height="1000" filter="url(#grain)"/></svg>',
  );
  const texture = await sharp(await page.screenshot({ omitBackground: true }))
    .resize(128, 128)
    .removeAlpha()
    .webp({ quality: 65, effort: 6 })
    .toBuffer();
  fs.writeFileSync(
    "src/lib/ink-grain.ts",
    '/** @file Cached native SVG fractal grain: .015/.024, three octaves, seed 3; regenerate with scripts/qa/cache-ink-grain.mjs. @author meetbyte */\nexport const inkGrain = "data:image/webp;base64,' +
      texture.toString("base64") +
      '";\n',
  );
  console.log("Cached native grain bytes", texture.length);
} finally {
  await browser.close();
}
