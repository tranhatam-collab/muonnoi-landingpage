# WIX Redirect Map — nguoivietmuonnoi.com → nguoiviet.muonnoi.org

**Tài liệu**: `WIX_REDIRECT_MAP_2026-05-12`
**Phát hành**: 2026-05-12
**Nguồn dữ liệu**: archive crawl tại `./` (13 pages, 2026-05-12)
**Mục đích**: cung cấp bảng mapping comprehensive để xây `_redirects` cho Cloudflare Pages của `nguoiviet.muonnoi.org`, đồng thời để DNS-level redirect khi flip domain `nguoivietmuonnoi.com` về domain mới.

> Lưu ý: file này **không** sửa `_redirects` trực tiếp — đó là quyết định của owner sau khi review. Đây là bản đề xuất chính thức.

---

## I. Quy ước

- `301` = permanent redirect — dùng cho mọi URL "đã tồn tại trên Wix" và còn ý nghĩa
- `302` = temporary — chỉ dùng cho transactional / thank-you / page đang chờ thay thế
- `410` = gone — dùng cho URL không nên tồn tại trên site mới (vd. profile cá nhân, Wix internal)
- Mọi target đều ở `https://nguoiviet.muonnoi.org/<...>`
- Mọi path mới đều có trailing slash để khớp tree-style của Cloudflare Pages

---

## II. Bảng chính — 13 URL đã archive

| # | Wix URL | New URL | HTTP | Rationale |
|---|---------|---------|------|-----------|
| 1 | `/` | `/` | 301 | Trang chủ → trang chủ mới (10 sections). Content cũ "đi xa để quay trở về" được giữ và viết lại trong section 1–4. |
| 2 | `/event-list` | `/journeys/` | 301 | Page Wix event-list rỗng, chỉ template. Sự kiện trong cấu trúc mới được trình bày dưới dạng hành trình. |
| 3 | `/tham-gia` | `/start/` | 301 | "Tham gia" là CTA chính của Wix. Được map sang `/start/` (Bắt đầu hành trình). Content có thể reuse cho `/start/` body. |
| 4 | `/groups` | `/members/` | 301 | Wix Groups (forum) → trang Thành viên placeholder. Khi `app.muonnoi.org` social core live, sẽ deeplink sang đó. |
| 5 | `/hanhtrinh` | `/journeys/` | 301 | Canonical landing cho danh sách hành trình. Content "Con Người – Môi Trường – Quay Trở Về" là chất liệu để build journey-model spec. |
| 6 | `/csmn` | `/journeys/` | 301 | "Cuộc Sống Muôn Nơi" slug cũ — đã được tái định vị thành `/journeys/`. Content cũ ~70% là Wix template leftover, không reuse. |
| 7 | `/blog` | `/stories/` | 301 | Blog cũ chỉ có 1 post known. Hub tin tức → `/stories/`. |
| 8 | `/book-online` | `/start/` | 301 | Booking page Wix gần như trống (53 từ). Booking flow mới sẽ ở `/start/`. |
| 9 | `/challenges` | `/journeys/` | 301 | Wix Programs list — gần trống. Concept "challenge" được nhập vào journey-model (giai đoạn Va chạm). |
| 10 | `/donation-thank-you-page` | `/` | 302 | Transactional page; sau khi donation flow mới chưa có thì redirect tạm về home (302). Khi `/contribute/thanks/` có sẽ chuyển sang 301. |
| 11 | `/file-share` | `/resources/` | 301 | "Tài Nguyên" trên Wix — placeholder. Trên site mới: `/resources/`. |
| 12 | `/plans-pricing` | `/start/` | 301 | **WARNING**: page Wix chứa membership 20,000 USD — **conflict trực tiếp** với nguyên tắc v2.0 "không hứa thu nhập / không bán gói". Redirect về `/start/` và **content cũ không được reuse**. |
| 13 | `/post/một-nơi-để-trở-về-dù-bạn-đang-ở-bất-cứ-đâu` | `/stories/mot-noi-de-tro-ve/` | 301 | Blog post duy nhất, ~893 từ, chất liệu cho Đà Lạt Pilot. Slug mới tách dấu để URL-safe. Fallback (xem mục III) bắt mọi `/post/*` khác. |

---

## III. Wildcard / Catch-all

Để bắt mọi URL Wix legacy chưa archive (Wix có thể tạo URL ngầm như `/blog-page/...`, `/group-page/...`, `/profile/...`):

| Wix pattern | New URL | HTTP | Rationale |
|-------------|---------|------|-----------|
| `/post/*` | `/stories/` | 301 | Mọi blog post khác (chưa archive) → trang index stories |
| `/blog/*` | `/stories/` | 301 | Wix có thể tạo `/blog/category/...` |
| `/blog-feed.xml` | `/sitemap.xml` | 301 | RSS feed Wix → sitemap mới (hoặc 410 nếu không support RSS giai đoạn 1) |
| `/group-page/*` | `/members/` | 301 | Wix Groups detail pages |
| `/profile/*` | `/members/` | 301 | Wix profile pages của thành viên Wix Members |
| `/account/*` | `/members/` | 410 hoặc 301 | Wix account dashboard — không có tương đương public; ưu tiên 410. |
| `/_api/*` | — | 410 | Wix internal API — tuyệt đối không expose |
| `/_partials/*` | — | 410 | Wix internal partials |

---

## IV. URL từ master plan (đã có trong Phase 5) — nhân đôi để đảm bảo coverage

Master plan section XI đã list 12 URL legacy. Reconcile với crawl thực tế:

| Master plan URL | Trạng thái crawl | Quyết định |
|-----------------|------------------|------------|
| `/cuoc-song-muon-noi` | ❌ Không trong sitemap actual | Vẫn map → `/journeys/` (legacy backup, có thể là slug Wix cũ trước khi đổi sang `/csmn`) |
| `/hanh-trinh` (có dấu gạch) | ❌ Sitemap actual dùng `/hanhtrinh` (liền) | Map cả hai: `/hanh-trinh` và `/hanhtrinh` → `/journeys/` |
| `/csmn` | ✅ Khớp | → `/journeys/` |
| `/tham-gia` | ✅ Khớp | → `/start/` |
| `/groups` | ✅ Khớp | → `/members/` |
| `/plans-pricing` | ✅ Khớp | → `/start/` |
| `/file-share` | ✅ Khớp | → `/resources/` |
| `/blog` | ✅ Khớp | → `/stories/` |
| `/event-list` | ✅ Khớp | → `/journeys/` |
| `/book-online` | ✅ Khớp | → `/start/` |
| `/donation-thank-you-page` | ✅ Khớp | → `/` (302) |
| `/post/*` | ✅ 1 known post | → `/stories/` (catch-all 301) |
| `/members` (từ Wix login) | ⚠️ Có link nội bộ tới `/members` | → `/members/` (301) |

---

## V. Đề xuất `_redirects` final (tham khảo — KHÔNG được apply tự động)

```text
# === Wix legacy URL redirects — nguoivietmuonnoi.com migration ===
# Source: WIX_REDIRECT_MAP_2026-05-12.md
# Date: 2026-05-12

# Top-level Wix paths (13 known)
/cuoc-song-muon-noi          /journeys/    301
/hanh-trinh                  /journeys/    301
/hanhtrinh                   /journeys/    301
/csmn                        /journeys/    301
/event-list                  /journeys/    301
/challenges                  /journeys/    301
/tham-gia                    /start/       301
/book-online                 /start/       301
/plans-pricing               /start/       301
/groups                      /members/     301
/members                     /members/     301
/blog                        /stories/     301
/file-share                  /resources/   301
/donation-thank-you-page     /             302

# Single known blog post → dedicated story page (tạo trước khi flip DNS)
/post/một-nơi-để-trở-về-dù-bạn-đang-ở-bất-cứ-đâu   /stories/mot-noi-de-tro-ve/   301

# Wildcards (Wix có thể serve URL chưa biết)
/post/*                      /stories/     301
/blog/*                      /stories/     301
/group-page/*                /members/     301
/profile/*                   /members/     301
/blog-feed.xml               /sitemap.xml  301

# Wix internal — không expose
/_api/*                      /             410
/_partials/*                 /             410
/account/*                   /members/     301
```

---

## VI. Checklist trước khi apply

- [ ] Owner review bảng trên
- [ ] Confirm tạo `/stories/mot-noi-de-tro-ve/` page với content rewritten (không copy 1:1 từ Wix)
- [ ] Confirm KHÔNG resurrect `/plans-pricing` membership 20,000 USD trên site mới
- [ ] Test trên Cloudflare Pages preview deployment trước khi flip DNS
- [ ] Sau khi flip DNS từ Wix → Cloudflare, mọi redirect trên phải work từ `nguoivietmuonnoi.com` luôn (DNS-level hoặc proxy)
- [ ] Submit "Change of Address" trong Google Search Console
- [ ] Monitor 30 ngày: 404 rate phải về 0

---

## VII. Nguồn

- 13 archive files: `home.md`, `event-list.md`, `tham-gia.md`, `groups.md`, `hanhtrinh.md`, `csmn.md`, `blog.md`, `book-online.md`, `challenges.md`, `donation-thank-you.md`, `file-share.md`, `plans-pricing.md`, `post-mot-noi-de-tro-ve.md`
- `_scrape_meta.json` — raw metadata
- `../NGUOIVIET_MUONNOI_MASTER_PLAN_2026-05-12.md` — sections V, VI, XI
- `../DEV_HANDOFF_NGUOIVIET_MUONNOI_SUBDOMAIN_2026-05-12.md`

**End of WIX_REDIRECT_MAP_2026-05-12.md**
