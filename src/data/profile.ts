/** Verified identity and existing Stage 2 profile labels. @author meetbyte */
import type { Profile } from "./types";

export const profile: Profile = {
  name: "Meet Thummar",
  initials: "MT",
  title: "Software Developer",
  brandLines: ["MEET", "THUMMAR"],
  roles: ["Full-Stack Developer", "Backend & API Developer", "Cloud & DevOps", "Exploring Applied AI"],
  // Existing Stage 2 availability wording. Meet can replace or remove it.
  location: "Open to global opportunities",
  socials: [
    { label: "GitHub", shortLabel: "GH", href: "https://github.com/meetbyte" },
    { label: "LinkedIn", shortLabel: "in", href: "https://www.linkedin.com/in/thummarmeet/" },
    { label: "X", shortLabel: "X", href: "https://x.com/meetbyte" },
  ],
};
