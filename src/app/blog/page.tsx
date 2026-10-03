/**
 * @file Blog route placeholder until articles are published.
 * @author meetbyte
 */
import { SectionPlaceholder } from "@/components/section-placeholder";
import { requirePageEnabled } from "@/lib/require-page-enabled";

/**
 * Renders the shared Blog preview.
 * @returns The Blog page placeholder.
 * @author meetbyte
 */
export default function Blog() {
  requirePageEnabled("blog");
  return <SectionPlaceholder section="blog" />;
}
