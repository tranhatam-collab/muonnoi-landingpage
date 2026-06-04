# Wix Content Archive — INDEX

**Project**: migration `nguoivietmuonnoi.com` (Wix) → `nguoiviet.muonnoi.org` (Cloudflare Pages)
**Archive run**: 2026-05-12
**Owner**: Web Team + Brand Guardian
**Trạng thái**: ARCHIVED_PRE_MIGRATION — chờ Phase 5 DNS flip

---

## I. Tổng quan archive

| Metric | Giá trị |
|---|---|
| Pages archived | **13** (12 top-level + 1 blog post) |
| Total words extracted | **5,155** (visible body, sau strip Wix chrome) |
| Total chars extracted | **24,449** |
| Output format | Markdown, UTF-8 |
| Archive location | `/docs/wix-content-archive/` |

### Bảng kết quả per page (sort by word count)

| # | File | Source path | Words | Chars | Status nội dung |
|---|------|-------------|------:|------:|------|
| 1 | `home.md` | `/` | 1,608 | 7,227 | **STRONG** — reuse vào index sections |
| 2 | `post-mot-noi-de-tro-ve.md` | `/post/một-nơi-để-trở-về-dù-bạn-đang-ở-bất-cứ-đâu` | 893 | 4,087 | **STRONG** — chất liệu cho Đà Lạt Pilot |
| 3 | `plans-pricing.md` | `/plans-pricing` | 583 | 2,619 | **DROP** — conflict với brand v2.0 (xem section IV) |
| 4 | `tham-gia.md` | `/tham-gia` | 529 | 2,352 | **PARTIAL** — reuse câu hỏi trung tâm, drop Wix template |
| 5 | `groups.md` | `/groups` | 472 | 2,808 | **DROP** — Wix Groups UI thuần |
| 6 | `hanhtrinh.md` | `/hanhtrinh` | 336 | 1,827 | **STRONG** — base cho `/journeys/` body |
| 7 | `csmn.md` | `/csmn` | 299 | 1,508 | **THIN** — phần lớn là Wix template ("Project Name"...) |
| 8 | `blog.md` | `/blog` | 168 | 749 | **THIN** — chỉ index Wix blog widget |
| 9 | `donation-thank-you.md` | `/donation-thank-you-page` | 81 | 375 | **TRANSACTIONAL** |
| 10 | `book-online.md` | `/book-online` | 53 | 251 | **EMPTY** — Wix Bookings widget |
| 11 | `challenges.md` | `/challenges` | 47 | 235 | **EMPTY** — Wix Programs widget |
| 12 | `event-list.md` | `/event-list` | 46 | 217 | **EMPTY** — Wix Events widget |
| 13 | `file-share.md` | `/file-share` | 40 | 194 | **EMPTY** — Wix File Share widget |

---

## II. Phân loại nội dung

### A. STRONG content — phải migrate, ưu tiên 1

3 pages chứa lõi tinh thần "đi xa để quay trở về":

1. **`home.md`** (1,608 từ) — Đã có 6 đoạn lớn dùng được cho 10 sections trang mới:
   - Hero: "Người Việt Muôn Nơi không phải là một cộng đồng để tham gia..."
   - Section 2 (không phải số đông): "Chúng tôi không tổ chức du lịch. Không đào tạo kỹ năng. Không hứa hẹn..."
   - Section 3 (câu hỏi trung tâm): "Bạn đứng vững được ở đâu, trong điều kiện nào?"
   - Section 4 (7 bước): "Con người → Mắc kẹt → Môi trường → Trí tuệ → Hệ quả → Quay trở về"
   - Section 5 (môi trường thật): "Môi trường là một bối cảnh sống mới..."
   - Tinh thần "đi xa để quay trở về" cho hero
2. **`post-mot-noi-de-tro-ve.md`** (893 từ) — Câu chuyện về "một nơi để trở về" tại Đà Lạt → base trực tiếp cho:
   - `/journeys/dalat/` body
   - Hoặc `/stories/mot-noi-de-tro-ve/` (story migration)
3. **`hanhtrinh.md`** (336 từ) — Body cho `/journeys/` landing. Có cấu trúc 7-stage journey rõ.

### B. PARTIAL — cần lọc

- **`tham-gia.md`** (529 từ): Câu hỏi mở đầu rất tốt ("bạn đang đứng vững nhờ đâu, và nếu điều đó biến mất, bạn còn lại gì"). Nhưng FAQ accordion 01–04 cuối page bị **dở dang và còn 1 ô template Wix chưa edit** ("Project Name / This is your Project description"). Khi reuse: giữ paragraph mở đầu, bỏ FAQ broken.

### C. DROP — không reuse

- **`plans-pricing.md`** — gói thành viên 20,000 USD + 11 điều kiện (sở hữu công ty 2 năm, xe hơi đứng tên công ty, đầu tư quỹ ≥ 10,000 USD, không phải chính trị gia / lãnh đạo tôn giáo, đề cử bởi thành viên hiện tại...). **Xung đột trực tiếp** với nguyên tắc bất biến #1 (Không hứa thu nhập), #5 (Không placeholder), và brand v2.0 positioning "không phải CLB cho số đông". **Tuyệt đối không port sang site mới.**
- **`csmn.md`** — 4 ô Wix template chưa edit ("Project Name", "This is your Project description"). Chỉ giữ 1 đoạn về story post.
- **`groups.md`** — UI Wix Groups (Discussions, Members tab, "Đăng nhập"). Khi `app.muonnoi.org` social core live sẽ thay thế. Hiện tại redirect `/groups` → `/members/` placeholder.
- **`blog.md`, `event-list.md`, `book-online.md`, `challenges.md`, `file-share.md`, `donation-thank-you.md`** — Wix widget placeholders, không có content thật.

---

## III. Recommended priority cho copy migration

| Priority | Mục tiêu | Source archive | Target page mới |
|---|---|---|---|
| **P0** | Hero + định vị | `home.md` (§1, §2) | `/` (sections 1–3) |
| **P0** | Câu hỏi trung tâm | `home.md` (§3) | `/` (section 3) |
| **P0** | Journey model 7 bước | `home.md` (§4) + `hanhtrinh.md` | `/journeys/` + `/` (section 4) |
| **P0** | "Không phải số đông" | `home.md` (§2) | `/manifesto/` opening |
| **P1** | Story Đà Lạt | `post-mot-noi-de-tro-ve.md` | `/journeys/dalat/` body + `/stories/mot-noi-de-tro-ve/` |
| **P1** | "Tham gia" → "Bắt đầu" | `tham-gia.md` (paragraph mở đầu) | `/start/` intro |
| **P2** | Môi trường thật | `home.md` (§5) | `/manifesto/` + `/` (section 5) |
| **P3** | Footer claims | `home.md` (full) | `/contact/`, footer brand boilerplate |
| **DROP** | Membership 20,000 USD | `plans-pricing.md` | — (KHÔNG resurrect) |
| **DROP** | Wix Groups UI | `groups.md` | — (replaced bởi app.muonnoi.org sau này) |

---

## IV. Key findings (5 cái cần Founder + Brand Guardian biết)

1. **Lõi content vẫn còn — chiếm ~58% tổng từ trong 3 pages strong (`home.md`, `post-mot-noi-de-tro-ve.md`, `hanhtrinh.md`)**. Tinh thần "đi xa để quay trở về" đã có sẵn ngôn ngữ. Khi migrate, nâng cấp về brand v2.0 chứ không cần viết lại từ con số 0.

2. **`/plans-pricing` là rủi ro lớn nhất**. Page cũ bán gói thành viên CLB 20,000 USD với 11 điều kiện gắt (doanh nhân sở hữu công ty 2 năm, xe hơi đứng tên công ty, đầu tư quỹ Thiên Thần Phi Lợi Nhuận ≥ 10,000 USD, không phải chính trị gia hay lãnh đạo tôn giáo...). Vi phạm trực tiếp 3/8 nguyên tắc bất biến trong master plan (không hứa thu nhập, không bán product, không placeholder). **Không được port. Redirect → `/start/` và để Brand Guardian quyết định có giữ tier thành viên trả phí trong v2.0 hay không.**

3. **6/13 pages là Wix template placeholders ("Project Name", "This is your Project description", widget rỗng)**. `csmn`, `event-list`, `book-online`, `challenges`, `file-share`, `donation-thank-you-page` đều dưới 100 từ hoặc full template. Không cần migrate content, chỉ cần redirect.

4. **Cấu trúc nội dung Wix bị Single-Page-App render**. Mọi page đều có header Wix navigation lặp lại ("HOME / Cuộc Sống Muôn Nơi / HÀNH TRÌNH / THAM GIA / Tài Nguyên / Dành Cho Thành Viên / Nhóm thảo luận / Đăng nhập") + "top of page" / "bottom of page" footers. Khi reuse text, **phải strip chrome này thủ công** — script `scrape_wix.py` đã unescape entities và extract visible text nhưng chưa filter Wix nav phrases.

5. **Conflict slug `/cuoc-song-muon-noi` vs `/csmn`**: Master plan section XI list `/cuoc-song-muon-noi` nhưng sitemap thực tế chỉ có `/csmn`. Khả năng cao Wix đã đổi slug giữa chừng. **Redirect map phía dưới đã cover cả hai** để không miss legacy bookmark / Google index.

---

## V. Files trong folder này

```
docs/wix-content-archive/
├── INDEX.md                          ← bạn đang đọc
├── WIX_REDIRECT_MAP_2026-05-12.md    ← bảng redirect đề xuất + reference _redirects
├── _scrape_meta.json                 ← metadata raw từ scraper
├── home.md
├── event-list.md
├── tham-gia.md
├── groups.md
├── hanhtrinh.md
├── csmn.md
├── blog.md
├── book-online.md
├── challenges.md
├── donation-thank-you.md
├── file-share.md
├── plans-pricing.md
└── post-mot-noi-de-tro-ve.md
```

---

## VI. Next actions

1. Founder + Brand Guardian review `WIX_REDIRECT_MAP_2026-05-12.md` → approve / amend
2. Web team viết content master cho 10 sections trang chủ mới, ưu tiên reuse `home.md` P0 paragraphs
3. Dev apply approved redirects vào `nguoiviet.muonnoi.org/public/_redirects`
4. Sau khi `/stories/mot-noi-de-tro-ve/` tồn tại, update master plan để dùng path đó (thay vì wildcard `/post/* → /stories/`)
5. Khi flip DNS, monitor Cloudflare Pages logs 30 ngày — bất kỳ 404 nào cũng phải có entry tương ứng trong redirect map

---

**Phê duyệt archive**: Web Team · 2026-05-12
**Reference**: `../NGUOIVIET_MUONNOI_MASTER_PLAN_2026-05-12.md` · `../DEV_HANDOFF_NGUOIVIET_MUONNOI_SUBDOMAIN_2026-05-12.md`
