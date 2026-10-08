import { pageEyebrow } from "@/lib/page-label";
import { routes } from "@/constants/routes";
/**
 * @file Direct contact without a form backend or third-party service.
 * @author meetbyte
 */
import { PageHeading } from "@/components/page-heading";
import { Icon } from "@/components/icons";
import { contactContent as contact } from "@/data/contact";
import { pageMetadata } from "@/lib/metadata";
import { requirePageEnabled } from "@/lib/require-page-enabled";
export const metadata = pageMetadata("Contact", "Connect with Meet Thummar about engineering problems, enterprise applications and opportunities.", "/contact/");
/**
 * Renders approved contact wording, an encoded mailto action and public social destinations for the enabled Contact route.
 * @author meetbyte
 */
export default function Contact() {
  requirePageEnabled("contact");
  const emailHref = `mailto:${contact.email}?subject=${encodeURIComponent(contact.subject)}`;
  return <div className="detail-page contact-page">
    <PageHeading eyebrow={pageEyebrow(routes.contact, "CONTACT")} title={contact.title} description={contact.introduction} />
    <section className="detail-section" aria-labelledby="email-heading"><p className="micro-label">THE DIRECT ROUTE</p><h2 id="email-heading">Write to me</h2>
      <a className="contact-email" href={emailHref}>{contact.email}<Icon name="arrow" size={25} /></a>
      <p className="detail-body">{contact.opportunities}</p><a className="button button-primary contact-action" href={emailHref}>Start an email <Icon name="arrow" size={16} /></a>
    </section>
    <section className="detail-section" aria-labelledby="elsewhere-heading"><h2 id="elsewhere-heading">Find me elsewhere</h2><div className="contact-socials">{contact.socials.map((social) => <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={`${social.label} (opens in a new tab)`}><span>{social.label}</span><Icon name="external" size={18} /></a>)}</div></section>
  </div>;
}
