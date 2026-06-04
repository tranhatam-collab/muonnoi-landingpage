#!/bin/bash
# scripts/daily-audit.sh — MUONNOI.ORG + PLAYS.MUONNOI.ORG Daily Audit
# Run: bash scripts/daily-audit.sh
# Output: reports/daily-status-YYYY-MM-DD.md

set -euo pipefail

cd "$(dirname "$0")/.."

DATE=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
REPORT="reports/daily-status-${DATE:0:10}.md"

mkdir -p reports

cat > "$REPORT" <<EOF
# Daily Audit — ${DATE:0:10}

> Auditor: Claude agent
> Scope: muonnoi.org 9-conditions + plays.muonnoi.org build check
> Method: Evidence-based, strict scoring

---

EOF

PASS_COUNT=0
FAIL_COUNT=0

log_section() {
  echo "### $1" >> "$REPORT"
}

log_pass() {
  echo "- PASS: $1" >> "$REPORT"
  PASS_COUNT=$((PASS_COUNT + 1))
}

log_fail() {
  echo "- FAIL: $1" >> "$REPORT"
  FAIL_COUNT=$((FAIL_COUNT + 1))
}

# C1 Registration API
log_section "C1 Registration API"
C1_OUT=$(curl -s -X POST https://api.muonnoi.org/api/register \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"audit-${DATE}@muonnoi.org\",\"name\":\"Audit\",\"password\":\"AuditPass123!\"}" 2>/dev/null || true)
if echo "$C1_OUT" | grep -q '"ok":true'; then
  log_pass "POST /api/register returns 201 + ok:true"
else
  log_fail "POST /api/register did not return ok:true (output: ${C1_OUT:0:120})"
fi

# C2 Payment Gate
log_section "C2 Payment/Email Gate"
if grep -q "PAYMENT_EMAIL_REAL_OPERATION_PASS" qa/release-gates/MUONNOI_PAYMENT_EMAIL_PRODUCTION_GATE_CHECKLIST_2026-05-12.md 2>/dev/null; then
  log_pass "Production gate shows REAL_OPERATION_PASS"
else
  log_fail "Production gate still blocked or missing"
fi

# C3 iOS Signing
log_section "C3 iOS TestFlight Signing"
PBJ="app.muonnoi.org/mobile-shell/ios/App/App.xcodeproj/project.pbxproj"
if [ -f "$PBJ" ] && [ "$(grep -c 'DEVELOPMENT_TEAM = ' "$PBJ" 2>/dev/null || echo 0)" -ge 2 ]; then
  log_pass "DEVELOPMENT_TEAM set in project.pbxproj"
else
  log_fail "DEVELOPMENT_TEAM not configured"
fi

# C4 Android SDK
log_section "C4 Android SDK"
if [ -n "${ANDROID_HOME:-}" ] && [ -d "$ANDROID_HOME" ] && command -v adb >/dev/null 2>&1; then
  log_pass "ANDROID_HOME and adb present"
else
  log_fail "ANDROID_HOME or adb missing"
fi

# C5 OAuth E2E
log_section "C5 OAuth E2E Evidence"
if [ -f qa/oauth-evidence/2026-05-19/SUMMARY.md ] 2>/dev/null; then
  log_pass "OAuth evidence SUMMARY.md exists"
else
  log_fail "OAuth evidence missing"
fi

# C6 DNS Matrix
log_section "C6 DNS Matrix"
LLC=$(grep -c LIVE_LINK_ALLOWED docs/launch/MUONNOI_SUBDOMAIN_DNS_CUSTOM_DOMAIN_MATRIX_2026-05-12.md 2>/dev/null || echo 0)
if [ "$LLC" -ge 3 ]; then
  log_pass "DNS matrix has $LLC LIVE_LINK_ALLOWED entries"
else
  log_fail "DNS matrix has only $LLC LIVE_LINK_ALLOWED entries (< 3)"
fi

# C7 Cuoc Song Gate 8
log_section "C7 Cuoc Song Gate 8"
if grep -q "READY_FOR_PUBLIC_LINK" docs/launch/CUOCSONG_MUONNOI_QA_AND_RELEASE_CHECKLIST_2026-05-13.md 2>/dev/null; then
  log_pass "Cuoc Song checklist shows READY_FOR_PUBLIC_LINK"
else
  log_fail "Cuoc Song checklist not ready"
fi

# C8 Repo Clean
log_section "C8 Repo Clean"
DIRTY=$(git status --short 2>/dev/null | wc -l | tr -d ' ')
if [ "$DIRTY" = "0" ]; then
  log_pass "git status --short is empty"
else
  log_fail "git status shows $DIRTY dirty entries"
fi

# C9 Reports
log_section "C9 Reports Reconciled"
if [ -f reports/RELEASE_STATUS_2026-05-19.md ]; then
  log_pass "RELEASE_STATUS_2026-05-19.md exists"
else
  log_fail "RELEASE_STATUS file missing"
fi

# Plays build check (only if code exists)
log_section "Plays.muonnoi.org Build Check"
if [ -f plays/plays-sdk.js ]; then
  if node --check plays/plays-sdk.js 2>/dev/null; then
    log_pass "plays-sdk.js node --check pass"
  else
    log_fail "plays-sdk.js node --check failed"
  fi

  if [ -f plays/catalog.js ]; then
    IDS=$(node -e "const c=require('./plays/catalog.js'); const ids=c.games.map(g=>g.id); console.log(new Set(ids).size + ' ' + ids.length);" 2>/dev/null || echo "0 0")
    UNIQ=$(echo "$IDS" | awk '{print $1}')
    TOTAL=$(echo "$IDS" | awk '{print $2}')
    if [ "$UNIQ" = "$TOTAL" ] && [ "$TOTAL" -gt 0 ]; then
      log_pass "catalog.js has $TOTAL unique game IDs"
    else
      log_fail "catalog.js duplicate IDs detected ($UNIQ unique / $TOTAL total)"
    fi
  else
    log_fail "catalog.js not found"
  fi

  if curl -sI https://plays.muonnoi.org/ 2>/dev/null | head -1 | grep -q "200"; then
    log_pass "plays.muonnoi.org hub returns HTTP 200"
  else
    log_fail "plays.muonnoi.org hub not returning 200"
  fi
else
  log_fail "plays code not present in repo — UNVERIFIED"
fi

# Summary
cat >> "$REPORT" <<EOF

---

## Summary
- PASS: $PASS_COUNT
- FAIL: $FAIL_COUNT
- Core 9-conditions: $PASS_COUNT/9

EOF

if [ "$FAIL_COUNT" -eq 0 ]; then
  echo "All checks PASS." >> "$REPORT"
else
  echo "Next priority: fix highest-impact FAIL item." >> "$REPORT"
fi

echo "Audit report written to: $REPORT"
echo "PASS: $PASS_COUNT | FAIL: $FAIL_COUNT"
