/**
 * @file Text-led experience index with local draft previews and production publication gating.
 * @author meetbyte
 */
import { EditorialArtwork } from "@/components/editorial-artwork";
import { SiteLink as Link } from "@/components/site-link";
import { getExperienceEntries } from "@/lib/content/editorial";
import { pageMetadata } from "@/lib/metadata";
import { requirePageEnabled } from "@/lib/require-page-enabled";
import { formatPostDate } from "@/lib/content/posts";
export const metadata = pageMetadata("Experience", "Notes on engineering, decisions and thinking slowly.", "/experience/", { sample: process.env.NODE_ENV === "development" });
/** Presents original prose without fictional dates or empty card grids. @author meetbyte */
export default async function Experience() {
  requirePageEnabled("experience");
  const entries = await getExperienceEntries();
  return <div className="detail-page experience-index">
    <header className="detail-intro editorial-index-heading"><div><p className="eyebrow">EXPERIENCE</p><h1>The work behind the perspective.</h1><p className="detail-lead">Problems, decisions and lessons from enterprise engineering.</p></div><EditorialArtwork variant="experience" /></header>
    <div className="writing-list">{entries.map(entry => <article key={entry.id}>
      <p className="writing-meta"><span>{entry.category}</span><span>{entry.minutes} min read</span>{entry.publishedAt && <time dateTime={entry.publishedAt}>{formatPostDate(entry.publishedAt)}</time>}{entry.status !== "published" && <span>Draft</span>}</p>
      <h2><Link href={`/experience/${entry.slug}/`}>{entry.title}</Link></h2><p>{entry.summary}</p>
    </article>)}</div>
  </div>;
}
