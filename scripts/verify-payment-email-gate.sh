#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

required_files=(
  "$ROOT/docs/api/MUONNOI_PAYMENT_API_CONTRACT_V1.md"
  "$ROOT/docs/api/MUONNOI_EMAIL_API_CONTRACT_V1.md"
  "$ROOT/docs/platform/MUONNOI_API_DEPLOYMENT_EVIDENCE_TEMPLATE_2026-05-12.md"
  "$ROOT/qa/release-gates/MUONNOI_PAYMENT_EMAIL_PRODUCTION_GATE_CHECKLIST_2026-05-12.md"
  "$ROOT/qa/release-gates/MUONNOI_PAYMENT_EMAIL_TEST_EVIDENCE_TEMPLATE_2026-05-12.md"
  "$ROOT/qa/release-gates/MUONNOI_EVIDENCE_REDACTION_GUIDELINES_2026-05-12.md"
)

evidence_files=(
  "$ROOT/docs/platform/MUONNOI_API_DEPLOYMENT_EVIDENCE_2026-05-12.md"
  "$ROOT/qa/release-gates/MUONNOI_PAYMENT_EMAIL_TEST_EVIDENCE_2026-05-12.md"
)

fail=0

echo "Payment/email gate verifier"
echo "Gate: PAYMENT_EMAIL_REAL_OPERATION_PASS"

echo ""
echo "Required planning files:"
for file in "${required_files[@]}"; do
  if [ -f "$file" ]; then
    echo "PASS exists: ${file#$ROOT/}"
  else
    echo "FAIL missing: ${file#$ROOT/}"
    fail=1
  fi
done

echo ""
echo "Required real evidence files:"
for file in "${evidence_files[@]}"; do
  if [ -f "$file" ]; then
    if grep -q "PENDING" "$file"; then
      echo "FAIL pending evidence remains: ${file#$ROOT/}"
      fail=1
    else
      echo "PASS evidence attached: ${file#$ROOT/}"
    fi
  else
    echo "FAIL missing real evidence: ${file#$ROOT/}"
    fail=1
  fi
done

echo ""
health_code="$(curl -I -L --max-time 15 -s -o /dev/null -w '%{http_code}' https://api.muonnoi.org/api/health || true)"
echo "api health /api/health: $health_code"
if [ "$health_code" != "200" ]; then
  fail=1
fi

if [ "$fail" -eq 0 ]; then
  echo "PASS: PAYMENT_EMAIL_REAL_OPERATION_PASS can be reviewed for sign-off."
else
  echo "BLOCKED: payment/email gate evidence is incomplete."
  exit 1
fi
