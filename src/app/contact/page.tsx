/**
 * @file Contact route placeholder until contact details are ready.
 * @author meetbyte
 */
import { SectionPlaceholder } from "@/components/section-placeholder";
import { requirePageEnabled } from "@/lib/require-page-enabled";

/**
 * Renders the shared Contact preview.
 * @returns The Contact page placeholder.
 * @author meetbyte
 */
export default function Contact() {
  requirePageEnabled("contact");
  return <SectionPlaceholder section="contact" />;
}
