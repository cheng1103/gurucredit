#!/usr/bin/env bash
# Runs Lighthouse (performance, accessibility, best-practices, seo) against a
# fixed set of representative routes, desktop + mobile presets, and prints a
# summary table of the four category scores per URL/preset.
#
# Usage: bash scripts/lighthouse.sh                  # fixed default routes
#        bash scripts/lighthouse.sh /a /b/c ...      # only the given routes
# Requires a running server (default http://127.0.0.1:3000); override with
# LIGHTHOUSE_BASE_URL. Reports are written to .superpowers/lighthouse/.
#
# Preset(s) to run come from LIGHTHOUSE_PRESETS (space-separated, default
# "desktop mobile"), e.g. `LIGHTHOUSE_PRESETS=desktop bash scripts/lighthouse.sh ...`.

set -euo pipefail

BASE_URL="${LIGHTHOUSE_BASE_URL:-http://127.0.0.1:3000}"
OUT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)/.superpowers/lighthouse"
mkdir -p "$OUT_DIR"

DEFAULT_ROUTES=(
  "/"
  "/loans/personal"
  "/blog/personal-loan-malaysia-complete-guide-2026"
  "/services/1/apply"
)

if [ "$#" -gt 0 ]; then
  ROUTES=("$@")
else
  ROUTES=("${DEFAULT_ROUTES[@]}")
fi

read -ra PRESETS <<< "${LIGHTHOUSE_PRESETS:-desktop mobile}"

slug() {
  # "/" -> home ; "/blog/x" -> blog_x
  local route="$1"
  if [ "$route" = "/" ]; then
    echo "home"
  else
    echo "${route#/}" | tr '/' '_'
  fi
}

declare -a RESULT_LINES

for route in "${ROUTES[@]}"; do
  for preset in "${PRESETS[@]}"; do
    url="${BASE_URL}${route}"
    out_file="${OUT_DIR}/$(slug "$route")-${preset}.json"
    echo "Running Lighthouse ($preset) on $url ..."

    preset_flag="--preset=desktop"
    if [ "$preset" = "mobile" ]; then
      # Lighthouse has no --preset=mobile; mobile is the CLI default
      # (emulated moto g power, throttled). Just omit --preset.
      preset_flag=""
    fi

    npx lighthouse "$url" \
      $preset_flag \
      --only-categories=performance,accessibility,best-practices,seo \
      --output=json \
      --output-path="$out_file" \
      --chrome-flags="--headless" \
      --quiet

    scores=$(node -e "
      const r = require('$out_file');
      const c = r.categories;
      const pct = (x) => x && x.score != null ? Math.round(x.score * 100) : 'n/a';
      console.log([pct(c.performance), pct(c.accessibility), pct(c['best-practices']), pct(c.seo)].join('\t'));
    ")

    RESULT_LINES+=("${route}\t${preset}\t${scores}")
  done
done

echo ""
echo "== Lighthouse summary (performance / accessibility / best-practices / seo) =="
printf "%-55s %-8s %5s %5s %5s %5s\n" "URL" "Preset" "Perf" "A11y" "BP" "SEO"
for line in "${RESULT_LINES[@]}"; do
  IFS=$'\t' read -r route preset perf a11y bp seo <<< "$(echo -e "$line")"
  printf "%-55s %-8s %5s %5s %5s %5s\n" "$route" "$preset" "$perf" "$a11y" "$bp" "$seo"
done
echo ""
echo "Full JSON reports saved under $OUT_DIR"
