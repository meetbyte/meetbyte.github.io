/**
 * @file Content-boundary tests protect static publishing behavior.
 * @author meetbyte
 */
import test from "node:test";
import assert from "node:assert/strict";
import { parsePost, getPosts } from "../src/lib/content/posts";
import { validateProjects, getProjects } from "../src/lib/content/projects";
import { pageMetadata } from "../src/lib/metadata";
import sitemap from "../src/app/sitemap";

/**
 * Creates a minimal published Markdown fixture with optional frontmatter/body variations for validation cases.
 * @author meetbyte
 */
const source = (extra = "", body = "## An idea\nA paragraph.") => `---\ntitle: "A note"\nslug: "a-note"\ndate: "2026-10-07"\nexcerpt: "An example."\ntags: [Engineering]\npublished: true\n${extra}---\n${body}`;

test("a new Markdown article is normalized without UI changes", async () => {
  const post = await parsePost(source(), "new-note.md");
  assert.equal(post?.slug, "a-note");
  assert.match(post!.html, /<h2>An idea<\/h2>/);
  assert.equal(post?.minutes, 1);
});
test("unpublished drafts can be incomplete and never produce a post", async () => {
  assert.equal(await parsePost("---\npublished: false\n---\n", "draft.md"), undefined);
});
test("missing or invalid metadata fails with the authoring filename", async () => {
  await assert.rejects(parsePost("No frontmatter", "bad.md"), /Blog bad.md: add YAML/);
  await assert.rejects(parsePost(source().replace('slug: "a-note"', 'slug: "..\/secret"'), "bad-slug.md"), /slug must/);
  await assert.rejects(parsePost(source().replace('2026-10-07', '2026-02-30'), "bad-date.md"), /date must/);
  await assert.rejects(parsePost(source().replace('title: "A note"', 'title: ""'), "bad-title.md"), /title is required/);
  await assert.rejects(parsePost(source('cover: "/images/missing.png"\n'), "cover.md"), /coverAlt is required/);
});
test("Markdown strips scripts, raw HTML and unsafe links", async () => {
  const post = await parsePost(source("", '<script>alert(1)</script>\n\n[bad](javascript:alert)\n\n**safe**'), "safe.md");
  assert.doesNotMatch(post!.html, /<script|javascript:/);
  assert.match(post!.html, /<strong>safe<\/strong>/);
});
test("project schema supports minimal cases and rejects duplicate routes", () => {
  const minimal = { slug: "new-project", title: "New project", summary: "Short", overview: "Context", stack: [] };
  assert.equal(validateProjects([minimal]).length, 1);
  assert.throws(() => validateProjects([minimal, minimal]), /duplicate project slug/);
  assert.throws(() => validateProjects([{ ...minimal, github: "javascript:alert(1)" }]), /HTTPS/);
});
test("samples have noindex and stay out of sitemap", async () => {
  assert.deepEqual(pageMetadata("Sample", "Example", "/example/", { sample: true }).robots, { index: false, follow: true });
  assert.deepEqual(pageMetadata("Real", "Context", "/real/").robots, { index: true, follow: true });
  assert.equal((await parsePost(source("placeholder: true\n"), "sample.md"))?.placeholder, true);
  const entries = await sitemap();
  for (const project of getProjects()) assert.equal(entries.some((entry) => entry.url.endsWith(`/projects/${project.slug}/`)), !project.placeholder);
  for (const post of await getPosts()) assert.equal(entries.some((entry) => entry.url.endsWith(`/blog/${post.slug}/`)), !post.placeholder);
});

test("long-form content preserves heading hierarchy, keyboard scrolling and image dimensions", async () => {
  await assert.rejects(parsePost(source("", "# Duplicate title"), "headings.md"), /page supplies its h1/);
  await assert.rejects(parsePost(source("", "## Section\n#### Skipped level"), "headings.md"), /do not skip/);
  const post = await parsePost(source("", "## Example\n\n```txt\nA long code line\n```\n\n| A | B |\n| --- | --- |\n| a | b |\n\n![A note flow](/images/note-flow.svg)"), "reading.md");
  assert.match(post!.html, /<pre[^>]*tabindex="0"[^>]*role="region"/);
  assert.match(post!.html, /class="table-scroll"[^>]*tabindex="0"/);
  assert.match(post!.html, /width="740" height="230" loading="lazy" decoding="async"/);
  await assert.rejects(parsePost(source("", "![Missing](/images/missing.png)"), "missing.md"), /image does not exist/);
});
test("case-study media and external URLs fail early when malformed", () => {
  const project = { slug: "image-case", title: "Case", summary: "Short", overview: "Context", stack: [] };
  assert.throws(() => validateProjects([{ ...project, github: "https://" }]), /valid URL/);
  assert.throws(() => validateProjects([{ ...project, cover: { src: "/images/note-flow.svg", alt: "", width: 740, height: 230 } }]), /alt text/);
  assert.throws(() => validateProjects([{ ...project, cover: { src: "/images/note-flow.svg", alt: "Diagram", width: 10, height: 100 } }]), /aspect ratio/);
});
