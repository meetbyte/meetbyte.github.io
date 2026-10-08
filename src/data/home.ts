import { pageEyebrow } from "@/lib/page-label";
/**
 * @file Home content, kept outside the page component.
 * @author meetbyte
 */
import { routes } from "@/constants/routes";
import type { HomeContent } from "./types";

export const homeContent: HomeContent = {
  eyebrow: pageEyebrow(routes.home, "WELCOME"),
  topline: "SOFTWARE WITH PURPOSE",
  spark: "✳",
  kicker: "TECHNICAL LEADERSHIP & HANDS-ON ENGINEERING",
  headingStart: "I make complex systems ",
  headingEmphasis: "easier",
  headingEnd: " to work with",
  headingPunctuation: ".",
  description: "I lead teams and deliver end-to-end solutions across banking, financial services and insurance. My work connects business requirements, system design and hands-on engineering, from customer journeys and enterprise integrations to delivery and production support. I like understanding the whole flow, helping a team make clear decisions, and staying close enough to the code to work through the difficult parts.",
  primaryAction: "View my experience",
  primaryHref: routes.resume,
  secondaryAction: { label: "Read my story", href: routes.about },
  scrollPrompt: "MORE TO EXPLORE",
  features: [
    { eyebrow: "01 / THE EXPERIENCE", titleLines: ["The work behind", "the perspective."], href: routes.resume },
    { eyebrow: "02 / THE PERSON", titleLines: ["How I think,", "and what I explore."], href: routes.about },
  ],
};
