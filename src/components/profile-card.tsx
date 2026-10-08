/**
 * @file Persistent profile summary shown beside or above route content.
 * @author meetbyte
 */
import { SiteLink as Link } from "@/components/site-link";
import { SiteImage as Image } from "@/components/site-image";
import { siteContent } from "@/constants/content";
import { profile } from "@/data/profile";
import { cvConfig } from "@/data/cv";
import { routes } from "@/constants/routes";
import { isPageEnabled } from "@/lib/page-visibility";
import { Icon } from "./icons";
import { RoleRotator } from "./role-rotator";

/**
 * Renders identity, rotating roles, public links, and contact actions.
 * @returns The shared profile card.
 * @author meetbyte
 */
export function ProfileCard() {
  const copy = siteContent.common.profile;

  return (
    <aside className="profile-card" aria-label={copy.label}>
      <div className="profile-art">
        <div className="portrait-frame">
          <div className="portrait-image">
            <span className="portrait-placeholder" aria-hidden="true">{profile.initials}</span>
            {/* Keep the photo scale stable while the outer frame crops vertically. */}
            <Image
              className="profile-photo"
              src={profile.portrait.src}
              alt={profile.portrait.alt}
              fill
              sizes="(max-width: 560px) calc(100vw - 24px), (max-width: 760px) 30vw, (max-width: 1050px) 33vw, 355px"
              preload
            />
          </div>
        </div>
      </div>

      <div className="profile-body">
        <div className="profile-intro">
          <p className="micro-label">{copy.introLabel}</p>
          <p className="profile-name">{profile.name}</p>
          <p className="profile-title">{profile.title}</p>
          {profile.summary && <p className="profile-summary">{profile.summary}</p>}
          {profile.roles.length > 0 && (
            <div className="profile-role">
              <span className="role-pulse" />
              <RoleRotator roles={profile.roles} />
            </div>
          )}
          {profile.learning && <p className="profile-learning">{profile.learning}</p>}
        </div>

        {profile.location && (
          <div className="profile-meta">
            <span className="meta-pin" aria-hidden="true" />
            <span>{profile.location}</span>
          </div>
        )}

        <nav className="social-links" aria-label={copy.socialLabel}>
          {profile.socials.map((social) => (
            <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={`${social.shortLabel === social.label ? social.label : `${social.shortLabel} — ${social.label}`} (${copy.socialNewTabLabel})`} title={social.label}>
              {social.shortLabel}
              <Icon name="external" size={12} />
            </a>
          ))}
        </nav>

        <div className="profile-actions">
          {/* Do not link to a route that is disabled by the publication switch. */}
          {isPageEnabled("contact") && (
            <Link className="button button-primary" href={routes.contact}>
              {copy.actions.contact} <Icon name="arrow" size={16} />
            </Link>
          )}
          {/* Keep the CV action disabled until its file or URL is configured. */}
          {cvConfig.available && cvConfig.href ? (
            <a className="button button-secondary" href={cvConfig.href} download={cvConfig.filename}>
              <Icon name="download" size={16} /> {cvConfig.label}
            </a>
          ) : (
            <button type="button" className="button button-disabled" disabled aria-label={cvConfig.unavailableLabel} title={cvConfig.unavailableTitle}>
              <Icon name="download" size={16} /> {cvConfig.label}
              <span className="soon-label">{cvConfig.status}</span>
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
