/**
 * @file Accessible vertical timeline for verified resume entries.
 * @author meetbyte
 */
import type { TimelineEntry } from "@/data/types";

/**
 * Shows each dated entry or one labeled placeholder when the list is empty.
 * @param entries - Resume entries to display in order.
 * @param empty - Message shown until entries are available.
 * @returns An ordered timeline.
 * @author meetbyte
 */
export function Timeline({ entries, empty }: { entries: readonly TimelineEntry[]; empty: string }) {
  if (entries.length === 0) {
    return (
      <ol className="timeline">
        <li className="timeline-item timeline-placeholder">
          <div className="timeline-node" aria-hidden="true" />
          <div className="timeline-card"><p>{empty}</p></div>
        </li>
      </ol>
    );
  }

  return (
    <ol className="timeline">
      {entries.map((entry) => (
        <li className={`timeline-item${entry.placeholder ? " timeline-placeholder" : ""}`} key={entry.id}>
          <div className="timeline-node" aria-hidden="true" />
          <article className="timeline-card">
            {entry.period && <p className="timeline-period">{entry.period}</p>}
            <h3>{entry.title}</h3>
            {(entry.organization || entry.location) && (
              <p className="timeline-meta">
                {[entry.organization, entry.location].filter(Boolean).join(" · ")}
              </p>
            )}
            {entry.summary && <p className="timeline-summary">{entry.summary}</p>}
            {entry.highlights && entry.highlights.length > 0 && (
              <ul className="timeline-highlights">
                {entry.highlights.map((item) => <li key={item}>{item}</li>)}
              </ul>
            )}
          </article>
        </li>
      ))}
    </ol>
  );
}
