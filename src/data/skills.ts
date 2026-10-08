import { pageEyebrow } from "@/lib/page-label";
import { routes } from "@/constants/routes";
/** Professional experience, earlier practice and exploration are distinct. @author meetbyte */
import type { SkillsContent } from "./types";

export const skillsContent: SkillsContent = {
  eyebrow: pageEyebrow(routes.skills, "SKILLS"),
  topline: "THE PRACTICE",
  title: "A toolkit shaped by the work.",
  introduction: "My work combines technical leadership with hands-on engineering: understanding the business flow, designing the solution, building and integrating it, and supporting it in production. These are the tools and practices behind that work, with personal exploration labeled separately.",
  emptyCategory: "Skills for this category will be added here.",
  emptyAll: "Skill categories will be added here.",
  categories: [
    {
      id: "full-stack", title: "Full-stack web development",
      description: "I build interfaces and connect them to the services and data behind the user journey.",
      skills: [
        { name: "Angular", note: "Enterprise web and hybrid applications, including Angular 8" },
        { name: "JavaScript" }, { name: "TypeScript" },
        { name: "HTML5 & CSS3", note: "Responsive interfaces and client-side behavior" },
        { name: "Bootstrap & AJAX", note: "Web application development" },
      ],
    },
    {
      id: "backend-api", title: "Backend development & integrations",
      description: "I build services and connect applications to internal and third-party systems.",
      skills: [
        { name: "Java & Spring Boot", note: "Enterprise services and MobileFirst modernization" },
        { name: "Spring MVC" }, { name: "JDBC & JPA" },
        { name: "Java dynamic web projects", note: "Web application development" },
        { name: "Apache Maven", note: "Java project builds and dependencies" },
        { name: "Schedulers", note: "Scheduled application processing" },
        { name: "REST APIs", note: "Service development and integration" },
        { name: "MobileFirst adapters", note: "Java, SQL and HTTP adapters" },
        { name: "APIGEE", note: "Integration during a banking application migration" },
        { name: "Third-party & bureau integrations", note: "Service connections and application data flows" },
      ],
    },
    {
      id: "system-design", title: "System design & engineering fundamentals",
      description: "I translate business requirements into system flows and implementation designs, and work through those decisions with the team.",
      skills: [
        { name: "System flow design", note: "Business journeys, service interactions and data flows" },
        { name: "draw.io", note: "Workflows and end-to-end application journeys" },
        { name: "HLD & LLD", note: "High-level and low-level solution design" },
        { name: "Data structures & algorithms", note: "Engineering fundamentals and implementation choices" },
        { name: "Technical problem solving", note: "Independent implementation and collaborative investigation" },
      ],
    },
    {
      id: "bfsi", title: "BFSI applications & workflows",
      description: "Project experience across banking, financial services and insurance, alongside identity and document workflows in other domains.",
      skills: [
        { name: "OCR implementation", note: "Document recognition and verification workflows" },
        { name: "KYC implementation", note: "Customer identification journeys" },
        { name: "E-voucher workflows" },
        { name: "Credit-card statements & journeys" },
        { name: "Insurance applications", note: "Policy services, customer and agent workflows, payments and documents" },
        { name: "Loan & EMI journeys", note: "Loan status, repayment and payment workflows" },
      ],
    },
    {
      id: "enterprise-hybrid", title: "Enterprise platforms & hybrid apps",
      description: "I develop and modernize applications, including replacing older platform capabilities as systems evolve.",
      skills: [
        { name: "IBM MobileFirst / Worklight", note: "7.x and 8.x development, server setup and migrations" },
        { name: "WebSphere & Liberty", note: "Application Server, Portal and enterprise environments" },
        { name: "Apache Tomcat", note: "Java web application environments" },
        { name: "Ionic & Cordova", note: "Android and iOS hybrid apps and plugin integration" },
        { name: "PhoneGap & jQuery Mobile", note: "Earlier hybrid application and migration work" },
        { name: "Oracle APEX", note: "Business applications and role-based portals" },
      ],
    },
    {
      id: "data", title: "Databases & application data",
      description: "I work with relational data as part of application development and integration.",
      skills: [
        { name: "SQL" }, { name: "Oracle Database" }, { name: "Microsoft SQL Server" },
        { name: "MySQL", note: "Backend and database integration" },
        { name: "SQLite", note: "Earlier application-development experience" },
        { name: "Oracle SQL Developer & phpMyAdmin", note: "Database tools" },
      ],
    },
    {
      id: "delivery", title: "Leadership, delivery & support",
      description: "I lead a team and stay hands-on, connecting business conversations, implementation, release and the work of supporting the solution.",
      skills: [
        { name: "Team leadership", note: "Technical direction and delivery coordination" },
        { name: "End-to-end solution delivery", note: "Requirements, design, development, integration and support" },
        { name: "Business communication", note: "Requirements, design decisions and delivery discussions" },
        { name: "Jenkins", note: "Frontend and backend deployment pipelines" },
        { name: "Git & Bitbucket" }, { name: "Jira & Agile practices", note: "Planning, estimation and delivery coordination" },
        { name: "Production deployment", note: "Collaboration with QA, support and business teams" },
        { name: "Root cause analysis (RCA)", note: "Issue investigation and resolution" },
        { name: "Production & customer support", note: "Understanding reported issues and coordinating fixes" },
        { name: "Technical consultation & documentation" },
      ],
    },
    {
      id: "ai-engineering", title: "AI-assisted engineering & code quality",
      description: "Professional use of AI in the development workflow, alongside automated checks for dependencies and code.",
      skills: [
        { name: "GitHub Copilot agent", note: "Created for documentation, comments and code updates under defined conditions and standards" },
        { name: "GitHub workflows", note: "Added OWASP dependency checks and code scanning" },
        { name: "SonarQube", note: "Code-quality checks in delivery workflows" },
      ],
    },
    {
      id: "earlier-web", title: "Earlier web development",
      description: "My first internship involved shopping websites. These technologies reflect earlier professional experience rather than my current specialism.",
      skills: [
        { name: "PHP", note: "Backend website features" },
        { name: "SQL & phpMyAdmin", note: "Queries and database work" },
        { name: "jQuery, Bootstrap & AJAX", note: "Dynamic and responsive interfaces" },
      ],
    },
    {
      id: "exploring", title: "Deepening practice & exploring",
      description: "Further study and personal projects. Advanced design and algorithm study extends my existing practice; the experimental technologies below are not claimed as professional or production experience. My AWS certification represents foundational cloud knowledge.",
      skills: [
        { name: "Large-scale system design", note: "Studying resilience, robustness and design trade-offs" },
        { name: "Advanced DSA", note: "Deepening algorithmic problem solving" },
        { name: "Python for applied AI", note: "Developing fluency through personal learning" },
        { name: "AI-assisted personal projects", note: "This website and other exploratory projects" },
        { name: "Applied AI", note: "Exploring LLMs, prompting, AI APIs and AI-powered applications" },
        { name: "React", note: "Basic exploratory exposure" },
        { name: "Next.js", note: "Exploring through this website and other personal apps" },
        { name: "React Native", note: "Basic exploratory exposure" },
        { name: "Flutter", note: "Basic exploratory exposure" },
        { name: "Node.js", note: "Basic exploratory exposure" },
        { name: "MongoDB", note: "Basic exploratory exposure" },
        { name: "IBM Watson", note: "Basic exploratory exposure" },
        { name: "AWS Lambda & IAM", note: "Basic exploratory exposure" },
      ],
    },
  ],
};
