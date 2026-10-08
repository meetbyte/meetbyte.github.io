/**
 * @file Code-native concept artwork, independent of client screenshots.
 * @author meetbyte
 */
import { SiteImage as Image } from "@/components/site-image";
import type { Project } from "@/data/types";
/**
 * Chooses a supplied project cover or the matching code-native concept illustration without requiring client screenshots.
 * @author meetbyte
 */
export function ProjectVisual({ project }: { project: Project }) {
  if (project.cover) return <div className="project-visual"><Image src={project.cover.src} alt={project.cover.alt} width={project.cover.width} height={project.cover.height} /></div>;
  return <div className={`project-visual visual-${project.visual ?? "workflow"}`} aria-hidden="true">
    <span className="visual-grid" />
    <div className="concept-window"><div className="concept-toolbar"><i /><i /><i /><span>{project.visual === "notebook" ? "NOTES / IDEAS" : "REQUEST / REVIEW"}</span></div>
      <div className="concept-content"><div className="concept-sidebar"><b /><b /><b /></div><div className="concept-lines"><strong /><span /><span /><div className="concept-steps"><i /><i /><i /></div></div></div>
    </div><span className="visual-caption">{project.placeholder ? "ILLUSTRATIVE CONCEPT" : "PROJECT OVERVIEW"}</span>
  </div>;
}
