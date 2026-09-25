# GURU Credits — Production Deployment

Domain: **guru-credit.com**

| App | Stack | Platform | Domain |
|---|---|---|---|
| Frontend | Next.js 16 | Vercel | `guru-credit.com` + `www.guru-credit.com` |
| Admin | Next.js 16 | Vercel | `admin.guru-credit.com` |
| Backend | NestJS + Prisma + MongoDB | Railway | `api.guru-credit.com` |
| Database | MongoDB Atlas | Atlas cloud | — |

---

## 0. Pre-flight (done once)

Run locally once:

```bash
# Generate production secrets — keep these somewhere safe (1Password, notes.app)
openssl rand -hex 32       # → JWT_SECRET
openssl rand -base64 32    # → PII_ENCRYPTION_KEY
```

## 1. MongoDB Atlas

1. Atlas console → **Network Access** → Add IP: `0.0.0.0/0` (Railway egress IP is dynamic, so allow-all is the simplest route; combine with strong DB user credentials).
2. Atlas console → **Database Access** → Create user `guru_credits_prod` with `readWrite` on `guru_credits` db. Save password.
3. Cluster → Connect → **Drivers** → copy the SRV URI. Replace `<password>` with the user password:
   ```
   mongodb+srv://guru_credits_prod:<password>@gurucredit.lmjhkue.mongodb.net/guru_credits?retryWrites=true&w=majority
   ```

## 2. Backend → Railway

```bash
cd backend
railway login                 # opens browser, one-time
railway init                  # create a new project or link existing
railway up                    # first deploy
```

Then in Railway dashboard → **Variables** tab, set:

```
DATABASE_URL=mongodb+srv://guru_credits_prod:***@gurucredit.lmjhkue.mongodb.net/guru_credits?retryWrites=true&w=majority
JWT_SECRET=<openssl rand -hex 32>
JWT_EXPIRES_IN=7d
PII_ENCRYPTION_KEY=<openssl rand -base64 32>
NODE_ENV=production
PORT=3001
HOST=0.0.0.0
CORS_ORIGINS=https://guru-credit.com,https://www.guru-credit.com,https://admin.guru-credit.com
ENABLE_SWAGGER=false
COMPANY_WHATSAPP=+601127486389
SMTP_FROM=GURU Credits <no-reply@guru-credit.com>
# Optional SMTP (only if you actually send emails):
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
SMTP_SECURE=false
```

### Build & start commands in Railway

Service settings → **Build**:

```
npm install && npx prisma generate && npm run build
```

Service settings → **Deploy** → **Start command**:

```
npm run start:prod
```

Service settings → **Networking** → **Health check path**: `/api/health`

Custom domain: add `api.guru-credit.com` → Railway gives a CNAME target, add it to DNS (step 5).

### Seed the database

Once the service is live, from your laptop:

```bash
cd backend
DATABASE_URL="<same atlas URL>" npm run db:seed
```

Or create an admin user via `POST /api/auth/register` with body `{ email, password, name, role: 'SUPER_ADMIN' }` (easier via Postman/Insomnia).

## 3. Frontend → Vercel

```bash
# Run from the REPO ROOT — the Vercel project `guru-credit-frontend` has Root Directory = frontend,
# so the CLI must be invoked one level above it. Link once, then deploy:
vercel link --yes --project guru-credit-frontend
vercel --prod --yes
```

> ⚠️ Do NOT deploy from a `.vercel/` link that points at the project named `frontend` — that project serves **mudah-credit.com**, a different brand.

During link setup, when asked "What's your project name?" use `guru-credit-frontend`.

Vercel dashboard → Settings → **Environment Variables**:

```
NEXT_PUBLIC_API_URL=https://api.guru-credit.com/api
NEXT_PUBLIC_SITE_URL=https://guru-credit.com
NEXT_PUBLIC_LOCALE_PREFIX_ENABLED=true
LOCALE_SIG_SECRET=<openssl rand -base64 32>
# Optional Search Console + Bing verification:
NEXT_PUBLIC_GSC_VERIFICATION=
NEXT_PUBLIC_BING_VERIFICATION=
```

**`NEXT_PUBLIC_LOCALE_PREFIX_ENABLED`** is inlined at **build** time, not read at
runtime. If it is missing (or not exactly the string `true`) when the production
build runs, the deploy ships the *dormant* build: `/ms/*` 404s, the sitemap loses
all 97 Malay URLs, and nothing in the test suite fails, because every `/ms`
assertion is gated on the flag being live. Change it in the Vercel dashboard and
then **redeploy** — a variable change alone does not rebuild. Run
`scripts/verify-live.sh` (§6) after every deploy to catch this.

**`LOCALE_SIG_SECRET`** (not `NEXT_PUBLIC_` — it must never reach the client) keys
the HMAC that `src/proxy.ts` uses to sign the internal `x-gc-locale`/`x-gc-path`
headers it carries across the `/ms/<path>` → `/<path>` rewrite. It is optional:
without it the proxy generates a random key per process, which is still
fail-closed, but the signature would not verify if the two middleware passes ever
executed in different isolates (cold start, different region) — and the failure
mode is `/ms/<path>` silently rendering English with an English canonical. Set it
once, to any high-entropy string, and leave it alone; rotating it is safe (it is
only ever compared against itself within a single request).

Settings → **Domains** → add:
- `guru-credit.com` (mark as Production)
- `www.guru-credit.com` → **Redirect to** `guru-credit.com` (301)

## 4. Admin → Vercel

```bash
cd admin
vercel --prod
```

Project name suggestion: `guru-credit-admin`.

Vercel dashboard → Settings → **Environment Variables**:

```
NEXT_PUBLIC_API_URL=https://api.guru-credit.com/api
NEXT_PUBLIC_ALLOW_OFFLINE_ADMIN=false
NEXT_PUBLIC_DEMO_EMAIL=
NEXT_PUBLIC_DEMO_PASSWORD=
```

Settings → **Domains** → add `admin.guru-credit.com`.

## 5. DNS (at your domain registrar)

After the three services are deployed, add these records at your registrar (Namecheap / GoDaddy / Cloudflare / wherever guru-credit.com is registered):

| Type | Name | Value | TTL |
|---|---|---|---|
| A | `@` (or empty) | `76.76.21.21` (Vercel anycast — Vercel will show the exact IP on the Domains tab) | 300 |
| CNAME | `www` | `cname.vercel-dns.com` | 300 |
| CNAME | `admin` | `cname.vercel-dns.com` | 300 |
| CNAME | `api` | `<your-railway-domain>.up.railway.app` | 300 |

Each service (Vercel frontend, Vercel admin, Railway backend) will show the exact CNAME target once you add the custom domain in their dashboard — use the target they give you, not a guess.

SSL is automatic on both Vercel and Railway (Let's Encrypt). Wait 5–30 minutes after DNS propagates for cert issuance.

## 6. Post-deploy smoke tests

```bash
# Backend
curl -sS https://api.guru-credit.com/api/health | jq
curl -sS https://api.guru-credit.com/api/health/ready | jq

# Frontend
curl -I https://guru-credit.com | head
curl -I https://www.guru-credit.com | head   # should redirect to apex

# Admin
curl -I https://admin.guru-credit.com/login
```

### Bilingual (`/ms`) gate — REQUIRED, run on every frontend deploy

```bash
cd frontend
bash scripts/verify-live.sh https://guru-credit.com
```

Exits non-zero if any of these is wrong, so it is safe to wire into a release
script:

- `/ms/glossary` returns `200` and carries `<html lang="ms">`
- `/sitemap.xml` lists at least 90 `<loc>` entries under `/ms/`
- `/` self-canonicalises to the origin
- `/ms/faq`'s `FAQPage` `@id` starts with `https://guru-credit.com/ms/`

A failure here almost always means the production build was made without
`NEXT_PUBLIC_LOCALE_PREFIX_ENABLED=true` (see §3) — fix the variable and
redeploy, do not just re-run the script.

### Pre-deploy: run the e2e suite in production-parity mode

```bash
cd frontend
npm run build && npm run start &        # or point at a preview deployment
EXPECT_LOCALE_PREFIX=1 PLAYWRIGHT_BASE_URL=http://127.0.0.1:3000 npm run test:e2e:ms -- --project=chromium
```

`test:e2e:ms` sets `EXPECT_LOCALE_PREFIX=1`. Without it, a server built with the
locale flag off makes the entire `/ms` surface pass **vacuously** — every
assertion silently skipped, zero failures reported. With it, a dormant server is
a hard failure instead.

Browser-side:
1. Incognito window → `https://guru-credit.com` → verify hero renders, no console errors
2. `https://guru-credit.com/services/1/apply` → submit a test application
3. Admin login at `https://admin.guru-credit.com` → confirm the test application shows up in `/admin/applications`
4. WhatsApp link works
5. Google Search Console → add `https://guru-credit.com` → submit `sitemap.xml`

## 7. Ongoing

- Set up Sentry (or similar) for error tracking — free tier is fine
- Set up Vercel Web Analytics or GA4 on the frontend
- Enable Atlas Backups (daily snapshots, 2-day retention for free tier)
- Rotate JWT_SECRET and PII_ENCRYPTION_KEY annually
