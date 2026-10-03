/** Category-driven skills; only add technologies Meet confirms. @author meetbyte */
import type { SkillsContent } from "./types";

export const skillsContent: SkillsContent = {
  eyebrow: "03 / SKILLS",
  topline: "THE TOOLKIT",
  title: "A toolkit that keeps growing.",
  introduction: "Skills will appear here once the specific tools and technologies are confirmed.",
  emptyCategory: "Specific skills to be added by Meet.",
  emptyAll: "Skill categories to be added by Meet.",
  // Categories reflect broad role labels already present in the Stage 2 profile.
  categories: [
    { id: "full-stack", title: "Full-Stack Developer", skills: [] },
    { id: "backend-api", title: "Backend & API Developer", skills: [] },
    { id: "cloud-devops", title: "Cloud & DevOps", skills: [] },
  ],
};
