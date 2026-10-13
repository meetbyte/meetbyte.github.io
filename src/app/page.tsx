/**
 * @file Concise editorial Home: identity, one short introduction and direct section links.
 * @author meetbyte
 */
import { SiteLink as Link } from "@/components/site-link";
import { EditorialArtwork } from "@/components/editorial-artwork";
import { Icon } from "@/components/icons";
import { profile } from "@/data/profile";
import { homeContent } from "@/data/home";
import { isPageEnabled } from "@/lib/page-visibility";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata("Software Engineer | Meet Thummar", "Full-stack engineering, technical leadership and enterprise systems. Meet the engineer behind the work.", "/");
/** Leaves detailed biography and long-form writing on their dedicated pages. @author meetbyte */
export default function Home() {
  return <div className="home-page editorial-home">
    <header className="home-introduction">
      <div className="home-introduction-copy">
      <p className="eyebrow">SOFTWARE ENGINEER</p>
      <h1>{profile.name}</h1>
      <p className="home-profession">{profile.title}</p>
      <p className="home-summary">{homeContent.editorialSummary ?? profile.summary}</p>
      <nav className="home-direct-links" aria-label="Explore MeetByte">
        {isPageEnabled("experience") && <Link className="text-link" href="/experience/">Experience <Icon name="arrow" size={17} /></Link>}
        {isPageEnabled("writing") && <Link className="text-link" href="/writing/">Writing <Icon name="arrow" size={17} /></Link>}
        {isPageEnabled("about") && <Link className="text-link" href="/about/">About me <Icon name="arrow" size={17} /></Link>}
      </nav>
      </div>
      <EditorialArtwork />
    </header>
  </div>;
}
