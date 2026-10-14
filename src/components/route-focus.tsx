"use client";
/**
 * @file Restores keyboard context after client navigation without intercepting native scrolling.
 * @author meetbyte
 */
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
/** Focus the reading region only after a route change, never on initial load. @author meetbyte */
export function RouteFocus() {
  const pathname = usePathname();
  const previous = useRef(pathname);
  useEffect(() => {
    if (previous.current !== pathname) {
      document.getElementById("main-content")?.focus({ preventScroll: true });
      previous.current = pathname;
    }
  }, [pathname]);
  return null;
}
