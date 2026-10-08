/** Optional-section case study, generated before deployment. @author meetbyte */
import { SiteImage as Image } from "@/components/site-image";
import { SiteLink as Link } from "@/components/site-link";
import { notFound } from "next/navigation";
import { getProject, getProjects } from "@/lib/content/projects";
import { pageMetadata } from "@/lib/metadata";
import { isPageEnabled } from "@/lib/page-visibility";
import { requirePageEnabled } from "@/lib/require-page-enabled";
import { ProjectVisual } from "@/components/project-visual";
type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  const params = isPageEnabled("projects") ? getProjects().map(({ slug }) => ({ slug })) : [];
  // Static export requires one parameter. This reserved slug always renders 404.
  return params.length ? params : [{ slug: "_unpublished" }];
}
export async function generateMetadata({ params }: Props) {
  requirePageEnabled("projects");
  const project = getProject((await params).slug);
  if (!project) notFound();
  return pageMetadata(project.title, project.summary, `/projects/${project.slug}/`, { sample: project.placeholder });
}
export default async function CaseStudy({ params }: Props) {
  requirePageEnabled("projects");
  const project = getProject((await params).slug);
  if (!project) notFound();
  return <article className="detail-page case-study">
    <div className="section-topline"><Link className="back-link" href="/projects/">← All projects</Link><span className="eyebrow">CASE STUDY</span></div>
    <header className="detail-intro"><p className="micro-label">{project.category ?? "PROJECT"}</p><h1>{project.title}</h1><p className="detail-lead">{project.summary}</p>
      {project.placeholder && <p className="sample-notice"><span className="content-badge">Sample case study</span> Fictional concept. No client delivery or results are claimed.</p>}
      {project.stack.length > 0 && <ul className="tag-list" aria-label="Technology stack">{project.stack.map((tech) => <li key={tech}>{tech}</li>)}</ul>}
    </header>
    <div className="case-visual"><ProjectVisual project={project} /></div>
    <section className="detail-section"><h2>Overview</h2><p className="detail-body">{project.overview}</p></section>
    {project.sections?.filter((section) => section.paragraphs?.some((p) => p.trim()) || section.bullets?.some((p) => p.trim())).map((section) => <section className="detail-section" key={section.id} aria-labelledby={`case-${section.id}`}>
      <h2 id={`case-${section.id}`}>{section.title}</h2>
      {section.paragraphs?.filter((p) => p.trim()).map((paragraph, index) => <p className="detail-body" key={index}>{paragraph}</p>)}
      {Boolean(section.bullets?.length) && <ul className="case-list">{section.bullets!.filter((p) => p.trim()).map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
    </section>)}
    {Boolean(project.screenshots?.length) && <section className="detail-section"><h2>Screenshots</h2>{project.screenshots!.map((shot) => <figure className="case-screenshot" key={shot.src}><Image src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} />{shot.caption && <figcaption>{shot.caption}</figcaption>}</figure>)}</section>}
    {(project.github || project.demo) && <div className="detail-section case-links">{project.github && <a className="button button-secondary" href={project.github}>Source on GitHub ↗</a>}{project.demo && <a className="button button-primary" href={project.demo}>Live demo ↗</a>}</div>}
    <div className="detail-section"><Link className="text-link" href="/projects/">← Back to projects</Link></div>
  </article>;
}
