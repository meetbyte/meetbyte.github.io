"use client";
/**
 * @file Decorative responsive artwork with before-paint theme matching and dimension-preserving fallback.
 * @author meetbyte
 */
import { useState } from "react";
/** Uses static WebP srcsets without an image server; CSS selects the manual/OS-resolved theme. @author meetbyte */
export function EditorialArtwork({ variant = "hero" }: { variant?: "hero" | "experience" | "writing" }) {
  const [failed, setFailed] = useState({ light: false, dark: false });
  return <div className={`editorial-artwork artwork-${variant}`} aria-hidden="true">
    {(["light", "dark"] as const).map(mode => (
      // Native srcset keeps this static export independent of an optimization server.
      // eslint-disable-next-line @next/next/no-img-element
      <img key={mode} className={`artwork-image artwork-${mode}${failed[mode] ? " artwork-failed" : ""}`} src={`/images/editorial/hero-${mode}-600.webp`} srcSet={`/images/editorial/hero-${mode}-600.webp 600w, /images/editorial/hero-${mode}-1120.webp 1120w`} sizes={variant === "hero" ? "(max-width: 959px) 80vw, 440px" : "(max-width: 639px) 90vw, 260px"} width={1120} height={1400} alt="" loading={variant === "hero" ? "eager" : "lazy"} fetchPriority={variant === "hero" ? "high" : "auto"} onError={() => setFailed(current => ({ ...current, [mode]: true }))} />
    ))}
  </div>;
}
