/**
 * @file Home page introducing the portfolio and its main sections.
 * @author meetbyte
 */
import Link from "next/link";
import { Icon } from "@/components/icons";
import { homeContent } from "@/data/home";
import { routes } from "@/constants/routes";
import { isPageEnabled, isRouteEnabled } from "@/lib/page-visibility";

/**
 * Renders the introductory hero and links revealed below it on scroll.
 * @returns The home page content.
 * @author meetbyte
 */
export default function Home() {
  const home = homeContent;
  // Keep unpublished sections out of the home cards and their scroll prompt.
  const visibleFeatures = home.features.filter((feature) => isRouteEnabled(feature.href));
  const showAboutAction = isPageEnabled("about");

  return (
    <div className="home-page">
      <div className="content-topline">
        <span className="eyebrow">{home.eyebrow}</span>
        <span className="topline-index">{home.topline} <span aria-hidden="true">↗</span></span>
      </div>
      <div className="hero-copy">
        <span className="hero-mark" aria-hidden="true">{home.spark}</span>
        <p className="hero-kicker">{home.kicker}</p>
        <h1>
          {home.headingStart}<em>{home.headingEmphasis}</em>{home.headingEnd}
          <span className="heading-period">{home.headingPunctuation}</span>
        </h1>
        <p className="hero-description">{home.description}</p>
        {(showAboutAction || visibleFeatures.length > 0) && (
          <div className="hero-actions">
            {showAboutAction && (
              <Link className="button button-primary" href={routes.about}>
                {home.primaryAction} <Icon name="arrow" size={17} />
              </Link>
            )}
            {visibleFeatures.length > 0 && (
              <span>{home.scrollPrompt} <span aria-hidden="true">↓</span></span>
            )}
          </div>
        )}
      </div>

      {visibleFeatures.length > 0 && (
        <div className={`home-bottom${visibleFeatures.length === 1 ? " is-single" : ""}`}>
          {visibleFeatures.map((feature) => (
            <Link key={feature.href} className="feature-card" href={feature.href}>
              <span className="feature-number">{feature.eyebrow}</span>
              <span className="feature-title">
                {feature.titleLines.map((line, index) => (
                  <span key={`${feature.href}-${index}`}>
                    {index > 0 && <br />}{line}
                  </span>
                ))}
              </span>
              <span className="feature-arrow"><Icon name="arrow" size={18} /></span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
