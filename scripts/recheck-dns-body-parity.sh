#!/usr/bin/env bash
set -euo pipefail

export LC_ALL=C.UTF-8
export LANG=C.UTF-8

HOST="${1:-https://www.muonnoi.org/}"
EXPECTED_TITLE="Muôn Nơi | Hạ tầng số cho đời sống thật"
EXPECTED_BRAND="Hạ tầng số cho đời sống thật"
FORBIDDEN="Social Operating Space"

echo "DNS/body parity check"
echo "Target: $HOST"

echo ""
echo "Header check:"
curl -I -L --max-time 15 -sS "$HOST" | sed -n '1,20p'

echo ""
echo "Body check:"
tmp_body="$(mktemp -t mn-body.XXXXXX)"
trap 'rm -f "$tmp_body"' EXIT
curl -L --retry 2 --retry-delay 1 --max-time 20 -sS "$HOST" -o "$tmp_body"

if ! grep -F -q "$EXPECTED_TITLE" "$tmp_body"; then
  echo "FAIL: expected title not found: $EXPECTED_TITLE"
  exit 1
fi

if ! grep -F -q "$EXPECTED_BRAND" "$tmp_body"; then
  echo "FAIL: expected brand text not found: $EXPECTED_BRAND"
  exit 1
fi

if grep -F -q "$FORBIDDEN" "$tmp_body"; then
  echo "FAIL: forbidden legacy brand text found: $FORBIDDEN"
  exit 1
fi

brand_count=$(grep -F -c "$EXPECTED_BRAND" "$tmp_body" || true)
echo "PASS: body contains current brand text (${brand_count} occurrences) and no legacy brand phrase."
