/**
 * @file Static crawler guidance for GitHub Pages.
 * @author meetbyte
 */
import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/metadata";
export const dynamic = "force-static";
/**
 * Emits static crawler guidance referencing the configured canonical origin and sitemap.
 * @author meetbyte
 */
export default function robots(): MetadataRoute.Robots { return { rules: { userAgent: "*", allow: "/" }, sitemap: `${siteUrl}/sitemap.xml`, host: siteUrl }; }
