# muonnoi.org — Dev Log

Cập nhật mới nhất ở đầu file.

---

## 2026-05-19 — Section 1.3: www.nguoiviet redirect Worker deployed

### Đã làm
- **Worker `www-nguoiviet-redirect`** — deploy via `wrangler deploy` (wrangler.workers.dev):
  `export default { fetch: req => Response.redirect("https://nguoiviet.muonnoi.org" + new URL(req.url).pathname + new URL(req.url).search, 301) }`
- **Cloudflare Workers route** — `www.nguoiviet.muonnoi.org/*` → `www-nguoiviet-redirect` (route ID `fbd37061a00145a5b60741d8069f4d53`)
- **HTTP 301 redirect confirmed** — `http://www.nguoiviet.muonnoi.org/` → `https://nguoiviet.muonnoi.org/` ✅ (`Cf-Ray: 9fe10d0eacf34b1f-LAX`)

### Còn lại (cần user action)
- **HTTPS cho `www.nguoiviet.muonnoi.org`** — SSL handshake fail vì Universal SSL chỉ cover `*.muonnoi.org` (1 wildcard level), không cover `www.nguoiviet.muonnoi.org` (3 levels). Fix options:
  - (A) Cloudflare Advanced Certificate Manager → add `www.nguoiviet.muonnoi.org` hostname ($10/month)
  - (B) Chấp nhận HTTP-only redirect — canonical URL là `nguoiviet.muonnoi.org` (no www), SEO không bị ảnh hưởng
  - (C) Cloudflare dashboard → SSL/TLS → Edge Certificates → check "Universal SSL" settings

### Status Section 1.3
- HTTP redirect: ✅ LIVE
- HTTPS redirect: ⚠️ SSL cert gap (third-level subdomain not covered by Universal SSL)

---

## 2026-05-19 — Full email system: 8 templates + payment emails + URL bug fix

### Đã làm
- **Bug fix: `MAIL_API_BASE_URL`** — `"https://mail.iai.one/v1"` → `"https://mail.iai.one/_mail/v1"`. Tất cả email trước bản này 404 silent do thiếu `/_mail` prefix.
- **`src/lib/email.ts`** — Email service tập trung, hoàn toàn mới:
  - `sendEmail()` + `fireEmail()` (fire-and-forget, không block)
  - HTML wrapper chuẩn responsive, branding muonnoi.org
  - 8 templates bilingual vi/en:
    1. `buildWelcomeEmail` — đăng ký bằng mật khẩu
    2. `buildWelcomeGoogleEmail` — đăng ký lần đầu bằng Google OAuth
    3. `buildMagicLinkEmail` — link đăng nhập
    4. `buildPaymentConfirmedEmail` — thanh toán thành công
    5. `buildPaymentFailedEmail` — thanh toán thất bại
    6. `buildSupportAckEmail` — xác nhận nhận yêu cầu hỗ trợ
    7. `buildEmailVerifiedEmail` — xác minh email xong
    8. `buildFlowNotificationEmail` — flow automation hoàn thành/thất bại
- **`google-oauth-api.ts`** — `upsertGoogleUser` trả về `isNew: boolean`; `handleGoogleAuthCallback` gọi `buildWelcomeGoogleEmail` fire-and-forget cho user mới
- **`magic-link-api.ts`** — thay `sendMagicLinkEmail` inline bằng `buildMagicLinkEmail` từ lib
- **`payment-api.ts`** — `handlePaymentWebhook`:
  - `payment.completed` / `payment.success` → lookup user → gửi `buildPaymentConfirmedEmail`
  - `payment.failed` / `payment.error` → lookup user → gửi `buildPaymentFailedEmail`
- **Deployed** `ai-muonnoi-api` version `5e130b71-4a22-42f5-8bfd-a8b82950e662` ✅

### Email flows hoàn chỉnh (sau deploy này)
| Flow | Trigger | Template | Status |
|------|---------|----------|--------|
| Magic link sign-in | POST /api/auth/magic-link/request | buildMagicLinkEmail | ✅ |
| Welcome (password) | POST /api/auth/register | buildWelcomeEmail | ✅ (đã có trước) |
| Welcome (Google OAuth) | GET /api/auth/google/callback (new user) | buildWelcomeGoogleEmail | ✅ MỚI |
| Payment confirmed | POST /api/webhook/payment (completed) | buildPaymentConfirmedEmail | ✅ MỚI |
| Payment failed | POST /api/webhook/payment (failed) | buildPaymentFailedEmail | ✅ MỚI |
| Support ack | (gọi khi có contact form) | buildSupportAckEmail | ✅ sẵn sàng |
| Email verified | (gọi sau verify flow) | buildEmailVerifiedEmail | ✅ sẵn sàng |
| Flow notification | (gọi từ flow executor) | buildFlowNotificationEmail | ✅ sẵn sàng |

### Cách dev team dùng
```typescript
import { buildPaymentConfirmedEmail, fireEmail } from "../lib/email"

// Trong bất kỳ handler nào:
fireEmail(env, buildPaymentConfirmedEmail(env, userEmail, {
  name: user.name,
  amount: 199000,
  currency: "VND",
  intentId: "pi_abc123",
  purpose: "membership",
}))
// Không cần await — fire-and-forget, không block response
```

---

## 2026-05-19 — Phase A done: repo cleanup, DNS matrix, Cuộc Sống Gate 8

### Đã làm
- ✅ **C8 — Repo cleanup** (`git status` rỗng)
  - Xoá stale gitlink `muonnoi app` (Xcode project cũ)
  - Xoá gitlinks muonnoi-ai, muonnoi-ai-machine, muonnoi-app, muonnoi-node (do-not-deploy clones)
  - Thêm .gitignore entries cho clone dirs + brand zip
  - Commit ai.muonnoi.org submodule changes (mobile push endpoint, migration 0007, CSP/CORS)
  - Clean app.muonnoi.org submodule (.gitignore + team planning docs)

- ✅ **C6 — DNS matrix** (8 LIVE_LINK_ALLOWED entries)
  - `cuocsong.muonnoi.org`: HTTP 200, Cloudflare IP → `LIVE_LINK_ALLOWED`
  - `nguoiviet.muonnoi.org`: HTTP 200, Cloudflare IP → `LIVE_LINK_ALLOWED`
  - `www.nguoiviet.muonnoi.org`: DNS OK (Cloudflare 104.21.93.187) but HTTP 522 → `DNS_CONFIGURED_ORIGIN_PENDING`
  - Updated matrix file + execution status file

- ✅ **C7 — Cuộc Sống Gate 8** (đang đóng)
  - 7/7 routes HTTP 200: `/`, `/gioi-thieu/`, `/song-o-nhieu-noi/`, `/cho-va-nhan/`, `/legal/disclaimer/`, `/legal/privacy/`, `/legal/terms/`
  - Cuộc Sống checklist từ `IMPLEMENTATION_IN_PROGRESS` → `READY_FOR_PUBLIC_LINK`

### Còn lại (cần user action)
- **B1 OAuth E2E**: cần test Google account + browser screenshots (5 sites × 9 steps)
- **B2 Android SDK**: cài `android-commandlinetools` + accept licenses + build debug
- **C1 iOS TestFlight**: cần Apple Developer Team ID (10-char) từ developer.apple.com
- **C2 Payment/Email**: cần PayOS test credentials + D1 access → 10 scenario QA

### Runbook
- `docs/launch/SOLO_TEAM_RUNBOOK_TO_100_2026-05-19.md` — bản cô đặc cho 1 người làm từ đầu đến 100/100

---

## 2026-05-18 — Google Sign-In deployment complete

### Đã làm
- ✅ **tramsaigon.com/vi/sign-in/** — Google button deployed (Next.js)
- ✅ **nhachung.org/dang-ky** — Google button deployed (React)
- ✅ **auth.omdala.com/login** — Google button deployed (production branch)
- ✅ **lamviec.muonnoi.org/*/login** — Google button deployed (React Native Web)
- ✅ **lamviec.muonnoi.org/*/register** — Google button deployed

### Sites kiểm soát
| Site | Button | Status | API |
|------|--------|--------|-----|
| tramsaigon.com/vi/sign-in | ✅ Google OAuth | Live | /api/auth/google/start |
| nhachung.org/dang-ky | ✅ Google OAuth | Live | /api/auth/google/start |
| auth.omdala.com/login | ✅ Google OAuth | Live | /api/auth/google/start |
| lamviec.muonnoi.org/login | ✅ Google OAuth | Live | /api/auth/google/start |
| lamviec.muonnoi.org/register | ✅ Google OAuth | Live | /api/auth/google/start |
| lamviecmuonnoi.com | — | Migrated to muonnoi.org | N/A |

### CSS dividers added
- All sign-in/register pages now have consistent divider styling
- Global CSS: `globals.css` with `.divider` class
- Styling: `border-top: 1px solid #e5e7eb; margin: 1rem 0;`

### Deployments completed
- tramsaigon.com: `npm run build && npm run deploy` ✅
- nhachung.org: `npm run build && npm run deploy` ✅  
- auth.omdala.com: `git push origin production` ✅
- lamviec.muonnoi.org: `wrangler pages deploy` ✅

---

## 2026-05-18 — MAIL_API_KEY set

### Đã làm
- **`MAIL_API_KEY`** — set trên `ai-muonnoi-api` worker. Magic-link và auth email sẽ gửi được sau bước này.
- Worker code đã default `MAIL_API_WORKSPACE_ID = "muonnoi.org"` nếu không set (trong `security-api.ts` line 204) → không cần set riêng.

### Worker
- **API Worker**: `ai-muonnoi-api` → `api.muonnoi.org`
- **Config**: `/Users/tranhatam/Documents/Devnewproject/muonnoi.org/ai.muonnoi.org/workers/api/wrangler.toml`
- **Mail base URL**: `https://mail.iai.one/v1` (set trong wrangler.toml)

### Secrets trên `ai-muonnoi-api`
| Secret | Status |
|--------|--------|
| MAIL_API_KEY | ✅ set 2026-05-18 ← MỚI |
| GOOGLE_CLIENT_ID | ✅ set |
| GOOGLE_CLIENT_SECRET | ✅ set |
| GOOGLE_REDIRECT_URI | ✅ `https://api.muonnoi.org/api/auth/google/callback` |

### Email flows
| Flow | Route | Status |
|------|-------|--------|
| Magic link | `/api/auth/magic-link/request` | ✅ Live (cần test) |
| Google OAuth | `/api/auth/google/start` | ✅ Live |

### Còn lại
- Test magic-link end-to-end: request → email đến inbox.
- muonnoi.org không có public login page (admin-only) — Google OAuth không cần frontend button.
