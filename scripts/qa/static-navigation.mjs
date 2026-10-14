/** @file Check static navigation against an HTML-only host, without an RSC rewrite. @author meetbyte */
import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import assert from "node:assert/strict";
import { runInNewContext } from "node:vm";

const root = path.resolve("out");
const htmlFiles = [];
/** Collects exported pages without including dependency bundles. @author meetbyte */
function collect(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) collect(file);
    else if (entry.name === "index.html") htmlFiles.push(file);
  }
}
collect(root);
const targets = new Set();
for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  for (const match of html.matchAll(/<a\b[^>]*href="(\/[^"#?]*)/g))
    if (!match[1].startsWith("//")) targets.add(match[1]);
}
const server = http.createServer((req, res) => {
  let file = path.join(root, new URL(req.url, "http://localhost").pathname);
  if (!file.startsWith(root + path.sep) && file !== root) {
    res.writeHead(403);
    return res.end();
  }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory())
    file = path.join(file, "index.html");
  if (!fs.existsSync(file)) {
    res.writeHead(404);
    return res.end();
  }
  res.setHeader(
    "content-type",
    file.endsWith(".html") ? "text/html" : "application/octet-stream",
  );
  res.end(fs.readFileSync(file));
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
try {
  const origin = `http://127.0.0.1:${server.address().port}`;
  for (const target of targets)
    assert.equal((await fetch(origin + target)).status, 200, target);
  // GitHub Pages cannot negotiate an RSC representation at a directory URL.
  const plain = await fetch(origin + "/about/", { headers: { RSC: "1" } });
  assert.ok((await plain.text()).startsWith("<!DOCTYPE html>"));
  const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
  const bootstrap = [
    ...html
      .split("</head>")[0]
      .matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g),
  ]
    .map((match) => match[1])
    .find((source) => source.includes("dataset.theme"));
  assert.ok(bootstrap, "head bootstrap exists");
  for (const explicitDark of [false, true]) {
    const dataset = {};
    class NightDate extends Date {
      getHours() {
        return 23;
      }
    }
    const context = {
      Date: NightDate,
      location: { pathname: "/" },
      navigator: { onLine: true },
      matchMedia: () => ({ matches: true }),
      document: {
        documentElement: { dataset },
        createElement: () => ({}),
        head: { appendChild: () => {} },
      },
      localStorage: { getItem: () => (explicitDark ? "dark" : null) },
      sessionStorage: { getItem: () => (explicitDark ? "dark" : null) },
    };
    runInNewContext(bootstrap, context);
    assert.equal(
      dataset.theme,
      explicitDark ? "dark" : "light",
      "light default even at night with dark OS",
    );
  }
  console.log(
    `PASS: ${targets.size} native anchor targets, HTML-only host and prepaint light/manual-dark defaults`,
  );
} finally {
  await new Promise((resolve) => server.close(resolve));
}
