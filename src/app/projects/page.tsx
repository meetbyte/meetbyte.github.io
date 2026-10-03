/**
 * @file Projects route placeholder until case studies are ready.
 * @author meetbyte
 */
import { SectionPlaceholder } from "@/components/section-placeholder";
import { requirePageEnabled } from "@/lib/require-page-enabled";

/**
 * Renders the shared Projects preview.
 * @returns The Projects page placeholder.
 * @author meetbyte
 */
export default function Projects() {
  requirePageEnabled("projects");
  return <SectionPlaceholder section="projects" />;
}
