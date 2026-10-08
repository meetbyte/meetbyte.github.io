/**
 * @file One switch per page. Change these values before building the site.
 * @author meetbyte
 */
import { routes } from "./routes";

// Home stays available as the entry point for the website.
export const pageVisibility = {
  home: true,
  about: true,
  resume: true,
  skills: true,
  projects: false,
  blog: false,
  contact: true,
} as const satisfies { home: true } & Record<keyof typeof routes, boolean>;

export type PageKey = keyof typeof pageVisibility;
