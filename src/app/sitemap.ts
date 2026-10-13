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
import { getEditorialLibrary, getPublishedEditorial } from "@/lib/content/editorial";
import { siteUrl } from "@/lib/metadata";
export const dynamic = "force-static";
/**
 * Builds canonical entries for enabled pages and genuine projects/articles, excluding illustrative samples.
 * @author meetbyte
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Validate unpublished inventory during static builds without adding its URLs.
  await getEditorialLibrary();
  const pages = (Object.keys(routes) as PageKey[]).filter(isPageEnabled).map((key) => ({ url: `${siteUrl}${routes[key]}` }));
  const projects = isPageEnabled("projects") ? getProjects().filter((p) => !p.placeholder).map((p) => ({ url: `${siteUrl}/projects/${p.slug}/` })) : [];
  const posts = isPageEnabled("blog") ? (await getPosts()).filter((p) => !p.placeholder).map((p) => ({ url: `${siteUrl}/blog/${p.slug}/`, lastModified: p.date })) : [];
  const editorial = [];
  for (const kind of ["experience", "writing"] as const) {
    if (isPageEnabled(kind)) for (const entry of await getPublishedEditorial(kind)) {
      editorial.push({ url: `${siteUrl}/${kind}/${entry.slug}/`, ...(entry.updatedAt || entry.publishedAt ? { lastModified: entry.updatedAt ?? entry.publishedAt } : {}) });
    }
  }
  return [...pages, ...projects, ...posts, ...editorial];
}
