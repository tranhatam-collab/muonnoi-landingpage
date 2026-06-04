#!/usr/bin/env bash
# ============================================================
# NGƯỜI VIỆT MUÔN NƠI — QA SMOKE TEST
# Usage: bash scripts/qa-nguoiviet-smoke.sh [base_url]
#
# Default base_url: https://nguoiviet-muonnoi-org.pages.dev
# Once DNS goes live, pass https://nguoiviet.muonnoi.org
#
# Exits 0 on PASS, non-zero on FAIL.
# ============================================================
set -uo pipefail

BASE_URL="${1:-https://nguoiviet-muonnoi-org.pages.dev}"
BASE_URL="${BASE_URL%/}"  # strip trailing slash

FAILED=0
WARN=0

# Helpers
fail() { echo "❌ $*"; FAILED=1; }
warn() { echo "⚠️  $*"; WARN=1; }
ok()   { echo "✅ $*"; }

http_code() {
  curl -sk -o /dev/null -w "%{http_code}" --max-time 15 "$1" 2>/dev/null
}

http_body() {
  curl -sk --max-time 15 "$1" 2>/dev/null
}

http_headers() {
  curl -sIk --max-time 15 "$1" 2>/dev/null
}

echo "🔍 Người Việt Muôn Nơi QA Smoke Test"
echo "Target: $BASE_URL"
echo ""

# ─────────────────────────────────────────────────────────────
# 1. ROUTE AUDIT
# ─────────────────────────────────────────────────────────────
MAIN_ROUTES=(
  "/"
  "/manifesto/"
  "/journeys/"
  "/journeys/dalat/"
  "/start/"
  "/host/"
  "/stories/"
  "/partners/"
  "/members/"
  "/resources/"
  "/contact/"
)
SYS_ROUTES=(
  "/sitemap.xml"
  "/robots.txt"
  "/manifest.json"
)
LEGAL_ROUTES=("/privacy/" "/terms/" "/refund/" "/community-guidelines/")

echo "─── Routes (${#MAIN_ROUTES[@]} main + ${#SYS_ROUTES[@]} system) ───"
for r in "${MAIN_ROUTES[@]}" "${SYS_ROUTES[@]}"; do
  code=$(http_code "$BASE_URL$r")
  if [ "$code" = "200" ]; then
    ok "$r: $code"
  else
    fail "$r: $code (expected 200)"
  fi
done
echo ""

echo "─── Legal routes (optional) ───"
LEGAL_FOUND=0
for r in "${LEGAL_ROUTES[@]}"; do
  code=$(http_code "$BASE_URL$r")
  if [ "$code" = "200" ]; then
    ok "$r: $code"
    LEGAL_FOUND=$((LEGAL_FOUND + 1))
  else
    warn "$r: $code (not deployed)"
  fi
done
echo "  ($LEGAL_FOUND/${#LEGAL_ROUTES[@]} legal pages live)"
echo ""

# ─────────────────────────────────────────────────────────────
# 2. BRAND CHECK
# ─────────────────────────────────────────────────────────────
echo "─── Brand consistency ───"
HOME_BODY=$(http_body "$BASE_URL/")

if [ -z "$HOME_BODY" ]; then
  fail "Empty homepage body"
else
  # Title
  TITLE=$(echo "$HOME_BODY" | grep -oE '<title>[^<]*</title>' | head -1 | sed 's/<[^>]*>//g')
  EXPECTED_TITLE="Người Việt Muôn Nơi · Đi Xa Để Quay Trở Về"
  if [ "$TITLE" = "$EXPECTED_TITLE" ]; then
    ok "Title matches: \"$TITLE\""
  else
    fail "Title mismatch — got: \"$TITLE\""
  fi

  # Tagline in body
  if echo "$HOME_BODY" | grep -qi "Đi xa để quay trở về"; then
    ok "Tagline \"Đi xa để quay trở về\" present in body"
  else
    fail "Tagline \"Đi xa để quay trở về\" missing from body"
  fi

  # No legacy "Social Operating Space"
  if echo "$HOME_BODY" | grep -qi "Social Operating"; then
    fail "Legacy phrase \"Social Operating\" found in body"
    echo "$HOME_BODY" | grep -ni "Social Operating" | head -3 | sed 's/^/     /'
  else
    ok "No \"Social Operating Space\""
  fi

  # No no-diacritics "Muon Noi" except in schema.org alternateName (intentional SEO)
  MUON_NOI_HITS=$(echo "$HOME_BODY" | grep -n "Muon Noi" || true)
  MUON_NOI_BAD=$(echo "$MUON_NOI_HITS" | grep -v "alternateName" || true)
  if [ -n "$MUON_NOI_BAD" ]; then
    fail "Found \"Muon Noi\" (no diacritics) outside JSON-LD alternateName:"
    echo "$MUON_NOI_BAD" | head -3 | sed 's/^/     /'
  else
    ok "No legacy \"Muon Noi\" in user-visible text"
  fi
fi
echo ""

# ─────────────────────────────────────────────────────────────
# 3. SECURITY HEADERS
# ─────────────────────────────────────────────────────────────
echo "─── Security headers ───"
HOME_HEADERS=$(http_headers "$BASE_URL/")

check_header() {
  local label="$1"
  local pattern="$2"
  if echo "$HOME_HEADERS" | grep -iE "^$pattern" > /dev/null; then
    ok "$label"
  else
    fail "$label missing"
  fi
}

check_header "HSTS (Strict-Transport-Security)" "strict-transport-security:"
check_header "CSP (Content-Security-Policy)"    "content-security-policy:"

# X-Frame-Options: DENY
XFO=$(echo "$HOME_HEADERS" | grep -i "^x-frame-options:" | tr -d '\r' | awk -F: '{print tolower($2)}' | xargs)
if [ "$XFO" = "deny" ]; then
  ok "X-Frame-Options: DENY"
else
  fail "X-Frame-Options expected DENY, got: \"$XFO\""
fi

# X-Content-Type-Options: nosniff
XCTO=$(echo "$HOME_HEADERS" | grep -i "^x-content-type-options:" | tr -d '\r' | awk -F: '{print tolower($2)}' | xargs)
if [ "$XCTO" = "nosniff" ]; then
  ok "X-Content-Type-Options: nosniff"
else
  fail "X-Content-Type-Options expected nosniff, got: \"$XCTO\""
fi
echo ""

# ─────────────────────────────────────────────────────────────
# 4. SITEMAP STRUCTURE
# ─────────────────────────────────────────────────────────────
echo "─── Sitemap ───"
SITEMAP=$(http_body "$BASE_URL/sitemap.xml")

if [ -z "$SITEMAP" ]; then
  fail "Empty sitemap.xml"
elif ! echo "$SITEMAP" | grep -q "<urlset"; then
  fail "sitemap.xml missing <urlset> root"
else
  SITEMAP_URLS=$(echo "$SITEMAP" | grep -oE '<loc>[^<]*</loc>' | sed -E 's|</?loc>||g')
  URL_COUNT=$(echo "$SITEMAP_URLS" | grep -c . || true)
  BAD_URLS=$(echo "$SITEMAP_URLS" | grep -v "^https://nguoiviet.muonnoi.org/" || true)

  if [ "$URL_COUNT" -lt 11 ]; then
    fail "Sitemap has $URL_COUNT URLs (expected ≥ 11)"
  elif [ -n "$BAD_URLS" ]; then
    fail "Sitemap has URLs not on https://nguoiviet.muonnoi.org/:"
    echo "$BAD_URLS" | head -5 | sed 's/^/     /'
  else
    ok "$URL_COUNT URLs, all valid (https://nguoiviet.muonnoi.org/ prefix)"
  fi
fi
echo ""

# ─────────────────────────────────────────────────────────────
# 5. INTERNAL LINK AUDIT (from homepage)
# ─────────────────────────────────────────────────────────────
echo "─── Internal links (from homepage) ───"
INTERNAL_LINKS=$(echo "$HOME_BODY" | grep -oE 'href="/[^"#?]*"' | sed -E 's/href="//;s/"$//' | sort -u)
LINK_TOTAL=0
LINK_OK=0
LINK_BAD=()
for link in $INTERNAL_LINKS; do
  LINK_TOTAL=$((LINK_TOTAL + 1))
  code=$(http_code "$BASE_URL$link")
  if [ "$code" = "200" ]; then
    LINK_OK=$((LINK_OK + 1))
  else
    LINK_BAD+=("$link: $code")
  fi
done

if [ ${#LINK_BAD[@]} -eq 0 ]; then
  ok "$LINK_OK/$LINK_TOTAL links 200"
else
  fail "$LINK_OK/$LINK_TOTAL links 200 — broken:"
  for entry in "${LINK_BAD[@]}"; do
    echo "     ❌ $entry"
  done
fi
echo ""

# ─────────────────────────────────────────────────────────────
# 6. MOBILE VIEWPORT META
# ─────────────────────────────────────────────────────────────
echo "─── Mobile viewport ───"
if echo "$HOME_BODY" | grep -qiE '<meta[^>]+name="viewport"'; then
  ok "viewport meta present"
else
  fail "viewport meta missing on homepage"
fi
echo ""

# ─────────────────────────────────────────────────────────────
# 7. FORBIDDEN LANGUAGE SCAN
# ─────────────────────────────────────────────────────────────
echo "─── Forbidden language ───"
FORBIDDEN=("guaranteed" "tour" "khoá học" "Social Operating")
FORBIDDEN_HIT=0
for phrase in "${FORBIDDEN[@]}"; do
  # raw matches
  raw=$(echo "$HOME_BODY" | grep -ni "$phrase" || true)
  [ -z "$raw" ] && continue
  # negation-aware: skip rule text like "không phải tour", "no guaranteed", "Does not sell tourism"
  bad=$(echo "$raw" | grep -ivE "(not a |is not |does not |do not |don't |won't |won't |không phải |không |chưa |no |never )[^.<]{0,60}${phrase}" || true)
  if [ -n "$bad" ]; then
    fail "Found forbidden phrase \"$phrase\":"
    echo "$bad" | head -3 | sed 's/^/     /'
    FORBIDDEN_HIT=1
  fi
done
[ "$FORBIDDEN_HIT" -eq 0 ] && ok "No forbidden phrases"
echo ""

# ─────────────────────────────────────────────────────────────
# SUMMARY
# ─────────────────────────────────────────────────────────────
echo "═══════════════════════════════════════"
if [ "$FAILED" -eq 0 ]; then
  if [ "$WARN" -eq 1 ]; then
    echo "✅ QA SMOKE TEST PASSED (with warnings)"
  else
    echo "✅ QA SMOKE TEST PASSED"
  fi
  exit 0
else
  echo "❌ QA SMOKE TEST FAILED"
  exit 1
fi
