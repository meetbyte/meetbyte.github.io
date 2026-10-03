/** Resume timeline data, awaiting verified experience and education. @author meetbyte */
import type { ResumeContent } from "./types";

export const resumeContent: ResumeContent = {
  eyebrow: "02 / RESUME",
  topline: "THE JOURNEY",
  title: "Experience, shown with context.",
  introduction: "A timeline for professional experience and education. Details will appear after Meet confirms them.",
  experienceHeading: "Professional experience",
  educationHeading: "Education",
  // TODO(Meet): Add dated entries after verifying role, organization, and period.
  experience: [],
  education: [],
  emptyExperience: "Professional experience details to be added by Meet.",
  emptyEducation: "Education details to be added by Meet.",
};
