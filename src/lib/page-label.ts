/** Page numbers follow the same visible routes as the navigation. @author meetbyte */
import { navigationItems } from "@/data/navigation";
import { isRouteEnabled } from "./page-visibility";

export function pageEyebrow(href: string, label: string): string {
  const index = navigationItems.filter((item) => isRouteEnabled(item.href)).findIndex((item) => item.href === href);
  return index < 0 ? label : `${String(index).padStart(2, "0")} / ${label}`;
}
