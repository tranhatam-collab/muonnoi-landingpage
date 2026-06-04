# MUONNOI · DEV TEAM 100/100 PLAN · 2026-05-19

> Bản hướng dẫn chi tiết để team dev hoàn tất release từ trạng thái thật hiện tại (≈75–80%) lên 100/100. Mỗi việc có owner, file, lệnh verify, và điều kiện đóng gate. Không claim ready cho đến khi có evidence.

---

## 0. Trạng thái thật ngày 2026-05-19

### Đã fix sau các báo cáo cũ
- ✅ **`POST /api/register`** trả `HTTP 201`, tạo user thật trên D1 (`api.muonnoi.org`). Verify:
  ```bash
  curl -s -X POST https://api.muonnoi.org/api/register \
    -H "Content-Type: application/json" \
    -d '{"email":"verify-'$(date +%s)'@muonnoi.org","name":"V","password":"VerifyPass123!"}'
  ```
- ✅ **DNS `cuocsong.muonnoi.org`** đã resolve Cloudflare, trả `HTTP 200`.
- ✅ **DNS `nguoiviet.muonnoi.org` + `www.nguoiviet.muonnoi.org`** đã resolve Cloudflare, không còn Wix.

### Còn lại — đây là 8 nhóm việc 100/100

| # | Nhóm | Owner | Priority | ETA |
|---|------|-------|----------|-----|
| 1 | Payment/Email Gate evidence | API + QA | P0 | 1–2 ngày |
| 2 | iOS TestFlight signing | Mobile + User | P0 | 1 ngày |
| 3 | Android SDK + build | Mobile + User | P1 | 1 ngày |
| 4 | Google OAuth E2E test evidence | Web + QA | P1 | 0.5 ngày |
| 5 | DNS matrix update tới `LIVE_LINK_ALLOWED` | Platform | P1 | 2 giờ |
| 6 | Cuộc Sống Muôn Nơi Gate 8 đóng | Web + Platform | P1 | 0.5 ngày |
| 7 | Repo cleanup (submodule + brand zip) | Release Owner | P1 | 1 giờ |
| 8 | Đồng bộ các report đang mâu thuẫn | Release Owner | P2 | 1 giờ |

---

## 1. Payment + Email Gate — P0

### State hiện tại
- File evidence: [`qa/release-gates/MUONNOI_PAYMENT_EMAIL_TEST_EVIDENCE_2026-05-12.md`](qa/release-gates/MUONNOI_PAYMENT_EMAIL_TEST_EVIDENCE_2026-05-12.md) → `NOT_YET_EXECUTED`.
- File gate: [`qa/release-gates/MUONNOI_PAYMENT_EMAIL_PRODUCTION_GATE_CHECKLIST_2026-05-12.md`](qa/release-gates/MUONNOI_PAYMENT_EMAIL_PRODUCTION_GATE_CHECKLIST_2026-05-12.md) → `BLOCKED_BY_PRODUCTION_EVIDENCE`.
- Worker: `pay.iai.one` báo `production_ready` + PayOS configured + 19/19 DB tables.
- Mâu thuẫn: report mới của tôi nói "ready", nhưng QA gate vẫn blocked vì chưa chạy 10 scenario thật.

### Việc cần làm

**API team** (`pay.iai.one/src/index.ts` + Muôn Nơi backend):
- [ ] Tạo `tenant` + `merchant_site` cho `muonnoi.org` qua D1 admin script.
- [ ] Issue `x-site-key` cho internal checkout từ Muôn Nơi.
- [ ] Triển khai endpoint từ `api.muonnoi.org` proxy sang `pay.iai.one/internal/checkout` với idempotency-key.
- [ ] Xác nhận webhook signature secret `PAY_IAI_ONE_WEBHOOK_SECRET` set trên cả 2 worker.

**QA team** chạy 10 scenario, log evidence vào file evidence (không phải vào DEVLOG):

| # | Scenario | Lệnh / hành động | Expected |
|---|----------|------------------|----------|
| 1 | Happy path | `POST /internal/checkout` với amount=10000 VND, PayOS | `201` + `checkout_url` |
| 2 | Idempotency | Gửi 2 lần cùng `x-idempotency-key` + body | Lần 2 trả response cũ, không tạo intent mới |
| 3 | Webhook valid | POST webhook PayOS với signature đúng | `200`, status update tới `succeeded` |
| 4 | Webhook invalid | POST webhook với signature sai | `401/403`, không update intent |
| 5 | CORS preflight | `OPTIONS` từ `https://app.muonnoi.org` | `200` + headers đúng |
| 6 | Rate limit | 100 request/phút từ 1 IP | `429` sau ngưỡng |
| 7 | Email receipt | Sau khi capture, kiểm `email_receipts` D1 | row + `email_delivery_evidence` |
| 8 | Email dedupe | Trigger lại receipt cùng `payment_intent_id` | Không gửi lần 2 |
| 9 | Refund | `POST /refunds/:id` với amount partial | `refund` record + ledger entry |
| 10 | Provider timeout | Mock PayOS 504 | Retry queue + `provider_error` status |

**Đóng gate khi**:
- Evidence file có 10 dòng evidence thật (timestamp + curl response hash).
- Production gate checklist chuyển sang `PAYMENT_EMAIL_REAL_OPERATION_PASS`.

---

## 2. iOS TestFlight Signing — P0

### State hiện tại
- File project: `app.muonnoi.org/mobile-shell/ios/App/App.xcodeproj/project.pbxproj`.
- Verify hiện: `grep DEVELOPMENT_TEAM project.pbxproj` → **không có**. Chỉ có `CODE_SIGN_STYLE = Automatic`.
- Build sim pass, nhưng release archive chưa thử.

### Việc cần làm

**User** (không thể automate):
- [ ] Lấy **Apple Developer Team ID** từ https://developer.apple.com/account → Membership.
- [ ] Có App Store Connect access, tạo App record với bundle id `org.muonnoi.app`.

**Mobile team**:
- [ ] Mở Xcode: `app.muonnoi.org/mobile-shell/ios/App.xcworkspace`.
- [ ] Target `App` → Signing & Capabilities → tick `Automatically manage signing` → chọn Team ID.
- [ ] Verify provisioning profile được tạo cho `org.muonnoi.app`.
- [ ] Build archive:
  ```bash
  cd app.muonnoi.org/mobile-shell/ios
  xcodebuild -workspace App.xcworkspace -scheme App \
    -configuration Release -archivePath ./build/App.xcarchive archive
  ```
- [ ] Upload TestFlight bằng `altool` hoặc Xcode Organizer.
- [ ] Submit cho Internal Testing trước, sau đó External Testing.

**Đóng gate khi**:
- TestFlight build status = `Ready to Test` cho ít nhất 1 internal tester.
- Update `app.muonnoi.org/RELEASE_CHECKLIST.md` với link App Store Connect + build number.

---

## 3. Android SDK + Build — P1

### State hiện tại
- `echo $ANDROID_HOME` → empty.
- `which adb` → not found.
- JDK 21 đã có.

### Việc cần làm

**User**:
- [ ] Tải Android Studio: https://developer.android.com/studio
- [ ] Cài SDK Platform 34 + Build Tools 34.0.0.
- [ ] Thêm vào `~/.zprofile`:
  ```bash
  export ANDROID_HOME=$HOME/Library/Android/sdk
  export PATH=$PATH:$ANDROID_HOME/platform-tools:$ANDROID_HOME/emulator:$ANDROID_HOME/cmdline-tools/latest/bin
  ```
- [ ] Reload shell: `source ~/.zprofile`. Verify: `adb version`.

**Mobile team**:
- [ ] Tạo keystore release:
  ```bash
  keytool -genkey -v -keystore muonnoi-release.keystore \
    -alias muonnoi -keyalg RSA -keysize 2048 -validity 10000
  ```
- [ ] Lưu keystore vào nơi an toàn (KHÔNG commit vào git).
- [ ] Cấu hình `android/app/build.gradle` với signing config từ `gradle.properties` (gitignored).
- [ ] Build:
  ```bash
  cd app.muonnoi.org/mobile-shell
  npm run build:android:release
  ```
- [ ] Upload `app-release.aab` lên Google Play Console Internal Testing track.

**Đóng gate khi**:
- AAB build pass, upload Play Console thành công.
- Internal testing track có ít nhất 1 tester nhận build.

---

## 4. Google OAuth End-to-End Test — P1

### State hiện tại
- Code đã deploy 5 site (theo DEVLOG).
- Chưa có evidence test thật: click button → consent → callback → session cookie → redirect.

### Việc cần làm

**QA team** (manual + screenshot):
- [ ] Mỗi site (5 site) thực hiện:
  1. Mở URL ở incognito browser.
  2. Click `Sign in with Google`.
  3. Verify redirect tới `accounts.google.com/o/oauth2/v2/auth` với client_id đúng.
  4. Login bằng test Google account.
  5. Verify callback `https://api.muonnoi.org/api/auth/google/callback` trả 302.
  6. Verify cookie `mn_session=...; HttpOnly; Secure; SameSite=Lax`.
  7. Verify redirect cuối tới dashboard của site đó.
  8. Verify `/api/me` trả `200` với user data.
  9. Logout, verify cookie clear.

- [ ] Screenshot từng bước, lưu vào `qa/oauth-evidence/2026-05-19/{site}/{step}.png`.
- [ ] Test dark mode toggle: button render đúng theme.
- [ ] Test mobile viewport (`< 768px`): button responsive.

**Web team**:
- [ ] Verify mỗi site có `<noscript>` fallback graceful.
- [ ] Verify CORS allowlist trên `api.muonnoi.org` có đủ 5 origin.

**Đóng gate khi**:
- File `qa/oauth-evidence/2026-05-19/SUMMARY.md` có 5×9 = 45 dòng evidence pass.
- Cập nhật `lamviec.muonnoi.org/DEVLOG.md` thay "Testing checklist" → "Tested 2026-05-19".

---

## 5. DNS Matrix Update — P1

### State hiện tại
- DNS thật: cuocsong, nguoiviet, www.nguoiviet đã resolve Cloudflare + HTTP 200.
- File matrix: [`docs/launch/MUONNOI_SUBDOMAIN_DNS_CUSTOM_DOMAIN_MATRIX_2026-05-12.md`](docs/launch/MUONNOI_SUBDOMAIN_DNS_CUSTOM_DOMAIN_MATRIX_2026-05-12.md) chưa update sang `LIVE_LINK_ALLOWED`.

### Việc cần làm

**Platform team**:
- [ ] Chạy verify suite:
  ```bash
  for d in cuocsong nguoiviet www.nguoiviet; do
    echo "=== $d.muonnoi.org ==="
    dig +short $d.muonnoi.org
    curl -sI https://$d.muonnoi.org/ | head -1
    curl -s https://$d.muonnoi.org/ | grep -o '<title>[^<]*</title>'
  done
  ```
- [ ] Verify Cloudflare Pages custom domain attached: `wrangler pages project list`.
- [ ] Update matrix file: status từ `DNS_NOT_CONFIGURED` / `WIX_PENDING` → `LIVE_LINK_ALLOWED`.
- [ ] Update [`docs/launch/MUONNOI_DNS_AND_SUBDOMAIN_EXECUTION_STATUS_2026-05-11.md`](docs/launch/MUONNOI_DNS_AND_SUBDOMAIN_EXECUTION_STATUS_2026-05-11.md) tương ứng.

**Đóng gate khi**:
- Matrix có ít nhất 3 subdomain ở `LIVE_LINK_ALLOWED` với evidence dig + curl timestamp.
- Public shell `www.muonnoi.org` có thể link tới `cuocsong` + `nguoiviet` mà không tạo dead-end.

---

## 6. Cuộc Sống Muôn Nơi Gate 8 — P1

### State hiện tại
- Source: `cuocsong.muonnoi.org/` (Cloudflare Pages project `cuocsong-muonnoi-org`).
- HTTP 200 live.
- Checklist: [`docs/launch/CUOCSONG_MUONNOI_QA_AND_RELEASE_CHECKLIST_2026-05-13.md`](docs/launch/CUOCSONG_MUONNOI_QA_AND_RELEASE_CHECKLIST_2026-05-13.md) → `IMPLEMENTATION_IN_PROGRESS_BLOCKED_ON_RELEASE_GATES`.

### Việc cần làm

**Web team** + **Content team**:
- [ ] Verify 4 route claim-safe (về văn hoá sống) đã render trên live domain:
  - `/` (homepage)
  - `/about/`
  - `/disclaimer/`
  - `/legal/privacy/`
- [ ] Verify metadata: title, description, OG tags, canonical, hreflang.
- [ ] Verify brand QA: không có forbidden words (`magic`, `guaranteed`, `instant`, `viral`).
- [ ] Verify accessibility: alt text, heading hierarchy, contrast.

**Platform team**:
- [ ] Update checklist: Gate 1–8 status → `PASS` với evidence dòng riêng từng gate.

**Web team** (sau khi Gate 8 PASS):
- [ ] Thêm `infoCard` từ homepage `www.muonnoi.org` link tới `cuocsong.muonnoi.org`.
- [ ] Update `apps/web/public/index.html` + sitemap.

**Đóng gate khi**:
- Checklist file chuyển sang `READY_FOR_PUBLIC_LINK`.
- Public shell có CTA tới cuocsong.

---

## 7. Repo Cleanup — P1

### State hiện tại (`git status --short`)
```
 M ai.muonnoi.org        ← submodule có change
 ? app.muonnoi.org       ← submodule untracked
 ? "muonnoi app"         ← thư mục lạ có space
 m muonnoi-ai            ← submodule modified
 m muonnoi-ai-machine    ← submodule modified
 m muonnoi-app           ← submodule modified
?? docs/brand/muonnoi-brand-system-final.zip   ← artifact zip
```

### Việc cần làm

**Release Owner**:

**Submodule pointer updates** — cho từng submodule có change:
- [ ] `ai.muonnoi.org`: vào submodule, `git status`, commit pending changes nội bộ, push, rồi update pointer ở repo cha.
- [ ] `app.muonnoi.org`: làm tương tự.
- [ ] `muonnoi-ai`, `muonnoi-ai-machine`, `muonnoi-app`: xác nhận đây là submodule hay junk directory. Nếu submodule, làm như trên. Nếu junk, gỡ bằng `git rm --cached`.

**Thư mục lạ**:
- [ ] `"muonnoi app"` (có space): rename hoặc xoá. Khả năng là thư mục build cũ.

**Brand zip**:
- [ ] `docs/brand/muonnoi-brand-system-final.zip`: quyết định
  - Nếu là deliverable: thêm `.gitattributes` LFS + commit.
  - Nếu là artifact tạm: thêm vào `.gitignore`.
- [ ] Recommendation: dùng LFS vì là deliverable cho design team.

**Verify**:
```bash
cd /Users/tranhatam/Documents/Devnewproject/muonnoi.org
git status --short
# Mục tiêu: output rỗng hoặc chỉ còn thay đổi đang thực sự được tracked
```

**Đóng gate khi**:
- `git status` clean (hoặc chỉ còn change có ý thức).
- `.gitignore` / `.gitattributes` cập nhật cho artifact.

---

## 8. Đồng bộ các Report Mâu Thuẫn — P2

### State hiện tại
Các file đang mâu thuẫn:
- [`COMPLETION_REPORT_2026-05-18.md`](COMPLETION_REPORT_2026-05-18.md) nói "Conditional GO 80%" + "Registration API blocked".
- [`INFRASTRUCTURE_READY_2026-05-18.md`](INFRASTRUCTURE_READY_2026-05-18.md) nói "Production-ready" cho payment.
- [`qa/release-gates/MUONNOI_PAYMENT_EMAIL_TEST_EVIDENCE_2026-05-12.md`](qa/release-gates/MUONNOI_PAYMENT_EMAIL_TEST_EVIDENCE_2026-05-12.md) nói `NOT_YET_EXECUTED`.
- Reality 2026-05-19: Registration API đã FIX, DNS đã LIVE, nhưng QA evidence chưa chạy.

### Việc cần làm

**Release Owner**:
- [ ] Tạo file `reports/RELEASE_STATUS_2026-05-19.md` (status thật hôm nay):
  - Registration API: ✅ FIXED + evidence curl
  - DNS: ✅ LIVE + dig output
  - Payment/Email: ❌ QA chưa chạy
  - iOS signing: ❌ Team ID chưa set
  - Android SDK: ❌ Chưa cài
  - OAuth E2E: ❌ Chưa test thật
- [ ] Đánh dấu các file cũ overstated:
  - Thêm dòng `STATUS_SUPERSEDED_BY: reports/RELEASE_STATUS_2026-05-19.md` vào đầu các file đó.
  - KHÔNG xoá để giữ history.
- [ ] Update `app.muonnoi.org/RELEASE_CHECKLIST.md` reflect trạng thái thật.
- [ ] Update `docs/launch/MUONNOI_MASTER_PLAN_STATUS_2026-05-11.md` thêm section `Update 2026-05-19`.

**Đóng gate khi**:
- Mỗi report chính có dòng `Last verified: timestamp` và `Verified by: <name/agent>`.
- Không còn file nào claim "ready" trong khi gate evidence vẫn `NOT_EXECUTED`.

---

## 📦 Lệnh Commit (sau khi từng nhóm xong)

### Sau khi Backend đóng Payment/Email Gate
```bash
git add qa/release-gates/MUONNOI_PAYMENT_EMAIL_TEST_EVIDENCE_2026-05-12.md \
        qa/release-gates/MUONNOI_PAYMENT_EMAIL_PRODUCTION_GATE_CHECKLIST_2026-05-12.md
git commit -m "qa: complete payment/email production gate evidence (10/10 scenarios)"
```

### Sau khi Mobile đóng iOS TestFlight
```bash
cd app.muonnoi.org
git add RELEASE_CHECKLIST.md mobile-shell/ios/App/App.xcodeproj/project.pbxproj
git commit -m "ios: configure TestFlight signing + record build evidence"
cd ..
git add app.muonnoi.org
git commit -m "submodule: update app.muonnoi.org pointer (iOS signing)"
```

### Sau khi Web đóng OAuth E2E
```bash
git add qa/oauth-evidence/2026-05-19/ lamviec.muonnoi.org/DEVLOG.md
cd lamviec.muonnoi.org && git add DEVLOG.md && git commit -m "qa: OAuth E2E tested for 5 sites" && cd ..
git commit -m "qa: add OAuth E2E test evidence for 5 sites"
```

### Sau khi Platform đóng DNS matrix
```bash
git add docs/launch/MUONNOI_SUBDOMAIN_DNS_CUSTOM_DOMAIN_MATRIX_2026-05-12.md \
        docs/launch/MUONNOI_DNS_AND_SUBDOMAIN_EXECUTION_STATUS_2026-05-11.md
git commit -m "platform: DNS matrix LIVE_LINK_ALLOWED for cuocsong + nguoiviet"
```

### Sau khi Web đóng Cuộc Sống Gate 8
```bash
git add docs/launch/CUOCSONG_MUONNOI_QA_AND_RELEASE_CHECKLIST_2026-05-13.md \
        apps/web/public/index.html apps/web/public/sitemap.xml
git commit -m "cuocsong: gate 8 closed + homepage CTA added"
```

### Sau khi Release Owner cleanup repo
```bash
git add .gitignore .gitattributes ai.muonnoi.org app.muonnoi.org muonnoi-ai muonnoi-ai-machine muonnoi-app
git commit -m "chore: repo cleanup — submodule pointers + brand zip via LFS"
```

### Sau khi đồng bộ reports
```bash
git add reports/RELEASE_STATUS_2026-05-19.md \
        COMPLETION_REPORT_2026-05-18.md \
        INFRASTRUCTURE_READY_2026-05-18.md \
        app.muonnoi.org/RELEASE_CHECKLIST.md \
        docs/launch/MUONNOI_MASTER_PLAN_STATUS_2026-05-11.md
git commit -m "release: reconcile status reports with real gate evidence (2026-05-19)"
```

### Push toàn bộ
```bash
git push origin main
# Mỗi submodule cũng push riêng nếu có thay đổi nội bộ
```

---

## ✅ Định nghĩa 100/100

Release được coi là **100/100 PASS** khi tất cả các điều kiện sau đồng thời đúng:

| # | Điều kiện | Verify command |
|---|-----------|---------------|
| 1 | `/api/register` trả 201 với user thật | `curl ... /api/register` → 201 |
| 2 | Payment/Email gate `PAYMENT_EMAIL_REAL_OPERATION_PASS` | grep status trong checklist file |
| 3 | iOS build trên TestFlight `Ready to Test` | App Store Connect link |
| 4 | Android build trên Play Console Internal Testing | Play Console link |
| 5 | OAuth E2E pass 5 site, có screenshot evidence | `ls qa/oauth-evidence/2026-05-19/` |
| 6 | DNS matrix có 3 subdomain `LIVE_LINK_ALLOWED` | grep matrix file |
| 7 | Cuộc Sống Gate 8 `READY_FOR_PUBLIC_LINK` | grep checklist file |
| 8 | `git status` clean trên main repo | `git status --short` → empty |
| 9 | Reports đã reconcile, không còn mâu thuẫn | `reports/RELEASE_STATUS_2026-05-19.md` exists + linked |

Khi cả 9 đều ✅: cập nhật `app.muonnoi.org/RELEASE_CHECKLIST.md` thành `RELEASE_GO_RECORDED_2026-XX-XX_with_evidence`.

---

## 🚦 Vai trò giám sát AI (Claude agent)

Trong mỗi cycle 20 phút sắp tới, AI agent sẽ:
1. Chạy verify command cho từng nhóm 1–8.
2. Cập nhật bảng status thật vào `reports/RELEASE_STATUS_2026-05-19.md`.
3. KHÔNG cho phép claim `READY`, `LIVE`, `PASS` cho bất kỳ gate nào nếu evidence command không có output match.
4. Khi 1 nhóm đóng xong, agent tự commit theo lệnh ở section "Lệnh Commit" ở trên.
5. Khi cả 9 điều kiện 100/100 đều pass, agent ghi `RELEASE_GO_RECORDED` và dừng cycle.

---

**Generated:** 2026-05-19  
**Verified by:** Claude agent (real curl/dig/grep, không từ memory)  
**Next action:** Backend team chạy 10 scenario payment/email evidence để đóng gate P0 đầu tiên.
