export type ProjectCategory = "Web" | "Mobile" | "Backend & API";

export interface Project {
  id: string;
  category: ProjectCategory;
  title: string;
  description: string;
  image: string;
  stack: string[];
  liveUrl: string | null;
  githubUrl: string | null;
}

export interface ProjectRow {
  id: string;
  category: ProjectCategory;
  title: string;
  description: string;
  image: string;
  stack: string[];
  live_url: string | null;
  github_url: string | null;
  created_at?: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}
