---
id: "software-meets-reality"
title: "When Software Meets Reality"
slug: "software-meets-reality"
summary: "Delivery is an important moment, but it does not end a system’s story. Supporting real use asks for evidence, communication and careful follow-through."
category: "Engineering"
status: "published"
seoDescription: "Delivery is an important moment, but it does not end a system’s story. Supporting real use asks for evidence, communication and careful follow-through."
placeholder: false
tags: ["Engineering"]
ownerApproval: "Linear MEE-10 owner instruction, comment 84a72fd3-175c-4e10-9337-56b5d8fedd81 (14 October 2026); CR002 presentation, release approval separate"
---
## A system enters a wider context

A development environment gives us a bounded view of an application. We choose the data, know the intended flow and can usually inspect the relevant code directly. Real use introduces people and conditions that do not fit neatly inside that view.

My work includes collaboration with QA, business teams, production support and customer support. That has made the work around a delivered application important to me. A system needs to remain understandable when someone reports a problem in the language of their task, rather than the language of its implementation.

The report may be simple: the information is missing, an action did not finish, the result looks different. Turning that report into a useful engineering question requires care.


> Program testing can be used to show the presence of bugs, but never to show their absence!
>
> — [Edsger W. Dijkstra](https://www.cs.utexas.edu/~EWD/transcriptions/EWD02xx/EWD249/EWD249.html), *Notes on Structured Programming*

## Begin by understanding the interruption

Before looking for a cause, I want to understand what the person expected and what actually happened. Which action were they taking? What did the application show? Was the behavior consistent or intermittent? Which conditions are known, and which are still assumptions?

That distinction helps prevent an investigation from becoming a collection of guesses. A familiar symptom can have several causes. A recent change may be relevant, but timing alone does not establish the connection.

It also helps the conversation with the person affected. They may not know which technical details matter. The engineer's responsibility is to ask useful questions without turning the exchange into an obstacle course.

I want to preserve the original report while refining it. Otherwise, it is possible to solve a technically interesting problem and lose track of the interruption that brought the team into the investigation.

## Evidence before a confident explanation

An explanation should account for the behavior, not merely sound plausible. If a dependency failed, how does that failure reach the user? If a rule rejected the request, was the rule correct for those conditions? If the data was unexpected, where did that expectation come from?

Logs, request details, reproducible inputs and a view of the system flow can help answer those questions. Their value depends on whether they connect the reported behavior to a specific point in the process. More output is not automatically better evidence.

I would also distinguish a temporary recovery from a resolved cause. Restoring an interrupted operation can be necessary before every detail is understood. That does not make the remaining questions unimportant. The team should know what the recovery establishes and what it leaves unexplained.

## A fix carries another set of responsibilities

Once a cause is understood, the proposed change needs a boundary. Which behavior should change? Which behavior should remain intact? What check would have exposed the issue before the change, and what check supports the correction now?

A narrow fix can be valuable when it addresses the cause without introducing unrelated work. But narrow should not mean incomplete. If the same assumption appears in several paths, changing only the visible symptom may leave the underlying problem in place.

QA and support can contribute here. QA helps define conditions around the corrected behavior. Support can explain what the user needs to know and whether the practical interruption has ended. The implementation team should not treat those perspectives as a final formality.

## Close the loop without losing the lesson

Communication matters throughout the investigation. A useful update says what is known, what remains uncertain and what the next action is intended to establish. It avoids presenting a guess as a confirmed cause or a deployed change as proof of recovery.

After the immediate work, I am interested in what would make a similar issue easier to understand next time. That might mean a clearer error response, a missing test, better documentation or a more useful observation at an integration boundary. It does not always require a new tool or a large process change.

Supporting software is part of engineering it. The experience of real use gives the team information that cannot all be predicted at design time. I want that information to improve the system and the way the team works with it, rather than disappear once the urgent conversation ends.
