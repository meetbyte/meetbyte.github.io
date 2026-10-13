/**
 * @file Shared visibility checks for links and page content.
 * @author meetbyte
 */
import { pageVisibility, type PageKey } from "@/constants/page-visibility";
import { routes } from "@/constants/routes";

/**
 * Checks the central switch for a page.
 * @param page - Route key from the visibility file.
 * @returns Whether the page is enabled.
 * @author meetbyte
 */
export function isPageEnabled(page: PageKey): boolean {
  return pageVisibility[page];
}

/**
 * Checks a canonical internal link against the page switches.
 * @param href - Path from the routes file.
 * @returns Whether the destination is enabled.
 * @author meetbyte
 */
export function isRouteEnabled(href: string): boolean {
  const page = (Object.keys(routes) as PageKey[]).find((key) => routes[key] === href);
  return page !== undefined && isPageEnabled(page);
}
