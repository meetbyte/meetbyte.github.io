/**
 * @file Configures Next.js linting, the documented browser-state effect exception and generated-file exclusions.
 * @author meetbyte
 */
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
export default defineConfig([
  ...nextVitals, ...nextTypescript,
  // Existing controls synchronize browser preferences and menu state in effects.
  { rules: { "react-hooks/set-state-in-effect": "off" } },
  globalIgnores([".next/**", "out/**", "next-env.d.ts"]),
]);
