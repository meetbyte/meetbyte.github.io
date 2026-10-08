/**
 * @file Recovery for unknown and unpublished static routes.
 * @author meetbyte
 */
import { SiteLink as Link } from "@/components/site-link";
import { pageMetadata } from "@/lib/metadata";
export const metadata = { ...pageMetadata("Page not found", "This page is unavailable. Return to Meet Thummar’s portfolio to continue.", "/", { sample: true }), alternates: { canonical: null }, openGraph: null, twitter: null };
/**
 * Renders accessible recovery links for missing or unpublished pages without implying the requested page exists.
 * @author meetbyte
 */
export default function NotFound() {
  return <div className="detail-page"><div className="section-topline"><span className="eyebrow">404 / NOT FOUND</span></div><div className="detail-intro"><h1>This page took a different path.</h1><p className="detail-lead">The link may have changed, or this page is still being prepared.</p><Link className="button button-primary contact-action" href="/">Back to home →</Link></div></div>;
}
