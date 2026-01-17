# GURU Credits

Professional Loan Consultation and Credit Analysis Services

## Project Structure

```
guru-credits/
├── frontend/     # Next.js 16 + shadcn/ui - Customer-facing website
├── backend/      # NestJS - API server
└── admin/        # Next.js 16 + shadcn/ui - Admin dashboard
```

## Services Offered

### Eligibility Analysis Package (RM30)
- Credit report analysis
- DSR calculation
- Approval chances assessment
- Loan limit estimate
- Issue identification
- Bank/agency recommendation
- Full explanation & guidance

## Service Coverage Focus

The current SEO, copy, and structured data are geo-targeted to Greater Kuala Lumpur—specifically Kuala Lumpur and Selangor (Klang Valley). Leads from Sabah/Sarawak are intentionally excluded from the funnels and marketing pages.

## Tech Stack

- **Frontend**: Next.js 16, React 19, Tailwind CSS 4, shadcn/ui
- **Backend**: NestJS, Prisma, MongoDB
- **Admin**: Next.js 16, React 19, Tailwind CSS 4, shadcn/ui

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB database

### Installation

1. Install all dependencies:
```bash
npm run install:all
```
> The workspace `prepare` hook will automatically run `npm run build:shared`, ensuring `packages/shared-config` compiles its `dist/` output and the linker copies it into each app's `node_modules/@guru/shared-config`.

2. Set up environment variables:

**Backend** (`backend/.env`):
```env
DATABASE_URL="mongodb+srv://user:password@cluster0.example.mongodb.net/guru_credits?retryWrites=true&w=majority"
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
JWT_EXPIRES_IN="7d"
PORT=3001
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-smtp-user
SMTP_PASS=your-smtp-pass
SMTP_SECURE=false
SMTP_FROM="GURU Credits <no-reply@gurucredits.my>"
COMPANY_WHATSAPP="+601127486389"
CORS_ORIGINS="http://localhost:3000,http://localhost:3002"
ENABLE_SWAGGER=true
```
> Copy `backend/.env.example` to `backend/.env` before editing. Set `DATABASE_URL` to your MongoDB connection string (MongoDB Atlas or Railway Mongo). Update it with real credentials in staging/production.
> In production the API will refuse to boot unless `CORS_ORIGINS` lists the exact HTTPS origins you trust (no `*`), and Swagger should remain disabled unless it is behind VPN/basic auth.

**Frontend** (`frontend/.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
# Optional CSP overrides (comma-separated domains, no protocol wildcards)
# NEXT_PUBLIC_CSP_SCRIPT_SRC=https://static.example.com
# NEXT_PUBLIC_CSP_SCRIPT_HASHES=sha256-AnotherHash
# NEXT_PUBLIC_CSP_CONNECT_SRC=https://analytics.example.com
# NEXT_PUBLIC_CSP_IMG_SRC=https://cdn.example.com
# NEXT_PUBLIC_CSP_STYLE_SRC=https://fonts.googleapis.com
# NEXT_PUBLIC_CSP_STYLE_HASHES=sha256-Base64Hash
# NEXT_PUBLIC_CSP_REPORT_URI=https://csp.example.com/report
# NEXT_PUBLIC_CSP_REPORT_TO=https://csp.example.com/report
# NEXT_PUBLIC_CSP_REPORT_ONLY=true
```

**Admin** (`admin/.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

3. Set up database:
```bash
cd backend
npx prisma generate
npx prisma db push
```

4. Start development servers:
```bash
# From root directory - starts all servers
npm run dev

# Or start individually:
npm run dev:backend   # http://localhost:3001
npm run dev:frontend  # http://localhost:3000
npm run dev:admin     # http://localhost:3002
```

## Production Builds

Run the aggregated build for all workspaces:

```bash
npm run build
```

### Security headers & CSP

Both Next.js apps emit strict security headers (HSTS, Referrer-Policy, X-Frame-Options, etc.) and a locked-down Content Security Policy:

- `style-src 'self'` (inline styles removed from the React codebase)
- `script-src 'self'` plus optional domains from `NEXT_PUBLIC_CSP_SCRIPT_SRC`
- `connect-src 'self'` plus `NEXT_PUBLIC_API_URL` and any extra domains from `NEXT_PUBLIC_CSP_CONNECT_SRC`
- `img-src 'self' data: https:` plus optional `NEXT_PUBLIC_CSP_IMG_SRC`

If you need to enable third-party widgets or analytics, set the corresponding `NEXT_PUBLIC_CSP_*` env vars before building so the CSP header whitelists those endpoints. Mirror the same headers at your CDN / WAF layer to avoid losing them if the Node.js process becomes unavailable.

- Allow CSS CDNs/fonts with `NEXT_PUBLIC_CSP_STYLE_SRC` rather than broadening the directive globally.
- If inline CSS or JS is unavoidable, hash the snippet via `scripts/generate-csp-hash.sh 'body{display:none}'` and drop the resulting `sha256-...` token inside `NEXT_PUBLIC_CSP_STYLE_HASHES` or `NEXT_PUBLIC_CSP_SCRIPT_HASHES` instead of reintroducing `'unsafe-inline'`.
- Capture violations ahead of time with `NEXT_PUBLIC_CSP_REPORT_URI` / `NEXT_PUBLIC_CSP_REPORT_TO`. Set `NEXT_PUBLIC_CSP_REPORT_ONLY=true` during rollout so the browser reports policy hits without blocking while you tune the directives.

Next.js 16 may emit `Operation not permitted` when Turbopack workers start in some containers/CI hosts. If that happens, build each app individually and disable Turbopack explicitly:

```bash
npm run build:shared
(cd backend && npm run build)
(cd frontend && TURBOPACK=0 npm run build)
(cd admin && TURBOPACK=0 npm run build)
```

## Testing

From the repository root you can run consolidated quality checks:

```bash
npm run lint   # Runs eslint in backend, frontend, and admin
npm run test   # Runs backend Jest suite and both Next.js Vitest suites
npm run ci     # Convenience alias for lint -> test -> build
```

- **Frontend**: `cd frontend && npm run test` (Vitest). For Playwright smoke tests (`npm run test:e2e`) start the Next.js server first and run `npx playwright install --with-deps` once to install browsers.
- **Backend**: `cd backend && npm run test` (unit) or `npm run test:e2e`.
- **Deployment healthcheck**: `./scripts/healthcheck.sh https://api.yourdomain.com/api/health ok`
- **Secrets/CORS sanity check**: `NODE_ENV=production CORS_ORIGINS="https://app.example.com,https://admin.example.com" PII_ENCRYPTION_KEY=... JWT_SECRET=... ./scripts/check-backend-env.sh`
- **CSP hash helper**: `./scripts/generate-csp-hash.sh 'body{color:#fff}'`

## URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001/api
- **API Docs**: http://localhost:3001/api/docs
- **Admin Panel**: http://localhost:3002

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user

### Services
- `GET /api/services` - Get all active services
- `GET /api/services/:id` - Get service by ID

### Applications
- `POST /api/applications` - Create application
- `GET /api/applications` - Get user's applications
- `GET /api/applications/:id` - Get application details

### Credit Analysis
- `POST /api/credit-analysis/dsr` - Calculate DSR
- `POST /api/credit-analysis/eligibility` - Assess loan eligibility

## Creating Admin User

To create an admin user, you can use the API directly or add to the seed script.

## License

Proprietary - GURU Credits
