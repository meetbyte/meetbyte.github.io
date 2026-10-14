/**
 * @file Shared editorial inventory and reading settings; these values do not authorize publication.
 * @author meetbyte
 */
export type EditorialSection = "experience" | "writing";
export type EditorialKind = EditorialSection | "site";
export const editorialConfig = {
  schemaVersion: 1,
  entryCounts: { experience: 4, writing: 6 },
  maxHomeWriting: 3,
  wordsPerMinute: 200,
  reservedSlug: "_unpublished",
  statuses: ["draft", "review", "published"],
} as const;
