"use client";

/**
 * @file Preserve the image's space and accessible description if its request fails.
 * @author meetbyte
 */
import Image, { type ImageProps } from "next/image";
import { useState } from "react";
/**
 * Renders a dimension-preserving image and replaces failed requests with an accessible, stable fallback.
 * @author meetbyte
 */
export function SiteImage({ alt, className, fill, width, height, ...props }: ImageProps) {
  const [failed, setFailed] = useState(false);
  if (failed) return <span className={`${className ?? ""} image-fallback${fill ? " image-fallback-fill" : ""}`} role={alt ? "img" : undefined} aria-label={alt ? `${alt} — image unavailable` : undefined} aria-hidden={!alt || undefined} style={fill ? undefined : { width: typeof width === "number" ? width : "100%", maxWidth: "100%", aspectRatio: `${width} / ${height}` }}>
    {alt && <span>Image unavailable</span>}
  </span>;
  return <Image {...props} alt={alt} className={className} fill={fill} width={width} height={height} onError={() => setFailed(true)} />;
}
