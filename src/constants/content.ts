/** Shared interface wording and previews for later stages. @author meetbyte */
import { profile } from "@/data/profile";

export const siteContent = {
  common: {
    metadata: {
      title: `${profile.name} | ${profile.title}`,
      description: `The personal website of ${profile.name}. A new portfolio is in progress.`,
    },
    skipLink: "Skip to content",
    brand: {
      symbol: "m", punctuation: ".", lines: profile.brandLines,
      homeLabel: `${profile.name}, home`,
    },
    headerStatus: "PORTFOLIO IN PROGRESS",
    footer: {
      identity: profile.name.toUpperCase(),
      siteType: "PERSONAL WEBSITE",
      message: "BUILT TO GROW WITH THE WORK.",
    },
    navigation: {
      label: "Primary navigation",
      openLabel: "Open navigation",
      closeLabel: "Close navigation",
    },
    theme: { switchToLight: "Switch to light theme", switchToDark: "Switch to dark theme" },
    profile: {
      label: `${profile.name} profile`,
      portraitLabel: "Portrait placeholder",
      artLabel: "PROFILE / 01",
      artCaption: "Portrait to follow",
      introLabel: "HELLO, I'M",
      socialLabel: "Social profiles",
      socialNewTabLabel: "opens in a new tab",
      actions: { contact: "Get in touch" },
    },
    sectionPreview: {
      stagePrefix: "CONTENT COMING IN",
      footer: "THE SPACE IS READY. THE STORY IS NEXT.",
      backToHome: "Back to home",
      spark: "✳",
    },
  },
  projects: {
    eyebrow: "04 / Projects", title: "The work, and the thinking behind it.",
    description: "Featured projects and engineering case studies will take shape here.", stage: "Stage 4",
  },
  blog: {
    eyebrow: "05 / Blog", title: "Notes from the learning curve.",
    description: "A home for technical writing, ideas, and things worth remembering is coming soon.", stage: "Stage 4",
  },
  contact: {
    eyebrow: "06 / Contact", title: "Let’s start a conversation.",
    description: "Direct contact details and an easy way to reach out will be added once the content is ready.", stage: "Stage 5",
  },
} as const;

export type PreviewSection = "projects" | "blog" | "contact";
