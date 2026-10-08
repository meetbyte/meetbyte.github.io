# Meet Thummar Personal Website

## Master Implementation Plan

### Project

**Repository:** `meetbyte/meetbyte.github.io`  
**Production URL:** `https://meetbyte.github.io`  
**Primary branch:** `main`

The repository is a GitHub **user site**, not a GitHub project site. The production website must therefore operate directly from the root URL without a repository-name sub-path.

An existing countdown website currently exists in the repository. Its implementation does not need to be preserved on the new development branch because the previous branch retains the original implementation.

Before replacing the existing application, the current repository and README must be inspected so that we understand the existing project structure and do not accidentally retain unnecessary legacy configuration.

---

# Product Vision

Build a modern personal portfolio for **Meet Thummar** that presents him as a broad software developer rather than limiting his identity to one technology or specialization.

The website should communicate experience across areas such as:

- Full-stack development
- Frontend development
- Backend/API development
- Databases
- Cloud and DevOps
- Software engineering
- Future Applied AI skills and projects

The overall visual inspiration can come from RyanCV's profile-card experience, but the finished website must be an **original design**.

It should feel:

**Professional + technical + creative + personal.**

The website should not feel like a generic Bootstrap resume template or a direct RyanCV clone.

---

# Core UX Direction

## Desktop experience

Use a two-area portfolio workspace.

Conceptually:

```text
┌──────────────────────────────────────────────────────┐
│ Compact Navigation / Controls                        │
├───────────────────┬──────────────────────────────────┤
│                   │                                  │
│ Identity/Profile  │     Current Routed Content       │
│ Card              │                                  │
│                   │     About                        │
│ Meet Thummar      │     Resume                       │
│ Software Developer│     Skills                       │
│ Animated roles    │     Projects                     │
│ Social links      │     Blog                         │
│ Download CV       │     Contact                      │
│                   │                                  │
└───────────────────┴──────────────────────────────────┘
```

The profile/identity section should remain visually persistent while navigating the major areas of the website.

The content panel changes based on the current route.

For example:

```text
/about
/resume
/skills
/projects
/blog
/contact
```

Navigation should feel smooth and application-like while retaining real URLs and independently accessible pages.

---

# Responsive Behaviour

The persistent profile-card layout should primarily be a desktop experience.

Tablet and mobile layouts should adapt instead of squeezing the desktop layout onto a smaller screen.

Possible mobile structure:

```text
Compact header/navigation

Profile/identity hero

Current page content
```

The identity card may therefore transform from a fixed side panel into a smaller horizontal or stacked profile component.

Mobile UX should be designed independently rather than simply being a scaled-down desktop layout.

---

# Motion Direction

Smoothness is a major requirement.

Use purposeful animation for:

- page transitions
- navigation changes
- content entry
- cards
- hover interactions
- timeline entries
- project previews
- skill presentation
- profile/role text
- future AI-related visual elements

Animations should feel polished and restrained rather than decorative everywhere.

The website must respect:

```text
prefers-reduced-motion
```

Accessibility must not be sacrificed for animation.

---

# Visual Direction

Use a calm contemporary palette.

Avoid:

- neon-heavy developer aesthetics
- extreme black/white contrast everywhere
- overly bright gradients
- excessive glassmorphism
- constant animated backgrounds

Prefer:

- muted blue/teal accent family
- warm or soft neutral light surfaces
- charcoal/slate dark surfaces
- subtle borders
- soft shadows
- excellent typography
- generous whitespace
- restrained gradients where appropriate

Exact colors will be explored and selected during Stage 2.

---

# Public Identity

Primary public name:

**Meet Thummar**

Recommended primary title:

**Software Developer**

Supporting identity:

**Full-Stack Developer**

Possible animated professional descriptors:

```text
Full-Stack Developer
Backend & API Developer
Cloud & DevOps
Exploring Applied AI
```

The wording can evolve as AI experience becomes stronger.

Do not present the user as an AI Engineer before the portfolio contains sufficient experience/projects to support that positioning.

---

# Public Profile Information

The profile may include:

```text
Name
Professional title
Short introduction
Email
Open to global opportunities
Professional photograph
GitHub
LinkedIn
X
Download CV
```

Do not include a public phone number.

Do not include a freelance availability field for Version 1.

---

# Main Routes

Version 1 should support:

```text
/
 /about
 /resume
 /skills
 /projects
 /projects/[slug]
 /blog
 /blog/[slug]
 /contact
```

Real routes must be maintained even if transitions make the website visually feel similar to a single interactive application.

---

# Home / Profile Content

The home/profile experience may contain:

- Short introduction
- Professional identity
- Animated roles
- Primary CTA
- Download CV
- Social links
- Selected professional snapshot

Useful supplementary sections include:

### What I Do / Expertise

A concise description of the major areas Meet works across.

### Years of Experience

Data-driven rather than permanently hardcoded into text where practical.

### Projects Completed

Should only show meaningful/project data that actually exists.

### Currently Learning

Useful for technologies such as AI without falsely representing learning topics as professional mastery.

### Interests

Can introduce some personality beyond software development.

### Fun Facts

A small optional section with carefully selected facts.

Do not include:

- Pricing
- Clients
- Testimonials

unless they become genuinely relevant in the future.

---

# Skills Presentation

Avoid arbitrary percentage scores such as:

```text
JavaScript 92%
Angular 88%
```

They are difficult to objectively justify.

Prefer categorized skills with optional proficiency descriptors for selected technologies.

Example structure:

```text
Frontend
Backend
Languages
Databases
Cloud
DevOps
Tools
AI
Architecture
```

Categories must be generated from structured data rather than being hardcoded into the UI.

---

# Projects Strategy

Do not implement portfolio category/filter controls in Version 1.

The project page should instead focus on presentation quality.

Each project can contain:

```text
Title
Short summary
Thumbnail / hero visual
Technology stack
Role
Project status
GitHub link where appropriate
Live link where appropriate
Case-study link
```

Project detail pages should function as real engineering case studies.

Suggested structure:

```text
Overview
Problem / Context
My Role
Architecture
Technology Stack
Key Challenges
Solution
Important Engineering Decisions
Screenshots / Visuals
Results / Outcome
Lessons Learned
Repository / Demo
```

Fields should remain flexible because not every project will require every section.

---

# Blog Strategy

The Version 1 blog should remain completely static.

A new article should ideally require only:

1. creating a Markdown/MDX file
2. writing frontmatter/content
3. committing it
4. pushing it

No database or backend is required for Version 1.

However, the Blog UI should **not directly depend on reading filesystem content everywhere**.

Create a small content access layer such as:

```text
lib/content/
    posts.ts
```

The UI should consume normalized post objects from this layer.

Version 1:

```text
Markdown files
       ↓
Markdown content adapter
       ↓
normalized BlogPost model
       ↓
Blog UI
```

A future architecture could therefore become:

```text
Backend / CMS / Database
       ↓
API content adapter
       ↓
same BlogPost model
       ↓
same Blog UI
```

This minimizes future migration effort without unnecessarily overengineering Version 1.

Blog topics may include a mixture of:

- software engineering
- frontend/backend
- cloud/DevOps
- AI
- learning
- career
- system design
- technical notes
- broader personal writing

Tags/categories should therefore remain generic and data-driven.

---

# Contact Strategy

Version 1 has no backend.

Provide:

- visible email address
- mailto link
- pre-filled email subject
- GitHub
- LinkedIn
- X

No contact-form backend, API keys, serverless functions, database, or third-party form service.

---

# STAGE 1 — FOUNDATION & DEPLOYMENT

## Objective

Replace the old countdown application on the new branch with a clean technical foundation and prove that the site can successfully build and deploy to GitHub Pages before significant UI work begins.

## Before modifying anything

Inspect:

```text
repository structure
README
package.json
existing framework/configuration
Git configuration-related files
GitHub Actions workflows
public assets
```

The old countdown implementation may then be removed from this branch.

Do not modify the old protected branch containing the previous website.

---

## Technical stack

Use:

```text
Next.js
TypeScript
App Router, provided current static-export support is verified
Tailwind CSS
Static export
GitHub Pages
GitHub Actions
```

The exact current stable Next.js version must be checked when Stage 1 begins rather than being permanently pinned in this planning document.

Use the App Router unless current Next.js static-export limitations discovered during implementation make another router materially more reliable.

Reliability takes precedence over using a newer architecture merely because it is newer.

---

## Static Export

Configure Next.js for completely static generation.

There must be:

- no production Node server
- no runtime API routes
- no server-only functionality
- no runtime database requirement
- no dependency on Vercel

The exported output must be deployable directly to GitHub Pages.

Because this is:

```text
meetbyte.github.io
```

and not:

```text
meetbyte.github.io/project-name
```

do not configure a project-repository base path.

---

## Initial project structure

Establish a scalable structure similar to:

```text
src/
    app/
    components/
    data/
    lib/
    styles/
    types/

content/
    blog/

public/
    images/
    icons/
    files/
```

The exact structure can change if there is a clear technical reason.

---

## Stage 1 UI

Create only enough UI to verify routing and deployment.

Do NOT attempt to finish the portfolio design.

A temporary skeleton home page is sufficient.

---

## GitHub Actions

Configure automatic deployment when changes reach:

```text
main
```

Prefer the official GitHub Pages workflow/actions unless current GitHub documentation provides a reason to choose another supported mechanism.

---

## Stage 1 validation

Stage 1 is complete only when:

```text
npm install works
development server works
production build works
static export succeeds
generated routes/assets work
GitHub Actions configuration is valid
GitHub Pages root-path configuration is correct
```

Document any GitHub repository setting that Meet needs to change manually.

---

## Stage 1 handoff

At completion provide:

- files created
- files modified
- files deleted
- packages installed
- architectural choices made
- manual GitHub steps
- build/test results
- known issues

Then STOP.

Do not begin Stage 2 without approval.

---

# STAGE 2 — DESIGN SYSTEM, PROFILE CARD & WEBSITE SHELL

## Objective

Create the visual identity and navigation experience before filling every page with final content.

This stage determines what the portfolio actually feels like.

---

## Build

Create:

### Profile/Identity Card

Include placeholders/data-driven fields for:

```text
photo
name
primary title
animated professional descriptors
short intro
social links
email/contact CTA
Download CV
```

The card remains visually persistent on appropriate desktop layouts.

---

### Navigation

Create an original hybrid navigation system.

Desktop navigation may use compact labels/icons integrated into the main workspace.

Mobile navigation should become a purpose-built responsive menu.

Do not copy RyanCV navigation exactly.

---

### Main Content Workspace

Build the reusable content panel that hosts routed pages.

Ensure that every route remains refreshable and directly accessible.

---

### Theme System

Implement:

```text
Light mode
Dark mode
Manual toggle
System-preference default
Persisted preference
```

Use localStorage where appropriate.

Avoid theme flashing during initial load as much as practical for a statically generated application.

---

### Motion System

Establish reusable motion primitives.

Examples:

```text
PageTransition
FadeIn
SlideIn
Reveal
StaggeredList
HoverLift
```

Use an appropriate lightweight animation solution if it provides meaningful value.

Animations must support reduced-motion preferences.

---

## Stage 2 visual exploration

Finalize:

- colors
- typography
- card treatments
- background treatment
- icon direction
- spacing system
- border radii
- shadows
- desktop layout
- tablet behavior
- mobile behavior

Use a calm professional/developer aesthetic.

---

## Stage 2 validation

Test:

```text
desktop
tablet
mobile
light theme
dark theme
keyboard navigation
theme persistence
route transitions
reduced motion
```

At completion, the website shell should already look polished even though much of the final content is not present.

---

## Stage 2 handoff

Provide:

- screenshots/visual review where useful
- files changed
- reusable components introduced
- design decisions
- responsive decisions
- known limitations

Then STOP for approval.

---

# STAGE 3 — DATA LAYER + HOME + ABOUT + SKILLS + RESUME

## Objective

Convert the visual shell into Meet's professional online identity while ensuring content remains maintainable separately from UI code.

---

## Data architecture

Personal information must live in dedicated structured files.

Possible organization:

```text
src/data/
    profile.ts
    navigation.ts
    social.ts
    expertise.ts
    skills.ts
    experience.ts
    education.ts
    interests.ts
```

Use clear TypeScript types/interfaces.

Do not bury content inside React components.

Do not invent Meet's work history, education, achievements, numbers, biography, or skills.

Use clearly marked placeholder content until real information is supplied.

---

## Home

Build:

- professional hero/profile content
- short introduction
- What I Do / Expertise
- Years of Experience
- Projects Completed where supported by real project data
- Currently Learning
- Interests
- optional Fun Facts

---

## About

Create a more detailed personal/professional story.

The page should support future additions without changing its fundamental component structure.

---

## Skills

Present skills by dynamic categories.

Possible categories may include:

```text
Languages
Frontend
Backend
Databases
Cloud
DevOps
Tools
Architecture
AI
```

Do not assume all categories must exist.

Avoid fake numeric percentages.

Use clean grouping, tags, proficiency descriptions or other defensible visual representations.

---

## Resume

Build an elegant vertical timeline for:

```text
Professional Experience
Education
```

Potential future sections may include:

```text
Certifications
Achievements
```

Timeline entries must come from structured data.

The Resume experience should take inspiration from RyanCV's clarity while using original components and styling.

---

## CV Download

Provide a data/config-based link to a CV PDF stored under the public assets.

Use a placeholder until the actual CV is supplied.

---

## Stage 3 validation

Verify:

- no real personal information is invented
- changing data does not require changing components
- empty/optional fields degrade gracefully
- timeline works responsively
- skill categories are fully data-driven
- layout works with both short and long content

---

## Stage 3 handoff

Provide:

- data schemas
- files changed
- placeholder fields Meet still needs to fill
- instructions for updating resume/skills
- validation results

Then STOP for approval.

---

# STAGE 4 — PROJECTS + CASE STUDIES + BLOG ENGINE

## Objective

Build the parts of the portfolio that will continue growing for years.

---

# Projects

Create:

```text
/projects
/projects/[slug]
```

Generate project detail routes statically.

Projects must come from structured content rather than hardcoded page components.

Do not add category filters in Version 1.

The Projects page should instead emphasize:

```text
Featured projects
Strong visual hierarchy
Technology stack
Clear project summaries
Easy access to case studies
```

---

## Project detail architecture

Support structured case studies with optional sections such as:

```text
Overview
Context
Problem
Role
Architecture
Technology Stack
Challenges
Solution
Engineering Decisions
Screenshots
Outcome
Lessons Learned
GitHub
Live Demo
```

A project should not be required to populate every field.

---

# Blog

Create:

```text
/blog
/blog/[slug]
```

Use Markdown or MDX content stored under a dedicated content folder.

Each article should support frontmatter similar to:

```text
title
slug
date
excerpt
tags
cover image
published
```

Additional metadata may be introduced only where useful.

---

## Blog content architecture

Implement the content adapter described earlier.

The Blog UI should consume a normalized post model rather than knowing how the post was stored.

This is specifically intended to make eventual migration to:

```text
API
CMS
database
backend
```

less disruptive.

Do not build those systems now.

---

## Blog experience

Include:

- blog listing
- dates
- excerpts
- tags
- article page
- readable article typography
- code-block styling
- images
- headings
- links
- metadata
- social-preview support groundwork

Create one clearly marked sample article demonstrating the expected format.

---

## Stage 4 validation

Verify:

```text
new project can be added without redesigning UI
new project slug generates correctly
new Markdown post appears automatically
post slug generates correctly
invalid/missing metadata fails gracefully
static export contains all dynamic routes
article typography works in light/dark mode
```

---

## Stage 4 handoff

Provide:

- project-data instructions
- case-study instructions
- blog-authoring instructions
- example Markdown format
- files changed
- build validation

Then STOP for approval.

---

# STAGE 5 — CONTACT + SEO + ACCESSIBILITY + FINAL POLISH

## Objective

Turn the completed portfolio into a production-ready Version 1 release.

---

# Contact

Build the Contact page using:

```text
Email
mailto:
GitHub
LinkedIn
X
```

Provide a useful pre-filled email subject.

Do not add a contact backend in Version 1.

---

# SEO

Implement:

```text
Per-page title
Meta descriptions
Canonical handling where applicable
Open Graph metadata
Social preview images
Project metadata
Blog metadata
sitemap.xml
robots.txt
favicon/app icons
```

Dynamic project/blog metadata should come from their content.

---

# Accessibility

Perform a deliberate accessibility pass.

Check:

```text
semantic HTML
heading hierarchy
keyboard navigation
focus states
alt text
button/link semantics
aria attributes where genuinely needed
color contrast
reduced motion
responsive text
```

---

# Final UX polish

Review:

- route transitions
- loading perception
- hover interactions
- visual consistency
- content spacing
- mobile navigation
- long article pages
- long resume entries
- project case studies
- theme consistency
- image presentation
- empty states
- external links
- broken links
- 404 behaviour

Animations should feel cohesive across the website.

---

# Performance

Review the exported application for unnecessary JavaScript and oversized media.

Optimize:

```text
images
fonts
animation dependencies
bundle size
unused packages
rendering behaviour
```

Do not sacrifice usability for an artificial performance score.

---

# Documentation

Update the README with:

```text
Project overview

Local setup

Development commands

Production build

How to modify profile data

How to update skills

How to update experience

How to add a project

How to create a project case study

How to add a blog post

How to replace the CV

How to replace the profile photo

How GitHub Pages deployment works

Repository settings required
```

---

# Final deployment validation

Before calling Version 1 complete, verify:

```text
fresh dependency installation
lint/type checks
production build
static export
all routes
direct URL refreshes
GitHub Pages deployment
desktop
tablet
mobile
light mode
dark mode
links
CV download
blog posts
project pages
SEO files
404 handling
```

---

# Stage Workflow Rule

Every stage follows the same process:

```text
Implement one stage
        ↓
Build/test
        ↓
Provide changed-file summary
        ↓
Meet reviews
        ↓
Fix requested changes
        ↓
Meet approves
        ↓
Proceed to next stage
```

Never automatically continue into the next stage.

Meet handles Git commits and pushes himself.

---

# Rules for AI During Implementation

1. Never invent real biography, employment, education, skills, project achievements or personal details.

2. Ask for missing personal content or use clearly labeled placeholders.

3. Do not copy RyanCV source code, layout pixel-for-pixel, assets or commercial-theme styling.

4. RyanCV is design inspiration only.

5. Prefer maintainable reusable components over duplicated markup.

6. Keep content separate from UI.

7. Keep the application compatible with GitHub Pages static hosting.

8. Do not introduce a backend into Version 1.

9. Do not overengineer features merely for hypothetical future needs.

10. Where future migration is reasonably foreseeable—particularly Blog content—use lightweight abstractions that prevent unnecessary coupling.

11. Preserve accessibility when introducing animations.

12. Do not start another implementation stage until Meet explicitly approves the current one.

---

# Commands for Starting Future Stages

Meet can start implementation using simple commands such as:

```text
Start Stage 1 of the Personal Website Implementation Plan.
```

Then:

```text
Start Stage 2 of the Personal Website Implementation Plan.
```

and so on.

Before Stage 1 implementation, inspect the existing repository and README first.

No production implementation should begin until the repository contents are available in the working environment.