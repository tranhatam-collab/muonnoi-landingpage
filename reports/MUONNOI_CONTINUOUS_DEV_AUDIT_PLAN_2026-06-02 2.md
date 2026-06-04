# MUONNOI.ORG + PLAYS.MUONNOI.ORG — CONTINUOUS DEV AUDIT PLAN
> Date: 2026-06-02
> Scope: Toàn bộ muonnoi.org ecosystem + plays.muonnoi.org game platform
> Auditor: Claude agent (Senior Systems Auditor mode)
> Status: ACTIVE — Canonical until next audit
> Supersedes: reports/MUONNOI_FULL_AUDIT_AND_100_MASTER_PLAN_2026-05-26.md (reference only)

---

## 1. AUDIT SNAPSHOT — CURRENT STATE

### 1.1 muonnoi.org Core (9 Release Conditions)

| Condition | Status | Evidence | Last Verified |
|-----------|:------:|----------|---------------|
| C1 Registration API | PASS | `curl POST /api/register` -> 201 | 2026-05-19 |
| C2 Payment/Email QA | FAIL | Gate `NOT_YET_EXECUTED` | 2026-05-19 |
| C3 iOS TestFlight | FAIL | `DEVELOPMENT_TEAM` = 0 | 2026-05-19 |
| C4 Android SDK | FAIL | `ANDROID_HOME` empty | 2026-05-19 |
| C5 OAuth E2E | FAIL | `qa/oauth-evidence/` khong ton tai | 2026-05-19 |
| C6 DNS matrix | PASS | 8 `LIVE_LINK_ALLOWED` | 2026-05-19 |
| C7 Cuoc Song Gate 8 | PASS | `READY_FOR_PUBLIC_LINK` | 2026-05-19 |
| C8 Repo clean | PASS | `git status --short` -> 0 | 2026-05-19 |
| C9 Reports reconciled | PASS | 3 SUPERSEDED + new report | 2026-05-19 |

**Net: 5/9 = 56%** — Tang tu 41.6/100 (audit 2026-05-26) nho Phase A hoan tat.

**Blockers con mo:**
- **P0**: C2 (Payment/Email 10 scenario chua chay) — Khong the launch monetization
- **P0**: C3 (Apple Team ID chua cung cap) — Khong the TestFlight
- **P1**: C4 (Android SDK chua cai) — Khong the Play Console
- **P1**: C5 (OAuth E2E chua test that) — Khong the claim auth live

---

### 1.2 plays.muonnoi.org — CRITICAL FINDING

**CODE KHONG CO TRONG REPO LOCAL.**

- Branch `claude/plays-muonnoi-game-platform-GdiIW` — **Khong ton tai** tren `origin` sau fetch.
- Draft PR #1 — **Khong the verify** trong local workspace.
- Cac file khai bao (`plays/PLAN.md`, `index.html`, `catalog.js`, `plays-sdk.js`, `plays.css`, `scripts/plays-schema.sql`, 4 API, `util/auth.ts`) — **Khong tim thay** trong filesystem.

**What user claims as done:**
- 3 game HTML hoan chinh (Cham Vo Cuc, Me Cung Muon Loi, Dinh Sisyphus)
- Hub `index.html` + `catalog.js` (100 game / 3 live / 33 wave1)
- `plays-sdk.js` (guest/login sync + merge)
- Backend schema + 4 API endpoints
- `_redirects` subdomain mapping

**Audit verdict: UNVERIFIED** — Can Founder cung cap 1 trong 3 cach:
1. **Push branch plays len remote** (neu chi o local may khac): `git push origin claude/plays-muonnoi-game-platform-GdiIW`
2. **Merge PR #1 vao main** de toi audit tren main.
3. **Copy file plays/ vao workspace hien tai** de toi audit ngay.

---

### 1.3 Architecture Gaps tu Audit 2026-05-26 (chua closed)

| Gap | Impact | Owner | ETA |
|-----|--------|-------|-----|
| Mobile scaffold trong (`apps/mobile/`) | MVP mobile July–Sept unrealistic | Mobile | Tuan 2–3 |
| Web flat HTML (no Vite/build) | Maintenance 10+ subdomain impossible | Web | Tuan 3–4 |
| D1 backup automation chua co | Data loss risk | Platform | Tuan 6–8 |
| ASVS 5.0 chua map vao code | Security compliance gap | Security | Tuan 6–8 |
| R2 storage chua setup | Media pipeline block | Platform | Tuan 4–6 |
| Secret rotation SOP chua co | Operational risk | Security | Tuan 6–8 |

---

## 2. CONTINUOUS AUDIT FRAMEWORK

### 2.1 Nguyen tac (Khong thuong luong)

1. **Evidence first**: Khong chap nhan claim khong co verify command output.
2. **No inference**: "Co code" != "Chay duoc". "Da deploy" != "Pass QA".
3. **Strict phase-gate**: Khong mo Phase N+1 cho den khi Phase N dong bang evidence.
4. **Minimal upstream fix**: Sua root cause, khong workaround.
5. **Regression guard**: Condition da PASS chuyen FAIL -> Alert P0 ngay.

### 2.2 Audit Cadence (Lich trinh kiem tra lien tuc)

| Frequency | Duration | Activity | Output |
|-----------|:--------:|----------|--------|
| **Daily Tick** | 15 min | Chay 9 verify command + plays build check | 1-line status update |
| **Weekly Deep** | 2 gio | Code review, security scan, dependency audit, submodule check | Written audit report |
| **Phase Gate** | 30 min | Pre-merge PR audit: build, test, brand scan, accessibility | Gate PASS/FAIL document |
| **Sprint Review** | 1 gio | End-of-sprint evidence reconciliation + next sprint plan | Sprint audit report |
| **Release Candidate** | 4 gio | Full regression: all conditions + end-to-end smoke + performance | RC audit report |

### 2.3 Roles

| Role | Who | Responsibility |
|------|-----|----------------|
| **Founder** | tranhatam | Decisions A/B/C, credentials (Apple Team ID, Google test account, PayOS), approve phase gates |
| **Claude Agent** | Auditor | Run verify commands, write audit reports, block phase gates neu evidence thieu, commit tracker files |
| **Dev Team** | (TBD) | Implement code, self-test truoc khi gui PR, cung cap evidence trong PR description |
| **QA Team** | (TBD) | Execute manual E2E (OAuth, payment), screenshot evidence, inbox verification |

---

## 3. PLAYS.MUONNOI.ORG — DEV AUDIT PLAN

> **Prerequisite**: Founder phai cung cap file plays/ vao repo hoac merge PR #1 truoc khi bat dau Phase 3.1.

### 3.1 Verification Checklist cho "3 game da xong" (can audit ngay khi co code)

| # | Check | Verify Command | Pass Criteria |
|---|-------|--------------|---------------|
| 3.1.1 | `node --check` cho SDK + moi game | `node --check plays-sdk.js && node --check games/cham-vo-cuc/game.js` | Exit 0, no syntax error |
| 3.1.2 | Catalog unique IDs | `node -e "const c=require('./catalog.js'); const ids=c.games.map(g=>g.id); console.log(new Set(ids).size === ids.length)"` | `true` |
| 3.1.3 | Hub loads 200 | `curl -sI https://plays.muonnoi.org/ | head -1` | HTTP 200 |
| 3.1.4 | Game 1: Cham Vo Cuc infinite | Play 60s, verify grid expands + speed increases | Visual + console log |
| 3.1.5 | Game 2: Me Cung Muon Loi infinite | Complete 3 mazes, verify each larger + fog thicker | Visual + console log |
| 3.1.6 | Game 3: Dinh Sisyphus infinite | Push 5 times, verify slope steeper + peak higher | Visual + console log |
| 3.1.7 | Guest localStorage persistence | Play as guest -> refresh -> score retained | `localStorage.getItem('plays_scores')` co data |
| 3.1.8 | Mobile viewport playable | Chrome DevTools iPhone SE -> tap targets >= 44px, no horizontal scroll | Lighthouse mobile audit |
| 3.1.9 | No forbidden brand words | `grep -riE "guaranteed|magic|instant|viral|crush it|hustle|earn fast" plays/` | Empty result |
| 3.1.10 | CSP compliant | `grep -n "eval\|Function(" plays/*.js games/*/*.js` | Empty result (no inline eval) |

### 3.2 Wave 1 — 30 Game Con Lai (Sprint Plan)

**Muc tieu**: 33 game total (3 done + 30 new). Moi game phai pass checklist 3.1.1–3.1.10 tren.

| Sprint | Games | Focus | Audit Gate |
|--------|:------:|-------|------------|
| **Sprint 1** (Tuan 1–2) | 10 games | The loai: Phan xa (3), Giai do (3), Kheo leo (2), Chien thuat (2) | Gate 3.2.1: 10 game build + catalog + `node --check` pass |
| **Sprint 2** (Tuan 3–4) | 10 games | The loai: Nhanh tay (3), Nho (2), Timing (3), Toc do (2) | Gate 3.2.2: Cumulative 20 game pass |
| **Sprint 3** (Tuan 5–6) | 10 games | The loai: Sinh ton (3), Luyen tap (4), Sang tao (3) | Gate 3.2.3: Wave 1 complete — 33 game pass |
| **Sprint 4** (Tuan 7) | Backend D1 | Schema deploy, 4 API integration test, auth auto-link, Muon Diem ledger | Gate 3.2.4: Backend integration PASS |
| **Sprint 5** (Tuan 8) | QA Wave 1 | End-to-end guest->member flow, cross-device sync, anti-farm test, performance | Gate 3.2.5: Wave 1 PUBLIC BETA |

**Definition of Done cho moi game:**
- [ ] Game HTML file tai `plays/games/{game-id}/index.html`
- [ ] `catalog.js` entry voi `id`, `name`, `genre`, `wave`, `live: true`
- [ ] `node --check` pass cho game script
- [ ] Infinite mechanic implemented (no win state, difficulty asymptotic)
- [ ] Score saved to `plays-sdk.js` layer (`localStorage` for guest, `POST /api/plays/progress` for member)
- [ ] Mobile viewport: min-width 320px playable, no zoom required
- [ ] Accessibility: alt text on images, `aria-label` on interactive elements, keyboard operable
- [ ] Brand QA: no forbidden words, Vietnamese copy reviewed
- [ ] Performance: `< 1s` First Contentful Paint on 3G simulation

### 3.3 Backend D1 Integration (Tuan 7)

| # | Task | Verify Command | Evidence File |
|---|------|--------------|---------------|
| 3.3.1 | Schema deployed | `wrangler d1 execute iai-flow-db --remote --command ".tables"` | `grep plays_` in output |
| 3.3.2 | API `/progress` responding | `curl -s https://api.muonnoi.org/api/plays/progress -H "Authorization: Bearer $TOKEN"` | HTTP 200 + JSON |
| 3.3.3 | API `/points` responding | `curl -s https://api.muonnoi.org/api/plays/points ...` | HTTP 200 + balance |
| 3.3.4 | API `/link` auto-link guest->member | Play as guest -> login -> verify scores merged | Screenshot + D1 query |
| 3.3.5 | API `/catalog` serving 33 games | `curl -s https://api.muonnoi.org/api/plays/catalog | jq '.games | length'` | `33` |
| 3.3.6 | Muon Diem ledger double-entry | `wrangler d1 execute iai-flow-db --remote --command "SELECT * FROM points_ledger ORDER BY id DESC LIMIT 5"` | Debits = Credits |
| 3.3.7 | Rate limit / anti-farm | `for i in {1..200}; do curl ...; done | sort | uniq -c` | 429 after threshold |
| 3.3.8 | Server-authoritative scoring | Modify `localStorage` score -> refresh -> server score wins | Verified |

### 3.4 Phase Gate Criteria cho plays.muonnoi.org

**Gate 3.2.1 (Sprint 1 done):**
- 10 game files exist + `node --check` pass
- Catalog has 13 live entries (3 old + 10 new)
- Hub renders all 13 without 404
- No duplicate IDs

**Gate 3.2.2 (Sprint 2 done):**
- 20 game files exist + `node --check` pass
- Hub renders 23 live entries
- Mobile smoke test on 5 random games: all playable

**Gate 3.2.3 (Wave 1 done):**
- 33 game files exist + `node --check` pass
- Catalog has 33 live entries, 67 placeholder entries (100 total)
- Hub renders 33 without error
- Brand scan: 0 forbidden words across all games

**Gate 3.2.4 (Backend done):**
- 8/8 backend tasks in 3.3 pass
- Guest->member migration test: 1 scenario with evidence
- Load test: 100 concurrent players, API latency < 200ms p95

**Gate 3.2.5 (Public Beta):**
- All 33 games playable on production subdomain `plays.muonnoi.org`
- D1 integration live with real member accounts
- Muon Diem economy: 100 transactions with balanced ledger
- Bug count P0 = 0, P1 < 5
- Founder sign-off

---

## 4. MUONNOI.ORG CORE — CONTINUOUS AUDIT PLAN (8 Tuan)

### 4.1 Phase 0: Hard Truth & Lock (Tuan 1: 02 Jun -> 09 Jun)

| # | Task | Owner | Verify | Est |
|---|------|-------|--------|-----|
| 0.1 | Adopt this file as canonical plan | Founder | File committed | 10m |
| 0.2 | Mark old plans `SUPERSEDED_BY` | Release Owner | All old plans have header | 30m |
| 0.3 | Confirm ADR: RN+Expo only, Workers API, Capacitor deprecated | Founder + Tech Lead | `docs/decisions/ADR-001.md` exists | 1h |
| 0.4 | Repo clean + plays code synced | Release Owner | `git status --short` empty; plays/ present | 1h |
| 0.5 | Fix `www.nguoiviet.muonnoi.org` HTTPS/redirect | Platform | `curl -sI -L` -> 301->200 | 30m |

**Gate 0 Exit:** `git status` clean, architecture locked, plays code in repo.

### 4.2 Phase 1: Infrastructure Lock (Tuan 1–2: 02 Jun -> 16 Jun)

| # | Task | Owner | Verify | Est |
|---|------|-------|--------|-----|
| 1.1 | Founder decision Payment A/B/C | Founder | Comment in plan file | 15m |
| 1.2 | Execute 10 payment/email scenarios | API + QA | `qa/payment-email-evidence/` 10 files | 4h |
| 1.3 | OAuth E2E 5 sites x 9 steps | QA | `qa/oauth-evidence/2026-06-02/` 45 screenshots | 3h |
| 1.4 | Update DNS matrix -> all LIVE_LINK_ALLOWED | Platform | Matrix file updated | 30m |
| 1.5 | Inbox evidence: real email received | QA | Screenshot | 30m |

**Gate 1 Exit:** C1, C2, C5, C6, C7, C8, C9 = PASS. No `NOT_YET_EXECUTED` in gate files.

### 4.3 Phase 2: Mobile Lock (Tuan 2–3: 09 Jun -> 23 Jun)

| # | Task | Owner | Verify | Est |
|---|------|-------|--------|-----|
| 2.1 | Apple Developer Team ID provided | Founder | ID in secure vault | 10m |
| 2.2 | Xcode signing + archive | Mobile | `grep DEVELOPMENT_TEAM` >= 2 | 30m |
| 2.3 | TestFlight Ready to Test | Mobile | App Store Connect screenshot | 1h |
| 2.4 | Android SDK install + debug build | User + Mobile | `adb version` + build log | 2h |
| 2.5 | Play Console Internal Testing | Mobile | Play Console screenshot | 2h |
| 2.6 | RN+Expo scaffold: `apps/mobile/` runnable | Mobile | `npx create-expo-app` + setup | 1 day |

**Gate 2 Exit:** C3 = PASS, C4 = PASS, `apps/mobile/` has runnable code.

### 4.4 Phase 3: Subdomain Rollout (Tuan 3–4: 16 Jun -> 30 Jun)

| # | Task | Owner | Verify | Est |
|---|------|-------|--------|-----|
| 3.1 | Web build system (Vite hoac generator) | Web | `package.json` + build command | 1 day |
| 3.2 | `app.muonnoi.org` homepage + join page | Web | HTTP 200 + claim-safe copy | 4h |
| 3.3 | `dulich.muonnoi.org` homepage | Web | HTTP 200 | 4h |
| 3.4 | `docs.muonnoi.org` structure published | Docs | Collections live | 4h |
| 3.5 | 8 remaining subdomains homepages | Web | DNS + Pages + HTTP 200 | 2 days |
| 3.6 | Cross-domain sitemap + redirects | Web | `sitemap.xml` + `_redirects` | 4h |

**Gate 3 Exit:** All ecosystem subdomains HTTP 200, no dead link from `www.muonnoi.org`.

### 4.5 Phase 4: Life Quest Pilot (Tuan 4–6: 30 Jun -> 14 Jul)

| # | Task | Owner | Verify | Est |
|---|------|-------|--------|-----|
| 4.1 | Da Lat landing page + host registration | Web + Product | Page live, form working | 2 days |
| 4.2 | Proof upload endpoint (R2 + D1) | API | `/api/proofs/upload` responding | 1 day |
| 4.3 | AI pre-review pipeline | AI | Integration with `ai.muonnoi.org` | 2 days |
| 4.4 | Host dashboard (web) | Web | `/host/` route | 2 days |
| 4.5 | 50+ Local Host onboarded | Community Ops | D1 `hosts` table count | 1 week |
| 4.6 | Receipt with hash issued | API | 100+ receipts in D1 | 1 week |

**Gate 4 Exit:** 50 hosts in DB, 100 receipts issued, 1 month stable on `dulich.muonnoi.org`.

### 4.6 Phase 5: Scale & Hardening (Tuan 6–8: 14 Jul -> 04 Aug)

| # | Task | Owner | Verify | Est |
|---|------|-------|--------|-----|
| 5.1 | ASVS 5.0 controls mapped vao code | Security | Audit report | 3 days |
| 5.2 | CIS Controls v8 operational baseline | Security | Checklist | 2 days |
| 5.3 | MoMo, ZaloPay, VNPay env keys set | Platform | Provider accounts | 3 days |
| 5.4 | Sentry crash reporting | Mobile + API | Sentry dashboard | 1 day |
| 5.5 | Brand Figma library + component impl | Design + Web | Figma link + Storybook | 1 week |
| 5.6 | D1 automated backup + restore test | Platform | Backup script + restore test | 2 days |
| 5.7 | Internal pentest (OWASP ZAP minimum) | Security | Scan report | 2 days |

**Gate 5 Exit:** 6/6 payment providers configured, security audit clean, brand QA pass.

---

## 5. DAILY AUDIT CHECKLIST

Chay moi ngay trong standup. Xem `scripts/daily-audit.sh` (se tao sau khi plays code co trong repo).

### 5.1 9-Condition Verify (Copy-paste)

```bash
cd /Users/tranhatam/Documents/Devnewproject/muonnoi.org

echo "=== C1 Registration ==="
curl -s -X POST https://api.muonnoi.org/api/register -H "Content-Type: application/json" \
  -d '{"email":"audit-'$(date +%s)'@muonnoi.org","name":"Audit","password":"AuditPass123!"}' | grep -q '"ok":true' && echo "PASS" || echo "FAIL"

echo "=== C2 Payment Gate ==="
grep -q "PAYMENT_EMAIL_REAL_OPERATION_PASS" qa/release-gates/MUONNOI_PAYMENT_EMAIL_PRODUCTION_GATE_CHECKLIST_2026-05-12.md && echo "PASS" || echo "FAIL"

echo "=== C3 iOS Signing ==="
grep -c "DEVELOPMENT_TEAM = " app.muonnoi.org/mobile-shell/ios/App/App.xcodeproj/project.pbxproj | awk '{print ($1>=2)?"PASS":"FAIL"}'

echo "=== C4 Android ==="
[ -n "$ANDROID_HOME" ] && [ -d "$ANDROID_HOME" ] && which adb >/dev/null && echo "PASS" || echo "FAIL"

echo "=== C5 OAuth E2E ==="
[ -f qa/oauth-evidence/2026-05-19/SUMMARY.md ] && echo "PASS" || echo "FAIL"

echo "=== C6 DNS Matrix ==="
[ "$(grep -c LIVE_LINK_ALLOWED docs/launch/MUONNOI_SUBDOMAIN_DNS_CUSTOM_DOMAIN_MATRIX_2026-05-12.md)" -ge 3 ] && echo "PASS" || echo "FAIL"

echo "=== C7 Cuoc Song ==="
grep -q "READY_FOR_PUBLIC_LINK" docs/launch/CUOCSONG_MUONNOI_QA_AND_RELEASE_CHECKLIST_2026-05-13.md && echo "PASS" || echo "FAIL"

echo "=== C8 Repo Clean ==="
[ "$(git status --short | wc -l | tr -d ' ')" = "0" ] && echo "PASS" || echo "FAIL"

echo "=== C9 Reports ==="
[ -f reports/RELEASE_STATUS_2026-05-19.md ] && echo "PASS" || echo "FAIL"
```

### 5.2 Plays Verify (khi code da co trong repo)

```bash
echo "=== Plays Catalog Unique ==="
node -e "const c=require('./plays/catalog.js'); const ids=c.games.map(g=>g.id); process.exit(new Set(ids).size===ids.length?0:1)" && echo "PASS" || echo "FAIL"

echo "=== Plays node --check ==="
node --check plays/plays-sdk.js && echo "PASS" || echo "FAIL"

echo "=== Plays Hub Live ==="
curl -sI https://plays.muonnoi.org/ | head -1 | grep -q "200" && echo "PASS" || echo "FAIL"
```

---

## 6. WEEKLY DEEP AUDIT CHECKLIST

Chay vao cuoi tuan (Thu 6 hoac Thu 7):

- [ ] **Dependency audit**: `npm outdated` trong moi project co `package.json`; check CVE via `npm audit`
- [ ] **Submodule pointer audit**: `git submodule status` — kiem tra moi submodule co dung commit hash khong, co change chua commit khong
- [ ] **D1 backup verification**: Chay backup script (neu co) hoac verify `wrangler d1 export` thanh cong
- [ ] **Security headers scan**: `curl -sI https://www.muonnoi.org` — kiem tra CSP, HSTS, X-Frame-Options
- [ ] **Brand word scan**: `grep -riE "guaranteed|magic|instant|viral|crush it|hustle|earn fast" apps/web/ cuocsong.muonnoi.org/ nguoiviet.muonnoi.org/ plays/` — empty result
- [ ] **Performance**: Lighthouse CLI tren 3 trang chinh (`www`, `app`, `cuocsong`) — LCP < 2.5s, CLS < 0.1
- [ ] **Mobile viewport smoke**: Chrome DevTools iPhone SE tren `app.muonnoi.org` va `plays.muonnoi.org`
- [ ] **Code review depth**: It nhat 1 PR duoc review voi comments ve logic, security, performance
- [ ] **Secret scan**: `git log --all --source --full-history -S "API_KEY"` hoac dung `trufflehog` — khong co secret leak
- [ ] **DNS matrix recheck**: `dig +short` cho tat ca subdomain trong ecosystem map

---

## 7. ESCALATION & REPORTING

### 7.1 Daily Output Format

```
[YYYY-MM-DD] tick HH:MM — muonnoi.org N/9 PASS — plays: [status] — next: [highest-priority FAIL]
```

Vi du:
```
[2026-06-02] tick 16:15 — muonnoi.org 5/9 PASS — plays: UNVERIFIED (code missing) — next: Founder provides plays branch or merges PR #1
```

### 7.2 Weekly Report Format

File: `reports/weekly-audit-YYYY-MM-DD.md`

- Section 1: 9-condition trend (pass/fail history 7 ngay)
- Section 2: Plays sprint progress (games completed / backend tasks / bugs)
- Section 3: New risks found (P0/P1/P2)
- Section 4: Closed gaps (tu tuan truoc)
- Section 5: Action items cho tuan toi

### 7.3 Phase Gate Output Format

File: `reports/phase-gate-[phase-name]-YYYY-MM-DD.md`

- Gate criteria list
- Evidence per criteria (command + output)
- Verdict: PASS / FAIL with reason
- Founder sign-off line (neu PASS)

### 7.4 Escalation Rules

Claude agent se chu dong alert Founder qua daily tick khi:
- **Regression**: Condition da PASS chuyen ve FAIL
- **Repo dirty > 0** sau khi da clean (C8 regression)
- **Live endpoint chuyen 200 -> 5xx** (vd `api.muonnoi.org` health fail)
- **Plays build bi vo** (node --check fail, catalog duplicate ID)
- **Payment gate van blocked sau 1 tuan** (C2 stall)
- **Mobile gate van blocked sau 2 tuan** (C3/C4 stall)
- **Subdomain tra ve 5xx hoac dead link** tu `www.muonnoi.org`

---

## 8. ACTION ITEMS — NGAY LAP TUC

### 8.1 Founder (can lam ngay)

1. **Cung cap plays code**: Push branch `claude/plays-muonnoi-game-platform-GdiIW` hoac merge PR #1 vao main.
2. **Quyet dinh Payment A/B/C**: Comment vao file nay hoac `docs/launch/MUONNOI_FINAL_EXECUTION_PLAN_2026-05-19.md` Section 5.1.
3. **Cung cap Apple Developer Team ID**: 10-char string tu developer.apple.com.
4. **Cai Android SDK**: `brew install --cask android-commandlinetools` + setup PATH (Section 2 cua runbook).
5. **Google test account**: Email + password de chay OAuth E2E 5 sites.

### 8.2 Claude Agent (se lam ngay khi co plays code)

1. **Audit 3 game hien co**: Chay checklist 3.1.1–3.1.10.
2. **Verify catalog**: 100 entries, 3 live, 33 wave1 — unique IDs, no conflict.
3. **Verify backend schema**: `scripts/plays-schema.sql` co trong repo, syntax ok.
4. **Verify SDK**: `plays-sdk.js` — `node --check`, no eval, no forbidden words.
5. **Tao `scripts/daily-audit.sh`**: Tu dong hoa daily tick.

### 8.3 Dev Team (bat dau Sprint 1 khi plays code da co)

1. **10 game dau tien**: Theo checklist Definition of Done trong Section 3.2.
2. **Backend D1**: Deploy schema, wire 4 API endpoints.
3. **Web build system**: Research Vite vs static generator cho 10+ subdomain.

---

## 9. APPENDICES

### Appendix A: File Index (Canonical)

| File | Status | Role |
|------|--------|------|
| `reports/MUONNOI_CONTINUOUS_DEV_AUDIT_PLAN_2026-06-02.md` | ACTIVE | This file — single source of truth |
| `reports/MUONNOI_FULL_AUDIT_AND_100_MASTER_PLAN_2026-05-26.md` | REFERENCE | Historical audit baseline |
| `docs/launch/MUONNOI_FINAL_EXECUTION_PLAN_2026-05-19.md` | REFERENCE | Execution commands |
| `docs/launch/DEV_TEAM_100_PERCENT_PLAN_2026-05-19.md` | REFERENCE | 9-condition spec |
| `docs/launch/SOLO_TEAM_RUNBOOK_TO_100_2026-05-19.md` | REFERENCE | Step-by-step runbook |
| `reports/RELEASE_STATUS_2026-05-19.md` | REFERENCE | Last honest reconciliation |

### Appendix B: Decision Log (Open Items)

| ID | Decision | Date | Owner | Status |
|----|----------|------|-------|--------|
| D1 | Mobile stack = RN+Expo, Capacitor deprecated | 2026-05-12 | Founder | Locked |
| D2 | API = Cloudflare Workers + D1 | 2026-05-19 | Founder | Locked |
| D3 | Payment provider primary = PayOS | 2026-05-18 | Founder | Locked |
| D6 | Web build system = ??? | TBD | Founder + Web | OPEN |
| D8 | Payment QA huong A/B/C | TBD | Founder | OPEN |
| D9 | plays code sync vao main | TBD | Founder | **OPEN — BLOCKER** |

### Appendix C: Plays Genre Groups (12 groups / 100 games)

| # | Group | Wave 1 Count | Wave 2+ |
|---|-------|:----------:|---------|
| 1 | Phan xa (Reflex) | 3 | +5 |
| 2 | Giai do (Puzzle) | 3 | +5 |
| 3 | Kheo leo / Timing | 3 | +5 |
| 4 | Chien thuat | 2 | +5 |
| 5 | Nhanh tay | 3 | +4 |
| 6 | Nho / Pattern | 2 | +5 |
| 7 | Toc do / Endless runner | 2 | +5 |
| 8 | Sinh ton | 3 | +4 |
| 9 | Luyen tap / Skill | 4 | +5 |
| 10 | Sang tao / Sandbox | 3 | +5 |
| 11 | Chien dau / Arcade | 2 | +5 |
| 12 | Thu gian / Zen | 3 | +5 |
| | **Total** | **33** | **67** |

---

**Generated:** 2026-06-02
**Auditor:** Claude agent
**Next Review:** 2026-06-09 (sau 1 tuan execution)
**File Location:** `reports/MUONNOI_CONTINUOUS_DEV_AUDIT_PLAN_2026-06-02.md`
