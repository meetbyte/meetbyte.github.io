/** User-supplied CV available as a static PDF download. @author meetbyte */
import type { CvConfig } from "./types";

export const cvConfig: CvConfig = {
  label: "Download CV",
  available: true,
  href: "/files/Meet-Thummar-CV.pdf",
  filename: "Meet-Thummar-CV.pdf",
  unavailableLabel: "CV download currently unavailable",
  unavailableTitle: "My experience and education are listed below while the CV download is unavailable.",
  status: "Unavailable",
};
