# MUÔN NƠI · MOBILE APP MASTER PLAN 2026
**iOS + Android · React Native + Expo (stable latest)**
**Trạng thái:** Production-ready handoff for mobile team
**Phiên bản:** v1.0
**Ngày phát hành:** 2026-05-12
**Mã tài liệu:** `MUONNOI_MOBILE_APP_PLAN_2026-05-12`

> **CHỐT QUAN TRỌNG (User adjustment 2026-05-12):**
> Mobile app build **SAU** khi Travel Quest web pilot ổn. Không làm mobile quá sớm khi backend proof/reward chưa rõ. Expo SDK dùng **stable latest tại thời điểm triển khai**, không khoá cứng version.

---

## 0. BỐI CẢNH

Hệ Muôn Nơi hiện đã có các surface web operational (status 2026-05-12):
- `www.muonnoi.org` — Public shell v2.0 (LIVE_PRIMARY)
- `app.muonnoi.org` — Social core v1.0 (LIVE_LINK_ALLOWED)
- `docs.muonnoi.org` — Operating standards (LIVE_LINK_ALLOWED)
- `ai.muonnoi.org` — AI workflow (LIVE_BUT_SOURCE_NOT_LOCKED)
- `nguoiviet.muonnoi.org` — Vietnamese Global Journey layer (PENDING_DNS_SWAP)
- `lamviec.muonnoi.org`, `dulich.muonnoi.org`, … — pilot subdomains

Backend đã chạy trên Cloudflare Workers + D1 + R2.

**Mục tiêu mobile app:**
Đưa hệ Muôn Nơi vào pocket của user — đặc biệt phục vụ Life Quest OS cần các native feature thiết yếu (camera proof, GPS, push notifications, offline-first cho travel quests ở vùng yếu sóng).

**Nguyên tắc bất biến (kế thừa từ Muôn Nơi):**
1. Không tracking pixel
2. Không third-party analytics SDK
3. Không tối ưu time spent
4. Không infinite scroll gây nghiện
5. Camera/GPS chỉ dùng khi người dùng thực hiện proof
6. Dữ liệu tối thiểu, khai báo đúng App Store Privacy + Google Play Data Safety
7. Offline-first bắt buộc cho Travel Quest
8. Push notification mặc định opt-in, giới hạn tần suất
9. App đồng bộ với muonnoi.org, app.muonnoi.org, dulich.muonnoi.org và Life Quest OS
10. Link bền (universal links / deep links)

---

## MỤC LỤC

1. [Mục tiêu sản phẩm](#1-mục-tiêu-sản-phẩm)
2. [Tech stack quyết định](#2-tech-stack-quyết-định)
3. [App architecture](#3-app-architecture)
4. [Folder structure](#4-folder-structure)
5. [Native features bắt buộc](#5-native-features)
6. [UI/UX guidelines](#6-uiux-guidelines)
7. [Auth & SSO flow](#7-auth--sso-flow)
8. [Offline-first design](#8-offline-first)
9. [Push notifications](#9-push-notifications)
10. [Deep linking & universal links](#10-deep-linking)
11. [Backend integration](#11-backend-integration)
12. [Privacy & App Store compliance](#12-privacy-compliance)
13. [Roadmap MVP → V1 → V2](#13-roadmap)
14. [Sprint plan 12 tuần](#14-sprint-plan)
15. [Team & resources](#15-team)
16. [Build, CI/CD, release](#16-cicd)
17. [App Store + Play Store submission checklist](#17-submission-checklist)
18. [Marketing app launch](#18-marketing)
19. [Metrics & analytics](#19-metrics)
20. [Risk register](#20-risks)
21. [Go/No-Go checklist](#21-checklist-go-no-go)
22. [Appendix](#22-appendix)

---

## 1. MỤC TIÊU SẢN PHẨM

### 1.1 App là gì
- **Tên:** Muôn Nơi
- **Tagline:** Hạ tầng số cho đời sống thật / Digital infrastructure for real life
- **Categories:**
  - iOS Primary: Lifestyle · Secondary: Travel, Social Networking
  - Android Primary: Lifestyle · Secondary: Travel & Local, Social

### 1.2 Single most important feature

> **Mobile-first proof submission for Life Quests.**

Mọi feature khác phục vụ flow này:
1. Mở app → thấy quest list nearby
2. Chọn quest, đi làm IRL
3. Chụp ảnh có GPS + EXIF
4. Submit proof (offline OK, sync khi online)
5. Nhận receipt + XP/Trust

Mọi feature web app cũng có trong mobile, nhưng **mobile là chỗ tạo proof, web là chỗ xem & quản lý**.

### 1.3 Phase 1 vs Phase 2 vs Phase 3

| Phase | Tên | Timeline | Mục tiêu |
|---|---|---|---|
| MVP | Đường Muôn Nơi mobile | Tháng 7-9 2026 | Chỉ Travel Quest cho Đà Lạt pilot |
| V1 | Muôn Nơi multi-quest | Tháng 10-12 2026 | + Học Đời + Family + chochoi hub |
| V2 | Muôn Nơi full ecosystem | Q1-Q2 2027 | + All 7 quests + AI tools + chat |

**Tiền điều kiện MVP (gate):** Travel Quest web pilot Đà Lạt đã chạy ổn ≥ 1 tháng, backend proof/reward đã có receipt thật.

---

## 2. TECH STACK QUYẾT ĐỊNH

### 2.1 Framework: React Native + Expo (stable latest)

> **User adjustment (2026-05-12):** Không khoá cứng SDK version. Khi triển khai, dùng **Expo SDK stable latest** tại thời điểm đó. SDK 52+ chỉ là baseline minimum nếu New Architecture cần.

**Lý do chọn (ngắn gọn):**

| Tiêu chí | RN + Expo | Flutter | Native iOS+Android |
|---|---|---|---|
| Code sharing iOS/Android | 90%+ ✓ | 95%+ ✓ | 0% ✗ |
| Team cost (1 team) | 1x ✓ | 1x ✓ | 2x ✗ |
| Native feature parity | High ✓ | Medium-High | Highest ✓ |
| Performance for Muôn Nơi needs | Sufficient ✓ | Excellent ✓ | Excellent ✓ |
| OTA updates (Expo EAS) | Yes ✓ | Limited | No ✗ |
| Web code reuse | Some (RN Web) ✓ | Low ✗ | None ✗ |
| Recruitment Việt Nam | Easy ✓ | Medium | Hard ✗ |

**Quyết định:** **React Native + Expo (stable latest)** với custom dev client + EAS Build.

### 2.2 Full stack

```
Language:           TypeScript (strict)
Framework:          React Native (latest stable)
Toolchain:          Expo SDK stable latest (custom dev client)
Build:              EAS Build
Updates:            EAS Update (OTA chỉ cho JS-only changes)
Navigation:         Expo Router (file-based) — universal links built-in
State client:       Zustand
State server:       TanStack Query v5
Forms:              React Hook Form + Zod

Native modules (chọn theo SDK hiện hành):
  Camera:           expo-camera
  Location:         expo-location (when-in-use only)
  Notifications:    expo-notifications
  Biometric:        expo-local-authentication
  Storage:          expo-secure-store (sensitive) + AsyncStorage (other)
  File system:      expo-file-system
  Image:            expo-image
  Linking:          expo-linking
  Updates:          expo-updates
  Haptics:          expo-haptics
  Sharing:          expo-sharing
  Network:          expo-network

UI / Design:
  Component lib:    Custom design system (theo brand Muôn Nơi v2.0)
  Animations:       react-native-reanimated + react-native-gesture-handler
  Icons:            Custom SVG (no third-party icon set với telemetry)

Backend:            api.muonnoi.org (Cloudflare Workers + D1 + R2)
Auth:               JWT từ identity.muonnoi.org + biometric local
Offline sync:       TanStack Query persistent cache + custom sync queue
Image upload:       Pre-signed R2 URLs

Testing:
  Unit:             Jest
  Component:        React Native Testing Library
  E2E:              Maestro (Expo-friendly)

Monitoring:
  Crashes:          Sentry (minimal config, privacy-respecting)
  Performance:      Sentry Performance
  KHÔNG dùng:        Firebase Analytics, GA, Mixpanel, Amplitude, AppsFlyer, Adjust, Crashlytics
```

### 2.3 Note về analytics

Muôn Nơi nguyên tắc "no third-party SDK analytics".

**Dùng:**
- Crash reports → Sentry (chỉ stack trace, không user behavior, không PII)
- App health → custom endpoint trên `api.muonnoi.org` (active users count, không PII)
- Event tracking → opt-in only, per-feature, lưu trên own backend

**KHÔNG dùng:**
- ❌ Firebase Analytics
- ❌ Google Analytics  
- ❌ Mixpanel, Amplitude
- ❌ AppsFlyer, Adjust (attribution)
- ❌ Crashlytics (Google-owned, gắn telemetry)

> **Note FCM:** Vẫn dùng FCM cho Android push (Google Play yêu cầu), nhưng **chỉ dùng messaging endpoint**, KHÔNG bật Firebase Analytics hay bất kỳ tracking nào khác.

---

## 3. APP ARCHITECTURE

### 3.1 High-level

```
┌─────────────────────────────────────────────────────┐
│              MUÔN NƠI MOBILE APP                     │
│         React Native + Expo (stable latest)          │
├─────────────────────────────────────────────────────┤
│                                                       │
│  ┌─────────────┐  ┌─────────────┐  ┌────────────┐  │
│  │ Onboarding  │  │   Quests     │  │  Profile   │  │
│  │ + Auth      │  │   Module     │  │  + Trust   │  │
│  └─────────────┘  └─────────────┘  └────────────┘  │
│                                                       │
│  ┌─────────────┐  ┌─────────────┐  ┌────────────┐  │
│  │ Camera +    │  │   Proof      │  │  Offline   │  │
│  │ GPS         │  │   Submission │  │  Sync      │  │
│  └─────────────┘  └─────────────┘  └────────────┘  │
│                                                       │
│  ┌─────────────────────────────────────────────────┐ │
│  │           Shared State Management                │ │
│  │     Zustand (client) + TanStack Query (server)  │ │
│  └─────────────────────────────────────────────────┘ │
│                                                       │
│  ┌─────────────────────────────────────────────────┐ │
│  │              API Client Layer                    │ │
│  └─────────────────────────────────────────────────┘ │
└──────────────────────────────┬──────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────┐
│         api.muonnoi.org (Cloudflare Workers)         │
│                  D1 + R2 (existing)                  │
└─────────────────────────────────────────────────────┘
```

### 3.2 Module breakdown

**Core modules (MVP):**
- `onboarding/` — welcome, sign up, KYC tier 1
- `auth/` — login, session, biometric
- `home/` — quest hub (chochoi-style daily quest list)
- `quests/` — quest list, detail, accept, submit
- `proof/` — camera, GPS, EXIF, multi-photo, host signature scan
- `profile/` — user profile, trust score, receipts
- `wallet/` — earnings, credit, payout (Phase 2)
- `settings/` — language (VI/EN), theme, notifications, privacy

**Quest-specific modules (V1+):**
- `quests/travel/` — Đường Muôn Nơi specific UI
- `quests/learn/` — Học Đời lessons
- `quests/family/` — Family pod management
- `quests/health/` — Một Ngày Khoẻ habits
- `quests/work/` — Việc Có Lý task board
- `quests/create/` — Vườn Sáng Tạo
- `quests/community/` — Cồng civic quests

**Shared infrastructure:**
- `lib/api/` — API client + endpoints
- `lib/storage/` — secure store, async storage, file system
- `lib/sync/` — offline queue + conflict resolution
- `lib/i18n/` — VI/EN localization
- `lib/design/` — design tokens, components

---

## 4. FOLDER STRUCTURE

```
muonnoi-mobile/
├── app/                          # Expo Router file-based routing
│   ├── (auth)/
│   │   ├── welcome.tsx
│   │   ├── sign-in.tsx
│   │   ├── sign-up.tsx
│   │   └── verify-phone.tsx
│   ├── (tabs)/                   # Bottom tab navigator
│   │   ├── _layout.tsx
│   │   ├── home.tsx              # chochoi quest hub
│   │   ├── quests.tsx            # 7 quest categories grid
│   │   ├── proof.tsx             # camera entry FAB
│   │   ├── trust.tsx             # profile + receipts
│   │   └── settings.tsx
│   ├── quest/
│   │   ├── [id].tsx
│   │   └── submit/[id].tsx
│   ├── host/[id].tsx
│   ├── profile/[handle].tsx
│   ├── _layout.tsx
│   └── +not-found.tsx
│
├── src/
│   ├── components/
│   │   ├── QuestCard.tsx
│   │   ├── HostCard.tsx
│   │   ├── ProofCard.tsx
│   │   ├── TrustBadge.tsx
│   │   ├── StreakIndicator.tsx
│   │   ├── camera/
│   │   │   ├── CameraView.tsx
│   │   │   ├── GpsCapture.tsx
│   │   │   └── PhotoPreview.tsx
│   │   ├── forms/
│   │   ├── ui/                   # primitives
│   │   └── design-system/
│   │
│   ├── lib/
│   │   ├── api/
│   │   │   ├── client.ts
│   │   │   ├── auth.ts
│   │   │   ├── missions.ts
│   │   │   ├── submissions.ts
│   │   │   ├── proofs.ts
│   │   │   ├── hosts.ts
│   │   │   └── profile.ts
│   │   ├── storage/{secure,async,file}.ts
│   │   ├── sync/{queue,reconcile}.ts
│   │   ├── i18n/{vi,en}.json + index.ts
│   │   ├── design/{tokens,theme,components}.ts
│   │   └── utils/{exif,gps,hash,validation}.ts
│   │
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useQuests.ts
│   │   ├── useSubmissions.ts
│   │   ├── useOffline.ts
│   │   ├── useBiometric.ts
│   │   └── useNotifications.ts
│   │
│   ├── stores/
│   │   ├── authStore.ts          # Zustand
│   │   ├── settingsStore.ts
│   │   └── offlineStore.ts
│   │
│   ├── types/
│   │   ├── api.ts
│   │   ├── domain.ts
│   │   └── navigation.ts
│   │
│   └── constants/{config,routes}.ts
│
├── assets/{images,fonts,icons,animations}
├── localization/
├── ios/                          # Auto-generated
├── android/                      # Auto-generated
├── .expo/
├── app.json                      # Expo config
├── eas.json                      # EAS Build/Update config
├── package.json
├── tsconfig.json
├── babel.config.js
└── metro.config.js
```

---

## 5. NATIVE FEATURES

### 5.1 Features bắt buộc cho MVP

| Feature | Permission | Tại sao | Implementation |
|---|---|---|---|
| Camera | Required | Chụp proof | `expo-camera` |
| Location (when-in-use) | Required | GPS proof + nearby quests | `expo-location` |
| Photo Library (read) | Optional | Choose existing photo | `expo-image-picker` |
| Notifications | Optional | Quest reminder, host msg | `expo-notifications` |
| Biometric | Optional | Quick login | `expo-local-authentication` |
| Storage | Auto | Cache + offline | `expo-file-system` |
| Network | Auto | Detect online/offline | `expo-network` |

### 5.2 iOS Info.plist permission descriptions (VI + EN)

```
NSCameraUsageDescription
VI: Muôn Nơi cần truy cập camera để bạn chụp bằng chứng hoàn thành quest.
    Ảnh được dùng làm proof, không tự động đăng công khai.
EN: Muôn Nơi needs camera access to capture proof of completed quests.
    Photos are used as proof, not auto-shared publicly.

NSLocationWhenInUseUsageDescription
VI: Muôn Nơi cần vị trí của bạn để xác nhận bạn đã đến điểm hoàn thành quest
    và hiển thị quest gần bạn. Vị trí chỉ dùng trong app, không bao giờ bán.
EN: Muôn Nơi needs your location to verify quest completion at specified
    locations and show nearby quests. Location is never sold.

NSPhotoLibraryUsageDescription
VI: Muôn Nơi truy cập thư viện ảnh để bạn chọn ảnh làm proof.
    Chỉ ảnh bạn chọn được dùng.
EN: Muôn Nơi accesses your photo library so you can select photos as proof.
    Only photos you select are used.

NSUserNotificationsUsageDescription
VI: Bật thông báo để nhận nhắc quest, tin từ host và cập nhật quan trọng.
    Tối đa 1 push/ngày, không tin spam.
EN: Enable notifications to receive quest reminders, host messages,
    and important updates. Max 1 push/day, no spam.

NSFaceIDUsageDescription
VI: Dùng Face ID để đăng nhập nhanh, an toàn hơn nhập mật khẩu.
EN: Use Face ID for quick, safer login than password.
```

### 5.3 Android permissions (AndroidManifest.xml)

```xml
<!-- Required -->
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />

<!-- Optional -->
<uses-permission android:name="android.permission.READ_MEDIA_IMAGES" />
<uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
<uses-permission android:name="android.permission.USE_BIOMETRIC" />

<!-- NOT requested (excluded by design) -->
<!-- NO ACCESS_BACKGROUND_LOCATION -->
<!-- NO RECORD_AUDIO unless V2+ video proof -->
<!-- NO READ_CONTACTS -->
<!-- NO READ_PHONE_STATE -->
```

---

## 6. UI/UX GUIDELINES

### 6.1 Design tokens (kế thừa brand v2.0 Voice & Place)

```typescript
// src/lib/design/tokens.ts
export const tokens = {
  colors: {
    light: {
      bg: '#f4f7fb',
      bgElevated: '#ffffff',
      text: '#101820',
      textMuted: 'rgba(16,24,32,.62)',
      border: 'rgba(10,15,20,.09)',
      primary: '#3B7EFF',       // Azure (brand v2.0)
      whisper: '#0E9EA6',       // Whisper (light mode)
      gold: '#B8910C',          // Gold verification (light)
      success: '#2d6a4f',
      warning: '#d97706',
      danger: '#dc2626',
    },
    dark: {
      bg: '#0a0f14',
      bgElevated: '#0d131a',
      text: '#eef4fb',
      textMuted: 'rgba(238,244,251,.64)',
      border: 'rgba(255,255,255,.08)',
      primary: '#3B7EFF',       // Azure
      whisper: '#7FE0E5',       // Whisper (dark)
      gold: '#D4AF37',          // Gold verification (dark)
      success: '#4ade80',
      warning: '#fbbf24',
      danger: '#f87171',
    },
  },
  spacing: { xs:4, sm:8, md:12, lg:16, xl:24, xxl:32, xxxl:48, huge:64 },
  typography: {
    family: { sans: 'Be Vietnam Pro', serif: 'Source Serif 4' },
    size: { xs:11, sm:13, base:15, lg:17, xl:20, xxl:24, h3:28, h2:34, h1:42 },
    weight: { regular:'400', medium:'500', semibold:'600', bold:'700', heavy:'900' },
  },
  radius: { sm:6, md:10, lg:16, xl:24, full:9999 },
  shadow: {
    sm: { ios: '0 1px 2px rgba(0,0,0,0.05)', elevation: 1 },
    md: { ios: '0 4px 6px rgba(0,0,0,0.07)', elevation: 3 },
    lg: { ios: '0 10px 15px rgba(0,0,0,0.1)', elevation: 6 },
  },
};
```

### 6.2 Navigation pattern

**Bottom tabs (5 tabs):**
1. **Home** — chochoi quest hub
2. **Quests** — 7 quest categories grid
3. **Proof** — Camera entry FAB (center, prominent)
4. **Trust** — profile + receipts
5. **Settings**

**Stack:**
- Quest list → Quest detail → Submit Proof wizard
- Profile → Receipts → Receipt detail → Export VC

### 6.3 Design principles cho mobile

| Nguyên tắc | Implementation |
|---|---|
| Calm, không loud | Soft shadows, generous spacing, no flashy animations |
| One screen, one purpose | Avoid cluttered tabs, prefer drilldown |
| Thumb-zone first | Primary CTA luôn ở bottom 1/3 màn hình |
| Đọc dễ ngoài trời | Default light theme cao contrast, dark mode optional |
| Vietnamese-readable | Font size +1pt vs default (diacritics cần space) |
| Pull-to-refresh | Mọi list (không auto-refresh, no infinite scroll) |
| No engagement metrics public | KHÔNG hiển thị like count, follower count |
| Wellbeing cap | Setting cho phép user đặt giới hạn thời gian/ngày |
| No infinite scroll | Quest list có pagination, không bottomless feed |

---

## 7. AUTH & SSO

### 7.1 Flow

```
App launch
  ↓
Check secure storage có session token không?
  ├── Có → validate với api.muonnoi.org → home
  └── Không → welcome screen
              ↓
              [Đăng nhập] hoặc [Đăng ký]
              ↓
              SSO với identity.muonnoi.org
              (chia sẻ session với web app.muonnoi.org)
```

### 7.2 SSO với web (3 paths)

**Path A: QR code scan**
- Web hiển thị QR code chứa one-time login token
- App scan → exchange token → session

**Path B: Magic link**
- Web gửi email/SMS với deep link
- User mở link → app open → auto-login

**Path C: Manual**
- User nhập email + OTP qua phone

### 7.3 Biometric (Phase 1.5)

- Session token lưu trong **Keychain (iOS) / Keystore (Android)**
- Mở app → biometric prompt → unlock session
- Fail 3 lần → fallback password

### 7.4 Session

- JWT với 30-day expiry
- Refresh token tự động khi 5 ngày trước expiry
- Logout: revoke token server-side + clear secure storage

---

## 8. OFFLINE-FIRST

### 8.1 Vì sao critical

Đà Lạt và các pilot city sau (vùng K'Ho, làng nghề, đường mòn núi) thường yếu sóng. User có thể đi quest, hoàn thành, nhưng phải đợi về wifi mới submit.

→ **App phải hoạt động hoàn toàn offline cho:**
- Xem quest list đã download
- Chụp ảnh proof
- GPS capture
- Write reflection text
- Queue submission

Khi online lại → auto-sync queued submissions.

### 8.2 Data caching strategy

| Data type | Cache strategy | TTL |
|---|---|---|
| Quest list | Persistent cache, swr | 24h |
| Quest detail | Persistent cache | 7 days |
| Host profiles (visited) | Persistent cache | 30 days |
| User profile | Persistent + real-time | session |
| Submissions (mine) | Persistent | forever (until synced) |
| Proof images | Local file system | until uploaded |
| Receipts | Persistent | forever |
| Trust score | swr | 1h |

### 8.3 Sync queue

```typescript
// src/lib/sync/queue.ts (concept)
interface QueuedAction {
  id: string;
  type: 'submission' | 'review' | 'proof_upload';
  payload: any;
  createdAt: number;
  attempts: number;
  lastAttempt?: number;
  status: 'pending' | 'syncing' | 'failed' | 'completed';
}

// Behavior:
// - On network reconnect → process queue FIFO
// - Max 3 retry attempts per action
// - Failed actions → notify user, manual retry option
// - Proof images upload first (R2), then submission metadata
// - Idempotency: server checks for duplicate by client-generated UUID
```

Chi tiết đầy đủ: xem `MOBILE_OFFLINE_SYNC_PROTOCOL_2026-05-12.md`.

### 8.4 Conflict resolution

Conflicts hiếm trong Muôn Nơi (user-generated proof, không collaborative editing). Rule: **last-write-wins on server**, app warns user nếu submission đã approved ở thời gian khác.

---

## 9. PUSH NOTIFICATIONS

### 9.1 Cap nghiêm ngặt

- **Maximum 1 push/day per user** (system-enforced)
- **Opt-in by default = OFF** (user phải bật)
- **No promotional pushes** (không "miss us?" hay "come back")

### 9.2 Allowed push categories

| Category | Khi nào gửi | Frequency cap |
|---|---|---|
| Quest reminder | Quest user đã accept, < 24h trước scheduled | Once per quest |
| Host message | Host nhắn tin về booking | Per message |
| Submission update | Submission approved/rejected | Per update |
| Trust milestone | Đạt mức Trust mới (50, 100, 500...) | Per milestone |
| Receipt ready | Nhận receipt mới | Per receipt |
| Account critical | Login từ device mới, password change | Per event |

### 9.3 Push infrastructure

- **iOS:** APNs (Apple Push) qua Expo Notifications
- **Android:** FCM (Firebase Cloud Messaging) qua Expo — **chỉ messaging, không bật Firebase Analytics**
- **Server:** `api.muonnoi.org/notifications` (Cloudflare Worker → expo-server-sdk)

### 9.4 Notification settings UI

User vào Settings → Notifications, có toggle riêng cho từng category:

```
[●] Quest reminders
[○] Host messages
[●] Submission updates
[●] Trust milestones
[●] Receipts
[●] Account security
```

---

## 10. DEEP LINKING

### 10.1 Universal Links / App Links

Schema: `muonnoi://...` và `https://muonnoi.org/...`

**Critical paths:**

```
muonnoi://quest/[id]           → mở quest detail trong app
muonnoi://profile/[handle]     → mở user profile
muonnoi://receipt/[id]         → mở receipt
muonnoi://host/[id]            → mở host profile
muonnoi://invite/[code]        → accept invitation
muonnoi://verify/[token]       → magic link verify
https://muonnoi.org/quest/[id]  → opens app if installed, else web
```

### 10.2 App Site Association

**iOS:** `https://muonnoi.org/.well-known/apple-app-site-association`

```json
{
  "applinks": {
    "apps": [],
    "details": [{
      "appID": "TEAMID.org.muonnoi.app",
      "paths": ["/quest/*", "/profile/*", "/receipt/*", "/host/*", "/invite/*"]
    }]
  }
}
```

**Android:** `https://muonnoi.org/.well-known/assetlinks.json`

```json
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "org.muonnoi.app",
    "sha256_cert_fingerprints": ["XX:XX:..."]
  }
}]
```

### 10.3 Dynamic links cho marketing campaigns

Per-campaign links với UTM-like tracking (own server, no third-party):

```
muonnoi.org/go/dalat-pilot → opens app, tracks source = dalat-pilot
```

---

## 11. BACKEND INTEGRATION

### 11.1 API endpoints

Reference đầy đủ: `MOBILE_API_ENDPOINTS_MUONNOI_2026-05-12.md`.

Mobile-specific endpoints (extension trên Cloudflare Workers hiện có):

```
POST /api/mobile/device/register
POST /api/mobile/device/unregister
POST /api/mobile/push/test          (admin only)
GET  /api/mobile/quests/nearby?lat=&lng=&radius=
POST /api/mobile/proofs/upload-batch
GET  /api/mobile/sync/status
GET  /api/mobile/feature-flags
```

### 11.2 API client

```typescript
// src/lib/api/client.ts (concept)
class MuonNoiApiClient {
  baseURL = 'https://api.muonnoi.org';

  async fetch<T>(path: string, options: RequestInit & {
    skipAuth?: boolean,
    retry?: number,
    timeout?: number,
  } = {}): Promise<T> {
    // Auto-attach Bearer token from secure storage
    // Handle 401 → trigger refresh token flow
    // Handle network error → queue for retry
    // Handle 429 → exponential backoff
    // Returns typed response
  }
}
```

### 11.3 Headers cho mobile requests

```
Authorization: Bearer <jwt>
X-Client: muonnoi-mobile
X-Client-Version: 1.0.0 (build 123)
X-Platform: ios|android
X-Locale: vi|en
X-Network-Type: wifi|cellular (informational)
```

---

## 12. PRIVACY COMPLIANCE

Chi tiết đầy đủ: xem `MOBILE_PRIVACY_AND_STORE_COMPLIANCE_2026-05-12.md`.

### 12.1 iOS App Store Privacy

**Data Collected — Linked to User:**
- Email address (account creation)
- Name (display name)
- Phone number (KYC tier 1)
- User-generated content (proofs, posts)
- Photos (quest proofs)
- Coarse location (GPS proof)

**Data Collected — Not Linked to User:**
- Crash data (Sentry)
- Performance data (anonymous)

**Data NOT Collected:**
- Browsing history, Search history
- Contacts, Health data
- Financial info (except via Stripe directly)
- Sensitive info (race, religion, sexual orientation, etc.)
- Advertising data (no IDFA collection)

**App Tracking Transparency:**
- Mobile app does NOT request ATT — vì không track cross-app/website
- Differentiator vs competitors

### 12.2 Google Play Data Safety

Same disclosure như iOS, format theo Play Store template.

**Crucial:** opt out Google Advertising ID collection trong build config.

### 12.3 GDPR + Vietnam Decree 53/2022

In-app features required:
- Data export (email within 30 days)
- Account deletion (in-app self-service, 30-day grace period)
- Privacy dashboard
- Consent management (granular toggles)

### 12.4 Children safety (COPPA / GDPR-K)

- Age rating: 13+
- Sign-up requires age confirmation
- < 13: family pod by parent, no public profile, restricted features
- Friend request gated by parent for minors

---

## 13. ROADMAP

### 13.1 MVP (Tháng 7-9 2026, post Đà Lạt soft launch)

**Scope:**
- Auth (email + phone OTP) + biometric
- Đường Muôn Nơi quest module
- Camera + GPS proof submission
- Profile + Trust score view
- Push notifications (3 categories: reminder, host msg, submission update)
- Offline-first cho quest browsing + proof draft
- VI only (EN later)
- Đà Lạt only (other cities later)

**Why this scope:**
- Web pilot launches May/June 2026
- Mobile MVP comes 2-3 months later khi Đà Lạt có traction
- Mobile là killer feature cho Travel Quest (proof in real world)

### 13.2 V1 (Tháng 10-12 2026)

- Học Đời module
- Family Mission
- chochoi daily quest hub
- EN localization
- Sài Gòn + Hà Nội expansion
- Wallet view

### 13.3 V2 (Q1-Q2 2027)

- Một Ngày Khoẻ (HealthKit / Google Fit integration)
- Việc Có Lý
- Vườn Sáng Tạo
- Cồng (community quest)
- Chat (with hosts, with cohort)
- AI tools tích hợp
- Receipt export as VC (Verifiable Credential)

### 13.4 Beyond V2

- Apple Watch companion
- iPad optimized layout
- Android tablet layout

---

## 14. SPRINT PLAN 12 TUẦN MVP

### Sprint 1-2 (Tuần 1-2) · Foundation
- Repo setup (Expo + TypeScript + ESLint + Prettier)
- EAS Build + EAS Update configured
- Apple Developer + Google Play Console accounts
- App icon + splash screen
- Design system foundation (tokens, primitive components)
- Bottom tab navigation skeleton
- VI/EN i18n setup

### Sprint 3-4 (Tuần 3-4) · Auth + Onboarding
- Welcome screens (3 screens carousel)
- Email + phone OTP auth flow
- SSO integration với identity.muonnoi.org
- Biometric setup (post-login)
- Settings screen basic
- Secure storage for token

### Sprint 5-6 (Tuần 5-6) · Quest browsing + detail
- Quest list (filter, search)
- Quest detail screen với map preview
- Host profile screen
- Nearby quests using GPS
- Offline cache for quests

### Sprint 7-8 (Tuần 7-8) · Proof submission
- Camera screen với EXIF capture
- GPS proof component
- Photo preview + retake
- Reflection text input
- Host signature scan (QR code reader)
- Submission wizard 4 steps
- Offline queue for unsent submissions

### Sprint 9-10 (Tuần 9-10) · Profile + Trust + Sync
- Profile screen với receipts list
- Trust score visualization
- Receipt detail view
- Offline sync engine working end-to-end
- Background sync triggers

### Sprint 11 (Tuần 11) · Polish + Pre-launch
- Animation polish
- Empty states cho all screens
- Error handling end-to-end
- Push notification flow tested
- Accessibility audit (VoiceOver, TalkBack)
- Performance audit (60fps, < 2s cold start)
- Internal beta on TestFlight + Play Console internal track

### Sprint 12 (Tuần 12) · Submission + Launch
- App Store submission
- Play Store submission
- Privacy policy URL: https://muonnoi.org/legal/mobile-privacy
- Terms URL
- App Store screenshots (6.7", 6.5", 5.5") - 8 per locale
- Play Store screenshots (phone) - 8 per locale
- App Store description (VI + EN)
- Promo video 30s

---

## 15. TEAM

### 15.1 Team structure cho MVP

**Core team (4-5 người):**

| Role | Responsibility |
|---|---|
| Mobile Lead | Architecture, code review, releases |
| Senior RN Engineer | Auth + Quest + Proof modules |
| Mid RN Engineer | Profile + Trust + Sync |
| Mobile Designer | UX/UI, design system, prototypes |
| QA Engineer | Manual + automation (Maestro) |

**Shared với web team:**
- Backend Engineer (extends api.muonnoi.org)
- Product Manager
- Localization (VI/EN review)

### 15.2 External resources

- Apple Developer Program: $99/year
- Google Play Console: $25 one-time
- Expo EAS Production: $99/month
- TestFlight: free
- Sentry (mobile): $26/month

Total mobile-specific infra: < $200/month

---

## 16. CI/CD

### 16.1 Pipeline

```
Push to main → GitHub Actions
                  ↓
              Type-check + lint + test
                  ↓
              EAS Build (triggered)
                  ↓
        ┌─────────┴─────────┐
        ↓                   ↓
  iOS (TestFlight)    Android (Play internal)
        ↓                   ↓
   Internal testers   Internal testers
        ↓                   ↓
   QA approval        QA approval
        ↓                   ↓
   External beta      Closed beta
        ↓                   ↓
   Production submit   Production submit
        ↓                   ↓
   App Store review    Play Store review
        ↓                   ↓
   LIVE                LIVE
```

### 16.2 EAS Build profiles

`eas.json`:

```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "ios": { "simulator": true }
    },
    "preview": {
      "distribution": "internal",
      "channel": "preview"
    },
    "production": {
      "channel": "production",
      "ios": { "autoIncrement": "buildNumber" },
      "android": { "autoIncrement": "versionCode" }
    }
  },
  "submit": {
    "production": {
      "ios": {
        "appleId": "ops@muonnoi.org",
        "ascAppId": "[TBD]",
        "appleTeamId": "[TBD]"
      },
      "android": {
        "serviceAccountKeyPath": "./google-service-account.json",
        "track": "production"
      }
    }
  }
}
```

### 16.3 OTA Updates strategy

- JS-only changes → EAS Update (instant rollout)
- Native changes (new permissions, modules) → full rebuild + store submission
- Update frequency: OTA OK weekly, native release monthly

---

## 17. SUBMISSION CHECKLIST

Chi tiết đầy đủ: xem `MOBILE_QA_AND_RELEASE_CHECKLIST_2026-05-12.md`.

### 17.1 iOS App Store (high level)

- [ ] Apple Developer Program active
- [ ] Bundle ID: `org.muonnoi.app`
- [ ] App icon (1024×1024)
- [ ] Screenshots: 6.7" + 6.5" + 5.5" (8 each per locale)
- [ ] Promo video (30s)
- [ ] App description VI + EN
- [ ] Privacy Policy URL
- [ ] App Privacy answered in detail
- [ ] Age rating: 13+
- [ ] Categories: Primary Lifestyle, Secondary Travel

### 17.2 Google Play Store (high level)

- [ ] Google Play Console account
- [ ] Package name: `org.muonnoi.app`
- [ ] App icon (512×512), feature graphic (1024×500)
- [ ] Screenshots: phone (4-8)
- [ ] Privacy policy URL
- [ ] Data Safety form complete
- [ ] Content rating completed
- [ ] Target audience: 13+
- [ ] App content: NO ads declaration

---

## 18. MARKETING

### 18.1 Launch campaign

**Pre-launch (4 weeks before):**
- Landing page: muonnoi.org/app
- Email signup waitlist
- Đà Lạt local press outreach
- Local Host community shares

**Launch day:**
- Email blast to waitlist + Muôn Nơi users
- Press release (VN + Asia tech press)
- Social media (Facebook, Instagram trips groups)
- Founder thread on X / LinkedIn

**Post-launch:**
- Weekly digest emails với featured quests
- User stories
- App Store optimization (ASO) iteration

### 18.2 ASO

**Primary keywords:**
- VI: muôn nơi, đà lạt, du lịch, trải nghiệm địa phương, homestay
- EN: muôn nơi, vietnam travel, da lat, local experience, homestay

**Description hook (3 lines):**

```
VI:
Khám phá Đà Lạt theo cách thật.
30 nhiệm vụ. 50 host địa phương. Mỗi trải nghiệm mang về bằng chứng có hash.
Đây không phải app du lịch — đây là cách sống khác.

EN:
Discover Đà Lạt the real way.
30 quests. 50 local hosts. Every experience returns with hash-verified proof.
This isn't a travel app — it's a different way to live.
```

---

## 19. METRICS

### 19.1 North Star Metric (mobile)

**Proof Submissions per Active User per Month (PS/AU/M)**

Target Y1 mobile: 3+ proofs/active user/month.

### 19.2 Secondary KPIs

| Metric | Target Y1 |
|---|---|
| App Store rating | 4.5+ |
| Play Store rating | 4.5+ |
| D7 retention | 35%+ |
| D30 retention | 20%+ |
| Crash-free sessions | 99.5%+ |
| Cold start time | < 2s |
| Average session length | < 8 min (intentionally low) |
| Sessions/day per user | 1-3 (not 30) |
| Notification opt-in rate | 60%+ |
| Biometric adoption | 70%+ |
| Offline submission rate | 30%+ |

### 19.3 Anti-metrics (KHÔNG track/optimize)

- ❌ Time in app
- ❌ Engagement (likes, follows count)
- ❌ Ad impressions
- ❌ DAU/MAU pushed by addiction loops

---

## 20. RISKS

| # | Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| 1 | App Store rejection first submission | Medium | Medium | Pre-review with Expo + clear permission strings |
| 2 | Crash rate high (RN New Arch) | Low | High | Use stable Expo SDK, extensive QA |
| 3 | Offline sync corruption | Medium | High | Idempotency keys, server-side dedup, retry logic |
| 4 | Camera/GPS permission denial → unusable | Medium | High | Onboarding explains value, graceful degradation |
| 5 | Push notification spam complaints | Low | Medium | Hard 1/day cap, opt-in only |
| 6 | Privacy regulation change | Low | High | Privacy-first design = ahead |
| 7 | Biometric flow security flaw | Low | Critical | Use platform Keychain/Keystore, no custom crypto |
| 8 | Battery drain from location | Medium | Medium | "When in use" only, no background tracking |
| 9 | Image upload fails on slow networks | High | Medium | Image compression + retries + queue |
| 10 | Native module incompatibility | Low | Medium | Expo modules only |
| 11 | EAS service outage | Low | High | Local build fallback documented |
| 12 | App Store policy change | Medium | Medium | Position as Lifestyle, not Social |

---

## 21. CHECKLIST GO/NO-GO

Trước khi public launch app:

**Product:**
- [ ] All MVP features working on both platforms
- [ ] Đường Muôn Nơi 30 quests live và accessible from app
- [ ] At least 50 Local Hosts onboarded
- [ ] Web app.muonnoi.org và dulich.muonnoi.org stable 1 month+

**Technical:**
- [ ] Crash-free rate > 99.5% in beta
- [ ] All critical user flows tested on iPhone 12-15 + 3 Android models
- [ ] Offline sync tested with airplane mode toggling
- [ ] Push notifications work on both fresh install + reinstall
- [ ] Deep links open correct screen

**Legal:**
- [ ] Privacy Policy published
- [ ] Terms of Service published
- [ ] Mobile-specific Privacy Notice published
- [ ] DMCA contact published
- [ ] App Store / Play Store privacy declarations match reality

**Operations:**
- [ ] Support email staffed (support@muonnoi.org)
- [ ] In-app feedback channel working
- [ ] Crash dashboard monitored (Sentry)
- [ ] Server capacity tested for 10x mobile traffic
- [ ] Đà Lạt 24/7 emergency hotline announced in-app

**Marketing:**
- [ ] App Store listing optimized (VI + EN)
- [ ] Press kit updated với mobile screenshots
- [ ] Landing page muonnoi.org/app live
- [ ] Email blast prepared for existing users

---

## 22. APPENDIX

### 22.1 Glossary

- **EAS** — Expo Application Services
- **OTA** — Over-The-Air update
- **APNs** — Apple Push Notification service
- **FCM** — Firebase Cloud Messaging (chỉ messaging endpoint)
- **ATT** — App Tracking Transparency
- **IDFA** — Identifier for Advertisers (NOT collected)
- **AAID** — Android Advertising ID (NOT collected)
- **VC** — Verifiable Credential (W3C standard)
- **PS/AU/M** — Proof Submissions per Active User per Month (North Star)

### 22.2 References

- React Native: https://reactnative.dev
- Expo: https://expo.dev
- Apple HIG: https://developer.apple.com/design/human-interface-guidelines
- Material Design 3: https://m3.material.io
- App Store Review Guidelines: https://developer.apple.com/app-store/review/guidelines/
- Play Store Policies: https://play.google.com/about/developer-content-policy/

### 22.3 Files liên quan (cùng bộ deliverable mobile)

```
MUONNOI_MOBILE_APP_PLAN_2026-05-12.md            ← Bản này
MOBILE_API_ENDPOINTS_MUONNOI_2026-05-12.md       Endpoints + payload schema
MOBILE_OFFLINE_SYNC_PROTOCOL_2026-05-12.md       Sync queue + idempotency
MOBILE_PRIVACY_AND_STORE_COMPLIANCE_2026-05-12.md App Store + Play Store privacy
MOBILE_QA_AND_RELEASE_CHECKLIST_2026-05-12.md    QA matrix + release gates
```

---

## CÂU CHỐT

> Mobile app Muôn Nơi không phải nơi để user dành nhiều thời gian.
>
> Mobile app Muôn Nơi là công cụ để user **bước ra khỏi app, vào thế giới thật** — và mang về bằng chứng có hash của những khoảnh khắc thật đó.
>
> Nếu user dùng app 5 phút mỗi ngày để chụp 1 proof và nhận 1 receipt, app đã thành công.
> Nếu user dành 2 tiếng/ngày trong app, chúng tôi đã thất bại với mục tiêu của mình.

---

**Document version:** v1.0
**Date:** 2026-05-12
**Status:** READY FOR MOBILE TEAM HANDOFF
**Author:** Mobile Master Plan for Muôn Nơi · Trần Hà Tâm
**Predecessor:** `apps/mobile/MUONNOI_MOBILE_TEAM_HANDOFF_SPRINT_01_2026-05-11.md` (Capacitor era — superseded by this RN+Expo plan)
