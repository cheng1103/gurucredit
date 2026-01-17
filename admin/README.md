## GURU Credits Admin (Next.js 16)

Internal dashboard used by consultants to monitor applications, leads, contact messages, newsletters, etc.

## Getting Started

```bash
npm install
cp .env.example .env.local    # configure API + demo flags
npm run dev                   # listens on http://localhost:3002
```

Environment flags:

| Variable                        | Description                                    |
| ------------------------------ | ---------------------------------------------- |
| `NEXT_PUBLIC_API_URL`          | Backend API base URL                           |
| `NEXT_PUBLIC_ALLOW_OFFLINE_ADMIN` | Enables local/demo mode without backend      |
| `NEXT_PUBLIC_DEMO_EMAIL/PASSWORD` | Credentials required when offline mode is on|

Real deployments should disable offline mode and rely on JWT tokens issued by the backend.

## Scripts

| Script            | Description                             |
| ----------------- | --------------------------------------- |
| `npm run dev`     | Dev server on port 3002                 |
| `npm run build`   | Production build                        |
| `npm run start`   | Start built app                         |
| `npm run lint`    | ESLint                                  |

## Auth Flow

- Login form calls `POST /auth/login` on the backend (`src/lib/api.ts`).
- Tokens are currently stored in `localStorage` and attached via axios interceptor.
- `src/components/AdminLayout.tsx` redirects visitors to `/login` if `useAuthStore` has no token.

For production, plan to migrate to HTTP-only cookies / server-side route protection.
