# GURU Credits API (NestJS + Prisma)

API server for the GURU Credits platform. Provides authentication, service catalogue, public application intake, credit-analysis tools, admin tooling and notification hooks.

## Prerequisites

- Node.js 18+
- MongoDB (Atlas or Railway)

## Getting Started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure environment**

   ```bash
   cp .env.example .env
   # edit .env (DB URL, JWT secret, SMTP, etc.)
   ```

3. **Apply Prisma schema**

   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Start the API**

   ```bash
   npm run start:dev
   # API http://localhost:3001/api, Swagger http://localhost:3001/api/docs
   ```

## Useful Scripts

| Script               | Description                              |
| -------------------- | ---------------------------------------- |
| `npm run start:dev`  | Run Nest in watch mode                   |
| `npm run lint`       | ESLint (configured via `eslint.config`)  |
| `npm run test`       | Unit tests (Jest)                        |
| `npm run test:e2e`   | E2E tests (`test/app.e2e-spec.ts`)       |
| `npm run db:generate`| `prisma generate`                        |
| `npm run db:push`    | Sync Prisma schema to DB                 |

## Environment Reference

| Variable            | Purpose                              |
| ------------------- | ------------------------------------ |
| `DATABASE_URL`      | MongoDB connection string            |
| `JWT_SECRET`        | Secret key for signing API tokens    |
| `HOST`/`PORT`       | Listener host/port (defaults 0.0.0.0/3001) |
| `CORS_ORIGINS`      | Comma-separated allow list (optional)|
| `LOG_FILE`          | Optional path for structured log output (`logs/api.log`) |
| `SMTP_*`            | Nodemailer credentials (optional)    |
| `COMPANY_WHATSAPP`  | WhatsApp number used in notifications|

See `.env.example` for the full list.
