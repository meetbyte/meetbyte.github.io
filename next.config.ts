/**
 * @file Static export settings for GitHub Pages deployment.
 * @author meetbyte
 */
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  devIndicators: false,
  // The local preview is also opened through 127.0.0.1. Next.js otherwise
  // blocks development assets for that hostname and leaves controls inactive.
  allowedDevOrigins: ["127.0.0.1"],
};

export default nextConfig;
