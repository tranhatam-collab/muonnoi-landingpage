# Mobile API Endpoints — Muôn Nơi
**Document**: `MOBILE_API_ENDPOINTS_MUONNOI_2026-05-12`
**Source plan**: `MUONNOI_MOBILE_APP_PLAN_2026-05-12.md`
**Backend base**: `https://api.muonnoi.org`
**Stack**: Cloudflare Workers + D1 + R2
**Phiên bản**: v1.0
**Ngày phát hành**: 2026-05-12
**Trạng thái**: READY FOR MOBILE TEAM HANDOFF
**Audience**: Mobile team (RN + Expo) + Backend team (Cloudflare Workers)

> Tài liệu này định nghĩa contract giữa mobile app Muôn Nơi (React Native + Expo, stable latest) và backend `api.muonnoi.org`. Mọi endpoint mới triển khai cho mobile phải tuân nguyên tắc tại §1 (Conventions) và §15 (Mobile-specific limits). Endpoint đã tồn tại cho web app dùng chung được liệt kê lại với chú thích mobile-specific behavior.

---

## 1. Conventions

### 1.1 Base URL

```
Production:    https://api.muonnoi.org
Staging:       https://api-staging.muonnoi.org
Preview (EAS): https://api-preview.muonnoi.org
```

Mobile app KHÔNG được hardcode IP. Mọi build trỏ tới domain qua `EXPO_PUBLIC_API_BASE`.

### 1.2 Required headers cho mọi mobile request

| Header | Value | Bắt buộc | Ghi chú |
|---|---|---|---|
| `Authorization` | `Bearer <jwt>` | Yes (trừ auth endpoints) | JWT từ secure storage |
| `X-Client` | `muonnoi-mobile` | Yes | Phân biệt với `muonnoi-web` |
| `X-Client-Version` | `1.0.0 (build 123)` | Yes | Dùng cho min-version gate |
| `X-Platform` | `ios` \| `android` | Yes | Khác build behavior |
| `X-Locale` | `vi` \| `en` | Yes | Mặc định `vi` |
| `X-Network-Type` | `wifi` \| `cellular` \| `unknown` | Optional | Informational, log only |
| `Idempotency-Key` | UUID v4 | Yes cho POST mutating | Window 24h, xem §15 |
| `Content-Type` | `application/json; charset=utf-8` | Yes cho body | UTF-8 cho dấu tiếng Việt |
| `Accept-Language` | mirror `X-Locale` | Optional | Có thể bỏ |

### 1.3 Response envelope

Mọi response (kể cả error) đều theo envelope thống nhất:

```json
{
  "ok": true,
  "data": { /* payload */ },
  "error": null,
  "meta": {
    "request_id": "01HZX...",
    "server_time": "2026-05-12T07:23:44.118Z",
    "rate_limit_remaining": 58
  }
}
```

Khi error:

```json
{
  "ok": false,
  "data": null,
  "error": {
    "code": "VALIDATION",
    "message": "reflection_text vượt quá 2000 ký tự",
    "field": "reflection_text",
    "details": { "max": 2000, "actual": 2147 }
  },
  "meta": { "request_id": "01HZX...", "server_time": "..." }
}
```

### 1.4 HTTP status codes

| Status | Khi nào |
|---|---|
| 200 | GET / mutation thành công có body |
| 201 | Tạo mới resource |
| 204 | Mutation thành công không body (logout, mark-read) |
| 400 | Bad request — payload không đúng format JSON |
| 401 | `AUTH_REQUIRED` / `AUTH_EXPIRED` / `AUTH_INVALID` |
| 403 | `FORBIDDEN` — token hợp lệ nhưng không đủ quyền |
| 404 | `NOT_FOUND` |
| 409 | `CONFLICT` — duplicate `Idempotency-Key` hoặc state conflict |
| 410 | `GONE` — resource bị xoá vĩnh viễn |
| 422 | `VALIDATION` — payload đúng JSON nhưng sai schema |
| 429 | `RATE_LIMITED` — kèm `Retry-After` |
| 500 | `INTERNAL` |
| 503 | `OFFLINE_QUEUE` — server tạm không sync được |

### 1.5 Rate limit headers

Mọi response (kể cả 429) đều có:

```
X-RateLimit-Limit:     60
X-RateLimit-Remaining: 58
X-RateLimit-Reset:     1747038224
Retry-After:           12       (chỉ khi 429)
```

Mobile client phải đọc `Retry-After` để backoff. Sync queue dùng exponential backoff với base = `Retry-After`.

### 1.6 Idempotency

- POST mutating endpoint (submission, accept, abandon, presign, register…) BẮT BUỘC gửi `Idempotency-Key: <uuid-v4>`.
- Server lưu key + request hash trong D1 với TTL 24h.
- Lần gọi 2 với cùng key → trả response cache nguyên văn.
- Cùng key nhưng payload khác → 409 `IDEMPOTENCY_MISMATCH`.

### 1.7 Pagination

Cursor-based, không offset:

```
GET /api/quests?cursor=eyJpZCI6IjEyMyJ9&limit=20
```

Response:

```json
{
  "data": { "items": [...], "next_cursor": "eyJpZCI6IjE0MyJ9", "has_more": true },
  ...
}
```

`limit` mặc định 20, max 50 cho mobile (tiết kiệm băng thông).

### 1.8 Timestamp & money

- Mọi timestamp: ISO 8601 UTC, ví dụ `2026-05-12T07:23:44.118Z`.
- Mọi số tiền: số nguyên đồng (VND), trường tên ví dụ `fee` chứ không phải `fee_dong`. USD dùng cents.
- Không bao giờ là string, không bao giờ float.

### 1.9 Quy tắc khác

- Field optional default `null`, không bao giờ `undefined` hoặc thiếu key.
- Không PII trong URL path/query.
- File `object_key` của R2 dùng UUID v4, không bao giờ chứa tên user.

---

## 2. Auth & session

Mọi endpoint trong §2 KHÔNG yêu cầu `Authorization` header, ngoại trừ `/me`, `refresh`, `logout`, `biometric/*`.

### 2.1 `POST /api/auth/signup`

Tạo tài khoản mới. KYC tier 0 (chưa verify phone).

**Body:**
```json
{
  "email": "an@example.com",
  "phone": "+84901234567",
  "name": "Trần An",
  "locale": "vi",
  "accept_terms": true,
  "accept_privacy": true,
  "age_confirmed_13plus": true
}
```

**201 response:**
```json
{
  "ok": true,
  "data": {
    "user_id": "usr_01HZX...",
    "otp_sent_to": "phone",
    "otp_expires_at": "2026-05-12T07:33:44Z"
  }
}
```

**Errors:** `VALIDATION`, `EMAIL_TAKEN`, `PHONE_TAKEN`, `AGE_TOO_LOW`, `RATE_LIMITED`.

### 2.2 `POST /api/auth/login/email-otp`

Request OTP. Hỗ trợ email hoặc phone.

**Body:** `{ "identifier": "+84901234567", "channel": "sms" | "email" }`

**200 response:**
```json
{ "ok": true, "data": { "otp_id": "otp_...", "expires_at": "...", "resend_after": 60 } }
```

Server áp rate limit: tối đa 3 OTP / 5 phút / identifier.

### 2.3 `POST /api/auth/login/verify-otp`

Đổi OTP lấy session token.

**Body:** `{ "otp_id": "otp_...", "code": "123456", "device_id": "dev_..." }`

**200 response:**
```json
{
  "ok": true,
  "data": {
    "access_token": "eyJ...",
    "refresh_token": "rt_...",
    "expires_in": 2592000,
    "user": { /* User schema, §12 */ }
  }
}
```

**Errors:** `OTP_INVALID`, `OTP_EXPIRED`, `OTP_ATTEMPTS_EXCEEDED` (>5 lần sai).

### 2.4 `POST /api/auth/login/sso-token`

QR scan / magic link exchange. Web tạo one-time SSO token tại `identity.muonnoi.org`, app exchange lấy session.

**Body:** `{ "sso_token": "sso_one_time_...", "device_id": "dev_..." }`

**200 response:** Giống §2.3.

**Errors:** `SSO_TOKEN_INVALID`, `SSO_TOKEN_EXPIRED` (TTL 5 phút), `SSO_TOKEN_CONSUMED`.

### 2.5 `POST /api/auth/refresh`

**Body:** `{ "refresh_token": "rt_..." }` — KHÔNG cần Authorization header.

**200 response:**
```json
{ "ok": true, "data": { "access_token": "eyJ...", "expires_in": 2592000 } }
```

Refresh token rotate khi còn < 5 ngày tới expiry.

### 2.6 `POST /api/auth/logout`

Authorization required. Body có thể rỗng.

**204** — server revoke token + secure storage client tự clear.

### 2.7 `GET /api/auth/me`

Trả về User schema hiện tại. Mobile dùng để hydrate Zustand store khi cold start.

### 2.8 Biometric (Phase 1.5)

Three-step Web-Authentication-style flow. Public key stored server-side, private key trong Secure Enclave / Keystore.

#### `POST /api/auth/biometric/enable`

**Body:** `{ "device_id": "...", "public_key": "<base64 P-256 pubkey>", "key_alg": "ES256" }`

**201 response:** `{ "credential_id": "cred_..." }`

#### `POST /api/auth/biometric/challenge`

**Body:** `{ "credential_id": "cred_..." }`

**200 response:** `{ "challenge": "<base64 random 32 bytes>", "expires_at": "..." }`

#### `POST /api/auth/biometric/verify`

**Body:** `{ "credential_id": "cred_...", "challenge": "<echo>", "signature": "<base64>", "device_id": "..." }`

**200 response:** Giống §2.3 (cấp session mới).

**Errors:** `BIOMETRIC_INVALID_SIGNATURE`, `BIOMETRIC_CHALLENGE_EXPIRED`, `BIOMETRIC_REVOKED`.

---

## 3. Mobile device

### 3.1 `POST /api/mobile/device/register`

Gọi sau khi login + sau khi user grant push permission.

**Body:**
```json
{
  "device_id": "dev_01HZX...",
  "push_token": "ExponentPushToken[xxx]",
  "platform": "ios",
  "app_version": "1.0.0",
  "build_number": 123,
  "os_version": "iOS 18.4",
  "model": "iPhone15,3",
  "locale": "vi",
  "timezone": "Asia/Ho_Chi_Minh"
}
```

**201 response:** `{ "device_id": "dev_..." }`

Idempotent theo `device_id` — gọi lại update push_token.

### 3.2 `POST /api/mobile/device/unregister`

**Body:** `{ "device_id": "..." }` — 204.

### 3.3 `GET /api/mobile/feature-flags`

Trả về flags cho build hiện tại (theo `X-Client-Version`):

```json
{
  "data": {
    "flags": {
      "biometric_login": true,
      "host_chat": false,
      "receipt_vc_export": false,
      "wallet_view": false,
      "min_supported_version": "1.0.0",
      "force_update_below": "0.9.0"
    },
    "ttl_seconds": 3600
  }
}
```

Mobile cache 1h, refetch khi app foreground sau > 1h offline.

### 3.4 `GET /api/mobile/sync/status`

```json
{
  "data": {
    "server_time": "2026-05-12T07:23:44.118Z",
    "last_sync_at": "2026-05-12T06:50:11Z",
    "pending_server_jobs": 0,
    "r2_uploads_healthy": true
  }
}
```

Mobile gọi trước khi flush sync queue để biết server healthy.

### 3.5 `GET /api/mobile/announce`

Trả về banner copy tuỳ chọn ở top app. Trả `null` nếu không có announcement.

```json
{
  "data": {
    "announcement": {
      "id": "ann_...",
      "kind": "info" | "warning" | "celebration",
      "title_vi": "Đà Lạt đang mưa lớn",
      "body_vi": "Một số quest ngoài trời tạm ngừng.",
      "title_en": "...",
      "body_en": "...",
      "deep_link": "muonnoi://quests?filter=indoor",
      "expires_at": "2026-05-13T00:00Z",
      "dismissible": true
    }
  }
}
```

---

## 4. Quests

### 4.1 `GET /api/quests`

Query: `category`, `status`, `city`, `cursor`, `limit`.

```
GET /api/quests?category=travel&city=dalat&status=open&limit=20
```

**200 response:**
```json
{
  "data": {
    "items": [ /* Quest schema, §12 */ ],
    "next_cursor": "...",
    "has_more": true
  }
}
```

Mobile cache 24h (TanStack Query persist).

### 4.2 `GET /api/quests/{id}`

Full quest detail, kèm host card lite + 5 receipt gần nhất public.

**404** nếu quest không tồn tại. **410** nếu quest bị retired vĩnh viễn — app remove khỏi cache.

### 4.3 `GET /api/mobile/quests/nearby`

Geo search, dùng GPS hiện tại.

```
GET /api/mobile/quests/nearby?lat=11.94&lng=108.43&radius=5000&limit=20
```

`radius` đơn vị mét, max 50000. Server bound box query, ranking bằng Haversine + popularity.

**200 response:** Giống §4.1 nhưng mỗi item có thêm `distance_m`.

### 4.4 `POST /api/quests/{id}/accept`

Mobile gọi khi user nhấn "Nhận quest". Idempotency-Key required.

**Body:** `{ "scheduled_at": "2026-05-13T08:00Z" }` (optional)

**201 response:** `{ "acceptance_id": "acc_...", "accepted_at": "...", "expires_at": "..." }`

**Errors:** `QUEST_FULL` (409), `QUEST_CLOSED` (409), `ALREADY_ACCEPTED` (409).

### 4.5 `POST /api/quests/{id}/abandon`

**Body:** `{ "acceptance_id": "acc_...", "reason": "weather" }`

**204.**

---

## 5. Proofs & submissions

> Đây là flow QUAN TRỌNG NHẤT của mobile MVP. Xem chi tiết sync logic trong `MOBILE_OFFLINE_SYNC_PROTOCOL_2026-05-12.md`.

### 5.1 `POST /api/proofs/presign`

Cấp batch presigned URL cho R2 upload trực tiếp (không qua Worker).

**Body:**
```json
{
  "items": [
    {
      "client_id": "ph_a1b2c3d4",
      "content_type": "image/jpeg",
      "size_bytes": 2456789,
      "hash_sha256": "abc123..."
    },
    { /* up to 6 items */ }
  ]
}
```

**201 response:**
```json
{
  "data": {
    "items": [
      {
        "client_id": "ph_a1b2c3d4",
        "upload_url": "https://r2.muonnoi.org/uploads/...?X-Amz-...",
        "object_key": "proofs/2026/05/12/usr_.../uuid.jpg",
        "expires_at": "2026-05-12T08:23:44Z",
        "max_size_bytes": 10485760
      }
    ]
  }
}
```

URL TTL 1 giờ. Mobile upload trực tiếp bằng `PUT` đến `upload_url`, body là binary, header `Content-Type` + `Content-Length` đúng như đã khai báo.

**Errors:** `VALIDATION` (size > 10MB, content_type không phải image/jpeg|png|heic), `BATCH_TOO_LARGE` (>6 items).

### 5.2 `POST /api/submissions`

Submit metadata của proof sau khi upload R2 xong.

**Body:**
```json
{
  "quest_id": "qst_...",
  "acceptance_id": "acc_...",
  "client_id": "sub_uuid_v4_from_mobile",
  "photos": [
    { "object_key": "proofs/...", "captured_at": "2026-05-12T07:10Z", "exif_hash": "..." }
  ],
  "gps": {
    "lat": 11.9421,
    "lng": 108.4376,
    "accuracy_m": 12.4,
    "captured_at": "2026-05-12T07:10:33Z",
    "source": "device_gps"
  },
  "reflection_text": "Mình đã gặp cô Hoa…",
  "host_signature_qr": "msig_...",
  "client_captured_offline": true,
  "client_offline_duration_s": 1842
}
```

**Headers:** `Idempotency-Key` = `client_id` (BẮT BUỘC khớp).

**201 response:**
```json
{
  "data": {
    "submission_id": "sub_...",
    "status": "pending",
    "submitted_at": "2026-05-12T07:24:01Z",
    "estimated_review_at": "2026-05-13T07:24:01Z"
  }
}
```

**Errors:**
- 422 `VALIDATION`: thiếu field, reflection > 2000 ký tự, > 6 photos.
- 409 `IDEMPOTENCY_MISMATCH`: client_id đã dùng với payload khác.
- 409 `ACCEPTANCE_EXPIRED`
- 410 `QUEST_GONE`
- 503 `OFFLINE_QUEUE`: server bận, mobile retry sau `Retry-After`.

### 5.3 `GET /api/submissions/{id}`

Trả về Submission schema (§12) + receipt khi đã approved.

### 5.4 `GET /api/submissions?mine=true`

List submissions của user, cursor-pagination.

Query: `status=pending|approved|rejected|appealed`, `quest_id=`, `cursor=`, `limit=`.

### 5.5 `POST /api/mobile/proofs/upload-batch`

Confirm batch upload R2 đã hoàn tất. Gọi SAU `/proofs/presign` + PUT R2, TRƯỚC `/submissions`.

Mục đích: server verify từng object key tồn tại trong R2, hash khớp, để mobile biết có thể tiến tới submission hay phải re-upload.

**Body:**
```json
{
  "items": [
    { "client_id": "ph_a1b2c3d4", "object_key": "proofs/...", "uploaded_at": "..." }
  ]
}
```

**200 response:**
```json
{
  "data": {
    "items": [
      { "client_id": "ph_a1b2c3d4", "ok": true, "server_hash": "abc...", "size_bytes": 2456789 },
      { "client_id": "ph_b...", "ok": false, "error": "HASH_MISMATCH" }
    ]
  }
}
```

Mobile re-upload các item `ok: false` trước khi gọi `/submissions`.

---

## 6. Hosts

### 6.1 `GET /api/hosts/{id}`

Trả về Host schema: id, name, avatar, bio_vi/en, verification_tier, location, languages, quests_count, trust_score_public, joined_at.

### 6.2 `GET /api/hosts/{id}/quests`

List quests của host này, cursor-pagination, query `status=`.

### 6.3 `POST /api/hosts/{id}/message` (V1+)

> Disabled trong MVP. Trả 403 `FEATURE_NOT_AVAILABLE` cho đến V1.

**Body:** `{ "quest_id": "...", "text": "Mai mình tới được không?", "client_id": "msg_uuid" }`

---

## 7. Profile & trust

### 7.1 `GET /api/profile/{handle}`

Public profile theo handle. Trả về subset của User (không có email/phone).

### 7.2 `PATCH /api/profile/me`

Authorization required.

**Body (partial):**
```json
{ "name": "Trần An", "bio_vi": "...", "avatar_object_key": "avatars/...", "locale": "vi" }
```

`avatar_object_key` lấy từ presign flow (kênh riêng `POST /api/proofs/presign` với `purpose: "avatar"`).

### 7.3 `GET /api/profile/me/trust`

```json
{
  "data": {
    "trust_score": 142,
    "tier": "explorer",
    "next_tier_at": 200,
    "kyc_tier": 1,
    "milestones_unlocked": ["first_quest", "first_host_meet"],
    "calculated_at": "..."
  }
}
```

Mobile cache 1h (swr).

### 7.4 `GET /api/profile/me/receipts`

List receipts của user, cursor-pagination.

### 7.5 `GET /api/receipts/{id}`

Full Receipt schema (§12).

### 7.6 `GET /api/receipts/{id}/export` (V2)

Trả Verifiable Credential (W3C VC, JSON-LD). MVP trả 403 `FEATURE_NOT_AVAILABLE`.

---

## 8. Notifications

### 8.1 `POST /api/notifications/preferences`

**Body:**
```json
{
  "quest_reminder": true,
  "host_message": true,
  "submission_update": true,
  "trust_milestone": true,
  "receipt": true,
  "account_security": true
}
```

**204.** Server enforce 1 push/day cap bất kể setting (xem master plan §9.1).

### 8.2 `GET /api/notifications/inbox`

In-app inbox list, cursor-pagination.

```json
{
  "data": {
    "items": [
      {
        "id": "ntf_...",
        "type": "submission_update",
        "title_vi": "Proof của bạn đã được duyệt",
        "body_vi": "Quest Cô Hoa K'Ho được duyệt. Receipt đã sẵn sàng.",
        "deep_link": "muonnoi://receipt/rcp_...",
        "created_at": "...",
        "read_at": null,
        "data": { "submission_id": "sub_...", "receipt_id": "rcp_..." }
      }
    ],
    "next_cursor": "...",
    "has_more": false,
    "unread_count": 3
  }
}
```

### 8.3 `POST /api/notifications/mark-read`

**Body:** `{ "ids": ["ntf_...", "ntf_..."] }` hoặc `{ "all": true }`.

**204.**

---

## 9. Privacy & data

### 9.1 `POST /api/privacy/export-request`

Trigger 30-day email export. Yêu cầu biometric / OTP step-up (xem `MOBILE_PRIVACY_AND_STORE_COMPLIANCE_2026-05-12.md`).

**Body:** `{ "verify_token": "...", "format": "json" | "csv" }`

**202 response:** `{ "request_id": "exp_...", "estimated_email_at": "2026-06-11T..." }`

### 9.2 `POST /api/privacy/delete-account`

Soft delete, 30-day grace. Trong grace user có thể restore bằng login lại.

**Body:** `{ "verify_token": "...", "reason": "optional free text" }`

**202 response:** `{ "delete_at": "2026-06-11T...", "can_restore_until": "2026-06-11T..." }`

### 9.3 `GET /api/privacy/data-summary`

Trả tóm tắt data Muôn Nơi đang giữ về user:

```json
{
  "data": {
    "categories": [
      { "key": "account", "items": ["email", "phone (masked)", "name"] },
      { "key": "content", "items": ["12 submissions", "34 photos"] },
      { "key": "location", "items": ["89 GPS proof points"] },
      { "key": "device", "items": ["2 devices registered"] }
    ],
    "calculated_at": "..."
  }
}
```

Hiển thị trong Settings → Privacy.

---

## 10. Health & utility

### 10.1 `GET /api/health`

Basic, **không cần auth**. Trả 200 `{ "ok": true, "data": { "status": "ok", "version": "..." } }`. Mobile dùng để probe trước khi flush sync queue.

### 10.2 `GET /api/health/deep`

Internal, yêu cầu `X-Internal-Token`. Trả status từng dependency: D1, R2, queue, identity service. KHÔNG dùng từ mobile production.

### 10.3 `GET /api/mobile/announce`

Đã mô tả tại §3.5.

---

## 11. Webhook / outbound (server → mobile push)

### 11.1 Push payload schema chung

Mọi push payload (Expo / APNs / FCM) đều theo schema:

```json
{
  "type": "submission_update",
  "title": "Proof của bạn đã được duyệt",
  "body": "Quest Cô Hoa K'Ho được duyệt. Mở để xem receipt.",
  "deep_link": "muonnoi://receipt/rcp_01HZX...",
  "data": {
    "submission_id": "sub_...",
    "receipt_id": "rcp_...",
    "trust_delta": 5
  },
  "sound": "default" | null,
  "badge": 3,
  "priority": "high" | "normal",
  "ttl_seconds": 86400,
  "category_id": "submission_update"
}
```

Mobile handler đọc `type`, route theo bảng sau.

### 11.2 Categories và behavior

| `type` | Title example | `deep_link` | Frequency |
|---|---|---|---|
| `quest_reminder` | "Quest Cô Hoa K'Ho lúc 8h sáng mai" | `muonnoi://quest/[id]` | 1× per quest, < 24h trước |
| `host_message` | "Cô Hoa nhắn bạn" | `muonnoi://host/[id]/chat` (V1+) | Per message |
| `submission_update` | "Proof đã duyệt" / "Cần bổ sung" | `muonnoi://receipt/[id]` hoặc `muonnoi://submission/[id]` | Per update |
| `trust_milestone` | "Bạn đạt Explorer 100" | `muonnoi://trust` | Per milestone |
| `receipt` | "Receipt sẵn sàng" | `muonnoi://receipt/[id]` | Per receipt |
| `account_security` | "Đăng nhập từ iPhone mới" | `muonnoi://settings/security` | Per event |

Server enforce **max 1 push / 24h / user** bất kể category, ngoại trừ `account_security` (luôn gửi).

---

## 12. Schemas

### 12.1 User

```json
{
  "id": "usr_01HZX...",
  "handle": "tranan",
  "name": "Trần An",
  "email": "an@example.com",
  "phone": "+84••••••567",
  "phone_verified": true,
  "avatar_url": "https://r2.muonnoi.org/avatars/...",
  "bio_vi": null,
  "bio_en": null,
  "trust_score": 142,
  "kyc_tier": 1,
  "locale": "vi",
  "joined_at": "2026-04-01T...",
  "created_at": "2026-04-01T...",
  "updated_at": "2026-05-10T..."
}
```

### 12.2 Quest

```json
{
  "id": "qst_01HZX...",
  "slug": "co-hoa-kho",
  "title_vi": "Một buổi sáng với cô Hoa K'Ho",
  "title_en": "A morning with Cô Hoa K'Ho",
  "summary_vi": "...",
  "summary_en": "...",
  "category": "travel",
  "subcategory": "local_host_meet",
  "host_id": "hst_...",
  "host": { "id": "hst_...", "name": "Cô Hoa", "avatar_url": "..." },
  "location": {
    "lat": 11.9421,
    "lng": 108.4376,
    "name": "Làng K'Ho, Đà Lạt",
    "city": "dalat",
    "country": "VN"
  },
  "schedule": {
    "start": "2026-05-13T07:00Z",
    "end": "2026-05-13T11:00Z",
    "recurring": "weekly",
    "timezone": "Asia/Ho_Chi_Minh"
  },
  "status": "open",
  "capacity": 4,
  "accepted_count": 2,
  "currency": "VND",
  "fee": 250000,
  "duration_minutes": 240,
  "languages": ["vi", "en"],
  "tags": ["culture", "coffee", "ethnic_minority"],
  "cover_image_url": "...",
  "created_at": "...",
  "updated_at": "..."
}
```

### 12.3 Submission

```json
{
  "id": "sub_01HZX...",
  "client_id": "sub_uuid_v4_from_mobile",
  "quest_id": "qst_...",
  "user_id": "usr_...",
  "acceptance_id": "acc_...",
  "photos": [
    { "object_key": "proofs/...", "url": "https://r2...", "captured_at": "..." }
  ],
  "gps": { "lat": 11.94, "lng": 108.43, "accuracy_m": 12.4, "captured_at": "..." },
  "reflection_text": "...",
  "host_signature_qr": "msig_...",
  "status": "pending",
  "submitted_at": "...",
  "reviewed_at": null,
  "reviewer_note_vi": null,
  "client_captured_offline": true,
  "idempotency_key": "uuid",
  "server_dedup_hash": "sha256:..."
}
```

### 12.4 Receipt

```json
{
  "id": "rcp_01HZX...",
  "submission_id": "sub_...",
  "user_id": "usr_...",
  "quest_id": "qst_...",
  "host_id": "hst_...",
  "trust_delta": 5,
  "xp_delta": 30,
  "issued_at": "...",
  "hash": "sha256:abcdef...",
  "viewable_url": "https://muonnoi.org/receipt/rcp_...",
  "vc_payload": null
}
```

### 12.5 Push (xem §11.1)

---

## 13. Errors

| Code | HTTP | Meaning |
|---|---|---|
| `AUTH_REQUIRED` | 401 | Không có Authorization header |
| `AUTH_EXPIRED` | 401 | Access token hết hạn, dùng refresh |
| `AUTH_INVALID` | 401 | Token sai format / signature |
| `FORBIDDEN` | 403 | Không đủ quyền |
| `FEATURE_NOT_AVAILABLE` | 403 | Feature flag tắt cho build này |
| `NOT_FOUND` | 404 | Resource không tồn tại |
| `GONE` | 410 | Resource đã bị xoá vĩnh viễn |
| `VALIDATION` | 422 | Payload sai schema |
| `CONFLICT` | 409 | State conflict generic |
| `IDEMPOTENCY_MISMATCH` | 409 | Cùng Idempotency-Key, khác payload |
| `ALREADY_ACCEPTED` | 409 | Quest đã accept rồi |
| `QUEST_FULL` | 409 | Hết slot |
| `QUEST_CLOSED` | 409 | Quest không nhận thêm |
| `ACCEPTANCE_EXPIRED` | 409 | Acceptance đã hết hạn |
| `BATCH_TOO_LARGE` | 422 | > 6 photos / submission |
| `HASH_MISMATCH` | 422 | Server hash khác client hash |
| `OTP_INVALID` | 422 | OTP sai |
| `OTP_EXPIRED` | 410 | OTP hết hạn |
| `OTP_ATTEMPTS_EXCEEDED` | 429 | >5 lần sai |
| `SSO_TOKEN_EXPIRED` | 410 | SSO token quá 5 phút |
| `SSO_TOKEN_CONSUMED` | 409 | One-time đã dùng |
| `BIOMETRIC_INVALID_SIGNATURE` | 401 | Signature không khớp pubkey |
| `BIOMETRIC_CHALLENGE_EXPIRED` | 410 | Challenge hết TTL |
| `RATE_LIMITED` | 429 | Vượt rate limit |
| `OFFLINE_QUEUE` | 503 | Server tạm không sync được, retry sau Retry-After |
| `INTERNAL` | 500 | Bug server-side |

Mobile sync engine xử lý các code sau như "retryable": `RATE_LIMITED`, `OFFLINE_QUEUE`, `INTERNAL`, network error. Các code khác là "terminal", surface lỗi cho user.

---

## 14. Versioning

### 14.1 URL strategy

- Hiện tại: `/api/...` (v1 implicit).
- Khi có breaking change: mở namespace `/api/v2/...` chạy song song 6 tháng.
- Mobile build cũ vẫn dùng `/api/...` cho đến khi force update.

### 14.2 Deprecation header

Khi endpoint sắp deprecate, response thêm:

```
X-API-Deprecation: 2026-12-31
X-API-Successor: /api/v2/quests
```

Mobile client log warning vào Sentry, không throw.

### 14.3 Min app version

`GET /api/mobile/feature-flags` trả về `min_supported_version` và `force_update_below`. Mobile:

- `current_version >= min_supported_version` → ok.
- `current_version < min_supported_version` → soft banner "có bản mới, vui lòng update".
- `current_version < force_update_below` → hard gate, không cho dùng app.

---

## 15. Mobile-specific limits

| Item | Limit |
|---|---|
| Photo size per file | 10 MB (10 485 760 bytes) |
| Photos per submission | 6 |
| Photo formats | `image/jpeg`, `image/png`, `image/heic` |
| Reflection text | 2000 ký tự |
| Idempotency key window | 24h |
| Presigned URL TTL | 1h |
| SSO one-time token TTL | 5 phút |
| OTP TTL | 10 phút |
| OTP request rate | 3 / 5 phút / identifier |
| Login attempts | 5 OTP fails → khoá 15 phút |
| Push max frequency | 1 / 24h / user (trừ account_security) |
| Pagination limit max | 50 |
| Nearby radius max | 50 km |
| Request body max | 1 MB (JSON, không tính R2 PUT) |
| Sync queue retry max | 3 attempts, exponential backoff base 2s |
| Feature flag cache | 1h |
| Trust score cache | 1h |
| Quest list cache | 24h |
| Quest detail cache | 7 days |

---

## 16. Quy ước triển khai

- **Idempotency là bắt buộc** cho mọi POST mutating. Mobile sinh UUID v4 ở client TRƯỚC khi gọi (lưu trong sync queue), gửi qua header và cũng đặt `client_id` trong body khi schema yêu cầu.
- **Mọi timestamp**: ISO 8601 UTC, suffix `Z`. KHÔNG dùng local timezone string.
- **Mọi số tiền**: integer VND. Web/mobile tự format hiển thị.
- **Pagination**: cursor-only. Mobile KHÔNG gửi `offset` hoặc `page`.
- **No PII in URLs**: handle là ok (user tự chọn), email/phone/name không bao giờ trong path/query.
- **Field optional default `null`**, không `undefined` không thiếu key. Mobile parse Zod schema strict.
- **Schema reference**: mọi response có nested object đều tham chiếu schema §12. Mobile sinh TypeScript type từ OpenAPI spec sẽ phát hành kèm tại `https://api.muonnoi.org/openapi.json`.

---

## 17. Files liên quan

```
MUONNOI_MOBILE_APP_PLAN_2026-05-12.md             Master plan
MOBILE_API_ENDPOINTS_MUONNOI_2026-05-12.md        ← Bản này
MOBILE_OFFLINE_SYNC_PROTOCOL_2026-05-12.md        Sync queue + idempotency chi tiết
MOBILE_PRIVACY_AND_STORE_COMPLIANCE_2026-05-12.md App Store + Play Store privacy
MOBILE_QA_AND_RELEASE_CHECKLIST_2026-05-12.md     QA matrix + release gates
```

---

**Document version**: v1.0
**Date**: 2026-05-12
**Status**: READY FOR MOBILE TEAM HANDOFF
**Owners**: Backend Lead (api.muonnoi.org) + Mobile Lead
**Predecessor**: none — đây là bản đầu tiên cho mobile contract.
