import { pageEyebrow } from "@/lib/page-label";
import { routes } from "@/constants/routes";
/**
 * @file Data-driven project index, without category filters.
 * @author meetbyte
 */
import { SiteLink as Link } from "@/components/site-link";
import { Icon } from "@/components/icons";
import { PageHeading } from "@/components/page-heading";
import { ProjectVisual } from "@/components/project-visual";
import { getProjects } from "@/lib/content/projects";
import { pageMetadata } from "@/lib/metadata";
import { requirePageEnabled } from "@/lib/require-page-enabled";
export const metadata = pageMetadata("Projects", "Project case studies and the engineering decisions behind them.", "/projects/");
/**
 * Lists enabled validated case studies with sample labels, featured ordering and an informative empty state.
 * @author meetbyte
 */
export default function Projects() {
  requirePageEnabled("projects");
  const entries = getProjects();
  return <div className="detail-page">
    <PageHeading eyebrow={pageEyebrow(routes.projects, "PROJECTS")} title="The work, and the thinking behind it." description="A space for the problem, the decisions and the lessons behind each project." sample={entries.length > 0 && entries.every((project) => project.placeholder)} />
    <div className="project-list">
      {entries.length === 0 && <p className="detail-empty">Case studies are being prepared. Please check back soon.</p>}
      {entries.map((project, index) => <article className={`project-card${project.featured ? " is-featured" : ""}`} key={project.slug}>
        <Link className="project-visual-link" href={`/projects/${project.slug}/`} aria-label={`Read ${project.title} case study`} tabIndex={-1}><ProjectVisual project={project} /></Link>
        <div className="project-card-copy">
          <div className="card-meta"><span className="micro-label">{String(index + 1).padStart(2, "0")} / {project.featured ? "FEATURED CONCEPT" : project.category ?? "PROJECT"}</span>{project.placeholder && <span className="content-badge">Sample</span>}</div>
          <h2><Link href={`/projects/${project.slug}/`}>{project.title}<Icon name="arrow" size={21} /></Link></h2>
          <p>{project.summary}</p>
          {project.stack.length > 0 && <ul className="tag-list" aria-label="Technology stack">{project.stack.map((tech) => <li key={tech}>{tech}</li>)}</ul>}
          <Link className="text-link" href={`/projects/${project.slug}/`}>Explore case study <Icon name="arrow" size={16} /><span className="sr-only">: {project.title}</span></Link>
        </div>
      </article>)}
    </div>
  </div>;
}
