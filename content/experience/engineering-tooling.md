---
id: "engineering-tooling"
title: "Improving the Engineering Workflow"
slug: "engineering-tooling"
summary: "Bringing AI-assisted documentation, dependency checks, code scanning and delivery tooling into the everyday work of maintaining software."
category: "Engineering practice"
status: "published"
seoDescription: "Bringing AI-assisted documentation, dependency checks, code scanning and delivery tooling into the everyday work of maintaining software."
placeholder: false
tags: ["Engineering practice"]
ownerApproval: "Linear MEE-10 owner instruction, comment 84a72fd3-175c-4e10-9337-56b5d8fedd81 (14 October 2026); CR002 presentation, release approval separate"
---
## The work around the implementation

In addition to delivering application features, I worked on the engineering workflow around the codebase. That included a GitHub Copilot agent for documentation, commenting and code updates, as well as dependency checks, code scanning, Jenkins pipelines and SonarQube.

I wanted these improvements to connect to how the team actually worked. Documentation and code checks have limited value if they remain separate from the implementation and delivery process. The useful question was where a repeatable step could make the work clearer or reduce a recurring burden.

## Putting boundaries around AI assistance

I created the Copilot agent to operate under defined conditions and standards. Its purpose was to assist with documentation, comments and code updates within those boundaries. This was an engineering workflow contribution, not a claim that generated code could approve its own correctness.

The distinction mattered to me because automated output still becomes part of a codebase that someone has to understand and maintain. A documentation update should describe the implementation accurately. A comment should explain a useful responsibility or decision. A code change should fit the standards and scope of the work it is helping with.

I see AI assistance as most useful when its responsibilities are clear. It can help produce or update an artifact, while the surrounding process still determines whether that artifact is appropriate.

## Mechanical checks and delivery

I added OWASP dependency checks and code scanning to GitHub workflows. I also worked with SonarQube in delivery workflows and set up Jenkins pipelines for frontend and backend deployment.

These tools address different questions. Dependency checks provide information about the dependencies included in the application. Code scanning and quality checks examine conditions the tooling is designed to detect. A pipeline gives the team a repeatable delivery path. None of those results should be stretched into a claim that all defects or security risks have been eliminated.

My contribution was bringing those checks and capabilities into the workflow, alongside the application work. That meant considering how the output would be used, rather than treating the existence of a tool as the improvement itself.

## Small improvements that remain useful

The concrete contributions were the agent, the checks and the delivery tooling, integrated alongside ongoing application work.

What I value is the effect of making the surrounding work more deliberate. Better documentation makes reasoning easier to find. Repeatable checks make expectations more visible. Delivery tooling helps the team follow a known path. Together, these are practical improvements to the way software is developed and carried forward, even when they do not appear as a feature on a user's screen.
