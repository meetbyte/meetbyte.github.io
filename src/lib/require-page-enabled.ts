/**
 * @file Server-side guard for disabled page URLs.
 * @author meetbyte
 */
import { notFound } from "next/navigation";
import type { PageKey } from "@/constants/page-visibility";
import { isPageEnabled } from "./page-visibility";

/**
 * Stops rendering a disabled page and shows the 404 page.
 * @param page - Route key to check before rendering.
 * @author meetbyte
 */
export function requirePageEnabled(page: PageKey): void {
  if (!isPageEnabled(page)) notFound();
}
