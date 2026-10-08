/** Runs after a successful static build; never edits source files. @author meetbyte */
import path from "node:path";
import { pageVisibility } from "../src/constants/page-visibility";
import { finalizeExport } from "../src/lib/finalize-export";
const disabled = Object.entries(pageVisibility).filter(([, enabled]) => !enabled).map(([route]) => route);
console.log("Static export cleanup:", finalizeExport(path.resolve(process.cwd(), "out"), disabled).join(", ") || "nothing hidden");
