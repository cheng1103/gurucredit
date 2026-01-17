# Deployment Hardening Checklist

This project now enforces several security controls at runtime (PII crypto, login lockouts, CSP, etc.).  
The infrastructure layer should complement these features to prevent misconfiguration. Use this checklist when preparing staging/prod environments.

## 1. TLS and reverse proxy

1. Terminate TLS at the load balancer or CDN with TLS 1.2+ and strong ciphers (e.g. AWS ALB + ACM cert).
2. Redirect all HTTP requests to HTTPS before they reach the Node.js app.
3. Enable mutual TLS or IP allow lists for the admin panel if feasible.

## 2. Required headers at edge

Even though the Next.js apps and Nest API emit security headers, set them at the proxy/CDN too for defense in depth.

```
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=(), fullscreen=(self)
Content-Security-Policy: <match the policy generated in next.config.ts>
```

For CloudFront you can add a response header policy; for Nginx use `add_header`.
When allowing third-party providers, set the corresponding environment variables before build:

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_CSP_SCRIPT_SRC` | Comma-separated list of additional script origins (`https://static.example.com`) |
| `NEXT_PUBLIC_CSP_SCRIPT_HASHES` | `sha256-...` values when inline scripts can't be avoided |
| `NEXT_PUBLIC_CSP_CONNECT_SRC` | Additional XHR/fetch/WebSocket endpoints |
| `NEXT_PUBLIC_CSP_IMG_SRC` | Extra image domains |
| `NEXT_PUBLIC_CSP_STYLE_SRC` | CSS/font CDNs so you can keep `style-src` strict |
| `NEXT_PUBLIC_CSP_STYLE_HASHES` | `sha256-...` values generated via `scripts/generate-csp-hash.sh` when inline CSS/JS is unavoidable |
| `NEXT_PUBLIC_CSP_REPORT_URI` / `NEXT_PUBLIC_CSP_REPORT_TO` | Wire CSP violation reports to SIEM/Webhook |

Enable `NEXT_PUBLIC_CSP_REPORT_ONLY=true` during the first deploy to collect reports without blocking, then switch it off when the policy is tuned. When using `NEXT_PUBLIC_CSP_REPORT_TO`, also mirror the generated `Report-To` header at the CDN.

## 3. Secrets management

Move all runtime secrets out of `.env` files and into a central KMS-backed vault. Recommended options:

- AWS Secrets Manager / Parameter Store
- Hashicorp Vault
- GCP Secret Manager

Required keys:

| Variable | Description |
|----------|-------------|
| `PII_ENCRYPTION_KEY` | 32-byte base64 secret used for NRIC encryption |
| `JWT_SECRET` | Access token signer |
| `SMTP_*` | Email transport |
| `DATABASE_URL` | Prisma connection string |

CI/CD should fetch these secrets per environment; do not bake them into the container image.

### Example: AWS Secrets Manager

1. Create a JSON secret:
   ```json
   {
     "DATABASE_URL": "postgresql://...",
     "JWT_SECRET": "xxx",
     "PII_ENCRYPTION_KEY": "base64==",
     "SMTP_HOST": "smtp.mailgun.org",
     "SMTP_PORT": "587",
     "SMTP_USER": "postmaster@domain",
     "SMTP_PASS": "password",
     "SMTP_FROM": "GURU Credits <no-reply@gurucredits.my>",
     "COMPANY_WHATSAPP": "+601127486389"
   }
   ```
2. In the deployment pipeline, load the secret and export vars:
   ```bash
   export $(aws secretsmanager get-secret-value \
     --secret-id guru/prod/api \
     --query SecretString --output text | jq -r 'to_entries|map("\(.key)=\(.value)")|.[]')
   ./scripts/check-backend-env.sh
   ```
3. Start the Nest server only if the check passes.

## 4. Environment validation

Add a pre-flight script in the deployment pipeline that ensures:

- `NEXT_PUBLIC_API_URL` is set and uses `https://`.
- Required backend env vars exist (see `.env.example` or ConfigService schema).
- Prisma migrations have been applied (`npx prisma migrate deploy`).
- `CORS_ORIGINS` lists each allowed HTTPS origin (no `*`). The Nest app now refuses to boot otherwise; `NODE_ENV=production ./scripts/check-backend-env.sh` enforces this early.
- Swagger (`ENABLE_SWAGGER`) should stay `false` unless the docs route lives behind VPN/basic auth. The runtime now skips mounting `/api/docs` when disabled.

Fail fast if any variable is missing.

### CSP fine-tuning workflow

1. If inline styles/scripts are required, hash them locally: `./scripts/generate-csp-hash.sh 'body{display:none}'`.
2. Drop the resulting `sha256-...` token into `NEXT_PUBLIC_CSP_STYLE_HASHES` or `NEXT_PUBLIC_CSP_SCRIPT_HASHES`.
3. Add CSS CDN domains through `NEXT_PUBLIC_CSP_STYLE_SRC` instead of widening the entire directive.
4. Configure `NEXT_PUBLIC_CSP_REPORT_URI` / `NEXT_PUBLIC_CSP_REPORT_TO` and temporarily enable `NEXT_PUBLIC_CSP_REPORT_ONLY=true` to catch violations during the first rollout.

## 5. Logging & monitoring

- Forward application logs to a central SIEM (e.g. CloudWatch, Datadog, ELK). Pay attention to `[AuthService]` warnings for lockouts.
- Create alerts for:
  - More than N lockouts within 5 minutes (possible credential stuffing).
  - Notification fallback logs (SMTP outage).
  - API 5xx spikes.

## 6. Web Application Firewall

Deploy a WAF in front of the API and admin (AWS WAF / Cloudflare). Recommended rules:

1. Managed OWASP Top 10 ruleset.
2. Rate limiting for `/auth/login` beyond the application-level throttling.
3. Geo/IP restrictions for admin if only certain regions should access it.

## 7. Backups and disaster recovery

- Enable automated database backups (daily snapshots with PITR).
- Encrypt backups at rest (KMS) and restrict restore permissions.

## 8. Least privilege IAM

- API servers should use dedicated service roles with minimal permissions (read-only to secrets, RDS access).
- CI/CD deploy user should only access required AWS/GCP resources.

## 9. Deployment verification

After each deploy run the following smoke tests:

1. `npm run lint` / `npm run test` (already part of CI).
2. Automated curl script verifying key headers:
   ```bash
   curl -I https://app.example.com | grep Strict-Transport-Security
   ```
3. ZAP / OWASP dependency scan on the public endpoints (optional but recommended).
4. `NODE_ENV=production ./scripts/check-backend-env.sh` plus `./scripts/generate-csp-hash.sh 'body{...}'` (when inline snippets change) baked into CI logs for traceability.

Keeping this checklist with the infrastructure repository ensures we do not regress when provisioning new environments.
