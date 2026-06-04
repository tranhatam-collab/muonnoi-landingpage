# Mobile Offline Sync Protocol — Muôn Nơi
**Document**: MOBILE_OFFLINE_SYNC_PROTOCOL_2026-05-12
**Source**: MUONNOI_MOBILE_APP_PLAN_2026-05-12.md (Section 8 — OFFLINE-FIRST)
**Owner**: Mobile Systems Engineer
**Status**: Draft v1 — chốt trước Sprint 03

---

## 1. Goals & non-goals

### 1.1 Goals
- **100% offline capability** cho ba flow trục: (1) duyệt quest đã cache, (2) draft proof (ảnh + GPS + text reflection), (3) đẩy submission vào queue. User ở vùng K'Ho hoặc đường mòn núi Đà Lạt phải có thể hoàn thành quest end-to-end mà không cần một byte mạng nào.
- **Zero silent data loss**: mọi mutation user thực hiện offline phải tồn tại sau force-quit, sau OS storage cleanup, sau đổi pin. Khi mạng trở lại, queue tự đồng bộ; nếu fail, user thấy rõ.
- **Idempotent server contract**: client retry vô số lần cũng không tạo bản ghi trùng.
- **Predictable UX**: user biết app đang offline, biết số mục đang chờ, biết khi nào sync xong.

### 1.2 Non-goals
- Collaborative editing offline (không có shared doc, không có CRDT).
- Real-time chat offline (host message chỉ queued one-way; không hiển thị "typing").
- Offline payment / checkout (booking payment yêu cầu online).
- Sync giữa nhiều thiết bị mà không qua server (no peer-to-peer).
- Sử dụng third-party sync SDK (no Firebase Firestore, no Realm Sync, no PowerSync). Tự kiểm soát toàn bộ pipeline.

---

## 2. Architecture overview

Stack 3 tầng, đọc top-down:

```
┌─────────────────────────────────────┐
│  UI layer (Expo Router screens)     │
│  - hooks: useQuests, useSubmit...   │
└──────────────┬──────────────────────┘
               │ React Query mutations + queries
┌──────────────▼──────────────────────┐
│  TanStack Query (server state)      │
│  - persistQueryClient on AsyncStor. │
│  - optimistic updates               │
└──────────────┬──────────────────────┘
               │ enqueue / dequeue
┌──────────────▼──────────────────────┐
│  Sync Queue Engine                  │
│  - SQLite-backed durable queue      │
│  - Background worker (JS thread)    │
│  - Retry + backoff + idempotency    │
└──────────────┬──────────────────────┘
               │ fetch with Idempotency-Key
┌──────────────▼──────────────────────┐
│  API client (Cloudflare Workers)    │
└─────────────────────────────────────┘
```

### 2.1 Persistent storage layout
| Concern | Tech | Where it lives |
|---|---|---|
| Sync queue rows | **expo-sqlite** | `db/sync.db`, table `sync_queue` |
| Cached server state (quest list, profiles) | **expo-sqlite** | `db/cache.db`, separate file để vacuum không khoá queue |
| Small key-value (last sync ts, feature flags) | **AsyncStorage** | namespaced `mn:meta:*` |
| Proof images, video clips | **expo-file-system** | `${documentDirectory}proofs/...` |
| Secrets (device key, auth token) | **expo-secure-store** | Keychain (iOS) / EncryptedSharedPreferences (Android) |

### 2.2 Network detection
- `expo-network` cho coarse state (online/offline, connection type).
- Custom `NetworkMonitor` wrapper trên `@react-native-community/netinfo` để phát hiện **captive portal** (kết nối có sóng nhưng không reach được `api.muonnoi.org`).
- Ping endpoint nhẹ `GET /api/mobile/ping` (200 OK, no body) chạy mỗi 30s khi app foreground để xác thực reachability thực tế trước khi đánh thức worker.

---

## 3. Data classification — cái gì cache, cache thế nào

| Data type | Classification | Storage layer | TTL | Invalidation | Conflict policy |
|---|---|---|---|---|---|
| Quest list (read-only) | Public catalog | SQLite `cache.db` | 24h | Server `ETag` + push topic `quests:updated` | Last-write-wins (server) |
| Quest detail | Public + media | SQLite + FileSystem (thumbnails) | 7 days | Per-quest `updated_at` | Last-write-wins |
| Host profile | Mostly static | SQLite | 30 days | Push topic `host:{id}:updated` | Last-write-wins |
| User profile (self) | Private, mutable | SWR with persistent fallback (SQLite) | Session, refresh on foreground | On profile mutation success | Per-field timestamp merge |
| Submissions (mine, pending) | Private, mutable | SQLite | **Never auto-expire** (giữ tới khi server xác nhận `completed`) | Queue completion handler | LWW; warn nếu server đã xử lý |
| Proof images | Private media | FileSystem | **Never auto-delete** until uploaded; after uploaded giữ 7 ngày để thumbnail | Hash confirm từ server | Hash mismatch → retry once |
| Receipts (đã issued) | Private, immutable | SQLite | Permanent (cho tới khi user xoá account) | Không bao giờ | Read-only |
| Trust score | Derived | SWR | 1h | Push topic `trust:updated` | LWW |
| Feature flags | Server config | AsyncStorage | 6h | Foreground refresh | Server wins |

**Quy tắc cache eviction**:
- Cache budget mặc định **50 MB** cho SQLite, **500 MB** cho FileSystem media.
- Vượt budget → LRU eviction trên `cache.db` (không bao giờ động vào `sync.db`).
- Mục đã uploaded thành công + > 7 ngày → xoá file gốc, giữ thumbnail 256px.

---

## 4. Sync queue schema

Bảng `sync_queue` trong `db/sync.db`:

```sql
CREATE TABLE sync_queue (
  id                TEXT PRIMARY KEY,         -- UUID v4, client-generated
  type              TEXT NOT NULL,            -- enum
  payload           BLOB NOT NULL,            -- AES-GCM ciphertext (JSON plaintext)
  payload_iv        BLOB NOT NULL,            -- 12-byte IV
  created_at        INTEGER NOT NULL,         -- epoch ms
  attempts          INTEGER NOT NULL DEFAULT 0,
  last_attempt_at   INTEGER,                  -- nullable
  next_attempt_at   INTEGER,                  -- nullable, scheduled retry time
  status            TEXT NOT NULL,            -- enum
  error_code        TEXT,                     -- e.g. "VALIDATION_422"
  error_message     TEXT,                     -- short, no PII
  idempotency_key   TEXT NOT NULL UNIQUE,     -- UUID v4, identical on retry
  depends_on        TEXT,                     -- JSON array of queue IDs
  schema_version    INTEGER NOT NULL DEFAULT 1
);
CREATE INDEX idx_status_next ON sync_queue(status, next_attempt_at);
CREATE INDEX idx_created ON sync_queue(created_at);
```

### 4.1 Enum: `type`
- `submission` — submit quest proof bundle
- `review` — user rate quest sau khi hoàn thành
- `proof_upload` — single media file upload (ảnh hoặc clip)
- `profile_update` — đổi tên, avatar, bio
- `host_message` — gửi tin nhắn tới host

### 4.2 Enum: `status`
`pending → uploading → syncing → completed`
nhánh lỗi: `failed`, `cancelled`

- `pending`: vừa enqueue, chưa thử
- `uploading`: đang upload media (chỉ áp dụng cho `proof_upload`)
- `syncing`: đang gọi API mutation
- `completed`: server đã xác nhận
- `failed`: vượt max attempts hoặc lỗi không retry được (422)
- `cancelled`: user huỷ thủ công

### 4.3 `depends_on` — ordering graph
Một submission gồm 3 ảnh proof phải có 3 `proof_upload` rows hoàn thành **trước**. Submission row có `depends_on = ["<uuid_proof_1>", "<uuid_proof_2>", "<uuid_proof_3>"]`. Worker skip submission cho tới khi tất cả dependencies ở `completed`. Đây là điểm khác biệt so với FIFO đơn thuần ở plan gốc — cho phép parallel upload media trong khi vẫn đảm bảo metadata submit cuối cùng.

---

## 5. Mutation lifecycle

Sequence diagram (text):

```
User taps "Submit proof"
   │
   ▼
useSubmitQuest hook
   ├─ Generate UUIDs: submission_id, idempotency_key, proof_ids[]
   ├─ Write optimistic submission into TanStack Query cache (status: "queued")
   ├─ Insert proof_upload rows (status: pending) — one per file
   ├─ Insert submission row (status: pending, depends_on: proof_ids)
   └─ Trigger worker.wake()
       │
       ▼
   Worker.tick()
   ┌─────────────────────────────────────────────┐
   │ 1. SELECT rows WHERE status='pending'        │
   │    AND (next_attempt_at IS NULL              │
   │         OR next_attempt_at <= now)           │
   │    ORDER BY created_at                       │
   │ 2. For each row, check depends_on resolved   │
   │ 3. Mark status=uploading/syncing             │
   │ 4. Call API with Idempotency-Key header      │
   │ 5. Branch on response code (see below)       │
   └─────────────────────────────────────────────┘
```

### 5.1 Response handling
| HTTP | Meaning | Action |
|---|---|---|
| 200 / 201 | Success | `status=completed`, refresh TanStack Query, fire toast |
| 202 | Accepted async | Keep `syncing`, schedule status poll in 10s |
| 409 Conflict | Duplicate idempotency key | Treat as success: `status=completed` (server already has it) |
| 422 Validation | Payload bad (e.g. quest expired) | `status=failed`, surface to user with edit/cancel CTA |
| 401 Unauthorized | Token expired | Refresh token, retry inline; if refresh fails → `status=failed`, route to login |
| 403 Forbidden | User no longer allowed | `status=failed`, user-facing message |
| 429 Too Many Requests | Rate limited | Respect `Retry-After` header, schedule retry |
| 5xx | Server fault | `attempts++`, exponential backoff |
| Network error / timeout | Transient | `attempts++`, exponential backoff |

### 5.2 Backoff curve
`next_attempt_at = now + min(60s * 2^attempts + jitter, 1h)` với jitter ±20%.
Max **5 attempts** rồi `status=failed` + notification. (Plan gốc nói max 3; nâng lên 5 vì user vùng yếu sóng có thể về vùng phủ chậm hơn dự kiến — vẫn an toàn vì idempotent.)

---

## 6. Image upload pipeline

Đây là code path trọng yếu nhất vì proof image là 80% bytes user sinh ra.

### 6.1 Capture phase (offline-safe)
1. User chụp ảnh qua `expo-camera` hoặc chọn từ thư viện.
2. Compress client-side: max 1600px long side, JPEG quality 80 (~250–600 KB). Dùng `expo-image-manipulator`.
3. Save sang `${documentDirectory}proofs/{quest_id}/{submission_client_id}/{n}.jpg`.
4. Tính **SHA-256** trên ciphertext file (qua `expo-crypto`).
5. Insert row `proof_upload`:
   ```json
   {
     "type": "proof_upload",
     "payload": {
       "file_path": "proofs/q123/s456/0.jpg",
       "hash_sha256": "ab12...",
       "content_type": "image/jpeg",
       "size_bytes": 412334,
       "captured_at": 1715520000000,
       "exif_gps": { "lat": 11.94, "lon": 108.43, "accuracy_m": 8 }
     }
   }
   ```

### 6.2 Upload phase (online)
1. Worker pick proof_upload row → call `POST /api/mobile/proofs/presign` với `{hash, size, content_type, quest_id}`. Server trả `presigned_url` (R2 PUT URL có TTL 15 phút) + `upload_id`.
2. Nếu `size > 5 MB` → multipart: chia 5MB chunks, dùng R2 multipart API. Lưu `upload_id` + `parts[]` vào payload để resume sau khi mất sóng.
3. PUT từng chunk lên R2 với header `If-None-Match: *` (đảm bảo không ghi đè).
4. Sau khi tất cả parts up xong → `POST /api/mobile/proofs/upload-batch` xác nhận với hash. Server kéo object về, tính lại SHA-256, so sánh.
5. Server hash match → response `201 { proof_id }` → mark `completed`, ghi `server_proof_id` vào payload.

### 6.3 Failure modes
| Tình huống | Xử lý |
|---|---|
| Mất sóng giữa multipart upload | Lưu parts đã hoàn tất; lần wake tiếp resume từ part chưa upload (R2 multipart hỗ trợ list parts) |
| Server hash mismatch | Retry **một lần**; nếu vẫn lệch → `status=failed`, prompt user retake (file có thể đã hỏng do storage cleanup) |
| File bị OS xoá (low storage) | FileSystem trả `ENOENT` khi đọc → `status=failed`, notify "Ảnh đã mất, vui lòng chụp lại" |
| Presign expired (15 phút) | Đổi presign mới, retry không tính attempt |
| R2 trả 403 | Token hết hạn → refresh auth → presign lại |

---

## 7. Idempotency strategy

### 7.1 Client side
- Mỗi mutation sinh **một** `idempotency_key` (UUID v4) tại moment enqueue. Lưu vào row.
- Retry **không** sinh key mới — key sống cùng row tới khi `completed` hoặc `failed`.
- Cancel + re-enqueue (user edit + resubmit) → row mới, key mới.

### 7.2 Server side
- Endpoint mutating yêu cầu header `Idempotency-Key: <uuid>`.
- Server lưu `(key, request_hash, response_body, status_code)` 24h trong KV.
- Cùng key + cùng hash payload → trả response cached, idempotent.
- Cùng key + **khác** payload → `409 Conflict, code=IDEMPOTENCY_KEY_REUSED`. Client log + treat as failed (programming bug).
- Sau 24h key expire — không thành vấn đề vì client `completed` rows đã xoá khỏi queue.

---

## 8. Conflict resolution

### 8.1 Submission
**Last-write-wins on server timestamp.** Nếu user submit offline ở `t1`, mạng về tại `t1+2h`, server thấy submission của quest đó đã được host moderate ở `t1+30min` (hypothetically từ device khác hoặc admin tool):
- Server trả `409 SUBMISSION_ALREADY_RESOLVED`.
- Client mark row `completed` nhưng surface modal: "Submission của bạn đã được xử lý từ thiết bị khác. Trạng thái hiện tại: approved/rejected."

### 8.2 Profile update
Per-field timestamp merge. Payload gửi kèm `{field, value, modified_at}`. Server merge field-by-field, field newer wins. Tránh trường hợp user đổi bio offline, đổi tên trên web — cả hai cùng sống sót.

### 8.3 Receipts
Immutable một khi issued. Queue không bao giờ chứa mutation receipt; chỉ read sync. Không có conflict.

### 8.4 Host message
Append-only stream. Mỗi message có UUID client-generated → server dedupe theo UUID. Order theo `client_sent_at` nhưng hiển thị theo `server_received_at` (tránh clock skew làm timeline lệch).

---

## 9. Background sync triggers

Worker được đánh thức bởi **bất kỳ** trigger nào sau đây:

1. **Network state change** (offline → online) — listener `NetInfo.addEventListener`.
2. **App foreground** + queue không rỗng — check tại `AppState.change`.
3. **Background fetch**:
   - iOS: `expo-background-fetch` (BGAppRefreshTask, ~15 phút interval do iOS quyết định).
   - Android: `expo-task-manager` + WorkManager, constraint `NETWORK_TYPE_CONNECTED`.
4. **Manual "Sync now"** trong Settings → Sync Queue.
5. **Periodic 30s tick** khi app foreground và queue không rỗng.
6. **Push notification silent** với topic `sync:wake` (chỉ khi push ON; không phụ thuộc).

### 9.1 Throttling
- Min interval giữa các tick: **5s** (chống busy loop khi network flap).
- Max concurrent upload: **2** (tránh nghẽn băng thông cellular).
- **Wifi-only sync**: user setting, default **OFF**. Nếu ON → pause queue trên cellular, hiện banner "Đang đợi Wifi".

---

## 10. Error UX

User luôn nhìn thấy queue state. Không bao giờ có mutation "biến mất".

### 10.1 Surface points
- **Home banner** (sticky top): "3 mục đang đồng bộ..." với progress dot. Tap → mở Sync Queue screen.
- **Submission detail card**: badge trạng thái (`pending` / `syncing` / `failed` / `done`) cùng timestamp.
- **Settings → Sync Queue**: bảng đầy đủ, manual retry, manual cancel, xem error message ngắn.
- **Toast on success**: "Submission đã đồng bộ. Receipt sẵn sàng." — 3s, tap mở receipt.
- **Persistent notification on failure**: "1 mục không sync được. Bấm để xử lý." — chỉ hiện sau attempt cuối cùng fail.

### 10.2 Vùng yếu sóng UX
Khi `NetworkMonitor` báo signal quality `weak` (RSSI < threshold hoặc ping latency > 3s) hơn 60s:
- Hiện banner gentle "Sóng yếu, sẽ đồng bộ sau" thay vì retry liên tục làm nóng pin.
- Worker giãn ra: chỉ tick mỗi 5 phút thay vì 30s.

---

## 11. Bandwidth & storage limits

| Resource | Limit | Hành vi vượt |
|---|---|---|
| Queue rows pending | 100 | Cảnh báo user, không enqueue thêm cho tới khi clear bớt |
| Local media (proofs) | 500 MB | Auto-purge **đã uploaded > 7 ngày**; never delete pending |
| SQLite cache | 50 MB | LRU eviction trên `cache.db` |
| Image dimensions | 1600px long side | Resize lúc capture |
| Image quality | JPEG 80 | Fixed |
| Single proof file | 10 MB hard cap sau compress | Reject, prompt retake |
| Wifi-only mode | Setting, default OFF | Queue pause trên cellular |

---

## 12. Security

### 12.1 Encryption at rest
- Queue `payload` mã hoá **AES-256-GCM**.
- Device key (32 bytes random) sinh lần đầu, lưu trong **Keychain/Keystore** qua `expo-secure-store`. App-only access, không sync iCloud.
- IV mới cho mỗi row (random 12 bytes), lưu cùng row.
- Key rotation: hỗ trợ multiple keys song song (key version trong row); rotate khi user đổi PIN app (post-MVP).

### 12.2 Auth token
- **Không lưu auth token trong queue payload.** Token attach tại sync time từ secure store.
- Nếu token expire trong queue payload (giả sử có), retry sau refresh sẽ dùng token mới — payload không cần biết.

### 12.3 PII
- Reflection text, GPS, ảnh được mã hoá ở rest.
- Sentry breadcrumb **không log payload**, chỉ log `{queue_id, type, status, error_code}`.
- Crash reports scrub `payload`, `payload_iv` automatically (Sentry beforeSend hook).

### 12.4 Threat model
- Device thất lạc nhưng locked → queue an toàn (key trong Keychain, không truy cập được khi locked).
- Device root/jailbreak → ngoài scope MVP, chỉ best-effort.
- MITM trên cellular → mọi request TLS 1.3 + cert pinning (`react-native-cert-pinner`).

---

## 13. Testing matrix

Suite chạy tự động trong CI + manual QA mỗi sprint:

| Scenario | Expected outcome |
|---|---|
| Airplane mode toggle | Queue retains; sync resumes khi restore |
| Force-quit app trong upload multipart | Resume từ part cuối cùng đã ack |
| Force-quit app sau enqueue chưa sync | Row vẫn còn sau relaunch, status=`pending` |
| 1G / 2G simulation (Network Link Conditioner) | Upload hoàn tất trong < 5 retries |
| Battery saver mode (Android Doze) | Background sync deferred, không mất row |
| iOS Low Power Mode | Background fetch frequency giảm, vẫn sync khi foreground |
| Clock skew client lệch server > 5 phút | Server timestamp wins; client warned trong log |
| Multi-device, cùng user, Device B submit cùng quest | Device A nhận push refresh, queue Device A trả 409 → mark completed |
| Cache full 500 MB | Auto-purge uploaded > 7 ngày; pending không bị động |
| Token expire giữa retry | Auto-refresh trong-flight, retry success |
| 5 attempts đều fail | Persistent notification + Settings highlight |
| User cancel pending row | Row removed, optimistic UI rollback |
| App upgrade với schema migration | Old rows được migrate hoặc surface tới user nếu incompatible |

---

## 14. Metrics (anonymous, opt-in)

Tất cả gửi qua self-hosted analytics endpoint, **không** dùng third-party SaaS (giữ promise privacy của plan gốc).

| Metric | Definition | Goal |
|---|---|---|
| `sync_latency_p50` | Thời gian từ `online_detected` → `queue empty` | < 60s |
| `sync_failure_rate` | % rows kết thúc `failed` / total | < 2% |
| `offline_submission_rate` | % submissions tạo khi `online=false` | Track, no target |
| `queue_depth_median` | Median pending rows trong ngày | < 3 |
| `multipart_resume_count` | Số lần resume upload | Track |
| `idempotency_409_count` | 409 từ duplicate key | Should be ~0 (anomaly nếu > 0) |
| `image_compress_ratio` | Bytes sau / trước compress | Track for tuning |

Opt-in default OFF; user phải bật trong Settings → Privacy → Anonymous diagnostics.

---

## 15. Versioning & migration

### 15.1 Queue schema version
- Mỗi row có `schema_version` (int).
- Khi app update làm thay đổi shape `payload` → bump version, viết migration function.
- Migration chạy **lazy** lúc worker đọc row: nếu `row.schema_version < CURRENT`, run migrator, write back, then process.
- Migration không phá huỷ: chỉ enrich hoặc rename, không drop field.

### 15.2 Server min-client-version
- Endpoint `/api/mobile/feature-flags` trả `min_client_version`.
- Client < min → block sync, prompt update app. Queue được giữ nguyên, không mất.

### 15.3 Incompatible rows
- Nếu migrator không thể nâng cấp một row (rất hiếm) → flag `status=failed` với `error_code=SCHEMA_INCOMPATIBLE`, surface tới user xem payload (sanitized) và quyết định cancel hay copy nội dung sang submission mới.

---

## 16. Implementation checklist (cho Sprint 03)

- [ ] Tạo `src/lib/sync/db.ts` — SQLite init + migrations
- [ ] Tạo `src/lib/sync/queue.ts` — enqueue/dequeue/update APIs
- [ ] Tạo `src/lib/sync/worker.ts` — tick loop, backoff, dispatcher
- [ ] Tạo `src/lib/sync/encryption.ts` — AES-GCM với Keychain key
- [ ] Tạo `src/lib/sync/network.ts` — NetworkMonitor + ping
- [ ] Tạo `src/features/proof-upload/pipeline.ts` — multipart logic
- [ ] Hooks: `useEnqueue`, `useQueueStatus`, `useSyncNow`
- [ ] Screens: Settings → Sync Queue
- [ ] Banner component: HomeSyncBanner
- [ ] Background tasks: `expo-background-fetch` config + WorkManager
- [ ] Sentry scrubbing config
- [ ] E2E test suite (Detox): airplane mode, force-quit, 1G simulation
- [ ] Server endpoints: `/proofs/presign`, `/proofs/upload-batch`, idempotency KV
- [ ] Documentation: developer README trong `src/lib/sync/`

---

## Nguyên tắc cốt lõi (đọc trước mỗi PR)

1. **Idempotency là non-negotiable** — không có endpoint mutating nào không có Idempotency-Key.
2. **Last-write-wins server-side** — client không bao giờ "thắng" server.
3. **User luôn nhìn thấy queue state** — không có pending row nào ẩn.
4. **No silent data loss** — failure phải surface, retry phải có path, cancel phải explicit.
5. **No third-party sync SDK** — toàn bộ pipeline tự kiểm soát, audit được.
6. **Pending media bất khả xâm phạm** — không LRU, không auto-purge cho tới khi uploaded thành công.
7. **Encryption at rest mặc định** — payload không bao giờ lưu plaintext trên disk.

---

**End of document.**
