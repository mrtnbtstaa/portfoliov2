# dev.portfolio (Next.js + TypeScript)

A minimalist, high-contrast developer portfolio for a full-stack & game developer, built with Next.js 16 (App Router) and TypeScript.

## Stack

- **Next.js 16 (App Router) + TypeScript** — app shell, routing, and full type safety
- **Tailwind CSS v4** — styling, via `@tailwindcss/postcss` (design tokens live in `src/app/globals.css`)
- **Zustand** (`src/store/useUIStore.ts`) — single, typed UI-only store for the project category filter and mobile menu state
- **TanStack Query** — data fetching for projects (`Projects.tsx`) and the contact form mutation (`ContactForm.tsx`), wired up via a client `Providers` component in `src/app/providers.tsx`
- **Zod** (`src/schemas/contact.ts`) — contact form validation, with the form's TypeScript type inferred directly from the schema (`z.infer`)
- **Supabase** (`src/lib/supabase.ts`) — optional, typed backend for the `projects` and `messages` tables
- **next/image** — optimized project images (remote patterns configured in `next.config.ts`)
- **next/font** — self-hosted Inter + JetBrains Mono, no layout shift

## Getting started

```bash
npm install
npm run dev
```

> **Note:** `next/font/google` fetches font files from Google Fonts at build
> time, so `npm run build` needs outbound internet access. This is normal
> for any real dev machine or CI/deploy environment — it just won't work
> from a fully network-isolated sandbox.

## Type safety

Run `npx tsc --noEmit` any time to type-check without building. All data
shapes (`Project`, `ContactPayload`, Supabase row shapes) live in `src/types/index.ts`
and `src/schemas/contact.ts`, so the compiler will catch a mismatch between
what Supabase returns and what components expect.

## Connecting Supabase (optional)

The app works fully without Supabase — it renders local mock project data and
simulates a successful contact form submission. To wire up a real backend:

1. Copy `.env.example` to `.env.local`.
2. Fill in `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` from your Supabase project settings (the `NEXT_PUBLIC_` prefix is required since these are read client-side).
3. Create a `projects` table with columns matching `ProjectRow` in `src/types/index.ts`: `id`, `category`, `title`, `description`, `image`, `stack` (array), `live_url`, `github_url`, `created_at`.
4. Create a `messages` table with `name`, `email`, `message` columns to receive contact form submissions.
5. If you serve project images from Supabase Storage, add that hostname to `remotePatterns` in `next.config.ts`.

If the env vars are missing, or a Supabase query errors or returns no rows,
the app automatically falls back to the local mock data — it never crashes.

## Project structure

```
src/
  app/
    layout.tsx      root layout — fonts, metadata, <Providers>
    providers.tsx    "use client" wrapper mounting QueryClientProvider
    page.tsx         page composition
    globals.css       Tailwind v4 import + design tokens
  components/         Navbar, Hero, Projects, TechStack, About, ContactForm, Footer
  store/               useUIStore.ts — typed Zustand UI state
  lib/                 supabase.ts — typed client with graceful fallback
  data/                projects.ts — local mock/fallback project data
  schemas/             contact.ts — Zod schema + inferred type
  types/               index.ts — Project, ProjectRow, ContactPayload types
```

## Scripts

- `npm run dev` — start the dev server (Turbopack)
- `npm run build` — production build to `.next/`
- `npm run start` — serve the production build
- `npm run lint` — ESLint
- `npx tsc --noEmit` — type-check only
