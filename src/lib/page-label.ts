/**
 * @file Page numbers follow the same visible routes as the navigation.
 * @author meetbyte
 */
import { navigationItems } from "@/data/navigation";
import { isRouteEnabled } from "./page-visibility";

/**
 * Numbers a route from the currently visible navigation order, or returns its label when it is not visible.
 * @author meetbyte
 */
export function pageEyebrow(href: string, label: string): string {
  const index = navigationItems.filter((item) => isRouteEnabled(item.href)).findIndex((item) => item.href === href);
  return index < 0 ? label : `${String(index).padStart(2, "0")} / ${label}`;
}
