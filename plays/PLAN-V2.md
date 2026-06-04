# PLAYS.MUONNOI.ORG — Master Plan **V2** (2026–2028)
## The Muôn Nơi **Play Layer / Play OS**

> Tài liệu chiến lược **cho team dev** + founder. Bản này **bao trùm và nâng cấp** `PLAN.md` (V1).
> V1 vẫn đúng ở tầng kỹ thuật (3 game đã build, SDK, schema, API). V2 mở rộng **tầm nhìn**: từ "33 game arcade" → **Play Layer 5 tầng** kết nối game với **đời sống thật**.

---

## 0. TÓM TẮT ĐIỀU HÀNH (đọc trước)

| | |
|---|---|
| **Một câu định vị** | *"Hầu hết game cố giữ con người trong màn hình. Muôn Nơi dùng game để đưa con người **ra khỏi** màn hình."* |
| **Sản phẩm** | Không phải website game. Là **Play OS** — lớp giải trí · học tập · khám phá · cạnh tranh · cộng đồng · tích lũy **tín nhiệm** cho cả hệ Muôn Nơi. |
| **Cấu trúc** | **5 tầng game** (Micro → Life → Social → World → Civilization). |
| **Giai đoạn 1** | **33 game** chia **7 nhóm** (Mind/Creator/Social/Life/Exploration/Work/Exclusive) + **game 34–40** là nhóm IP mới có thể thành IP lớn. |
| **Lộ trình** | 100 game (Phase 1/2/3) + **AI Game Layer** (9 engine) → 33 game sinh **hàng triệu level**. |
| **Tiền tệ** | **MP (Muôn Nơi Points)** + **Life Credits**. KHÔNG mua bằng tiền, KHÔNG quy đổi tiền mặt. |
| **Đã làm (P0)** | 3 game Tier-1 chơi được, SDK guest/login, schema D1, 4 API, hub, fix triển khai subdomain. |
| **Việc dev ngay** | Mục **§14 Sprint** + **§12 sửa 522/SSO** + **§13 schema mở rộng**. |

> ⚠️ **Đính chính kỹ thuật quan trọng** (đọc kỹ §12): khuyến nghị "Build output directory = `plays`" **sẽ làm hỏng** tính năng lưu lịch sử & điểm, vì Pages **Functions chỉ deploy khi `functions/` nằm ở gốc output**. Giữ output `/`.

---

## 1. TRIẾT LÝ TRUNG TÂM

```
Game ↔ Cuộc sống thật
Game ↔ Con người thật
Game ↔ Giá trị thật
Game ↔ Hành trình thật

KHÔNG phải:  Game ↔ Màn hình
```

Ba trụ kế thừa từ `muonnoi.org` (proof-first · privacy-first · no ads/algorithm/manipulation, long-term > hype) được áp vào Play Layer:

1. **Proof-first** → hành động thật trong World/Civilization Games được **kiểm chứng** (proof), không tự khai khống.
2. **Privacy-first** → kết nối người thật (Social Games) **không lộ dữ liệu**, không bán dữ liệu/quảng cáo.
3. **Không thao túng** → không vòng quay đổi tiền, không loot-box cờ bạc, không infinite-scroll gây nghiện. "Không có điểm kết thúc" nghĩa là **đi mãi được**, không phải **bào mòn người chơi**.

> Nguyên tắc "không thắng được" được **chuẩn hóa**: **Infinite Games — không có *trạng thái thắng cuối cùng*, KHÔNG phải *người chơi luôn thua*.** (Như Cờ vua, Cờ vây, Tetris, Minecraft, Duolingo.) Mỗi game luôn có level/thử thách/leaderboard/AI-màn-mới.

> **Nguyên tắc bắt buộc bổ sung (V2.1):**
> 1. **Song ngữ Anh–Việt cho MỌI trò chơi** — nội dung, nút, phản hồi AI đều có EN + VI; có nút chuyển ngôn ngữ.
> 2. **Cổng tuổi:** game trẻ em **hỏi số tuổi** (cá nhân hoá); game **người lớn/doanh nhân yêu cầu ≥ 12 tuổi** (chặn dưới 12). Đã hiện thực trong SDK (`beginPlay(gameId, free, minAge)`) — xem `PLAN-ACCESS-COMPLIANCE.md`.

---

## 2. ĐỊNH VỊ KHÁC BIỆT

| | Roblox / Steam / Epic / Poki / CrazyGames | **Muôn Nơi Play Layer** |
|---|---|---|
| Mục tiêu | Giữ người chơi **trong** màn hình càng lâu càng tốt | **Đưa người chơi ra** đời thật |
| Tiền tệ | Đổi tiền thật / vật phẩm trả phí | MP + Life Credits — **không quy đổi tiền mặt** |
| Dữ liệu | Quảng cáo, hồ sơ hành vi | Privacy-first, proof-first, **không bán dữ liệu** |
| Thành tích | Điểm trong game | **Tín nhiệm + đóng góp thật** (học, dạy, giúp người, khám phá) |
| Cộng đồng | Ẩn danh, dễ độc hại | Người thật, có tín nhiệm, an toàn được kiểm soát |
| Kết thúc | "Phá đảo" | **Infinite** — hành trình không kết thúc |

→ Đây là **lợi thế gần như chưa nền tảng lớn nào lấy làm triết lý trung tâm.** Đó là "moat" của Muôn Nơi.

---

## 3. KIẾN TRÚC 5 TẦNG GAME

| Tầng | Tên | Thời lượng | Bản chất | Kiểm chứng | Ví dụ |
|---|---|---|---|---|---|
| **1** | **Micro Games** | 3–5 phút | HTML5 arcade, giải trí nhanh | không cần | Chạm Vô Cực, Mê Cung, Sisyphus *(đã build)* |
| **2** | **Life Games** | 10–30 phút | Game đời sống cá nhân (học, đọc, sức khỏe, phản tỉnh) | tự khai + bằng chứng nhẹ | Read A Book, Health Challenge, Daily Reflection |
| **3** | **Social Games** | nhiều phiên | Chơi **cùng người thật** | xác nhận đôi bên | Stranger Mission, Family Quest, Kindness Chain |
| **4** | **World Games** | ngày → tuần | **Đi ra thế giới thật** (địa điểm, văn hóa) | GPS/ảnh/đối tác, privacy-preserving | Hidden Đà Lạt, Vietnam Quest, Local Hero |
| **5** | **Civilization Games** | tháng → năm | **Kiến tạo cộng đồng thật** | proof + cộng đồng duyệt | Civilization Builder, Life Map, Future Self |

> Tầng càng cao → "gameplay ngoài đời" càng nhiều, "màn hình" càng ít. Tầng 4–5: **95% gameplay xảy ra ngoài đời**, app chỉ là **công cụ** (xem Game 40 Real World MMO).

---

## 4. 33 GAME GIAI ĐOẠN 1 — 7 NHÓM

> Đây là danh mục **chính thức V2** (thay framing arcade của V1; 3 game V1 đã build được ánh xạ vào Tier 1 — xem §6 mapping).

### NHÓM 1 · MIND GAMES (Tier 1–2)
1. **Infinite Labyrinth** — không mê cung nào giống nhau, AI tạo vô hạn. *(= "Mê Cung Muôn Lối" đã build)*
2. **Memory Architect** — xây & mở rộng trí nhớ.
3. **Pattern Hunter** — tìm quy luật ẩn.
4. **Future Prediction** — dự đoán xu hướng.
5. **Decision Tree** — ra quyết định, **không có đáp án tuyệt đối**.

### NHÓM 2 · CREATOR GAMES (Tier 2)
6. **One Minute Story** — viết truyện 60 giây.
7. **Infinite World Builder** — tạo thế giới.
8. **Character Evolution** — nuôi nhân vật.
9. **Design Challenge** — thiết kế.
10. **AI Co-Creator** — AI cùng sáng tạo.

### NHÓM 3 · SOCIAL GAMES (Tier 3)
11. **Stranger Mission** — làm quen người lạ (an toàn, có kiểm soát).
12. **Global Friend** — kết nối quốc tế.
13. **Family Quest** — nhiệm vụ gia đình *(nối `family.muonnoi.org`)*.
14. **Community Challenge** — nhiệm vụ cộng đồng.
15. **Kindness Chain** — chuỗi tử tế.

### NHÓM 4 · LIFE GAMES (Tier 2)
16. **Learn Something** — học điều mới *(nối `hoctap.muonnoi.org`)*.
17. **Read A Book** — đọc sách.
18. **Health Challenge** — sức khỏe.
19. **Daily Reflection** — nhật ký/phản tỉnh.
20. **Teach Someone** — dạy ai đó.

### NHÓM 5 · EXPLORATION GAMES (Tier 4)
21. **Hidden Đà Lạt** — khám phá Đà Lạt.
22. **Vietnam Quest** — khám phá Việt Nam.
23. **World Passport** — khám phá thế giới.
24. **Local Hero** — khám phá địa phương.
25. **Cultural Explorer** — khám phá văn hóa.

### NHÓM 6 · WORK GAMES (Tier 2–3)
26. **Startup Challenge** — khởi nghiệp *(nối `lamviec.muonnoi.org`)*.
27. **Business Simulator** — doanh nghiệp.
28. **Investor Journey** — nhà đầu tư.
29. **Team Builder** — xây đội nhóm.
30. **Mission Builder** — tạo dự án.

### NHÓM 7 · MUONNOI EXCLUSIVE (Tier 5 — khác biệt nhất)
31. **Life Map** — game cuộc đời: người chơi tự xây mục tiêu · kỹ năng · sức khỏe · gia đình · tài chính; AI tạo bản đồ phát triển.
32. **Future Self** — gặp chính mình tương lai; AI mô phỏng 1 / 5 / 10 năm.
33. **Civilization Builder** — game lớn nhất: không xây thành phố ảo mà xây **cộng đồng · trường học · doanh nghiệp · hệ sinh thái** để giải quyết **vấn đề thật**.

---

## 5. GAME 34–40 — NHÓM IP MỚI (tiềm năng IP lớn)

| # | Tên | Ý tưởng cốt lõi | Tầng | Điểm khác biệt |
|---|---|---|---|---|
| 34 | **Human Library** | Mỗi người là **một cuốn sách / một chương**; AI ghép người có câu chuyện phù hợp | 3 | Gần như **chưa có game nào như vậy** |
| 35 | **One Million Conversations** | Mục tiêu cộng đồng: **1 triệu cuộc trò chuyện thật** (không spam, không MXH) | 3 | Mục tiêu tập thể, đo bằng chất lượng |
| 36 | **World Family** | Gia đình toàn cầu, nối `family.muonnoi.org` | 3–4 | Kết nối xuyên biên giới |
| 37 | **Life Credits** | Điểm **không đo chơi game** mà đo: học · sáng tạo · giúp người · đóng góp | hệ điểm | Tách bạch khỏi MP (xem §8) |
| 38 | **Time Exchange** | Đổi **thời gian**: 1h dạy học ↔ 1h học nhạc | 3 | Kinh tế thời gian, không tiền |
| 39 | **Wisdom Market** | Mua bán **tri thức** (không bán dữ liệu, không quảng cáo) | 3 | Thị trường tri thức sạch |
| 40 | **Real World MMO** | MMO đầu tiên **95% gameplay ngoài đời**; app chỉ là công cụ | 4–5 | Hiện thực hóa triết lý trung tâm |

> 34–40 nên được **bảo vệ như IP**: đặt tên, mô tả thiết kế, sơ đồ luồng riêng trước khi công bố rộng.

---

## 6. LỘ TRÌNH 100 GAME & MAPPING V1↔V2

- **Phase 1**: 33 game (§4).
- **Phase 2** (34–66): + nhóm IP mới (§5) · Racing · Tower Defense · Card · Turn-based · RPG-lite · Space Sim · **AI Generated Missions**.
- **Phase 3** (67–100): MMO-lite · AI NPC World · **Infinite Quest Engine** · Community Games · Real World Quest Games.

**Mapping 3 game đã build (V1) → V2:** tất cả là **Tier 1 Micro Games** và vẫn dùng được làm "cổng vào" nhẹ:
- `me-cung-muon-loi` → tiền thân của **#1 Infinite Labyrinth** (nâng cấp: AI generator).
- `cham-vo-cuc`, `dinh-sisyphus` → thư viện Micro Games (giải trí nhanh, kéo người dùng mới).

> **Quyết định catalog:** `assets/catalog.js` hiện là **thư viện Tier-1**. Dev cần **bổ sung trường `tier`** và thêm danh mục V2 (33 + 34–40). Xem §13.

---

## 7. AI GAME LAYER (9 engine)

| Engine | Vai trò | Dùng cho |
|---|---|---|
| **AI Level Generator** | Sinh level vô hạn | Tier 1–2, Infinite Labyrinth |
| **AI Quest Generator** | Sinh nhiệm vụ vô hạn | Tier 2–5, Infinite Quest Engine |
| **AI NPC** | Nhân vật AI sống động | Real World MMO, World games |
| **AI Story Engine** | Câu chuyện vô hạn | Creator games, One Minute Story |
| **AI Coach** | Huấn luyện cá nhân | Life Games, Life Map |
| **AI Referee** | Trọng tài/kiểm chứng | World/Civilization, chống gian lận |
| **AI Translator** | Dịch tức thời | Social/World toàn cầu |
| **AI Reputation** | Đánh giá tín nhiệm | Toàn hệ thống điểm/social |
| **AI Companion** | Đồng hành | Future Self, Life Map |

> Sau giai đoạn đầu: **33 game** + AI Layer = có thể sinh **"33 triệu level"** mà không cần dev tay. Khuyến nghị dùng **Claude (claude-opus-4-8 / sonnet)** qua Workers; bật **prompt caching** cho mô tả game/luật để giảm chi phí.

---

## 8. HỆ ĐIỂM: MP + LIFE CREDITS

| | **MP — Muôn Nơi Points** | **Life Credits (LC)** |
|---|---|---|
| Đo gì | Hoạt động **trong** Play Layer (chơi, thành tích, sự kiện) | Giá trị **thật**: học · sáng tạo · giúp người · đóng góp |
| Nguồn | Trong game + nhiệm vụ | Ngoài game, có **kiểm chứng** |
| Dùng | Vật phẩm cosmetic, quest pass, access đặc biệt, **trao đổi P2P (MP↔MP)** | Tín nhiệm, mở khóa Civilization/World, ưu tiên cộng đồng |
| **Tuyệt đối KHÔNG** | mua bằng tiền · đổi ra tiền mặt · cổ phiếu · lợi nhuận | như MP — và **không** mua được bằng MP (chống "mua tín nhiệm") |

**Vật phẩm được bán bằng MP:** Badge · Avatar · Theme · Frame · Title · Effect · Quest Pass · Access đặc biệt.
**Sổ cái:** ghi kép (đã có `plays_point_ledger`); LC cần bảng riêng + **bắt buộc proof** (xem §13). Mọi quy đổi đều **một chiều vào** (earn), không có cổng ra tiền.

---

## 9. TÀI KHOẢN & SSO

```
muonnoi.org account  ──SSO──►  plays.muonnoi.org
        │
        └── auto-link 1 lần: tạo plays_profiles dùng chung users.id
```

- **Guest Mode**: 100% miễn phí; **không lưu** lịch sử/level/điểm/vật phẩm (chỉ localStorage tạm).
- **Member Mode**: lưu level · achievements · lịch sử · thời gian chơi · điểm · quest · badges.
- **SSO**: mọi thành viên `muonnoi.org` đăng nhập là tự có hồ sơ Play. *(Lưu ý cookie cross-subdomain — §12.)*

---

## 10. TÍCH HỢP HỆ SINH THÁI (AUDIT MUÔN NƠI)

> "Play Layer" chỉ khác biệt nếu **nối thật** với các sub khác. Bảng nối game ↔ hệ sinh thái:

| Sub-domain | Vai trò | Game/luồng nối |
|---|---|---|
| `muonnoi.org` | Hạt nhân: proof-first, tài khoản, tín nhiệm | SSO, MP/LC, proof của hành động thật |
| `hoctap.muonnoi.org` | Học tập | Learn Something, Read A Book, Teach Someone → LC |
| `lamviec.muonnoi.org` | Làm việc/nghề | Startup Challenge, Business Sim, Team Builder, Mission Builder |
| `family.muonnoi.org` | Gia đình | Family Quest, World Family |
| `nhachung.muonnoi.org` | Nhà chung/cộng đồng sống | Community Challenge, Kindness Chain, Civilization Builder |
| *Du lịch / Local* | Khám phá thực địa | Hidden Đà Lạt, Vietnam Quest, World Passport, Local Hero |
| *Life Quest OS* | Khung mục tiêu đời người | Life Map, Future Self (xương sống Tier 5) |

**Nguyên tắc tích hợp (bắt buộc):**
1. **Một tài khoản, một tín nhiệm** xuyên toàn hệ (AI Reputation dùng chung).
2. **Proof dùng lại**: bằng chứng học/làm/đóng góp ở sub khác → nguồn LC ở Play Layer (không nhập liệu trùng).
3. **Privacy-by-design**: World Games chỉ lưu **bằng chứng tối thiểu** (hash/ảnh có kiểm soát), không theo dõi vị trí liên tục.

---

## 11. AUDIT TỔNG THỂ & RỦI RO (phải xử lý trước khi mở Tier 3–5)

| Rủi ro | Vì sao nghiêm trọng | Biện pháp bắt buộc |
|---|---|---|
| **An toàn người thật** (Social/World) | Ghép người lạ, hẹn gặp ngoài đời | Xác minh tài khoản, đồng thuận đôi bên, báo cáo/chặn, không lộ liên hệ riêng, hướng dẫn an toàn, **không ghép trẻ vị thành niên với người lạ** |
| **Kiểm chứng hành động thật** | Dễ khai khống để farm điểm | AI Referee + proof + cộng đồng duyệt; LC chỉ ghi khi proof hợp lệ |
| **Pháp lý điểm** | MP/LC có thể bị hiểu là tiền/cờ bạc | **Tuyệt đối** không cổng ra tiền mặt, không vòng quay may rủi đổi giá trị; ghi rõ điều khoản |
| **Quyền riêng tư** | GPS/ảnh/quan hệ xã hội nhạy cảm | Privacy-first: thu tối thiểu, mã hóa, người dùng tự xóa được |
| **Gian lận điểm** | Bot, multi-account | Server-authoritative (đã có `plays_sessions`), rate-limit (đã có), thiết bị/đa tài khoản |
| **Sức khỏe tâm lý** | "Future Self", áp lực đời thật | Tông tích cực, không xếp hạng gây tổn thương, "Sisyphus hạnh phúc" |
| **Nội dung do người tạo** (Creator/Wisdom Market) | Spam, bản quyền, độc hại | Kiểm duyệt + AI + cộng đồng flag (tái dùng `flags` của muonnoi) |

> **Tuân thủ lõi muonnoi**: no ads · no ranking-algorithm thao túng · no behavioral manipulation. Play Layer **không được** vi phạm 3 điều này để tăng "engagement".

---

## 12. KIẾN TRÚC KỸ THUẬT & TRIỂN KHAI

**Cloud (khuyến nghị, tái dùng stack hiện có):**
- **Cloudflare Pages** — frontend tĩnh (hub + game HTML).
- **Pages Functions / Workers** — API (`/functions/api/...`).
- **D1** — database (đã có `users`, thêm `plays_*` + §13).
- **R2** — assets/ảnh proof.
- **Durable Objects** — leaderboard realtime, phòng chơi Social (Phase 2+).

### 🔧 Sửa lỗi 522 cho đúng (ĐÍNH CHÍNH audit)
**522 = Cloudflare không kết nối được origin / chưa có deployment hợp lệ — không phải DNS.** Cách đúng:
1. **Deployments tab**: phải có 1 deployment **Success (xanh)**. Nếu chưa → trigger deploy thủ công.
2. **Settings → Build**: Build command = *(trống)*; **Build output directory = `/`** (gốc repo) — **KHÔNG đặt `plays`**.
   - ❗ Vì sao **không** `plays`: Pages **chỉ deploy `functions/` khi nó nằm ở gốc output**. Đặt output = `plays` → **API biến mất** → mất lưu lịch sử & điểm (đúng tính năng cốt lõi). Ngoài ra link tuyệt đối sẽ lệch.
3. **Subdomain** `plays.muonnoi.org`: trỏ về **cùng project**, để file **`_redirects`** (ở gốc) ánh xạ `plays.*` → `/plays/*`, **đã loại trừ** `/functions` và `/api` (xem `_redirects`).
4. Đã đổi mọi đường dẫn asset trong `plays/` sang **tương đối** → chạy đúng dù mở ở `/` hay `/plays/`.

> Nếu vẫn muốn **project riêng cho plays**: phải **copy `functions/` vào gốc project đó** (hoặc dùng Workers riêng cho API) — nếu không sẽ chỉ chạy chế độ khách.

### 🔧 SSO cookie cross-subdomain (cần quyết — touches auth hiện có)
Cookie phiên hiện tại (`functions/api/util/session.ts → setCookie`) **không set `Domain`** ⇒ **host-only**, **không** chia sẻ sang `plays.muonnoi.org`. Để SSO thật:
- **Cách A (khuyến nghị):** đổi cookie thành `Domain=.muonnoi.org; Secure; SameSite=Lax`. ⚠️ Ảnh hưởng auth của site chính → cần founder/dev duyệt & test.
- **Cách B:** giữ host-only, làm **token handoff** qua redirect khi sang plays.
- **Cách C:** plays chạy guest-only trước, SSO làm sau.

*(SDK đã chuẩn bị: `loginUrl()` tự trỏ về apex khi ở subdomain.)*

---

## 13. MÔ HÌNH DỮ LIỆU MỞ RỘNG (D1)

Đã có (`scripts/plays-schema.sql`): `plays_profiles · plays_progress · plays_sessions · plays_point_ledger · plays_catalog`.

**Cần thêm cho V2 (P2+):**
```sql
-- Nhiệm vụ (Quest Engine) — Tier 2-5
plays_quests        (id, tier, type, title, spec_json, ai_generated, created_at)
plays_quest_runs    (id, user_id, quest_id, status, progress_json, started_at, completed_at)

-- Kiểm chứng hành động thật (proof) — Tier 4-5
plays_verifications (id, user_id, quest_run_id, kind, proof_ref, verifier, status, created_at)
                    -- kind: gps|photo|partner|community ; status: pending|verified|rejected

-- Life Credits (tách khỏi MP, BẮT BUỘC proof)
plays_life_credits  (id, user_id, delta, source, proof_id, reason, created_at)

-- Social/World
plays_social_links  (a_user, b_user, kind, status, created_at)   -- kết nối người thật, có đồng thuận
plays_items         (id, user_id, item_type, item_key, acquired_at) -- vật phẩm cosmetic mua bằng MP

-- catalog: thêm cột phân tầng
ALTER TABLE plays_catalog ADD COLUMN tier INTEGER DEFAULT 1;   -- 1..5
ALTER TABLE plays_catalog ADD COLUMN ecosystem TEXT;           -- sub-domain nối tới
```
> Bổ sung tương ứng API: `quests`, `verify`, `life-credits`, `social`. Giữ nguyên nguyên tắc server-authoritative + ghi kép cho mọi giá trị.

---

## 14. SPRINT CHO TEAM DEV (Definition of Done)

| Sprint | Thời lượng | Hạng mục | DoD |
|---|---|---|---|
| **S1** | 2 tuần | Landing/hub + **SSO** + User DB + **Points (MP)** | Thành viên muonnoi đăng nhập thấy hồ sơ Play, MP lưu D1, ledger chạy |
| **S2** | 2 tuần | **3 game đầu (Tier 1)** + bật API thật | 3 game đã có lưu tiến trình/điểm khi login; chống gian lận cơ bản |
| **S3** | 4 tuần | **+10 game** (ưu tiên Mind/Life/Creator Tier 1–2) + AI Level Generator (beta) | 13 game live; AI sinh level cho Infinite Labyrinth |
| **S4** | 8 tuần | **Đủ 33 game** + Quest Engine + Life Credits (proof) | 33 game; Tier 2–3 có quest + kiểm chứng |
| **S5** | 6 tháng | **100 game** + AI Levels đầy đủ + Marketplace + **MP Network** + Tier 4–5 (World/Civilization) | Real World MMO MVP; AI Referee; an toàn người thật đạt §11 |

**Đang ở đâu:** P0 xong (3 game Tier-1 + SDK + schema + 4 API + hub + fix triển khai). **Việc kế tiếp = S1–S2.**

---

## 15. VIỆC CẦN FOUNDER QUYẾT NGAY

1. **SSO cookie** (§12): chọn A/B/C? (Khuyến nghị A — `Domain=.muonnoi.org`, cần test site chính.)
2. **Catalog V2**: chốt dùng danh mục 7 nhóm (§4) làm chính thức? (Sẽ refactor `catalog.js` thêm `tier`.)
3. **Thứ tự build tiếp**: làm thêm **Micro Games Tier 1** (giữ đà ra mắt) hay nhảy sớm vào **1 flagship Tier 3–4** (chứng minh khác biệt "ra đời thật")?
4. **Tên tiền tệ**: chốt **MP** + **Life Credits** (V2) hay giữ "Muôn Điểm" (V1)?

---

*Phụ lục:* `PLAN.md` (V1) giữ nguyên cho chi tiết kỹ thuật P0; tài liệu này là nguồn sự thật **chiến lược**. Mọi mâu thuẫn → ưu tiên V2.
