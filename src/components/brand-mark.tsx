/**
 * @file Existing m-dot logo geometry expressed with the site's semantic palette.
 * @author meetbyte
 */
/** Decorative inside the separately named Home link; theme changes recolor it without a duplicate wordmark. @author meetbyte */
export function BrandMark() {
 return <svg className="brand-logo" width="36" height="36" viewBox="0 0 180 180" aria-hidden="true" focusable="false">
  <rect width="180" height="180" rx="40" fill="var(--logo-color)" />
  <text x="28" y="124" fontFamily="Arial,sans-serif" fontSize="119" fontWeight="bold" fill="var(--page)">m</text>
  <circle cx="144" cy="119" r="10" fill="var(--page)" />
 </svg>;
}
