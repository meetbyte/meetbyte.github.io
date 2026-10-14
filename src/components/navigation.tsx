"use client";

/**
 * @file Native mobile disclosure stays usable before JavaScript loads.
 * @author meetbyte
 */
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { siteContent } from "@/constants/content";
import { navigationItems } from "@/data/navigation";
import { isActiveRoute } from "@/lib/navigation";
import { isRouteEnabled } from "@/lib/page-visibility";
import { SiteLink } from "./site-link";

/** Render visible routes and preserve keyboard/native disclosure behaviour. @author meetbyte */
export function Navigation() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menu = useRef<HTMLDetailsElement>(null);
  const previousPath = useRef(pathname);
  const visibleItems = navigationItems.filter((item) =>
    isRouteEnabled(item.href),
  );

  useEffect(() => {
    // Close after arrival, keeping navigation available while a route is slow.
    if (previousPath.current !== pathname && menu.current) {
      menu.current.open = false;
    }
    previousPath.current = pathname;
  }, [pathname]);

  useEffect(() => {
    const dismissOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || !menu.current?.open) return;
      menu.current.open = false;
      menu.current.querySelector("summary")?.focus();
    };
    const dismissOutside = (event: PointerEvent) => {
      if (
        menu.current?.open &&
        event.target instanceof Node &&
        !menu.current.contains(event.target)
      ) {
        menu.current.open = false;
      }
    };
    document.addEventListener("keydown", dismissOnEscape);
    document.addEventListener("pointerdown", dismissOutside);
    return () => {
      document.removeEventListener("keydown", dismissOnEscape);
      document.removeEventListener("pointerdown", dismissOutside);
    };
  }, []);

  /** Shares route labels and active-state semantics between both navigation layouts. @author meetbyte */
  function renderLinks() {
    return visibleItems.map((item, index) => {
      const active = isActiveRoute(pathname, item.href);
      return (
        <SiteLink
          key={item.href}
          href={item.href}
          className={`nav-link${active ? " is-active" : ""}`}
          aria-current={active ? "page" : undefined}
        >
          <span className="mobile-route-index" aria-hidden="true">
            {String(index).padStart(2, "0")}
          </span>
          <span className="nav-label">{item.label}</span>
        </SiteLink>
      );
    });
  }

  return (
    <div className="navigation-wrap">
      <nav
        className="primary-navigation desktop-navigation"
        aria-label={siteContent.common.navigation.label}
      >
        {renderLinks()}
      </nav>
      <details
        ref={menu}
        className="mobile-navigation"
        onToggle={(event) => setMenuOpen(event.currentTarget.open)}
        suppressHydrationWarning
        onBlur={(event) => {
          if (
            event.relatedTarget instanceof Node &&
            !event.currentTarget.contains(event.relatedTarget)
          ) {
            event.currentTarget.open = false;
          }
        }}
      >
        <summary
          className="menu-toggle"
          aria-label={
            menuOpen
              ? siteContent.common.navigation.closeLabel
              : siteContent.common.navigation.openLabel
          }
        >
          <span className="menu-open-icon">
            {siteContent.common.navigation.openText}
          </span>
          <span className="menu-close-icon">
            {siteContent.common.navigation.closeText}
          </span>
        </summary>
        <nav
          id="primary-navigation"
          className="primary-navigation"
          aria-label={siteContent.common.navigation.label}
        >
          <span className="menu-caption" aria-hidden="true">
            {siteContent.common.navigation.caption}
          </span>
          {renderLinks()}
        </nav>
      </details>
    </div>
  );
}
