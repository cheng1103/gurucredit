#!/usr/bin/env bash
set -euo pipefail

TARGET_URL="${1:-http://localhost:3001/api/health}"
EXPECTED_TEXT="${2:-ok}"

echo "Pinging ${TARGET_URL} ..."
HTTP_CODE=$(curl -s -o /tmp/health_response.txt -w "%{http_code}" "$TARGET_URL")
BODY=$(cat /tmp/health_response.txt)

if [[ "$HTTP_CODE" != "200" ]]; then
  echo "Healthcheck failed: expected HTTP 200 but got ${HTTP_CODE}"
  echo "Body: $BODY"
  exit 1
fi

if ! echo "$BODY" | grep -qi "$EXPECTED_TEXT"; then
  echo "Healthcheck failed: body did not contain '${EXPECTED_TEXT}'"
  echo "Body: $BODY"
  exit 1
fi

echo "Healthcheck OK."
