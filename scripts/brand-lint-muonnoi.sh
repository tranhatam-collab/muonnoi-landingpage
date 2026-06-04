#!/usr/bin/env bash
# ============================================================
# MUÔN NƠI — BRAND v2.0 LINTER (Voice & Place)
# Usage: bash scripts/brand-lint-muonnoi.sh [path]
# Default path: . (root, scans public-facing files)
#
# Source: docs/MUONNOI_V2_VOICE_AND_PLACE.md
# ============================================================
set -euo pipefail

TARGET="${1:-.}"
[ -d "$TARGET" ] || { echo "❌ Target not found: $TARGET"; exit 1; }

echo "🔍 Muôn Nơi brand-lint: $TARGET"
echo ""

FAILED=0

# ─────────────────────────────────────────────────────────────
# 1. WORD FILTER (Voice/Place platform — NOT a social network)
# ─────────────────────────────────────────────────────────────
declare -a FORBIDDEN=(
  # Wrong category — we are NOT a social network clone
  "social network"
  "Facebook alternative"
  "Twitter alternative"
  # Legacy v1 brand wording — replaced by Voice & Place v2.0
  "Social Operating System"
  "Social Operating Space"
  # Investment language (legal risk)
  "guaranteed return"
  "guaranteed profit"
  "guaranteed yield"
  "fixed return"
  # Hype phrases
  "revolutionary"
  "disruptive innovation"
  "next-gen"
  "game changer"
  "game-changer"
)

echo "─── Word filter (live public surface only) ───"
# Scan tracked live public surfaces: main shell + docs subdomain.
# Do not scan legacy clones or governance docs that list banned words as rules.
PUBLIC_ROOTS=()
[ -d "$TARGET/apps/web/public" ] && PUBLIC_ROOTS+=("$TARGET/apps/web/public")
[ -d "$TARGET/docs.muonnoi.org/public" ] && PUBLIC_ROOTS+=("$TARGET/docs.muonnoi.org/public")
[ -d "$TARGET/nguoiviet.muonnoi.org/public" ] && PUBLIC_ROOTS+=("$TARGET/nguoiviet.muonnoi.org/public")
[ ${#PUBLIC_ROOTS[@]} -eq 0 ] && [ -d "$TARGET" ] && PUBLIC_ROOTS+=("$TARGET")

# Log which public surfaces are being scanned
for root in "${PUBLIC_ROOTS[@]}"; do
  echo "  scanning: $root"
done

PUBLIC_FILES=$(find "${PUBLIC_ROOTS[@]}" -maxdepth 6 -type f \
  \( -name "*.html" -o -name "*.css" -o -name "*.js" -o -name "*.json" -o -name "*.txt" \) \
  -not -path "*/node_modules/*" \
  -not -path "*/.git/*" \
  -not -path "*/.next/*" \
  -not -path "*/dist/*" \
  -not -path "*/.wrangler/*" 2>/dev/null || true)

if [ -z "$PUBLIC_FILES" ]; then
  echo "✅ No public files to scan"
else
  WORD_FAILED=0
  for phrase in "${FORBIDDEN[@]}"; do
    raw=$(echo "$PUBLIC_FILES" | xargs grep -Iil "$phrase" 2>/dev/null || true)
    [ -z "$raw" ] && continue
    # Negation-aware: skip rule text like "no guaranteed return".
    bad=$(echo "$PUBLIC_FILES" | xargs grep -Ini "$phrase" 2>/dev/null \
      | grep -ivE "(not a |is not |không phải |không |no |never )[^.]{0,40}${phrase}" || true)
    if [ -n "$bad" ]; then
      echo "❌ \"$phrase\""
      echo "$bad" | head -3 | sed 's/^/     /'
      WORD_FAILED=1
      FAILED=1
    fi
  done
  [ "$WORD_FAILED" -eq 0 ] && echo "✅ No forbidden phrases"
fi
echo ""

# ─────────────────────────────────────────────────────────────
# 2. PALETTE TOKENS (v2.0 Voice & Place)
# ─────────────────────────────────────────────────────────────
echo "─── Palette tokens ───"
CSS="$TARGET/apps/web/public/assets/ui.css"
if [ -f "$CSS" ]; then
  # Azure primary
  if grep -qi "#3B7EFF" "$CSS"; then
    echo "✅ Azure primary (#3B7EFF) present"
  else
    echo "❌ Azure primary #3B7EFF NOT FOUND"
    FAILED=1
  fi

  # Whisper accent
  if grep -qi "#7FE0E5" "$CSS"; then
    echo "✅ Whisper (#7FE0E5) present"
  else
    echo "❌ Whisper #7FE0E5 NOT FOUND"
    FAILED=1
  fi

  # Gold verification
  if grep -qi "#D4AF37" "$CSS"; then
    echo "✅ Gold verification (#D4AF37) present"
  else
    echo "⚠️  Gold verification (#D4AF37) not yet present"
  fi

  # Anti-collision: must NOT have heavy use of OMDALA cyan
  cyan_count=$(grep -ci "#3de7ff" "$CSS" 2>/dev/null || true)
  if [ "$cyan_count" -gt 3 ]; then
    echo "⚠️  Heavy OMDALA cyan usage ($cyan_count refs) — risk of brand collision"
  else
    echo "✅ No OMDALA cyan collision ($cyan_count refs)"
  fi

  # Anti-collision: must NOT have heavy use of IAI violet
  violet_count=$(grep -ci "#7C5CFF" "$CSS" 2>/dev/null || true)
  if [ "$violet_count" -gt 3 ]; then
    echo "⚠️  Heavy IAI violet usage ($violet_count refs) — risk of brand collision"
  else
    echo "✅ No IAI violet collision ($violet_count refs)"
  fi

  if grep -qi "Be Vietnam Pro" "$CSS"; then
    echo "✅ Be Vietnam Pro typography fallback present"
  else
    echo "❌ Be Vietnam Pro typography fallback missing"
    FAILED=1
  fi
else
  echo "⚠️  CSS file not found: $CSS"
fi
echo ""

# ─────────────────────────────────────────────────────────────
# 3. ACCESSIBILITY
# ─────────────────────────────────────────────────────────────
echo "─── Accessibility ───"
if [ -f "$CSS" ] && grep -q "prefers-reduced-motion" "$CSS"; then
  echo "✅ prefers-reduced-motion handled"
else
  echo "⚠️  prefers-reduced-motion missing (required for motion-safe animations)"
fi

if [ -f "$CSS" ] && grep -q "color-scheme:" "$CSS"; then
  echo "✅ color-scheme declared"
fi
echo ""

# ─────────────────────────────────────────────────────────────
# 4. LANGUAGE LABELS
# ─────────────────────────────────────────────────────────────
echo "─── Language labels ───"
if echo "$PUBLIC_FILES" | xargs grep -InE ">[[:space:]]*(VI|EN|VI/EN)[[:space:]]*<|VI/EN toggle" 2>/dev/null; then
  echo "❌ Short language labels detected in visible public surface"
  FAILED=1
else
  echo "✅ No short VI/EN language labels in live public surface"
fi
echo ""

# ─────────────────────────────────────────────────────────────
# 5. BRAND CONSISTENCY (Muôn Nơi)
# ─────────────────────────────────────────────────────────────
echo "─── Brand consistency ───"
INDEX="$TARGET/apps/web/public/index.html"
if [ -f "$INDEX" ]; then
  if grep -qiE "Muôn Nơi|muonnoi" "$INDEX"; then
    echo "✅ Brand name 'Muôn Nơi' / 'muonnoi' present in index.html"
  else
    echo "⚠️  Brand name not detected in index.html"
  fi
else
  # Fallback: check root index.html
  if [ -f "$TARGET/index.html" ]; then
    if grep -qiE "Muôn Nơi|muonnoi" "$TARGET/index.html"; then
      echo "✅ Brand name 'Muôn Nơi' / 'muonnoi' present in index.html"
    else
      echo "⚠️  Brand name not detected in index.html"
    fi
  else
    echo "⚠️  No index.html found to check brand name"
  fi
fi
echo ""

# ─────────────────────────────────────────────────────────────
# SUMMARY
# ─────────────────────────────────────────────────────────────
echo "═══════════════════════════════════════"
if [ "$FAILED" -eq 0 ]; then
  echo "✅ Muôn Nơi brand-lint PASSED."
  echo "   Source: docs/MUONNOI_V2_VOICE_AND_PLACE.md"
  exit 0
else
  echo "❌ Muôn Nơi brand-lint FAILED."
  echo "   Source: docs/MUONNOI_V2_VOICE_AND_PLACE.md"
  exit 1
fi
