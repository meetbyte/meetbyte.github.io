/**
 * @file Accessible sanitized essay pages; development drafts cannot reach the production export.
 * @author meetbyte
 */
import { notFound } from "next/navigation";
import { SiteLink as Link } from "@/components/site-link";
import { getWritingEntries } from "@/lib/content/editorial";
import { isPageEnabled } from "@/lib/page-visibility";
import { requirePageEnabled } from "@/lib/require-page-enabled";
import { pageMetadata } from "@/lib/metadata";
import { formatPostDate } from "@/lib/content/posts";
type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
/** Reserves one not-found parameter when static export has no published essays. @author meetbyte */
export async function generateStaticParams() {
  const entries = isPageEnabled("writing") ? await getWritingEntries() : [];
  return entries.length ? entries.map(({ slug }) => ({ slug })) : [{ slug: "_unpublished" }];
}
/** Supplies canonical metadata without inventing publication dates; local drafts are noindex. @author meetbyte */
export async function generateMetadata({ params }: Props) {
  requirePageEnabled("writing");
  const slug = (await params).slug;
  const entry = (await getWritingEntries()).find(entry => entry.slug === slug);
  if (!entry) notFound();
  return pageMetadata(entry.title, entry.seoDescription, `/writing/${entry.slug}/`, { sample: entry.status !== "published", article: true, date: entry.publishedAt, tags: entry.tags });
}
/** Keeps exact source prose, readable metadata and ordered previous/next links. @author meetbyte */
export default async function Essay({ params }: Props) {
  requirePageEnabled("writing");
  const slug = (await params).slug;
  const entries = await getWritingEntries();
  const index = entries.findIndex(entry => entry.slug === slug);
  if (index < 0) notFound();
  const entry = entries[index];
  return <article className="detail-page editorial-essay">
    <Link className="back-link" href="/writing/">← All writing</Link>
    <header className="detail-intro"><p className="writing-meta"><span>{entry.category}</span><span>{entry.minutes} min read</span>{entry.publishedAt && <time dateTime={entry.publishedAt}>{formatPostDate(entry.publishedAt)}</time>}{entry.status !== "published" && <span>Draft</span>}</p><h1>{entry.title}</h1><p className="detail-lead">{entry.summary}</p></header>
    {/* Only the shared sanitized build-time adapter can supply HTML. */}
    <div className="article-prose" dangerouslySetInnerHTML={{ __html: entry.html }} />
    <nav className="essay-navigation" aria-label="More writing">{entries[index-1] && <Link href={`/writing/${entries[index-1].slug}/`}>← {entries[index-1].title}</Link>}{entries[index+1] && <Link href={`/writing/${entries[index+1].slug}/`}>{entries[index+1].title} →</Link>}</nav>
  </article>;
}
