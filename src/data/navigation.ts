/** Shared navigation data. @author meetbyte */
import { routes } from "@/constants/routes";
import type { NavigationItem } from "./types";

export const navigationItems: readonly NavigationItem[] = [
  { label: "Home", href: routes.home },
  { label: "About", href: routes.about },
  { label: "Resume", href: routes.resume },
  { label: "Skills", href: routes.skills },
  { label: "Projects", href: routes.projects },
  { label: "Blog", href: routes.blog },
  { label: "Contact", href: routes.contact },
];
