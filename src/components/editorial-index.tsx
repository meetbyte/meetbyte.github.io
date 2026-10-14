/**
 * @file Shared server-rendered editorial index; data loading retains publication gates.
 * @author meetbyte
 */
import type { EditorialSection } from "@/constants/editorial";
import { editorialSections } from "@/data/editorial";
import { getSectionEntries } from "@/lib/content/editorial";
import { requirePageEnabled } from "@/lib/require-page-enabled";
import { pageEyebrow } from "@/lib/page-label";
import { SiteLink } from "./site-link";
import { EditorialEntryMeta } from "./editorial-entry-meta";

/** Renders approved source summaries through one accessible heading/list structure. @author meetbyte */
export async function EditorialIndex({
  section,
}: {
  section: EditorialSection;
}) {
  requirePageEnabled(section);
  const content = editorialSections[section];
  const entries = await getSectionEntries(section);
  return (
    <div className={`detail-page ${content.className}`}>
      <header className="detail-intro editorial-index-heading">
        <div>
          <p className="eyebrow">
            {pageEyebrow(content.route, content.eyebrow)}
          </p>
          <h1>{content.title}</h1>
          <p className="detail-lead">{content.introduction}</p>
        </div>
      </header>
      <div className="writing-list">
        {entries.map((entry) => (
          <article key={entry.id}>
            <EditorialEntryMeta entry={entry} />
            <h2>
              <SiteLink href={`${content.route}${entry.slug}/`}>
                {entry.title}
              </SiteLink>
            </h2>
            <p>{entry.summary}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
