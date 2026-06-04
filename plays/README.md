# plays.muonnoi.org — Hướng dẫn dev nhanh

Nền tảng **Play Layer** của hệ sinh thái Muôn Nơi.

- 📌 **`PLAN-V2.md`** — **nguồn sự thật CHIẾN LƯỢC** (5 tầng game · 33 game/7 nhóm · game 34–40 · AI Layer · audit hệ sinh thái · sửa 522/SSO · sprint dev). **Đọc trước.**
- `PLAN.md` — kế hoạch kỹ thuật V1 (P0: 3 game · SDK · schema · API). Vẫn đúng ở tầng kỹ thuật.

### Thiết kế bộ game giáo dục/sáng tạo (thuyết minh, chưa code)
- `PLAN-EDU-BILINGUAL.md` — 10 game học **từ vựng song ngữ Anh–Việt** (trẻ 5–18), thang 10 cấp.
- `PLAN-EDU-ADULT.md` — 10 game **người lớn**: giao tiếp đối thoại + tư duy logic, căn bản → chuyên sâu.
- `PLAN-EDU-ENTREPRENEUR.md` — 10 game **doanh nhân** (chiến lược/kế hoạch/lập luận/sáng tạo + **1 game luật kinh doanh**), song ngữ, **≥12 tuổi**.
- `PLAN-KIDS-CREATIVE.md` — 10 game **sáng tạo & vẽ tự do** cho trẻ, ưu tiên điện thoại, dễ → tự do.
- `PLAN-MOONSHOT.md` — 10 game **nguyên bản "moonshot"** (mọi lứa tuổi), cơ chế AI-native + hào Muôn Nơi; nhóm IP tham vọng Phase 2–3.
- `PLAN-GENIUS.md` — 10 game **siêu trí tuệ** cho mọi người, đa dạng cách chơi (mỗi game một modality), AI adaptive giữ "flow".

### Vận hành: truy cập · đồng ý · đăng ký · tuân thủ
- `PLAN-ACCESS-COMPLIANCE.md` — luồng **đồng ý điều khoản → 3–5 lượt free → cổng đăng ký → thành viên**; điểm tích hợp code; **cờ tuân thủ pháp lý** (Nghị định 13/2023, trẻ em, miễn trừ trách nhiệm).
- Trang: `terms.html` (Điều khoản & Miễn trừ), `privacy.html` (Quyền riêng tư), `register.html` (đăng ký: biệt danh/tuổi/giới tính/email/SĐT).

## Cấu trúc

```
plays/
├─ PLAN.md            # kế hoạch tổng thể
├─ index.html         # Hub (liệt kê game theo catalog.js)
├─ assets/
│  ├─ plays.css       # design system
│  ├─ catalog.js      # danh mục 100 game (nguồn sự thật cho hub)
│  └─ plays-sdk.js    # MNPlays: đồng bộ tiến trình + điểm (guest/login)
└─ games/             # mỗi game = 1 file .html độc lập
   ├─ cham-vo-cuc.html        ✅ Phản xạ
   ├─ me-cung-muon-loi.html   ✅ Giải đố
   └─ dinh-sisyphus.html      ✅ Khéo léo/Timing

scripts/plays-schema.sql      # bảng D1: plays_profiles / progress / sessions / point_ledger / catalog
functions/api/plays/*.ts      # API: catalog, progress, points, link
functions/api/util/auth.ts    # getSessionUser + ensureProfile (auto-link)
```

## Chạy thử local
- Mở thẳng `plays/index.html` hoặc các file game bằng trình duyệt → chạy được ở **chế độ khách** (lưu localStorage).
- Hoặc `wrangler pages dev .` để có cả API D1.

## Bật backend (P1)
1. Chạy `scripts/plays-schema.sql` trong D1 console (sau `scripts/schema.sql`).
2. Đảm bảo **middleware auth** gắn `ctx.data.user` (xem `functions/_functions_disabled/_middleware.ts`).
   - Không bắt buộc: `util/auth.ts` tự verify cookie nếu middleware chưa gắn user.
3. Kiểm tra **base path API**: SDK gọi `/functions/api/...` (giống `admin.html`).
   Nếu routing Pages của bạn dùng `/api/...`, sửa hằng `API` trong `plays/assets/plays-sdk.js`.

## Thêm game mới
1. Thêm 1 dòng vào `WAVE1`/`ROADMAP_NAMES` trong `catalog.js` (đổi `status` thành `live`, set `file`).
2. Tạo `games/<id>.html` — copy khung từ 1 game có sẵn.
3. Game chỉ cần gọi:
   ```js
   await MNPlays.init();
   await MNPlays.loadProgress(GAME_ID);
   await MNPlays.saveProgress(GAME_ID, { status, level, score, state });
   await MNPlays.awardPoints(GAME_ID, amount, reason);
   ```
   SDK tự lo guest vs login, merge khi đăng nhập, offline fallback.

## Nguyên tắc thiết kế (bắt buộc với mọi game)
- **Không có màn cuối** — độ khó tăng tiệm cận vô hạn; người chơi đua kỷ lục cá nhân.
- **Minh bạch**: màn mở đầu ghi rõ "trò chơi không có điểm kết thúc".
- **Muôn Điểm**: không mua bằng tiền, không quy đổi tiền mặt. Server là nguồn sự thật điểm.
