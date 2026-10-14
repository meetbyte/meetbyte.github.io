"use client";

/**
 * @file Native document navigation for static GitHub Pages; no RSC route transport is required.
 * @author meetbyte
 */
import type { AnchorHTMLAttributes } from "react";
import { useConnection } from "./connection-provider";
type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
};

/**
 * Loads exported HTML directly. Preserve browser history, modifier clicks, downloads and native no-JS links.
 * Only an ordinary offline internal click is held for the existing connection-recovery control.
 * @author meetbyte
 */
export function SiteLink({ href, onClick, onPointerEnter, onFocus, ...props }: Props) {
  const connection = useConnection();
  /** Browser-managed HTML prefetch on intent; retain native navigation and honor limited data. @author meetbyte */
  const warmDocument = () => {
    const network = navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } };
    if (connection.offline || network.connection?.saveData || /(^|-)2g$/.test(network.connection?.effectiveType ?? "") ||
      !href.startsWith("/") || href.startsWith("//") || props.download ||
      (props.target && props.target !== "_self")) return;
    const url = new URL(href, window.location.href);
    if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;
    url.hash = "";
    if ([...document.querySelectorAll<HTMLLinkElement>('link[rel="prefetch"]')].some(link => link.href === url.href)) return;
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.as = "document";
    link.href = url.href;
    document.head.append(link);
  };
  return (
    <a
      {...props}
      href={href}
      onPointerEnter={(event) => { onPointerEnter?.(event); if (!event.defaultPrevented) warmDocument(); }}
      onFocus={(event) => { onFocus?.(event); if (!event.defaultPrevented) warmDocument(); }}
      onClick={(event) => {
        onClick?.(event);
        if (
          !event.defaultPrevented &&
          connection.offline &&
          href.startsWith("/") &&
          !href.startsWith("//") &&
          !props.download &&
          (!props.target || props.target === "_self") &&
          event.button === 0 &&
          !event.metaKey &&
          !event.ctrlKey &&
          !event.shiftKey &&
          !event.altKey
        ) {
          event.preventDefault();
          connection.hold(href);
        }
      }}
    />
  );
}
