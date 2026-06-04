# MUÔN NƠI · PUBLIC LAUNCH PACKAGE 2026
**Toàn bộ content public-facing để cập nhật muonnoi.org**
**Phiên bản:** v1.0 · Ready for publish
**Bilingual:** Tiếng Việt (chính) + English (bản dịch song song)
**Ngày:** 2026-05-11

---

## MỤC ĐÍCH FILE NÀY

File này chứa:
- Toàn bộ copy mới cho `muonnoi.org` (homepage + tất cả sub-pages)
- Giữ nguyên những gì đang có, **chỉ thêm và làm sâu hơn**
- Ngôn ngữ chuẩn investor-ready nhưng KHÔNG nói tỷ USD, KHÔNG hứa hẹn tài chính
- Tập trung vào **giá trị thật, hạ tầng thật, con người thật**
- List file/trang cụ thể dev phải làm

---

## MỤC LỤC

1. [Triết lý nền và tagline](#1-triết-lý-nền-và-tagline)
2. [Homepage hoàn chỉnh (muonnoi.org)](#2-homepage-hoàn-chỉnh)
3. [Manifesto trang riêng (/manifesto)](#3-manifesto)
4. [About — Câu chuyện Muôn Nơi (/about)](#4-about)
5. [Ecosystem cập nhật (/ecosystem)](#5-ecosystem)
6. [Roadmap cập nhật (/roadmap)](#6-roadmap)
7. [Life Quest OS overview (/quests)](#7-quests-overview)
8. [Bảy hệ nhiệm vụ — 7 trang riêng](#8-bảy-hệ-nhiệm-vụ)
9. [Đường Muôn Nơi pilot (/quests/dulich)](#9-đường-muôn-nơi-pilot)
10. [Security & Trust cập nhật (/security)](#10-security--trust)
11. [Guide cập nhật (/guide)](#11-guide)
12. [Become a Host (/host)](#12-become-a-host)
13. [For Partners (/partners)](#13-for-partners)
14. [Press Kit (/press)](#14-press-kit)
15. [Footer + Navigation chuẩn](#15-footer--navigation)
16. [SEO meta tags + OG images](#16-seo-meta-tags)
17. [Dev task list — files phải tạo/update](#17-dev-task-list)
18. [Investor-ready language bank](#18-investor-ready-language)

---

## 1. TRIẾT LÝ NỀN VÀ TAGLINE

### 1.1 Tagline chính (giữ nguyên — đã chốt)

> **Tự Do Tuyệt Đối Từ Bên Trong, Trách Nhiệm Rõ Ràng Trong Đời Sống Muôn Nơi.**
>
> *Absolute Freedom From Within, Clear Responsibility Across Daily Life.*

### 1.2 Bộ tagline phụ (mới — dùng cho social, OG, press)

| Use case | VI | EN |
|---|---|---|
| Đại chúng nhất | Chơi để sống tốt hơn | Play to live better |
| Sản phẩm | Sống thật. Học thật. Làm thật. Tạo giá trị thật. | Live real. Learn real. Work real. Create real value. |
| Hạ tầng | Hệ điều hành cho đời sống, không cho thời gian màn hình. | An operating system for life, not screen time. |
| Niềm tin | Internet trở lại với con người. | The internet, made for human life again. |
| Lời mời | Đi ra thế giới thật, gặp người thật. | Out into the real world, with real people. |

### 1.3 Định vị một câu

**VI:** Muôn Nơi là hạ tầng số cho đời sống thật — nơi học tập, làm việc, du lịch, gia đình, sức khoẻ, sáng tạo và đóng góp cộng đồng diễn ra với bằng chứng thật, mối quan hệ thật và giá trị thật.

**EN:** Muôn Nơi is digital infrastructure for real life — where learning, work, travel, family, health, creation, and community contribution happen with verified proof, real relationships, and real value.

---

## 2. HOMEPAGE HOÀN CHỈNH

### Cấu trúc trang chủ mới (giữ nguyên + thêm Life Quest OS section)

```
┌─────────────────────────────────────────────────┐
│ HEADER (giữ nguyên)                              │
│ MN logo | Trang chủ | Hệ sinh thái | Lộ trình  │
│ Bảo mật | Hướng dẫn | Quests (NEW) | Admin     │
│ Theme toggle | VI/EN                            │
├─────────────────────────────────────────────────┤
│ SECTION 1: HERO (mở rộng nhẹ)                   │
├─────────────────────────────────────────────────┤
│ SECTION 2: THREE LOCKS (giữ nguyên)              │
│ Tự do từ bên trong · 1M tài khoản · Mô-đun     │
├─────────────────────────────────────────────────┤
│ SECTION 3: LIFE QUEST OS (MỚI)                   │
│ Giới thiệu 7 hệ nhiệm vụ đời sống              │
├─────────────────────────────────────────────────┤
│ SECTION 4: MODULES GRID (giữ + mở rộng)         │
│ Ứng dụng · Hệ sinh thái · Lộ trình · Bảo mật   │
│ Trạng thái · Xác minh · Quests (NEW)            │
├─────────────────────────────────────────────────┤
│ SECTION 5: NAVIGATION CARDS (giữ nguyên)         │
│ Đi nhanh theo đường đúng                         │
├─────────────────────────────────────────────────┤
│ SECTION 6: PILOT CALLOUT (MỚI)                   │
│ Đường Muôn Nơi - Đà Lạt - Tháng 1              │
├─────────────────────────────────────────────────┤
│ SECTION 7: PRINCIPLES (MỚI)                      │
│ Không tracking · Không feed gây nghiện · Proof  │
├─────────────────────────────────────────────────┤
│ SECTION 8: CTA cuối                              │
│ Vào ứng dụng · Tham gia hành trình              │
├─────────────────────────────────────────────────┤
│ FOOTER mở rộng                                   │
└─────────────────────────────────────────────────┘
```

### SECTION 1: HERO (mở rộng nhẹ)

**Eyebrow:**
```
VI: MN · social-first · privacy-first · module-first · life-first
EN: MN · social-first · privacy-first · module-first · life-first
```

**Heading H1:**
```
VI:
Tự Do Tuyệt Đối Từ Bên Trong
Trách Nhiệm Rõ Ràng Trong Đời Sống Muôn Nơi.

EN:
Absolute Freedom From Within
Clear Responsibility Across Daily Life.
```

**Subheading (mở rộng từ bản hiện tại):**
```
VI:
Muôn Nơi là nền tảng để sống, học, làm, đi, sáng tạo,
chăm sóc gia đình, đóng góp cộng đồng — và chia sẻ giá trị thật.

Giai đoạn đầu tập trung social-first miễn phí, bảo mật cao,
mượt và sạch. Khi đủ quy mô, hệ sinh thái mở rộng theo mô-đun
subdomain để mỗi vùng đời sống có không gian riêng nhưng
liên kết với cùng một trung tâm tin cậy.

EN:
Muôn Nơi is a platform to live, learn, work, travel, create,
care for family, contribute to community — and share real value.

Phase one is social-first, free, privacy-focused, and clean
by default. At scale, the ecosystem expands across modular
subdomains so every part of life has its own space —
connected by one trusted core.
```

**CTA buttons (giữ + thêm 1):**
```
[Vào ứng dụng / Enter App]      → app.muonnoi.org
[Xem hệ sinh thái / Ecosystem]   → /ecosystem
[Tham gia Quests / Join Quests]  → /quests           ← NEW
```

### SECTION 2: BA KHOÁ (giữ nguyên)

```
KHOÁ                          MỤC TIÊU                      HƯỚNG ĐI
Tự do từ bên trong            1.000.000 tài khoản           All-in-one bằng mô-đun

Tự do thật không phải         Social-first ổn định           Không làm 1 khối nặng
vô trách nhiệm. MN thiết       rồi mới mở rộng hệ sinh         dễ lỗi. Mỗi mô-đun
kế để rõ luật, rõ chuẩn,       thái tốc độ cao.              là 1 app độc lập,
rõ an toàn.                                                   liên kết về MN core.
```

### SECTION 3: LIFE QUEST OS (MỚI — thêm vào trang chủ)

**Eyebrow:**
```
VI: Lớp mới · Life Quest OS
EN: New layer · Life Quest OS
```

**Heading H2:**
```
VI: Hệ nhiệm vụ đời sống — chơi để sống tốt hơn.
EN: A life quest system — play to live better.
```

**Intro paragraph:**
```
VI:
Trên hạ tầng Muôn Nơi, chúng tôi xây một lớp mới:
bảy hệ nhiệm vụ đời sống nơi con người học, đi, làm,
chăm sóc sức khoẻ, gắn kết gia đình, sáng tạo và đóng
góp cộng đồng — mỗi nhiệm vụ có bằng chứng thật, được
AI hỗ trợ và cộng đồng xác nhận.

Không phải game để giữ người trong màn hình.
Là nhiệm vụ đời sống để đưa người ra thế giới thật.

EN:
On Muôn Nơi infrastructure, we are building a new layer:
seven life quest systems where people learn, travel, work,
care for their health, connect with family, create, and
contribute to community — every quest backed by real proof,
supported by AI, validated by community.

Not a game to keep you on a screen.
A life quest to bring you back to the real world.
```

**Seven quest cards (grid 7 hoặc 4+3):**

```
1. Đường Muôn Nơi · dulich.muonnoi.org
   Mỗi điểm đến là một thử thách. Mỗi thử thách mang một cuộc gặp.
   Every destination is a quest. Every quest brings a meeting.
   [Khởi động Tháng 1 · Đà Lạt]

2. Học Đời · hoctap.muonnoi.org
   Mỗi ngày học một kỹ năng đời, có bằng chứng thật.
   Learn a real-life skill every day, with verifiable proof.

3. Family Mission · family.muonnoi.org
   Gia đình cùng chơi để hiểu nhau và lớn lên cùng nhau.
   Families play together to understand each other and grow together.

4. Một Ngày Khoẻ · suckhoe.muonnoi.org
   Mỗi ngày một hành động nhỏ để sống khoẻ hơn, cùng gia đình.
   One small action each day for better health, with your family.

5. Việc Có Lý · lamviec.muonnoi.org/quest
   Mỗi công việc nhỏ là một bước xây uy tín thật.
   Every small task builds real reputation, one step at a time.

6. Vườn Sáng Tạo · sangtao.muonnoi.org
   Mỗi ngày tạo một thứ nhỏ, cộng đồng giúp nó thành hình thật.
   Create something small each day, community helps make it real.

7. Cồng · congdong.muonnoi.org
   Mỗi tuần một việc tốt cho cộng đồng, có bằng chứng và người cùng làm.
   One good thing for community each week, with proof and people.
```

**CTA section:**
```
[Tìm hiểu Life Quest OS]  → /quests
[Tham gia Đà Lạt Pilot]   → dulich.muonnoi.org
[Trở thành Local Host]     → /host
```

### SECTION 4: MODULES GRID (giữ + mở rộng)

```
Ứng dụng          Hệ sinh thái       Lộ trình          Bảo mật
Social core       Modules map        Phased plan       Trust & safety

Trạng thái        Xác minh           Quests (NEW)      Hướng dẫn
System status     Verification       Life Quest OS     Guide
```

### SECTION 5: NAVIGATION CARDS (giữ nguyên — "Đi nhanh theo đường đúng")

```
Hệ sinh thái
Sơ đồ modules và subdomain, mục đích từng phần, nguyên tắc mở rộng.
[Mở trang →]

Lộ trình
Social-first đến 1M user, rồi mở marketplace, chat/call,
Life Quest OS, và hệ sinh thái đầy đủ.
[Mở trang →]

Bảo mật
CSP, session HttpOnly, rate-limit, anti-bot, audit log,
nguyên tắc dữ liệu tối thiểu, proof security.
[Mở trang →]

Hướng dẫn
Bắt đầu, quy tắc, tham gia quests, nộp bằng chứng, FAQ.
[Mở trang →]
```

### SECTION 6: PILOT CALLOUT (MỚI)

```
┌──────────────────────────────────────────────────────────┐
│  ★ Pilot · Tháng 1 · Đà Lạt                              │
│                                                            │
│  Đường Muôn Nơi khởi động tại Đà Lạt với 30 nhiệm vụ,    │
│  50 Local Host, 100 nhà hành trình đầu tiên.              │
│                                                            │
│  Đến một con đường ít người biết. Gặp một gia đình K'Ho.  │
│  Học pha cà phê đặc sản. Ghi lại một câu chuyện thật.    │
│                                                            │
│  Mỗi quest mang về một Receipt có hash — bằng chứng       │
│  bạn đã sống một khoảnh khắc thật.                        │
│                                                            │
│  [Tham gia hành trình →]   [Trở thành Local Host →]      │
└──────────────────────────────────────────────────────────┘
```

### SECTION 7: PRINCIPLES (MỚI)

**Eyebrow:**
```
VI: Nguyên tắc · Không thoả hiệp
EN: Principles · Non-negotiable
```

**Six principle cards:**

```
1. Không tracking pixel
   No tracking pixels
   Không pixel, không SDK bên thứ ba, không analytics hành vi.

2. Không feed gây nghiện
   No addictive feed
   Không tối ưu nghiện. Không tối ưu outrage. Không vô tận.

3. Link bền là tài sản
   Stable links are assets
   Tài sản số của bạn sống bằng đường dẫn bền, không bằng thuật toán.

4. Bằng chứng là gốc
   Proof is the root
   Không có bằng chứng thật, không có giá trị thật. Không có giá trị thật,
   không có phần thưởng.

5. Dữ liệu tối thiểu
   Minimal data
   Chỉ giữ dữ liệu đủ vận hành. Có thể xoá. Có thể giảm. Mặc định riêng tư.

6. Doanh thu sạch
   Clean revenue
   Không quảng cáo hành vi. Không bán dữ liệu. Doanh thu từ giá trị thật.
```

### SECTION 8: CTA cuối (giữ + thêm)

```
Vào Social Core ngay
Enter the Social Core now

Đi thẳng tới app.muonnoi.org — không link thô trong UI,
nhưng link luôn đúng.

[Vào ứng dụng]   [Tham gia Quests]   [Hướng dẫn]
```

### SECTION 9: FOOTER mở rộng

```
MN · Muôn Nơi · Muốn nói

Sản phẩm                Hệ sinh thái             Quests
─ Ứng dụng              ─ Nhà Chung              ─ Đường Muôn Nơi
─ Hướng dẫn             ─ Làm việc                ─ Học Đời
─ Bảo mật               ─ Học tập                 ─ Family Mission
─ Trạng thái            ─ Đầu tư                  ─ Một Ngày Khoẻ
                                                   ─ Vườn Sáng Tạo
Công ty                 Pháp lý                   ─ Cồng
─ Câu chuyện            ─ Privacy
─ Manifesto             ─ Terms
─ Đối tác               ─ Cookies
─ Press                 ─ DMCA

© 2026 muonnoi.org · social-first · privacy-first · life-first
```

---

## 3. MANIFESTO

**File:** `apps/web/public/manifesto/index.html`
**URL:** `muonnoi.org/manifesto`

### Title

**VI:** Tuyên ngôn Muôn Nơi
**EN:** Muôn Nơi Manifesto

### Full text (VI)

```
TUYÊN NGÔN MUÔN NƠI

Chúng tôi tin rằng internet đã đi quá xa khỏi con người.

Mạng xã hội đã trở thành nơi thu hoạch sự chú ý.
Thuật toán đã trở thành kẻ quyết định cảm xúc.
Dữ liệu cá nhân đã trở thành hàng hoá.
Tự do đã trở thành ảo giác giữa các quảng cáo.

Chúng tôi không tin điều này phải tiếp tục.

Chúng tôi tin rằng có một con đường khác.

Một internet không tracking.
Một mạng xã hội không gây nghiện.
Một nền tảng nơi giá trị đến từ việc bạn làm, không phải thời gian bạn lướt.
Một hệ thống nơi tự do đi cùng trách nhiệm, và trách nhiệm tạo ra niềm tin.

Đó là Muôn Nơi.

Muôn Nơi không xây để giữ bạn trong màn hình.
Muôn Nơi xây để đưa bạn ra thế giới thật —
học điều thật, gặp người thật, làm việc thật,
tạo ra giá trị thật, và sống một đời sống thật.

Chúng tôi tin:

— Tự do thật không phải vô trách nhiệm.
  Tự do thật là biết rõ luật, rõ chuẩn, rõ an toàn,
  và chọn đi đúng vì chính mình.

— Riêng tư không phải thứ xa xỉ.
  Riêng tư là mặc định. Là quyền cơ bản.
  Dữ liệu của bạn thuộc về bạn.

— Bằng chứng là gốc của niềm tin.
  Không bằng chứng thật, không có giá trị thật.
  Không có giá trị thật, không có phần thưởng.

— Cộng đồng quan trọng hơn thuật toán.
  Con người quyết định ai đáng tin.
  Không phải engagement score.

— Đi chậm để đi đúng.
  Khoá nền tảng trước, mở chức năng sau.
  Không phá hệ thống vì áp lực tăng trưởng.

Chúng tôi đang xây tám lớp hạ tầng:

1. Lớp công khai — nơi mọi người tìm hiểu Muôn Nơi
2. Lớp xã hội — nơi mọi người đăng ký, kết nối, đăng tin
3. Lớp AI — nơi AI hỗ trợ thảo luận và kiểm chứng nguồn
4. Lớp nhiệm vụ đời sống — bảy hệ quest cho học, đi, làm,
   gia đình, sức khoẻ, sáng tạo, cộng đồng
5. Lớp tin cậy — xác minh, cam kết, khiếu nại, audit
6. Lớp vận hành — operator gateway cho cộng đồng và tổ chức
7. Lớp văn minh — mười hai vùng cốt lõi của một xã hội khoẻ
8. Lớp lõi — hạ tầng backend, AI, workflow

Đây không phải tham vọng. Đây là cấu trúc.
Mỗi lớp có chuẩn riêng, có giới hạn riêng, có lộ trình riêng.

Chúng tôi bắt đầu từ Đà Lạt.
Một thành phố nhỏ, sương mù, đủ chậm để bắt đầu đúng.
Tháng đầu, chúng tôi mở 30 nhiệm vụ với 50 Local Host.
Ai đó đến học pha cà phê.
Ai đó đến ăn cơm với gia đình K'Ho.
Ai đó đến nghe câu chuyện chiến tranh từ một cụ già.
Mỗi khoảnh khắc đó là một bằng chứng có thật.
Mỗi bằng chứng đó là một viên gạch của Muôn Nơi.

Chúng tôi sẽ mở rộng — Sài Gòn, Hà Nội, Bangkok, Singapore,
Tokyo, Paris, New York. Mỗi nơi một nhịp.

Nhưng nguyên tắc không đổi:

Sống thật. Học thật. Làm thật. Tạo giá trị thật.

Nếu bạn tin điều này —
chúng tôi mời bạn đi cùng.

Trần Hà Tâm
Người sáng lập Muôn Nơi
Đà Lạt, 2026
```

### Full text (EN)

```
THE MUÔN NƠI MANIFESTO

We believe the internet has drifted too far from humanity.

Social media has become a harvest of attention.
Algorithms have become arbiters of emotion.
Personal data has become merchandise.
Freedom has become an illusion between ads.

We do not believe this must continue.

We believe there is another way.

An internet without tracking.
A social network without addiction.
A platform where value comes from what you do,
not the time you scroll.
A system where freedom comes with responsibility,
and responsibility builds trust.

That is Muôn Nơi.

Muôn Nơi is not built to keep you on a screen.
Muôn Nơi is built to bring you back to the real world —
to learn real things, meet real people, do real work,
create real value, live a real life.

We believe:

— True freedom is not irresponsibility.
  True freedom is knowing the rules, the standards,
  the safety — and choosing the right path for yourself.

— Privacy is not a luxury.
  Privacy is the default. A basic right.
  Your data belongs to you.

— Proof is the root of trust.
  No real proof, no real value.
  No real value, no real reward.

— Community matters more than algorithms.
  People decide who is trustworthy.
  Not an engagement score.

— Move slowly to move correctly.
  Lock the foundation first, open features later.
  Do not break the system for growth pressure.

We are building eight layers of infrastructure:

1. Public layer — where people learn about Muôn Nơi
2. Social layer — where people register, connect, share
3. AI layer — where AI assists discussion and source verification
4. Life Quest layer — seven systems for learning, travel, work,
   family, health, creation, community
5. Trust layer — verification, commitment, complaints, audit
6. Operator layer — gateway for communities and organizations
7. Civilization layer — twelve core domains of a healthy society
8. Core layer — backend, AI, workflow infrastructure

This is not ambition. This is structure.
Each layer has its own standards, limits, and roadmap.

We start in Đà Lạt.
A small, foggy city — slow enough to start right.
In the first month, we open 30 quests with 50 Local Hosts.
Someone comes to learn specialty coffee.
Someone comes to share a meal with a K'Ho family.
Someone comes to hear a war story from an elder.
Each moment is a verifiable proof.
Each proof is a brick of Muôn Nơi.

We will expand — Saigon, Hanoi, Bangkok, Singapore,
Tokyo, Paris, New York. Each at its own pace.

But the principles do not change:

Live real. Learn real. Work real. Create real value.

If you believe this —
we invite you to walk with us.

Trần Hà Tâm
Founder, Muôn Nơi
Đà Lạt, 2026
```

---

## 4. ABOUT

**File:** `apps/web/public/about/index.html`
**URL:** `muonnoi.org/about`

### Title

**VI:** Câu chuyện Muôn Nơi
**EN:** The Muôn Nơi Story

### Body

```
VI:

Muôn Nơi bắt đầu từ một câu hỏi đơn giản:

Internet đáng lẽ phải làm cho con người gần nhau hơn,
biết nhau hơn, hiểu nhau hơn — vậy tại sao nó đang làm
ngược lại?

Năm 2024, sau hơn một thập kỷ làm việc với công nghệ,
xuất bản, cộng đồng và giáo dục, Trần Hà Tâm bắt đầu
phác thảo một thứ khác. Không phải một mạng xã hội mới
để thay thế những cái cũ. Không phải một super-app
gom mọi thứ. Mà là một hệ điều hành cho đời sống —
nơi con người có thể sống, học, làm, đi và đóng góp
mà không bị theo dõi, không bị thao túng, không bị
khai thác.

Muôn Nơi không phải một sản phẩm. Đây là một hệ tầng —
xây từng lớp một, kiểm tra từng nguyên tắc một,
mở từng tính năng một khi nền móng đã chắc.

Hôm nay, Muôn Nơi có:

— Một bộ tài liệu vận hành công khai
  tại docs.muonnoi.org
— Một ứng dụng social core v1.0
  tại app.muonnoi.org
— Một không gian thảo luận có AI hỗ trợ
  tại ai.muonnoi.org
— Một cổng vận hành cho cộng đồng và tổ chức
  tại lamviec.muonnoi.org
— Và một lớp nhiệm vụ đời sống mới,
  khởi đầu tại dulich.muonnoi.org từ Đà Lạt.

Mỗi lớp được xây với cùng các nguyên tắc:
không tracking, không feed gây nghiện, link bền,
dữ liệu tối thiểu, bằng chứng làm gốc.

Chúng tôi đang ở đầu hành trình.

EN:

Muôn Nơi began with a simple question:

The internet was supposed to bring people closer,
to help us know and understand each other better —
why is it doing the opposite?

In 2024, after more than a decade working across
technology, publishing, community, and education,
Trần Hà Tâm began sketching something different.
Not another social network to replace the old ones.
Not a super-app gathering everything in one place.
But an operating system for life — where people
can live, learn, work, travel, and contribute
without being tracked, manipulated, or exploited.

Muôn Nơi is not a product. It is infrastructure —
built layer by layer, tested principle by principle,
opening feature by feature once the foundation holds.

Today, Muôn Nơi includes:

— Public operating documentation
  at docs.muonnoi.org
— A social core application v1.0
  at app.muonnoi.org
— An AI-augmented discussion space
  at ai.muonnoi.org
— An operations gateway for communities and organizations
  at lamviec.muonnoi.org
— And a new life quest layer,
  beginning at dulich.muonnoi.org from Đà Lạt.

Every layer is built with the same principles:
no tracking, no addictive feeds, stable links,
minimal data, proof at the root.

We are at the beginning of the journey.
```

### Founder section

```
VI:

Trần Hà Tâm — Người sáng lập

Trần Hà Tâm là tác giả của 54 cuốn sách, nhà tổ chức
cộng đồng, và người sáng lập VIET CAN NEW CORP.
Trong hơn một thập kỷ qua, anh đã làm việc ở giao
điểm giữa công nghệ, xuất bản, và đời sống cộng đồng
tại Việt Nam và Hoa Kỳ.

Muôn Nơi là kết quả của hành trình đó — một nỗ lực
để mang lại một lớp internet phục vụ đời sống thật,
không phải thay thế nó.

EN:

Trần Hà Tâm — Founder

Trần Hà Tâm is the author of 54 books, a community
organizer, and the founder of VIET CAN NEW CORP.
For over a decade, he has worked at the intersection
of technology, publishing, and community life
across Vietnam and the United States.

Muôn Nơi is the result of that journey — an effort
to bring back an internet that serves real life,
rather than replacing it.
```

---

## 5. ECOSYSTEM

**File:** `apps/web/public/ecosystem/index.html`
**URL:** `muonnoi.org/ecosystem`
**Status:** UPDATE existing page

### Title

**VI:** Hệ Sinh Thái Muôn Nơi
**EN:** The Muôn Nơi Ecosystem

### Intro (giữ nguyên + mở rộng)

```
VI:

Trang này là bản đồ mô-đun. Mỗi mô-đun là một app
độc lập, liên kết về Muôn Nơi core, có chuẩn riêng
và lộ trình riêng. Bạn sẽ cập nhật dần từng phần
mà không phá core.

EN:

This is the modules map. Each module is an independent
app, connected to Muôn Nơi core, with its own standards
and roadmap. The ecosystem expands part by part —
without breaking the core.
```

### Tám lớp hạ tầng (MỚI — thay phần hiện tại)

```
LỚP A · CÔNG KHAI / PUBLIC
muonnoi.org          Landing, tư tưởng, bản đồ
docs.muonnoi.org     Tài liệu vận hành, API plan, pháp lý

LỚP B · XÃ HỘI / SOCIAL
app.muonnoi.org      Social core (feed, profile, verify, commit)
ai.muonnoi.org       Thảo luận có AI hỗ trợ
chat.muonnoi.org     Nhắn tin (sắp ra mắt)

LỚP C · NHIỆM VỤ ĐỜI SỐNG / LIFE QUEST
chochoi.muonnoi.org  Life Quest Hub
dulich.muonnoi.org   Đường Muôn Nơi (★ pilot Tháng 1)
hoctap.muonnoi.org   Học Đời
family.muonnoi.org   Family Mission
suckhoe.muonnoi.org  Một Ngày Khoẻ
sangtao.muonnoi.org  Vườn Sáng Tạo
congdong.muonnoi.org Cồng

LỚP D · TIN CẬY / TRUST
verify.muonnoi.org   Xác minh danh tính
trust.muonnoi.org    Trust Score công khai

LỚP E · VẬN HÀNH / OPERATOR
lamviec.muonnoi.org  Cổng vận hành cho cộng đồng / tổ chức

LỚP F · VĂN MINH / CIVILIZATION
12 vùng cốt lõi:
wellbeing · family · community_trust · learning · economy
health · environment · governance · infrastructure · culture
media_integrity · security

LỚP G · CUỘC SỐNG MỞ RỘNG / EXTENDED LIFE
nhachung.muonnoi.org Nhà Chung (co-living)
dautu.muonnoi.org    Đầu tư cộng đồng (giai đoạn sau)

LỚP H · LÕI / CORE
api.muonnoi.org      Public product API
api.ai.muonnoi.org   AI service
api.flow.iai.one     Workflow execution (cross-ecosystem)
api.ai.iai.one       Shared AI capability layer
identity.muonnoi.org SSO + profile root
wallet.muonnoi.org   Wallet, receipts, payout
```

### Module cards (giữ + thêm mới)

```
Social Core
Đăng nhập, hồ sơ, feed, search, anti-spam.
Mục tiêu ổn định trước khi mở rộng.
[Vào ứng dụng →]

Đường Muôn Nơi ★ PILOT
Mỗi điểm đến là một thử thách. Mỗi thử thách mang một cuộc gặp.
Khởi động Tháng 1 tại Đà Lạt với 30 quests và 50 Local Host.
[Mở Đường Muôn Nơi →]

Học Đời
Mỗi ngày học một kỹ năng đời, có bằng chứng thật.
Bắt đầu Tháng 2.
[Tìm hiểu →]

Family Mission
Gia đình cùng chơi để hiểu nhau và lớn lên cùng nhau.
Bắt đầu Tháng 4.
[Tìm hiểu →]

Một Ngày Khoẻ
Mỗi ngày một hành động nhỏ để sống khoẻ hơn.
Bắt đầu Tháng 7.
[Tìm hiểu →]

Việc Có Lý
Mỗi công việc nhỏ là một bước xây uy tín thật.
Bắt đầu Tháng 7.
[Tìm hiểu →]

Vườn Sáng Tạo
Mỗi ngày tạo một thứ nhỏ, cộng đồng giúp nó thành hình thật.
Bắt đầu Tháng 10.
[Tìm hiểu →]

Cồng
Mỗi tuần một việc tốt cho cộng đồng, có bằng chứng và người cùng làm.
Bắt đầu Tháng 10.
[Tìm hiểu →]

Nhà Chung
Co-living, nội quy, xác minh, vận hành cộng đồng.
[Mở Nhà Chung →]
```

---

## 6. ROADMAP

**File:** `apps/web/public/roadmap/index.html`
**URL:** `muonnoi.org/roadmap`
**Status:** UPDATE existing page

### Title

**VI:** Lộ Trình Muôn Nơi
**EN:** The Muôn Nơi Roadmap

### Intro (giữ)

```
VI: Chậm và chắc. Khoá nền tảng trước. Mở chức năng sau. Không phá hệ thống.
EN: Slow and steady. Lock the foundation first. Open features later. Never break the system.
```

### 6 giai đoạn (thay 4 hiện tại)

```
GIAI ĐOẠN 1 · SOCIAL-FIRST                               [✓ ĐÃ XONG v1.0]
Auth + Profile + Feed + Search + Anti-spam, trải nghiệm mượt.

GIAI ĐOẠN 2 · TRUST CORE                                 [✓ ĐÃ XONG]
Verify · Commit · Complaints · Admin · Audit log.

GIAI ĐOẠN 3 · LIFE QUEST OS                              [★ ĐANG LÀM]
Bảy hệ nhiệm vụ đời sống, khởi động Đường Muôn Nơi tại Đà Lạt.

GIAI ĐOẠN 4 · MARKETPLACE                                [Q3 2026]
Tài liệu, khoá học, dịch vụ, trải nghiệm địa phương.
Mở theo chuẩn minh bạch.

GIAI ĐOẠN 5 · CHAT → CALL                                [Q4 2026]
Nhắn tin trước, gọi sau. Mở theo hạ tầng và bảo mật.

GIAI ĐOẠN 6 · ECOSYSTEM ĐẦY ĐỦ                          [2027+]
Nhà Chung, đầu tư cộng đồng, app mobile,
mở rộng quốc tế theo từng thành phố.
```

### Hai mốc (giữ + thêm)

```
MỐC                              TƯƠNG LAI
1.000.000 tài khoản              Mobile App

Khi đạt mốc, mở tốc độ cao        Mobile-first từ hôm nay,
và chuẩn bị app mobile.           app ra khi product-market fit
                                  đủ mạnh.
```

### Pilot cities timeline (MỚI)

```
THÀNH PHỐ KHỞI ĐỘNG / PILOT CITIES

Tháng 1   Đà Lạt              [★ Đang chạy / Live]
Tháng 2   Sài Gòn             [Tiếp theo]
Tháng 3   Hà Nội              [Tiếp theo]
Tháng 5   Hội An              
Tháng 7   Bangkok             
Tháng 8   Singapore           
Tháng 10  Tokyo               
Tháng 12  Paris               
2027 Q1   New York            
```

---

## 7. QUESTS OVERVIEW

**File:** `apps/web/public/quests/index.html`
**URL:** `muonnoi.org/quests`
**Status:** NEW page

### Title

**VI:** Life Quest OS — Hệ nhiệm vụ đời sống
**EN:** Life Quest OS — A life quest system

### Hero

```
VI:
Bảy hệ nhiệm vụ đời sống.
Một công thức duy nhất: Play → Learn → Build → Prove → Grow.
Một mục tiêu duy nhất: tạo giá trị thật.

EN:
Seven life quest systems.
One formula: Play → Learn → Build → Prove → Grow.
One purpose: create real value.
```

### Section 1: Vì sao Life Quest?

```
VI:

Chúng tôi xây Life Quest OS vì một niềm tin đơn giản:

Sự tiến bộ trong đời sống không đến từ thời gian màn hình.
Nó đến từ những việc nhỏ làm đều đặn, có bằng chứng,
có người chứng kiến, và có ý nghĩa thật.

Đó là cách bạn học một kỹ năng.
Đó là cách bạn gặp một người bạn mới.
Đó là cách bạn xây một mối quan hệ.
Đó là cách bạn tạo ra một sản phẩm.
Đó là cách bạn đóng góp cho cộng đồng.

Life Quest OS là khung để biến đời sống thành
một chuỗi nhiệm vụ có ý nghĩa — không phải một
trò chơi giải trí.

EN:

We built Life Quest OS from a simple belief:

Progress in life does not come from screen time.
It comes from small things done consistently,
with proof, with witnesses, with real meaning.

That is how you learn a skill.
That is how you meet a new friend.
That is how you build a relationship.
That is how you create a product.
That is how you contribute to community.

Life Quest OS is the framework that turns life into
a series of meaningful missions — not a game
for entertainment.
```

### Section 2: Công thức Play → Earn

```
VI:

Công thức của chúng tôi:

   Play → Learn → Build → Prove → Grow → Earn by real value

Bạn không "chơi để kiếm tiền nhanh".

Bạn tham gia để:
— giỏi hơn
— khoẻ hơn
— đi được nhiều nơi hơn
— gặp được người thật
— làm được việc thật
— tạo được sản phẩm thật
— có hồ sơ tín nhiệm thật
— và có cơ hội thu nhập khi tạo giá trị thật

Tiền chỉ xuất hiện khi giá trị thật được tạo ra.
Đây là quy tắc bất khả xâm phạm.

EN:

Our formula:

   Play → Learn → Build → Prove → Grow → Earn by real value

You are not "playing to earn money fast."

You are joining to:
— become better
— become healthier
— travel more places
— meet real people
— do real work
— create real products
— build real reputation
— and have real income opportunities when you create real value

Money appears only when real value is created.
This is the inviolable rule.
```

### Section 3: Bảy hệ — cards detail

(Same as Section 3 of homepage but with more detail per card)

### Section 4: Sáu nguyên tắc thiết kế

```
1. Bằng chứng là gốc. Không proof, không reward.
   Proof is the root. No proof, no reward.

2. Output đời thực thắng thời gian màn hình.
   Real-world output beats screen time.

3. Không token. Không bao giờ.
   No token. Never.

4. Không hứa "ai chơi cũng có tiền".
   No promise of "anyone can earn."

5. Riêng tư trước tiên — di sản từ Muôn Nơi.
   Privacy-first — inherited from Muôn Nơi.

6. Có giới hạn an toàn (Wellbeing Cap).
   With a wellbeing cap.
```

### Section 5: Sáu loại điểm

```
XP        Kinh nghiệm           không đổi tiền
Trust     Tín nhiệm             không đổi tiền, xuất khẩu được
Impact    Đóng góp xã hội       không đổi tiền
Skill     Kỹ năng               không đổi tiền
Credit    Sponsor credit        đổi voucher
Earning   Thu nhập thật         USD/VND từ giá trị thật

XP, Trust, Impact, Skill là tài sản phi tài chính.
Không mua được, không bán được.

Credit và Earning chỉ xuất hiện khi có giá trị thật được tạo.
```

### CTA cuối

```
[Tham gia pilot Đà Lạt →]    [Trở thành Local Host →]
[Đăng ký nhận tin →]          [Đọc Manifesto →]
```

---

## 8. BẢY HỆ NHIỆM VỤ — 7 TRANG RIÊNG

Mỗi hệ một sub-page trên muonnoi.org (chưa cần subdomain live ngay):

```
apps/web/public/quests/dulich/index.html      → /quests/dulich
apps/web/public/quests/hoctap/index.html      → /quests/hoctap
apps/web/public/quests/family/index.html      → /quests/family
apps/web/public/quests/suckhoe/index.html     → /quests/suckhoe
apps/web/public/quests/lamviec/index.html     → /quests/lamviec
apps/web/public/quests/sangtao/index.html     → /quests/sangtao
apps/web/public/quests/congdong/index.html    → /quests/congdong
```

Mỗi trang cấu trúc giống nhau:
- Hero: tên + tagline
- Vì sao hệ này tồn tại
- Cơ chế cốt lõi
- Ví dụ nhiệm vụ (5-10 cái)
- Cách kiếm tiền (cho user)
- Khi nào ra mắt
- CTA: waitlist hoặc tham gia

Em sẽ viết chi tiết 3 trang quan trọng nhất (Đường Muôn Nơi, Học Đời, Family) trong file riêng. Tham khảo file `QUEST_TAXONOMY_DULICH_DALAT_V1.md` cho danh sách 30 quest Đà Lạt đầy đủ.

---

## 9. ĐƯỜNG MUÔN NƠI PILOT

**File:** `apps/web/public/quests/dulich/index.html`
**URL:** `muonnoi.org/quests/dulich`
**Note:** trang công bố trên muonnoi.org. Phân biệt với `dulich.muonnoi.org` (app live)

### Hero

```
VI:
Đường Muôn Nơi
Mỗi điểm đến là một thử thách.
Mỗi thử thách mang một cuộc gặp.

EN:
Đường Muôn Nơi · Trails of Muôn Nơi
Every destination is a quest.
Every quest brings a meeting.
```

**Eyebrow:** PILOT · Tháng 1 · Đà Lạt

### Story-style intro

```
VI:

Hãy tưởng tượng bạn đến Đà Lạt sáng sớm.
Không lịch trình. Không tour. Không vội.

Bạn mở Muôn Nơi và thấy một danh sách 30 nhiệm vụ.

Một trong số đó là:
"Bình minh đèo Mimosa — đến trước 5h30 sáng,
ngắm sương trắng phủ thông."

Bạn đi. Bạn chụp một bức ảnh. Định vị GPS xác nhận.
Receipt được sinh ra. Một điểm Trust vào hồ sơ bạn.

Buổi chiều, bạn chọn một quest khác:
"Bữa cơm với gia đình K'Ho."

Một host địa phương — chị H'Liêu, K'Ho Cil,
mở cửa nhà mình. Bạn ăn cơm. Bạn nghe câu chuyện.
Bạn ghi lại. Host ký xác nhận. Receipt thứ hai
được sinh ra.

Ngày mai bạn học pha cà phê specialty với một barista
ở Cầu Đất. Ngày kia bạn ngồi nghe một cụ già kể chuyện
chiến tranh.

Cuối tuần, bạn có 5 receipts.
Mỗi receipt là một bằng chứng đời thực.
Mỗi receipt có hash, có thể xuất khẩu, không thể giả mạo.

Đây không phải du lịch.
Đây là một cách sống khác.

EN:

Imagine you arrive in Đà Lạt early in the morning.
No itinerary. No tour. No hurry.

You open Muôn Nơi and see a list of 30 quests.

One of them reads:
"Sunrise at Mimosa Pass — arrive before 5:30 AM,
watch the white mist roll over the pines."

You go. You take a photo. GPS confirms your location.
A receipt is generated. A Trust point enters your profile.

In the afternoon, you choose another quest:
"A meal with a K'Ho family."

A local host — Ms. H'Liêu, K'Ho Cil ethnic group —
opens her home. You share a meal. You listen to her story.
You write it down. The host signs to confirm.
A second receipt is generated.

Tomorrow, you learn specialty coffee from a barista in
Cầu Đất. The day after, you sit and listen to an elder
tell stories from the war.

By the weekend, you have five receipts.
Each receipt is real-world proof.
Each receipt has a hash — exportable, unforgeable.

This is not tourism.
This is another way of living.
```

### What you get

```
VI:

Mỗi quest hoàn thành:
— XP cho hồ sơ
— Trust điểm cho uy tín
— Receipt có hash, xuất khẩu được dưới dạng Verifiable Credential
— Cơ hội tham gia quests cao cấp hơn
— Bạn bè mới — real ones

Với Local Host:
— Thu nhập từ trải nghiệm bạn tổ chức
— Insurance bảo vệ
— Trust điểm tăng theo từng khách thật
— Visibility trong cộng đồng

EN:

Each completed quest:
— XP for your profile
— Trust points for your reputation
— A receipt with hash, exportable as a Verifiable Credential
— Access to higher-tier quests
— New friends — real ones

For Local Hosts:
— Income from experiences you organize
— Insurance protection
— Trust points growing with every real guest
— Visibility within the community
```

### 30 quest preview (chia 5 nhóm)

```
NHÓM 1 · ĐƯỜNG ÍT NGƯỜI BIẾT (6 quests)
Bình minh đèo Mimosa · Suối Tía thượng nguồn · Tổ điểm Tâm An
Làng K'Ho Cil · Vườn dâu Cầu Đất bình minh · Lối mòn Lang Biang

NHÓM 2 · LOCAL HOST GIA ĐÌNH (6 quests)
Bữa cơm K'Ho · Cà phê sáng với người chăm dâu · Học pha cà phê specialty
Học làm rượu cần · Nghe chuyện chiến tranh từ cụ già · Học vẽ thổ cẩm

NHÓM 3 · NGHỀ THỦ CÔNG (6 quests)
Làm tơ tằm · Dệt thổ cẩm · Làm rượu cần master
Làm mứt · Làm trà artichoke · Làm gốm

NHÓM 4 · CÂU CHUYỆN THẬT (6 quests)
Phỏng vấn cụ già · Ghi nghề sắp mất · Viết về café gia đình
Kể truyền thuyết K'Ho · Ghi lại lễ hội · Viết về ngọn núi

NHÓM 5 · TẠO GUIDE (6 quests)
1-day Đà Lạt off-tourism · K'Ho experience · Specialty coffee trail
Strawberry farm trail · Sunrise trail · Family cuisine trail
```

### CTA

```
[Tham gia hành trình →]      → app form
[Trở thành Local Host →]      → /host
[Đăng ký nhận tin →]          → email signup
```

---

## 10. SECURITY & TRUST

**File:** `apps/web/public/security/index.html`
**URL:** `muonnoi.org/security`
**Status:** UPDATE existing page (mở rộng)

### Title

**VI:** Bảo Mật & Niềm Tin
**EN:** Security & Trust

### Intro

```
VI:
Mọi thứ ở Muôn Nơi được xây theo nguyên tắc:
bảo mật trước, dữ liệu tối thiểu, minh bạch chuẩn.

EN:
Everything at Muôn Nơi is built by principle:
security first, minimal data, transparent standards.
```

### Sections (giữ 3 hiện có + thêm 4 mới)

```
1. Headers & CSP                          [giữ nguyên]
2. Session & Auth                         [giữ nguyên]
3. Anti-bot & Abuse                       [giữ nguyên]

4. Proof Security                         [MỚI]
   Mỗi proof có hash riêng. Multi-witness cho quests cộng đồng.
   Random audit 5-10% submissions. AI fraud detection.

5. Host Safety                            [MỚI]
   KYC tier 3 cho Local Host. Training 4 giờ offline.
   Insurance bundled. Dispute resolution có audit.
   Emergency hotline 24/7 cho pilot cities.

6. Child & Family Safety                  [MỚI]
   Tài khoản trẻ < 13 chỉ trong family pod, no public profile.
   Parental consent bắt buộc. COPPA / GDPR-K compliant.
   Friend requests qua family pod kiểm soát.

7. Privacy Protection                     [MỚI]
   Không tracking pixel, không SDK bên thứ ba.
   Dữ liệu tối thiểu. GDPR / DSA / CCPA compliant từ ngày một.
   Quyền xoá, quyền truy cập, quyền chuyển dữ liệu.
```

---

## 11. GUIDE

**File:** `apps/web/public/guide/index.html`
**URL:** `muonnoi.org/guide`
**Status:** UPDATE existing page

### Title

**VI:** Hướng Dẫn
**EN:** Guide

### Sections (giữ 4 hiện có + thêm 4 mới)

```
1. Vào ứng dụng                          [giữ]
2. Xác minh                              [giữ]
3. Cam kết                               [giữ]
4. Khiếu nại                             [giữ]

5. Cách tham gia Quests                  [MỚI]
   Đăng ký Muôn Nơi → chọn hệ quest → chọn nhiệm vụ → đi làm
   → nộp bằng chứng → nhận điểm và phần thưởng.

6. Cách nộp bằng chứng (Proof)           [MỚI]
   Text + photo có GPS + (host signature nếu cần)
   + reflection text. AI sẽ pre-review trước.

7. Cách kiếm thu nhập đúng cách          [MỚI]
   Trở thành Local Host, Mentor, Quest Curator,
   hoặc hoàn thành Work Quest. Không có "chơi là có tiền".
   Có "tạo giá trị thật thì có thu nhập thật."

8. Quy tắc cộng đồng                     [MỚI]
   Không quấy rối, không gian lận proof, không sock puppet,
   không thao túng review, không xâm phạm riêng tư.
   Vi phạm → trust penalty → có thể suspend.
```

---

## 12. BECOME A HOST

**File:** `apps/web/public/host/index.html`
**URL:** `muonnoi.org/host`
**Status:** NEW page

### Title

**VI:** Trở thành Local Host
**EN:** Become a Local Host

### Hero

```
VI:
Mở cửa nhà bạn. Chia sẻ điều bạn biết.
Đón những con người thật đến từ muôn nơi.

EN:
Open your door. Share what you know.
Welcome real people from everywhere.
```

### Body

```
VI:

Local Host là trái tim của Đường Muôn Nơi.

Bạn có thể là:
— Chủ một homestay
— Người làm cà phê specialty
— Người dạy nghề thủ công
— Một gia đình K'Ho, Chăm, Khmer, Mường, Tày...
— Người làm farm
— Người kể chuyện
— Một nghệ sĩ
— Bất kỳ ai có một mảnh đời sống đáng chia sẻ

Bạn không cần một website. Không cần đăng quảng cáo.
Không cần biết tiếng Anh. Bạn chỉ cần là bạn —
và sẵn sàng đón khách đúng cách.

Muôn Nơi sẽ:
— Xác minh danh tính bạn (KYC tier 3)
— Đào tạo 4 giờ offline về an toàn và đón khách
— Mua bảo hiểm bảo vệ trong thời gian đón khách
— Gửi khách đến qua hệ thống quest
— Trả 90% phí trải nghiệm cho bạn
— Tăng Trust điểm theo từng khách thật

Bạn quyết định:
— Loại trải nghiệm bạn tổ chức
— Giá
— Số khách / ngày
— Lịch sẵn sàng

EN:

Local Hosts are the heart of Đường Muôn Nơi.

You might be:
— A homestay owner
— A specialty coffee maker
— A craft artisan
— A K'Ho, Chăm, Khmer, Mường, Tày family
— A farmer
— A storyteller
— An artist
— Anyone with a piece of life worth sharing

You don't need a website. You don't need to advertise.
You don't need to speak English. You just need to be yourself —
and ready to host with care.

Muôn Nơi will:
— Verify your identity (KYC tier 3)
— Train you 4 hours offline on safety and hosting
— Provide insurance during host activities
— Send you guests through the quest system
— Pay you 90% of the experience fee
— Grow your Trust score with every real guest

You decide:
— The type of experience you offer
— The price
— Guests per day
— Your availability
```

### CTA

```
[Đăng ký Local Host Đà Lạt →]
[Đợi mở Sài Gòn / Hà Nội →]
[Câu hỏi thường gặp →]
```

---

## 13. FOR PARTNERS

**File:** `apps/web/public/partners/index.html`
**URL:** `muonnoi.org/partners`
**Status:** NEW page

### Title

**VI:** Đối tác
**EN:** For Partners

### Hero

```
VI:
Muôn Nơi mở cửa cho những đối tác có cùng giá trị:
xây hạ tầng cho đời sống thật, không tracking,
không thao túng, không khai thác.

EN:
Muôn Nơi welcomes partners who share our values:
building infrastructure for real life, without tracking,
without manipulation, without exploitation.
```

### Partner types

```
1. THƯƠNG HIỆU ESG / ESG BRANDS
   Đặt sponsored quests có ý nghĩa thật. Trả tiền cho hành động thật.
   Không quảng cáo hành vi.

2. TỔ CHỨC PHI LỢI NHUẬN / NGOs
   Dùng Cồng layer cho community impact.
   Verified impact reporting có hash.

3. CHÍNH QUYỀN ĐỊA PHƯƠNG / LOCAL GOVERNMENT
   Vận hành city quests qua Tourism Board partnership.
   Civic engagement dashboard qua Cồng.

4. CƠ SỞ GIÁO DỤC / EDUCATIONAL INSTITUTIONS
   Cấp chứng nhận có hash qua Học Đời.
   Lớp X cohort programs.

5. CÔNG TY BẢO HIỂM / INSURANCE COMPANIES
   Health behavior data có consent qua Một Ngày Khoẻ.
   Travel insurance qua Đường Muôn Nơi.

6. NỀN TẢNG TUYỂN DỤNG / HIRING PLATFORMS
   Verified Trust Score + Skill Badge qua Việc Có Lý.
   Verifiable Credentials xuất khẩu.

7. ĐỘI NGŨ NGHIÊN CỨU / RESEARCH TEAMS
   Anonymized aggregate data cho 12 civilization domains.
   Wellbeing measurement, civic trust research.
```

### CTA

```
[Liên hệ team đối tác →]    partners@muonnoi.org
[Đọc các API contracts →]   docs.muonnoi.org/api
```

---

## 14. PRESS KIT

**File:** `apps/web/public/press/index.html`
**URL:** `muonnoi.org/press`
**Status:** NEW page

### Title

**VI:** Press Kit
**EN:** Press Kit

### Boilerplate (short — VI)

```
Muôn Nơi là hạ tầng số cho đời sống thật — một nền tảng nơi
học tập, làm việc, du lịch, gia đình, sức khoẻ, sáng tạo
và đóng góp cộng đồng diễn ra với bằng chứng thật, mối quan hệ
thật và giá trị thật. Được xây trên nguyên tắc không tracking,
không feed gây nghiện, dữ liệu tối thiểu và link bền. Thành lập
năm 2024 bởi Trần Hà Tâm, có trụ sở tại Đà Lạt, Việt Nam.
```

### Boilerplate (short — EN)

```
Muôn Nơi is digital infrastructure for real life — a platform
where learning, work, travel, family, health, creation, and
community contribution happen with verified proof, real
relationships, and real value. Built on principles of no tracking,
no addictive feed, minimal data, and stable links. Founded in 2024
by Trần Hà Tâm, based in Đà Lạt, Vietnam.
```

### Boilerplate (medium — VI)

```
Muôn Nơi (muonnoi.org) là một hệ điều hành xã hội số được xây
theo các nguyên tắc bảo mật trước, dữ liệu tối thiểu, và bằng
chứng làm gốc. Khác với mạng xã hội truyền thống, Muôn Nơi không
sử dụng feed gây nghiện, không thu thập hành vi để bán quảng cáo,
và không hứa hẹn "chơi để kiếm tiền nhanh". Thay vào đó, hệ tập
trung vào việc tạo giá trị thật thông qua bảy hệ nhiệm vụ đời sống
— bao gồm du lịch, học tập, gia đình, sức khoẻ, làm việc, sáng tạo
và đóng góp cộng đồng. Mỗi nhiệm vụ hoàn thành được ghi nhận bằng
một Receipt có hash, xuất khẩu được dưới dạng Verifiable Credential.

Muôn Nơi khởi động bằng pilot Đường Muôn Nơi tại Đà Lạt, Việt Nam,
với 30 nhiệm vụ và 50 Local Host được xác minh, trước khi mở rộng
ra các thành phố khác trong khu vực và toàn cầu.
```

### Founder bio

```
VI: (đã có ở section About)
EN: (đã có ở section About)
```

### Brand assets

```
Logo files: /press/assets/
- mn-logo-light.svg
- mn-logo-dark.svg
- mn-wordmark.svg
- mn-favicon.png

OG images: /press/assets/og/
- muonnoi-og-1200x630.png
- muonnoi-og-square.png

Photography: /press/assets/photos/
- founder-portrait.jpg
- dalat-pilot-photo-1.jpg (sau khi pilot launch)
- ...
```

### Press contact

```
Press inquiries: press@muonnoi.org
Partnership: partners@muonnoi.org
General: hello@muonnoi.org

Founder direct (cho tier-1 press only): tam@muonnoi.org
```

### Recent coverage

```
[Sẽ cập nhật khi có coverage thực tế]
```

---

## 15. FOOTER + NAVIGATION

### Header navigation chuẩn

```
[MN logo]  Trang chủ · Quests · Hệ sinh thái · Lộ trình
           Manifesto · Bảo mật · Hướng dẫn

           [VI/EN toggle]  [Theme toggle]  [Vào ứng dụng]
```

### Footer chuẩn (mở rộng 4 cột)

```
SẢN PHẨM              QUESTS                HỆ SINH THÁI         CÔNG TY
─ Ứng dụng            ─ Đường Muôn Nơi      ─ Nhà Chung           ─ Câu chuyện
─ AI Muôn Nơi         ─ Học Đời             ─ Đầu tư              ─ Manifesto
─ Quests              ─ Family Mission      ─ Verify              ─ Đối tác
─ Làm việc            ─ Một Ngày Khoẻ       ─ Trust               ─ Press
─ Hướng dẫn           ─ Việc Có Lý          ─ Docs                ─ Nghề nghiệp
─ Bảo mật             ─ Vườn Sáng Tạo
─ Trạng thái          ─ Cồng                PHÁP LÝ              KẾT NỐI
                                            ─ Privacy             ─ Email
                                            ─ Terms               ─ Newsletter
                                            ─ Cookies             ─ Telegram (?)
                                            ─ DMCA

MN · Muôn Nơi · Muốn nói
© 2026 muonnoi.org · social-first · privacy-first · life-first
Made in Đà Lạt, Vietnam · For everyone, everywhere
```

---

## 16. SEO META TAGS

### Homepage meta

```html
<title>Muôn Nơi · Hạ tầng số cho đời sống thật</title>
<meta name="description" content="Muôn Nơi là hạ tầng số cho đời sống thật — học tập, làm việc, du lịch, gia đình, sức khoẻ, sáng tạo và cộng đồng diễn ra với bằng chứng thật và giá trị thật. Không tracking, không feed gây nghiện." />

<meta property="og:title" content="Muôn Nơi · Internet trở lại với con người" />
<meta property="og:description" content="Bảy hệ nhiệm vụ đời sống. Một công thức: Play → Learn → Build → Prove → Grow. Một mục tiêu: tạo giá trị thật." />
<meta property="og:image" content="https://muonnoi.org/press/assets/og/muonnoi-og-1200x630.png" />
<meta property="og:url" content="https://muonnoi.org/" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Muôn Nơi" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Muôn Nơi · Internet trở lại với con người" />
<meta name="twitter:description" content="Hạ tầng số cho đời sống thật — không tracking, không feed gây nghiện, bằng chứng làm gốc." />
<meta name="twitter:image" content="https://muonnoi.org/press/assets/og/muonnoi-og-1200x630.png" />

<link rel="canonical" href="https://muonnoi.org/" />
```

### Quests page meta

```html
<title>Life Quest OS · Bảy hệ nhiệm vụ đời sống · Muôn Nơi</title>
<meta name="description" content="Life Quest OS là khung biến đời sống thành chuỗi nhiệm vụ có ý nghĩa. Bảy hệ: du lịch, học tập, gia đình, sức khoẻ, làm việc, sáng tạo, cộng đồng. Khởi động Đường Muôn Nơi tại Đà Lạt." />
```

### Manifesto page meta

```html
<title>Tuyên ngôn Muôn Nơi · Internet trở lại với con người</title>
<meta name="description" content="Chúng tôi tin rằng internet đã đi quá xa khỏi con người. Tuyên ngôn của Muôn Nơi về một hạ tầng số phục vụ đời sống thật." />
```

(Tương tự cho các trang khác)

### Đa ngôn ngữ

```html
<link rel="alternate" hreflang="vi" href="https://muonnoi.org/" />
<link rel="alternate" hreflang="en" href="https://muonnoi.org/en/" />
<link rel="alternate" hreflang="x-default" href="https://muonnoi.org/" />
```

---

## 17. DEV TASK LIST

### 17.1 Files cần TẠO MỚI

```
PUBLIC SHELL — muonnoi.org

apps/web/public/manifesto/index.html              [P0 — Week 1]
apps/web/public/about/index.html                  [P0 — Week 1]
apps/web/public/quests/index.html                 [P0 — Week 1]
apps/web/public/quests/dulich/index.html          [P0 — Week 1]
apps/web/public/quests/hoctap/index.html          [P1 — Week 2]
apps/web/public/quests/family/index.html          [P1 — Week 2]
apps/web/public/quests/suckhoe/index.html         [P2 — Week 3]
apps/web/public/quests/lamviec/index.html         [P2 — Week 3]
apps/web/public/quests/sangtao/index.html         [P2 — Week 3]
apps/web/public/quests/congdong/index.html        [P2 — Week 3]
apps/web/public/host/index.html                   [P0 — Week 1]
apps/web/public/partners/index.html               [P1 — Week 2]
apps/web/public/press/index.html                  [P1 — Week 2]

apps/web/public/press/assets/og/                  [P0 — Week 1]
  muonnoi-og-1200x630.png
  muonnoi-og-square.png
  quests-og-1200x630.png
  dulich-og-1200x630.png
  manifesto-og-1200x630.png

apps/web/public/press/assets/photos/              [P1 — Week 2]
  founder-portrait.jpg
  dalat-pilot-preview.jpg
  ...

apps/web/public/en/                               [P2 — Week 3]
  (English mirrors of all pages above)
```

### 17.2 Files cần UPDATE

```
apps/web/public/index.html                        [P0 — Week 1]
  - Thêm SECTION 3: Life Quest OS
  - Thêm SECTION 6: Pilot callout
  - Thêm SECTION 7: Principles
  - Update header nav (thêm Quests)
  - Update footer (4-column structure)

apps/web/public/ecosystem/index.html              [P0 — Week 1]
  - Thay structure thành 8 lớp hạ tầng
  - Thêm 7 quest cards mới
  - Update CTA

apps/web/public/roadmap/index.html                [P0 — Week 1]
  - Thay 4 phase thành 6 phase
  - Thêm Pilot Cities timeline
  - Update mốc

apps/web/public/security/index.html               [P1 — Week 2]
  - Giữ 3 sections hiện tại
  - Thêm 4 sections mới: Proof Security, Host Safety,
    Child & Family Safety, Privacy Protection

apps/web/public/guide/index.html                  [P1 — Week 2]
  - Giữ 4 sections hiện tại
  - Thêm 4 sections mới: Tham gia Quests, Nộp Proof,
    Kiếm thu nhập đúng cách, Quy tắc cộng đồng

apps/web/public/assets/ui.css                     [P0 — Week 1]
  - Thêm components: quest-card, host-card, proof-card,
    principle-card, pilot-callout
  - Thêm utility classes nếu cần

apps/web/public/assets/ui.js                      [P0 — Week 1]
  - Thêm interaction: theme toggle persistence,
    VI/EN toggle, mobile menu, accordion cho long pages
```

### 17.3 Routing + Headers

```
apps/web/public/_redirects                        [UPDATE]
  /manifesto       /manifesto/index.html       200
  /about           /about/index.html           200
  /quests          /quests/index.html          200
  /quests/dulich   /quests/dulich/index.html   200
  /host            /host/index.html            200
  /partners        /partners/index.html        200
  /press           /press/index.html           200
  /en/*            /en/:splat/index.html       200

apps/web/public/_headers                          [UPDATE]
  Strengthen CSP để allow images từ R2 cho photos
  Per-route caching headers
```

### 17.4 SEO + manifest

```
apps/web/public/sitemap.xml                       [UPDATE]
  Thêm tất cả new pages

apps/web/public/robots.txt                        [UPDATE]
  Allow new paths, disallow /admin/

apps/web/public/manifest.json                     [UPDATE]
  Update app name, description, screenshots
```

### 17.5 Subdomain landing pages (separate apps)

```
apps/dulich/public/index.html                     [P0 — Week 1]
  Landing page cho dulich.muonnoi.org
  (Live app, separate from /quests/dulich which is promo)

apps/hoctap/public/index.html                     [P1 — Future month]
apps/family/public/index.html                     [P1 — Future month]
(Các sub-app khác mở khi đến phase)
```

### 17.6 Content production

```
content/manifesto-vi.md                           [DONE in this file]
content/manifesto-en.md                           [DONE in this file]
content/about-vi.md                               [DONE in this file]
content/about-en.md                               [DONE in this file]

content/quests/dulich-30-quests.md                [P0 — Week 1]
  Full text 30 quests Đà Lạt
  (Reference: QUEST_TAXONOMY_DULICH_DALAT_V1.md từ master plan)

content/quests/[6 hệ khác].md                     [P1 — Week 2-3]

content/press/boilerplate-vi.md                   [DONE in this file]
content/press/boilerplate-en.md                   [DONE in this file]
content/press/founder-bio-vi.md                   [P1 — Week 2]
content/press/founder-bio-en.md                   [P1 — Week 2]
```

### 17.7 Timeline tổng

| Tuần | Output |
|---|---|
| **Tuần 1 (P0)** | Homepage update, Manifesto, About, Quests overview, Đường Muôn Nơi pilot promo, Host landing, Ecosystem update, Roadmap update, OG images, CSS/JS components, sitemap, redirects |
| **Tuần 2 (P1)** | Học Đời + Family promo pages, Partners page, Press kit, Security expansion, Guide expansion, founder bio assets |
| **Tuần 3 (P2)** | 4 remaining quest promo pages, English mirrors, complete photo assets |
| **Tuần 4** | Polish, testing, soft launch alongside Đường Muôn Nơi MVP |

---

## 18. INVESTOR-READY LANGUAGE BANK

Đây là bộ câu/đoạn em đã soạn để dùng trong pitch, deck, conversations — KHÔNG nói tỷ USD, KHÔNG hứa hẹn tài chính. Chỉ nói về giá trị, hạ tầng và tầm nhìn.

### One-liners

```
"Muôn Nơi là hạ tầng số cho đời sống thật."
"Muôn Nơi is digital infrastructure for real life."

"Chúng tôi không xây mạng xã hội. Chúng tôi xây hệ điều hành xã hội."
"We're not building a social network. We're building a social operating system."

"Internet trở lại với con người."
"The internet, made for human life again."

"Không tracking. Không feed gây nghiện. Không hứa hẹn ảo. Chỉ giá trị thật."
"No tracking. No addictive feed. No empty promises. Just real value."
```

### Three-paragraph pitch

```
VI:

Internet hiện tại đang vận hành theo mô hình thu hoạch sự chú ý.
Mọi nền tảng tối ưu thời gian màn hình, thuật toán thao túng cảm xúc,
và dữ liệu cá nhân trở thành hàng hoá. Người dùng trở thành sản phẩm.
Creator phụ thuộc thuật toán. Cộng đồng tan rã thành tương tác.

Muôn Nơi tin rằng có một con đường khác. Chúng tôi xây một hệ
điều hành xã hội số được thiết kế theo các nguyên tắc đối ngược:
không tracking, không feed gây nghiện, dữ liệu tối thiểu, và bằng
chứng làm gốc của niềm tin. Hệ có tám lớp hạ tầng — từ public shell
đến lớp văn minh — mỗi lớp có chuẩn riêng và lộ trình riêng.

Khác biệt cốt lõi nằm ở Life Quest OS: bảy hệ nhiệm vụ đời sống
nơi con người học, đi, làm, chăm sóc gia đình, sống khoẻ, sáng tạo
và đóng góp cộng đồng — mỗi hành động có bằng chứng thật, được AI
hỗ trợ và cộng đồng xác nhận. Receipts có hash, xuất khẩu được dưới
dạng Verifiable Credentials, mở khoá cơ hội việc làm, du lịch, học
bổng và bảo hiểm có ý nghĩa. Đây không phải mạng xã hội. Đây là
hạ tầng cho một cách sống khác.

EN:

The internet today runs on an attention-harvest model. Every
platform optimizes for screen time, algorithms manipulate emotion,
and personal data becomes merchandise. Users become products.
Creators depend on algorithms. Communities dissolve into interactions.

Muôn Nơi believes there is another way. We are building a social
operating system designed by inverted principles: no tracking, no
addictive feed, minimal data, and proof as the root of trust. Eight
infrastructure layers — from public shell to civilization layer —
each with its own standards and roadmap.

The core differentiator is Life Quest OS: seven life quest systems
where people learn, travel, work, care for family, live healthily,
create, and contribute to community — each action backed by real
proof, supported by AI, validated by community. Receipts carry hashes,
exportable as Verifiable Credentials, unlocking meaningful opportunities
in employment, travel, education, and insurance. This is not a social
network. This is infrastructure for a different way of living.
```

### Vision (without dollar numbers)

```
VI:

Trong mười năm tới, chúng tôi tin rằng hạ tầng internet sẽ phân chia
thành hai hệ: hệ tối ưu cho sự chú ý, và hệ tối ưu cho đời sống thật.
Hai hệ này sẽ phục vụ hai loại người khác nhau, hai văn hoá khác nhau,
và hai tương lai khác nhau.

Muôn Nơi đang xây hệ thứ hai.

Chúng tôi bắt đầu từ Đà Lạt, một thành phố nhỏ ở Việt Nam. Chúng tôi
sẽ mở rộng theo nhịp tự nhiên — từ Đông Nam Á, sang Đông Á, đến châu
Âu và Bắc Mỹ. Mỗi thành phố là một test thật về giá trị, về niềm tin
cộng đồng, về khả năng vận hành cross-cultural.

Mục tiêu của chúng tôi không phải định giá. Là tạo ra một hạ tầng số
được hàng trăm triệu người tin cậy đủ để gắn đời sống thật vào — và
một thế hệ sản phẩm và doanh nghiệp mới xây trên hạ tầng đó.

EN:

In the next ten years, we believe internet infrastructure will split
into two systems: one optimized for attention, one optimized for real
life. These two systems will serve two different types of people, two
different cultures, two different futures.

Muôn Nơi is building the second system.

We start in Đà Lạt, a small city in Vietnam. We will expand at a
natural pace — from Southeast Asia, to East Asia, to Europe, to
North America. Each city is a real test of value, of community trust,
of cross-cultural operability.

Our goal is not valuation. It is to create digital infrastructure
trusted by hundreds of millions enough to anchor their real lives —
and a generation of products and businesses built on that infrastructure.
```

### Why now (timing)

```
VI:

Ba làn sóng đang hội tụ:

Một, người dùng đang rời bỏ các mạng xã hội truyền thống vì kiệt sức.
Time spent giảm. Trust giảm. Mental health crisis lên. Câu hỏi "có
con đường khác không?" đang được hỏi rộng rãi.

Hai, AI đã đủ trưởng thành để hỗ trợ chứ không thay thế — review proof,
gợi ý cá nhân hoá, phát hiện gian lận, tóm tắt hành trình. Hạ tầng
AI giờ đủ rẻ để chạy ở mức consumer.

Ba, hạ tầng infrastructure đã đủ tốt — Cloudflare Workers + D1 + R2
cho phép một team nhỏ vận hành hạ tầng toàn cầu với chi phí rất thấp
mà không phụ thuộc Big Tech.

Đây là thời điểm để xây hệ thứ hai.

EN:

Three waves are converging:

First, users are leaving traditional social networks from exhaustion.
Time spent is declining. Trust is declining. Mental health crisis
is rising. The question "is there another way?" is being asked widely.

Second, AI is mature enough to assist rather than replace — review
proof, personalize suggestions, detect fraud, summarize journeys.
AI infrastructure is now cheap enough to run at consumer scale.

Third, infrastructure has become good enough — Cloudflare Workers
+ D1 + R2 lets a small team operate global infrastructure at very
low cost without dependency on Big Tech.

This is the moment to build the second system.
```

### What we have today (proof of progress)

```
VI:

Tính đến tháng 5 năm 2026, Muôn Nơi đã có:

— Sáu lớp hạ tầng đã online: public, social, AI, trust,
  operator, core (backend)
— Bộ tài liệu vận hành đầy đủ 10 chương tại docs.muonnoi.org
— Social core v1.0 stable tại app.muonnoi.org
— AI-augmented discussion space tại ai.muonnoi.org
— Operator gateway 12 civilization domains tại lamviec.muonnoi.org
— Sẵn sàng khởi động Life Quest OS pilot tại Đà Lạt Tháng 5/2026

Tất cả được xây bởi một team nhỏ, theo nguyên tắc không thoả hiệp,
không phụ thuộc framework hay third-party SDK ngoài Cloudflare stack.

EN:

As of May 2026, Muôn Nơi has:

— Six infrastructure layers online: public, social, AI, trust,
  operator, core (backend)
— Full operating documentation in 10 chapters at docs.muonnoi.org
— Social core v1.0 stable at app.muonnoi.org
— AI-augmented discussion space at ai.muonnoi.org
— Operator gateway with 12 civilization domains at lamviec.muonnoi.org
— Ready to launch Life Quest OS pilot in Đà Lạt May 2026

All built by a small team, by uncompromising principles, without
dependency on frameworks or third-party SDKs beyond the Cloudflare stack.
```

### Closing line

```
VI:
Nếu bạn tin rằng internet có thể tốt hơn — và bạn sẵn sàng giúp
xây hạ tầng cho điều đó — hãy nói chuyện với chúng tôi.

EN:
If you believe the internet can be better — and you're ready to
help build the infrastructure for it — talk to us.
```

---

## ĐÓNG GÓI CUỐI

### File này dùng để

1. **Team dev:** task list ở Section 17 — biết chính xác phải tạo/update files nào, theo thứ tự nào, trong tuần nào
2. **Team content/copy:** copy hoàn chỉnh VI/EN cho mọi page — paste vào HTML hoặc dùng làm reference
3. **Team design:** structure rõ ràng để design wireframes
4. **Founder:** language bank cho investor conversations
5. **Marketing:** boilerplate sẵn sàng cho press inquiries

### Thứ tự thực thi đề xuất

**Tuần 1 (P0 — bắt buộc trước launch Đà Lạt pilot):**
- Cập nhật homepage muonnoi.org
- Tạo manifesto + about + quests overview
- Tạo đường-muôn-nơi pilot page + host landing
- Cập nhật ecosystem + roadmap
- OG images cơ bản
- CSS/JS components mới

**Tuần 2 (P1 — pre-launch polish):**
- Tạo 2 quest promo (Học Đời + Family)
- Tạo partners + press
- Mở rộng security + guide
- Founder photo + bio finalized

**Tuần 3 (P2 — international ready):**
- Tạo 4 quest promo còn lại
- English mirrors hoàn chỉnh
- Complete photo library

**Tuần 4 — launch ready & polish:**
- Cross-browser testing
- Performance tuning
- Accessibility audit
- Final copy review
- Soft launch cùng Đường Muôn Nơi MVP

### Câu chốt cho team

> Trang chủ Muôn Nơi không phải nơi quảng cáo. Trang chủ Muôn Nơi là một lời mời.
>
> Lời mời tham gia một cách sống khác.
> Một internet khác.
> Một tương lai khác.
>
> Mỗi từ trên trang chủ phải xứng đáng với lời mời đó.

---

**Document version:** v1.0
**Date:** 2026-05-11
**Status:** READY FOR DEV + CONTENT + DESIGN
**Author:** Prepared with care for Muôn Nơi · Trần Hà Tâm

**Câu mở đầu trang chủ mới:**

> *Tự Do Tuyệt Đối Từ Bên Trong, Trách Nhiệm Rõ Ràng Trong Đời Sống Muôn Nơi.*

**Câu kết của trang chủ mới:**

> *Đi ra thế giới thật. Gặp người thật. Sống đời thật.*
> *Out into the real world. With real people. Living a real life.*
