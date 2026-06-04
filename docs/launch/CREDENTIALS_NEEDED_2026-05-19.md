# Credentials Cần Thu Thập — 2026-05-19

> 4 gate cuối (C2, C3, C4, C5) đang chờ credentials/access từ user/admin. File này liệt kê chính xác cái nào, từ đâu lấy, và mức ưu tiên. Khi có đủ, gọi runbook `SOLO_TEAM_RUNBOOK_TO_100_2026-05-19.md` Phase B + C.

Pre-flight đã verify hôm nay:
- ✅ OAuth 5 site đều live HTTP 200 (sau redirect): tramsaigon, nhachung, omdala, lamviec-login (→ `/vi-vn/login`), lamviec-register (→ `/vi-vn/register`)
- ✅ Android Homebrew package available: `brew install --cask android-commandlinetools` (build 14742923)
- ✅ Xcode 26.4 + altool + notarytool ready
- ✅ Project bundle id: `org.muonnoi.app`, signing style: Automatic (cần Team ID)
- ✅ pay.iai.one routes confirmed: `/v1/checkout/sessions`, `/internal/checkout-session`, `/v1/refunds`, `/v1/webhooks/payos/{id}`

---

## C5 · OAuth E2E Test (1.5 giờ) — KHÔNG cần credentials kỹ thuật

### Cần
- [ ] 1 Google account thật (real hoặc dedicated test account)
- [ ] Browser desktop (Chrome/Firefox incognito)
- [ ] Khả năng screenshot

### Khi bạn sẵn sàng
Mở runbook Phase B1. Tổng cộng 5 site × 9 step = 45 screenshots. ~90 phút.

### Đầu ra
- `qa/oauth-evidence/2026-05-19/SUMMARY.md` + 5 thư mục con
- C5 → PASS

---

## C4 · Android SDK (1 giờ) — KHÔNG cần credentials

### Cần
- [ ] Quyền sudo trên máy macOS (cho `brew install --cask`)
- [ ] ~3 GB disk space cho Android SDK + Platform 34

### Khi bạn sẵn sàng
```bash
brew install --cask android-commandlinetools
# Sau đó làm theo runbook Phase B2:
# - Set ANDROID_HOME, PATH
# - sdkmanager --install "platform-tools" "platforms;android-34" "build-tools;34.0.0"
# - sdkmanager --licenses
# - Test build: cd app.muonnoi.org/mobile-shell && npm run build:android:debug
```

### Đầu ra
- `$ANDROID_HOME` set, `adb` trong PATH
- Android AAB build pass (tạm thời debug build OK)
- C4 → PASS

---

## C3 · iOS TestFlight Signing (30 phút)

### Cần từ bạn
- [ ] **Apple Developer Team ID** (10 ký tự, vd `ABC1234XYZ`)
  - Lấy từ: https://developer.apple.com/account → Membership → Team ID
- [ ] Apple Developer Program subscription **active**
- [ ] Apple ID đã sign in trên Xcode (Xcode → Settings → Accounts)
- [ ] App Store Connect access tạo App record với bundle id `org.muonnoi.app` (nếu chưa có)

### Khi bạn cung cấp Team ID, tôi sẽ
1. Open project, set DEVELOPMENT_TEAM trong `project.pbxproj` (2 chỗ: Debug + Release)
2. Run `xcodebuild ... archive` (~5 phút)
3. Upload TestFlight bằng `altool` hoặc `notarytool`
4. Verify build appear trên App Store Connect → TestFlight
5. Commit + push submodule

### Đầu ra
- `grep -c "DEVELOPMENT_TEAM = " project.pbxproj` → 2
- TestFlight build status `Ready to Test` (sau 5–15 phút processing)
- C3 → PASS

---

## C2 · Payment/Email 10 Scenarios (2.5 giờ)

### Cần từ bạn (chọn 1 trong 2 hướng)

**Hướng A — Dùng config đang có trên `pay.iai.one`:**
- [ ] Confirm OK dùng PayOS production credentials (đã set sẵn trong worker secrets)
- [ ] D1 admin access (qua wrangler, cần `wrangler login` và account permission)
- [ ] `x-site-key` cho tenant `muonnoi`/site `test` (hoặc cho phép tôi tạo mới qua D1 admin)

**Hướng B — PayOS sandbox riêng:**
- [ ] PayOS sandbox client_id + api_key + checksum_key
- [ ] Set vào worker secrets riêng cho sandbox env
- [ ] Tạo dedicated sandbox tenant trong D1

### Thêm cần
- [ ] Test email inbox (Mailtrap, hoặc real `test@muonnoi.org` inbox access)
- [ ] Webhook secret để mô phỏng PayOS webhook (`PAY_IAI_ONE_WEBHOOK_SECRET` đã set trên worker)

### Khi bạn confirm hướng A/B + cung cấp access, tôi sẽ
1. Setup tenant + site + api_key qua D1 INSERT (nếu cần)
2. Chạy 10 scenario theo runbook Phase C2 (đã verify route chuẩn)
3. Lưu evidence vào `qa/payment-email-evidence/2026-05-19/`
4. Update QA gate file → `PAYMENT_EMAIL_REAL_OPERATION_PASS`
5. Commit + push

### Đầu ra
- 10 file JSON/txt evidence + 1 SUMMARY.md
- Gate checklist không còn `NOT_YET_EXECUTED` / `BLOCKED_BY`
- C2 → PASS

---

## ⚡ Đường ngắn nhất tới 9/9

Theo độ phụ thuộc credential, đề xuất thứ tự:

1. **C5 OAuth** (chỉ cần Google account) — 1.5 giờ
2. **C4 Android SDK** (chỉ cần disk + sudo) — 1 giờ
3. **C3 iOS** (cần Team ID) — 30 phút sau khi có ID
4. **C2 Payment** (cần access decision A/B) — 2.5 giờ sau khi có cred

Tổng: ~5.5 giờ làm việc. Với credentials đầy đủ, có thể song song C3 + C4 + C5 (3 luồng) trong 1.5 giờ rồi C2 sau đó.

---

## 📞 Bạn chỉ cần gửi tôi 4 thứ

Khi nhắn lại Claude, copy-paste theo template:

```
1. C5 OAuth: [ ] sẵn sàng test bằng tay / [ ] muốn tôi spawn browser automation
   Google test account: ___ (hoặc dùng real account của tôi)

2. C4 Android: [ ] OK chạy brew install / [ ] tôi sẽ tự cài

3. C3 iOS: Apple Developer Team ID = ___________  (10 chars)
   Hoặc: [ ] tôi sẽ tự configure trong Xcode rồi báo lại

4. C2 Payment:
   [ ] Hướng A — dùng config production hiện tại (chấp nhận risk dùng real PayOS)
   [ ] Hướng B — tạo sandbox riêng (cần thêm credentials)
   [ ] Hoãn — chỉ focus C3 + C4 + C5 trước, C2 sau
```

Khi bạn paste lại tôi sẽ execute ngay.

---

**Generated:** 2026-05-19 11:55 ICT
**Pre-flight verified by:** Claude agent (live curl + brew info + Xcode probe)
**Next user action:** Reply với template ở trên.
