# Muôn Nơi Mobile · Team Handoff Index
**Document**: `MUONNOI_MOBILE_TEAM_HANDOFF_INDEX_2026-05-12`
**Status**: HANDOFF READY (build gate: Travel Quest web pilot ≥ 1 month stable)
**Date**: 2026-05-12
**Owner**: Mobile Lead (TBD) — Founder approves Gate 1

---

## 1. Deliverable files (5 docs)

| File | Purpose | Owner | Status |
|------|---------|-------|--------|
| `apps/mobile/MUONNOI_MOBILE_APP_PLAN_2026-05-12.md` | Master plan, 22 sections (architecture, tech stack, sprint plan, risks, go/no-go) | Mobile Lead | READY |
| `apps/mobile/MOBILE_API_ENDPOINTS_MUONNOI_2026-05-12.md` | API spec cho `/api/mobile/*` endpoints (device register, push, nearby quests, proof batch, sync status, feature flags) | Backend Eng | IN PROGRESS |
| `apps/mobile/MOBILE_OFFLINE_SYNC_PROTOCOL_2026-05-12.md` | Sync queue + idempotency keys + retry policy + conflict resolution rules | Mobile Senior Eng | IN PROGRESS |
| `apps/mobile/MOBILE_PRIVACY_AND_STORE_COMPLIANCE_2026-05-12.md` | App Store Privacy + Play Store Data Safety + GDPR + VN Decree 53/2022 + COPPA | Privacy/Legal | IN PROGRESS |
| `apps/mobile/MOBILE_QA_AND_RELEASE_CHECKLIST_2026-05-12.md` | QA matrix (devices, OS versions, scenarios) + release gates + submission checklist | QA Lead | IN PROGRESS |

---

## 2. Tech stack tóm tắt

| Layer | Choice | Notes |
|---|---|---|
| Language | TypeScript (strict) | — |
| Framework | React Native | Latest stable |
| Toolchain | Expo SDK stable latest | **KHÔNG khoá cứng version** — dùng stable latest tại thời điểm triển khai. SDK 52+ chỉ là baseline minimum nếu New Architecture cần. |
| Build | EAS Build | Custom dev client |
| Updates | EAS Update | OTA chỉ cho JS-only changes; native changes → full rebuild + store submission |
| Navigation | Expo Router (file-based) | Universal links built-in |
| State client | Zustand | — |
| State server | TanStack Query v5 | Persistent cache cho offline |
| Forms | React Hook Form + Zod | — |
| Camera | `expo-camera` | EXIF capture cho proof |
| Location | `expo-location` | When-in-use only, **no background tracking** |
| Notifications | `expo-notifications` | APNs (iOS) + FCM messaging-only (Android) |
| Biometric | `expo-local-authentication` | Face ID / Touch ID / Android biometric |
| Storage | `expo-secure-store` (sensitive) + AsyncStorage (other) | — |
| Auth | JWT từ `identity.muonnoi.org` | + biometric local unlock |
| Backend | `api.muonnoi.org` (Cloudflare Workers + D1 + R2) | Existing infra, mobile endpoints extension |
| Crash monitoring | Sentry (minimal config) | KHÔNG dùng Crashlytics |
| Analytics | NONE third-party | App health metrics tự host trên own backend |
| Testing | Jest + RNTL + Maestro (E2E) | — |

**Banned SDKs:** Firebase Analytics, Google Analytics, Mixpanel, Amplitude, AppsFlyer, Adjust, Crashlytics.

---

## 3. Build gate

**Tiền điều kiện MVP (gate hard):**

1. Travel Quest web pilot Đà Lạt đã chạy ổn ≥ **1 tháng** trên `dulich.muonnoi.org`.
2. Backend proof/reward endpoints có **≥ 100 receipt issued** thật (không phải test).
3. **50+ Local Host** onboarded ở Đà Lạt pilot.
4. `api.muonnoi.org` extended với mobile-specific endpoints (`/api/mobile/*`).

**Web pilot launches:** May-June 2026 (soft launch).
**Mobile MVP earliest start:** July 2026 (sau ≥ 1 tháng web pilot stable).
**Mobile MVP target launch:** September 2026 (cuối 12-tuần sprint).

Reasoning: không làm mobile quá sớm khi backend proof/reward chưa rõ. Mobile là killer feature cho Travel Quest, nhưng chỉ có giá trị khi web đã chứng minh proof economy hoạt động.

---

## 4. Team roles & headcount

### Core team mobile (4-5 người)

| Role | Headcount | Responsibility |
|---|---|---|
| Mobile Lead | 1 | Architecture, code review, releases, sprint planning |
| Senior RN Engineer | 1 | Auth + Quest browsing + Proof submission modules |
| Mid RN Engineer | 1 | Profile + Trust + Offline sync engine |
| Mobile Designer | 1 | UX/UI, design system, prototypes, iOS HIG + Material 3 compliance |
| QA Engineer | 1 | Manual + automation (Maestro), device matrix coverage |

### Shared với web team

- **Backend Engineer** — extends `api.muonnoi.org` with `/api/mobile/*` endpoints
- **Product Manager** — shared roadmap, sprint priorities
- **Localization** — VI/EN review cho mobile copy

### External resources / infra cost

- Apple Developer Program: $99/year
- Google Play Console: $25 one-time
- Expo EAS Production: $99/month
- TestFlight: free
- Sentry (mobile): $26/month

**Total mobile-specific infra:** < $200/month

---

## 5. Sprint plan 12 tuần

| Sprint | Tuần | Focus | Key outputs |
|---|---|---|---|
| Sprint 1-2 | 1-2 | Foundation | Repo + Expo + TS + ESLint setup, EAS Build/Update configured, design system foundation, bottom tab nav skeleton, VI/EN i18n setup, App icon + splash |
| Sprint 3-4 | 3-4 | Auth + Onboarding | Welcome carousel (3 screens), email + phone OTP, SSO với `identity.muonnoi.org`, biometric setup, secure storage, Settings screen basic |
| Sprint 5-6 | 5-6 | Quest browsing | Quest list (filter, search), quest detail với map preview, host profile, nearby quests using GPS, offline cache cho quests |
| Sprint 7-8 | 7-8 | Proof submission | Camera + EXIF capture, GPS proof component, photo preview/retake, reflection text input, host signature QR scan, 4-step submission wizard, offline queue |
| Sprint 9-10 | 9-10 | Profile + Trust + Sync | Profile screen với receipts list, Trust score viz, receipt detail, offline sync engine end-to-end, background sync triggers |
| Sprint 11 | 11 | Polish + Pre-launch | Animation polish, empty states, error handling, push notification flow tested, accessibility audit (VoiceOver + TalkBack), perf audit (60fps + < 2s cold start), internal beta TestFlight + Play Console |
| Sprint 12 | 12 | Submission + Launch | App Store + Play Store submission, screenshots 6.7"/6.5"/5.5" (8 each per locale), description VI + EN, promo video 30s, Privacy Policy URL live |

---

## 6. Critical path

1. **Backend Eng**: extend `api.muonnoi.org` with `/api/mobile/*` endpoints (parallel to web team) — bắt đầu Sprint 1-2.
2. **Mobile Lead**: scaffold RN + Expo repo, set up EAS Build, design system foundation — Sprint 1-2.
3. **Senior RN Eng**: build Auth + Onboarding (Sprint 3-4), then Proof Submission (Sprint 7-8).
4. **Mid RN Eng**: build Quest browsing (Sprint 5-6), then Profile + Sync (Sprint 9-10).
5. **QA Lead**: build Maestro test suite parallel to feature dev (Sprint 3+), full device matrix by Sprint 11.
6. **Privacy/Legal**: prepare App Store Privacy form + Play Store Data Safety form + Mobile Privacy Notice URL by Sprint 11.

**Dependencies between roles:**
- Senior RN Eng phải có Auth done (Sprint 4) trước khi Mid RN Eng wire Profile API (Sprint 9).
- Backend Eng phải có `/api/mobile/proofs/upload-batch` ready by Sprint 7 (proof submission start).
- Privacy/Legal phải có Mobile Privacy Notice live by Sprint 11 (submission yêu cầu URL hợp lệ).

---

## 7. Decision log

| Date | Decision | Rationale |
|---|---|---|
| 2026-05-12 | Tech stack chốt **React Native + Expo** (vs Flutter, vs native iOS+Android) | Code sharing 90%+, team cost 1x, OTA via EAS, recruitment dễ tại VN |
| 2026-05-12 | **Capacitor `app.muonnoi.org` mobile-shell deprecated** cho native app | PWA bridge giữ, không mở rộng feature trên Capacitor; feature mới đi vào RN+Expo plan |
| 2026-05-12 | Build gate = **Web pilot ≥ 1 month stable** | Không làm mobile quá sớm khi backend proof/reward chưa rõ |
| 2026-05-12 | Expo SDK version = **stable latest** (không khoá cứng) | Tránh lock-in version cũ; SDK 52+ baseline nếu New Architecture cần |
| 2026-05-12 | **10 nguyên tắc bất biến** công bố | Inherit từ Muôn Nơi web ecosystem; mobile không phá vỡ |
| 2026-05-12 | **NO third-party analytics** (Firebase Analytics, GA, Mixpanel, Amplitude, AppsFlyer, Adjust, Crashlytics) | Privacy-first positioning; differentiator vs competitors; ATT not required |
| 2026-05-12 | FCM **messaging-only** cho Android push | Google Play yêu cầu FCM nhưng KHÔNG bật Firebase Analytics hay tracking khác |
| 2026-05-12 | Max **1 push/day per user** (system-enforced) | Anti-engagement-loop principle; wellbeing-first |
| 2026-05-12 | Age rating **13+** | COPPA + GDPR-K compliance; minors → family pod by parent |

---

## 8. Risks (top 5 from master plan)

| # | Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| 1 | App Store rejection on first submission | Medium | Medium | Pre-review with Expo, clear permission strings (VI+EN), permission descriptions linked to feature usage |
| 2 | Offline sync corruption | Medium | High | Idempotency keys, server-side dedup, retry logic with exponential backoff, FIFO queue, max 3 attempts |
| 3 | Camera/GPS permission denial → unusable | Medium | High | Onboarding explains value upfront, graceful degradation (proof submission shows what user can/can't do without permission) |
| 4 | Native module incompatibility | Low | Medium | Expo modules only (avoid bare workflow), test on physical devices early, lock to SDK stable latest |
| 5 | App Store policy change | Medium | Medium | Position as **Lifestyle** primary category (not Social Networking), conservative permission usage, ATT not required (no cross-app tracking) |

Full risk register: see `apps/mobile/MUONNOI_MOBILE_APP_PLAN_2026-05-12.md` section 20 (12 risks total).

---

## 9. Approval gates

| Gate | When | What | Approver | Status |
|---|---|---|---|---|
| Gate 1 (Sprint 0) | 2026-05-12 | Founder approve tech stack + budget + 10 nguyên tắc bất biến | Founder | DONE 2026-05-12 |
| Gate 2 (Sprint 8) | End of Tuần 8 | MVP feature complete sign-off (Auth + Quest + Proof + Profile + Offline sync end-to-end) | Founder + QA Lead | PENDING |
| Gate 3 (Sprint 11) | End of Tuần 11 | Beta testing acceptance (crash-free ≥ 99.5%, all critical flows tested on iPhone 12-15 + 3 Android models, push + deep links work) | Mobile Lead + Founder | PENDING |
| Gate 4 (Sprint 12) | End of Tuần 12 | Public launch (App Store + Play Store live, Privacy Policy + Terms + Mobile Privacy Notice live, support@muonnoi.org staffed, crash dashboard monitored, server capacity tested for 10x mobile traffic) | Founder + Legal + Operations | PENDING |

Web ecosystem dependencies (gate prerequisites, not mobile-side):
- Travel Quest web pilot ≥ 1 month stable on `dulich.muonnoi.org` (gate prerequisite for Sprint 1 start).
- 50+ Local Host onboarded (gate prerequisite for Gate 4 public launch).
- `nguoiviet.muonnoi.org` brand routes stable for mobile deep-link inheritance (gate prerequisite for Sprint 5 quest detail UI).

---

## 10. Integration với web ecosystem

| Surface | Role in mobile flow |
|---|---|
| `muonnoi.org` | Hosts `.well-known/apple-app-site-association` + `assetlinks.json`; landing page `muonnoi.org/app` for marketing |
| `app.muonnoi.org` | SSO session bridge với mobile (web ↔ mobile token exchange) |
| `dulich.muonnoi.org` | Travel Quest web pilot — gate prerequisite, also fallback for users without app |
| `identity.muonnoi.org` | JWT auth provider cho mobile login (SSO with web) |
| `api.muonnoi.org` | Backend cho all mobile data + `/api/mobile/*` extensions |
| `nguoiviet.muonnoi.org` | Brand inheritance cho Đường Muôn Nơi quest module (tuyên ngôn, manifesto, Local Host, Đà Lạt pilot detail) |
| `docs.muonnoi.org` | Privacy Policy, Terms, Mobile Privacy Notice URLs (App Store + Play Store submission requirement) |

---

## 11. References

- Master plan (this index summarizes): `apps/mobile/MUONNOI_MOBILE_APP_PLAN_2026-05-12.md`
- Mobile workstream status in overall plan: `docs/launch/MUONNOI_MASTER_PLAN_STATUS_2026-05-11.md` (Update 2026-05-12 section)
- Người Việt brand dependency: `docs/launch/NGUOIVIET_TEAM_HANDOFF_2026-05-12.md` (CẬP NHẬT 2026-05-12 · Mobile workstream section)
- Predecessor (Capacitor era, superseded): `apps/mobile/MUONNOI_MOBILE_TEAM_HANDOFF_SPRINT_01_2026-05-11.md`

---

**Document version:** v1.0
**Date:** 2026-05-12
**Status:** HANDOFF READY
**Author:** Planning/Documentation Lead · Muôn Nơi
