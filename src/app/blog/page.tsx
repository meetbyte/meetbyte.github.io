/**
 * @file Static compatibility entry for the new Writing canonical URL; legacy samples remain unavailable.
 * @author meetbyte
 */
import { SiteLink as Link } from "@/components/site-link";
import { pageMetadata } from "@/lib/metadata";
import { requirePageEnabled } from "@/lib/require-page-enabled";
export const metadata = pageMetadata("Writing", "Essays are now collected under Writing.", "/writing/", { sample: true });
/** Preserves an old index link without exposing sample posts or using a runtime redirect. @author meetbyte */
export default function BlogAlias() {
  requirePageEnabled("writing");
  return <div className="detail-page"><header className="detail-intro"><h1>Writing</h1><p className="detail-lead">The essays are now collected under Writing.</p><Link className="text-link" href="/writing/">Continue to Writing →</Link></header></div>;
}
