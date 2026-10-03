/** About content. Replace labeled gaps only with Meet's verified details. @author meetbyte */
import type { AboutContent } from "./types";

export const aboutContent: AboutContent = {
  eyebrow: "01 / ABOUT",
  topline: "THE PERSON",
  title: "The person behind the work.",
  introduction: "Meet Thummar is a software developer.",
  // TODO(Meet): Add your own biography and professional story.
  placeholder: "Biography and professional story to be added by Meet.",
  expertiseHeading: "Areas of practice",
  // These are the role labels already present in the Stage 2 profile; no specific tools are implied.
  expertise: [
    { title: "Full-Stack Developer" },
    { title: "Backend & API Developer" },
    { title: "Cloud & DevOps" },
  ],
  emptyExpertise: "Areas of practice to be added by Meet.",
  interestsHeading: "Interests",
  // TODO(Meet): Add interests you want to share.
  interests: [],
  learningHeading: "Currently exploring",
  currentLearning: ["Applied AI"],
  emptyInterests: "Interests to be added by Meet.",
  emptyLearning: "Current learning to be added by Meet.",
};
