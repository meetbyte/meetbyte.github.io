/**
 * @file Reliability regressions: no network dependency for first paint or generated 404s.
 * @author meetbyte
 */
import test from "node:test";
import assert from "node:assert/strict";
import { runInNewContext } from "node:vm";
import { mkdtempSync, mkdirSync, writeFileSync, existsSync, rmSync } from "node:fs";
import path from "node:path";
import os from "node:os";
import { isLimitedConnection, createConnectionBootstrapScript } from "../src/lib/connection";
import { finalizeExport } from "../src/lib/finalize-export";

test("network hints are optional and data saver, poor links and offline visits use a lighter mode", () => {
  assert.equal(isLimitedConnection(true), false);
  for (const hints of [{ saveData: true }, { effectiveType: "2g" }, { effectiveType: "3g" }, { downlink: .4 }, { rtt: 700 }]) assert.equal(isLimitedConnection(true, hints), true);
  assert.equal(isLimitedConnection(false, { effectiveType: "4g" }), true);
  assert.equal(isLimitedConnection(true, { effectiveType: "4g", downlink: 0, rtt: 0 }), false);
});
test("pre-paint connection handling respects a visit-only artwork choice and blocked storage", () => {
  for (const full of [null, "full"]) {
    const dataset: Record<string, string> = {};
    runInNewContext(createConnectionBootstrapScript(), { navigator: { onLine: true, connection: { saveData: true } }, sessionStorage: { getItem: () => full }, document: { documentElement: { dataset } } });
    assert.equal(dataset.connection, "limited"); assert.equal(dataset.scenery, full ? "full" : "light");
  }
  const dataset: Record<string, string> = {};
  runInNewContext(createConnectionBootstrapScript(), { navigator: { onLine: false }, get sessionStorage() { throw new Error("blocked"); }, document: { documentElement: { dataset } } });
  assert.equal(dataset.scenery, "light");
});
test("static export removes only hidden route folders and the reserved fake slug", () => {
  const root = mkdtempSync(path.join(os.tmpdir(), "meetbyte-export-"));
  try {
    writeFileSync(path.join(root, "404.html"), "404");
    for (const dir of ["blog", "projects/_unpublished", "projects/real-case", "resume"]) mkdirSync(path.join(root, dir), { recursive: true });
    finalizeExport(root, ["blog"]);
    assert.equal(existsSync(path.join(root, "blog")), false);
    assert.equal(existsSync(path.join(root, "projects/_unpublished")), false);
    assert.equal(existsSync(path.join(root, "projects/real-case")), true);
    assert.equal(existsSync(path.join(root, "resume")), true);
    assert.equal(existsSync(path.join(root, "404.html")), true);
    assert.throws(() => finalizeExport(root, ["resume", "../outside"]), /Unsafe/);
    assert.equal(existsSync(path.join(root, "resume")), true);
  } finally { rmSync(root, { recursive: true }); }
});
