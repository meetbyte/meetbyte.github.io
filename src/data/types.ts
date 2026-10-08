/**
 * @file Structured, editable content types for Stage 3.
 * @author meetbyte
 */
export type SocialLink = { label: string; shortLabel: string; href: string };
export type NavigationItem = { label: string; href: string };
export type Profile = {
  name: string;
  initials: string;
  portrait: { src: string; alt: string; width: number; height: number };
  title: string;
  brandLines: readonly string[];
  roles: readonly string[];
  location?: string;
  summary?: string;
  learning?: string;
  socials: readonly SocialLink[];
};
export type FeatureLink = { eyebrow: string; titleLines: readonly string[]; href: string };
export type HomeContent = {
  eyebrow: string; topline: string; spark: string; kicker: string;
  headingStart: string; headingEmphasis: string; headingEnd: string; headingPunctuation: string;
  description: string; primaryAction: string; scrollPrompt: string;
  primaryHref: string; secondaryAction?: { label: string; href: string };
  features: readonly FeatureLink[];
};
export type ExpertiseArea = { title: string; description?: string };
export type AboutContent = {
  eyebrow: string; topline: string; title: string; introduction?: string; biography?: string | readonly string[];
  placeholder: string; expertiseHeading: string; expertise: readonly ExpertiseArea[]; emptyExpertise: string;
  interestsHeading: string; interests: readonly string[];
  interestsIntroduction?: string; learningIntroduction?: string;
  storySections?: readonly { id: string; title: string; paragraphs: readonly string[] }[];
  learningHeading: string; currentLearning: readonly string[];
  emptyInterests: string; emptyLearning: string;
};
export type Skill = { name: string; note?: string };
export type SkillCategory = { id: string; title: string; description?: string; skills: readonly Skill[] };
export type SkillsContent = {
  eyebrow: string; topline: string; title: string; introduction: string;
  emptyCategory: string; emptyAll: string;
  categories: readonly SkillCategory[];
};
export type TimelineEntry = {
  id: string; title: string; organization?: string; location?: string;
  period?: string; summary?: string; highlights?: readonly string[];
  placeholder?: boolean;
};
export type ResumeContent = {
  eyebrow: string; topline: string; title: string; introduction: string;
  experienceHeading: string; educationHeading: string;
  experience: readonly TimelineEntry[]; education: readonly TimelineEntry[];
  certificationsHeading?: string; certifications?: readonly TimelineEntry[];
  emptyExperience: string; emptyEducation: string;
};
export type CvConfig = {
  label: string; available: boolean; href?: string; filename?: string;
  unavailableLabel: string; unavailableTitle: string; status: string;
};

/** Optional case-study sections keep short and long projects on the same UI. */
export type Project = {
  slug: string; title: string; summary: string; category?: string;
  stack: readonly string[]; overview: string; featured?: boolean; placeholder?: boolean;
  visual?: "workflow" | "notebook";
  cover?: { src: string; alt: string; width: number; height: number };
  sections?: readonly { id: string; title: string; paragraphs?: readonly string[]; bullets?: readonly string[] }[];
  screenshots?: readonly { src: string; alt: string; width: number; height: number; caption?: string }[];
  github?: string; demo?: string;
};

/** The Blog UI depends on this model, never on the Markdown filesystem. */
export type BlogPost = {
  slug: string; title: string; date: string; excerpt: string; tags: readonly string[];
  published: boolean; placeholder: boolean; minutes: number; html: string;
  cover?: { src: string; alt: string; width: number; height: number };
};
