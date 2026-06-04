#!/usr/bin/env bash
set -euo pipefail

echo "Subdomain source validation"
echo "This script is read-only. It does not create or modify Cloudflare projects."

HOSTS=(
  "muonnoi.org"
  "www.muonnoi.org"
  "app.muonnoi.org"
  "docs.muonnoi.org"
  "ai.muonnoi.org"
  "api.muonnoi.org"
  "lamviec.muonnoi.org"
  "lqos.muonnoi.org"
  "dautu.muonnoi.org"
  "duan.muonnoi.org"
  "family.muonnoi.org"
  "dulich.muonnoi.org"
  "node.muonnoi.org"
)

echo ""
echo "Cloudflare Pages projects:"
wrangler pages project list

echo ""
echo "DNS and HTTPS probes:"
for host in "${HOSTS[@]}"; do
  dns="$(dig +short "$host" | paste -sd ',' - || true)"
  url="https://${host}/"
  if [ "$host" = "api.muonnoi.org" ]; then
    url="https://${host}/api/health"
  fi
  code="$(curl -I -L --max-time 15 -s -o /dev/null -w '%{http_code}' "$url" || true)"
  printf '%-24s dns=%-28s http=%s url=%s\n' "$host" "${dns:-NO_ANSWER}" "$code" "$url"
done

echo ""
echo "Decision rule:"
echo "- A host can be primary public CTA only when DNS, HTTPS and Pages/Worker source evidence are all locked."
echo "- Planned hosts without source evidence remain internal roadmap/quest links."
