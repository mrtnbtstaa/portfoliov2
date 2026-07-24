"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { ExternalLink, Github } from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { mockProjects } from "@/data/projects";
import { PROJECT_CATEGORIES, useUIStore } from "@/store/useUIStore";
import type { Project, ProjectRow } from "@/types";

function normalize(row: ProjectRow): Project {
  return {
    id: row.id,
    category: row.category,
    title: row.title,
    description: row.description,
    image: row.image,
    stack: row.stack,
    liveUrl: row.live_url,
    githubUrl: row.github_url,
  };
}

async function fetchProjects(): Promise<Project[]> {
  if (!isSupabaseConfigured || !supabase) return mockProjects;

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  // Graceful fallback any Supabase error, or an empty table, still
  // renders something meaningful instead of a blank/broken section.
  if (error || !data || data.length === 0) return mockProjects;
  return (data as ProjectRow[]).map(normalize);
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex flex-col h-fit overflow-hidden rounded-lg border border-border bg-surface transition-colors hover:border-cyan/40">
      <div className="relative aspect-video w-full overflow-hidden bg-surface-raised">
        <Image
          src={project.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-lg font-semibold text-heading">{project.title}</h3>
        <p className=" flex-1 text-sm leading-relaxed text-body">{project.description}</p>

        <ul className="flex flex-wrap gap-2 pt-1">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded border border-border bg-surface-raised px-2 py-1 font-mono text-[11px] text-cyan"
            >
              {tech}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4 pt-2 font-mono text-xs uppercase tracking-wide">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-heading hover:text-cyan"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-heading hover:text-cyan"
            >
              <Github className="h-3.5 w-3.5" />
              GitHub
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const activeCategory = useUIStore((s) => s.activeCategory);
  const setActiveCategory = useUIStore((s) => s.setActiveCategory);

  const {
    data: projects = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  const filtered = activeCategory === "All" ? projects : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="border-b border-border px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan">02 / projects</p>
        <h2 className="mt-3 text-3xl font-bold text-heading sm:text-4xl">Selected work</h2>

        <div className="mt-8 flex flex-wrap gap-2">
          {PROJECT_CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              aria-pressed={activeCategory === category}
              className={`rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-widest transition-colors ${
                activeCategory === category
                  ? "border-cyan bg-cyan/10 text-cyan"
                  : "border-border text-muted hover:text-heading"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {isLoading && <p className="mt-12 font-mono text-sm text-muted">Loading projects…</p>}

        {isError && (
          <p className="mt-12 font-mono text-sm text-muted">
            Couldn&apos;t reach the project feed — showing local project data instead.
          </p>
        )}

        {!isLoading && (
          <div className="mt-10 columns-1 gap-6 sm:columns-2 lg:columns-3 space-y-6">
            {filtered.map((project) => (
              <div key={project.id} className="break-inside-avoid">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        )}

        {!isLoading && filtered.length === 0 && (
          <p className="mt-12 font-mono text-sm text-muted">No projects in this category yet.</p>
        )}
      </div>
    </section>
  );
}
