> ⬆️ **Đã có bản chiến lược mới: [`PLAN-V2.md`](./PLAN-V2.md)** (Play Layer 5 tầng, game đưa con người ra đời thật, audit hệ sinh thái). Tài liệu V1 dưới đây giữ cho chi tiết kỹ thuật P0; mâu thuẫn → ưu tiên V2.

# Kế hoạch tổng thể — `plays.muonnoi.org`

> Nền tảng game giải trí nhỏ trong hệ sinh thái **Muôn Nơi / Muôn Nói**.
> Triết lý: *"Trò chơi để đi, không phải để thắng."* — Game thiết kế **không có điểm kết thúc tuyệt đối** (no absolute win), nhưng có **vô số level** và **nhiều thể loại**, tạo 100% bằng code (không tài sản bản quyền bên thứ ba).

---

## 0. Tóm tắt nhanh (TL;DR)

| Hạng mục | Quyết định |
|---|---|
| Subdomain | `plays.muonnoi.org` (Cloudflare Pages, cùng repo hoặc project riêng) |
| Số game công bố giai đoạn 1 | **33 game** (lớn + nhỏ) |
| Lộ trình tổng | **100 game** (đã đặt tên/đánh số sẵn) |
| Đã build hoàn chỉnh trong PR này | **3 game HTML** chạy được ngay |
| Chơi không cần tài khoản | ✅ — nhưng **không lưu** lịch sử (chỉ lưu tạm trên trình duyệt) |
| Chơi có tài khoản | ✅ — **lưu toàn bộ**: đã chơi / chưa chơi / đang chơi tới đâu |
| Liên kết tài khoản | Mọi thành viên `muonnoi.org` **tự động** có hồ sơ game (auto-link) |
| Cơ chế điểm | **Muôn Điểm (MĐ)** — tích lũy, nạp từ đóng góp thật, trao đổi nội bộ |
| Quy đổi tiền mặt | ❌ **Tuyệt đối không** — điểm không phải tiền, không rút, không bán ra tiền |
| "Không thắng được" nghĩa là gì | Không có màn cuối; độ khó tăng vô hạn (tiệm cận). Giá trị nằm ở **kỷ lục cá nhân + hành trình**, giống game arcade high-score. |

---

## 1. Triết lý thiết kế: "Không thắng được, nhưng đi mãi được"

Đây **không** phải cờ bạc và **không** phải game lừa người chơi. Nguyên tắc:

1. **Vô tận, không phải bất công.** Mỗi game có thể chơi giỏi hơn mãi: level cao hơn, điểm cao hơn, kỷ lục cá nhân. Nhưng **không tồn tại "màn cuối / chiến thắng tuyệt đối"** — độ khó tăng tiệm cận vô hạn (asymptotic difficulty). Người chơi luôn *tiến bộ* nhưng không bao giờ *về đích*.
2. **Minh bạch.** Ngay màn hình mở đầu mỗi game ghi rõ: *"Trò chơi này không có điểm kết thúc. Mục tiêu là vượt qua chính bạn của hôm qua."* Người chơi biết luật chơi.
3. **Phần thưởng là quá trình.** Giống Tetris, Flappy Bird, 2048, Sisyphus — niềm vui ở việc lập kỷ lục, không ở "phá đảo".
4. **Không bào mòn ví tiền.** Muôn Điểm **không mua bằng tiền mặt và không quy đổi ra tiền mặt**. Không có vòng quay may rủi đổi tiền. Đây là tiền-thưởng nội bộ (closed-loop reward), giống điểm tích lũy thành viên.

> Cách diễn đạt với người chơi (đưa lên UI): **"Đỉnh núi không có thật. Nhưng mỗi bước chân thì có."**

---

## 2. Phân loại thể loại (12 nhóm)

Mỗi nhóm đều áp dụng cơ chế "vô tận tiệm cận".

| # | Thể loại (VI) | Genre (EN) | Cơ chế "không thắng" |
|---|---|---|---|
| 1 | Phản xạ | Reflex / Reaction | Tốc độ tăng vô hạn |
| 2 | Trí nhớ | Memory | Chuỗi dài thêm mãi |
| 3 | Giải đố / Logic | Puzzle / Logic | Bàn cờ lớn dần |
| 4 | Né tránh / Sinh tồn | Dodge / Survival | Mật độ vật cản tăng |
| 5 | Canh thời gian | Timing | Cửa sổ canh hẹp dần |
| 6 | Nhịp điệu | Rhythm | BPM tăng dần |
| 7 | Khéo léo / Chính xác | Precision / Skill | Sai số cho phép nhỏ dần |
| 8 | Chiến thuật nhẹ | Casual strategy | Tài nguyên khan dần |
| 9 | Số học nhanh | Mental math | Thời gian trả lời ngắn dần |
| 10 | Quan sát / Tìm kiếm | Observation | Nhiễu loạn tăng dần |
| 11 | Kiên nhẫn / Thiền | Zen / Endurance | Không kết thúc theo thiết kế |
| 12 | May rủi có kỹ năng | Skill + luck | Kỳ vọng luôn < ngưỡng thắng |

---

## 3. Danh mục 100 game (đặt tên & đánh số)

> Trạng thái: **`live`** = đã build trong PR này · **`wave1`** = thuộc 33 game công bố giai đoạn 1 · **`roadmap`** = lộ trình 100.
> Danh sách máy-đọc nằm ở `plays/assets/catalog.js`. Bảng dưới là bản người-đọc.

### 3.1 — 33 game công bố giai đoạn 1 (Wave 1)

| # | Mã | Tên game | Thể loại | Trạng thái |
|---|---|---|---|---|
| 1 | `cham-vo-cuc` | Chạm Vô Cực | Phản xạ | **live ✅** |
| 2 | `me-cung-muon-loi` | Mê Cung Muôn Lối | Giải đố | **live ✅** |
| 3 | `dinh-sisyphus` | Đỉnh Sisyphus | Khéo léo / Timing | **live ✅** |
| 4 | `nho-mau` | Nhớ Màu | Trí nhớ | wave1 |
| 5 | `ne-sao-bang` | Né Sao Băng | Né tránh | wave1 |
| 6 | `go-nhip` | Gõ Nhịp | Nhịp điệu | wave1 |
| 7 | `nhanh-tay-le-mat` | Nhanh Tay Lẹ Mắt | Phản xạ | wave1 |
| 8 | `xep-vo-tan` | Xếp Vô Tận | Giải đố | wave1 |
| 9 | `bat-dom-dom` | Bắt Đom Đóm | Khéo léo | wave1 |
| 10 | `con-ran-dai` | Con Rắn Dài Mãi | Né tránh | wave1 |
| 11 | `toan-chop-nhoang` | Toán Chớp Nhoáng | Số học | wave1 |
| 12 | `tim-diem-khac` | Tìm Điểm Khác | Quan sát | wave1 |
| 13 | `canh-cua-hep` | Cánh Cửa Hẹp | Timing | wave1 |
| 14 | `tha-roi-tu-do` | Thả Rơi Tự Do | Khéo léo | wave1 |
| 15 | `bac-thang-troi` | Bậc Thang Trời | Né tránh | wave1 |
| 16 | `ghep-doi-tri-nho` | Ghép Đôi Trí Nhớ | Trí nhớ | wave1 |
| 17 | `vong-xoay-vo-tan` | Vòng Xoáy Vô Tận | Timing | wave1 |
| 18 | `bong-nay-mai` | Bóng Nảy Mãi | Khéo léo | wave1 |
| 19 | `mau-noi-tiep` | Màu Nối Tiếp | Trí nhớ | wave1 |
| 20 | `dat-bom-thien-than` | Dắt Bom Thiên Thần | Chiến thuật | wave1 |
| 21 | `lai-phi-thuyen` | Lái Phi Thuyền | Né tránh | wave1 |
| 22 | `chu-cai-bay` | Chữ Cái Bay | Phản xạ | wave1 |
| 23 | `can-bang-coc` | Cân Bằng Cọc | Khéo léo | wave1 |
| 24 | `sap-xep-so` | Sắp Xếp Số | Giải đố | wave1 |
| 25 | `noi-dien` | Nối Điện | Giải đố | wave1 |
| 26 | `nhin-thau-mau` | Nhìn Thấu Màu (Stroop) | Quan sát | wave1 |
| 27 | `nhip-tim` | Nhịp Tim | Nhịp điệu | wave1 |
| 28 | `giot-nuoc-cuoi` | Giọt Nước Cuối | Thiền | wave1 |
| 29 | `bay-chim-giay` | Bầy Chim Giấy | Né tránh | wave1 |
| 30 | `tung-hung` | Tung Hứng | Khéo léo | wave1 |
| 31 | `mat-ma-anh-sang` | Mật Mã Ánh Sáng | Trí nhớ | wave1 |
| 32 | `do-xuc-xac-tien-tri` | Đố Xúc Xắc Tiên Tri | May rủi + kỹ năng | wave1 |
| 33 | `thien-ha-co` | Thiên Hà Cờ | Chiến thuật | wave1 |

### 3.2 — Lộ trình mở rộng tới 100 (Wave 2 → 4: `roadmap`)

> Đầy đủ trong `catalog.js`. Nhóm chủ đề: **Dân gian Việt** (ô ăn quan biến thể, đập niêu, bịt mắt bắt dê...), **Thiên nhiên** (mưa sao băng, thủy triều, mùa...), **Vũ trụ**, **Chữ & ngôn ngữ**, **Âm thanh**, **Co-op nhẹ** (chơi cùng người khác qua điểm). Game #34 → #100 đặt tên sẵn để team dev nhận build theo sprint.

---

## 4. Kiến trúc kỹ thuật

### 4.1 Tổng quan (tái dùng stack hiện có)

```
plays.muonnoi.org  (Cloudflare Pages)
│
├─ Tĩnh (static, CDN):  /plays/index.html  +  /plays/games/*.html  +  /plays/assets/*
│
└─ API (Pages Functions, TypeScript):  /functions/api/plays/*
   ├─ catalog.ts     → danh mục game (đọc công khai)
   ├─ progress.ts    → lưu/đọc tiến trình (cần đăng nhập)
   ├─ points.ts      → ví Muôn Điểm: số dư, lịch sử, kiếm điểm
   └─ link.ts        → auto-link tài khoản muonnoi.org ↔ hồ sơ game
        │
        ├─ D1 (DB)    → bảng plays_* (xem scripts/plays-schema.sql)
        └─ Session    → tái dùng cookie HMAC + middleware hiện có
```

**Vì sao chung repo/stack?** Đã có sẵn auth magic-email, session cookie HMAC, D1, middleware fail-open. Game chỉ cần thêm vài bảng và 4 endpoint → **mọi thành viên muonnoi.org đăng nhập là tự động có hồ sơ game** (cùng `users.id`). Đây chính là yêu cầu "tất cả thành viên đăng ký đều được link trực tiếp".

> Triển khai subdomain: trong Cloudflare Pages, gắn custom domain `plays.muonnoi.org` trỏ về cùng project (hoặc project riêng cùng D1 binding). Có thể dùng `_redirects` để map `plays.muonnoi.org/*` → `/plays/*`.

### 4.2 Khách (chưa đăng nhập) vs Thành viên

| | Khách (guest) | Thành viên (đã đăng nhập) |
|---|---|---|
| Chơi tất cả game | ✅ | ✅ |
| Lưu kỷ lục/level | Chỉ `localStorage` (mất khi xóa trình duyệt/đổi máy) | **D1, vĩnh viễn, đa thiết bị** |
| Lịch sử: đã/đang/chưa chơi | ❌ | ✅ |
| Tiếp tục đúng chỗ đang dở | Chỉ trên cùng trình duyệt | ✅ mọi thiết bị |
| Ví Muôn Điểm | ❌ (điểm tạm, không cộng dồn) | ✅ |
| Trao đổi điểm | ❌ | ✅ |

**SDK đồng bộ** (`plays/assets/plays-sdk.js`) là lớp trừu tượng duy nhất game gọi tới. Nó tự động:
- Gọi `/functions/api/auth/me` để biết đã đăng nhập chưa.
- Nếu **có** đăng nhập → đọc/ghi tiến trình & điểm qua API (D1).
- Nếu **chưa** → fallback `localStorage`, và hiện gợi ý *"Đăng nhập để lưu tiến trình & nhận Muôn Điểm"*.
- Khi khách đăng nhập sau đó → **gộp (merge)** kỷ lục local lên tài khoản (lấy max level/score).

### 4.3 Chống gian lận (server-authoritative)

- Điểm số gửi lên kèm **token phiên chơi** ký HMAC (mở phiên khi bắt đầu, đóng khi kết thúc) → chống chỉnh điểm thô.
- Giới hạn tần suất kiếm điểm theo game/ngày (rate limit ở `points.ts`).
- Các mức điểm "đáng kể" cần kiểm tra hợp lý server-side (thời lượng tối thiểu, tốc độ tăng level hợp lệ).
- Nhành vi bất thường → cờ `flagged`, không cộng điểm, không khóa người dùng tự động.

---

## 5. Cơ chế điểm — "Muôn Điểm (MĐ)"

### 5.1 Bản chất
- **Closed-loop reward currency.** Không phải tiền, không phải tài sản số có thể rút.
- **KHÔNG mua bằng tiền mặt. KHÔNG quy đổi ra tiền mặt. KHÔNG rút.** (Ghi rõ trong điều khoản & UI → tránh rủi ro pháp lý cờ bạc/ví điện tử.)

### 5.2 Nguồn điểm (kiếm — "earn")
1. **Chơi game**: theo level đạt được, mốc kỷ lục mới, "near-miss" (suýt qua).
2. **Chuỗi ngày (streak)**: vào chơi mỗi ngày.
3. **Thử thách (challenge)**: nhiệm vụ ngày/tuần.
4. **Nạp từ đóng góp thật trong hệ sinh thái Muôn Nơi**: hành động đóng góp có ích trong các "game thực tế" / hoạt động cộng đồng của muonnoi.org (đăng bài có proof, được duyệt, đóng góp kiểm chứng...) → quy ra MĐ. *Đây là "nạp điểm" — nạp bằng đóng góp, không bằng tiền.*

### 5.3 Tiêu & trao đổi (spend / trade)
- **Trao đổi nội bộ P2P**: tặng/chuyển điểm giữa thành viên (`points.ts` → giao dịch ghi sổ kép, có hạn mức chống rửa-điểm).
- **Mở khóa**: skin, theme, thử thách đặc biệt, "đèn gợi ý", lượt chơi bonus.
- **Bảng vinh danh**: dùng điểm để vào giải đấu kỷ lục theo mùa.

### 5.4 Sổ cái (ledger)
- Mọi thay đổi số dư = một bản ghi `plays_point_ledger` (kép: from→to). Số dư = tổng sổ cái (nguồn sự thật), không sửa trực tiếp.

---

## 6. Mô hình dữ liệu (D1)

Chi tiết ở `scripts/plays-schema.sql`. Tóm tắt bảng:

- `plays_profiles` — hồ sơ game 1–1 với `users.id` (auto-tạo khi đăng nhập lần đầu).
- `plays_progress` — tiến trình mỗi (user, game): trạng thái (chưa/đang/đã), level cao nhất, điểm cao nhất, state JSON "đang chơi dở", thời điểm.
- `plays_sessions` — phiên chơi (mở/đóng) để chống gian lận điểm.
- `plays_point_ledger` — sổ cái Muôn Điểm (ghi kép).
- `plays_catalog` — (tùy chọn) danh mục server-side; giai đoạn đầu có thể đọc tĩnh từ `catalog.js`.

---

## 7. Lộ trình triển khai (phases)

| Phase | Nội dung | Trạng thái |
|---|---|---|
| **P0** | Plan + 3 game HTML + SDK + schema + API stubs + hub | **PR này** |
| **P1** | Bật D1 bảng `plays_*`, nối API thật, auto-link tài khoản | Dev team |
| **P2** | Hoàn thiện 30 game còn lại của Wave 1 (33 tổng) | Dev team |
| **P3** | Ví Muôn Điểm đầy đủ + trao đổi P2P + chống gian lận | Dev team |
| **P4** | Nạp điểm từ đóng góp hệ sinh thái + bảng vinh danh mùa | Dev team |
| **P5** | Mở rộng tới 100 game (Wave 2–4) | Dev team |

---

## 8. Bàn giao trong PR này (P0)

```
plays/
├─ PLAN.md                     ← tài liệu này
├─ README.md                   ← hướng dẫn dev nhanh
├─ index.html                  ← Hub: hiển thị 33 game (3 chơi được, 30 "sắp ra")
├─ assets/
│  ├─ plays.css                ← design system (đồng bộ muonnoi)
│  ├─ catalog.js               ← danh mục 100 game (máy đọc)
│  └─ plays-sdk.js             ← lớp đồng bộ tiến trình + điểm (guest/login)
└─ games/
   ├─ cham-vo-cuc.html         ← Game 1 — Phản xạ (HOÀN CHỈNH)
   ├─ me-cung-muon-loi.html    ← Game 2 — Giải đố mê cung (HOÀN CHỈNH)
   └─ dinh-sisyphus.html       ← Game 3 — Khéo léo/Timing (HOÀN CHỈNH)

scripts/plays-schema.sql        ← schema D1 cho plays_*
functions/api/plays/*.ts        ← 4 endpoint (stub có chú thích, sẵn nối D1)
```

3 game chạy được ngay khi mở file (offline, lưu localStorage) **và** tự đồng bộ tài khoản khi deploy cùng API.
