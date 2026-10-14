/**
 * @file Experience route; shared editorial modules own rendering and publication boundaries.
 * @author meetbyte
 */
import { EditorialIndex } from "@/components/editorial-index";
import { editorialSections } from "@/data/editorial";
import { pageMetadata } from "@/lib/metadata";
const content = editorialSections.experience;
export const metadata = pageMetadata(
  content.label,
  content.description,
  content.route,
  { sample: process.env.NODE_ENV === "development" },
);
/** Keeps this route server-rendered through the shared editorial index. @author meetbyte */
export default function Experience() {
  return <EditorialIndex section="experience" />;
}
