/**
 * @file Shared article metadata; optional dates are shown only when genuinely authored.
 * @author meetbyte
 */
import { editorialLabels } from "@/data/editorial";
import type { EditorialEntry } from "@/lib/content/editorial";
import { formatContentDate } from "@/lib/content/dates";

/** Keeps indexes and detail pages consistent without manufacturing publication dates. @author meetbyte */
export function EditorialEntryMeta({ entry }: { entry: EditorialEntry }) {
  return (
    <p className="writing-meta">
      <span>{entry.category}</span>
      <span>
        {entry.minutes} {editorialLabels.readingTime}
      </span>
      {entry.publishedAt && (
        <time dateTime={entry.publishedAt}>
          {formatContentDate(entry.publishedAt)}
        </time>
      )}
      {entry.status !== "published" && <span>{editorialLabels.draft}</span>}
    </p>
  );
}
