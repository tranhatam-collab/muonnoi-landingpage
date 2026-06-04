# Bộ 10 Game **Sáng Tạo & Vẽ Tự Do** cho Trẻ Em
## Ưu tiên điện thoại (cảm ứng) · máy tính vẫn dùng tốt · Từ dễ → khó → sáng tạo thoải mái

> Tài liệu **thiết kế/thuyết minh** (không kèm code). Thuộc Play Layer của Muôn Nơi —
> nhóm **Creator Games (Tier 1–2)**, nối `family.muonnoi.org` & `hoctap.muonnoi.org`.
> Tinh thần phù hợp trọn vẹn triết lý Muôn Nơi: **sáng tạo không có "thắng/thua", chỉ có hành trình** —
> trọng *quá trình* hơn *sản phẩm*, không phán xét, ai cũng vẽ được.

---

## 0. TÓM TẮT

- **10 game** từ **có hướng dẫn nhiều** (tô màu, nối chấm) → **bán tự do** (ghép hình, đối xứng, vẽ hoàn thành) → **tự do hoàn toàn** (xưởng sáng tạo, kể chuyện, hoạt hình).
- **Ưu tiên điện thoại**: nút to, vẽ bằng ngón, chống chạm nhầm lòng bàn tay, hoàn tác dễ, tự lưu. Máy tính dùng chuột/bút cảm ứng vẫn mượt.
- **Không có trạng thái "thua"**: không đếm giờ gây căng thẳng, không "sai" — chỉ khích lệ. (Sáng tạo cần an toàn tâm lý.)
- **Dùng chung một "xưởng vẽ" (Canvas Engine)**: cọ, tô, lớp nhẹ, dán hình, đối xứng, lưu, xuất — mọi game là một "cửa" vào cùng bộ công cụ.
- **Tuổi:** 3–12 là chính (mở rộng tới 15+ ở chế độ tự do). Độ khó tự giãn theo tuổi.

---

## 1. TRIẾT LÝ (vì sao bộ game này nuôi sáng tạo thật)

| Nguyên lý | Áp dụng |
|---|---|
| **Quá trình > sản phẩm** | Thưởng cho việc *làm* và *thử*, không chấm "đẹp/xấu". |
| **Giàn giáo dần buông** (scaffolding → freedom) | Bắt đầu nhiều hướng dẫn (viền, chấm, nét mờ) rồi **gỡ dần** để trẻ tự do. |
| **Theo giai đoạn phát triển vẽ của trẻ** | 3–4t *vẽ nguệch ngoạc*; 4–7t *tiền sơ đồ*; 7–9t *sơ đồ*; 9t+ *tả thực* → công cụ & thử thách hợp lứa. |
| **Vận động tinh** | Nối chấm/đồ nét rèn điều khiển tay; cọ to cho bé nhỏ, nét mảnh cho lớn hơn. |
| **Thành công sớm** | Đối xứng/tô màu cho kết quả đẹp ngay → tự tin, muốn vẽ tiếp. |
| **Không phán xét** | Không xếp hạng nghệ thuật; mọi tranh đều được trưng bày trân trọng. |
| **Gợi mở trí tưởng tượng** | "Vẽ hoàn thành", "vẽ cảm xúc" — mở câu hỏi thay vì áp đáp án. |

---

## 2. KHUNG ĐỘ KHÓ: 3 CHẶNG · 10 MỨC

> "Dễ → khó → tự do" được tổ chức thành 3 chặng. Trẻ có thể nhảy chặng tuỳ hứng (không khoá cứng).

| Mức | Chặng | Tuổi gợi ý | Người chơi làm gì | Mức tự do |
|---|---|---|---|---|
| 1 | **Dẫn dắt** | 3–4 | Chạm để tô màu vùng có sẵn | Rất thấp |
| 2 | Dẫn dắt | 4–5 | Nối chấm theo số → hiện hình → tô | Thấp |
| 3 | Dẫn dắt | 4–6 | Đồ theo nét mờ (nét đậm dần khi cần) | Thấp |
| 4 | **Bán tự do** | 5–7 | Ghép hình/dán để tạo bức tranh | Vừa |
| 5 | Bán tự do | 5–8 | Vẽ đối xứng/gương (đẹp tức thì) | Vừa |
| 6 | Bán tự do | 6–9 | "Vẽ hoàn thành" phần còn thiếu | Vừa–cao |
| 7 | **Tự do** | 7–10 | Kể chuyện bằng 2–4 khung tranh | Cao |
| 8 | Tự do | 7–11 | Vẽ theo nhạc/cảm xúc (trừu tượng) | Cao |
| 9 | Tự do | 8–12 | Tạo hoạt hình lật trang 2–4 khung | Cao |
| 10 | **Sáng tạo thoải mái** | 5–15 | Xưởng vẽ mở: lớp, cọ, dán, lưu, chia sẻ | Tối đa |

---

## 3. "XƯỞNG VẼ" CHUNG — Canvas Engine (ưu tiên cảm ứng)

Mọi game gọi cùng bộ công cụ; mỗi game **bật/tắt** tính năng theo độ khó:

- **Cọ vẽ:** vài cỡ (to cho bé), màu bảng lớn dễ chạm, cọ "bút chì/sáp/màu nước" đơn giản.
- **Tô màu vùng (flood fill)**, **xoá**, **hoàn tác/làm lại** (undo/redo) — nút to, không giới hạn lo lắng.
- **Lớp nhẹ (layers)** ở chế độ tự do; dán **sticker/tem hình**; **đối xứng/kính vạn hoa**.
- **Phóng to/thu nhỏ** bằng chụm hai ngón; **di chuyển canvas** hai ngón.
- **Tự lưu liên tục** + lưu vào **Phòng tranh** cá nhân; **xuất ảnh** để chia sẻ (có kiểm soát phụ huynh).
- **Nguyên tắc UI cảm ứng:** vùng chạm ≥ 44px; **chống chạm nhầm lòng bàn tay** (palm rejection); thanh công cụ ở mép dễ với ngón cái; không menu chữ nhỏ.

> Trên máy tính: chuột/bút cảm ứng dùng cùng cơ chế (Pointer Events), thêm phím tắt (Ctrl+Z…).

---

## 4. MƯỜI GAME (thuyết minh chi tiết)

### GAME 1 · Tô Màu Thần Kỳ — *Magic Coloring*  · (Mức 1)
- **Làm gì:** chạm vào vùng để đổ màu; có cọ để tô tay; tranh viền sẵn (con vật, hoa, xe).
- **Dễ → khó:** L1 chạm-đổ-màu một vùng; lên dần thêm tô bằng cọ, pha sắc độ, tô bóng.
- **Vì sao tốt:** thành công ngay, làm quen màu sắc & vùng; phù hợp 3–4 tuổi.
- **Cảm ứng:** một chạm = một vùng; bảng màu to; hoàn tác dễ.

### GAME 2 · Nối Chấm — *Connect the Dots*  · (Mức 2)
- **Làm gì:** nối các chấm theo số/chữ cái → lộ ra hình → tô màu.
- **Dễ → khó:** L2 nối 1–10; tăng số chấm, thêm chữ cái, hình phức tạp hơn.
- **Vì sao tốt:** vừa nhận số/chữ, vừa rèn nét, vừa có "phần thưởng" hình hiện ra.
- **Cảm ứng:** vuốt qua các chấm theo thứ tự; chấm sáng lên khi tới lượt.

### GAME 3 · Đồ Theo Nét Mờ — *Trace & Fade*  · (Mức 3)
- **Làm gì:** đồ lên nét mờ có sẵn (chữ, hình); **nét hướng dẫn mờ dần** khi trẻ vẽ vững hơn.
- **Dễ → khó:** L3 nét đậm, vùng rộng; dần nét mảnh, mờ hơn, cuối cùng chỉ còn điểm gợi ý.
- **Vì sao tốt:** rèn điều khiển tay (vận động tinh) — bước đệm để vẽ tự do.
- **Cảm ứng:** dung sai rộng cho ngón tay; khen khi đi đúng nét.

### GAME 4 · Ghép Hình Sáng Tạo — *Shape Maker*  · (Mức 4)
- **Làm gì:** kéo–thả các **hình cơ bản & tem** (tròn, tam giác, mặt trời, cây…) để **lắp** thành bức tranh của riêng mình.
- **Dễ → khó:** L4 ghép vài mảnh thành con vật mẫu; dần tự do bố cục, xoay/đổi cỡ, tự nghĩ chủ đề.
- **Vì sao tốt:** dạy **bố cục & tổng–bộ phận** mà chưa cần kỹ năng nét; rất hợp bé.
- **Cảm ứng:** kéo–thả, hai ngón xoay/phóng.

### GAME 5 · Đối Xứng Kỳ Diệu — *Symmetry Mirror*  · (Mức 5)
- **Làm gì:** vẽ một nét, hệ thống **nhân đối xứng** (2/4/8 trục) → ra hoa văn/kính vạn hoa đẹp tức thì.
- **Dễ → khó:** L5 gương 2 trục; tăng số trục, thêm màu, thành **mandala** phức tạp.
- **Vì sao tốt:** kết quả đẹp ngay → tự tin; dạy khái niệm đối xứng (toán + nghệ thuật).
- **Cảm ứng:** vẽ một bên, thấy cả bức "nở" ra — rất "wow" trên điện thoại.

### GAME 6 · Vẽ Hoàn Thành — *Finish the Drawing*  · (Mức 6)
- **Làm gì:** cho **nửa bức tranh** (nửa khuôn mặt, thân con quái vật, một bên cảnh) → trẻ **vẽ tiếp phần còn lại tự do**.
- **Dễ → khó:** L6 hoàn thành đối xứng đơn giản; dần mở câu hỏi mở ("con vật này sống ở đâu? vẽ nhà của nó").
- **Vì sao tốt:** kích thích **tưởng tượng** trên một điểm tựa an toàn — không sợ "trang trắng".
- **Cảm ứng:** canvas có sẵn phần gợi ý mờ; trẻ thoải mái thêm.

### GAME 7 · Kể Chuyện Bằng Tranh — *Draw a Story*  · (Mức 7)
- **Làm gì:** vẽ **2–4 khung tranh** liên tiếp thành một câu chuyện nhỏ (truyện tranh); có thể thêm bong bóng thoại.
- **Dễ → khó:** L7 hai khung (trước–sau); dần nhiều khung, có nhân vật xuyên suốt, lời thoại.
- **Vì sao tốt:** nối **sáng tạo hình ảnh + tư duy kể chuyện + ngôn ngữ**; liên thông game song ngữ.
- **Cảm ứng:** lật khung bằng vuốt; mỗi khung là một canvas.

### GAME 8 · Vẽ Theo Cảm Xúc — *Draw the Feeling*  · (Mức 8)
- **Làm gì:** nghe một đoạn nhạc / nhận một cảm xúc hoặc từ gợi ý ("vui", "biển", "bão") → vẽ **trừu tượng tự do**, không có đáp án đúng.
- **Dễ → khó:** L8 màu theo cảm xúc; dần kết hợp nhịp nhạc, chuyển động nét, bảng màu nâng cao.
- **Vì sao tốt:** giải phóng biểu đạt cảm xúc; dạy **màu sắc ↔ cảm xúc**; trị liệu nhẹ nhàng.
- **Cảm ứng:** cọ "mượt" theo tốc độ vuốt; nền nhạc chọn được.

### GAME 9 · Phòng Tranh Sống — *Animate It*  · (Mức 9)
- **Làm gì:** vẽ **2–4 khung** hơi khác nhau → bấm "chạy" → tranh **chuyển động** (lật trang/flipbook).
- **Dễ → khó:** L9 hai khung nhấp nháy; dần nhiều khung, dùng "giấy can" (onion-skin) để vẽ khung kế.
- **Vì sao tốt:** "phép màu" hoạt hình tạo hứng thú lớn; nhập môn chuyển động & thời gian.
- **Cảm ứng:** nút "thêm khung", thanh tua; xem trước ngay trên máy.

### GAME 10 · Xưởng Sáng Tạo Tự Do — *Free Studio*  · (Mức 10)
- **Làm gì:** **canvas mở hoàn toàn**: nhiều lớp, đủ cọ/màu, sticker, đối xứng tuỳ chọn, phông nền; vẽ bất cứ gì, lưu vào Phòng tranh, chia sẻ.
- **Dễ → khó:** không khoá — có **thử thách gợi ý tuỳ chọn** mỗi ngày ("hôm nay vẽ giấc mơ của bạn") cho ai cần cảm hứng.
- **Vì sao tốt:** đích đến "sáng tạo thoải mái"; nơi mọi kỹ năng từ game 1–9 hội tụ.
- **Cảm ứng:** giao diện tối giản, công cụ ẩn gọn để chừa chỗ cho canvas; tự lưu.

---

## 5. TRƯNG BÀY & ĐỘNG LỰC

- **Phòng tranh cá nhân**: mọi tác phẩm tự lưu; xem lại hành trình vẽ (kể cả tua lại nét vẽ).
- **Muôn Điểm (MĐ):** thưởng cho **hành động sáng tạo** (vẽ xong, thử công cụ mới, kể chuyện) — *không* chấm đẹp/xấu, *không* xếp hạng nghệ thuật (tránh làm trẻ nản).
- **Huy hiệu khám phá**: "đã thử đối xứng", "nhà kể chuyện", "đạo diễn hoạt hình".
- **Triển lãm cộng đồng (tuỳ chọn, có kiểm duyệt)**: chia sẻ tranh trong không gian an toàn; chỉ "động viên", không bình luận tiêu cực.
- **"Không có màn cuối":** luôn có công cụ mới, thử thách mới, không giới hạn số tranh — sáng tạo là vô tận.

---

## 6. AN TOÀN TRẺ EM & PHỤ HUYNH

- **Chia sẻ có kiểm soát:** mặc định riêng tư; chia sẻ cần **phụ huynh duyệt**; tranh chia sẻ được **kiểm duyệt** (AI + người).
- **Privacy-first:** không thu thập dữ liệu thừa, không quảng cáo, không bán dữ liệu.
- **Bảng phụ huynh:** xem Phòng tranh, thời lượng, đặt giới hạn; tải tác phẩm về.
- **Màn hình lành mạnh:** khuyến khích nghỉ; không cơ chế gây nghiện.
- **Nội dung an toàn:** sticker/gợi ý phù hợp lứa tuổi.

---

## 7. KHẢ NĂNG TIẾP CẬN & KỸ THUẬT

- **Ưu tiên điện thoại:** dùng Pointer/Touch events; **chống palm**; nút ≥44px; thao tác bằng ngón cái; xoay ngang/dọc đều ổn.
- **Hiệu năng:** canvas tối ưu (requestAnimationFrame, hạn chế vẽ lại); hoạt động trên máy yếu.
- **Offline:** vẽ được khi không mạng (khách); **đồng bộ Phòng tranh khi đăng nhập** (theo SDK đã có).
- **Lưu an toàn:** tự lưu chống mất bài; cảnh báo trước khi rời.
- **Bút cảm ứng/áp lực** (nếu có) hỗ trợ nét dày–mỏng; nhưng **ngón tay vẫn là chính**.
- **Khả năng tiếp cận:** tương phản tốt, nhãn biểu tượng rõ, đọc-to tên công cụ cho bé chưa biết chữ.

---

## 8. TÍCH HỢP HỆ SINH THÁI MUÔN NƠI

- **Tier 1–2 · Creator Games**, hiển thị nhóm **Creator** trên hub `plays.muonnoi.org`.
- Nối **`family.muonnoi.org`**: trưng bày tranh trong "gia đình", vẽ cùng nhau; **`hoctap`**: liên thông với game kể chuyện/song ngữ.
- Dùng chung **SSO · Muôn Điểm · Phòng tranh (lưu tiến trình) · AI Layer** (gợi ý sáng tạo, kiểm duyệt) theo PLAN-V2.
- Có thể tặng tranh kèm **Chuỗi Tử Tế** (vẽ thiệp tặng người thật) — nối Tier 3.

---

## 9. LỘ TRÌNH SẢN XUẤT (đề xuất)

| Giai đoạn | Nội dung | Ghi chú |
|---|---|---|
| **B0** | **Canvas Engine** cảm ứng (cọ, tô, undo, lưu) | Lõi dùng cho cả 10 game |
| **B1** | **Tô Màu (1)**, **Đối Xứng (5)**, **Xưởng Tự Do (10)** | Phủ dễ–đẹp-ngay–tự do; thấy giá trị nhanh |
| **B2** | **Nối Chấm (2)**, **Đồ Nét Mờ (3)** | Chặng dẫn dắt cho bé nhỏ |
| **B3** | **Ghép Hình (4)**, **Vẽ Hoàn Thành (6)** | Bán tự do |
| **B4** | **Kể Chuyện (7)**, **Vẽ Cảm Xúc (8)** | Sáng tạo mở |
| **B5** | **Hoạt Hình (9)** + Phòng tranh + chia sẻ an toàn | "Wow factor" + cộng đồng |

**Thứ tự ưu tiên đề xuất:** Canvas Engine → Game 1, 5, 10 → còn lại. (Có 3 cửa: dễ nhất, đẹp-ngay, và tự do — rồi lấp đầy ở giữa.)

---

### Bảng tổng 10 game (tra nhanh)

| # | Tên VI | Tên EN | Chặng | Tuổi mạnh | Mức tự do |
|---|---|---|---|---|---|
| 1 | Tô Màu Thần Kỳ | Magic Coloring | Dẫn dắt | 3–6 | thấp |
| 2 | Nối Chấm | Connect the Dots | Dẫn dắt | 4–7 | thấp |
| 3 | Đồ Theo Nét Mờ | Trace & Fade | Dẫn dắt | 4–7 | thấp |
| 4 | Ghép Hình Sáng Tạo | Shape Maker | Bán tự do | 5–8 | vừa |
| 5 | Đối Xứng Kỳ Diệu | Symmetry Mirror | Bán tự do | 5–10 | vừa |
| 6 | Vẽ Hoàn Thành | Finish the Drawing | Bán tự do | 6–10 | vừa–cao |
| 7 | Kể Chuyện Bằng Tranh | Draw a Story | Tự do | 7–12 | cao |
| 8 | Vẽ Theo Cảm Xúc | Draw the Feeling | Tự do | 7–12 | cao |
| 9 | Phòng Tranh Sống | Animate It | Tự do | 8–13 | cao |
| 10 | Xưởng Sáng Tạo Tự Do | Free Studio | Sáng tạo | 5–15 | tối đa |

> *Không có bức tranh nào sai. Chỉ có một bàn tay đang lớn lên cùng trí tưởng tượng.*
