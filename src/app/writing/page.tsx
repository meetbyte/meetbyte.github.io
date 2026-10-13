/**
 * @file Text-led writing index with local draft previews and production publication gating.
 * @author meetbyte
 */
import { SiteLink as Link } from "@/components/site-link";
import { getWritingEntries } from "@/lib/content/editorial";
import { pageMetadata } from "@/lib/metadata";
import { requirePageEnabled } from "@/lib/require-page-enabled";
import { formatPostDate } from "@/lib/content/posts";
export const metadata = pageMetadata("Writing", "Notes on engineering, decisions and thinking slowly.", "/writing/", { sample: process.env.NODE_ENV === "development" });
/** Presents original prose without fictional dates or empty card grids. @author meetbyte */
export default async function Writing() {
  requirePageEnabled("writing");
  const entries = await getWritingEntries();
  return <div className="detail-page writing-index">
    <header className="detail-intro"><p className="eyebrow">WRITING</p><h1>Ideas worth thinking through.</h1><p className="detail-lead">Engineering, judgment and the questions that stay with me beyond the code.</p></header>
    <div className="writing-list">{entries.map(entry => <article key={entry.id}>
      <p className="writing-meta"><span>{entry.category}</span><span>{entry.minutes} min read</span>{entry.publishedAt && <time dateTime={entry.publishedAt}>{formatPostDate(entry.publishedAt)}</time>}{entry.status !== "published" && <span>Draft</span>}</p>
      <h2><Link href={`/writing/${entry.slug}/`}>{entry.title}</Link></h2><p>{entry.summary}</p>
    </article>)}</div>
  </div>;
}
