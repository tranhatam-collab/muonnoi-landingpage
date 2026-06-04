# Cấu trúc Truy cập · Đồng ý · Đăng ký · Tuân thủ — cho Team Dev

> Tài liệu vận hành cho luồng: **đồng ý điều khoản → chơi thử miễn phí → cổng đăng ký → thành viên**.
> Đã hiện thực phần lớn ở P0; phần backend cần dev hoàn thiện (đánh dấu ⏳).

---

## 1. Luồng người chơi (đã hiện thực)

```
Mở game → bấm "Bắt đầu"
   │
   ├─ Chưa đồng ý điều khoản?  → [Modal Đồng ý]  (bắt buộc tick + bấm "Đồng ý & chơi")
   │
   ├─ Khách & còn lượt free?   → chơi, trừ 1 lượt (lưu localStorage)
   ├─ Khách & hết lượt free?   → [Modal Đăng ký] → register.html
   └─ Thành viên?              → chơi không giới hạn, lưu D1
```

- **Số lượt miễn phí**: cấu hình **mỗi game 3–5** qua hằng `FREE` trong file game + trường `free` trong `assets/catalog.js`.
  - Hiện tại: Chạm Vô Cực 5 · Đỉnh Sisyphus 5 · Mê Cung 4 · Thợ Săn Quy Luật 4 · Chuỗi Tử Tế 3.
- **Đồng ý điều khoản**: lưu `mnplays:consent = <TERMS_VERSION>` (localStorage). Đổi `TERMS_VERSION` trong `plays-sdk.js` ⇒ buộc đồng ý lại.

## 2. Điểm tích hợp trong code (đã có)

- `assets/plays-sdk.js`
  - `await MNPlays.beginPlay(gameId, free)` → `{allowed, reason, left}`. Tự hiện modal **đồng ý** rồi **đăng ký** khi cần. **Mọi game phải gọi hàm này khi người chơi bắt đầu** (đã gắn cho 5 game live).
  - `MNPlays.playsLeft(gameId, free)`, `MNPlays.ensureConsent()`, `MNPlays.registerUrl/termsUrl/privacyUrl()`.
- Trang: `terms.html` (Điều khoản & Miễn trừ), `privacy.html` (Quyền riêng tư), `register.html` (form đăng ký).
- Hub `index.html`: hiển thị "Còn X/N lượt miễn phí", trạng thái, mục lục theo tầng, link điều khoản/quyền riêng tư/đăng ký.

## 3. Backend (⏳ cần dev hoàn thiện)

- `functions/api/plays/register.ts` — nhận `{nickname, age, gender, email, phone, consent_version, parental}` → lưu `plays_registrations` (pending). **Đã có (fail-open).**
- `functions/api/plays/consent.ts` — ghi nhật ký đồng ý của thành viên. **Đã có.**
- `scripts/plays-schema-v2.sql` — bảng `plays_registrations`, `plays_consents`. **Chạy trong D1.**
- ⏳ **Hợp nhất sau xác nhận email**: hiện đăng ký chỉ tạo bản "pending". Khi người dùng hoàn tất **magic-email** (`/api/auth/request` → `/api/auth/callback`), dev cần:
  1. Đối chiếu `plays_registrations.email` ↔ `users.email`.
  2. Tạo/cập nhật `plays_profiles` (nickname) + (tuỳ chính sách) lưu age/gender/phone.
  3. Xoá hoặc đánh dấu bản pending đã dùng.
- ⏳ **Server-side enforcement (khuyến nghị)**: giới hạn lượt free hiện ở client (chống người dùng thường, không chống kẻ cố ý xoá localStorage). Nếu cần chặt hơn, đếm theo phiên/thiết bị/IP có giới hạn ở server.

## 4. ⚠️ Tuân thủ pháp lý (BẮT BUỘC rà soát trước khi公布)

- **Dữ liệu cá nhân**: thu thập email + **số điện thoại** + tuổi + giới tính ⇒ thuộc phạm vi **Nghị định 13/2023/NĐ-CP** (bảo vệ dữ liệu cá nhân). Cần: cơ sở pháp lý xử lý, thông báo xử lý dữ liệu, quyền truy cập/xoá, lưu trữ an toàn.
- **Trẻ vị thành niên**: nhiều bộ game nhắm 5–18 tuổi. Người **dưới tuổi quy định** cần **đồng ý của cha mẹ/người giám hộ** (đã có cờ `parental` + cảnh báo trong form/terms). **Khuyến nghị mạnh:** với trẻ nhỏ, **không bắt buộc số điện thoại**, có **bảng điều khiển phụ huynh** và giới hạn thời gian.
- **Miễn trừ trách nhiệm**: bản "miễn trừ toàn bộ" **không có hiệu lực tuyệt đối** — không thể loại trừ lỗi cố ý, gian lận, hay quyền luật định của người tiêu dùng/trẻ em. `terms.html` đã ghi đúng tinh thần "trong phạm vi pháp luật cho phép".
- **Quốc tế**: nếu có người dùng EU/US → cân nhắc GDPR/COPPA.
- ❗ Các tài liệu `terms.html`/`privacy.html` là **bản thảo vận hành, không thay thế tư vấn pháp lý** — pháp chế cần duyệt.

## 4b. Cổng tuổi (Age Gate) — đã hiện thực trong SDK

- Gọi: `await MNPlays.beginPlay(gameId, free, minAge)`.
  - `minAge = 0` → không hỏi tuổi (game phổ thông hiện tại).
  - `minAge = 12` → **game người lớn/doanh nhân**: bắt buộc hỏi tuổi; **chặn nếu < 12** (modal "Chưa đủ tuổi · Age restricted", song ngữ).
  - **Game trẻ em** "phải hỏi số tuổi": truyền `minAge = 1` (hỏi tuổi, không chặn) hoặc gọi `MNPlays.ensureAge(1)` trước khi chơi để cá nhân hoá nội dung.
- Tuổi lưu `mnplays:age` (localStorage, khách). Với thành viên, dev nên lấy tuổi từ hồ sơ (đăng ký đã thu thập) thay vì hỏi lại.
- **Quy ước cấu hình khi game lên `live`:** đặt `minAge` trong `catalog.js` (thêm trường `minAge`) và truyền vào `beginPlay`:
  - Bộ **Doanh nhân** (`PLAN-EDU-ENTREPRENEUR.md`), bộ **Người lớn** (`PLAN-EDU-ADULT.md`) → `minAge: 12`.
  - Bộ **Trẻ em** (song ngữ, sáng tạo/vẽ) → hỏi tuổi (`minAge: 1`) để cá nhân hoá.
- Modal cổng tuổi & chặn tuổi **song ngữ EN–VI** sẵn trong `plays-sdk.js`.

## 4c. Nguyên tắc SONG NGỮ (bắt buộc toàn Play Layer)

- **Mọi trò chơi phải song ngữ Anh–Việt** (nội dung, nút, phản hồi AI). Bộ doanh nhân/luật hiển thị **thuật ngữ chuyên ngành song song** để học từ vựng.
- Khuyến nghị kỹ thuật: mỗi chuỗi văn bản có cặp `{vi, en}` + nút chuyển ngôn ngữ; lưu lựa chọn ở `mnplays:lang`. (Sẽ bổ sung tiện ích i18n nhẹ trong SDK ở bước sau.)

## 5. Checklist trước khi rời "draft"

- [ ] Chạy `plays-schema-v2.sql` trên D1.
- [ ] Wire hợp nhất đăng ký ↔ magic-email (mục 3).
- [ ] Pháp chế duyệt `terms.html` + `privacy.html` (đặc biệt phần trẻ em & SĐT).
- [ ] Quyết định lưu PII (age/gender/phone) ở đâu & chính sách lưu trữ/xoá.
- [ ] (Tuỳ chọn) enforcement lượt free phía server.
