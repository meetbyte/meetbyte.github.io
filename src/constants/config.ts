/**
 * @file Behavior settings shared across interactive components.
 * @author meetbyte
 */
export const siteConfig = {
  // Retained legacy scenery settings; the editorial shell does not mount these controls.
  showSeasonPicker: false,
  themePreferenceStorageKey: "meetbyte-theme-preference",
  themePreferenceEvent: "meetbyte:theme-preference",
  prefersDarkThemeQuery: "(prefers-color-scheme: dark)",
  navigationStallMs: 5000,
  themeVisitStorageKey: "meetbyte-theme-visit",
  dayStartHour: 7,
  nightStartHour: 19,
  prefersReducedMotionQuery: "(prefers-reduced-motion: reduce)",
  roleRotationMs: 3600,
} as const;
