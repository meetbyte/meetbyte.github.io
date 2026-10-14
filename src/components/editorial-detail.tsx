/**
 * @file Shared sanitized long-form reading shell and ordered adjacent-entry navigation.
 * @author meetbyte
 */
import type { EditorialSection } from "@/constants/editorial";
import { editorialSections } from "@/data/editorial";
import { resolveEditorialRoute } from "@/lib/content/editorial-routes";
import { SiteLink } from "./site-link";
import { EditorialEntryMeta } from "./editorial-entry-meta";
import { ExperienceMap } from "./experience-map";

/** Displays source prose without rewriting it; only the validated adapter supplies HTML. @author meetbyte */
export async function EditorialDetail({
  section,
  slug,
}: {
  section: EditorialSection;
  slug: string;
}) {
  const content = editorialSections[section];
  const { entry, previous, next } = await resolveEditorialRoute(section, slug);
  return (
    <article className="detail-page editorial-essay">
      <SiteLink className="back-link" href={content.route}>
        {content.backLabel}
      </SiteLink>
      <header className="detail-intro">
        <EditorialEntryMeta entry={entry} />
        <h1>{entry.title}</h1>
        <p className="detail-lead">{entry.summary}</p>
      </header>
      {section === "experience" && <ExperienceMap id={entry.id} />}
      {/* HTML is sanitized and validated by the shared build-time Markdown adapter. */}
      <div
        className="article-prose"
        dangerouslySetInnerHTML={{ __html: entry.html }}
      />
      <nav className="essay-navigation" aria-label={content.moreLabel}>
        {previous && (
          <SiteLink href={`${content.route}${previous.slug}/`}>
            ← {previous.title}
          </SiteLink>
        )}
        {next && (
          <SiteLink href={`${content.route}${next.slug}/`}>
            {next.title} →
          </SiteLink>
        )}
      </nav>
    </article>
  );
}
