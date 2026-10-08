/**
 * @file Behavior settings shared across interactive components.
 * @author meetbyte
 */
export const siteConfig = {
  // Enable the compact header season preview when you want to compare backgrounds.
  showSeasonPicker: false,
  themeVisitStorageKey: "meetbyte-theme-visit",
  dayStartHour: 7,
  nightStartHour: 19,
  prefersReducedMotionQuery: "(prefers-reduced-motion: reduce)",
  roleRotationMs: 3600,
} as const;
