/**
 * @file Quiet editorial Home using verified identity and only eligible public content previews.
 * @author meetbyte
 */
import { SiteLink as Link } from "@/components/site-link";
import { Icon } from "@/components/icons";
import { profile } from "@/data/profile";
import { homeContent as home } from "@/data/home";
import { contactContent as contact } from "@/data/contact";
import { getEditorialLibrary, selectHomeEditorial } from "@/lib/content/editorial";
import { isPageEnabled, isRouteEnabled } from "@/lib/page-visibility";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata("Software Engineer | Meet Thummar", "Full-stack engineering, technical leadership and enterprise systems. Meet the engineer behind the work.", "/");

/** Uses approved existing wording; omitted unpublished sections leave no empty cards or links. @author meetbyte */
export default async function Home() {
  const { entries, manifest } = await getEditorialLibrary();
  const featured = selectHomeEditorial(entries, manifest, { experience: isPageEnabled("experience"), writing: isPageEnabled("writing") });
  const emailHref = `mailto:${contact.email}?subject=${encodeURIComponent(contact.subject)}`;
  return <div className="home-page editorial-home">
    <header className="home-introduction">
      <p className="eyebrow">{home.kicker}</p>
      <h1>{profile.name}</h1>
      <p className="home-profession">{profile.title}</p>
      {profile.summary && <p className="home-summary">{profile.summary}</p>}
      {isRouteEnabled(home.primaryHref) && <Link className="text-link home-intro-link" href={home.primaryHref}>{home.primaryAction} <Icon name="arrow" size={17} /></Link>}
    </header>
    <section className="home-perspective" aria-labelledby="perspective-heading">
      <p className="micro-label">{home.topline}</p>
      <h2 id="perspective-heading">{home.headingStart}{home.headingEmphasis}{home.headingEnd}{home.headingPunctuation}</h2>
      <p>{home.description}</p>
      {home.secondaryAction && isRouteEnabled(home.secondaryAction.href) && <Link className="text-link" href={home.secondaryAction.href}>{home.secondaryAction.label} <Icon name="arrow" size={16} /></Link>}
    </section>
    {featured.experience.length > 0 && <section className="home-editorial-section" aria-labelledby="home-experience-heading">
      <h2 id="home-experience-heading">Experience</h2>
      <div className="home-editorial-list">{featured.experience.map(entry => <article key={entry.id}><p className="micro-label">{entry.category}</p><h3><Link href={`/experience/${entry.slug}/`}>{entry.title}</Link></h3><p>{entry.summary}</p></article>)}</div>
    </section>}
    {featured.writing.length > 0 && <section className="home-editorial-section" aria-labelledby="home-writing-heading">
      <h2 id="home-writing-heading">Writing</h2>
      <div className="home-editorial-list">{featured.writing.map(entry => <article key={entry.id}><p className="micro-label">{entry.category} · {entry.minutes} min read</p><h3><Link href={`/writing/${entry.slug}/`}>{entry.title}</Link></h3><p>{entry.summary}</p></article>)}</div>
    </section>}
    {isPageEnabled("contact") && <section className="home-contact" aria-labelledby="home-contact-heading">
      <h2 id="home-contact-heading">{contact.title}</h2><p>{contact.introduction}</p><a className="text-link" href={emailHref}>{contact.email} <Icon name="arrow" size={17} /></a>
    </section>}
  </div>;
}
