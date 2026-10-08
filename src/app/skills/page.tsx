import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata("Skills", "Technical leadership, full-stack development, system design and the tools behind Meet Thummar’s work.", "/skills/");

/**
 * @file Skills page rendered from editable categories.
 * @author meetbyte
 */
import { skillsContent } from "@/data/skills";
import { requirePageEnabled } from "@/lib/require-page-enabled";

/**
 * Renders each skill category and its entries, with clear empty states.
 * @returns The Skills page.
 * @author meetbyte
 */
export default function Skills() {
  requirePageEnabled("skills");
  const skills = skillsContent;

  return (
    <div className="detail-page">
      <div className="section-topline">
        <span className="eyebrow">{skills.eyebrow}</span>
        <span className="topline-index">{skills.topline} <span aria-hidden="true">↗</span></span>
      </div>
      <div className="detail-intro">
        <span className="detail-mark" aria-hidden="true">✳</span>
        <h1>{skills.title}</h1>
        <p className="detail-lead">{skills.introduction}</p>
      </div>

      {/* Categories and chips come from data; missing entries remain explicit. */}
      <div className="skill-categories">
        {skills.categories.length > 0 ? (
          skills.categories.map((category) => (
            <section className="skill-category" key={category.id} aria-labelledby={`skill-${category.id}`}>
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
              ) : <p className="detail-empty">{skills.emptyCategory}</p>}
            </section>
          ))
        ) : <p className="detail-empty">{skills.emptyAll}</p>}
      </div>
    </div>
  );
}
