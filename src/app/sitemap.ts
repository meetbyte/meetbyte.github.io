/**
 * @file Only published, genuine content is submitted for search indexing.
 * @author meetbyte
 */
import type { MetadataRoute } from "next";
import { routes } from "@/constants/routes";
import { isPageEnabled } from "@/lib/page-visibility";
import type { PageKey } from "@/constants/page-visibility";
import { getProjects } from "@/lib/content/projects";
import { getPosts } from "@/lib/content/posts";
import { siteUrl } from "@/lib/metadata";
export const dynamic = "force-static";
/**
 * Builds canonical entries for enabled pages and genuine projects/articles, excluding illustrative samples.
 * @author meetbyte
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = (Object.keys(routes) as PageKey[]).filter(isPageEnabled).map((key) => ({ url: `${siteUrl}${routes[key]}` }));
  const projects = isPageEnabled("projects") ? getProjects().filter((p) => !p.placeholder).map((p) => ({ url: `${siteUrl}/projects/${p.slug}/` })) : [];
  const posts = isPageEnabled("blog") ? (await getPosts()).filter((p) => !p.placeholder).map((p) => ({ url: `${siteUrl}/blog/${p.slug}/`, lastModified: p.date })) : [];
  return [...pages, ...projects, ...posts];
}
