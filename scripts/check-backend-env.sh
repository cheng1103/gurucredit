#!/usr/bin/env bash
set -euo pipefail

REQUIRED_VARS=(
  DATABASE_URL
  JWT_SECRET
  JWT_EXPIRES_IN
  PII_ENCRYPTION_KEY
  SMTP_HOST
  SMTP_PORT
  SMTP_USER
  SMTP_PASS
  SMTP_FROM
  COMPANY_WHATSAPP
)

MISSING=()
for VAR in "${REQUIRED_VARS[@]}"; do
  if [[ -z "${!VAR:-}" ]]; then
    MISSING+=("$VAR")
  fi
done

if [[ ${#MISSING[@]} -gt 0 ]]; then
  echo "❌ Missing required backend env vars:"
  for VAR in "${MISSING[@]}"; do
    echo "  - $VAR"
  done
  echo "Set them via your secrets manager before deploying."
  exit 1
fi

# Basic validation for the encryption key length (should be 32-byte base64)
DECODED_LEN=$(printf '%s' "${PII_ENCRYPTION_KEY}" | base64 --decode 2>/dev/null | wc -c | tr -d ' ')
if [[ "${DECODED_LEN}" != "32" ]]; then
  echo "❌ PII_ENCRYPTION_KEY must decode to 32 bytes. Check your secret value."
  exit 1
fi

ENVIRONMENT="${NODE_ENV:-development}"
if [[ "${ENVIRONMENT}" == "production" ]]; then
  if [[ -z "${CORS_ORIGINS:-}" ]]; then
    echo "❌ CORS_ORIGINS must list the production domains (comma separated)."
    exit 1
  fi
  if [[ "${CORS_ORIGINS}" == *"*"* ]]; then
    echo "❌ Remove \"*\" from CORS_ORIGINS in production. List each domain instead."
    exit 1
  fi
  if [[ "${ENABLE_SWAGGER:-false}" == "true" ]]; then
    echo "⚠️ ENABLE_SWAGGER is TRUE. Ensure Swagger is behind VPN/basic auth or disable it in production."
  fi
fi

echo "✅ Backend secrets look OK."
