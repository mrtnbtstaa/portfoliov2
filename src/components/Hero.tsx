import { ArrowRight, Mail } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-border px-6 pb-24 pt-20 sm:pt-28"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <div className="absolute -top-32 -left-24 h-112 w-md rounded-full bg-cyan/20 blur-[110px] shader-field" />
        <div className="absolute -bottom-40 -right-24 h-104 w-104 rounded-full bg-indigo/25 blur-[110px] shader-field-alt" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,var(--color-bg)_92%)]" />
      </div>

      <div className="mx-auto max-w-4xl">
        <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-cyan">
          $ whoami — Software Developer
        </p>

        <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-heading sm:text-5xl lg:text-6xl">
          Building Web & Mobile Applications{" "}
          <span className="bg-linear-to-r from-cyan to-indigo bg-clip-text text-transparent">
            &amp; Interactive Digital Experiences
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-body sm:text-lg">
          Passionate software developer crafting scalable applications and
          immersive user experiences. Driven by complex challenges, clean
          architecture, and continuous learning across modern web and mobile
          technologies.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-md bg-cyan px-5 py-3 font-mono text-sm font-medium text-bg transition-transform hover:-translate-y-0.5"
          >
            Explore Work
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="/assets/Martin_Bautista_CV.pdf"
            className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-3 font-mono text-sm font-medium text-heading transition-colors hover:border-cyan/50 hover:text-cyan"
          >
            {/* <Mail className="h-4 w-4" /> */}
            Resume 
          </a>
        </div>
      </div>
    </section>
  );
}
