"use client";

/**
 * @file Native HTML navigation on limited connections; fallback for slow SPA routes.
 * @author meetbyte
 */
import Link from "next/link";
import type { AnchorHTMLAttributes } from "react";
import { useConnection } from "./connection-provider";
type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href: string };

/**
 * Uses native anchors on limited connections, prevents unusable offline navigation and tracks ordinary client navigation without prefetch.
 * @author meetbyte
 */
export function SiteLink({ href, onClick, ...props }: Props) {
  const connection = useConnection();
  if (connection.limited) return <a {...props} href={href} onClick={(event) => {
    onClick?.(event);
    if (!event.defaultPrevented && connection.offline && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
      event.preventDefault(); connection.hold(href);
    }
  }} />;
  return <Link {...props} href={href} onClick={onClick} prefetch={false} onNavigate={() => connection.begin(href)} />;
}
