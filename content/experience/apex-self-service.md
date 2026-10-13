---
id: "apex-self-service"
title: "Building an Enterprise System from the Ground Up"
slug: "apex-self-service"
summary: "A self-service Oracle APEX platform that turned repeated banking data requests into a governed workflow for segmentation, extraction and scheduled delivery."
category: "Enterprise applications"
status: "published"
seoDescription: "A self-service Oracle APEX platform that turned repeated banking data requests into a governed workflow for segmentation, extraction and scheduled delivery."
placeholder: false
tags: ["Enterprise applications"]
ownerApproval: "Linear MEE-10 owner instruction, comment 84a72fd3-175c-4e10-9337-56b5d8fedd81 (14 October 2026); CR002 presentation, release approval separate"
---
## A data request was also a coordination problem

In a banking environment, a request for a customer segment could begin with a business question: which customers match a particular card, spending pattern or market? Turning that question into usable data required several people to understand and act on it.

The request moved from the business team to the project team for evaluation. We had to understand the scope, the reason for the data and the criteria behind the segment. It then moved to the DBA team for extraction. That coordination created a bottleneck for recurring requests. The problem was larger than writing a query: the process depended on repeated translation between business intent and database work.

I built an Oracle APEX system from the ground up to bring that flow into an application. The aim was to let business users express a request through defined criteria while keeping permissions, sensitive information and operational responsibilities part of the design.

## Turning criteria into a usable workflow

The application supported segmentation around cards, spending and markets. Query-generation pages translated the selected criteria into the data request. Additional-column requirements also had to be accommodated, so the work could not stop at a fixed report with a few hard-coded filters.

I worked on the query-generation pages and the surrounding application flow. The important connection was between what the person asked for and what the query returned. The interface needed to make the request understandable; the database work needed to remain aligned with that request.

That is what made APEX useful in this context. It gave me a way to build the business interface close to the data while still treating the whole operation as an enterprise application. The work included custom HTML/CSS integration, rather than relying only on an untouched default presentation.

## Access was part of the system

I implemented Microsoft LDAP integration for login and built the permission page around User, Supervisor and Admin roles. These were responsibilities within the application, with access boundaries that had to be considered alongside the request flow.

The work also included database security, PII masking and auditing. Those concerns belonged in the design from the beginning because making data retrieval more convenient also made the boundaries around that retrieval more important.

The contribution brought together the application controls, directory integration and permission model. The role model and the data flow needed to be understandable to the people operating the system, not merely present as configuration.

## Recurring requests needed an operational path

Some requirements repeated weekly or monthly. I built scheduling into the system so those requests could follow a recurring file-generation path instead of being coordinated from the beginning each time. Audited actions and scheduled outputs connected the interactive application to the operational work around it.

The solution included exported files, webpage access and email-triggered communications. These served different parts of the workflow: obtaining the result, accessing it through the application and communicating around the process.

My contribution also included server installation. That meant carrying the work beyond the pages and queries into the environment where the application had to run. I was responsible for bringing together the permission page, LDAP integration, query generation, security, scheduling, audit and interface work as one solution.

## What this work changed for me

The result was a self-service application around a workflow that had previously required repeated business, project and DBA coordination.

The experience strengthened my view that enterprise development is about connecting the request, the system and the people around it. The visible interface mattered, but so did the rules behind it and the work required to operate it. Building the system from the ground up meant taking responsibility for those connections, rather than treating each component as a separate completed task.
