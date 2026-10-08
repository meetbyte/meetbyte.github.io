/**
 * @file Shared preview for routes awaiting their final content.
 * @author meetbyte
 */
import { SiteLink as Link } from "@/components/site-link";
import { Icon } from "./icons";
import { siteContent, type PreviewSection } from "@/constants/content";
import { routes } from "@/constants/routes";

/**
 * Uses route data to render one consistent preview layout.
 * @param section - Key for the route's title, copy, and planned stage.
 * @returns A preview page with a link back to the home page.
 * @author meetbyte
 */
export function SectionPlaceholder({ section }: { section: PreviewSection }) {
  const preview = siteContent[section];
  const common = siteContent.common.sectionPreview;

  return (
    <div className="section-page">
      <div className="section-topline"><span className="eyebrow">{preview.eyebrow}</span><span className="stage-tag">{common.stagePrefix} {preview.stage.toUpperCase()}</span></div>
      <div className="section-copy">
        <span className="section-spark" aria-hidden="true">{common.spark}</span>
        <h1>{preview.title}</h1>
        <p>{preview.description}</p>
      </div>
      <div className="section-bottom">
        <span>{common.footer}</span>
        <Link href={routes.home}>{common.backToHome} <Icon name="arrow" size={16} /></Link>
      </div>
    </div>
  );
}
