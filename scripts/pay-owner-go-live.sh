#!/usr/bin/env bash
# pay-owner-go-live.sh — push payment + mail secrets to ai-muonnoi-api Worker.
# Usage:  bash scripts/pay-owner-go-live.sh
# Safe to re-run. Secrets are unset on exit (trap).

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

WORKER_NAME="${WORKER_NAME:-ai-muonnoi-api}"
LIVE_HOST="${LIVE_HOST:-https://api.muonnoi.org}"

cleanup() {
  unset PAY_IAI_ONE_API_KEY PAYMENT_WEBHOOK_SECRET MAIL_API_KEY 2>/dev/null || true
}
trap cleanup EXIT

prompt_secret() {
  local label="$1"; local var="$2"
  local existing="${!var-}"
  [ -n "$existing" ] && { echo "[i] $var already set, using it."; return 0; }
  if [ ! -t 0 ]; then
    echo "[FAIL] $var: stdin is not a TTY. Run directly in your terminal." >&2; exit 3
  fi
  local value=""; local attempts=0
  while [ -z "$value" ]; do
    attempts=$((attempts + 1))
    [ "$attempts" -gt 5 ] && { echo "[FAIL] Too many empty attempts." >&2; exit 3; }
    printf "%s: " "$label" >&2
    if ! IFS= read -rs value; then
      printf "\n[FAIL] stdin closed.\n" >&2; exit 3
    fi
    printf "\n" >&2
    [ -z "$value" ] && echo "[!] cannot be empty" >&2
  done
  printf -v "$var" "%s" "$value"
  export "$var"
}

need_cmd() { command -v "$1" >/dev/null 2>&1 || { echo "[FAIL] missing: $1"; exit 2; }; }

put_secret() {
  local name="$1"; local value="$2"
  printf "%s" "$value" | wrangler secret put "$name" --name "$WORKER_NAME" >/dev/null
  echo "  ✓ set $name → $WORKER_NAME"
}

need_cmd wrangler
need_cmd curl
need_cmd jq
need_cmd openssl

echo "== muonnoi.org — Pay-Owner go-live =="
echo "Worker: $WORKER_NAME"
echo "API:    $LIVE_HOST"
echo

echo "Step 1/4 — collect secrets"
prompt_secret "PAY_IAI_ONE_API_KEY (muonnoi tenant, from Team Pay)" PAY_IAI_ONE_API_KEY
prompt_secret "MAIL_API_KEY (from IAI VPS /opt/iai-mail-api/.env)" MAIL_API_KEY

if [ -z "${PAYMENT_WEBHOOK_SECRET-}" ]; then
  PAYMENT_WEBHOOK_SECRET="$(openssl rand -hex 32)"
  export PAYMENT_WEBHOOK_SECRET
  echo
  echo "[!] Generated PAYMENT_WEBHOOK_SECRET — save this now:"
  echo "    PAYMENT_WEBHOOK_SECRET=$PAYMENT_WEBHOOK_SECRET"
  echo
fi

echo
echo "Step 2/4 — push secrets to Cloudflare Worker"
put_secret PAY_IAI_ONE_API_KEY    "$PAY_IAI_ONE_API_KEY"
put_secret MAIL_API_KEY           "$MAIL_API_KEY"
put_secret PAYMENT_WEBHOOK_SECRET "$PAYMENT_WEBHOOK_SECRET"

echo
echo "Step 3/4 — verify API health"
HEALTH="$(curl -sS "$LIVE_HOST/api/health" || true)"
echo "$HEALTH" | jq -r '"health: \(.ok) service: \(.service)"'

echo
echo "Step 4/4 — smoke checkout-session"
RESP="$(curl -sS -X POST "$LIVE_HOST/api/payment/create-intent" \
  -H "content-type: application/json" \
  -H "Idempotency-Key: smoke-$(date +%s)" \
  --data '{"amount":10000,"currency":"VND","purpose":"membership"}' || true)"
echo "$RESP" | jq '{ok,status:.data.status,clientAction:.data.clientAction.type}'

if echo "$RESP" | jq -e '.ok == true' >/dev/null 2>&1; then
  echo
  echo "[PASS] muonnoi.org payment lane live."
  echo "       Run gate verifier: bash scripts/verify-payment-email-gate.sh"
  echo "       Monitor: wrangler tail --name $WORKER_NAME"
else
  echo
  echo "[FAIL] Unexpected response — check wrangler tail --name $WORKER_NAME"
  exit 1
fi
