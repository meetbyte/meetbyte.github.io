import { pageEyebrow } from "@/lib/page-label";
import { routes } from "@/constants/routes";
/** Professional story, working approach and personal interests. @author meetbyte */
import type { AboutContent } from "./types";

export const aboutContent: AboutContent = {
  eyebrow: pageEyebrow(routes.about, "ABOUT"),
  topline: "HOW I THINK AND WORK",
  title: "Good software starts with understanding the problem.",
  introduction: "I'm Meet, a software engineer and Senior Technical Consultant with Streebo. I work on client assignments, where I lead a team and help take solutions from the first conversation through design, development and delivery.",
  biography: [
    "When I was younger, Facebook and Google made me curious about software. On a 2G connection, even reloading a page took patience. Yet one webpage could connect people, and a simple search could bring back information from across the web. I kept wondering how so much could happen behind a click. That curiosity is where my interest in software began.",
    "My work began with shopping websites at Silverwing Technologies. I joined Streebo as an intern in 2019, and my client work grew from interfaces and hybrid applications into backend services, integrations and system design. For around four years, I have been working with a global financial services client through Streebo. Earlier assignments took me into insurance, banking, telecommunications and education.",
    "I still like looking beyond what's on the screen: understanding the service behind it, the business rule behind a requirement, or why something behaves differently in production. The questions have grown with the work, but the curiosity has stayed.",
  ],
  storySections: [
    {
      id: "leadership", title: "Working through it, together",
      paragraphs: [
        "I enjoy the shared thinking that happens when a team works through a problem. Sometimes I'm writing code or reviewing a design; other times I'm discussing requirements with a business team or working with developers and QA on the next step. I want the reasoning behind a decision to be clear enough for others to question it and build on it.",
        "Some moments that stay with me are the late nights around an urgent production issue: the team sharing pizza and working through the problem together. There's pressure to get things working again, but there's also the satisfaction of figuring it out as a team.",
        "After the immediate fix, I want to understand the cause and work towards a better solution. Those nights capture something I value about this work: taking responsibility, helping each other and leaving things better than we found them.",
      ],
    },
    {
      id: "ai-engineering", title: "Small improvements matter, too",
      paragraphs: [
        "Some of my work is about improving the everyday development process. In my client work, I created a GitHub Copilot agent to help with documentation, comments and code updates that follow the team's standards. I also added dependency checks and code scanning to the team's GitHub workflows. These are practical ways I've brought new tools into the development process.",
        "This website is another place to explore. It gives me something personal to build, revisit and improve as I learn more about AI-assisted development.",
      ],
    },
    {
      id: "journey", title: "Still curious about what's next",
      paragraphs: [
        "My projects have included customer verification, document processing, e-vouchers and insurance applications. Across them, I've taken on more responsibility for both the engineering and the people doing it. I want to keep growing in both directions: understanding larger systems and becoming better at helping a team build them.",
        "I'm open to opportunities in India, international remote roles and relocation abroad. I'd enjoy meeting people who care about useful software, thoughtful decisions and learning from each other.",
      ],
    },
  ],
  placeholder: "My professional story will be added here.",
  expertiseHeading: "What I bring to a project",
  expertise: [
    { title: "Team leadership", description: "Helping the team make decisions, work through problems and carry a solution from requirements to release." },
    { title: "System design", description: "Turning requirements into clear application designs and working through how services and data connect." },
    { title: "Full-stack development", description: "Building and improving enterprise applications with Angular, Java, Spring Boot and IBM platforms." },
  ],
  emptyExpertise: "Areas of practice will be added here.",
  interestsHeading: "Beyond software",
  interests: ["Reading", "Philosophy", "Writing", "Chess", "Exploring ideas"],
  interestsIntroduction: "Away from the code, I make room for reading, philosophy, writing and chess. I enjoy exploring a question without needing an immediate answer, and conversations that leave me with a different way to look at it.",
  learningHeading: "What I am exploring",
  learningIntroduction: "I am going deeper into large-scale system design and advanced problem solving, alongside using Python and AI tools in personal projects.",
  currentLearning: ["Large-scale system design", "Resilience and design trade-offs", "Advanced DSA and problem solving", "Python for applied AI", "LLMs, prompting and AI APIs"],
  emptyInterests: "Personal interests will be added here.",
  emptyLearning: "Current learning will be added here.",
};
