/**
 * @file Resume page with data-driven experience and education timelines.
 * @author meetbyte
 */
import { Timeline } from "@/components/timeline";
import { resumeContent } from "@/data/resume";
import { cvConfig } from "@/data/cv";
import { requirePageEnabled } from "@/lib/require-page-enabled";

/**
 * Renders resume timelines and the CV action when a file is available.
 * @returns The Resume page.
 * @author meetbyte
 */
export default function Resume() {
  requirePageEnabled("resume");
  const resume = resumeContent;

  return (
    <div className="detail-page">
      <div className="section-topline">
        <span className="eyebrow">{resume.eyebrow}</span>
        <span className="topline-index">{resume.topline} <span aria-hidden="true">↗</span></span>
      </div>
      <div className="detail-intro">
        <span className="detail-mark" aria-hidden="true">✳</span>
        <h1>{resume.title}</h1>
        <p className="detail-lead">{resume.introduction}</p>
        {/* The download appears only after a real CV URL is configured. */}
        {cvConfig.available && cvConfig.href ? (
          <a className="button button-primary resume-cv" href={cvConfig.href} download={cvConfig.filename}>
            {cvConfig.label}
          </a>
        ) : <p className="resume-cv-note">{cvConfig.unavailableTitle}</p>}
      </div>
      <section className="detail-section resume-section" aria-labelledby="experience-heading">
        <h2 id="experience-heading">{resume.experienceHeading}</h2>
        <Timeline entries={resume.experience} empty={resume.emptyExperience} />
      </section>
      <section className="detail-section resume-section" aria-labelledby="education-heading">
        <h2 id="education-heading">{resume.educationHeading}</h2>
        <Timeline entries={resume.education} empty={resume.emptyEducation} />
      </section>
    </div>
  );
}
