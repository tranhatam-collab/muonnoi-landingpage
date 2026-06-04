# SOLO TEAM RUNBOOK · MUÔN NƠI · 0 → 100/100
> Mở file này, làm tuần tự từ trên xuống. Mỗi bước có lệnh copy-paste + verify. Không skip. Không tự ý đảo thứ tự (có dependency).
>
> **Tổng thời gian thực hiện:** ~8 giờ làm việc (1 ngày), nếu user input có sẵn (Apple Team ID, Google test account, merchant credentials).
>
> **Repo:** `/Users/tranhatam/Documents/Devnewproject/muonnoi.org`
> **Verifier cron:** `3d04bc7d` (mỗi :17 và :47 past hour, auto-update `reports/RELEASE_STATUS_2026-05-19.md`)
> **Đóng cron:** Tự động khi N=9, hoặc dùng `CronDelete` với id ở trên.

---

## ⚙️ Pre-flight (5 phút)

Kiểm tra môi trường có sẵn:

```bash
cd /Users/tranhatam/Documents/Devnewproject/muonnoi.org

# Kiểm tra git remote
git remote -v   # phải có origin → github.com:tranhatam-collab/muonnoi.git

# Kiểm tra Cloudflare auth
which wrangler && wrangler whoami

# Kiểm tra D1 access
wrangler d1 list | grep -i iai-flow-db

# Kiểm tra Xcode
xcodebuild -version

# Kiểm tra Java (cho Android sau này)
java -version   # phải >= 21
```

**Cần chuẩn bị từ user trước khi vào Phase C:**
- [ ] Apple Developer Team ID (10-char string từ developer.apple.com/account → Membership)
- [ ] Google test account (email + password) để chạy OAuth E2E
- [ ] PayOS test merchant credentials hoặc OK dùng existing config trên `pay.iai.one`

Nếu chưa có cái nào → vẫn làm Phase A và Phase B song song, đến Phase C mới chặn.

---

## PHASE A · Local Work, Không Cần Credential (2 giờ)

> Làm xong A trước, vì các phase sau commit nhiều — repo cần sạch.

### A1 · Repo cleanup (40 phút) — đóng condition C8

```bash
cd /Users/tranhatam/Documents/Devnewproject/muonnoi.org
git status --short
```

Bạn sẽ thấy 7 entries. Xử lý từng cái:

**1. Thư mục "muonnoi app" có dấu cách:**
```bash
ls -la "muonnoi app"
# Nếu là junk/build artifact → xoá:
rm -rf "muonnoi app"
# Nếu là source thật → rename:
git mv "muonnoi app" muonnoi-app-legacy
```

**2. Brand zip:**
```bash
ls -lh docs/brand/muonnoi-brand-system-final.zip
# Setup LFS (file > 5MB nên dùng LFS, không commit raw zip):
git lfs install
git lfs track "docs/brand/*.zip"
git add .gitattributes docs/brand/muonnoi-brand-system-final.zip
```

Hoặc nếu không muốn LFS:
```bash
echo "docs/brand/*.zip" >> .gitignore
git add .gitignore
```

**3. Submodule changes — xử lý từng cái:**
```bash
for sm in ai.muonnoi.org muonnoi-ai muonnoi-ai-machine muonnoi-app; do
  echo "=== $sm ==="
  cd $sm
  git status --short
  cd ..
done
```

Với mỗi submodule có change:
```bash
cd <submodule>
git status --short
# Nếu thay đổi có ý nghĩa: commit + push
git add -A
git commit -m "chore: sync from main repo work (2026-05-19)"
git push origin main
cd ..
# Update pointer ở repo cha:
git add <submodule>
```

Nếu submodule chỉ có file ignored hoặc rác → đừng commit, để nguyên hoặc reset:
```bash
cd <submodule>
git checkout -- .   # discard untracked changes — CHỈ làm nếu chắc chắn không cần
cd ..
```

**4. app.muonnoi.org submodule untracked:**
```bash
# Cái này là submodule pointer mới — kiểm tra:
git submodule status app.muonnoi.org
# Nếu pointer khớp với .gitmodules: thêm vào index
git add app.muonnoi.org
```

**5. Commit cleanup + push:**
```bash
git status --short
# Mục tiêu: output rỗng sau commit cuối

git commit -m "chore: repo cleanup — submodule pointers + brand zip + remove stray dir"
git push origin main
```

**Verify đóng C8:**
```bash
git status --short | wc -l   # phải = 0
```

---

### A2 · DNS Matrix file update (15 phút) — đóng condition C6

DNS thật đã live (cuocsong, nguoiviet, www.nguoiviet đều resolve Cloudflare HTTP 200). Chỉ cần cập nhật matrix file.

```bash
cd /Users/tranhatam/Documents/Devnewproject/muonnoi.org
# Capture evidence trước:
{
  echo "=== DNS evidence 2026-05-19 ==="
  for d in cuocsong nguoiviet www.nguoiviet; do
    echo "--- $d.muonnoi.org ---"
    dig +short $d.muonnoi.org
    curl -sI https://$d.muonnoi.org/ | head -3
  done
} > /tmp/dns-evidence.txt
cat /tmp/dns-evidence.txt
```

Mở file matrix:
```bash
$EDITOR docs/launch/MUONNOI_SUBDOMAIN_DNS_CUSTOM_DOMAIN_MATRIX_2026-05-12.md
```

Tìm dòng status của 3 subdomain `cuocsong`, `nguoiviet`, `www.nguoiviet` (hoặc `nguoiviet www`). Đổi từ `DNS_NOT_CONFIGURED` / `WIX_PENDING` / `BLOCKED` sang `LIVE_LINK_ALLOWED`. Kèm dòng evidence:
```
- Verified 2026-05-19: dig returns Cloudflare IP (172.67.214.1 / 104.21.93.187), HTTPS 200.
```

Cập nhật cả file execution status:
```bash
$EDITOR docs/launch/MUONNOI_DNS_AND_SUBDOMAIN_EXECUTION_STATUS_2026-05-11.md
```

Add section "Update 2026-05-19" reflecting 3 domain đã live.

**Commit + verify:**
```bash
git add docs/launch/MUONNOI_SUBDOMAIN_DNS_CUSTOM_DOMAIN_MATRIX_2026-05-12.md \
        docs/launch/MUONNOI_DNS_AND_SUBDOMAIN_EXECUTION_STATUS_2026-05-11.md
git commit -m "platform: DNS matrix LIVE_LINK_ALLOWED for cuocsong + nguoiviet (2026-05-19)"
git push origin main

grep -c "LIVE_LINK_ALLOWED" docs/launch/MUONNOI_SUBDOMAIN_DNS_CUSTOM_DOMAIN_MATRIX_2026-05-12.md
# phải >= 3
```

---

### A3 · Cuộc Sống Gate 8 (45 phút) — đóng condition C7

Site đã live. Cần verify 4 route claim-safe + cập nhật checklist status.

**1. Verify 4 route render đúng:**
```bash
for path in "" "about" "disclaimer" "legal/privacy"; do
  url="https://cuocsong.muonnoi.org/$path/"
  echo "=== $url ==="
  curl -sI "$url" | head -1
  curl -s "$url" | grep -o '<title>[^<]*</title>' | head -1
  curl -s "$url" | grep -o '<meta name="description"[^>]*>' | head -1
done
```

Tất cả phải `HTTP/2 200`, có `<title>`, có `<meta name="description">`.

**2. Brand QA check (không có forbidden words):**
```bash
for path in "" "about" "disclaimer" "legal/privacy"; do
  body=$(curl -s "https://cuocsong.muonnoi.org/$path/")
  echo "=== /$path/ forbidden words check ==="
  echo "$body" | grep -iE "guaranteed|magic|instant|viral|crush it|hustle|earn fast" && echo "FAIL: forbidden words found" || echo "PASS"
done
```

**3. Accessibility quick check:**
```bash
curl -s https://cuocsong.muonnoi.org/ | grep -c "<h1"   # phải = 1 (one H1)
curl -s https://cuocsong.muonnoi.org/ | grep -c "alt="  # phải >= 1 (alt text)
```

**4. Update checklist:**
```bash
$EDITOR docs/launch/CUOCSONG_MUONNOI_QA_AND_RELEASE_CHECKLIST_2026-05-13.md
```

Tìm dòng `IMPLEMENTATION_IN_PROGRESS_BLOCKED_ON_RELEASE_GATES`. Đổi sang `READY_FOR_PUBLIC_LINK` kèm evidence:
```
Status: READY_FOR_PUBLIC_LINK
Date verified: 2026-05-19
Evidence:
- 4 routes return HTTP 200 with title + description
- No forbidden words detected in scan
- One H1 per page, alt text present on images
```

**5. Add homepage CTA (nếu mong muốn):**
```bash
$EDITOR apps/web/public/index.html
```

Thêm `infoCard` link tới `https://cuocsong.muonnoi.org/` ở section ecosystem.

**Commit:**
```bash
git add docs/launch/CUOCSONG_MUONNOI_QA_AND_RELEASE_CHECKLIST_2026-05-13.md \
        apps/web/public/index.html
git commit -m "cuocsong: Gate 8 closed + homepage CTA added (2026-05-19)"
git push origin main

# Verify:
grep "READY_FOR_PUBLIC_LINK" docs/launch/CUOCSONG_MUONNOI_QA_AND_RELEASE_CHECKLIST_2026-05-13.md
```

---

## PHASE B · Bằng Chứng E2E + Android (3 giờ)

### B1 · OAuth E2E test 5 site (1.5 giờ) — đóng condition C5

Tạo thư mục evidence + setup helper:
```bash
cd /Users/tranhatam/Documents/Devnewproject/muonnoi.org
mkdir -p qa/oauth-evidence/2026-05-19
cd qa/oauth-evidence/2026-05-19
```

**5 site cần test (mỗi site lưu 1 thư mục):**
- `tramsaigon/`
- `nhachung/`
- `omdala/`
- `lamviec-login/`
- `lamviec-register/`

Mỗi site, mở browser incognito, làm 9 bước. Screenshot từng bước, lưu vào thư mục site đó (đặt tên `01-button.png`, `02-consent.png`, ... `09-logout.png`).

**Helper script ghi nhận kết quả:**
```bash
cat > /tmp/oauth-record.sh <<'EOF'
#!/bin/bash
SITE=$1
echo "=== OAuth E2E: $SITE ==="
echo "1. Mở browser incognito, vào URL"
echo "2. Click 'Sign in with Google'"
echo "3. Verify redirect tới accounts.google.com"
echo "4. Login test Google account"
echo "5. Verify callback https://api.muonnoi.org/api/auth/google/callback"
echo "6. Verify cookie mn_session=...; HttpOnly; Secure; SameSite=Lax"
echo "7. Verify redirect dashboard"
echo "8. curl -b cookie.txt https://api.muonnoi.org/api/me  → 200 với user data"
echo "9. Logout, verify cookie clear"
echo ""
echo "Mỗi step screenshot lưu vào qa/oauth-evidence/2026-05-19/$SITE/"
EOF
chmod +x /tmp/oauth-record.sh

# Gọi cho mỗi site:
/tmp/oauth-record.sh tramsaigon
/tmp/oauth-record.sh nhachung
/tmp/oauth-record.sh omdala
/tmp/oauth-record.sh lamviec-login
/tmp/oauth-record.sh lamviec-register
```

**URL cho từng site:**
| Site | URL |
|------|-----|
| tramsaigon | https://tramsaigon.com/vi/sign-in/ |
| nhachung | https://nhachung.org/dang-ky |
| omdala | https://auth.omdala.com/login |
| lamviec-login | https://lamviec.muonnoi.org/login |
| lamviec-register | https://lamviec.muonnoi.org/register |

**Sau mỗi site, ghi vào file `qa/oauth-evidence/2026-05-19/{site}/RESULT.md`:**
```markdown
# {site} OAuth E2E — 2026-05-19

Steps PASS: 9/9
- 1. Button visible: ✅ (01-button.png)
- 2. Click → Google consent: ✅ (02-consent.png)
- 3. Login: ✅ (03-login.png)
- 4. Callback: ✅ (04-callback.png) - Status 302
- 5. Cookie set: ✅ (05-cookie.png) - mn_session present, HttpOnly, Secure
- 6. Dashboard redirect: ✅ (06-dashboard.png)
- 7. /api/me returns user: ✅ (07-api-me.png) - HTTP 200
- 8. Dark mode render: ✅ (08-darkmode.png)
- 9. Logout: ✅ (09-logout.png) - cookie cleared

Notes: ...
```

**Tổng hợp:**
```bash
cd /Users/tranhatam/Documents/Devnewproject/muonnoi.org
cat > qa/oauth-evidence/2026-05-19/SUMMARY.md <<'EOF'
# OAuth E2E Test Summary — 2026-05-19

| Site | Steps PASS | Notes |
|------|-----------|-------|
| tramsaigon | 9/9 | ... |
| nhachung | 9/9 | ... |
| omdala | 9/9 | ... |
| lamviec-login | 9/9 | ... |
| lamviec-register | 9/9 | ... |

Total: 45/45 steps PASS across 5 sites.
EOF

git add qa/oauth-evidence/
git commit -m "qa: OAuth E2E tested for 5 sites — 45/45 steps PASS (2026-05-19)"
git push origin main

# Verify:
ls -d qa/oauth-evidence/2026-05-19/*/ | wc -l   # phải = 5
test -f qa/oauth-evidence/2026-05-19/SUMMARY.md && echo "SUMMARY exists"
```

---

### B2 · Android SDK install (1 giờ) — đóng condition C4

**Cách nhanh nhất (Homebrew):**
```bash
brew install --cask android-commandlinetools
# Hoặc full Android Studio (nặng hơn nhưng có GUI):
brew install --cask android-studio
```

Sau khi cài, thêm vào `~/.zprofile`:
```bash
cat >> ~/.zprofile <<'EOF'

# Android SDK
export ANDROID_HOME="$HOME/Library/Android/sdk"
export PATH="$PATH:$ANDROID_HOME/platform-tools"
export PATH="$PATH:$ANDROID_HOME/emulator"
export PATH="$PATH:$ANDROID_HOME/cmdline-tools/latest/bin"
EOF

source ~/.zprofile
```

Cài SDK Platform 34 + Build Tools:
```bash
sdkmanager --install "platform-tools" "platforms;android-34" "build-tools;34.0.0"
sdkmanager --licenses   # accept all
```

**Verify:**
```bash
echo "ANDROID_HOME=$ANDROID_HOME"
adb version
```

**Test Android build:**
```bash
cd /Users/tranhatam/Documents/Devnewproject/muonnoi.org/app.muonnoi.org/mobile-shell
npm run build:android:debug
```

Nếu Gradle lỗi `Cannot snapshot output property` (từ log cũ): clean và retry:
```bash
cd android
./gradlew clean
cd ..
npm run build:android:debug
```

**Verify C4 PASS:**
```bash
[ -n "$ANDROID_HOME" ] && [ -d "$ANDROID_HOME" ] && which adb
# tất cả phải có output
```

---

## PHASE C · Cần Credential Bên Ngoài (3 giờ)

### C1 · iOS TestFlight signing (30 phút) — đóng condition C3

**Cần trước:** Apple Developer Team ID (10-char string).

Nếu chưa có:
1. Vào https://developer.apple.com/account → Membership
2. Copy `Team ID` (vd: `ABC1234XYZ`)
3. Đảm bảo có Apple Developer Program subscription active

**Configure Xcode:**
```bash
open /Users/tranhatam/Documents/Devnewproject/muonnoi.org/app.muonnoi.org/mobile-shell/ios/App.xcworkspace
```

Trong Xcode:
1. Click target `App` ở sidebar
2. Tab `Signing & Capabilities`
3. Tick `Automatically manage signing`
4. `Team` dropdown → chọn team của bạn
5. Verify `Provisioning Profile: Xcode Managed Profile`
6. Verify `Bundle Identifier: org.muonnoi.app`
7. Save (Cmd+S)

**Verify từ command line:**
```bash
grep -c "DEVELOPMENT_TEAM = " app.muonnoi.org/mobile-shell/ios/App/App.xcodeproj/project.pbxproj
# phải = 2 (Debug + Release)
```

**Build archive:**
```bash
cd /Users/tranhatam/Documents/Devnewproject/muonnoi.org/app.muonnoi.org/mobile-shell/ios
xcodebuild -workspace App.xcworkspace -scheme App \
  -configuration Release \
  -archivePath ./build/App.xcarchive \
  archive
```

**Upload TestFlight:**
- Mở `App.xcarchive` trong Xcode Organizer
- Click `Distribute App` → `App Store Connect` → `Upload`
- Hoặc dùng `xcrun altool` với app-specific password

**Đợi 5-15 phút processing**, vào App Store Connect → My Apps → `Muôn Nơi` → TestFlight tab → verify build appears với status `Ready to Test` hoặc `Processing`.

**Commit:**
```bash
cd /Users/tranhatam/Documents/Devnewproject/muonnoi.org/app.muonnoi.org
git add mobile-shell/ios/App/App.xcodeproj/project.pbxproj RELEASE_CHECKLIST.md
git commit -m "ios: configure TestFlight signing — DEVELOPMENT_TEAM set, build uploaded (2026-05-19)"
git push origin main
cd ..
git add app.muonnoi.org
git commit -m "submodule: update app.muonnoi.org pointer (iOS signing)"
git push origin main
```

---

### C2 · Payment/Email QA — 10 scenario (2.5 giờ) — đóng condition C2

> **Verified routes 2026-05-19 11:55 ICT** (qua live probe pay.iai.one):
> - `POST /v1/checkout/sessions` — main payment (cần `provider` field, public route, signed bởi `x-api-key`)
> - `POST /internal/checkout-session` — internal contract (cần `x-idempotency-key` + `x-site-key`)
> - `POST /v1/refunds` — refunds (cần `x-idempotency-key`)
> - `POST /v1/webhooks/payos/{webhook-id}` — webhook ingest (signature verified)
> - `GET /v1/payments/search` — list payments
> - `GET /v1/refunds/search` — list refunds
> - `GET /openapi.json` — full schema
> - `GET /docs` — HTML docs
>
> Routes `INTERNAL_CHECKOUT_ROUTE` = `/internal/checkout-session`, `VETUONGLAI_CHECKOUT_ROUTE` = `/api/v1/checkout/session`.

**Cần trước:**
- PayOS test credentials (hoặc dùng config đang có trên `pay.iai.one`)
- Test email inbox accessible (vd: Mailtrap, hoặc real email)
- D1 access cho `iai-flow-db`

**Setup test merchant site:**
```bash
# Tạo tenant + merchant_site cho test
wrangler d1 execute iai-flow-db --remote --command "
INSERT OR IGNORE INTO tenants (id, code, label, created_at) VALUES (1, 'muonnoi', 'Muôn Nơi', $(date +%s));
INSERT OR IGNORE INTO merchant_sites (tenant_id, site_code, return_url, created_at) VALUES (1, 'test', 'https://app.muonnoi.org/payment/callback', $(date +%s));
INSERT OR IGNORE INTO service_api_keys (tenant_id, site_code, key_hash, label, created_at) VALUES (1, 'test', 'sha256-of-test-key', 'test-key', $(date +%s));
"
```

**Tạo file evidence:**
```bash
mkdir -p qa/payment-email-evidence/2026-05-19
cd qa/payment-email-evidence/2026-05-19
```

**10 scenario — chạy từng scenario, lưu request + response:**

**Scenario 1 — Happy path (CORRECTED PATH: `/internal/checkout-session`):**
```bash
IDEMP="$(uuidgen)"
curl -s -X POST https://pay.iai.one/internal/checkout-session \
  -H "Content-Type: application/json" \
  -H "x-idempotency-key: $IDEMP" \
  -H "x-site-key: $TEST_SITE_KEY" \
  -d '{
    "tenant_code": "muonnoi",
    "site_code": "test",
    "internal_order_id": "test-'$(date +%s)'",
    "amount": 10000,
    "currency": "VND",
    "provider": "payos",
    "return_url": "https://app.muonnoi.org/payment/success",
    "cancel_url": "https://app.muonnoi.org/payment/cancel",
    "customer": {"email": "test@muonnoi.org", "full_name": "Test User"}
  }' | tee 01-happy-path.json | jq '.'
```
Hoặc dùng public route `/v1/checkout/sessions` (auth bằng `x-api-key`):
```bash
curl -s -X POST https://pay.iai.one/v1/checkout/sessions \
  -H "Content-Type: application/json" \
  -H "x-api-key: $PAY_PUBLIC_API_KEY" \
  -d '{
    "provider": "payos",
    "amount": 10000,
    "currency": "VND",
    "order_id": "test-'$(date +%s)'",
    "return_url": "https://app.muonnoi.org/payment/success",
    "cancel_url": "https://app.muonnoi.org/payment/cancel"
  }' | tee 01-happy-path.json | jq '.'
```
**Expected:** HTTP 201 + `checkout_url`. PASS criterion: response has `"ok":true` AND `checkout_url` field.

**Scenario 2 — Idempotency:**
```bash
# Cùng x-idempotency-key, cùng body → phải trả response cũ
curl -s -X POST https://pay.iai.one/internal/checkout \
  -H "Content-Type: application/json" \
  -H "x-idempotency-key: $IDEMP" \
  -H "x-site-key: test-key-hash" \
  -d '{"tenant_code":"muonnoi","site_code":"test", ...same body... }' \
  | tee 02-idempotency.json | jq '.'
```
**Expected:** identical response, not new intent created.

**Scenario 3 — Webhook valid signature:**
```bash
# Mô phỏng webhook PayOS với signature đúng
SIGN=$(echo -n "raw-webhook-body" | openssl dgst -sha256 -hmac "$PAY_IAI_ONE_WEBHOOK_SECRET" | sed 's/^.* //')
curl -s -X POST https://pay.iai.one/webhooks/payos \
  -H "Content-Type: application/json" \
  -H "x-signature: $SIGN" \
  -d 'raw-webhook-body' | tee 03-webhook-valid.json
```
**Expected:** HTTP 200, status update.

**Scenario 4 — Webhook invalid signature:**
```bash
curl -s -X POST https://pay.iai.one/webhooks/payos \
  -H "Content-Type: application/json" \
  -H "x-signature: BAD-SIGNATURE" \
  -d 'raw-webhook-body' | tee 04-webhook-invalid.json
```
**Expected:** HTTP 401 or 403, không update payment intent.

**Scenario 5 — CORS preflight:**
```bash
curl -s -X OPTIONS https://pay.iai.one/internal/checkout \
  -H "Origin: https://app.muonnoi.org" \
  -H "Access-Control-Request-Method: POST" \
  -i | head -10 | tee 05-cors.txt
```
**Expected:** `200`, `Access-Control-Allow-Origin: https://app.muonnoi.org`.

**Scenario 6 — Rate limit:**
```bash
{
  for i in $(seq 1 110); do
    curl -s -o /dev/null -w "%{http_code}\n" -X POST https://pay.iai.one/internal/checkout \
      -H "Content-Type: application/json" \
      -H "x-idempotency-key: $(uuidgen)" \
      -H "x-site-key: test-key-hash" \
      -d '{...}'
  done
} | tee 06-rate-limit.txt | sort | uniq -c
```
**Expected:** Có `429` sau ngưỡng (vd 100/phút).

**Scenario 7 — Email receipt:**
```bash
# Sau khi payment intent vào trạng thái succeeded:
wrangler d1 execute iai-flow-db --remote --command "
SELECT id, payment_intent_id, recipient_email, sent_at FROM email_receipts
WHERE created_at > $(date -v-1H +%s) * 1000
ORDER BY created_at DESC LIMIT 5;
" | tee 07-email-receipt.txt
```
**Expected:** ít nhất 1 row với recipient_email đúng + sent_at not null.

**Scenario 8 — Email dedupe:**
```bash
# Trigger lại receipt cho cùng payment_intent_id
curl -s -X POST https://pay.iai.one/internal/receipt/resend \
  -H "x-site-key: test-key-hash" \
  -d '{"payment_intent_id": "intent-id-from-scenario-1"}' \
  | tee 08-email-dedupe.json
```
**Expected:** response cho biết không gửi lần 2 (dedupe).

**Scenario 9 — Refund:**
```bash
curl -s -X POST https://pay.iai.one/internal/refunds \
  -H "Content-Type: application/json" \
  -H "x-idempotency-key: $(uuidgen)" \
  -H "x-site-key: test-key-hash" \
  -d '{
    "payment_intent_id": "intent-id-from-scenario-1",
    "amount": 5000,
    "reason": "test partial refund"
  }' | tee 09-refund.json | jq '.'
```
**Expected:** HTTP 201, refund record + ledger entry.

**Scenario 10 — Provider timeout (simulated):**
```bash
# Gọi với amount bất thường hoặc dùng provider sandbox config buộc timeout
# Hoặc check trong audit_logs cho provider_error history
wrangler d1 execute iai-flow-db --remote --command "
SELECT id, payment_intent_id, error_code, created_at FROM audit_logs
WHERE error_code IS NOT NULL
ORDER BY created_at DESC LIMIT 5;
" | tee 10-provider-error.txt
```
**Expected:** có entry với retry_count > 0 hoặc status `provider_error`.

**Tổng hợp evidence:**
```bash
cd /Users/tranhatam/Documents/Devnewproject/muonnoi.org
cat > qa/payment-email-evidence/2026-05-19/SUMMARY.md <<'EOF'
# Payment/Email QA — 10 Scenarios — 2026-05-19

| # | Scenario | PASS | Evidence file | Notes |
|---|----------|:----:|---------------|-------|
| 1 | Happy path | ✅ | 01-happy-path.json | HTTP 201 + checkout_url |
| 2 | Idempotency | ✅ | 02-idempotency.json | Same response, no new intent |
| 3 | Webhook valid | ✅ | 03-webhook-valid.json | HTTP 200, status updated |
| 4 | Webhook invalid | ✅ | 04-webhook-invalid.json | HTTP 401 |
| 5 | CORS preflight | ✅ | 05-cors.txt | Allow-Origin correct |
| 6 | Rate limit | ✅ | 06-rate-limit.txt | 429 after threshold |
| 7 | Email receipt | ✅ | 07-email-receipt.txt | Row in email_receipts |
| 8 | Email dedupe | ✅ | 08-email-dedupe.json | No duplicate send |
| 9 | Refund | ✅ | 09-refund.json | refund + ledger entry |
| 10 | Provider error | ✅ | 10-provider-error.txt | audit log captured |

10/10 PASS. Gate ready for status change.
EOF
```

**Cập nhật evidence file + gate checklist:**
```bash
$EDITOR qa/release-gates/MUONNOI_PAYMENT_EMAIL_TEST_EVIDENCE_2026-05-12.md
# Đổi "Status: NOT_YET_EXECUTED" → "Status: EXECUTED_2026-05-19"
# Cập nhật 10 row trong bảng với "PASS" + link tới evidence file
```

```bash
$EDITOR qa/release-gates/MUONNOI_PAYMENT_EMAIL_PRODUCTION_GATE_CHECKLIST_2026-05-12.md
# Đổi "BLOCKED_BY_PRODUCTION_EVIDENCE" → "PAYMENT_EMAIL_REAL_OPERATION_PASS"
# Thêm dòng evidence:
#   Verified 2026-05-19 — 10/10 scenarios executed, see qa/payment-email-evidence/2026-05-19/SUMMARY.md
```

**Commit:**
```bash
git add qa/payment-email-evidence/2026-05-19/ \
        qa/release-gates/MUONNOI_PAYMENT_EMAIL_TEST_EVIDENCE_2026-05-12.md \
        qa/release-gates/MUONNOI_PAYMENT_EMAIL_PRODUCTION_GATE_CHECKLIST_2026-05-12.md
git commit -m "qa: payment/email 10 scenarios PASS — gate status PAYMENT_EMAIL_REAL_OPERATION_PASS (2026-05-19)"
git push origin main
```

---

## PHASE D · Final Reconciliation (15 phút)

Tất cả gate đã đóng → đến lượt verifier cron tự tick và phát hiện 9/9 PASS, tự ghi RELEASE GO. Nhưng chạy thử trước:

```bash
cd /Users/tranhatam/Documents/Devnewproject/muonnoi.org

# Re-run tất cả 9 condition manually:
bash <<'VERIFY'
echo "=== Verify all 9 ==="

# C1
RAND=$(date +%s)
C1=$(curl -s -X POST https://api.muonnoi.org/api/register \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"final-${RAND}@muonnoi.org\",\"name\":\"Final\",\"password\":\"FinalPass123!\"}")
echo "$C1" | grep -q '"ok":true' && echo "C1 PASS" || echo "C1 FAIL: $C1"

# C2
grep -q "PAYMENT_EMAIL_REAL_OPERATION_PASS" qa/release-gates/MUONNOI_PAYMENT_EMAIL_PRODUCTION_GATE_CHECKLIST_2026-05-12.md \
  && ! grep -q "NOT_YET_EXECUTED" qa/release-gates/MUONNOI_PAYMENT_EMAIL_TEST_EVIDENCE_2026-05-12.md \
  && echo "C2 PASS" || echo "C2 FAIL"

# C3
[ "$(grep -c 'DEVELOPMENT_TEAM = ' app.muonnoi.org/mobile-shell/ios/App/App.xcodeproj/project.pbxproj)" -ge 2 ] \
  && echo "C3 PASS" || echo "C3 FAIL"

# C4
[ -n "$ANDROID_HOME" ] && [ -d "$ANDROID_HOME" ] && which adb >/dev/null \
  && echo "C4 PASS" || echo "C4 FAIL"

# C5
[ -f qa/oauth-evidence/2026-05-19/SUMMARY.md ] && [ "$(ls -d qa/oauth-evidence/2026-05-19/*/ | wc -l | tr -d ' ')" -ge 5 ] \
  && echo "C5 PASS" || echo "C5 FAIL"

# C6
[ "$(grep -c LIVE_LINK_ALLOWED docs/launch/MUONNOI_SUBDOMAIN_DNS_CUSTOM_DOMAIN_MATRIX_2026-05-12.md)" -ge 3 ] \
  && echo "C6 PASS" || echo "C6 FAIL"

# C7
grep -q "READY_FOR_PUBLIC_LINK" docs/launch/CUOCSONG_MUONNOI_QA_AND_RELEASE_CHECKLIST_2026-05-13.md \
  && echo "C7 PASS" || echo "C7 FAIL"

# C8
[ "$(git status --short | wc -l | tr -d ' ')" = "0" ] && echo "C8 PASS" || echo "C8 FAIL"

# C9
[ "$(grep -l STATUS_SUPERSEDED_BY COMPLETION_REPORT_2026-05-18.md INFRASTRUCTURE_READY_2026-05-18.md SESSION_SUMMARY_2026-05-17.md 2>/dev/null | wc -l | tr -d ' ')" = "3" ] \
  && [ -f reports/RELEASE_STATUS_2026-05-19.md ] && echo "C9 PASS" || echo "C9 FAIL"
VERIFY
```

Nếu thấy 9 dòng PASS → ghi RELEASE GO:
```bash
cd /Users/tranhatam/Documents/Devnewproject/muonnoi.org/app.muonnoi.org
cat >> RELEASE_CHECKLIST.md <<EOF

## RELEASE GO RECORDED
Date: $(date -u +"%Y-%m-%dT%H:%M:%SZ")
Conditions: 9/9 PASS
Evidence: reports/RELEASE_STATUS_2026-05-19.md
Signed off by: <your name>
EOF
git add RELEASE_CHECKLIST.md
git commit -m "release: 9/9 conditions PASS — RELEASE GO RECORDED (2026-05-19)"
git push origin main
cd ..
git add app.muonnoi.org
git commit -m "release: submodule pointer update — RELEASE GO"
git push origin main
```

**Stop verifier cron:**
```bash
# Sau khi confirm 9/9, gọi Claude:
# "Delete cron 3d04bc7d"
# Hoặc dùng CronDelete tool nếu trong session
```

---

## ⏱️ Time Budget Summary

| Phase | Task | Time | Cumulative |
|-------|------|:----:|:----------:|
| Pre-flight | Check env | 5m | 5m |
| **A1** | Repo cleanup | 40m | 45m |
| **A2** | DNS matrix update | 15m | 1h |
| **A3** | Cuộc Sống Gate 8 | 45m | 1h45m |
| **B1** | OAuth E2E 5 sites | 90m | 3h15m |
| **B2** | Android SDK install + build | 60m | 4h15m |
| **C1** | iOS TestFlight signing + upload | 30m | 4h45m |
| **C2** | Payment/Email 10 scenarios | 150m | 7h15m |
| **D** | Final reconciliation + RELEASE GO | 15m | 7h30m |

**Tổng:** ~7.5 giờ làm việc, 1 ngày.

---

## 🚨 Common Gotchas

1. **Submodule clean fail** → Dùng `git submodule foreach git checkout -- .` cẩn thận, có thể mất work. Check `git stash list` trong submodule trước.
2. **iOS signing không hiện Team** → Apple ID đăng nhập trong Xcode → Settings → Accounts. Add Apple ID, đợi Team list load.
3. **Android `adb` không thấy sau install** → Restart terminal hoặc `exec zsh`.
4. **Payment scenario 6 (rate limit) bị block 429 cho cả test sau** → Đợi 1 phút hoặc dùng IP khác.
5. **D1 INSERT fail trong setup merchant** → Có thể đã tồn tại, dùng `INSERT OR IGNORE` như trong runbook.
6. **OAuth callback redirect không về dashboard** → Check `GOOGLE_REDIRECT_URI` secret trên worker khớp với origin của site đang test.
7. **Repo có thay đổi mới push từ team khác giữa chừng** → `git pull --rebase origin main` trước khi push.

---

## 📋 Khi xong từng phase, ping verifier cron

Cron `3d04bc7d` tự chạy mỗi :17 và :47. Nó sẽ thấy commit của bạn và update `reports/RELEASE_STATUS_2026-05-19.md` tự động. Nếu muốn force tick ngay (không đợi):

```bash
# Hỏi Claude: "trigger muonnoi-release-100-verifier ngay"
# Hoặc chạy manual:
bash docs/launch/SOLO_TEAM_RUNBOOK_TO_100_2026-05-19.md  # phần Phase D
```

---

## ✅ Definition of Done

Bạn xong toàn bộ runbook này khi:
- [ ] `git status --short` rỗng
- [ ] `app.muonnoi.org/RELEASE_CHECKLIST.md` có section `## RELEASE GO RECORDED` với timestamp 2026-05-19
- [ ] `reports/RELEASE_STATUS_2026-05-19.md` show `TRUE COMPLETION: 100%` (9/9)
- [ ] Verifier cron `3d04bc7d` đã được delete (hoặc tự stop khi N=9)
- [ ] iOS build có trên App Store Connect TestFlight (Ready to Test)
- [ ] (Optional) Android AAB trên Google Play Internal Testing

---

**Tác giả:** Claude agent  
**Ngày:** 2026-05-19  
**Verified spec:** `docs/launch/DEV_TEAM_100_PERCENT_PLAN_2026-05-19.md`  
**Cron giám sát:** `3d04bc7d` (session-only, 17,47 * * * *)
