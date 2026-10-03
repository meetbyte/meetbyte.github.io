/** CV link configuration. Enable only when the real file or link exists. @author meetbyte */
import type { CvConfig } from "./types";

export const cvConfig: CvConfig = {
  label: "Download CV",
  available: false,
  // TODO(Meet): Add a real PDF under public/files and set href to /files/name.pdf.
  // Alternatively use a verified external CV URL.
  href: undefined,
  filename: undefined,
  unavailableLabel: "CV download unavailable; Meet has not supplied a CV yet",
  unavailableTitle: "CV will be available after Meet supplies a file or link",
  status: "Pending",
};
