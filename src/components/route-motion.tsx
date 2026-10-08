"use client";
/**
 * @file Keyed entry animation also replays between nested case-study/article routes.
 * @author meetbyte
 */
import { usePathname } from "next/navigation";
/**
 * Keys the content entrance to the current pathname so nested route changes replay their CSS transition.
 * @author meetbyte
 */
export function RouteMotion({ children }: { children: React.ReactNode }) {
  return <div className="page-transition" key={usePathname()}>{children}</div>;
}
