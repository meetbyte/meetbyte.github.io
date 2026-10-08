# Prompt 03 — Replace the persona completely

Continue the destination established in prompt 00 with `BUILD_SPEC.md`, filled `PERSONA.md`, supplied assets and prior handoff available. Reproduce mode preserves the reference content. Adapt/fresh mode must use only the target person's verified, approved material; the reference biography and media are not starter content to publish unchanged.

Populate the typed schemas in `src/data/types.ts` and the matching profile, home, about, resume, skills, contact, cv, projects and navigation modules. Preserve optional fields and meaningful empty states. Write readable first-person content grounded in supplied facts. Keep professional work, earlier practice and current learning distinct. Do not assume the target person is a software engineer. Skills categories, roles, career dates, education and certifications come from that person. Do not invent metrics, clients, accomplishments or dates.

Perform the complete identity replacement map:

| Content | Inspect/update in the destination |
| --- | --- |
| Name, initials, title, roles, biography, brand lines, learning, location | `src/data/profile.ts`, `home.ts`, `about.ts`, `skills.ts`, `resume.ts`; optional stories/highlights as supplied. |
| Brand symbol/punctuation, reusable labels and metadata defaults | `src/constants/content.ts`; retain profession-neutral labels when appropriate. |
| Contact email, invitation, subject, opportunities and social profiles | `src/data/contact.ts` and `profile.ts`; omit absent profiles; encode mailto subject. |
| Site origin, locale, social-image description | `src/lib/metadata.ts`, document language in `src/app/layout.tsx`. |
| Page titles/descriptions and 404 identity | Metadata exports in `src/app/page.tsx`, `about/page.tsx`, `resume/page.tsx`, `skills/page.tsx`, `contact/page.tsx`, `not-found.tsx`; inspect nested route metadata too. |
| Portrait, CV, social image, icon and Apple touch icon | `public/images/`, `public/files/`, `public/icons/`; `src/data/profile.ts`, `cv.ts`, `src/app/layout.tsx`, `src/lib/metadata.ts`. |
| Website package identity and preference namespaces | `package.json`; `src/constants/config.ts`, `src/lib/theme.ts`, `season.ts`, `connection.ts`, `scenery-motion.ts`; keep writers/readers/bootstrap/events synchronized. |
| Examples/articles and user-facing documentation | `src/data/projects.ts`, `content/blog/`, root README and maintenance docs. Keep illustrative claims explicitly labeled. |

Use the supplied portrait and CV with their publication consent. If missing, provide an initials/image-failure state and an unavailable CV action. Replace or remove inherited person-specific portrait/CV/social artwork in the **new destination only**, after confirming replacements and current references. Shared scenic art/fonts may be reused. Preserve inherited author/license attribution; do not use blind global replacement through code comments, dependencies or provenance archives.

Audit the new destination source and built HTML/JSON/SVG/metadata for the reference name, username, email, social URLs, CV filename and visible initials. A match in historical attribution or an explicitly labeled reference archive can remain; a match exposed as the target person's identity must be fixed. Verify generic profession labels and all social/card link destinations. A new person's site must not link to the reference CV or mailbox.

Run typecheck and build when content is complete, check actual pages and missing/empty optional inputs, then report the approved persona sources, replacement coverage, missing content and checks. Keep raw input and resulting copy traceable in the destination docs. Do not commit, push or deploy.
