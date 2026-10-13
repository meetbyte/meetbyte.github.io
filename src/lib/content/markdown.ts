/**
 * @file Shared sanitized Markdown renderer for legacy posts and editorial content.
 * @author meetbyte
 */
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import type { Root, Element } from "hast";
import { localImageDimensions } from "./images";

/** Keyboard users can focus and scroll long code examples. @author meetbyte */
function enhanceReading() {
  return (tree: Root) => {
    let previousHeading = 1;
    let tableNumber = 0;
    const visit = (node: Root | Element) => {
      if (node.type === "element" && node.tagName === "pre") node.properties = { ...node.properties, tabIndex: 0, role: "region", ariaLabel: "Code example" };
      if (node.type === "element" && /^h[1-6]$/.test(node.tagName)) {
        const level = Number(node.tagName[1]);
        if (level === 1 || level > previousHeading + 1) throw new Error("use ## for article sections and do not skip heading levels; the page supplies its h1.");
        previousHeading = level;
      }
      if (node.type === "element" && node.tagName === "img") {
        const src = String(node.properties.src ?? "");
        if (!String(node.properties.alt ?? "").trim()) throw new Error("article images need descriptive alternative text.");
        node.properties = { ...node.properties, ...localImageDimensions(src), loading: "lazy", decoding: "async" };
      }
      node.children.forEach((child, index) => {
        if (child.type !== "element") return;
        if (child.tagName === "table") node.children[index] = { type: "element", tagName: "div", properties: { className: ["table-scroll"], tabIndex: 0, role: "region", ariaLabel: `Scrollable table ${++tableNumber}` }, children: [child] };
        visit(child);
      });
    };
    visit(tree);
  };
}
const markdown = unified().use(remarkParse).use(remarkGfm).use(remarkRehype).use(rehypeSanitize).use(enhanceReading).use(rehypeStringify);

/** Drops raw HTML and unsafe URLs, then enforces readable structure and local image dimensions. @author meetbyte */
export async function renderMarkdown(body: string, strictLinks = false): Promise<string> {
  return String(await (strictLinks ? editorialMarkdown : markdown).process(body));
}

/** Checks authored links before sanitation can erase an unsafe destination. @author meetbyte */
function validateEditorialLinks() {
  return (tree: Root) => {
    const visit = (node: Root | Element) => {
      if (node.type === "element" && node.tagName === "a") {
        const href = String(node.properties.href ?? "");
        if (!href.startsWith("#") && !(/^\/(?!\/)/.test(href) && !href.includes(".."))) {
          let valid = false;
          try { valid = new URL(href).protocol === "https:"; } catch { /* Report source-boundary failure below. */ }
          if (!valid) throw new Error("links must use HTTPS, a local absolute path or a fragment.");
        }
      }
      for (const child of node.children) if (child.type === "element") visit(child);
    };
    visit(tree);
  };
}
const editorialMarkdown = unified().use(remarkParse).use(remarkGfm).use(remarkRehype).use(validateEditorialLinks).use(rehypeSanitize).use(enhanceReading).use(rehypeStringify);
