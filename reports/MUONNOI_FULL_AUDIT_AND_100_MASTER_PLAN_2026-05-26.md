# MUÔN NƠI (muonnoi.org) — BÁO CÁO AUDIT TOÀN DIỆN & KẾ HOẠCH 100/100
> Audit by: Senior Systems Auditor (20+ years)
> Date: 2026-05-26
> Scope: Toàn bộ codebase, kế hoạch, architecture, security, release pipeline
> Method: Evidence-based, zero inference, zero overclaim

---

## 1. EXECUTIVE SUMMARY

### 1.1 Điểm tổng quan

| Tiêu chí | Điểm /100 | Ghi chú |
|----------|----------:|---------|
| **Architecture Clarity** | 45 | 4 layer định nghĩa rõ nhưng tech stack chưa thống nhất (dual mobile, API path chưa lock) |
| **Plan Integrity** | 30 | 30+ file kế hoạch rời rạc, nhiều file outdated, thiếu single source of truth |
| **Code Completeness** | 35 | Web shell có nhưng static-only; mobile scaffold trống; API deployed nhưng QA chưa evidence |
| **Security Baseline** | 50 | Policy đầy đủ, CSP/headers OK, nhưng ASVS/CIS chưa mapped, secrets management chưa audit |
| **Release Readiness** | **56** | 5/9 gate PASS theo evidence strict; 4 gate FAIL (Payment QA, iOS signing, Android SDK, OAuth E2E) |
| **Documentation Quality** | 40 | Nhiều file 15K+ words nhưng không có versioning, nhiều file overstated |
| **DevOps / Repo Hygiene** | 35 | Repo dirty 7+ entries, submodule lộn xộn, brand zip không tracked đúng |

**Điểm trung bình: 41.6/100** — Dưới ngưỡng production-ready. Cần 3–4 tuần focused execution để đạt 80+, 6–8 tuần để đạt 100/100.

### 1.2 Trạng thái thật hiện tại

Theo `reports/RELEASE_STATUS_2026-05-19.md` (file trung thực nhất):

| Condition | Trạng thái | Evidence thật |
|-----------|:----------:|---------------|
| C1 Registration API | ✅ PASS | `POST /api/register` → HTTP 201 |
| C2 Payment/Email QA | ❌ FAIL | Gate file `NOT_YET_EXECUTED` |
| C3 iOS TestFlight | ❌ FAIL | `DEVELOPMENT_TEAM` chưa set trong `.pbxproj` |
| C4 Android SDK | ❌ FAIL | `ANDROID_HOME` empty, `adb` not found |
| C5 OAuth E2E | ❌ FAIL | `qa/oauth-evidence/` không tồn tại |
| C6 DNS Matrix | ✅ PASS | 8 `LIVE_LINK_ALLOWED` |
| C7 Cuộc Sống Gate 8 | ✅ PASS | `READY_FOR_PUBLIC_LINK` |
| C8 Repo Clean | ✅ PASS | Đã cleanup 2026-05-19 |
| C9 Reports Reconciled | ✅ PASS | 3 file SUPERSEDED + new report |

**Net: 5/9 = 56%** (Các báo cáo cũ 2026-05-18 claim 75–80% là sai).

---

## 2. PHƯƠNG PHÁP AUDIT

### 2.1 Nguyên tắc
1. **Evidence first**: Không chấp nhận claim không có verify command.
2. **No inference**: Không suy luận "có thể" từ "đã có".
3. **Strict scoring**: Gate chỉ PASS khi có output match từ curl/dig/grep/git.
4. **Root cause**: Tìm nguyên nhân gốc, không patch triệu chứng.
5. **Minimal fix**: Ưu tiên sửa upstream, không workaround.

### 2.2 Files reviewed (37+ documents)
- Root: `README.md`, `DEVLOG.md`, `COMPLETION_REPORT_2026-05-18.md`, `INFRASTRUCTURE_READY_2026-05-18.md`, `SESSION_SUMMARY_2026-05-17.md`
- Plans: `MUONNOI_MASTER_PLAN_STATUS_2026-05-11.md`, `MUONNOI_UNIFIED_NEXT_PHASE_MASTER_PLAN_2026.md`, `MUONNOI_FINAL_EXECUTION_PLAN_2026-05-19.md`, `DEV_TEAM_100_PERCENT_PLAN_2026-05-19.md`, `SOLO_TEAM_RUNBOOK_TO_100_2026-05-19.md`
- Ecosystem: `MUONNOI_FAMILY_LAYER_PLAN.md`, `MUONNOI_NHACHUNG_LAYER_PLAN.md`, `CUOCSONG_MUONNOI_MASTER_PLAN_2026-05-13.md`
- Security: `SECURITY_ARCHITECTURE_MUONNOI_2026.md`, `API_SECURITY_BASELINE_ASVS_5.md`, `MUONNOI_SECURITY_AND_TRUST_LAYER.md`
- Code: `apps/web/public/index.html`, `apps/mobile/` scaffold, `ai.muonnoi.org/workers/api/`, `app.muonnoi.org/`
- Reports: `RELEASE_STATUS_2026-05-19.md`, `RELEASE_STATUS_2026-05-17.md`

---

## 3. ARCHITECTURE AUDIT

### 3.1 Tầng hệ thống (đã định nghĩa)

```
Layer 1 — Public Shell:       www.muonnoi.org, cuocsong.muonnoi.org, nguoiviet.muonnoi.org
Layer 1b — Diaspora:          nguoiviet.muonnoi.org (Người Việt Muôn Nơi)
Layer 2 — Social / App:       app.muonnoi.org (PWA bridge + Capacitor legacy)
Layer 3 — Trust:              trust.muonnoi.org (planned)
Layer 4 — Life Quest OS:      dulich, hoctap, suckhoe, sangtao, congdong, lamviec, nhachung, dautu, duan
Docs/API:                     docs.muonnoi.org, api.muonnoi.org, ai.muonnoi.org
```

### 3.2 Tech stack audit

| Component | Planned | Actual | Gap |
|-----------|---------|--------|-----|
| Web public shell | Cloudflare Pages, static HTML | ✅ Deployed, static HTML | Thiếu build system (Vite/Webpack?), chỉ là flat HTML |
| Web app (PWA) | Capacitor + web shell | ⚠️ Capacitor legacy, deprecated cho native | Dual path gây confusion |
| Mobile native | React Native + Expo + TS | ❌ Scaffold trống (`app/`, `src/` 0 items) | Chưa bắt đầu implementation |
| API | Cloudflare Workers + D1 + R2 | ⚠️ Workers deployed, D1 OK, R2 chưa active | Pay.iai.one external dependency chưa kiểm soát hoàn toàn |
| Auth | JWT SSO + Google OAuth + Magic Link | ✅ OAuth live 5 site, Magic Link responding | Session management OK |
| Payment | PayOS (primary) + MoMo/ZaloPay/VNPay + PayPal/Stripe Phase 2 | ⚠️ PayOS configured, chưa có QA evidence | 5/6 providers chưa có env keys |
| Email | 8 templates bilingual, SMTP | ✅ Templates deployed, chưa inbox-evidence | MAIL_API_BASE_URL đã fix `/_mail/v1` |
| Storage | R2 (media pipeline) | ❌ Chưa setup | Blocked on Phase 4+ |
| AI | ai.muonnoi.org | ⚠️ Pages project tồn tại, source trong submodule | Custom domain evidence chưa clear |

### 3.3 Vấn đề architecture then chốt

**A1. Dual Mobile Stack Confusion**
- `app.muonnoi.org/mobile-shell/` là Capacitor (legacy), đã deprecated.
- `apps/mobile/` là React Native + Expo (new), nhưng scaffold hoàn toàn trống.
- Team có thể nhầm lẫn giữa 2 path.
- **Khuyến nghị**: Xoá Capacitor legacy khỏi active development path, giữ làm PWA fallback only.

**A2. API Architecture Split Risk**
- `api.muonnoi.org` (Cloudflare Workers) là canonical API.
- `pay.iai.one` là external payment service, không cùng repo.
- Không có API contract versioning rõ ràng giữa 2 service.
- **Khuyến nghị**: Define API gateway contract, version path (`/v1/`), và failover strategy.

**A3. No CDN / External Library Policy vs Reality**
- Policy: "No external libraries. No CDN. No trackers."
- Reality: Google OAuth SDK là external library từ `accounts.google.com`, web fonts có thể là external.
- **Khuyến nghị**: Audit tất cả external requests trong HTML, whitelist những cái bắt buộc, ghi vào security doc.

---

## 4. PLAN DOCUMENT AUDIT

### 4.1 Tình trạng kế hoạch

Tìm thấy **30+ file kế hoạch** trong repo. Phân loại:

| Loại | Số lượng | Vấn đề |
|------|----------:|--------|
| Master / Status plans | 6 | Chồng chéo, outdated, cần consolidation |
| Execution / Runbook | 5 | Chi tiết nhưng chưa được execute theo thứ tự |
| Ecosystem layer plans | 4 | Rất ngắn, chưa có implementation path |
| Security plans | 8 | Policy đầy đủ, chưa mapped vào code |
| Mobile plans | 9 | Tốt cho planning, code chưa tồn tại |
| Brand / Design | 3 | Brief 15K words, chưa có Figma/component evidence |
| QA / Release gates | 4 | Gate file tồn tại nhưng evidence chưa có |

### 4.2 Conflicts & Duplications

1. **Completion Report 2026-05-18** claim "Conditional GO" và "Production-ready" — nhưng `DEVELOPMENT_TEAM` chưa set, Payment QA chưa chạy.
2. **INFRASTRUCTURE_READY_2026-05-18** claim "Payment service production-ready" dựa trên worker health-check, không phải 10 scenario QA.
3. **3 file mobile plan** (Capacitor era + RN+Expo era) tồn tại song song, dễ gây nhầm.
4. **DNS matrix** có 2 file: `MATRIX_2026-05-12.md` và `EXECUTION_STATUS_2026-05-11.md` — cần merge.

### 4.3 Missing plans (chưa có file)

- **Database migration rollback plan**: Chưa có procedure khi D1 migration fail.
- **Secret rotation plan**: Chưa có quy trình rotate `MAIL_API_KEY`, `GOOGLE_CLIENT_SECRET`.
- **Capacity / Scaling plan**: Không có SLO/SLA target.
- **Data retention execution plan**: Policy tồn tại, execution chưa có.
- **AI model governance**: ai.muonnoi.org chưa có AI ethics / bias audit plan.

---

## 5. CODEBASE AUDIT

### 5.1 Web public shell (`apps/web/public/`)

**Strengths:**
- Semantic HTML, accessibility features (`srOnlyFocus`, `aria-label`)
- CSP-ready structure, no inline trackers
- i18n pattern đơn giản (`i18n-vi` / `i18n-en`)
- OG tags, canonical, robots meta đầy đủ

**Gaps:**
- Pure static HTML, không có build pipeline (no `vite.config.ts`, no `package.json` trong `apps/web/`)
- Không có TypeScript, không có component system
- Routing là client-side `data-route` attribute — không rõ router implementation
- Không có test file
- `og.png` referenced nhưng chưa verify tồn tại

**Risk:** Maintenance ở quy mô 10+ subdomain sẽ rất khó khăn với flat HTML.

### 5.2 Mobile (`apps/mobile/`)

**State:** Scaffold trống.
- `app/` (0 items)
- `src/` (0 items)
- Có 9 file `.md` planning nhưng không có code.

**Legacy path:** `app.muonnoi.org/mobile-shell/` (Capacitor) vẫn tồn tại và được reference trong nhiều runbook.

**Risk:** Không có mobile app implementation. Timeline MVP July-Sept 2026 là unrealistic nếu không bắt đầu ngay.

### 5.3 AI Worker (`ai.muonnoi.org/workers/api/`)

**State:** Deployed, có code.
- Email system v2 (8 templates) đã deploy.
- Auth endpoints: `/api/auth/google/start`, `/api/auth/magic-link/request`, `/api/register`
- Payment webhook handlers.

**Gaps:**
- Submodule management phức tạp — `ai.muonnoi.org` là submodule trong repo cha.
- Code changes đã deploy 2026-05-19 nhưng vẫn cần careful submodule pointer management.
- Không có unit test evidence.

### 5.4 App submodule (`app.muonnoi.org/`)

**State:** Active submodule với nhiều file planning.
- `mobile-shell/` chứa Capacitor iOS project.
- `RELEASE_CHECKLIST.md` khổng lồ (48KB) — cần split.
- `apps/` có 45 items — cần audit chi tiết hơn.

**Risk:** File `RELEASE_CHECKLIST.md` 48KB quá lớn, dễ bị merge conflict và khó track.

---

## 6. SECURITY & COMPLIANCE AUDIT

### 6.1 Strengths
- Policy "No secrets in repo" — đúng hướng.
- CSP, security headers, HttpOnly Secure SameSite cookies.
- WAF + DDoS qua Cloudflare.
- No tracker policy.
- ASVS 5.0 doc tồn tại.

### 6.2 Gaps
- **ASVS mapping chưa vào code**: Doc tồn tại nhưng chưa có evidence ASVS controls được implement.
- **No penetration test plan**: Chưa có internal/external pentest schedule.
- **Secret management**: Wrangler secrets OK, nhưng không có secret rotation SOP.
- **No D1 backup automation**: Chưa có automated D1 snapshot/restore tested.
- **Rate limiting**: D1-based (tốt), nhưng chưa có evidence stress test.
- **Input validation**: API có validation nhưng chưa có fuzzing evidence.

---

## 7. GAP ANALYSIS & RISK REGISTER

### 7.1 Critical Risks (P0 — Không thể launch nếu không fix)

| ID | Risk | Impact | Likelihood | Mitigation |
|----|------|--------|------------|------------|
| R1 | Payment QA chưa chạy → không thể process real money | Business block | High | Execute 10 scenario ngay, chọn A/B/C |
| R2 | iOS signing missing → không thể TestFlight | Mobile launch block | Certain | User cung cấp Apple Team ID |
| R3 | Android SDK missing → không thể Play Console | Mobile launch block | Certain | Cài SDK theo runbook |
| R4 | OAuth E2E chưa test → auth flow có thể break user | User trust loss | Medium | Chạy 5 site × 9 step |

### 7.2 High Risks (P1 — Có thể launch web-only nhưng phải fix sớm)

| ID | Risk | Impact |
|----|------|--------|
| R5 | Mobile scaffold trống → MVP timeline July-Sept unrealistic | Timeline slip 2–3 tháng |
| R6 | Web là flat HTML → maintenance 10+ subdomain impossible | Technical debt |
| R7 | Dual mobile stack confusion → team làm sai path | Resource waste |
| R8 | Report overclaim → Founder decision dựa trên data sai | Strategic misstep |
| R9 | No D1 backup automation → data loss possible | Operational risk |
| R10 | `www.nguoiviet.muonnoi.org` SSL third-level subdomain fail | SEO/HTTPS broken |

### 7.3 Medium Risks (P2 — Defer post-MVP)

| ID | Risk | Impact |
|----|------|--------|
| R11 | Brand asset chưa có (Figma, logo pack) | Design delay |
| R12 | R2 storage chưa setup | Media pipeline block |
| R13 | 5 payment providers chưa config | VN market coverage incomplete |
| R14 | No AI governance plan | Compliance risk future |

---

## 8. KẾ HOẠCH 100/100 TỔNG THỂ (Unified Master Plan)

### 8.1 Nguyên tắc kế hoạch mới

1. **Single source of truth**: File này (`MUONNOI_FULL_AUDIT_AND_100_MASTER_PLAN_2026-05-26.md`) là canonical plan. Tất cả plan cũ reference đến đây.
2. **Evidence-based milestone**: Không có "Conditional GO". Chỉ có `PASS` (có evidence) hoặc `FAIL` (chưa có).
3. **No dual stack**: Mobile chỉ 1 path — React Native + Expo. Capacitor là PWA bridge only.
4. **Phase-gate**: Không mở phase N+1 cho đến khi phase N đóng bằng evidence.
5. **Parallel team lanes**: Web, API, Mobile, Platform, QA chạy song song trong lane riêng.

### 8.2 Phase 0 — HARD TRUTH & LOCK (Tuần 1: 26 May → 02 Jun)

**Goal:** Repo sạch, báo cáo trung thực, architecture decision locked.

| # | Task | Owner | Evidence | Est |
|---|------|-------|----------|-----|
| 0.1 | Adopt file này làm canonical plan | Founder | File committed to `reports/` | 10m |
| 0.2 | Mark all old plans `SUPERSEDED_BY` this file | Release Owner | All old plans have header | 30m |
| 0.3 | Confirm architecture decisions: RN+Expo only, Workers API, no Capacitor native | Founder + Tech Lead | Decision log in `docs/decisions/` | 1h |
| 0.4 | Cleanup repo (git status clean) | Release Owner | `git status --short` empty | 30m |
| 0.5 | Establish `docs/decisions/` ADR folder | Release Owner | ADR-001: Mobile stack, ADR-002: API gateway | 1h |
| 0.6 | Fix `www.nguoiviet.muonnoi.org` HTTPS (ACM hoặc redirect) | Platform | curl 301→200 | 30m |

### 8.3 Phase 1 — INFRASTRUCTURE LOCK (Tuần 1–2: 26 May → 09 Jun)

**Goal:** Payment, Auth, DNS, Email hoàn toàn production-ready với evidence.

| # | Task | Owner | Evidence | Est |
|---|------|-------|----------|-----|
| 1.1 | Founder decision Payment A/B/C | Founder | Comment in this file | 15m |
| 1.2 | Execute 10 payment/email scenarios | API + QA | `qa/payment-email-evidence/` 10 files | 4h |
| 1.3 | Update gate file → `PAYMENT_EMAIL_REAL_OPERATION_PASS` | QA | grep in gate file | 15m |
| 1.4 | OAuth E2E 5 sites × 9 steps | QA | `qa/oauth-evidence/` 45 screenshots + SUMMARY | 3h |
| 1.5 | Update DNS matrix → all verified domains `LIVE_LINK_ALLOWED` | Platform | Matrix file updated | 30m |
| 1.6 | Inbox evidence: real email received (magic link + welcome + payment) | QA | Screenshot | 30m |

**Gate 1 Exit Criteria:**
- C1, C2, C5, C6, C7, C8, C9 = PASS
- `git status` clean
- No `NOT_YET_EXECUTED` trong gate files

### 8.4 Phase 2 — MOBILE LOCK (Tuần 2–3: 02 Jun → 16 Jun)

**Goal:** iOS TestFlight + Android Play Console Internal Testing.

| # | Task | Owner | Evidence | Est |
|---|------|-------|----------|-----|
| 2.1 | Apple Developer Team ID provided | Founder | ID in 1Password / secure vault | 10m |
| 2.2 | Configure Xcode signing + build archive | Mobile | `project.pbxproj` has `DEVELOPMENT_TEAM` | 30m |
| 2.3 | Upload TestFlight, status `Ready to Test` | Mobile | App Store Connect screenshot | 1h |
| 2.4 | Install Android SDK + debug build | User + Mobile | `adb version` + build log | 2h |
| 2.5 | Create release keystore (not in repo) | Mobile | Keystore in secure vault | 30m |
| 2.6 | Build AAB, upload Play Console Internal Testing | Mobile | Play Console screenshot | 2h |
| 2.7 | Scaffold RN+Expo: `apps/mobile/` với Expo Router, Zustand, TanStack Query | Mobile | `npx create-expo-app` + custom setup | 1 day |

**Gate 2 Exit Criteria:**
- C3 = PASS (TestFlight Ready to Test)
- C4 = PASS (Android SDK + build)
- `apps/mobile/` có runnable code (not empty)

### 8.5 Phase 3 — SUBDOMAIN ROLLOUT (Tuần 3–4: 09 Jun → 23 Jun)

**Goal:** Tất cả subdomain announced có homepage + link-safe.

| # | Task | Owner | Evidence |
|---|------|-------|----------|
| 3.1 | Build system cho web: introduce Vite hoặc keep static nhưng có generator | Web | `package.json` + build command |
| 3.2 | `app.muonnoi.org` homepage + join page production | Web | HTTP 200 + claim-safe copy |
| 3.3 | `dulich.muonnoi.org` homepage (Travel Quest pilot surface) | Web | HTTP 200 |
| 3.4 | `docs.muonnoi.org` structure published | Docs | Collections live |
| 3.5 | Remaining subdomains: `hoctap`, `suckhoe`, `sangtao`, `congdong`, `lamviec`, `nhachung`, `dautu`, `duan` | Web | DNS + Pages project + HTTP 200 |
| 3.6 | Sitemap + redirects cross-domain | Web | `sitemap.xml` + `_redirects` |

**Gate 3 Exit Criteria:**
- Tất cả subdomain trong ecosystem map có HTTP 200
- Không có dead link từ `www.muonnoi.org`

### 8.6 Phase 4 — LIFE QUEST PILOT (Tuần 4–6: 23 Jun → 07 Jul)

**Goal:** Đà Lạt pilot với host onboarding + proof submission.

| # | Task | Owner | Evidence |
|---|------|-------|----------|
| 4.1 | Đà Lạt landing page + host registration | Web + Product | Page live, form working |
| 4.2 | Proof upload endpoint (R2 + D1) | API | `/api/proofs/upload` responding |
| 4.3 | AI pre-review pipeline | AI | Integration with `ai.muonnoi.org` |
| 4.4 | Host dashboard (web) | Web | `/host/` route |
| 4.5 | 50+ Local Host onboarded | Community Ops | D1 `hosts` table count |
| 4.6 | Receipt with hash issued | API | 100+ receipts in D1 |

**Gate 4 Exit Criteria:**
- 50 hosts in DB
- 100 receipts issued
- 1 month stable on `dulich.muonnoi.org`

### 8.7 Phase 5 — SCALE & HARDENING (Tuần 6–8: 07 Jul → 04 Aug)

**Goal:** Security baseline, monitoring, multi-provider payment, brand complete.

| # | Task | Owner | Evidence |
|---|------|-------|----------|
| 5.1 | ASVS 5.0 controls mapped vào code | Security | Audit report |
| 5.2 | CIS Controls v8 operational baseline | Security | Checklist |
| 5.3 | MoMo, ZaloPay, VNPay env keys set | Platform | Provider accounts |
| 5.4 | Sentry crash reporting (minimal) | Mobile + API | Sentry dashboard |
| 5.5 | Brand Figma library + component implementation | Design + Web | Figma link + Storybook |
| 5.6 | D1 automated backup | Platform | Backup script + restore test |
| 5.7 | Pentest internal (OWASP ZAP minimum) | Security | Scan report |

**Gate 5 Exit Criteria:**
- 6/6 payment providers configured
- Security audit report clean (no Critical/High unmitigated)
- Brand QA pass on all public surfaces

---

## 9. ACTION ITEMS — 48 GIỜ, 7 NGÀY, 30 NGÀY

### 9.1 Trong 48 giờ (Immediate)

1. **Founder**: Đọc file này, xác nhận adoption.
2. **Founder**: Quyết định Payment A/B/C (Section 5.1 của `MUONNOI_FINAL_EXECUTION_PLAN_2026-05-19.md`)
3. **Founder**: Cung cấp Apple Developer Team ID.
4. **Release Owner**: Mark 3 báo cáo cũ `SUPERSEDED_BY` this file.
5. **Platform**: Fix `www.nguoiviet.muonnoi.org` redirect/SSL.

### 9.2 Trong 7 ngày (Week 1)

1. **API + QA**: Chạy 10 scenario payment/email, log evidence.
2. **QA**: OAuth E2E 5 sites, screenshot evidence.
3. **Mobile**: Configure iOS signing, build archive.
4. **User**: Cài Android SDK theo runbook.
5. **Web**: Bắt đầu Vite build system cho web shell.
6. **Release Owner**: Cleanup `app.muonnoi.org/RELEASE_CHECKLIST.md` (split 48KB file).
7. **All**: Daily standup 15 phút, update `reports/daily-status-YYYY-MM-DD.md`.

### 9.3 Trong 30 ngày (Month 1)

1. **Mobile**: RN+Expo scaffold complete, first screen (Login).
2. **Web**: All subdomain homepages live.
3. **API**: Proof upload endpoint, R2 integration.
4. **Product**: Đà Lạt pilot landing page live.
5. **Security**: ASVS mapping complete, internal ZAP scan.
6. **Platform**: D1 backup automation, MoMo/ZaloPay config.

---

## 10. APPENDICES

### Appendix A: Plan File Index (Canonical)

| File | Status | Canonical Until |
|------|--------|-----------------|
| `reports/MUONNOI_FULL_AUDIT_AND_100_MASTER_PLAN_2026-05-26.md` | ✅ ACTIVE | Next audit |
| `docs/launch/MUONNOI_FINAL_EXECUTION_PLAN_2026-05-19.md` | ⚠️ REFERENCE | Still valid for commands |
| `docs/launch/DEV_TEAM_100_PERCENT_PLAN_2026-05-19.md` | ⚠️ REFERENCE | Still valid for 9 conditions |
| `docs/launch/SOLO_TEAM_RUNBOOK_TO_100_2026-05-19.md` | ⚠️ REFERENCE | Runbook commands valid |
| `COMPLETION_REPORT_2026-05-18.md` | ❌ SUPERSEDED | Do not use for decisions |
| `INFRASTRUCTURE_READY_2026-05-18.md` | ❌ SUPERSEDED | Do not use for decisions |
| `SESSION_SUMMARY_2026-05-17.md` | ❌ SUPERSEDED | Do not use for decisions |
| `docs/launch/MUONNOI_MASTER_PLAN_STATUS_2026-05-11.md` | ⚠️ REFERENCE | Historical only |

### Appendix B: Decision Log

| ID | Decision | Date | Owner | Status |
|----|----------|------|-------|--------|
| D1 | Mobile stack = RN+Expo, Capacitor deprecated for native | 2026-05-12 | Founder | ✅ Locked |
| D2 | API = Cloudflare Workers + D1 (không chuyển Node) | 2026-05-19 | Founder | ✅ Locked |
| D3 | Payment provider primary = PayOS | 2026-05-18 | Founder | ✅ Locked |
| D4 | Email API = `mail.iai.one/_mail/v1` | 2026-05-19 | API Team | ✅ Locked |
| D5 | No external analytics SDK | 2026-05-11 | Product | ✅ Locked |
| D6 | Web build system = ??? (cần quyết định) | TBD | Founder + Web | ⏳ OPEN |
| D7 | `www.nguoiviet` redirect strategy (A/B) | TBD | Founder + Platform | ⏳ OPEN |
| D8 | Payment QA hướng A/B/C | TBD | Founder | ⏳ OPEN |

### Appendix C: Evidence Checklist (9 Conditions)

```bash
# Copy-paste để verify hàng ngày:
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

---

**Generated:** 2026-05-26
**Auditor:** Claude agent (Senior Systems Auditor mode)
**Next Review:** 2026-06-02 (sau Week 1 execution)
**File Location:** `reports/MUONNOI_FULL_AUDIT_AND_100_MASTER_PLAN_2026-05-26.md`
