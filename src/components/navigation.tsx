"use client";

/** Native mobile disclosure stays usable before JavaScript loads. @author meetbyte */
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { siteContent } from "@/constants/content";
import { navigationItems } from "@/data/navigation";
import { isActiveRoute } from "@/lib/navigation";
import { isRouteEnabled } from "@/lib/page-visibility";
import { SiteLink } from "./site-link";
import { Icon } from "./icons";

/** Render visible routes and preserve keyboard/native disclosure behaviour. */
export function Navigation() {
  const pathname = usePathname();
  const desktop = useRef<HTMLElement>(null);
  const menu = useRef<HTMLDetailsElement>(null);
  const previousPath = useRef(pathname);
  const visibleItems = navigationItems.filter((item) => isRouteEnabled(item.href));

  useEffect(() => {
    // Close after arrival, keeping navigation available while a route is slow.
    if (previousPath.current !== pathname && menu.current) {
      menu.current.open = false;
    }
    previousPath.current = pathname;
  }, [pathname]);

  useEffect(() => {
    const measureIndicator = () => {
      const navigation = desktop.current;
      const active = navigation?.querySelector<HTMLElement>(".is-active");
      if (!navigation || !active) return;
      // Match the link's rendered padding, including narrower desktop layouts.
      const padding = parseFloat(window.getComputedStyle(active).paddingLeft);
      navigation.style.setProperty("--nav-left", `${active.offsetLeft + padding}px`);
      navigation.style.setProperty("--nav-width", `${Math.max(0, active.offsetWidth - 2 * padding)}px`);
    };
    measureIndicator();
    window.addEventListener("resize", measureIndicator);
    return () => window.removeEventListener("resize", measureIndicator);
  }, [pathname]);

  useEffect(() => {
    const dismissOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || !menu.current?.open) return;
      menu.current.open = false;
      menu.current.querySelector("summary")?.focus();
    };
    const dismissOutside = (event: PointerEvent) => {
      if (menu.current?.open && event.target instanceof Node && !menu.current.contains(event.target)) {
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

  function renderLinks() {
    return visibleItems.map((item) => {
      const active = isActiveRoute(pathname, item.href);
      return (
        <SiteLink
          key={item.href}
          href={item.href}
          className={`nav-link${active ? " is-active" : ""}`}
          aria-current={active ? "page" : undefined}
        >
          {item.label}
        </SiteLink>
      );
    });
  }

  return (
    <div className="navigation-wrap">
      <nav ref={desktop} className="primary-navigation desktop-navigation" aria-label={siteContent.common.navigation.label}>
        <span className="nav-indicator" aria-hidden="true" />
        {renderLinks()}
      </nav>
      <details
        ref={menu}
        className="mobile-navigation"
        suppressHydrationWarning
        onBlur={(event) => {
          if (event.relatedTarget instanceof Node && !event.currentTarget.contains(event.relatedTarget)) {
            event.currentTarget.open = false;
          }
        }}
      >
        <summary className="menu-toggle icon-button" aria-label="Navigation menu">
          <span className="menu-open-icon"><Icon name="menu" size={21} /></span>
          <span className="menu-close-icon"><Icon name="close" size={21} /></span>
        </summary>
        <nav id="primary-navigation" className="primary-navigation" aria-label={siteContent.common.navigation.label}>
          {renderLinks()}
        </nav>
      </details>
    </div>
  );
}
