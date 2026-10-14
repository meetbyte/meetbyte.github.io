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
export function SiteLink({ href, onClick, ...props }: Props) {
  const connection = useConnection();
  return (
    <a
      {...props}
      href={href}
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
