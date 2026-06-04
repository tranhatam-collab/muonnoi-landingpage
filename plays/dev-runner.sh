#!/bin/bash
# dev-runner.sh — Muon Nơi Plays Continuous Dev Runner
# Usage: bash plays/dev-runner.sh
# This script runs continuously, monitoring and auto-committing progress.

set -euo pipefail

cd "$(dirname "$0")"
REPO_ROOT="$(cd .. && pwd)"
PLAYS_DIR="$REPO_ROOT/plays"
LOG="$REPO_ROOT/reports/plays-dev-log.txt"

mkdir -p "$REPO_ROOT/reports"

echo "========================================" >> "$LOG"
echo "Dev Runner started: $(date -u +"%Y-%m-%dT%H:%M:%SZ")" >> "$LOG"
echo "========================================" >> "$LOG"

# Function: verify all game files
verify_games() {
  local fail=0
  for game in cham-vo-cuc me-cung-muon-loi dinh-sisyphus; do
    if [ -f "games/$game/index.html" ]; then
      echo "  [PASS] $game/index.html exists" >> "$LOG"
    else
      echo "  [FAIL] $game/index.html MISSING" >> "$LOG"
      fail=1
    fi
  done
  return $fail
}

# Function: verify SDK + catalog
verify_core() {
  local fail=0
  if node --check plays-sdk.js 2>/dev/null; then
    echo "  [PASS] plays-sdk.js syntax OK" >> "$LOG"
  else
    echo "  [FAIL] plays-sdk.js syntax ERROR" >> "$LOG"
    fail=1
  fi

  if node --check catalog.js 2>/dev/null; then
    echo "  [PASS] catalog.js syntax OK" >> "$LOG"
  else
    echo "  [FAIL] catalog.js syntax ERROR" >> "$LOG"
    fail=1
  fi

  local ids=$(node -e "const c=require('./catalog.js'); console.log(c.games.length + ' ' + new Set(c.games.map(g=>g.id)).size);" 2>/dev/null)
  local total=$(echo "$ids" | awk '{print $1}')
  local uniq=$(echo "$ids" | awk '{print $2}')
  if [ "$total" = "$uniq" ] && [ "$total" -eq 100 ]; then
    echo "  [PASS] catalog: $total games, all unique" >> "$LOG"
  else
    echo "  [FAIL] catalog: $total total, $uniq unique" >> "$LOG"
    fail=1
  fi
  return $fail
}

# Function: commit if there are changes
auto_commit() {
  cd "$REPO_ROOT"
  if [ -n "$(git status --short plays/ 2>/dev/null)" ]; then
    git add plays/
    git commit -m "plays: auto-commit dev progress $(date -u +"%Y-%m-%dT%H:%M:%SZ")" >> "$LOG" 2>&1 || true
    echo "  [COMMIT] plays/ changes committed" >> "$LOG"
  else
    echo "  [SKIP] No changes to commit" >> "$LOG"
  fi
}

# Main loop
main() {
  echo "Dev Runner: verifying plays/ ..." >> "$LOG"
  verify_core
  verify_games

  # Count live games
  local live=$(node -e "const c=require('./catalog.js'); console.log(c.games.filter(g=>g.live).length);" 2>/dev/null)
  echo "  [INFO] Live games: $live / 3 target" >> "$LOG"

  auto_commit

  echo "Dev Runner cycle complete: $(date -u +"%Y-%m-%dT%H:%M:%SZ")" >> "$LOG"
  echo "" >> "$LOG"
}

# Run once now
main

# If invoked with --watch, loop every 60s
if [ "${1:-}" = "--watch" ]; then
  echo "Watch mode enabled. Polling every 60s..." >> "$LOG"
  while true; do
    sleep 60
    main
  done
fi

echo "Done. Log: $LOG"
