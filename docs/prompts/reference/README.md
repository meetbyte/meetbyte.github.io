# Source reference for reproduction

`site-baseline.zip` captures the current website implementation on 8 October 2026, including working changes that may not exist on the public main branch. [SOURCE_MANIFEST.json](SOURCE_MANIFEST.json) records its archive hash and each included file's relative path, byte length and SHA-256.

Extract into a **new empty destination**. The archive entries are relative to the site root: package/lockfile/configuration, source, content, scripts, public assets, fonts/licenses, workflow and existing operational/maintenance documentation. It excludes Git history, dependencies, generated build output, secrets, personal planning questionnaires and this prompt pack. It does include the reference persona's public content, portrait, CV and social artwork because these are necessary to reproduce the current website.

For `reproduce`, retain those files and use `npm ci`, then `npx next typegen` to recreate generated route types before running the verification prompt. For `adapt`, use the same baseline as the design/feature implementation, then apply the new persona and replace/remove inherited persona-specific media in the new destination. Do not deploy the reference identity under someone else's name. For `fresh`, use this archive's assets and implementation as reference while working through all stages.

The manifest is a source snapshot, not a test report or published release. Same source/dependencies/assets preserve the implementation; screenshots can still vary with browser, viewport, clock, OS and preferences. An image generation prompt does not reproduce its original bitmap. Reuse existing artwork for the same visual result.

The refreshed archive contains the documented source, existing `docs/MAINTENANCE.md`, `docs/PROJECT_CONTEXT.md` and root README to locate editing responsibilities. Carry the complete surrounding prompt pack alongside the archive for content follow-up and persona workflows. Historical decisions and prompts are available in the surrounding documentation, but are not needed at absolute external workstation paths.
