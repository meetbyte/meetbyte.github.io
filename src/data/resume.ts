import { pageEyebrow } from "@/lib/page-label";
import { routes } from "@/constants/routes";
/** Confirmed career chronology, education and certification. @author meetbyte */
import type { ResumeContent } from "./types";

export const resumeContent: ResumeContent = {
  eyebrow: pageEyebrow(routes.resume, "RESUME"),
  topline: "THE JOURNEY",
  title: "Experience, shown with context.",
  introduction: "My work has grown from building applications to leading a team and delivering complete solutions. I am employed by Streebo and work with client teams on time-and-materials (T&M) assignments. My current engagement with a global financial services client has continued for around four years. Earlier client work spans insurance, banking, telecommunications and education.",
  experienceHeading: "Professional experience",
  educationHeading: "Education",
  certificationsHeading: "Certifications",
  experience: [
    {
      id: "streebo-senior", title: "Senior Technical Consultant", organization: "Streebo",
      period: "January 2024 – Present", location: "Ahmedabad, India · Hybrid · Full-time",
      summary: "In my current client assignment through Streebo, I lead a team and deliver end-to-end solutions across business requirements, system design, implementation, integration and production support. I remain hands-on while coordinating delivery with the client's business, QA and support teams.",
      highlights: [
        "I translate requirements into system flows, high-level designs (HLD) and low-level designs (LLD), and use those designs to align implementation across the team.",
        "I take ownership of technical work independently and guide the team through dependencies, integration decisions and delivery issues.",
        "I introduced Oracle APEX into the stack for low-code business applications with modern interfaces and access controls.",
        "I build role-based portals with Oracle APEX, Angular and Spring Boot, and integrate internal APIs and third-party tools.",
        "I improve delivery and code-quality workflows with Jenkins and SonarQube, working with QA, production support and business teams on reliability and maintainability.",
        "I contribute to credit card application experiences across multiple regions, with SQL, Oracle Database, WebSphere, Liberty and Cordova in the wider stack.",
        "I work with business and customer support teams to understand reported issues, investigate root causes and carry fixes through to resolution.",
        "I created a GitHub Copilot agent for documentation, commenting and code updates under defined conditions and standards, and added GitHub workflows for OWASP dependency checks and code scanning.",
      ],
    },
    {
      id: "streebo-consultant", title: "Technical Consultant", organization: "Streebo",
      period: "January 2021 – December 2023", location: "Ahmedabad, India · Hybrid · Full-time",
      summary: "Through Streebo, I worked on client projects across insurance, banking, education and financial services, developing enterprise web and hybrid applications.",
      highlights: [
        "I developed insurance customer and agent workflows for policy services, payments, document uploads and offline journeys, including MobileFirst adapters, OTP handling and messaging integrations.",
        "I built hybrid features with Angular, Java and MobileFirst and connected services for statements, transfers, payee management and location-based functionality.",
        "I contributed frontend components, adapter updates and migration work to a student and authority application supporting syllabus and schedule access.",
        "I migrated banking services from MobileFirst 8.x to Java and Spring Boot, adapting SQL, HTTP and Java integrations for loan, EMI and payment journeys, with Cordova and APIGEE integration work.",
        "I set up Jenkins pipelines for frontend and backend deployment and collaborated with production support on financial services applications using SonarQube, WebSphere and Liberty.",
      ],
    },
    {
      id: "streebo-associate", title: "Associate Technical Consultant", organization: "Streebo",
      period: "July 2019 – December 2020", location: "Ahmedabad, India · On-site · Full-time",
      summary: "My client work through Streebo included customer and agent applications for a telecommunications provider and a hybrid application migration for a financial services organization.",
      highlights: [
        "I independently led UI development with Angular 8, Ionic, HTML and CSS, including customer and agent journeys, KYC implementation and OCR for document verification.",
        "I contributed to a MobileFirst 7.x to 8.x migration, updating frontend components and server-side adapters and replacing discontinued APIs with Cordova plugins.",
        "I participated in planning, estimation, testing, client queries and cross-team delivery, with REST APIs, SQL, PhoneGap and jQuery Mobile in the project stack.",
      ],
    },
    {
      id: "streebo-intern", title: "Internship Trainee", organization: "Streebo",
      period: "January 2019 – July 2019", location: "Greater Ahmedabad Area, India · On-site · Internship",
      summary: "I contributed to insurance-related projects within a full-stack team and gained exposure to enterprise finance workflows.",
      highlights: [
        "I developed Angular and JavaScript UI components, built Java backend modules and integrated MySQL databases.",
        "I participated in technical training, sprint discussions, code reviews and knowledge-sharing, learning software lifecycle and estimation practices through project work.",
      ],
    },
    {
      id: "silverwing-intern", title: "Internship Trainee", organization: "Silverwing Technologies PVT LTD",
      period: "October 2017 – May 2018", location: "Greater Ahmedabad Area, India · On-site · Internship",
      summary: "I supported dynamic shopping websites, working on frontend design and backend functionality alongside senior developers.",
      highlights: [
        "I built responsive components with HTML, CSS, JavaScript, Bootstrap and AJAX, and implemented PHP backend features.",
        "I wrote SQL queries and worked with databases through phpMyAdmin, building a practical foundation in team-based web development.",
      ],
    },
  ],
  education: [
    { id: "be-it", title: "Bachelor of Engineering (B.E.)", organization: "L.D. College of Engineering", period: "2015 – 2019", summary: "Information Technology" },
    { id: "higher-secondary", title: "Higher secondary", organization: "Mauni Ankur School of Science", period: "2013 – 2015", summary: "Science · Physics, Chemistry and Mathematics", highlights: ["85%"] },
  ],
  certifications: [
    { id: "aws-cloud-practitioner", title: "AWS Certified Cloud Practitioner", organization: "Amazon Web Services (AWS)", period: "Issued April 2025 · Expires April 2028", summary: "Foundational cloud knowledge. My hands-on AWS Lambda and IAM exposure remains exploratory." },
  ],
  emptyExperience: "Professional experience will be added here.",
  emptyEducation: "Education will be added here.",
};
