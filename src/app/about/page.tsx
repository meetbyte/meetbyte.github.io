import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata("About", "Meet Thummar’s story, approach to software engineering, interests and current learning.", "/about/");

/**
 * @file About page populated from editable, structured content.
 * @author meetbyte
 */
import { aboutContent } from "@/data/about";
import { requirePageEnabled } from "@/lib/require-page-enabled";

/**
 * Renders the biography, practice areas, interests, and current learning.
 * Empty fields show the relevant placeholder instead of a blank area.
 * @returns The About page.
 * @author meetbyte
 */
export default function About() {
  requirePageEnabled("about");
  const about = aboutContent;
  const biography = (typeof about.biography === "string" ? [about.biography] : about.biography ?? []).filter((paragraph) => paragraph.trim());

  return (
    <div className="detail-page">
      <div className="section-topline">
        <span className="eyebrow">{about.eyebrow}</span>
        <span className="topline-index">{about.topline} <span aria-hidden="true">↗</span></span>
      </div>
      <div className="detail-intro">
        <span className="detail-mark" aria-hidden="true">✳</span>
        <h1>{about.title}</h1>
        {about.introduction && <p className="detail-lead">{about.introduction}</p>}
        {biography.length > 0 ? biography.map((paragraph, index) => (
          <p className="detail-body" key={index}>{paragraph}</p>
        )) : <p className="detail-empty">{about.placeholder}</p>}
      </div>

      {about.storySections?.filter((section) => section.paragraphs.some((paragraph) => paragraph.trim())).map((section) => (
        <section className="detail-section about-story" key={section.id} aria-labelledby={`story-${section.id}`}>
          <h2 id={`story-${section.id}`}>{section.title}</h2>
          {section.paragraphs.filter((paragraph) => paragraph.trim()).map((paragraph, index) => (
            <p className="detail-body" key={index}>{paragraph}</p>
          ))}
        </section>
      ))}

      {/* Practice, interests and learning remain fully driven by content. */}
      <section className="detail-section" aria-labelledby="expertise-heading">
        <h2 id="expertise-heading">{about.expertiseHeading}</h2>
        {about.expertise.length > 0 ? (
          <div className="expertise-grid">
            {about.expertise.map((area) => (
              <article className="expertise-card" key={area.title}>
                <span className="expertise-dot" aria-hidden="true" />
                <h3>{area.title}</h3>
                {area.description && <p>{area.description}</p>}
              </article>
            ))}
          </div>
        ) : <p className="detail-empty">{about.emptyExpertise}</p>}
      </section>
      <div className="detail-pair">
        <section className="detail-section" aria-labelledby="interests-heading">
          <h2 id="interests-heading">{about.interestsHeading}</h2>
          {about.interestsIntroduction && <p className="detail-section-intro">{about.interestsIntroduction}</p>}
          {about.interests.length > 0 ? (
            <ul className="text-list">
              {about.interests.map((interest) => <li key={interest}>{interest}</li>)}
            </ul>
          ) : <p className="detail-empty">{about.emptyInterests}</p>}
        </section>
        <section className="detail-section" aria-labelledby="learning-heading">
          <h2 id="learning-heading">{about.learningHeading}</h2>
          {about.learningIntroduction && <p className="detail-section-intro">{about.learningIntroduction}</p>}
          {about.currentLearning.length > 0 ? (
            <ul className="text-list">
              {about.currentLearning.map((item) => <li key={item}>{item}</li>)}
            </ul>
          ) : <p className="detail-empty">{about.emptyLearning}</p>}
        </section>
      </div>
    </div>
  );
}
