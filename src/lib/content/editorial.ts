/**
 * @file Build-time editorial inventory; only approved genuine published entries reach page models.
 * @author meetbyte
 */
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { cache } from "react";
import { parse } from "yaml";
import { renderMarkdown } from "./markdown";
import { validateImage } from "./images";

import {
  editorialConfig,
  type EditorialKind,
  type EditorialSection,
} from "@/constants/editorial";
import { isValidContentDate } from "./dates";
export type { EditorialKind } from "@/constants/editorial";
export type EditorialEntry = {
  id: string;
  kind: EditorialKind;
  title: string;
  slug: string;
  summary: string;
  category: string;
  seoDescription: string;
  status: "draft" | "review" | "published";
  placeholder: boolean;
  ownerApproval?: string;
  publishedAt?: string;
  updatedAt?: string;
  tags: string[];
  minutes: number;
  html: string;
  cover?: { src: string; alt: string; width: number; height: number };
};
export type EditorialManifest = {
  schemaVersion: 1;
  experienceIds: string[];
  writingIds: string[];
  homeFeaturedExperienceIds: string[];
  homeFeaturedWritingIds: string[];
};
const identifier = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** Validates draft inventory as well as published content; retains no raw source in UI models. @author meetbyte */
export async function parseEditorial(
  source: string,
  filename: string,
  kind: EditorialKind,
): Promise<EditorialEntry> {
  const fail = (message: string): never => {
    throw new Error(`Editorial ${filename}: ${message}`);
  };
  const match = source
    .replace(/^\uFEFF/, "")
    .match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)([\s\S]*)$/);
  if (!match) return fail("YAML frontmatter is required.");
  let meta: Record<string, unknown>;
  try {
    const parsed: unknown = parse(match[1], { maxAliasCount: 20 });
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed))
      return fail("frontmatter must be an object.");
    meta = parsed as Record<string, unknown>;
  } catch (error) {
    return fail(
      `invalid YAML: ${error instanceof Error ? error.message : "parse error"}`,
    );
  }
  for (const key of [
    "id",
    "title",
    "slug",
    "summary",
    "category",
    "seoDescription",
  ]) {
    if (typeof meta[key] !== "string" || !meta[key].trim())
      return fail(`${key} must be a nonempty string.`);
  }
  const id = meta.id as string,
    slug = meta.slug as string;
  if (!identifier.test(id) || !identifier.test(slug))
    return fail("id and slug must use lowercase hyphenated words.");
  if (filename !== `${id}.md`) return fail("filename must equal id.md.");
  if (!editorialConfig.statuses.some((status) => status === meta.status))
    return fail("status must be draft, review or published.");
  if (meta.placeholder !== undefined && typeof meta.placeholder !== "boolean")
    return fail("placeholder must be boolean.");
  if (
    meta.ownerApproval !== undefined &&
    (typeof meta.ownerApproval !== "string" || !meta.ownerApproval.trim())
  )
    return fail("ownerApproval must reference recorded owner signoff.");
  for (const key of ["publishedAt", "updatedAt"])
    if (meta[key] !== undefined && !isValidContentDate(meta[key]))
      return fail(`${key} must be a real YYYY-MM-DD date.`);
  if (
    meta.publishedAt &&
    meta.updatedAt &&
    String(meta.updatedAt) < String(meta.publishedAt)
  )
    return fail("updatedAt cannot precede publishedAt.");
  if (meta.readingTime !== undefined || meta.minutes !== undefined)
    return fail("reading time is computed, never authored.");
  if (
    meta.tags !== undefined &&
    (!Array.isArray(meta.tags) ||
      meta.tags.some((t) => typeof t !== "string" || !t.trim()))
  )
    return fail("tags must be nonempty strings.");
  if (
    meta.status === "published" &&
    (meta.placeholder === true || !meta.ownerApproval || !match[2].trim())
  )
    return fail(
      "published content needs genuine body copy and recorded owner approval; placeholders cannot publish.",
    );
  let cover: EditorialEntry["cover"];
  if (meta.cover !== undefined) {
    if (
      !meta.cover ||
      typeof meta.cover !== "object" ||
      Array.isArray(meta.cover)
    )
      return fail("cover must contain src, alt, width and height.");
    const candidate = meta.cover as Record<string, unknown>;
    if (
      typeof candidate.src !== "string" ||
      typeof candidate.alt !== "string" ||
      typeof candidate.width !== "number" ||
      typeof candidate.height !== "number"
    )
      return fail("cover must contain src, alt, width and height.");
    cover = {
      src: candidate.src,
      alt: candidate.alt,
      width: candidate.width,
      height: candidate.height,
    };
    try {
      validateImage(cover);
    } catch (error) {
      return fail(error instanceof Error ? error.message : "invalid image");
    }
  }
  let html: string;
  try {
    html = await renderMarkdown(match[2], true);
  } catch (error) {
    return fail(error instanceof Error ? error.message : "invalid Markdown");
  }
  if (meta.status === "published" && !html.replace(/<[^>]*>/g, "").trim())
    return fail(
      "published content needs visible body copy after sanitization.",
    );
  return {
    id,
    kind,
    slug,
    title: meta.title as string,
    summary: meta.summary as string,
    category: meta.category as string,
    seoDescription: meta.seoDescription as string,
    status: meta.status as EditorialEntry["status"],
    placeholder: meta.placeholder === true,
    ownerApproval: meta.ownerApproval as string | undefined,
    publishedAt: meta.publishedAt as string | undefined,
    updatedAt: meta.updatedAt as string | undefined,
    tags: (meta.tags as string[]) ?? [],
    cover,
    minutes: Math.max(
      1,
      Math.ceil(
        match[2].trim().split(/\s+/).filter(Boolean).length /
          editorialConfig.wordsPerMinute,
      ),
    ),
    html,
  };
}

/** Fails closed on inventory drift, duplicate routes, missing references and unpublished Home selections. @author meetbyte */
export function validateEditorialManifest(
  value: unknown,
  entries: readonly EditorialEntry[],
): EditorialManifest {
  const fail = (message: string): never => {
    throw new Error(`Editorial manifest: ${message}`);
  };
  if (!value || typeof value !== "object" || Array.isArray(value))
    return fail("must be an object.");
  const meta = value as Record<string, unknown>;
  if (meta.schemaVersion !== editorialConfig.schemaVersion)
    return fail("schemaVersion must be 1.");
  for (const key of [
    "experienceIds",
    "writingIds",
    "homeFeaturedExperienceIds",
    "homeFeaturedWritingIds",
  ]) {
    const list = meta[key];
    if (
      !Array.isArray(list) ||
      list.some((id) => typeof id !== "string" || !identifier.test(id)) ||
      new Set(list).size !== list.length
    )
      return fail(`${key} must contain unique ids.`);
  }
  const manifest = meta as unknown as EditorialManifest;
  if (
    manifest.experienceIds.length !== editorialConfig.entryCounts.experience ||
    manifest.writingIds.length !== editorialConfig.entryCounts.writing
  )
    return fail(
      "inventory must contain exactly four experiences and six essays.",
    );
  if (manifest.homeFeaturedWritingIds.length > editorialConfig.maxHomeWriting)
    return fail("Home allows at most three writing entries.");
  const ids = new Map<string, EditorialEntry>(),
    routes = new Set<string>();
  for (const entry of entries) {
    const route = `${entry.kind}/${entry.slug}`;
    if (ids.has(entry.id) || routes.has(route))
      return fail(`duplicate id or route: ${entry.id}.`);
    ids.set(entry.id, entry);
    routes.add(route);
  }
  for (const kind of ["experience", "writing"] as const) {
    const inventory =
      manifest[kind === "experience" ? "experienceIds" : "writingIds"];
    if (entries.filter((e) => e.kind === kind).length !== inventory.length)
      return fail(`${kind} source count differs from inventory.`);
    for (const id of inventory)
      if (ids.get(id)?.kind !== kind)
        return fail(`missing or wrong-kind entry: ${id}.`);
    const featured =
      manifest[
        kind === "experience"
          ? "homeFeaturedExperienceIds"
          : "homeFeaturedWritingIds"
      ];
    for (const id of featured)
      if (!inventory.includes(id) || !isPublishedEditorial(ids.get(id)!))
        return fail(`Home selection must be approved and published: ${id}.`);
  }
  return manifest;
}

/** All public lists, routes and metadata must use this gate rather than the full editorial inventory. @author meetbyte */
export function isPublishedEditorial(entry: EditorialEntry): boolean {
  return (
    entry.status === "published" &&
    !entry.placeholder &&
    Boolean(entry.ownerApproval?.trim())
  );
}

/** Loads deterministic filenames at build time; React caching avoids repeated parsing across static pages. @author meetbyte */
export const getEditorialLibrary = cache(async () => {
  const root = path.join(process.cwd(), "content");
  const entries: EditorialEntry[] = [];
  for (const kind of ["experience", "writing", "site"] as const) {
    const directory = path.join(root, kind);
    for (const filename of readdirSync(directory)
      .filter((f) => f.endsWith(".md"))
      .sort()) {
      entries.push(
        await parseEditorial(
          readFileSync(path.join(directory, filename), "utf8"),
          filename,
          kind,
        ),
      );
    }
  }
  const manifest = validateEditorialManifest(
    JSON.parse(readFileSync(path.join(root, "manifest.json"), "utf8")),
    entries,
  );
  return { entries, manifest };
});

/** Supplies genuine approved published entries without draft/review metadata or raw source. @author meetbyte */
export async function getPublishedEditorial(
  kind: EditorialKind,
): Promise<EditorialEntry[]> {
  return (await getEditorialLibrary()).entries.filter(
    (entry) => entry.kind === kind && isPublishedEditorial(entry),
  );
}

/** Local authoring previews include drafts; production remains approved-published-only. @author meetbyte */
export function selectWritingEntries(
  entries: readonly EditorialEntry[],
  preview: boolean,
): EditorialEntry[] {
  return entries.filter(
    (entry) =>
      entry.kind === "writing" &&
      !entry.placeholder &&
      (preview || isPublishedEditorial(entry)),
  );
}

/** Both sections share inventory ordering and production gates; drafts are local-development-only. @author meetbyte */
export async function getSectionEntries(
  section: EditorialSection,
): Promise<EditorialEntry[]> {
  const { entries, manifest } = await getEditorialLibrary();
  const preview = process.env.NODE_ENV === "development";
  const visible = entries.filter(
    (entry) =>
      entry.kind === section &&
      !entry.placeholder &&
      (preview || isPublishedEditorial(entry)),
  );
  const orderedIds =
    section === "writing" ? manifest.writingIds : manifest.experienceIds;
  return orderedIds
    .map((id) => visible.find((entry) => entry.id === id))
    .filter((entry): entry is EditorialEntry => Boolean(entry));
}
/** Preserves the focused writing adapter for existing callers. @author meetbyte */
export function getWritingEntries(): Promise<EditorialEntry[]> {
  return getSectionEntries("writing");
}
/** Preserves the focused experience adapter for existing callers. @author meetbyte */
export function getExperienceEntries(): Promise<EditorialEntry[]> {
  return getSectionEntries("experience");
}

/** Keeps ordered Home selections behind both publication and section-visibility gates. @author meetbyte */
export function selectHomeEditorial(
  entries: readonly EditorialEntry[],
  manifest: EditorialManifest,
  visible: { experience: boolean; writing: boolean },
) {
  const select = (kind: "experience" | "writing", ids: string[]) =>
    visible[kind]
      ? ids
          .map((id) =>
            entries.find(
              (entry) =>
                entry.id === id &&
                entry.kind === kind &&
                isPublishedEditorial(entry),
            ),
          )
          .filter((entry): entry is EditorialEntry => Boolean(entry))
      : [];
  return {
    experience: select("experience", manifest.homeFeaturedExperienceIds),
    writing: select("writing", manifest.homeFeaturedWritingIds).slice(
      0,
      editorialConfig.maxHomeWriting,
    ),
  };
}
