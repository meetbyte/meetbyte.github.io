/**
 * @file Shared static route resolution and metadata; no filesystem code enters client components.
 * @author meetbyte
 */
import { notFound } from "next/navigation";
import { editorialConfig, type EditorialSection } from "@/constants/editorial";
import { editorialSections } from "@/data/editorial";
import { getSectionEntries } from "./editorial";
import { isPageEnabled } from "@/lib/page-visibility";
import { requirePageEnabled } from "@/lib/require-page-enabled";
import { pageMetadata } from "@/lib/metadata";

export type EditorialPageProps = { params: Promise<{ slug: string }> };
/** Retains the reserved not-found parameter needed for an empty static-export inventory. @author meetbyte */
export async function getEditorialStaticParams(section: EditorialSection) {
  const entries = isPageEnabled(section)
    ? await getSectionEntries(section)
    : [];
  return entries.length
    ? entries.map(({ slug }) => ({ slug }))
    : [{ slug: editorialConfig.reservedSlug }];
}
/** Resolves only entries allowed by the section's production/development publication policy. @author meetbyte */
export async function resolveEditorialRoute(
  section: EditorialSection,
  slug: string,
) {
  requirePageEnabled(section);
  const entries = await getSectionEntries(section);
  const index = entries.findIndex((entry) => entry.slug === slug);
  if (index < 0) notFound();
  return {
    entry: entries[index],
    previous: entries[index - 1],
    next: entries[index + 1],
  };
}
/** Supplies canonical metadata using the same entry resolver as the rendered page. @author meetbyte */
export async function getEditorialPageMetadata(
  section: EditorialSection,
  slug: string,
) {
  const { entry } = await resolveEditorialRoute(section, slug);
  return pageMetadata(
    entry.title,
    entry.seoDescription,
    `${editorialSections[section].route}${entry.slug}/`,
    {
      sample: entry.status !== "published",
      article: true,
      date: entry.publishedAt,
      tags: entry.tags,
    },
  );
}
