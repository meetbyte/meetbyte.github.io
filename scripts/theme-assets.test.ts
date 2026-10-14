/** @file Verify route-scoped image selection and cold/failing appearance preparation. @author meetbyte */
import test from "node:test";
import assert from "node:assert/strict";
import { prepareThemeAssets, themeAssetUrls } from "../src/lib/theme-assets";

test("appearance preparation loads the correct frame and About portrait only", () => {
  assert.deepEqual(themeAssetUrls("dark", "/", true), ["/images/editorial/home-dark-portrait.webp"]);
  assert.deepEqual(themeAssetUrls("light", "/", false), ["/images/editorial/home-light-landscape.webp"]);
  assert.deepEqual(themeAssetUrls("dark", "/about/", false), ["/images/editorial/hero-dark-600.webp", "/images/meet-thummar-dark.webp"]);
  assert.deepEqual(themeAssetUrls("light", "/writing/example/", false), ["/images/editorial/hero-light-600.webp"]);
});

test("cold themes wait for decode, reuse successful loads and retry failed requests", async () => {
  const originals = { Image: Object.getOwnPropertyDescriptor(globalThis, "Image"), window: Object.getOwnPropertyDescriptor(globalThis, "window") };
  const images: MockImage[] = [];
  let release!: () => void;
  class MockImage {
    onload: (() => void) | null = null;
    onerror: (() => void) | null = null;
    src = "";
    decode = () => new Promise<void>(resolve => { release = resolve; });
    constructor() { images.push(this); }
  }
  Object.defineProperty(globalThis, "Image", { configurable: true, value: MockImage });
  Object.defineProperty(globalThis, "window", { configurable: true, value: { location: { pathname: "/" }, matchMedia: () => ({ matches: false }) } });
  try {
    let done = false;
    const first = prepareThemeAssets("dark").then(result => { done = true; return result; });
    images[0].onload?.();
    await Promise.resolve();
    assert.equal(done, false, "palette must not be considered ready before decode");
    release();
    assert.equal(await first, true);
    assert.equal(await prepareThemeAssets("dark"), true);
    assert.equal(images.length, 1, "decoded variant should be reused");
    const failed = prepareThemeAssets("light");
    images[1].onerror?.();
    assert.equal(await failed, false);
    const retry = prepareThemeAssets("light");
    images[2].onload?.(); release();
    assert.equal(await retry, true);
  } finally {
    for (const [key, descriptor] of Object.entries(originals)) {
      if (descriptor) Object.defineProperty(globalThis, key, descriptor);
      else Reflect.deleteProperty(globalThis, key);
    }
  }
});
