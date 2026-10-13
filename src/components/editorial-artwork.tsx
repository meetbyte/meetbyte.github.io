"use client";
/**
 * @file Route-specific full-page ink atmosphere; decorative and independent of document layout.
 * @author meetbyte
 */
import { usePathname } from "next/navigation";
import type { CSSProperties } from "react";
/** Keeps a coherent artwork family with distinct page crops and quieter long-form backgrounds. @author meetbyte */
export function PageAtmosphere() {
  const pathname = usePathname();
  const section = pathname.split("/")[1] || "home";
  const reading = /\/(experience|writing)\/[^/]+/.test(pathname);
  const seed = [...pathname].reduce((value, letter) => (value * 31 + letter.charCodeAt(0)) % 97, 0);
  return <div className={`page-atmosphere atmosphere-${section}${reading ? " atmosphere-reading" : ""}`} aria-hidden="true" style={{ "--reading-shift": `${70 + seed / 5}%`, "--reading-rotation": `${seed / 10 - 5}deg` } as CSSProperties}><div className="ink-layer" /></div>;
}
