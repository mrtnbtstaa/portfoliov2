import { Code2, Database, type LucideIcon } from "lucide-react";

interface StackGroup {
  label: string;
  icon: LucideIcon;
  items: string[];
}

const STACK: StackGroup[] = [
  {
    label: "Frontend & Web",
    icon: Code2,
    items: ["React", "NextJS", "Tailwind CSS", "Zustand", "TanStack Query", "Zod"],
  },
  {
    label: "Backend & DB",
    icon: Database,
    items: ["Python", "Django REST", "Supabase (PostgreSQL)", "Mysql", "Prisma ORM"],
  },
  {
    label: "Programming Languages",
    icon: Code2,
    items: ["Python", "C#", "Java", "Javascript", "Dart", "PHP"],
  }
];

export default function TechStack() {
  return (
    <section id="stack" className="border-b border-border px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan">03 / stack</p>
        <h2 className="mt-3 text-3xl font-bold text-heading sm:text-4xl">Tech stack</h2>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STACK.map(({ label, icon: Icon, items }) => (
            <div
              key={label}
              className="rounded-lg border border-border bg-surface p-5 transition-colors hover:border-indigo/40"
            >
              <div className="mb-4 flex items-center gap-2">
                <Icon className="h-4 w-4 text-indigo" strokeWidth={2} aria-hidden="true" />
                <h3 className="font-mono text-xs uppercase tracking-widest text-heading">
                  {label}
                </h3>
              </div>
              <ul className="flex flex-col gap-2">
                {items.map((item) => (
                  <li key={item} className="font-mono text-sm text-body">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
