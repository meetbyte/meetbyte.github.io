/**
 * @file Artwork selection settings shared by prepaint bootstrap and client navigation.
 * @author meetbyte
 */
export const inkConfig = {
  visitStorageKey: "meetbyte-ink-visit",
  compositionCount: 24,
  themeAssetTimeoutMs: 8000,
  portraitQuery: "(max-aspect-ratio: 1/1)",
  assetDirectory: "/images/editorial/",
} as const;
