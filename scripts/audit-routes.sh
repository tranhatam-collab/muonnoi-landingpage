#!/usr/bin/env bash
set -euo pipefail

BASE="${1:-https://www.muonnoi.org}"

ROUTES=(
  "/"
  "/ecosystem/"
  "/roadmap/"
  "/plan/"
  "/security/"
  "/investment/"
  "/about/"
  "/manifesto/"
  "/press/"
  "/newsletter/"
  "/quests/"
  "/quests/dulich/"
  "/quests/hoctap/"
  "/quests/family/"
  "/quests/suckhoe/"
  "/quests/lamviec/"
  "/quests/sangtao/"
  "/quests/congdong/"
  "/guide/"
  "/host/"
  "/partners/"
  "/feed/"
  "/verify/"
  "/commit/"
  "/complaints/"
  "/admin/"
  "/status/"
)

fail=0
echo "Route audit"
echo "Base: $BASE"

for route in "${ROUTES[@]}"; do
  code="$(curl -I -L --max-time 15 -s -o /dev/null -w '%{http_code}' "${BASE}${route}" || true)"
  printf '%-28s %s\n' "$route" "$code"
  if [ "$code" != "200" ]; then
    fail=1
  fi
done

if [ "$fail" -eq 0 ]; then
  echo "PASS: all routes returned 200."
else
  echo "FAIL: one or more routes did not return 200."
  exit 1
fi
