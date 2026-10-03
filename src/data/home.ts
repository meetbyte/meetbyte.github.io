/** Home content, kept outside the page component. @author meetbyte */
import { routes } from "@/constants/routes";
import { profile } from "./profile";
import type { HomeContent } from "./types";

export const homeContent: HomeContent = {
  eyebrow: "WELCOME / 00",
  topline: "THE BEGINNING OF SOMETHING GOOD",
  spark: "✳",
  kicker: "SOFTWARE, IDEAS & EVERYTHING BETWEEN.",
  headingStart: "A space for the work ",
  headingEmphasis: "and",
  headingEnd: " what comes next",
  headingPunctuation: ".",
  description: `An evolving home for ${profile.name}'s projects, perspective, and notes from the learning curve. The foundations are here; the story is taking shape.`,
  primaryAction: "Explore the site",
  scrollPrompt: "SCROLL TO DISCOVER",
  features: [
    { eyebrow: "01 / THE WORK", titleLines: ["Projects with", "a point of view."], href: routes.projects },
    { eyebrow: "02 / THE THINKING", titleLines: ["Ideas worth", "writing down."], href: routes.blog },
  ],
};
