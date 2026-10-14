/**
 * @file Static experience entry route; shared resolvers enforce current publication gates.
 * @author meetbyte
 */
import { EditorialDetail } from "@/components/editorial-detail";
import {
  getEditorialStaticParams,
  getEditorialPageMetadata,
  type EditorialPageProps,
} from "@/lib/content/editorial-routes";
export const dynamicParams = false;
/** Includes the reserved not-found fallback when the static inventory is empty. @author meetbyte */
export function generateStaticParams() {
  return getEditorialStaticParams("experience");
}
/** Uses the same validated entry and canonical route as the reading page. @author meetbyte */
export async function generateMetadata({ params }: EditorialPageProps) {
  return getEditorialPageMetadata("experience", (await params).slug);
}
/** Delegates sanitized prose, metadata and adjacent navigation to the shared shell. @author meetbyte */
export default async function CaseStudy({ params }: EditorialPageProps) {
  return <EditorialDetail section="experience" slug={(await params).slug} />;
}
