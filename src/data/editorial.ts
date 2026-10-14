/**
 * @file Approved index headings and navigation wording for the two editorial sections.
 * @author meetbyte
 */
import type { EditorialSection } from "@/constants/editorial";
import { routes } from "@/constants/routes";

export const editorialSections = {
  experience: {
    label: "Experience",
    eyebrow: "EXPERIENCE",
    title: "The work behind the perspective.",
    introduction:
      "Problems, decisions and lessons from enterprise engineering.",
    description:
      "Four engineering case studies by Meet Thummar: Oracle APEX self-service data workflows, enterprise modernization, engineering tooling and production investigation.",
    route: routes.experience,
    className: "experience-index",
    backLabel: "← All experience",
    moreLabel: "More experience",
  },
  writing: {
    label: "Writing",
    eyebrow: "WRITING",
    title: "Ideas worth thinking through.",
    introduction:
      "Engineering, judgment and the questions that stay with me beyond the code.",
    description: "Notes on engineering, decisions and thinking slowly.",
    route: routes.writing,
    className: "writing-index",
    backLabel: "← All writing",
    moreLabel: "More writing",
  },
} as const satisfies Record<
  EditorialSection,
  {
    label: string;
    eyebrow: string;
    title: string;
    introduction: string;
    description: string;
    route: string;
    className: string;
    backLabel: string;
    moreLabel: string;
  }
>;
export const editorialLabels = {
  draft: "Draft",
  readingTime: "min read",
} as const;
