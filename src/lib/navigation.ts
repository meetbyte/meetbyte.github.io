/**
 * @file Route helpers shared by navigation behavior.
 * @author meetbyte
 */

/**
 * Ensures route comparisons use the site's trailing-slash format.
 * @param pathname - Browser pathname to normalize.
 * @returns The pathname with a trailing slash.
 * @author meetbyte
 */
export function normalizePath(pathname: string): string {
  return pathname.endsWith("/") ? pathname : `${pathname}/`;
}

/**
 * Determines whether a navigation link represents the current route.
 * @param pathname - Current browser pathname.
 * @param href - Canonical navigation destination.
 * @returns Whether the link should be marked as active.
 * @author meetbyte
 */
export function isActiveRoute(pathname: string, href: string): boolean {
  const current = normalizePath(pathname);
  return current === href || (href !== "/" && current.startsWith(href));
}
