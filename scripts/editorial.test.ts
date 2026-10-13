/**
 * @file Protects owner signoff, exact inventory and safe editorial publishing boundaries.
 * @author meetbyte
 */
import test from "node:test";
import assert from "node:assert/strict";
import { getEditorialLibrary, getPublishedEditorial, parseEditorial, validateEditorialManifest, isPublishedEditorial, selectHomeEditorial } from "../src/lib/content/editorial";

/** Makes editorial fixtures without genuine personal claims. @author meetbyte */
const source = (extra = "", body = "## Section\nAn example paragraph.") => `---\nid: example\ntitle: Example\nslug: example\nsummary: Summary\ncategory: Engineering\nseoDescription: Description\nstatus: review\n${extra}---\n${body}`;

test("source inventory has exactly four experiences/six essays and publishes none", async () => {
  const library = await getEditorialLibrary();
  assert.equal(library.manifest.experienceIds.length, 4);
  assert.equal(library.manifest.writingIds.length, 6);
  assert.deepEqual(await getPublishedEditorial("experience"), []);
  assert.deepEqual(await getPublishedEditorial("writing"), []);
  assert.deepEqual(library.manifest.homeFeaturedWritingIds, []);
});
test("status, deterministic filenames and signoff fail closed", async () => {
  await assert.rejects(parseEditorial(source(), "different.md", "writing"), /filename/);
  await assert.rejects(parseEditorial(source().replace("status: review", "status: public"), "example.md", "writing"), /status/);
  await assert.rejects(parseEditorial(source().replace("status: review", "status: published"), "example.md", "writing"), /approval/);
  await assert.rejects(parseEditorial(source("ownerApproval: Owner-reviewed-fixture\nplaceholder: true\n").replace("status: review", "status: published"), "example.md", "writing"), /placeholders/);
});
test("approved fixture can publish without inventing a date; review cannot", async () => {
  const review = await parseEditorial(source(), "example.md", "writing");
  assert.equal(isPublishedEditorial(review), false);
  const published = await parseEditorial(source("ownerApproval: Owner-reviewed-fixture\n").replace("status: review", "status: published"), "example.md", "writing");
  assert.equal(isPublishedEditorial(published), true);
  assert.equal(published.publishedAt, undefined);
  assert.equal(published.minutes, 1);
});
test("dates, authored reading time and unsafe slugs are rejected", async () => {
  for (const extra of ["publishedAt: '2026-02-30'\n", "updatedAt: '2026-02-30'\n", "readingTime: 3\n"]) await assert.rejects(parseEditorial(source(extra), "example.md", "writing"));
  await assert.rejects(parseEditorial(source("publishedAt: '2026-10-10'\nupdatedAt: '2026-10-09'\n"), "example.md", "writing"), /precede/);
  await assert.rejects(parseEditorial(source().replace("slug: example", "slug: ../secret"), "example.md", "writing"), /hyphenated/);
});
test("shared renderer sanitizes HTML, rejects unsafe links/headings/media, computes reading time", async () => {
  const entry = await parseEditorial(source("", "<script>alert(1)</script>\n\n## Section\n\n**Safe**"), "example.md", "writing");
  assert.doesNotMatch(entry.html, /<script/);
  assert.match(entry.html, /<strong>Safe/);
  for (const body of ["# Duplicate title", "## Section\n#### Skip", "[bad](javascript:alert)", "[bad](http://example.com)", "![Missing](/images/missing.png)"]) await assert.rejects(parseEditorial(source("", body), "example.md", "writing"));
  const long = await parseEditorial(source("", "## Section\n" + "word ".repeat(401)), "example.md", "writing");
  assert.equal(long.minutes, 3);
});
test("manifest rejects duplicate ids/routes, unknown ids, extra inventory and draft Home selections", async () => {
  const { entries, manifest } = await getEditorialLibrary();
  assert.throws(() => validateEditorialManifest({ ...manifest, homeFeaturedWritingIds: [manifest.writingIds[0]] }, entries), /approved and published/);
  assert.throws(() => validateEditorialManifest({ ...manifest, writingIds: [...manifest.writingIds.slice(1), "missing"] }, entries), /missing/);
  assert.throws(() => validateEditorialManifest(manifest, [...entries, entries[0]]), /duplicate/);
  const sameRoute = entries.map((entry, index) => index === 1 ? { ...entry, slug: entries[0].slug } : entry);
  assert.throws(() => validateEditorialManifest(manifest, sameRoute), /duplicate/);
  assert.throws(() => validateEditorialManifest({ ...manifest, writingIds: manifest.writingIds.slice(1) }, entries), /exactly/);
});

test("Home selections keep manifest order and both publication/visibility gates", async () => {
  const { entries, manifest } = await getEditorialLibrary();
  const prepared = entries.map(entry => ({ ...entry, status: "published" as const, ownerApproval: "Owner-reviewed-test-fixture" }));
  const selected = { ...manifest, homeFeaturedExperienceIds: [...manifest.experienceIds].reverse(), homeFeaturedWritingIds: manifest.writingIds.slice(0, 3) };
  assert.deepEqual(selectHomeEditorial(prepared, selected, { experience: false, writing: false }), { experience: [], writing: [] });
  assert.deepEqual(selectHomeEditorial(entries, selected, { experience: true, writing: true }), { experience: [], writing: [] });
  const visible = selectHomeEditorial(prepared, selected, { experience: true, writing: true });
  assert.deepEqual(visible.experience.map(entry => entry.id), selected.homeFeaturedExperienceIds);
  assert.equal(visible.writing.length, 3);
  prepared[0].placeholder = true;
  assert.equal(selectHomeEditorial(prepared, selected, { experience: true, writing: true }).experience.some(entry => entry.id === prepared[0].id), false);
});
