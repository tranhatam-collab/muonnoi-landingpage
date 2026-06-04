# Mobile QA + Release Checklist — Muôn Nơi
**Document**: MOBILE_QA_AND_RELEASE_CHECKLIST_2026-05-12
**Source**: MUONNOI_MOBILE_APP_PLAN_2026-05-12.md
**Phiên bản**: v1.0
**Ngày phát hành**: 2026-05-12
**Trạng thái**: Production-ready handoff for QA + Release teams
**Stack**: React Native + Expo (stable latest) · iOS + Android · 12-tuần MVP
**Pilot scope**: Đường Muôn Nơi Đà Lạt (Travel Quest)

> Tài liệu này là phụ lục thực thi cho `MUONNOI_MOBILE_APP_PLAN_2026-05-12.md` (Section 14, 16, 17, 21). Mọi item dưới đây là **checkable** — QA Lead phải tick ô trước khi advance gate. Không tick = không pass.

---

## MỤC LỤC

1. QA strategy
2. Device matrix (priority devices)
3. Functional test matrix (per sprint)
4. Non-functional tests
5. Maestro E2E flow files
6. Beta testing
7. Pre-release checklist (T-7 days)
8. Submission day checklist
9. Post-launch monitoring (Week 1)
10. Rollback playbook
11. Release cadence post-MVP
12. Approval gates (sign-off required)

---

## 0. ENVIRONMENT SETUP

### 0.1 System requirements (developer machine)

| Component | Requirement | Status | Verified Date |
|---|---|---|---|
| Java Runtime (JDK) | 17+ | Java 21.0.11 LTS installed | 2026-05-17 |
| Node.js | 18+ | Pending verification | — |
| Xcode | 15.0+ | Pending verification | — |
| Android SDK | API 26–34 | Pending verification | — |
| Expo CLI | latest | Pending verification | — |

**Action items:**
- [ ] Verify Node.js version: `node -v`
- [ ] Verify Xcode: `xcode-select -p && xcode-select -v`
- [ ] Verify Android SDK: `$ANDROID_HOME/cmdline-tools/latest/bin/sdkmanager --list --include_obsolete`
- [ ] Install Expo CLI: `npm install -g expo-cli`

---

## 1. QA STRATEGY

### 1.1 Test pyramid

| Layer | Tool | % of total tests | Coverage target |
|---|---|---|---|
| Unit | Jest | ~60% | ≥ 70% cho `src/lib/`, `src/hooks/`, `src/utils/` |
| Component | React Native Testing Library (RNTL) | ~30% | ≥ 50% cho screens MVP |
| E2E | Maestro | ~10% | 10 happy-path + critical flows |

### 1.2 Nguyên tắc

- [ ] Không cài đặt third-party test analytics SDK (kế thừa nguyên tắc bất biến #2 từ master plan).
- [ ] Mọi unit + component test chạy trong CI GitHub Actions trước EAS Build.
- [ ] Maestro chạy nightly trên iOS Simulator (Xcode 15) + Android Emulator (API 34) qua GitHub Actions self-hosted runner (mac mini).
- [ ] Mọi PR phải kèm test cho code mới — tests-as-PR-gate enforce qua CODEOWNERS + branch protection.
- [ ] Snapshot test cho design system primitives (Button, Card, Input, Toast) — re-bake khi đổi token có chủ đích.
- [ ] Mock backend qua MSW (Mock Service Worker) cho component test; integration test gọi staging endpoint `api-staging.muonnoi.org`.

### 1.3 Test data & accounts

- [ ] 3 test accounts production-grade: `qa+ios@muonnoi.org`, `qa+android@muonnoi.org`, `qa+beta@muonnoi.org`.
- [ ] 1 host account giả lập với 5 quests stub (`host-qa-dalat-01`).
- [ ] Reset script cho QA backend (`/internal/qa/reset?account=…`) — chạy giữa các test session.
- [ ] Test seed cho 30 Đà Lạt quests cố định (snapshot ngày 2026-05-05).

### 1.4 Bug taxonomy

| Severity | Định nghĩa | SLA |
|---|---|---|
| P0 | Crash, data loss, security vuln, không thể launch | Fix < 24h |
| P1 | Core flow broken (auth, proof submit, offline sync) | Fix < 72h |
| P2 | Non-blocking UX, edge case | Fix in next sprint |
| P3 | Polish, copy, nice-to-have | Backlog |

---

## 2. DEVICE MATRIX (priority devices)

Mọi build (preview + production) phải pass smoke test trên toàn bộ device matrix dưới đây.

### 2.1 iOS

| Device | Role | iOS version |
|---|---|---|
| iPhone 12 / 12 Pro | Baseline performance | 17.x, 18.x |
| iPhone 13 | Recent mid | 17.x, 18.x |
| iPhone 14 | Recent | 17.x, 18.x |
| iPhone 15 / 15 Pro | Latest reference | 18.x |
| iPhone SE 3rd gen | Small screen, lower memory | 17.x, 18.x |
| iPad (Air, Pro) | Phase 2, NOT in MVP scope | — |

- [ ] Test trên 2 major iOS versions gần nhất (17.x + 18.x).
- [ ] iPad explicit out-of-scope cho MVP — hiển thị "phone-only" notice trên iPad detect.
- [ ] Test Face ID trên iPhone 12+ và Touch ID trên iPhone SE.
- [ ] Test Dynamic Island layout trên iPhone 14 Pro / 15 Pro.
- [ ] Test Safe Area trên iPhone SE (top notch absent).

### 2.2 Android

| Device | Role | Android version |
|---|---|---|
| Samsung Galaxy A52 / A53 | Mid-tier, top selling VN | API 30, 31 |
| Xiaomi Redmi Note 11 / 12 | Cheap mid-tier | API 29, 31 |
| Google Pixel 7 / 8 | Reference / clean Android | API 33, 34 |
| Samsung Galaxy S22 / S23 | High-end Samsung | API 32, 34 |
| Oppo / Vivo (low-end) | Optional, smoke only | API 28 |

- [ ] Test API 26 (Android 8.0) làm minimum SDK floor.
- [ ] Test API 34 (Android 14) làm target SDK.
- [ ] Test screen sizes 5.5" → 6.7".
- [ ] Test Samsung-specific One UI behaviors (split keyboard, edge panel).
- [ ] Test Xiaomi MIUI battery saver vs background sync.
- [ ] Test fingerprint biometric trên Galaxy A52, face unlock trên Pixel 8.

### 2.3 Lab access

- [ ] Physical device lab: 6 iOS + 6 Android máy thật.
- [ ] BrowserStack App Live (backup): 5 paid seats.
- [ ] Expo Dev Client builds cho mỗi device test cycle.

---

## 3. FUNCTIONAL TEST MATRIX (per sprint)

Mỗi sprint kết thúc bằng **functional test gate** — QA Lead chạy + tick các test dưới đây trên ít nhất 1 iOS + 1 Android device.

### 3.1 Sprint 3-4 — Auth + Onboarding (~25 cases)

- [ ] Sign up với email + nhận OTP trong < 60s.
- [ ] OTP retry sau khi expire (60s).
- [ ] Invalid OTP error path — surface message tiếng Việt rõ ràng.
- [ ] Resend OTP rate-limit (max 3 lần / 10 phút).
- [ ] Phone OTP cho Viettel (096, 097, 098, 086, 032-039).
- [ ] Phone OTP cho Vinaphone (088, 091, 094, 083-085).
- [ ] Phone OTP cho Mobifone (089, 090, 093, 070, 076-079).
- [ ] SSO via QR từ web hoạt động (scan QR trên `app.muonnoi.org/login` → mobile auto-fill).
- [ ] SSO via magic link hoạt động (universal link `https://muonnoi.org/auth/m/<token>` → mở app, không browser).
- [ ] Biometric setup post-login: Face ID iOS prompt rõ.
- [ ] Biometric setup post-login: Fingerprint Android prompt rõ.
- [ ] Biometric fallback to password sau 3 lần fail.
- [ ] Biometric opt-out works (Settings → Security → Disable).
- [ ] Session persists across cold start (kill app + reopen → vẫn logged in).
- [ ] Session expires sau 30d và refresh token tự renew.
- [ ] Logout clears Keychain (iOS) + Keystore (Android) hoàn toàn.
- [ ] Welcome carousel 3 screens skippable.
- [ ] Welcome carousel swipe gesture work (cả 2 chiều).
- [ ] Permission rationales hiển thị trước OS dialog (camera, location, notifications).
- [ ] Onboarding language switch VI/EN không cần restart.
- [ ] Deep link to /onboarding/welcome opens carousel from step 1.
- [ ] Auth on slow network (3G simulated) — không stuck loading > 15s.
- [ ] Auth offline → graceful error "Cần Internet để đăng nhập".
- [ ] Account locked sau 5 lần password sai → email reset link work.
- [ ] User existing trên web (`app.muonnoi.org`) — SSO carry over hoạt động seamless.

### 3.2 Sprint 5-6 — Quest browsing (~30 cases)

- [ ] Quest list loads online (TTFP < 2s trên iPhone 12 wifi).
- [ ] Quest list loads từ cache offline (immediate, < 500ms).
- [ ] Search filter VI Unicode hoạt động đúng (diacritics: "đà lạt" match "Đà Lạt").
- [ ] Search filter EN works.
- [ ] Filter by category (Travel, Food, History, Nature).
- [ ] Filter by distance (1km, 5km, 10km, all).
- [ ] Filter by host name.
- [ ] Filter by quest difficulty (Easy / Medium / Hard).
- [ ] Filter combo (category + distance) — narrowing logic correct.
- [ ] Quest detail page render đầy đủ: title, description, host, location, XP reward, time estimate, steps.
- [ ] Map preview show correct location pin.
- [ ] Tap map → mở external map app (Apple Maps iOS, Google Maps Android) với directions.
- [ ] Host profile link work — navigate to host page.
- [ ] Host profile show: name, trust score, total quests, reviews.
- [ ] Nearby quests use GPS chính xác (test on Đà Lạt center 11.94°N, 108.44°E).
- [ ] GPS permission denial graceful — show all quests instead of nearby, banner gợi ý enable.
- [ ] GPS permission "while using app" vs "always" — correctly request "while using".
- [ ] Quest accept flow works → state changes to "Đang thực hiện".
- [ ] Already-accepted quest hiển thị state "Đang thực hiện" với CTA "Tiếp tục".
- [ ] Already-completed quest hiển thị "Đã hoàn thành" + link xem receipt.
- [ ] Cache invalidates on TTL expiry (15 phút default).
- [ ] Pull-to-refresh force re-fetch — animate refresh indicator.
- [ ] Infinite scroll DISABLED (theo nguyên tắc bất biến #4) — pagination explicit "Tải thêm".
- [ ] Empty state khi không có quest nearby — gợi ý mở rộng radius.
- [ ] Error state khi API fail — retry button + offline indicator.
- [ ] Quest image lazy-load, placeholder skeleton smooth.
- [ ] Quest sharing via OS share sheet (deep link `muonnoi://quest/<id>`).
- [ ] Quest detail offline (đã cache) — readable, accept button enabled (queue accept).
- [ ] Map preview offline — fallback static image (no live tiles).
- [ ] Quest list sort by recency, distance, popularity — all 3 work.

### 3.3 Sprint 7-8 — Proof submission (~40 cases)

- [ ] Camera screen mở với permission prompt rationale trước OS dialog.
- [ ] Camera permission denial graceful — settings deeplink + clear message.
- [ ] EXIF metadata captured: GPS lat/long, timestamp, orientation, device model.
- [ ] EXIF GPS verified match user current location (tolerance 100m).
- [ ] Photo preview correct rotation (portrait, landscape, upside-down).
- [ ] Retake works without losing previous photos in cùng submission.
- [ ] Multi-photo (up to 6) submission — ordered correctly.
- [ ] Reorder photos via drag-drop trước submit.
- [ ] Delete individual photo before submit.
- [ ] GPS captured tại moment photo (NOT at submission time) — verify timestamp drift < 30s.
- [ ] Reflection text input handles VI/EN, emojis, max length 1000 chars.
- [ ] Reflection text counter visible.
- [ ] Reflection text auto-save draft mỗi 5s.
- [ ] Host signature QR code scan works (camera scanner mode).
- [ ] Host signature manual entry fallback (6-char code).
- [ ] Host signature invalid code → clear error message.
- [ ] Host signature expired → friendly retry guidance.
- [ ] Submission wizard 4 steps navigate forward/back without losing state.
- [ ] Step indicator (1/4, 2/4, 3/4, 4/4) clearly visible.
- [ ] Submit ONLINE: success path → receipt issued trong < 30s.
- [ ] Submit OFFLINE: queued, status hiển thị, syncs khi reconnect.
- [ ] Submit on slow network (3G): upload retries (exponential backoff: 1s, 2s, 4s, 8s, 16s), eventually succeeds.
- [ ] Submit fails sau 5 retries: surfaces clear error, manual retry option.
- [ ] Force quit during upload: resumes on next launch (queue persistence).
- [ ] Airplane mode toggle during submit: queue retains, resumes khi online.
- [ ] Idempotency: double-submit cùng `idempotency_key` returns cùng response.
- [ ] Image compression: < 1.5MB per photo sau compress (quality 0.8 JPEG).
- [ ] Image dimension max 2048px longest edge.
- [ ] FileSystem storage cleanup post successful upload (delete temp files trong 24h).
- [ ] Disk space low warning khi < 200MB free.
- [ ] Submit khi battery < 10% — warning + allow proceed.
- [ ] Background upload tiếp tục khi user switch app (iOS Background Tasks + Android WorkManager).
- [ ] Receipt sau submit success: hash visible, copyable.
- [ ] Receipt include: quest ID, timestamp UTC, location, host signature, photo hashes.
- [ ] Toast confirmation "Receipt đã được phát" sau submit success.
- [ ] XP/Trust update reflect trên profile trong < 5s sau submit.
- [ ] Submission attempt khi quest already completed → blocked với message rõ.
- [ ] Submission attempt khi quest expired → blocked.
- [ ] Submission attempt với GPS spoof detected (location > 1km from quest target) → flag for review.

### 3.4 Sprint 9-10 — Profile + Trust + Sync (~25 cases)

- [ ] Profile screen show: avatar, name, trust score, XP, total receipts.
- [ ] Receipt list show 10 most recent, pagination "Xem thêm".
- [ ] Receipt detail readable: full metadata, photo gallery, host info.
- [ ] Receipt detail exportable as text (share sheet → copy / email).
- [ ] Receipt detail QR code for verification on web `muonnoi.org/r/<id>`.
- [ ] Trust score animation smooth (Reanimated 3, 60fps).
- [ ] Trust score breakdown tooltip: components (auth, history, host endorsements).
- [ ] Offline profile view works từ cache (last sync timestamp shown).
- [ ] Background sync trigger on app foreground.
- [ ] Background sync trigger on network reconnect (NetInfo listener).
- [ ] Background sync trigger on iOS BGTask (every 6h).
- [ ] Background sync trigger on Android WorkManager (constraints: network + battery).
- [ ] Settings → Sync queue show pending items accurately (count + types).
- [ ] Sync queue item detail: timestamp queued, retry count, last error.
- [ ] Manual retry from sync queue works.
- [ ] Cancel queued item works (with confirmation).
- [ ] Clear all completed items option.
- [ ] Sync conflict resolution: server wins for receipts, client wins for drafts.
- [ ] Profile edit (display name, avatar) — sync to web.
- [ ] Profile avatar upload compress to 512×512.
- [ ] Logout từ profile screen clear all local data (confirmation modal).
- [ ] Account deletion request (web only redirect) — clear messaging.
- [ ] Trust score down-tick sau invalid submission (flag, peer review fail).
- [ ] Receipt search bar (search by quest name, date).
- [ ] Empty receipts state — gợi ý CTA "Tìm quest đầu tiên".

### 3.5 Sprint 11 — Polish (~30 cases)

- [ ] Animation 60fps trên iPhone 12, Galaxy A52 (verify Flipper / Perf monitor).
- [ ] No layout shift on cold start (skeleton → content smooth).
- [ ] Empty states cho all lists (quests, receipts, sync queue, notifications).
- [ ] Empty state copy thân thiện, không generic.
- [ ] Error states cho all network failures với retry CTA.
- [ ] Loading skeleton không "loading forever" — max 10s trước surfaces error.
- [ ] Push notification delivers trong < 30s of trigger (APNs + FCM).
- [ ] Push notification opens correct deep link.
- [ ] Push notification badge count accurate.
- [ ] Push notification grouped (iOS) / channeled (Android) properly.
- [ ] In-app notification banner (foreground) — non-intrusive.
- [ ] Settings: all toggles persist across restart.
- [ ] Theme toggle dark/light works không cần restart.
- [ ] Theme follow system preference option.
- [ ] Language toggle VI/EN works không cần restart.
- [ ] Pull-to-refresh smooth trên all list screens.
- [ ] Tab navigation smooth (no flash, < 100ms transition).
- [ ] Bottom tab haptic feedback on tap (iOS taptic, Android vibration).
- [ ] Modal dismiss via swipe down (iOS) + back gesture (Android).
- [ ] Back navigation consistent (header back button + system gesture).
- [ ] Status bar style consistent (light/dark per screen).
- [ ] Safe area respected on all screens (notch, home indicator, navigation bar).
- [ ] Keyboard avoid view works on auth + reflection inputs.
- [ ] Keyboard dismiss on scroll (lists) + on tap outside (forms).
- [ ] Splash screen → first screen transition smooth.
- [ ] App icon + splash branding consistent.
- [ ] All toast / snackbar messages tiếng Việt natural, không Google Translate-ish.
- [ ] All button copy: action verb start (Lưu, Gửi, Hủy).
- [ ] All confirmation modal có 2 CTAs rõ ràng (Hủy vs Tiếp tục).
- [ ] All long-running operations show progress (not just spinner).

---

## 4. NON-FUNCTIONAL TESTS

### 4.1 Performance

- [ ] Cold start < 2.0s trên iPhone 12 / Galaxy A52 (verified via Sentry mobile vitals).
- [ ] Warm start < 1.0s.
- [ ] JS bundle size < 5MB sau Hermes optimization.
- [ ] App size (download): < 80MB iOS / < 50MB Android.
- [ ] Memory baseline < 200MB resident.
- [ ] Memory peak during photo upload < 350MB.
- [ ] Frame rate ≥ 58fps trong quest list scrolling.
- [ ] Frame rate ≥ 58fps trong profile screen.
- [ ] Battery drain test: 8h foreground use < 25% battery (iPhone 12).
- [ ] CPU < 30% average trong list browsing.
- [ ] No memory leak sau 30 phút usage (verify Instruments / Android Studio Profiler).
- [ ] Image cache LRU eviction works (max 100MB).
- [ ] SQLite query p95 < 50ms.
- [ ] Bundle splitting verified: vendor + app split.

### 4.2 Network

- [ ] Wifi: all operations < 3s.
- [ ] 4G: all operations < 5s.
- [ ] 3G simulated (Network Link Conditioner): graceful, no crashes, eventual success.
- [ ] 2G simulated / sub-50kbps: queue persist, image upload chunked (resumable).
- [ ] Offline: full app browse, draft, queue works.
- [ ] Flaky network (5% packet loss): retries work, no data corruption.
- [ ] Captive portal detection (cafe wifi) — surfaces clear message.
- [ ] DNS failure: fallback to cached IP (optional, document if not in MVP).
- [ ] Server 5xx error: exponential backoff, max 5 retries.
- [ ] Server rate-limit (429): respect Retry-After header.

### 4.3 Accessibility

- [ ] VoiceOver navigates all interactive elements với meaningful labels.
- [ ] VoiceOver announce dynamic state changes (loading, success, error).
- [ ] TalkBack equivalent on Android.
- [ ] Dynamic Type / Font Scale up to 200% no layout break.
- [ ] Font scale > 200% — graceful truncation hoặc reflow.
- [ ] Color contrast WCAG AA: 4.5:1 text, 3:1 large text.
- [ ] Tap targets ≥ 44pt (iOS) / 48dp (Android).
- [ ] No critical info conveyed by color alone (use icon + text).
- [ ] Skip-to-content links where applicable (long lists).
- [ ] Reduce Motion respected (disables non-essential animations).
- [ ] Increase Contrast respected (iOS).
- [ ] Keyboard navigation works (Bluetooth keyboard test).
- [ ] Focus indicator visible on all interactive elements.
- [ ] Form errors associated với input via accessibility label.
- [ ] Captions on promo video (if any).

### 4.4 Security

- [ ] HTTPS only — no plaintext fallback (verify NSAppTransportSecurity iOS, Network Security Config Android).
- [ ] Certificate pinning to `api.muonnoi.org` (optional MVP, document if deferred).
- [ ] Auth token in Keychain (iOS) / Keystore (Android), NEVER in AsyncStorage / MMKV unencrypted.
- [ ] Biometric uses platform crypto (no custom rolling).
- [ ] Deep link does NOT auto-authenticate (only opens correct screen).
- [ ] App backgrounded shows redacted screenshot trong app switcher (cover sensitive UI: receipts, profile).
- [ ] Logout clears all device data (token, queue, cache).
- [ ] No PII in logs/console trong production builds (strip via babel plugin).
- [ ] No PII in Sentry breadcrumbs (configure `beforeSend` to scrub).
- [ ] Keystore-bound encryption keys for queue payload (AES-GCM).
- [ ] No hardcoded secrets in source (scan via TruffleHog in CI).
- [ ] SSL inspection / proxy detection (warn user if detected, optional).
- [ ] Jailbreak / root detection (warn, not block — privacy-respecting).
- [ ] Anti-tampering: app signature check on launch.
- [ ] OAuth state parameter validated.
- [ ] Magic link tokens single-use, expire trong 10 phút.
- [ ] Session ID rotated on auth.
- [ ] Password input field disable autofill on security-sensitive screens.
- [ ] Clipboard cleared sau copy receipt hash (60s).

### 4.5 Localization

- [ ] All visible strings in i18n VI + EN (no hardcoded literals).
- [ ] VI diacritics render correctly (Inter / Be Vietnam Pro).
- [ ] Date format respects locale (DD/MM/YYYY VI vs MM/DD/YYYY EN).
- [ ] Time format 24h VI, 12h EN.
- [ ] Currency format VND for VI, USD for EN (where applicable).
- [ ] Pluralization correct VI/EN (e.g. "1 receipt" vs "5 receipts" vs "1 receipt" VI same).
- [ ] Phone number format VN +84 vs international.
- [ ] Number formatting locale-aware (1.000 vs 1,000).
- [ ] RTL not in MVP scope — verify no broken RTL leak.
- [ ] Vietnamese keyboard input (Telex, VNI) works smoothly in reflection.
- [ ] Vietnamese sort order correct (đ between d and e).
- [ ] Time zone: all timestamps shown in user's local TZ, but stored UTC.

---

## 5. MAESTRO E2E FLOW FILES

Đường dẫn: `apps/mobile/flows/`. Mỗi flow có setup, steps, assertions, teardown.

### 5.1 Flow inventory (10 flows for MVP)

```
flows/
├── auth_email_signup.yaml
├── auth_phone_otp_login.yaml
├── auth_biometric_unlock.yaml
├── quest_browse_list.yaml
├── quest_accept_and_open_details.yaml
├── proof_submission_happy_path.yaml
├── proof_submission_offline_then_sync.yaml
├── profile_view_receipt_detail.yaml
├── settings_toggle_notifications.yaml
└── deep_link_open_quest.yaml
```

### 5.2 Per-flow checklist

- [ ] `auth_email_signup.yaml` — đăng ký + OTP verify + landing on home.
- [ ] `auth_phone_otp_login.yaml` — login bằng phone + carrier VN.
- [ ] `auth_biometric_unlock.yaml` — Face ID / Fingerprint flow with mock.
- [ ] `quest_browse_list.yaml` — load list, filter, search, scroll.
- [ ] `quest_accept_and_open_details.yaml` — accept quest, map preview, host link.
- [ ] `proof_submission_happy_path.yaml` — full submission online with stubbed camera.
- [ ] `proof_submission_offline_then_sync.yaml` — airplane mode toggle, queue, sync.
- [ ] `profile_view_receipt_detail.yaml` — view profile, open receipt, share.
- [ ] `settings_toggle_notifications.yaml` — toggle notification setting, persist.
- [ ] `deep_link_open_quest.yaml` — universal link `https://muonnoi.org/q/<id>` opens app.

### 5.3 Maestro CI integration

- [ ] Maestro Cloud (optional) hoặc self-hosted runner mac mini.
- [ ] Nightly run on main branch — Slack alert on failure.
- [ ] Run on PR with `e2e` label.
- [ ] Screenshot diff captured per step.
- [ ] Flow execution time tracked — alert if > 2x baseline.
- [ ] Flaky flow quarantine policy: 3 consecutive fails → quarantine + ticket.

---

## 6. BETA TESTING

### 6.1 TestFlight (iOS)

- [ ] Internal testers: 5-10 team members invited via Apple ID.
- [ ] Internal testers receive build trong < 30 phút sau EAS Submit.
- [ ] External testers: 50-200 invited users (Đà Lạt LH community + waitlist).
- [ ] External test build cần Apple beta review (24-48h).
- [ ] Beta duration: 2-4 weeks (Sprint 11 + Sprint 12).
- [ ] Bug tracker: GitHub Issues với label `mobile-beta`.
- [ ] Feedback channel: in-app shake-to-report → email `beta@muonnoi.org`.
- [ ] TestFlight feedback screenshots auto-attached to issue.
- [ ] What's New notes per build VI + EN.
- [ ] Beta expiry 90 ngày — track + push new build before expire.

### 6.2 Google Play (Android)

- [ ] Internal testing track: cùng 5-10 team members (Google account).
- [ ] Closed testing track: cùng 50-200 users (email list).
- [ ] No open testing track (avoid premature public reviews).
- [ ] Pre-launch report (Firebase) reviewed sau mỗi closed build.
- [ ] Robo crawl results triaged.
- [ ] APK Analyzer review per build.

### 6.3 Beta acceptance criteria

- [ ] ≥ 80% of beta users complete onboarding (đến main screen).
- [ ] Crash rate ≤ 0.5% (sessions, via Sentry).
- [ ] ANR (Android) rate ≤ 0.5%.
- [ ] No P0 bugs open.
- [ ] No P1 bugs open older than 7 days.
- [ ] Push notification delivery success ≥ 95% (verify via APNs / FCM dashboard).
- [ ] Offline queue success rate ≥ 98% (resyncs without manual retry).
- [ ] ≥ 30% of beta testers submit at least 1 proof.
- [ ] Average beta survey rating ≥ 4.0 / 5.

---

## 7. PRE-RELEASE CHECKLIST (T-7 days)

Bắt đầu T-7 ngày trước submission day. Mỗi item phải tick + assign owner.

### 7.1 Product

- [ ] All MVP features green (verified per Sprint 3-11 checklists).
- [ ] Đà Lạt Đường Muôn Nơi 30 quests live.
- [ ] 50+ Local Hosts onboarded với active accounts.
- [ ] Web `app.muonnoi.org` stable 1 month+ (no P0/P1 open).
- [ ] Web `dulich.muonnoi.org` (Travel Quest hub) stable.
- [ ] Backend `api.muonnoi.org` SLO ≥ 99.9% past 30 ngày.
- [ ] Offline sync protocol documented (`MOBILE_OFFLINE_SYNC_PROTOCOL_2026-05-12.md`).

### 7.2 Build

- [ ] EAS Build production profile passes for iOS.
- [ ] EAS Build production profile passes for Android.
- [ ] App icons reviewed trong all sizes (1024 iOS, 512 Android, all density buckets).
- [ ] Adaptive icon (Android) reviewed — foreground + background separation correct.
- [ ] Splash screen reviewed (light + dark mode).
- [ ] Hermes enabled (RN engine) — verify in config.
- [ ] ProGuard / R8 enabled (Android) — verify mapping.txt generated.
- [ ] Bitcode setting verified (iOS) — NOT required since Xcode 14.
- [ ] Version code/build number incremented (build script auto).
- [ ] Source maps uploaded to Sentry per build.
- [ ] Symbolication files (dSYM iOS, mapping.txt Android) archived.

### 7.3 Legal & store assets

- [ ] Privacy Policy URL live `https://muonnoi.org/legal/mobile-privacy` và match actual practice.
- [ ] Terms URL live `https://muonnoi.org/legal/terms`.
- [ ] Mobile-specific Privacy Notice live (covers permissions, EXIF, biometric).
- [ ] DMCA contact published.
- [ ] App Store screenshots (6.7", 6.5", 5.5"): 8 per locale (VI + EN = 16 total per size).
- [ ] App Store description VI (within 4000 char).
- [ ] App Store description EN (within 4000 char).
- [ ] App Store keywords VI (100 char) + EN (100 char).
- [ ] App Store subtitle VI + EN (30 char).
- [ ] App Store promotional text VI + EN (170 char).
- [ ] Play Store screenshots: 8 per locale (phone form factor).
- [ ] Play Store short desc (80 char) VI + EN.
- [ ] Play Store full desc (4000 char) VI + EN.
- [ ] Play Store feature graphic 1024×500.
- [ ] Promo video 30s landscape (App Preview iOS).
- [ ] Promo video 30s portrait (Play Store).
- [ ] Reviewer test account credentials prepared (email + password trong reviewer notes).
- [ ] Reviewer special instructions written (how to test proof flow safely without real GPS).
- [ ] App Privacy form (iOS) complete và accurate per `MOBILE_PRIVACY_AND_STORE_COMPLIANCE_2026-05-12.md`.
- [ ] Data Safety form (Android) complete và accurate.
- [ ] Content rating questionnaire completed (target 13+).
- [ ] Age rating: 13+ (iOS), Teen (Play Store).

### 7.4 Operations

- [ ] Support email staffed (`support@muonnoi.org`) — auto-reply confirmed within 2h.
- [ ] In-app feedback channel tested (shake-to-report → email).
- [ ] Sentry mobile dashboard configured với alert rules (crash spike, error rate).
- [ ] Sentry release tag automated từ EAS Build.
- [ ] Push notification server tested at production scale (10x mobile traffic simulation).
- [ ] Backend capacity tested for 10x mobile traffic (load test report).
- [ ] CDN cache warm cho `api.muonnoi.org` static assets.
- [ ] Status page `status.muonnoi.org` includes mobile component.
- [ ] On-call rotation set up (PagerDuty / equivalent) cho launch week.
- [ ] Đà Lạt emergency hotline announced in-app.

---

## 8. SUBMISSION DAY CHECKLIST

### 8.1 iOS

- [ ] Build uploaded to App Store Connect via `eas submit -p ios --profile production`.
- [ ] Build processed (no warnings trong Connect dashboard).
- [ ] Version + build number incremented from previous (auto via eas.json).
- [ ] What's New text VI + EN.
- [ ] Export Compliance (CCATS): self-classify as "no encryption beyond standard" — declare exempt under §740.17(b).
- [ ] ITSAppUsesNonExemptEncryption set false trong Info.plist.
- [ ] Submission attestation reviewed.
- [ ] Reviewer notes include test account + special access instructions + Đà Lạt GPS coords for proof flow.
- [ ] Phased release: enable 1% day 1 → ramp up to 100% over 7 ngày.
- [ ] Pricing: Free.
- [ ] Availability: VN primary, US/CA/AU/UK secondary.
- [ ] Submit for review.
- [ ] Track review status — escalate if > 48h pending.

### 8.2 Android

- [ ] AAB uploaded to Play Console via `eas submit -p android --profile production`.
- [ ] Release notes VI + EN trong Play Console.
- [ ] Rollout percentage: 5% staged → 20% → 50% → 100% over 7 ngày.
- [ ] All required forms complete (Data Safety, Content Rating, App Access).
- [ ] Target audience and content set to 13+.
- [ ] Ads declaration: NO ads.
- [ ] In-app purchases declaration: NO IAP cho MVP.
- [ ] App access: provide test account if any flow gated.
- [ ] Promote from internal → closed → production.
- [ ] Pre-launch report green (no critical issues).
- [ ] Submit for review.
- [ ] Track review status — escalate if > 72h pending.

### 8.3 Same-day cross-platform

- [ ] Coordinate iOS + Android submit cùng ngày, ngay sau Founder approval.
- [ ] Communicate target launch date internally (Sprint 12 end).
- [ ] Press kit on standby (do not publish until both stores approve).
- [ ] Email blast scheduled but NOT sent until both approvals confirmed.

---

## 9. POST-LAUNCH MONITORING (Week 1)

### 9.1 Daily

- [ ] Crash-free rate ≥ 99.5% (Sentry).
- [ ] ANR rate ≤ 0.5% (Android, via Play Console + Sentry).
- [ ] No P0 issue surfaced in store reviews — triage daily.
- [ ] Sentry alerting tuned (no false-positive flood).
- [ ] Push delivery rate ≥ 95%.
- [ ] API error rate < 1% (mobile-tagged traffic).
- [ ] Sync queue success rate ≥ 98%.
- [ ] Daily standup: review yesterday's crashes, top errors, user reports.

### 9.2 Week 1 metrics check

- [ ] D1 retention ≥ 60%.
- [ ] D7 retention ≥ 35%.
- [ ] Average rating ≥ 4.0 (warmup, target 4.5 by month 3).
- [ ] Notification opt-in ≥ 40% (warmup, target 60% by month 3).
- [ ] Biometric adoption ≥ 50%.
- [ ] Proof submission completion rate ≥ 70% (started → submitted).
- [ ] Offline submission percentage tracked (target ≥ 15% — proves offline value).
- [ ] Đà Lạt geo-tagged active users ≥ 200.
- [ ] At least 100 receipts issued in week 1.

### 9.3 Store review response

- [ ] Reply to 100% of 1-2 star reviews within 24h.
- [ ] Reply to 4-5 star reviews within 48h (warm thank you).
- [ ] Track review sentiment via spreadsheet (manual, no third-party).
- [ ] Common issues → backlog ticket trong < 24h.

---

## 10. ROLLBACK PLAYBOOK

### 10.1 JS-only bug (urgent)

1. [ ] EAS Update push fix to production channel.
2. [ ] Verify rollout via Expo updates URL endpoint (check `expo-updates` headers).
3. [ ] Notify users via in-app banner nếu critical UX.
4. [ ] Post-mortem written trong 72h.

### 10.2 Native bug requiring rebuild

1. [ ] Hotfix branch từ production tag.
2. [ ] EAS Build production.
3. [ ] Submit expedited review (Apple: request via App Review website; Google: standard, no expedite available — leverage staged rollout halt).
4. [ ] Phased release at 1% then 100%.
5. [ ] Communicate via email + in-app banner if downtime expected.

### 10.3 Critical security issue

1. [ ] Force logout all sessions via `/api/auth/revoke-all` endpoint.
2. [ ] Disable affected endpoint server-side (feature flag).
3. [ ] In-app banner với mitigation guidance.
4. [ ] Public disclosure within 72h per responsible disclosure policy.
5. [ ] Coordinate with legal cho compliance reporting (if PII exposure).

### 10.4 Backend outage

1. [ ] App degrades gracefully (read from cache).
2. [ ] Status banner in-app linking `status.muonnoi.org`.
3. [ ] Push notification suppressed during outage.
4. [ ] Queue persistence verified — no data loss.

### 10.5 Store removal request

1. [ ] If Apple/Google requests removal — halt rollout immediately.
2. [ ] Address feedback within stated SLA (Apple usually 14 ngày).
3. [ ] Resubmit with fix + appeal if disagreement.
4. [ ] Notify beta + production users via email + web banner.

---

## 11. RELEASE CADENCE POST-MVP

- [ ] OTA (JS): weekly Tuesday afternoon Vietnam time (low-traffic window, ~14:00 ICT).
- [ ] OTA blackout windows: Friday-Sunday, Tết, major holidays.
- [ ] Native: monthly, first Tuesday of month.
- [ ] Major version: quarterly (V1 Q4 2026, V2 Q2 2027 per master plan Section 13).
- [ ] Emergency: as needed, follow rollback playbook.
- [ ] Release notes published per release on `muonnoi.org/changelog`.
- [ ] No release on day before major LH onboarding events (avoid disruption).

---

## 12. APPROVAL GATES (sign-off required)

### Gate A — Sprint 11 completion

- [ ] All Sprint 3-11 functional test matrices passed.
- [ ] Performance, accessibility, security non-functional tests passed.
- [ ] **Sign-off:** Mobile Lead + QA Lead.
- [ ] Recorded in `apps/mobile/sign-offs/gate-a-sprint11.md`.

### Gate B — Beta criteria met

- [ ] All Section 6.3 beta acceptance criteria green.
- [ ] No P0/P1 open older than 7 ngày.
- [ ] **Sign-off:** Mobile Lead + Founder.
- [ ] Recorded in `apps/mobile/sign-offs/gate-b-beta.md`.

### Gate C — Submission

- [ ] All Section 7 pre-release checklist green.
- [ ] Privacy / store assets reviewed.
- [ ] **Sign-off:** Founder + Legal (privacy policy).
- [ ] Recorded in `apps/mobile/sign-offs/gate-c-submission.md`.

### Gate D — Public launch (rollout 100%)

- [ ] Week 1 post-launch monitoring green.
- [ ] Support readiness confirmed.
- [ ] No P0/P1 open.
- [ ] **Sign-off:** Founder + Operations.
- [ ] Recorded in `apps/mobile/sign-offs/gate-d-launch.md`.

### Approval matrix

| Gate | Mobile Lead | QA Lead | Founder | Legal | Operations |
|---|---|---|---|---|---|
| A — Sprint 11 | ✓ required | ✓ required | — | — | — |
| B — Beta | ✓ required | ✓ optional | ✓ required | — | — |
| C — Submit | ✓ optional | ✓ optional | ✓ required | ✓ required | — |
| D — Launch | ✓ optional | ✓ optional | ✓ required | — | ✓ required |

---

## CÂU CHỐT

> QA + Release của Muôn Nơi không phải hành trình kiểm tra phần mềm.
>
> Đây là cam kết với người Đà Lạt, với Local Host, với mỗi user bấm nút "Gửi proof" — rằng cái app này tôn trọng họ, không thu thập trộm dữ liệu, không lỗi khi mất sóng, không treo khi pin yếu, và mọi receipt phát ra là **bằng chứng có thật** của một khoảnh khắc có thật.
>
> Mỗi checkbox dưới đây không phải bureaucracy — là một lời hứa nhỏ giữ cho hệ Muôn Nơi đáng tin.

---

*Tài liệu này deprecate khi V1 (Tháng 10-12 2026) thay đổi scope. Mỗi major release publish phiên bản mới với hậu tố ngày.*
