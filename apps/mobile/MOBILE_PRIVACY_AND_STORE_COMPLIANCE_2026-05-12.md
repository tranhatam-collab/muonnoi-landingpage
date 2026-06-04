# Mobile Privacy + Store Compliance — Muôn Nơi
**Document**: MOBILE_PRIVACY_AND_STORE_COMPLIANCE_2026-05-12
**Source**: MUONNOI_MOBILE_APP_PLAN_2026-05-12.md (Section 5 + Section 12)
**Status**: REQUIRED FOR STORE SUBMISSION
**Audience**: Privacy officer, mobile lead, legal counsel, App Review reviewers, Play Console reviewers

> Tài liệu này là phụ lục bắt buộc đi kèm bản nộp store. Tất cả tuyên bố trong App Store Connect "App Privacy" và Google Play "Data Safety" PHẢI khớp 1:1 với nội dung dưới đây. Bất kỳ thay đổi nào về dữ liệu thu thập, SDK, hoặc permission đều phải cập nhật bản này TRƯỚC khi nộp build mới.

---

## 1. Privacy principles (8 bất biến)

8 nguyên tắc bất biến của Muôn Nơi — KHÔNG được vi phạm, ngay cả khi đối thủ làm khác, ngay cả khi growth team xin:

1. **Không tracking pixel.** Không gắn `<img>` 1x1 hay beacon tương đương trong mobile app, web, hay email.
2. **Không third-party analytics SDK.** Cấm tuyệt đối: Firebase Analytics, Google Analytics, Mixpanel, Amplitude, AppsFlyer, Adjust, Branch attribution, Crashlytics. Chúng tôi viết telemetry server-side bằng backend của chính mình.
3. **FCM chỉ dùng messaging.** Firebase Cloud Messaging dùng cho push notification token routing trên Android. Mọi tính năng analytics, A/B testing, Remote Config, hay Performance Monitoring của Firebase PHẢI tắt qua manifest meta-data.
4. **Camera/GPS chỉ "when in use".** Không bao giờ request background location, không bao giờ poll GPS khi app ở background, không bao giờ chụp ảnh không có user tap.
5. **Dữ liệu tối thiểu.** Chỉ thu thập field cần thiết cho function đang chạy. Mỗi field mới phải có lý do nghiệp vụ ghi trong PR description.
6. **User own their data.** Mọi user có quyền export, sửa, xóa tài khoản trong app. Không ép user gửi email support để xoá account.
7. **Không bán data, không broker, không ad network.** Doanh thu Muôn Nơi đến từ users (Stripe direct), hosts (commission), không bao giờ từ quảng cáo data-driven.
8. **Transparent by default.** Privacy policy bằng tiếng Việt + English, có dashboard hiển thị cho user "what we know about you". Không có "dark pattern" trong consent flow.

---

## 2. Data inventory (granular)

### 2.1 Data collected — Linked to User

Linked = có khoá ngoại trỏ về `user_id`, có thể tra ngược ra danh tính cá nhân.

| Data | Source | Purpose | Retention | Shared with | User can delete |
|---|---|---|---|---|---|
| Email address | Sign-up form | Account login, recovery, transactional email | Active + 7 năm sau xoá (legal compliance Vietnam Decree 53 Article 26) | Không bên thứ ba | Yes — POST /api/privacy/delete-account |
| Display name | Profile setup | Hiển thị trong feed, post, host page | Active + xoá ngay sau request | Không | Yes |
| Phone number | KYC tier 1 OTP | Verify human, recovery 2FA | Active + 7 năm | Twilio Verify (Vietnam SMS gateway, mặt nạ hoá sau verify) | Yes (replace bằng anonymized hash) |
| Photos (proof) | Camera / Photo Library | Quest proof, host verification | Active + 90 ngày sau xoá | Cloudflare R2 (encrypted at rest) | Yes |
| User-generated content (posts, comments, proof captions) | Text input | Public feed, host moderation | Active + 90 ngày sau xoá | Cloudflare D1 | Yes (tombstone, replace bằng "[deleted]") |
| Coarse location (GPS, ~500m precision) | expo-location | Quest proof verify, nearby quests list | 30 ngày rolling, không lưu lịch sử di chuyển | Không | Yes (location log purge) |
| Trust score | Computed | Display rep, host filter | Active + 90 ngày | Không | Reset on delete |
| Submissions (proof submissions list) | App events | Quest history, payout calc | Active + 7 năm (financial compliance) | Không | Anonymized after delete |
| Receipts (payout, refund) | Payment events | Financial record | 10 năm (Vietnam tax law) | Stripe (transactional) | Anonymized, kept for legal |
| Push token (FCM/APNs) | Device registration | Send notification | 30 ngày sau session cuối | FCM (Android), APNs (iOS) | Yes — invalidate on logout |
| Biometric template | OS Keychain/Keystore | Quick login | Stored ON DEVICE only, never sent to server | None | OS-level |

**Khoá ngoại bất biến:** chỉ `user_id` là PII link. Mọi log, analytics, crash report PHẢI strip `user_id` trước khi rời máy chủ Muôn Nơi.

### 2.2 Data collected — Not linked to user

Not linked = sau khi sanitize, không thể tra ngược về cá nhân nào.

- **Crash stack traces (Sentry).** PII stripping rules áp dụng client-side TRƯỚC khi gửi: scrub email, phone, user_id, JWT, photo URLs, location coords. Retention 90 ngày, sau đó auto-delete khỏi Sentry organization.
- **App health metrics (active users count).** Daily aggregate, không có user_id, không có session ID. Chỉ số `count(distinct user_id_hash_with_daily_salt)`, daily salt rotation. Retention 30 ngày aggregate.
- **Anonymous performance:** cold start time, frame drops, API latency p50/p95/p99. Gửi qua backend của Muôn Nơi (không Sentry Performance, không Firebase Performance). Retention 30 ngày.
- **Locale + timezone** (để render đúng ngôn ngữ / giờ địa phương). Không lưu trữ ngoài request cycle.
- **App version + OS version** (để debug). Lưu trong crash report only.

### 2.3 Data NOT collected

Tuyệt đối không thu thập, không có kế hoạch thu thập, không có code path nào dẫn đến thu thập:

- Browsing history bên ngoài app
- Search history bên ngoài app
- Contacts (`READ_CONTACTS` không có trong manifest)
- Calendar (`READ_CALENDAR` không có trong manifest)
- Health data (HealthKit / Google Fit chỉ vào V2 với module Một Ngày Khoẻ, opt-in tách biệt)
- Financial info (Stripe SDK xử lý card data trong SafariViewController / Custom Tab isolated context, app không bao giờ thấy card number, CVV, hay full IBAN)
- Sensitive personal info (race, religion, sexual orientation, political views, union membership, biometric data ngoài Face ID/Touch ID on-device)
- Advertising data — không IDFA, không AAID, không click ID
- Device fingerprint (không thu thập IMEI, MAC, build serial, app list, install referrer)
- Social graph từ apps khác (không Facebook Login, không Google Login trên iOS — chỉ email + Apple Sign-In)
- Microphone audio (V2+ video proof sẽ reconsider, MVP không có)
- Background location

---

## 3. iOS App Store Privacy Disclosure

### 3.1 App Privacy section (App Store Connect)

Khi điền form "App Privacy" trong App Store Connect, đánh dấu theo bảng dưới. Mỗi mục có giải thích cho App Review reviewer.

| Apple category | Collected? | Linked? | Purpose | Note for reviewer |
|---|---|---|---|---|
| Contact Info — Email | YES | Linked | Account management, customer support | Email là primary identifier. Required for password reset. |
| Contact Info — Phone Number | YES | Linked | App functionality (KYC tier 1 OTP) | Required for human verification, Vietnam regulatory. |
| Contact Info — Physical Address | NO | — | — | Không thu thập địa chỉ nhà. |
| Contact Info — Name | YES | Linked | App functionality (display name) | User-chosen display name, not legal name. |
| Contact Info — Other | NO | — | — | — |
| Health & Fitness | NO | — | — | MVP không có. V2 module Một Ngày Khoẻ sẽ opt-in HealthKit tách biệt. |
| Financial Info — Payment Info | NO | — | — | Stripe Mobile SDK xử lý hoàn toàn, card data không qua app của Muôn Nơi. |
| Financial Info — Credit Info | NO | — | — | — |
| Financial Info — Other | NO | — | — | — |
| Location — Precise | NO | — | — | Chúng tôi chỉ dùng coarse. |
| Location — Coarse | YES | Linked | App functionality (proof verification, nearby quests) | When-in-use only. Không background. |
| Sensitive Info | NO | — | — | — |
| Contacts | NO | — | — | Không request `Contacts` permission. |
| User Content — Photos or Videos | YES | Linked | App functionality (quest proof) | User-chosen, không auto-upload. |
| User Content — Audio | NO | — | — | Không record audio. |
| User Content — Gameplay Content | NO | — | — | — |
| User Content — Customer Support | YES | Linked | App functionality (in-app support thread) | Trao đổi với CS team. |
| User Content — Other | YES | Linked | App functionality (posts, comments, captions) | Public feed content. |
| Browsing History | NO | — | — | Không có web view tracking. |
| Search History | NO | — | — | Không log query. |
| Identifiers — User ID | YES | Linked | App functionality | Khoá chính trong DB Muôn Nơi. |
| Identifiers — Device ID | YES | Not linked | App functionality (push notifications) | APNs token, không phải IDFA. Rotated. |
| Purchases | NO | — | — | Stripe handles transaction records separately. |
| Usage Data — Product Interaction | NO | — | — | Không track tap/scroll/screen-view. |
| Usage Data — Advertising | NO | — | — | Không quảng cáo. |
| Usage Data — Other | NO | — | — | — |
| Diagnostics — Crash Data | YES | Not linked | App functionality, analytics | Sentry, PII stripped client-side. |
| Diagnostics — Performance | YES | Not linked | App functionality, analytics | Anonymous metrics tới backend Muôn Nơi. |
| Diagnostics — Other | NO | — | — | — |
| Other Data | NO | — | — | — |

### 3.2 Tracking declaration

**Tuyên bố chính thức:** Muôn Nơi mobile app KHÔNG track.

Đáp ứng định nghĩa "Tracking" của Apple (App Store Review Guidelines 5.1.2(i)):
- Không link dữ liệu thu thập từ app với dữ liệu thu thập từ apps/websites của công ty khác cho mục đích quảng cáo có chủ đích.
- Không link dữ liệu thu thập từ app với data broker.
- Không share device location, email, hoặc list với data broker.
- Không có advertising attribution (AppsFlyer/Adjust/Branch ZERO).

**Hệ quả:** Không cần trigger `ATTrackingManager.requestTrackingAuthorization`. Không hiển thị App Tracking Transparency prompt.

**Để chuẩn bị cho App Review hỏi:** Trong "App Review Information" notes, paste sẵn:
> "Muôn Nơi does not perform tracking as defined in App Store Review Guideline 5.1.2(i). We do not use any third-party advertising SDKs, analytics SDKs that track across apps, or data brokers. We do not collect IDFA. We do not request ATT because we have nothing to track. Please see our privacy policy at https://muonnoi.org/legal/mobile-privacy for full details."

Kèm screenshot Settings → Privacy → Tracking trong app — sẽ thấy KHÔNG có toggle nào vì app không bao giờ gọi ATT.

### 3.3 Privacy Nutrition Label (summary)

Hiển thị trên App Store listing:

- **Data Linked to You:** Contact Info, User Content, Location, Identifiers, Diagnostics (note: linked vì để debug user-specific issue khi user opt-in support thread; ngoài context đó không linked).
- **Data Not Linked to You:** Diagnostics (crash, performance — không user_id).
- **Data Used to Track You:** None.

---

## 4. Google Play Data Safety Disclosure

### 4.1 Data Safety form fields

| Play category | Sub-type | Collected? | Shared? | Optional? | Encrypted in transit? | Can request deletion? | Processed ephemerally? |
|---|---|---|---|---|---|---|---|
| Personal info | Email address | YES | NO | Required | YES | YES | NO |
| Personal info | Name | YES | NO | Required | YES | YES | NO |
| Personal info | Phone number | YES | NO | Required | YES | YES | NO |
| Personal info | User IDs | YES | NO | Required | YES | YES | NO |
| Personal info | Address | NO | — | — | — | — | — |
| Financial info | Any | NO (Stripe SDK isolated) | — | — | — | — | — |
| Health and fitness | Any | NO | — | — | — | — | — |
| Messages | In-app messages | YES (V2+) | NO | Optional | YES | YES | NO |
| Photos and videos | Photos | YES | NO | Required | YES | YES | NO |
| Photos and videos | Videos | NO | — | — | — | — | — |
| Audio files | Any | NO | — | — | — | — | — |
| Files and docs | Any | NO | — | — | — | — | — |
| Calendar | Any | NO | — | — | — | — | — |
| Contacts | Any | NO | — | — | — | — | — |
| Location | Approximate | YES (when-in-use) | NO | Required | YES | YES | YES (30d rolling) |
| Location | Precise | NO | — | — | — | — | — |
| Web browsing | Any | NO | — | — | — | — | — |
| App activity | Page views and taps | NO | — | — | — | — | — |
| App activity | In-app search history | NO | — | — | — | — | — |
| App activity | Other user-generated content | YES (posts, comments) | NO | Optional | YES | YES | NO |
| App activity | Other actions | NO | — | — | — | — | — |
| App info and performance | Crash logs | YES | YES (Sentry, anon) | Required | YES | YES | NO (90d) |
| App info and performance | Diagnostics | YES | NO | Required | YES | YES | NO (30d) |
| App info and performance | Other | NO | — | — | — | — | — |
| Device or other IDs | Device ID | YES (FCM token) | YES (Google FCM) | Required | YES | YES (logout) | NO |

### 4.2 Data sharing

Liệt kê bên thứ ba và phạm vi share:

- **Stripe (payment processor).** Share: chỉ trên payment event (user nhấn "Pay"). Data shared: transaction amount, currency, user email (Stripe customer ID mapping). KHÔNG share: device data, location, photo, browsing. Stripe có privacy policy riêng tại https://stripe.com/privacy. Phục vụ purpose: thanh toán + chống fraud.
- **Sentry (crash reporting).** Share: stack trace + breadcrumbs đã sanitize (no PII). Endpoint self-hosted region EU. Retention 90d. Phục vụ purpose: bug fix.
- **Expo Push / FCM / APNs (push delivery).** Share: device token + notification payload. Payload KHÔNG chứa PII (chỉ chứa `quest_id`, `event_type`). Phục vụ purpose: notification.
- **Cloudflare (hosting, CDN, R2 storage).** Share: standard request logs (IP, user agent, timestamp). Retention 24h theo Cloudflare default + opt-out của detailed logging. Phục vụ purpose: hạ tầng.
- **Twilio (SMS OTP, KYC tier 1).** Share: phone number + 6-digit OTP. Twilio không lưu OTP sau verify. Phục vụ purpose: human verification.

**KHÔNG share với:** ad networks, data brokers, analytics vendors (Mixpanel, Amplitude, GA, Firebase Analytics), social networks (Facebook, TikTok), AppsFlyer, Adjust, Branch.

### 4.3 Security practices

- **Encrypted in transit:** HTTPS only. TLS 1.2 minimum, TLS 1.3 preferred. App có cert pinning cho `api.muonnoi.org`.
- **Encrypted at rest:** Cloudflare D1 (SQLite) server-side encryption AES-256. R2 object storage server-side encryption AES-256. Trên thiết bị: secrets (JWT, refresh token) trong iOS Keychain / Android Keystore. Biometric template trên device chỉ (OS-managed).
- **Users can request data deletion:** YES, in-app at Settings → Privacy → Delete account. 30-day grace period, sau đó tombstone + anonymize. Cộng thêm legal retention (financial 10y, identity 7y) per Vietnam law.
- **Data deletion request URL:** https://muonnoi.org/legal/data-deletion
- **Independent security review:** đang plan post-MVP (Q1 2027), do bên thứ ba audit (đề xuất: NCC Group hoặc Cure53).
- **Bug bounty:** không có MVP; sẽ enable sau Q2 2027 nếu user base > 10k.

---

## 5. Apple Tracking Transparency (ATT) — chi tiết

### 5.1 Tại sao KHÔNG trigger ATT

Theo Apple Developer documentation:
> "If you collect data about end users and share it with other companies for purposes of tracking across multiple apps and websites, you must request permission for tracking."

Chúng tôi KHÔNG làm điều đó:
- Không track across apps/websites của công ty khác (no AppsFlyer, no Branch, no Adjust).
- Không share data với data broker.
- Không advertising attribution.
- Không IDFA collection.

### 5.2 Tài liệu nộp cho App Review nếu hỏi

Sẵn sàng paste vào App Review Information field:

> "We confirm that Muôn Nơi does not engage in tracking as defined in Apple Developer Documentation. Specifically:
> 1. We do not link user data with third-party data for advertising.
> 2. We do not share user data with data brokers.
> 3. We do not use any advertising attribution SDK.
> 4. We do not request IDFA via ASIdentifierManager.
> 5. Our analytics is server-side only, processed on infrastructure we own, and does not cross app/site boundaries.
>
> See guideline 5.1.2(i). Privacy policy: https://muonnoi.org/legal/mobile-privacy"

### 5.3 Build verification

Trước submit:
- `grep -ri "ATTrackingManager" ios/` → must return empty.
- `grep -ri "ASIdentifierManager" ios/` → must return empty.
- `grep -ri "advertisingIdentifier" ios/` → must return empty.
- Bundle analyzer phải show NO `AdSupport.framework` linked.

---

## 6. GDPR compliance (EU users)

Áp dụng cho user EU/EEA. Mặc dù target chính là Việt Nam, GDPR cover bất kỳ user EU nào nên app phải tuân thủ.

### 6.1 Lawful basis per data category

| Data | Lawful basis (GDPR Art. 6) |
|---|---|
| Email, name, phone | Contract (Art. 6(1)(b)) — cần để tạo tài khoản |
| Photos, proofs | Consent (Art. 6(1)(a)) — user chủ động submit |
| Coarse location | Consent (Art. 6(1)(a)) — OS-level permission |
| Crash diagnostics | Legitimate interest (Art. 6(1)(f)) — balancing test pro-user (cần fix bug) |
| Push notifications | Explicit consent (Art. 6(1)(a)) — user opt-in trong OS dialog |
| Trust score, submissions | Contract — cần để vận hành quest mechanic |
| Receipts | Legal obligation (Art. 6(1)(c)) — Vietnam tax + EU VAT |

### 6.2 Data subject rights implementation

| Right (GDPR Article) | In-app implementation | SLA |
|---|---|---|
| Right to access (Art. 15) | GET /api/privacy/data-summary → Settings → Privacy → "Xem dữ liệu của tôi" | Immediate (real-time) |
| Right to portability (Art. 20) | POST /api/privacy/export-request → email ZIP within 30d | 30 days max |
| Right to deletion / "to be forgotten" (Art. 17) | POST /api/privacy/delete-account → 30d grace, then tombstone | 30 days grace + 30 days execution |
| Right to rectification (Art. 16) | PATCH /api/profile/me → Settings → Edit profile | Immediate |
| Right to object (Art. 21) | Settings → Notifications → granular toggle per category | Immediate |
| Right to restrict (Art. 18) | Settings → Privacy → "Tạm dừng tài khoản" (self-service account suspension) | Immediate |
| Right to data protection (Art. 12-14) | Privacy notice in onboarding + always available at /legal/mobile-privacy | N/A |
| Right not to be subject to automated decision-making (Art. 22) | Trust score uses deterministic rule, NOT ML. Document logic in /legal/mobile-privacy § "Automated decisions". | N/A |

### 6.3 Data Protection Officer

- **Contact:** dpo@muonnoi.org
- **Response SLA:** 30 days max for data subject request.
- **Escalation:** Vietnam MIC (Ministry of Information and Communications) for Vietnam-related; EU lead supervisory authority TBD (no EU establishment yet, falls under Art. 27 representative when EU traffic > 5%).

---

## 7. Vietnam Decree 53/2022 compliance

### 7.1 Domestic data hosting requirement

Decree 53/2022/ND-CP Article 26 yêu cầu dữ liệu của user Việt Nam phải lưu trữ trong nước.

**Strategy:**
- Cloudflare D1 + R2 region: configure to APAC region (Cloudflare workers route closest to VN: HKG, SIN). Document evidence on infra config.
- Backup region: secondary APAC region (e.g., NRT - Tokyo) for redundancy.
- Long-term (post-MVP): evaluate hybrid với VNG Cloud hoặc Viettel IDC nếu user base Việt Nam > 50k.
- Document compliance evidence: hosting region map, data flow diagram, screenshot Cloudflare dashboard region settings.

### 7.2 User identification for accounts

Per Decree 53 Article 26 + Decision 09/CT-TTg:
- **KYC tier 1 (default):** email + phone OTP via Twilio Vietnam SMS gateway. Phone number SHALL match Vietnam telecom registry (đã thực hiện qua chính phủ - cá nhân).
- **KYC tier 2 (optional, for high-value payout >5M VND/month):** ID document (CCCD chip-based) upload, verified via VNeID API (planned V1).
- Tier 2 ID images stored separately in encrypted bucket, accessible only by manual review queue.

### 7.3 Content moderation (Decree 53 Article 26)

- In-app report flow: long-press post/proof → "Báo cáo nội dung vi phạm" → category select.
- Response SLA: 24h for illegal content (bạo lực, khiêu dâm, lừa đảo, chống nhà nước).
- Cooperation flow: Vietnam authorities sent legal request to dpo@muonnoi.org → assessed within 24h → comply if valid, document trong transparency report annual.
- Auto-moderation: hash-based blocklist cho CSAM (PhotoDNA partner planned).

---

## 8. Children safety (COPPA, GDPR-K)

### 8.1 Age gating

- **App Store age rating:** 12+ (do user-generated content, occasional mature themes trong các quest văn hoá).
- **Play Store target age:** 13+ (Designed for Families NO; muốn user 13+ tự lập profile).
- **Sign-up flow:** explicit dropdown "Năm sinh" → backend compute age → if < 13 → block public sign-up.
- **U13 detection trigger:** nếu user tự khai < 13, hoặc parent flag, account moved to "Family Pod minor" mode.

### 8.2 Family Pod (V1, U13 access path)

Cho user dưới 13, đường vào duy nhất là qua "Family Pod":
- Parent (đã verify KYC tier 1) add minor vào pod.
- Minor không có public profile (display name chỉ visible trong pod).
- Minor không gửi/nhận DM với non-pod members.
- Minor không submit public post; chỉ proof gửi trong pod context.
- Quest minor làm phải có parent co-confirm.

### 8.3 Parental consent flow (V2)

Khi V2 roll out Family Mission module:
- Verifiable parental consent (GDPR-K Art. 8): parent provide credit card check $0.50 verification charge, hoặc nộp ID document.
- Email confirmation chain to parent before minor account activation.
- Annual consent renewal reminder.

### 8.4 No targeted advertising to children

Per COPPA + GDPR-K + Apple/Google policies: KHÔNG có advertising trong app, KHÔNG có behavior profiling cho U13. Tự động đáp ứng do nguyên tắc bất biến #2 và #7.

---

## 9. Permission rationales (in-app modal trước khi gọi OS dialog)

iOS và Android đều cho phép app hiển thị custom UI TRƯỚC khi gọi system permission dialog. Best practice: show explanation modal first, người dùng đồng ý → mới gọi OS dialog. Tăng grant rate, giảm risk reviewer reject vì lý do "permission asked without context".

| Permission | Pre-dialog modal copy (VI) | Pre-dialog modal copy (EN) | Triggering moment |
|---|---|---|---|
| Camera | "Để chụp bằng chứng quest, Muôn Nơi cần truy cập camera. Ảnh không tự đăng công khai — bạn quyết định." | "To capture proof of completed quests, Muôn Nơi needs camera access. Photos are not auto-shared — you decide." | First time user taps "Chụp proof" |
| Location (when-in-use) | "Để xác minh bạn đã tới điểm hoàn thành và gợi ý quest gần bạn, Muôn Nơi cần biết vị trí. Chỉ khi app đang mở. Không bao giờ bán." | "To verify you completed the quest at the right place and suggest nearby quests, Muôn Nơi needs your location. Only when the app is open. Never sold." | First time map screen opens hoặc first proof submission |
| Notifications | "Để nhắc bạn quest đã nhận, báo proof đã duyệt, và tin từ host. Tối đa 1 push/ngày." | "To remind you of accepted quests, notify you when proof is approved, and deliver host messages. Max 1 push/day." | After first quest accepted (not on app launch) |
| Photo Library | "Bạn có thể chọn ảnh có sẵn từ thư viện làm proof. Chỉ ảnh bạn chọn được dùng." | "You can pick existing photos as proof. Only photos you choose are used." | First time user taps "Chọn từ thư viện" |
| Biometric (Face ID / fingerprint) | "Đăng nhập nhanh và an toàn hơn nhập mật khẩu. Mẫu sinh trắc học chỉ lưu trên máy bạn." | "Faster and safer login than typing password. Biometric template stays on your device." | After successful first password login, optional opt-in |

**Graceful degradation when denied:**
- Camera denied → cho phép upload từ thư viện (nếu cũng denied → hiển thị Settings deep link).
- Location denied → quest list không sort theo gần; proof submission chuyển sang host manual review fallback.
- Notifications denied → app vẫn hoạt động đầy đủ; in-app banner reminders thay thế.
- Photo Library denied → fall back to camera only.
- Biometric denied → password login default.

Mọi trường hợp denied: Settings có nút "Mở cài đặt hệ thống" deep-link đúng pane.

---

## 10. Permission usage strings (VI + EN)

### 10.1 iOS Info.plist

```
NSCameraUsageDescription
VI: Muôn Nơi cần truy cập camera để bạn chụp bằng chứng hoàn thành quest.
    Ảnh được dùng làm proof, không tự động đăng công khai. Bạn xem lại
    và xác nhận trước khi gửi.
EN: Muôn Nơi needs camera access to capture proof of completed quests.
    Photos are used as proof, not auto-shared publicly. You review and
    confirm before submitting.

NSLocationWhenInUseUsageDescription
VI: Muôn Nơi cần vị trí của bạn để xác nhận bạn đã đến điểm hoàn thành
    quest và hiển thị quest gần bạn. Vị trí chỉ dùng trong app, không
    bao giờ bán, không track khi app đóng.
EN: Muôn Nơi needs your location to verify quest completion at specified
    locations and show nearby quests. Location is used in-app only,
    never sold, never tracked when the app is closed.

NSPhotoLibraryUsageDescription
VI: Muôn Nơi truy cập thư viện ảnh để bạn chọn ảnh làm proof. Chỉ ảnh
    bạn chọn được dùng. Không quét toàn bộ thư viện.
EN: Muôn Nơi accesses your photo library so you can select photos as
    proof. Only photos you select are used. No bulk library scan.

NSPhotoLibraryAddUsageDescription
VI: Muôn Nơi có thể lưu ảnh proof bạn chụp vào thư viện máy để bạn giữ lại.
EN: Muôn Nơi can save proof photos you capture to your photo library.

NSUserNotificationsUsageDescription
VI: Bật thông báo để nhận nhắc quest, tin từ host và cập nhật quan trọng.
    Tối đa 1 push/ngày, không tin spam, có thể tắt từng loại trong cài đặt.
EN: Enable notifications to receive quest reminders, host messages, and
    important updates. Max 1 push/day, no spam, granular toggles in
    settings.

NSFaceIDUsageDescription
VI: Dùng Face ID để đăng nhập nhanh, an toàn hơn nhập mật khẩu. Mẫu Face ID
    chỉ lưu trên thiết bị của bạn, không gửi về Muôn Nơi.
EN: Use Face ID for quick, safer login than password. Face ID template
    stays on your device only, never sent to Muôn Nơi.
```

### 10.2 Android `strings.xml`

```xml
<string name="permission_camera_rationale">Muôn Nơi cần truy cập camera để bạn chụp proof hoàn thành quest.</string>
<string name="permission_location_rationale">Muôn Nơi cần vị trí để xác minh proof và gợi ý quest gần bạn. Chỉ khi app đang mở.</string>
<string name="permission_notifications_rationale">Bật thông báo để nhận nhắc quest và tin từ host.</string>
<string name="permission_storage_rationale">Cần truy cập ảnh để bạn chọn ảnh làm proof.</string>
<string name="permission_biometric_rationale">Dùng vân tay/khuôn mặt để đăng nhập nhanh, an toàn hơn.</string>
```

---

## 11. Third-party SDKs audit

### 11.1 Allowed list (audited)

| SDK | Purpose | Configuration | Telemetry posture |
|---|---|---|---|
| Expo SDK (expo-camera, expo-location, expo-image-picker, expo-notifications, expo-local-authentication, expo-file-system, expo-network) | Native module wrappers | Open source, no remote endpoints | NO telemetry |
| React Native core | App framework | Open source | NO telemetry |
| React Navigation | Navigation | In-memory only | NO telemetry |
| React Query / TanStack Query | Data fetching state | In-memory only, không call external | NO telemetry |
| Sentry React Native | Crash reporting | beforeSend PII scrubber, EU region, 90d retention, breadcrumbs filtered | Crash-only, no transactions, no replay |
| Stripe React Native SDK | Payment processing | Isolated to /payment screen, no global init | Stripe's own telemetry (acceptable scope) |
| Expo Notifications | Push handling | Token routed via Expo Push → APNs/FCM | Push delivery only |
| `react-native-mmkv` | Local storage | On-device only | NO telemetry |
| `react-native-keychain` | Secrets storage | OS-managed | NO telemetry |

### 11.2 Banned list (with reason)

| SDK | Reason banned |
|---|---|
| Firebase Analytics | Cross-app behavior tracking. Violates principle #2. |
| Google Analytics (mobile) | Same as above. Replaced server-side. |
| Mixpanel | Behavioral profiling SDK. Opt-out by design even if "anonymous". |
| Amplitude | Same as Mixpanel. |
| AppsFlyer | Advertising attribution. Triggers ATT requirement. |
| Adjust | Same as AppsFlyer. |
| Branch | Deep link attribution với cross-app fingerprinting. Use system universal links instead. |
| Crashlytics | Google ownership pulls Firebase dependency. Sentry preferred. |
| Facebook SDK | Cross-app tracking, ATT trigger. |
| TikTok SDK | N/A — không cần. |
| Singular, Kochava, Tenjin | Advertising attribution category. |
| OneSignal | Push provider có analytics embedded. Use Expo Push instead. |
| Bugsnag | Acceptable alternative to Sentry, but we standardize on Sentry. |
| Segment | Customer data platform — by design collects everything. |
| Datadog RUM mobile | Has session replay; over-collects. |
| New Relic mobile | Same as Datadog. |
| LogRocket / FullStory mobile | Session replay = video of user session. Hard NO. |

**Build-time enforcement:** CI script grep `package.json` against banned list, fail PR if match.

---

## 12. Build-time exclusions

### 12.1 iOS

- **Skip AdSupport.framework:** không import `import AdSupport`, không link `AdSupport.framework` trong Build Phases.
- **Skip AppTrackingTransparency framework:** không import. Without import, OS không trigger ATT prompt — even with no code calling it.
- **`Info.plist` flags:**
  - `NSAllowsArbitraryLoads = false` (ATS enabled).
  - `NSAllowsLocalNetworking = false`.
  - Cert pinning for `*.muonnoi.org` via `NSAppTransportSecurity.NSPinnedDomains`.

### 12.2 Android

- **Google Advertising ID opt-out:** trong `build.gradle`:
  ```gradle
  defaultConfig {
      manifestPlaceholders = [
          'gms_ads_app_id': '',
          'firebase_analytics_collection_enabled': 'false',
          'firebase_crashlytics_collection_enabled': 'false',
          'firebase_performance_collection_enabled': 'false'
      ]
  }
  ```
- **`AndroidManifest.xml` meta-data:**
  ```xml
  <meta-data android:name="firebase_analytics_collection_enabled" android:value="false" />
  <meta-data android:name="firebase_crashlytics_collection_enabled" android:value="false" />
  <meta-data android:name="firebase_performance_collection_enabled" android:value="false" />
  <meta-data android:name="google_analytics_adid_collection_enabled" android:value="false" />
  <meta-data android:name="google_analytics_ssaid_collection_enabled" android:value="false" />
  ```
- **Remove ad permissions:** đảm bảo manifest KHÔNG có `com.google.android.gms.permission.AD_ID`. Target SDK 33+ phải khai báo explicit không dùng.
  ```xml
  <uses-permission android:name="com.google.android.gms.permission.AD_ID" tools:node="remove" />
  ```

### 12.3 CI verification

Trong pipeline, sau `expo prebuild`:
```bash
# Block submission if any banned reference appears
grep -ri "AdSupport\|AppTrackingTransparency\|advertisingIdentifier" ios/ && exit 1
grep -ri "com.google.android.gms.permission.AD_ID" android/ | grep -v "tools:node=\"remove\"" && exit 1
grep -i "firebase_analytics_collection_enabled.*true" android/app/src/main/AndroidManifest.xml && exit 1
```

---

## 13. Privacy policy pages required

### 13.1 Pages to publish on muonnoi.org

| URL | Content | Languages |
|---|---|---|
| /legal/mobile-privacy | Full mobile privacy policy. Mirror nội dung doc này nhưng user-facing tone. | VI + EN |
| /legal/mobile-terms | Terms of Service mobile-specific. | VI + EN |
| /legal/data-deletion | Standalone page describing how to delete account in-app + email channel. | VI + EN |
| /legal/cookies | Minimal cookie policy (web has minimal essential cookies only). | VI + EN |
| /legal/transparency | Annual transparency report (government request stats, takedowns, etc.). | VI + EN |
| /legal/changes | Changelog of privacy policy versions với dates. | VI + EN |

### 13.2 URLs submitted to stores

- **App Store Connect Privacy Policy URL:** https://muonnoi.org/legal/mobile-privacy
- **App Store EULA URL:** https://muonnoi.org/legal/mobile-terms (override default Apple EULA)
- **Play Store Data Safety Privacy Policy URL:** https://muonnoi.org/legal/mobile-privacy
- **Play Store Account deletion URL:** https://muonnoi.org/legal/data-deletion (required by Play Console policy effective 2023+)

### 13.3 In-app privacy surfaces

- Onboarding: "By signing up you agree to [Terms] and [Privacy Policy]" — both links opening in-app web view.
- Settings → Privacy: link to all 4 legal pages.
- Pre-permission modals: link "Vì sao Muôn Nơi cần quyền này?" → relevant section of privacy policy.

---

## 14. Submission gotchas

### 14.1 iOS rejection risks + mitigations

| Risk | Likelihood | Mitigation |
|---|---|---|
| Permission strings too vague | HIGH | Use bilingual detailed strings from §10. |
| IDFA collection accidental (third-party SDK pulls AdSupport) | MEDIUM | Build-time grep CI check (§12.3). Bundle analyzer audit before submit. |
| Login wall before showing value | MEDIUM | Onboarding lets user browse quest list (public) before sign-up. Sign-up required only at "Accept quest". |
| Privacy declaration mismatch with actual behavior | HIGH (if not careful) | Pre-submit audit checklist: walk through App Privacy form vs. actual permissions in code. Run Privacy Manifest validation (Xcode 15+). |
| Sign in with Apple missing (when other 3rd party login present) | MEDIUM | MVP only has email login, no 3rd party — auto compliant. When add Google Sign-In, MUST add Sign in with Apple equivalently. |
| Push token without permission flow | LOW | expo-notifications enforces. |
| Crash on launch | HIGH | Test on minimum supported iOS (16.0) physical device before submit. |
| Privacy Manifest (PrivacyInfo.xcprivacy) missing required reason API declarations | MEDIUM | Generate via Expo, audit any required reason API usage (file timestamp, UserDefaults, system boot time, disk space) — declare reason codes. |
| In-app purchase via Stripe instead of Apple IAP | HIGH if misused | Stripe ONLY for physical-world quest fees and host payouts (real-world goods/services, exempt from IAP rule 3.1.1). NO digital content unlocks via Stripe. |

### 14.2 Play Store rejection risks + mitigations

| Risk | Likelihood | Mitigation |
|---|---|---|
| Sensitive permission justification missing (location) | HIGH | Permission Declaration form filled with detailed use case + screencast. |
| Data Safety form incomplete | HIGH | Use §4.1 as canonical source. Re-audit before each submit. |
| Misleading description | MEDIUM | App description matches in-app behavior exactly. |
| Target API level too low | LOW | Always target latest stable (SDK 35 as of submission date). |
| Account deletion not provided in-app | HIGH | §6.2 implemented. |
| Banned content (gambling, alcohol, etc.) | LOW | Muôn Nơi quest content moderated, no such category. |
| Crashing on Android Go / low-RAM | MEDIUM | Test on emulator 2GB RAM before submit. |
| Foreground service without justification | N/A | We don't use foreground services. |
| Background location request (ACCESS_BACKGROUND_LOCATION) | N/A | Not requested by design. |

---

## 15. Annual review schedule

| Cadence | Activity | Owner |
|---|---|---|
| Quarterly | Third-party SDK audit (check for new SDK additions, version updates, telemetry changes) | Mobile lead + Privacy officer |
| Quarterly | Banned-list grep CI verification audit | DevOps |
| Annually | Privacy policy refresh (regulatory changes, new features) | Privacy officer + Legal |
| Annually | Data inventory walkthrough (line-by-line confirm what app collects) | Mobile lead |
| Per major release | Data inventory delta update | PR author + reviewer |
| Per regulation change | Impact assessment (e.g., new Vietnam decree, EU AI Act mobile clauses) | DPO |
| Per incident | Post-mortem with privacy lens | Incident commander |

---

## 16. Incident response

Theo Decree 53 Art. 26 (within 24h) và GDPR Art. 33 (within 72h):

### 16.1 Breach notification flow

```
T+0h    Discovery (auto-alert hoặc manual report)
        ↓
T+1h    DPO notified via dpo@muonnoi.org + phone escalation
        ↓
T+4h    Internal assessment kickoff
        - Scope: bao nhiêu user affected?
        - Data type: PII? credential? content?
        - Vector: SQL injection? leaked secret? insider?
        - Containment: revoke tokens, rotate secrets, patch
        ↓
T+24h   Vietnam authority notified (if Vietnam user data affected) per Decree 53
        - Submit incident report to Cybersecurity Department, Ministry of Public Security
        ↓
T+72h   EU authority notified (if EU user data affected) per GDPR Art. 33
        - Submit to lead supervisory authority (TBD)
        ↓
T+72h   Affected users notified (per GDPR Art. 34 if high risk)
        - Email + in-app banner
        - Include: nature of breach, data categories, likely consequences, mitigation steps user should take
        ↓
T+7d    Post-mortem published internally
        ↓
T+30d   Public transparency report updated
```

### 16.2 Contact directory

- **DPO:** dpo@muonnoi.org (24/7 mailbox monitoring during incidents)
- **Security:** security@muonnoi.org (PGP key on /legal/security)
- **Vietnam CERT:** vncert@cert.vn (per official protocol)
- **GDPR lead supervisory:** TBD upon EU establishment

### 16.3 Vendor escalation matrix

| Vendor | What to escalate | Channel |
|---|---|---|
| Cloudflare | D1/R2 data leak suspicion | Enterprise support ticket + Trust portal |
| Sentry | PII appearing in error reports | Direct DPO contact + immediate purge request |
| Stripe | Payment fraud / leak | Stripe security@ + dashboard |
| Twilio | OTP delivery anomaly | Support + investigation API |
| Apple | Account compromise mass | App Review Board |
| Google Play | Account compromise mass | Play Console abuse form |

---

## 17. Sign-off checklist before each store submission

Pre-submission gate, all must check YES:

- [ ] §3.1 App Privacy form in App Store Connect matches §3.1 of this doc exactly.
- [ ] §4.1 Data Safety form in Play Console matches §4.1 of this doc exactly.
- [ ] §10 permission strings (VI + EN) in Info.plist verified.
- [ ] §12 build-time CI grep checks all passed in latest pipeline.
- [ ] No new SDK added since last submission without privacy review.
- [ ] /legal/mobile-privacy reflects current data inventory (cross-check §2).
- [ ] Account deletion in-app tested end-to-end (Settings → Delete → 30d grace).
- [ ] Data export request tested (POST /api/privacy/export-request → email arrival within 30d).
- [ ] All permission rationale modals (§9) tested on iOS + Android.
- [ ] App reviewer notes (App Store Connect) updated with §5.2 tracking justification.
- [ ] Decree 53 hosting region documented (§7.1 evidence captured).
- [ ] DPO signed off.

---

## 18. Glossary

- **ATT:** App Tracking Transparency. Apple framework requiring permission prompt for cross-app tracking.
- **IDFA:** Identifier for Advertisers (Apple). 64-bit UUID per device for ad targeting. We don't collect.
- **AAID:** Android Advertising ID (Google). Equivalent of IDFA. We don't collect.
- **PII:** Personally Identifiable Information.
- **DPO:** Data Protection Officer (GDPR role).
- **KYC:** Know Your Customer. Identity verification tier system.
- **Decree 53:** Vietnam Decree 53/2022/ND-CP on personal data protection.
- **GDPR-K:** GDPR for minors (Art. 8 derived rules).
- **CSAM:** Child Sexual Abuse Material.
- **FCM / APNs:** Firebase Cloud Messaging / Apple Push Notification service.

---

**End of document.** Mọi thay đổi PHẢI có PR review từ DPO + Mobile Lead + Legal counsel. Version current: 2026-05-12.
