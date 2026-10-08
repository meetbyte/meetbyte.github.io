/**
 * @file Editable sample case studies. Replace these with verified work.
 * @author meetbyte
 */
import type { Project } from "./types";

export const projects: readonly Project[] = [
  {
    slug: "workflow-workspace", title: "Workflow workspace", placeholder: true, featured: true,
    category: "Application concept", summary: "A sample workspace for following a request from intake to review, with a clear place for each next action.",
    stack: ["TypeScript", "React", "Design systems"], visual: "workflow",
    overview: "This is a fictional case study showing how future projects can be presented. It does not describe a delivered client application or a professional achievement.",
    sections: [
      { id: "context", title: "Context & problem", paragraphs: ["In this sample scenario, requests arrive through several channels and the next action is difficult to find. The concept brings status, ownership and review into one interface."] },
      { id: "role", title: "Role & scope", paragraphs: ["Placeholder for the actual contribution, collaborators and scope. Replace this section with verified details when publishing real work."] },
      { id: "architecture", title: "Architecture", paragraphs: ["The concept separates the presentation layer, workflow state and data adapter. The interface consumes a normalized request model so its storage can change independently."], bullets: ["Interface → workflow model → content adapter", "A shared set of states for consistent status presentation", "Accessible controls and explicit next actions"] },
      { id: "decisions", title: "Engineering decisions", paragraphs: ["Prefer an explicit status history over a dense dashboard. Keep important decisions close to the request and make empty states explain what happens next."] },
      { id: "outcome", title: "Outcome & lessons", paragraphs: ["No delivery results or metrics are claimed for this sample. A real case study can document the outcome, tradeoffs and lessons once supporting evidence is available."] },
    ],
  },
  {
    slug: "learning-notebook", title: "Learning notebook", placeholder: true,
    category: "Publishing concept", summary: "A sample reading space for technical notes, practical examples and ideas worth returning to.",
    stack: ["Markdown", "Next.js", "Static export"], visual: "notebook",
    overview: "A fictional publishing concept used to demonstrate a shorter case study. Optional sections and links can be omitted without leaving empty containers.",
    sections: [
      { id: "problem", title: "The idea", paragraphs: ["Keep writing simple to maintain while giving readers a calm, readable place to follow an idea from question to example."] },
      { id: "solution", title: "A possible approach", paragraphs: ["Store notes as Markdown, normalize their metadata through a small content adapter, and generate each article before deployment. The reading interface stays independent of the storage format."] },
      { id: "lessons", title: "What a real case study would add", bullets: ["The specific problem and constraints", "The actual implementation and contribution", "Evidence of outcomes and lessons learned"] },
    ],
  },
];
