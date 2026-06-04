# 📣 THÔNG BÁO BÀN GIAO — Tự động hoàn thành Play Layer (`plays.muonnoi.org`)

**Gửi:** Team Dev · **Branch:** `claude/plays-muonnoi-game-platform-GdiIW` · **PR #1 (draft)**

Toàn bộ **kế hoạch + nền tảng khung + 5 game mẫu** đã sẵn sàng. Nhiệm vụ: **tự động hoàn thiện** theo các tài liệu dưới đây. Mọi quyết định kiến trúc, thiết kế game, cơ chế điểm, tuân thủ pháp lý **đều đã chốt trong file** — đọc rồi triển khai, không cần đợi thêm.

## 1. Đọc theo thứ tự
1. `plays/README.md` — bản đồ toàn dự án.
2. `plays/PLAN-V2.md` — chiến lược 5 tầng (nguồn sự thật) + nguyên tắc bắt buộc (song ngữ EN–VI, cổng tuổi).
3. `plays/PLAN-ACCESS-COMPLIANCE.md` — luồng đồng ý → 3–5 lượt free → đăng ký; **cổng tuổi**; **cờ tuân thủ pháp lý** (NĐ 13/2023, trẻ em).
4. `plays/PLAN.md` — chi tiết kỹ thuật P0 (SDK/schema/API).

## 2. Khung đã có — TÁI DÙNG, đừng viết lại
- **Frontend nền:** `plays/index.html` (hub/mục lục), `plays/assets/plays.css`, `plays/assets/plays-sdk.js` (lớp tích hợp: tiến trình, điểm, **đồng ý**, **lượt free**, **cổng tuổi**), `plays/assets/catalog.js` (catalog), `plays/assets/collections.js` (6 bộ Học viện).
- **Trang pháp lý/đăng ký:** `plays/terms.html`, `plays/privacy.html`, `plays/register.html`.
- **5 game mẫu (tham chiếu khi build game mới):** `plays/games/cham-vo-cuc.html`, `me-cung-muon-loi.html`, `dinh-sisyphus.html`, `thuo-san-quy-luat.html`, `chuoi-tu-te.html`.
- **Backend (Pages Functions):** `functions/api/plays/{catalog,progress,points,link,register,consent}.ts`, `functions/api/util/auth.ts`.
- **DB:** `scripts/plays-schema.sql` + `scripts/plays-schema-v2.sql` (chạy trong D1, sau `scripts/schema.sql`).
- **Routing:** `_redirects` (subdomain → /plays, đã loại trừ /functions, /api).

## 3. Việc cần hoàn thành (theo tài liệu nguồn)
| Hạng mục | Nguồn thiết kế | Ghi chú |
|---|---|---|
| 33 game Giai đoạn 1 (catalog) | `PLAN-V2.md` + `assets/catalog.js` | còn 28 game (đã có 5 live) |
| 7 game IP mới (34–40) | `PLAN-V2.md §5` | Phase 2 |
| Bộ Song ngữ (10) | `PLAN-EDU-BILINGUAL.md` | trẻ 5–18, hỏi tuổi |
| Bộ Sáng tạo/Vẽ (10) | `PLAN-KIDS-CREATIVE.md` | ưu tiên cảm ứng |
| Bộ Siêu trí tuệ (10) | `PLAN-GENIUS.md` | AI adaptive |
| Bộ Giao tiếp & Logic (10) | `PLAN-EDU-ADULT.md` | **≥12 tuổi** |
| Bộ Doanh nhân (10) | `PLAN-EDU-ENTREPRENEUR.md` | **≥12**, có game Luật |
| Bộ Moonshot (10) | `PLAN-MOONSHOT.md` | IP tham vọng |
| Backend D1 thật + auto-link | `PLAN.md`, `PLAN-ACCESS-COMPLIANCE.md` | nối SSO muonnoi |
| Nối đăng ký ↔ magic-email | `PLAN-ACCESS-COMPLIANCE.md §3` | ⏳ bắt buộc |
| Ví Muôn Điểm + Life Credits | `PLAN-V2.md §8` | không quy đổi tiền |

## 4. QUY TẮC BẮT BUỘC (không vi phạm)
1. **Mọi game song ngữ Anh–Việt.**
2. **Cổng tuổi:** game trẻ em hỏi tuổi; game người lớn/doanh nhân chặn < 12 (`MNPlays.beginPlay(gameId, free, minAge)`).
3. **Mỗi game 3–5 lượt free → buộc đăng ký**; gọi `MNPlays.beginPlay()` khi bắt đầu.
4. **Muôn Điểm KHÔNG quy đổi tiền mặt.** Server là nguồn sự thật điểm (ghi kép).
5. **Không có "màn cuối"** — game vô tận, đua kỷ lục.
6. **Pháp chế phải duyệt** `terms.html` + `privacy.html` trước khi公布 (đặc biệt trẻ em & SĐT).

## 5. Cách thêm 1 game mới (chuẩn)
1. Thêm mục vào `assets/catalog.js` (id, n, en, group, tier, status:'live', file, free, minAge).
2. Tạo `plays/games/<id>.html` — copy khung 1 game mẫu; gọi `MNPlays.init/beginPlay/saveProgress/awardPoints`.
3. Kiểm tra: build Cloudflare Pages phải **xanh** (giữ output `/`, không phải `plays`).

> **Quan trọng (tránh lặp lỗi 522):** Build output directory = `/` (gốc repo). KHÔNG đặt `plays` (sẽ mất `functions/` → mất API). Mọi đường dẫn asset trong `plays/` dùng tương đối.

— Hết. Mọi chi tiết nằm trong các file `plays/PLAN-*.md`.
