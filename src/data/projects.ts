import type { Project } from "@/types";

// Local fallback data. Used whenever Supabase isn't configured, or if the
// `projects` table query fails/returns empty — the projects grid should
// never be empty or throw.
export const mockProjects: Project[] = [
  {
    id: "quantumways",
    category: "Web",
    title: "Quantumways Builders Inventory",
    description:
      "Developed a RESTful API for QuantumWays Builders to centralize the lifecycle of construction resources within a unified management system. This digital backbone replaces manual, error-prone tracking with a structured data environment, ensuring strict data integrity and secure resource oversight.",
    image: "/assets/quantumways.png",
    stack: ["Python", "Django", "Django Rest Framework", "PostgreSQL", "SimpleJWT"],
    liveUrl: "https://qwb-inventory-web-v2.vercel.app/auth/login",
    githubUrl: "https://github.com/mrtnbtstaa/quantumways-api",
  },
  {
    id: "kidneycare",
    category: "Web",
    title: "Kidneycare",
    description:
      "Scalable Django REST backend replacing spreadsheet workflows with automated ORM data linking, optimized endpoints, and role-based access for a multi-site repair operation.",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop",
    stack: [
      "Python",
      "Django",
      "Django REST Framework",
      "PostgreSQL",
      "Websocket",
      "SimpleJWT"
    ],
    liveUrl: "https://kidneycare-web.vercel.app/auth/login",
    githubUrl: "https://github.com/mrtnbtstaa/kidneycare-api",
  },
  {
    id: "featurehub",
    category: "Web",
    title: "FeatureHub",
    description:
      "FeatureHub is a full-stack web application that enables users to submit feature requests, vote on ideas they want to see implemented, and participate in discussions through comments. The platform provides a centralized space for collecting community feedback and allows users to discover, support, and engage with product ideas. Users can securely authenticate using either traditional email/password authentication or Google OAuth, create and publish feature requests, upvote existing suggestions, and discuss each feature through a dedicated comment section. The application also includes search, filtering, and a public roadmap that organizes feature requests by their current status, making it easy to track development progress.",
    image: "/assets/featurehub.png",
    stack: [
      "NextJS",
      "React",
      "Supabase",
      "PostgreSQL",
      "Prisma",
      "Zod",
      "Tanstack Query",
      "Tailwiind",
      "Zustand",
    ],
    liveUrl: null,
    githubUrl: "https://github.com/mrtnbtstaa/FeatureHub",
  },
];
