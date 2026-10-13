---
id: "ai-and-decisions"
title: "AI Can Write Code. Who Owns the Decision?"
slug: "ai-and-decisions"
summary: "Generated code can reduce effort. It does not settle requirements, trade-offs or responsibility for what becomes part of a system."
category: "Engineering"
status: "published"
seoDescription: "Generated code can reduce effort. It does not settle requirements, trade-offs or responsibility for what becomes part of a system."
placeholder: false
tags: ["Engineering"]
ownerApproval: "Linear MEE-10 owner instruction, comment 84a72fd3-175c-4e10-9337-56b5d8fedd81 (14 October 2026); CR002 presentation, release approval separate"
---
## The output arrives before the understanding

An AI tool can produce code quickly enough to change the rhythm of development. A blank file becomes an implementation. A rough description becomes a set of functions. That speed is useful, especially for work that would otherwise consume time without requiring much judgment.

I use AI-assisted tools in engineering and personal projects. I am interested in what they make possible. I am also interested in the distance between receiving a plausible implementation and deciding that it belongs in a system.

The output can look settled even when the underlying requirement is not. Names, types and comments give a solution an appearance of completeness. They do not establish that the problem has been understood correctly.


> The code may be generated. The decision to make it part of a system still needs an owner.

## A prompt contains decisions, including accidental ones

When I ask a tool to implement something, the request carries assumptions. It describes some constraints and leaves others unstated. The generated result must still take a position on the missing details, whether or not those positions are obvious to the person reading it.

Which failure should stop the operation? What should happen on a repeated request? How should missing information be represented? Is the proposed abstraction worth its complexity? Those decisions do not become less important because the tool can produce a working example around them.

I want to separate instructions that describe the desired behavior from suggestions about the mechanism. That gives me a better chance of noticing when the generated solution follows the mechanism while missing the behavior.

It also makes disagreement easier to handle. If a result does not fit, I should be able to explain which expectation it violates rather than repeatedly asking for a different implementation and hoping the next one feels right.

## Verification needs an independent reference

Generated tests can be helpful, but they can also inherit the same misunderstanding as the generated code. A test that confirms the implementation's chosen behavior does not necessarily confirm the requirement.

The useful reference is outside the proposed solution: acceptance criteria, a documented interface, an agreed example or an existing behavior that must be preserved. I want checks that can distinguish a correct implementation from a convincing variation that answers a different question.

This applies to summaries as well. A confident description of what changed is a starting point for inspection. The actual diff, the observed checks and the remaining uncertainty still matter. The tool's explanation should make that inspection easier, not replace it.

For a small change, the inspection can be small. For a change affecting access, data handling or a shared interface, the questions become more consequential. I do not want the same level of confidence to be applied automatically to every kind of output.

## Keep the authority close to the consequence

There is a difference between suggesting a change, committing it to a development branch and releasing it to people who depend on the application. Those steps have different consequences. It is useful to make the boundary between them explicit.

A tool can be allowed to prepare work without being allowed to approve its own result. A developer can test an implementation without being the person who decides whether a changed business rule is acceptable. Keeping those distinctions visible helps prevent convenience from quietly expanding into authority.

I think this is especially important when automation connects several tools. A sequence of successful operations can look like a complete decision process even when no step has established that the final action is wanted. Passing a check answers the question the check was designed to ask. It does not answer every question around release.

## Speed should create room for judgment

The promise I find most useful is not that AI removes the need to understand software. It is that it can reduce some of the effort around implementation, explanation and exploration, leaving more attention for the decisions that shape the result.

That benefit depends on how the tool is used. If the saved time is spent accepting more output without understanding it, the uncertainty has simply moved elsewhere. If it is spent clarifying requirements and examining meaningful boundaries, the work can become more deliberate.

The code may be generated. The decision to make it part of a system still needs an owner. I want to be able to explain that decision in my own words, including what supports it and what remains uncertain.
