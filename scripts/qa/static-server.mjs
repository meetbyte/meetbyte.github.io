/**
 * @file Local static-export server with real 404s and Next.js exported RSC responses.
 * @author meetbyte
 */
import fs from "node:fs";
import path from "node:path";
import http from "node:http";
const mime = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".woff2": "font/woff2",
  ".png": "image/png",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".pdf": "application/pdf",
  ".xml": "application/xml",
  ".txt": "text/x-component",
};
/** Serves only the generated output, preserving direct and client navigation behavior. @author meetbyte */
export async function startStaticServer(port = 4173) {
  const root = path.resolve("out");
  const server = http.createServer((req, res) => {
    let file;
    try {
      file = path.join(
        root,
        decodeURIComponent(new URL(req.url, "http://local").pathname),
      );
    } catch {
      res.writeHead(400);
      return res.end();
    }
    if (!file.startsWith(root + path.sep) && file !== root) {
      res.writeHead(403);
      return res.end();
    }
    if (fs.existsSync(file) && fs.statSync(file).isDirectory())
      file = path.join(
        file,
        req.headers.rsc === "1" ? "index.txt" : "index.html",
      );
    if (!fs.existsSync(file)) {
      res.writeHead(404, { "content-type": "text/html" });
      return res.end(fs.readFileSync(path.join(root, "404.html")));
    }
    res.setHeader(
      "content-type",
      mime[path.extname(file)] || "application/octet-stream",
    );
    res.end(fs.readFileSync(file));
  });
  await new Promise((resolve) => server.listen(port, "127.0.0.1", resolve));
  return server;
}
