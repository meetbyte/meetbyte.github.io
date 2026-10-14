/**
 * @file Build-time Markdown adapter. No filesystem or parser code reaches the browser.
 * @author meetbyte
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { cache } from "react";
import { parse } from "yaml";
import type { BlogPost } from "@/data/types";
import { slugPattern } from "./projects";
import { validateImage } from "./images";
import { editorialConfig } from "@/constants/editorial";
import { isValidContentDate } from "./dates";
import { renderMarkdown } from "./markdown";

/** Validate frontmatter at build time; report its source filename to the author. @author meetbyte */
export async function parsePost(
  source: string,
  filename: string,
): Promise<BlogPost | undefined> {
  const fail = (message: string): never => {
    throw new Error(`Blog ${filename}: ${message}`);
  };
  const match = source
    .replace(/^\uFEFF/, "")
    .match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)([\s\S]*)$/);
  if (!match) return fail("add YAML frontmatter between --- lines.");
  let meta: Record<string, unknown>;
  try {
    const value: unknown = parse(match[1], { maxAliasCount: 20 });
    if (!value || typeof value !== "object" || Array.isArray(value))
      return fail("frontmatter must be an object.");
    meta = value as Record<string, unknown>;
  } catch (error) {
    return fail(
      `invalid YAML (${error instanceof Error ? error.message : "parse error"}).`,
    );
  }
  if (meta.published !== true && meta.published !== false)
    return fail("published must be true or false.");
  // Drafts can be incomplete, and never appear in routes, listings or sitemaps.
  if (!meta.published) return undefined;
  for (const key of ["title", "slug", "date", "excerpt"]) {
    if (typeof meta[key] !== "string" || !(meta[key] as string).trim())
      return fail(`${key} is required and must be a nonempty string.`);
  }
  const slug = meta.slug as string;
  if (!slugPattern.test(slug))
    return fail("slug must use lowercase words separated by hyphens.");
  const date = meta.date as string;
  if (!isValidContentDate(date))
    return fail("date must be a real YYYY-MM-DD date.");
  if (
    !Array.isArray(meta.tags) ||
    meta.tags.some((tag) => typeof tag !== "string" || !tag.trim())
  )
    return fail("tags must be an array of nonempty strings (or []).");
  if (meta.placeholder !== undefined && typeof meta.placeholder !== "boolean")
    return fail("placeholder must be a boolean.");
  let cover: BlogPost["cover"];
  if (meta.cover !== undefined) {
    if (
      typeof meta.cover !== "string" ||
      !/^\/images\/[\w./-]+$/.test(meta.cover) ||
      meta.cover.includes("..")
    )
      return fail("cover must be a path under /images/.");
    if (typeof meta.coverAlt !== "string" || !meta.coverAlt.trim())
      return fail("coverAlt is required when cover is supplied.");
    if (
      typeof meta.coverWidth !== "number" ||
      typeof meta.coverHeight !== "number" ||
      meta.coverWidth <= 0 ||
      meta.coverHeight <= 0
    )
      return fail("coverWidth and coverHeight must be positive dimensions.");
    if (!existsSync(path.join(process.cwd(), "public", meta.cover)))
      return fail("cover image does not exist under public/.");
    cover = {
      src: meta.cover,
      alt: meta.coverAlt,
      width: meta.coverWidth,
      height: meta.coverHeight,
    };
    try {
      validateImage(cover);
    } catch (error) {
      return fail(
        error instanceof Error ? error.message : "invalid cover image",
      );
    }
  }
  if (!match[2].trim())
    return fail("published articles need Markdown body content.");
  // Raw HTML is dropped; sanitization also removes unsafe URLs and attributes.
  let html: string;
  try {
    html = await renderMarkdown(match[2]);
  } catch (error) {
    return fail(
      error instanceof Error ? error.message : "invalid article content",
    );
  }
  return {
    slug,
    date,
    title: meta.title as string,
    excerpt: meta.excerpt as string,
    tags: meta.tags as string[],
    published: true,
    placeholder: meta.placeholder === true,
    minutes: Math.max(
      1,
      Math.ceil(match[2].split(/\s+/).length / editorialConfig.wordsPerMinute),
    ),
    html,
    cover,
  };
}

/**
 * Caches build-time Markdown loading, rejects duplicate published slugs and orders normalized articles newest first.
 * @author meetbyte
 */
export const getPosts = cache(async (): Promise<readonly BlogPost[]> => {
  const directory = path.join(process.cwd(), "content", "blog");
  if (!existsSync(directory)) return [];
  const files = readdirSync(directory)
    .filter((file) => file.endsWith(".md"))
    .sort();
  const entries = await Promise.all(
    files.map((file) =>
      parsePost(readFileSync(path.join(directory, file), "utf8"), file),
    ),
  );
  const posts = entries.filter((post): post is BlogPost => Boolean(post));
  const slugs = new Set<string>();
  for (const post of posts) {
    if (slugs.has(post.slug))
      throw new Error(`Duplicate blog slug: ${post.slug}`);
    slugs.add(post.slug);
  }
  return posts.sort((a, b) => b.date.localeCompare(a.date));
});

/**
 * Finds one published normalized article by slug, returning undefined for absent or draft content.
 * @author meetbyte
 */
export async function getPost(slug: string): Promise<BlogPost | undefined> {
  return (await getPosts()).find((post) => post.slug === slug);
}

// Preserve the legacy public export while sharing the date implementation with new editorial pages.
export { formatContentDate as formatPostDate } from "./dates";
