/** Project access and validation shared by pages, metadata and sitemap. @author meetbyte */
import { projects } from "@/data/projects";
import type { Project } from "@/data/types";
import { validateImage } from "./images";

export const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** Fail with an actionable message instead of silently losing a case-study route. */
export function validateProjects(entries: readonly Project[]): readonly Project[] {
  const slugs = new Set<string>();
  for (const project of entries) {
    if (!slugPattern.test(project.slug) || slugs.has(project.slug)) throw new Error(`Invalid or duplicate project slug: ${project.slug}`);
    if (!project.title.trim() || !project.summary.trim() || !project.overview.trim()) throw new Error(`Project ${project.slug} needs title, summary and overview.`);
    slugs.add(project.slug);
    const ids = new Set<string>();
    for (const section of project.sections ?? []) {
      if (!slugPattern.test(section.id) || ids.has(section.id) || !section.title.trim()) throw new Error(`Invalid section in project ${project.slug}: ${section.id}`);
      ids.add(section.id);
    }
    for (const href of [project.github, project.demo].filter(Boolean)) {
      try { if (new URL(href!).protocol !== "https:") throw new Error(); }
      catch { throw new Error(`Project ${project.slug} links must use HTTPS and a valid URL.`); }
    }
    for (const image of [project.cover, ...project.screenshots ?? []].filter(Boolean)) {
      try { validateImage(image!); } catch (error) { throw new Error(`Project ${project.slug}: ${error instanceof Error ? error.message : "invalid image"}`); }
    }
  }
  return entries;
}

export function getProjects(): readonly Project[] {
  return [...validateProjects(projects)].sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
}

export function getProject(slug: string): Project | undefined {
  return getProjects().find((project) => project.slug === slug);
}
