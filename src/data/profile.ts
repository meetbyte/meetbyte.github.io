/**
 * @file Confirmed public identity and professional positioning.
 * @author meetbyte
 */
import type { Profile } from "./types";

export const profile: Profile = {
  name: "Meet Thummar",
  initials: "MT",
  portrait: { src: "/images/meet-thummar.webp", alt: "Meet Thummar", width: 1122, height: 1402 },
  title: "Software Engineer | Full-Stack & Enterprise Systems",
  brandLines: ["MEET", "THUMMAR"],
  roles: ["Technical Leadership", "Full-Stack Engineering", "System Design & Integration", "End-to-End Delivery"],
  summary: "I lead a team and build software for banking, financial services and insurance, from the first design discussions through delivery and support.",
  learning: "Exploring Applied AI · Deepening System Design",
  location: "Open to global opportunities",
  socials: [
    { label: "GitHub", shortLabel: "GH", href: "https://github.com/meetbyte" },
    { label: "LinkedIn", shortLabel: "in", href: "https://www.linkedin.com/in/thummarmeet/" },
    { label: "X", shortLabel: "X", href: "https://x.com/meetbyte" },
  ],
};
