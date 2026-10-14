/**
 * @file Skills page rendered from editable categories.
 * @author meetbyte
 */
import { pageMetadata } from "@/lib/metadata";

import { skillsContent } from "@/data/skills";
import { requirePageEnabled } from "@/lib/require-page-enabled";
export const metadata = pageMetadata(
  "Skills",
  "Technical leadership, full-stack development, system design and the tools behind Meet Thummar’s work.",
  "/skills/",
);

/**
 * Renders each skill category and its entries, with clear empty states.
 * @returns The Skills page.
 * @author meetbyte
 */
export default function Skills() {
  requirePageEnabled("skills");
  const skills = skillsContent;

  return (
    <div className="detail-page skills-page">
      <div className="section-topline">
        <span className="eyebrow">{skills.eyebrow}</span>
        <span className="topline-index">
          {skills.topline} <span aria-hidden="true">↗</span>
        </span>
      </div>
      <header className="detail-intro">
        <h1>{skills.title}</h1>
        <p className="detail-lead">{skills.introduction}</p>
      </header>

      {/* Verified competencies and exploratory learning keep separate labeled groups. */}
      <div className="skill-categories">
        {skills.categories.length > 0 ? (
          skills.categories.map((category) => (
            <section
              className={`skill-category${category.id === "exploring" ? " skill-learning" : ""}`}
              key={category.id}
              aria-labelledby={`skill-${category.id}`}
            >
              <div className="skill-heading">
                <h2 id={`skill-${category.id}`}>{category.title}</h2>
                {category.description && <p>{category.description}</p>}
              </div>
              {category.skills.length > 0 ? (
                <ul className="skill-list">
                  {category.skills.map((skill) => (
                    <li key={skill.name}>
                      <span>{skill.name}</span>
                      {skill.note && <small>{skill.note}</small>}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="detail-empty">{skills.emptyCategory}</p>
              )}
            </section>
          ))
        ) : (
          <p className="detail-empty">{skills.emptyAll}</p>
        )}
      </div>
    </div>
  );
}
