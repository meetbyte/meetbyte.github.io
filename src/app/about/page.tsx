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
        <p className={about.biography ? "detail-body" : "detail-empty"}>
          {about.biography || about.placeholder}
        </p>
      </div>

      {/* The three data sections explain empty lists until content is ready. */}
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
          {about.interests.length > 0 ? (
            <ul className="text-list">
              {about.interests.map((interest) => <li key={interest}>{interest}</li>)}
            </ul>
          ) : <p className="detail-empty">{about.emptyInterests}</p>}
        </section>
        <section className="detail-section" aria-labelledby="learning-heading">
          <h2 id="learning-heading">{about.learningHeading}</h2>
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
