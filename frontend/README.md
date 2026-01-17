# GURU Credits Frontend (Next.js 16)

Customer-facing experience for eligibility calculators, services, landing pages, and bilingual content.

> **Geo targeting**: All copy, metadata, and structured data focus on Kuala Lumpur & Selangor (Klang Valley). Sabah/Sarawak leads are intentionally excluded.

## Getting Started

```bash
npm install
cp .env.example .env.local   # configure NEXT_PUBLIC_API_URL
npm run dev
# http://localhost:3000
```

This app reads `NEXT_PUBLIC_API_URL` to call the NestJS API (defaults to `http://localhost:3001/api`), so ensure the backend runs before testing form submissions.

## Scripts

| Script             | Description                                                                 |
| ------------------ | --------------------------------------------------------------------------- |
| `npm run dev`      | Next.js dev server (port 3000)                                              |
| `npm run build`    | Production build                                                            |
| `npm run start`    | Start built app                                                             |
| `npm run lint`     | ESLint                                                                      |
| `npm run test`     | Run Vitest suite (unit/component specs under `src/**/*.{test,spec}.tsx`)    |
| `npm run test:watch` | Vitest in watch mode                                                      |
| `npm run test:e2e` | Playwright smoke tests (requires server on `PLAYWRIGHT_BASE_URL`)           |

## Folder Notes

- `src/app/*` – App Router pages (many currently use client components for interactive widgets).
- `src/components` – UI primitives (shadcn/ui) + marketing sections.
- `src/lib/api.ts` – Axios client for backend endpoints (consider replacing with React Query hooks).
- `scripts/optimize-images.mjs` – helper for compressing `/public/images`.

## Environment

Only a single public variable is required right now:

| Variable             | Description                                   |
| -------------------- | --------------------------------------------- |
| `NEXT_PUBLIC_API_URL`| Base URL for backend API (e.g. `http://localhost:3001/api`) |

Copy `.env.example` to `.env.local`, adjust per environment, and keep real secrets out of git.

## Testing

- **Vitest** – run `npm run test` (or `npm run test:watch`) for schema + component tests. `vitest.config.ts` limits the test glob to `src` so node_modules aren't picked up anymore.
- **Playwright** – first run `npx playwright install --with-deps` to install the browsers, start the app (`npm run dev` or `npm run start`) and then execute `npm run test:e2e`. Override the target with `PLAYWRIGHT_BASE_URL` if the site is not on `http://localhost:3000`.
