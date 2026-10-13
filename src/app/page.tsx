/**
 * @file Concise editorial Home: identity, one short introduction and direct section links.
 * @author meetbyte
 */
import { SiteLink as Link } from "@/components/site-link";
import { profile } from "@/data/profile";
import { homeContent } from "@/data/home";
import { isPageEnabled } from "@/lib/page-visibility";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata("Software Engineer", "Full-stack engineering, technical leadership and enterprise systems. Meet the engineer behind the work.", "/");
/** Leaves detailed biography and long-form writing on their dedicated pages. @author meetbyte */
export default function Home() {
  const [first, ...rest] = profile.name.split(" ");
  return <div className="home-page editorial-home">
    <header className="home-introduction">
      <div className="home-introduction-copy">
      <p className="eyebrow">SOFTWARE ENGINEER</p>
      <h1><span>{first}</span>{" "}<span className="home-surname">{rest.join(" ")}</span></h1>
      <p className="home-summary">{homeContent.editorialSummary ?? profile.summary}</p>
      {isPageEnabled("experience") && <Link className="home-explore" href="/experience/">Explore the work <span aria-hidden="true">↗</span></Link>}
      </div>
    </header>
  </div>;
}
