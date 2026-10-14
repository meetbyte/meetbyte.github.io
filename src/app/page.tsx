/**
 * @file Concise editorial Home: identity, one short introduction and direct section links.
 * @author meetbyte
 */
import { SiteLink as Link } from "@/components/site-link";
import { profile } from "@/data/profile";
import { homeContent } from "@/data/home";
import { isPageEnabled } from "@/lib/page-visibility";
import { pageMetadata } from "@/lib/metadata";
export const metadata = {
  ...pageMetadata(
    "Software Engineer & Enterprise Systems",
    "Meet Thummar is a software engineer working across full-stack development, enterprise integrations, modernization and production delivery. Explore his experience and writing.",
    "/",
  ),
  title: { absolute: "Meet Thummar | Software Engineer & Enterprise Systems" },
};
/** Leaves detailed biography and long-form writing on their dedicated pages. @author meetbyte */
export default function Home() {
  const [first, ...rest] = profile.name.split(" ");
  return (
    <div className="home-page editorial-home">
      <header className="home-introduction">
        <div className="home-introduction-copy">
          <p className="eyebrow">{homeContent.editorialRole}</p>
          <h1>
            <span>{first}</span>{" "}
            <span className="home-surname">{rest.join(" ")}</span>
          </h1>
          <p className="home-summary">
            {homeContent.editorialSummary ?? profile.summary}
          </p>
          {isPageEnabled("experience") && homeContent.editorialExplore && (
            <Link
              className="home-explore"
              href={homeContent.editorialExplore.href}
            >
              {homeContent.editorialExplore.label}{" "}
              <span aria-hidden="true">↗</span>
            </Link>
          )}
        </div>
      </header>
    </div>
  );
}
