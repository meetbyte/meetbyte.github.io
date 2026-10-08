"use client";
/** Keyed entry animation also replays between nested case-study/article routes. @author meetbyte */
import { usePathname } from "next/navigation";
export function RouteMotion({ children }: { children: React.ReactNode }) {
  return <div className="page-transition" key={usePathname()}>{children}</div>;
}
