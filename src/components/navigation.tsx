"use client";

/**
 * @file Route-aware navigation and the mobile menu.
 * @author meetbyte
 */
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteContent } from "@/constants/content";
import { navigationItems } from "@/data/navigation";
import { isActiveRoute } from "@/lib/navigation";
import { isRouteEnabled } from "@/lib/page-visibility";
import { Icon } from "./icons";

/**
 * Marks the current route and toggles the menu on narrow screens.
 * @returns The primary site navigation.
 * @author meetbyte
 */
export function Navigation() {
  const pathname = usePathname();
  const copy = siteContent.common.navigation;
  const [open, setOpen] = useState(false);
  // Navigation uses the same publication flags as the route guards.
  const visibleItems = navigationItems.filter((item) => isRouteEnabled(item.href));

  // Close the mobile menu after a route change so the new page stays visible.
  useEffect(() => setOpen(false), [pathname]);

  return (
    <div className="navigation-wrap">
      <button
        type="button"
        className="menu-toggle icon-button"
        aria-label={open ? copy.closeLabel : copy.openLabel}
        aria-controls="primary-navigation"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <Icon name={open ? "close" : "menu"} size={21} />
      </button>
      <nav id="primary-navigation" className={`primary-navigation${open ? " is-open" : ""}`} aria-label={copy.label}>
        {visibleItems.map((item) => {
          const active = isActiveRoute(pathname, item.href);
          return (
            <Link key={item.href} href={item.href} className={`nav-link${active ? " is-active" : ""}`} aria-current={active ? "page" : undefined}>
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
