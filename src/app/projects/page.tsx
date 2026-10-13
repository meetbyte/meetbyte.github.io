/**
 * @file Static compatibility entry for the new Experience canonical URL; legacy samples remain unavailable.
 * @author meetbyte
 */
import { SiteLink as Link } from "@/components/site-link";
import { pageMetadata } from "@/lib/metadata";
import { requirePageEnabled } from "@/lib/require-page-enabled";
export const metadata = pageMetadata("Experience", "Engineering stories are now collected under Experience.", "/experience/", { sample: true });
/** Provides a real accessible link on static hosting, without requiring a server redirect. @author meetbyte */
export default function ProjectsAlias() {
  requirePageEnabled("experience");
  return <div className="detail-page"><header className="detail-intro"><h1>Experience</h1><p className="detail-lead">The engineering stories are now collected under Experience.</p><Link className="text-link" href="/experience/">Continue to Experience →</Link></header></div>;
}
