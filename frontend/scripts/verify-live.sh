#!/usr/bin/env bash
#
# Post-deploy gate for the bilingual (/ms) surface.
#
#   bash scripts/verify-live.sh https://guru-credit.com
#   bash scripts/verify-live.sh http://127.0.0.1:3100    # local prod build
#   SITE_URL=https://guru-credit.com bash scripts/verify-live.sh http://127.0.0.1:3100
#
# Canonicals and JSON-LD @ids are built from NEXT_PUBLIC_SITE_URL, which is
# baked in at build time and is deliberately NOT the address you fetch a local
# build from. So the origin you FETCH and the origin the page CANONICALISES to
# are the same thing in production and different things on loopback. Pass the
# expected canonical origin as $2 (or $SITE_URL) to pin it; against a loopback
# target with neither set, the script derives it from the home page and says so.
#
# NEXT_PUBLIC_LOCALE_PREFIX_ENABLED is inlined at BUILD time. If the Vercel
# project variable is missing when the production build runs, the deploy ships
# the dormant build — /ms/* 404s, the sitemap loses every /ms URL — and no
# test fails, because every /ms assertion is gated on the flag being live
# (final-review.md I2/M8). This script is the non-skippable check: it asserts
# the flag-on behaviour against a running origin and exits non-zero otherwise.

set -uo pipefail

ORIGIN="${1:-}"
if [ -z "$ORIGIN" ]; then
  echo "usage: $0 <origin>   e.g. $0 https://guru-credit.com" >&2
  exit 2
fi
ORIGIN="${ORIGIN%/}"

FAILURES=0

pass() { printf '  \033[32mPASS\033[0m  %s\n' "$1"; }
fail() { printf '  \033[31mFAIL\033[0m  %s\n' "$1"; FAILURES=$((FAILURES + 1)); }

fetch() { curl -fsS --max-time 20 "$1" 2>/dev/null; }

echo "verify-live: $ORIGIN"

# 1. /ms/glossary is 200 and renders Malay.
status=$(curl -s -o /dev/null -w '%{http_code}' --max-time 20 "$ORIGIN/ms/glossary")
if [ "$status" = "200" ]; then
  pass "/ms/glossary → 200"
else
  fail "/ms/glossary → $status (expected 200 — was the build made with NEXT_PUBLIC_LOCALE_PREFIX_ENABLED=true?)"
fi

ms_glossary=$(fetch "$ORIGIN/ms/glossary")
if printf '%s' "$ms_glossary" | grep -Eq '<html[^>]+lang="ms"'; then
  pass '/ms/glossary has <html lang="ms">'
else
  fail '/ms/glossary is missing <html lang="ms">'
fi

# 2. The sitemap actually lists the Malay surface.
sitemap=$(fetch "$ORIGIN/sitemap.xml")
ms_locs=$(printf '%s' "$sitemap" | grep -o '<loc>[^<]*/ms/[^<]*</loc>' | wc -l | tr -d ' ')
if [ "${ms_locs:-0}" -ge 90 ]; then
  pass "/sitemap.xml lists $ms_locs /ms/ <loc> entries (≥ 90)"
else
  fail "/sitemap.xml lists only ${ms_locs:-0} /ms/ <loc> entries (expected ≥ 90)"
fi

# 3. The home page self-canonicalises to the site origin.
home=$(fetch "$ORIGIN/")
canonical=$(printf '%s' "$home" | grep -o 'rel="canonical" href="[^"]*"' | head -1 | sed 's/.*href="//;s/"$//')
canonical="${canonical%/}"

# Expected canonical origin: $2, else $SITE_URL, else the fetch origin —
# except on loopback, where the baked-in NEXT_PUBLIC_SITE_URL can't be the
# address we're fetching from, so derive it and relax this one check to
# "a clean absolute origin with no path".
CANONICAL_ORIGIN="${2:-${SITE_URL:-}}"
CANONICAL_ORIGIN="${CANONICAL_ORIGIN%/}"
derived=0
if [ -z "$CANONICAL_ORIGIN" ]; then
  case "$ORIGIN" in
    http://localhost*|http://127.0.0.1*|http://0.0.0.0*|http://\[::1\]*)
      CANONICAL_ORIGIN="$canonical"
      derived=1
      echo "  note  loopback target: canonical origin derived from the page as '${CANONICAL_ORIGIN:-<none>}'"
      echo "        (pass it as \$2 or \$SITE_URL to pin it)"
      ;;
    *) CANONICAL_ORIGIN="$ORIGIN" ;;
  esac
fi

if [ "$derived" = "1" ]; then
  # Still meaningful: the home canonical must be an absolute https origin
  # with no path — a relative, http, or deep canonical is a real defect.
  if printf '%s' "$canonical" | grep -Eq '^https://[a-z0-9.-]+(:[0-9]+)?$'; then
    pass "/ canonical is a bare absolute origin ($canonical)"
  else
    fail "/ canonical = '${canonical:-<none>}' (expected a bare absolute https origin)"
  fi
elif [ "$canonical" = "$CANONICAL_ORIGIN" ]; then
  pass "/ canonical = $canonical"
else
  fail "/ canonical = '${canonical:-<none>}' (expected '$CANONICAL_ORIGIN')"
fi

# 4. /ms/faq's FAQPage structured data is anchored under <origin>/ms/.
ms_faq=$(fetch "$ORIGIN/ms/faq")
faq_id=$(printf '%s' "$ms_faq" \
  | grep -o '"@type":"FAQPage","@id":"[^"]*"' | head -1 \
  | sed 's/.*"@id":"//;s/"$//')
if [ -z "$faq_id" ]; then
  # The @id may precede @type depending on key order — fall back to any
  # #faq-suffixed @id on the page.
  faq_id=$(printf '%s' "$ms_faq" | grep -o '"@id":"[^"]*#faq"' | head -1 | sed 's/"@id":"//;s/"$//')
fi
case "$faq_id" in
  "$CANONICAL_ORIGIN/ms/"*) pass "/ms/faq FAQPage @id = $faq_id" ;;
  "") fail "/ms/faq emits no FAQPage @id" ;;
  *) fail "/ms/faq FAQPage @id = '$faq_id' (expected to start with '$CANONICAL_ORIGIN/ms/')" ;;
esac

echo
if [ "$FAILURES" -gt 0 ]; then
  echo "verify-live: $FAILURES check(s) FAILED against $ORIGIN" >&2
  exit 1
fi
echo "verify-live: all checks passed against $ORIGIN"
