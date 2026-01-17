#!/usr/bin/env bash
set -euo pipefail

if [[ $# -eq 0 ]]; then
  cat <<'USAGE'
Usage: scripts/generate-csp-hash.sh "inline css or js snippet"

Outputs the sha256 hash in CSP format (sha256-xxxxx).
USAGE
  exit 1
fi

PAYLOAD="$*"

HASH=$(printf '%s' "${PAYLOAD}" | openssl dgst -sha256 -binary | openssl base64)
echo "sha256-${HASH}"
