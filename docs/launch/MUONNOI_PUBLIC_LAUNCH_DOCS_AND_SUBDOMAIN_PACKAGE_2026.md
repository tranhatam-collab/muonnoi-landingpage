# MUÔN NƠI · PUBLIC LAUNCH DOCS AND SUBDOMAIN PACKAGE 2026

**Version:** 1.0
**Date:** 2026-05-11
**Owner:** Trần Hà Tâm · Muôn Nơi
**Status:** PUBLIC READY AFTER CLAIM CLEANUP
**Scope:** muonnoi.org, docs.muonnoi.org, and all related public subdomain homepages

---

## 0. Purpose Of This Package

This package is the official publishing and development handoff for all public-facing pages in the Muôn Nơi ecosystem.

It covers:

1. The root public homepage: `muonnoi.org`
2. The documentation hub: `docs.muonnoi.org`
3. Public pages under `muonnoi.org`
4. Related subdomain homepages
5. Shared language, CTA, SEO, footer, and claim-safety rules
6. DEV implementation checklist

The goal is to make every homepage and documentation page feel like one coherent ecosystem, not a collection of separate landing pages.

---

## 1. Core Public Definition

### Vietnamese

Muôn Nơi là hạ tầng số cho đời sống thật.

Đây là nơi con người có thể sống, học, làm, đi, chăm sóc gia đình, sáng tạo, đóng góp cộng đồng và xây dựng giá trị thật thông qua một hệ thống có bằng chứng, có trách nhiệm và có niềm tin.

Muôn Nơi không xây để giữ con người trong màn hình. Muôn Nơi xây để đưa con người trở lại thế giới thật: gặp người thật, học điều thật, làm việc thật, tạo giá trị thật.

### English

Muon Noi is digital infrastructure for real life.

It is a place where people can live, learn, work, travel, care for family, create, contribute to community, and build real value through a system of proof, responsibility, and trust.

Muon Noi is not built to keep people inside screens. It is built to bring people back into the real world: meeting real people, learning real things, doing real work, and creating real value.

### Main Tagline

**Tự Do Tuyệt Đối Từ Bên Trong, Trách Nhiệm Rõ Ràng Trong Đời Sống Muôn Nơi.**

### Short Public Lines

- Sống thật. Học thật. Làm thật. Tạo giá trị thật.
- Internet trở lại với con người.
- Hệ điều hành cho đời sống, không cho thời gian màn hình.
- Đi ra thế giới thật. Gặp người thật. Sống đời thật.

---

## 2. Global Public Navigation Standard

### Header

```txt
[MN logo]  Trang chủ · Quests · Hệ sinh thái · Lộ trình · Manifesto · Bảo mật · Hướng dẫn
           [Tiếng Việt/English] [Theme] [Vào ứng dụng]
```

### Header URLs

```txt
/                 Trang chủ
/quests/          Quests
/ecosystem/       Hệ sinh thái
/roadmap/         Lộ trình
/manifesto/       Manifesto
/security/        Bảo mật
/guide/           Hướng dẫn
https://app.muonnoi.org/  Vào ứng dụng
```

### Footer 4 Columns

```txt
SẢN PHẨM
- Ứng dụng              https://app.muonnoi.org/
- AI Muôn Nơi           https://ai.muonnoi.org/
- Quests                /quests/
- Làm việc              https://lamviec.muonnoi.org/
- Hướng dẫn             /guide/
- Bảo mật               /security/
- Trạng thái            /status/

QUESTS
- Đường Muôn Nơi        https://dulich.muonnoi.org/
- Học Đời               https://hoctap.muonnoi.org/
- Family Mission        https://family.muonnoi.org/
- Một Ngày Khỏe         https://suckhoe.muonnoi.org/
- Việc Có Lý            https://lamviec.muonnoi.org/quest/
- Vườn Sáng Tạo         https://sangtao.muonnoi.org/
- Cồng                  https://congdong.muonnoi.org/

HỆ SINH THÁI
- Nhà Chung             https://nhachung.muonnoi.org/
- Đầu tư                https://dautu.muonnoi.org/
- Dự án                 https://duan.muonnoi.org/
- Verify                https://verify.muonnoi.org/
- Trust                 https://trust.muonnoi.org/
- Docs                  https://docs.muonnoi.org/

CÔNG TY
- Câu chuyện            /about/
- Manifesto             /manifesto/
- Đối tác               /partners/
- Press                 /press/
- Nghề nghiệp           /careers/

PHÁP LÝ
- Privacy               https://docs.muonnoi.org/legal/privacy
- Terms                 https://docs.muonnoi.org/legal/terms
- Cookies               https://docs.muonnoi.org/legal/cookies
- DMCA                  https://docs.muonnoi.org/legal/dmca
```

Footer signature:

```txt
© 2026 muonnoi.org · social-first · privacy-first · life-first
Made in Đà Lạt, Vietnam · For everyone, everywhere
```

---

## 3. Claim-Safety Rules For All Public Pages

### Do Not Publish Unless Verified

Do not publish hard claims such as:

- “50+ Local Hosts have registered” unless a verified internal list exists.
- “Pilot live” unless users can actually register and complete a quest.
- “Tourism Board partnership” unless there is written permission or formal communication.
- “Receipt with hash issued” unless the feature exists in production.
- “Investor returns” or any ROI language.

### Safe Public Wording

Use:

```txt
Giai đoạn khởi động tại Đà Lạt bắt đầu từ tháng 5/2026, với mục tiêu xây dựng 30 nhiệm vụ đầu tiên và mạng lưới Local Host được xác minh.
```

Use:

```txt
Mạng lưới Local Host Đà Lạt đang được tuyển chọn và xác minh.
```

Use:

```txt
Đang mở trao đổi với các đối tác địa phương trong lĩnh vực du lịch, lưu trú, văn hóa và cộng đồng.
```

Use:

```txt
Receipt có hash sẽ được phát hành khi hệ proof layer hoàn thiện trong giai đoạn pilot.
```

### Investment Rule

Homepage may link to `dautu.muonnoi.org`, but must not promote investment returns, guarantees, projected ROI, or fundraising terms.

---

## 4. Required Root Pages Under muonnoi.org

The following public pages must exist before public launch:

```txt
/                         Homepage
/manifesto/               Full manifesto
/about/                   Story of Muôn Nơi
/ecosystem/               Eight-layer ecosystem
/roadmap/                 Six-phase roadmap
/security/                Security and trust
/guide/                   User and dev guide
/quests/                  Life Quest OS overview
/quests/dulich/           Đường Muôn Nơi overview
/quests/hoctap/           Học Đời overview
/quests/family/           Family Mission overview
/quests/suckhoe/          Một Ngày Khỏe overview
/quests/lamviec/          Việc Có Lý overview
/quests/sangtao/          Vườn Sáng Tạo overview
/quests/congdong/         Cồng overview
/host/                    Become a Local Host
/partners/                Partner page
/press/                   Press kit
/status/                  System/module status
/newsletter/              Newsletter sign-up
```

No `#newsletter` anchors unless there is a real embedded form on the same page.

---

## 5. Root Homepage: muonnoi.org

### SEO

```html
<title>Muôn Nơi · Hạ tầng số cho đời sống thật</title>
<meta name="description" content="Muôn Nơi là hạ tầng số cho đời sống thật — học tập, làm việc, du lịch, gia đình, sức khỏe, sáng tạo và cộng đồng diễn ra với bằng chứng thật và giá trị thật. Không tracking, không feed gây nghiện." />
<meta property="og:title" content="Muôn Nơi · Internet trở lại với con người" />
<meta property="og:description" content="Bảy hệ nhiệm vụ đời sống. Một công thức: Play → Learn → Build → Prove → Grow. Một mục tiêu: tạo giá trị thật." />
<meta property="og:image" content="https://muonnoi.org/press/assets/og/muonnoi-og-1200x630.png" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Muôn Nơi" />
<link rel="alternate" hreflang="vi" href="https://muonnoi.org/" />
<link rel="alternate" hreflang="en" href="https://muonnoi.org/en/" />
```

### Section Order

1. Hero
2. Three foundation locks
3. Life Quest OS
4. Eight-layer ecosystem
5. Roadmap
6. Six non-negotiable principles
7. Đà Lạt pilot
8. How to join
9. Project portfolio
10. Partners
11. Story
12. Final invitation

### Hero Copy

H1:

```txt
Tự Do Tuyệt Đối Từ Bên Trong
Trách Nhiệm Rõ Ràng Trong Đời Sống Muôn Nơi.
```

Description:

```txt
Muôn Nơi là nền tảng để sống, học, làm, đi, sáng tạo, chăm sóc gia đình, đóng góp cộng đồng và chia sẻ giá trị thật.

Giai đoạn đầu tập trung xây một social core miễn phí, sạch, bảo mật cao và dễ dùng. Khi nền tảng đủ ổn định, hệ sinh thái mở rộng theo từng mô-đun để mỗi vùng đời sống có không gian riêng nhưng vẫn liên kết với cùng một trung tâm tin cậy.
```

CTA:

```txt
Vào ứng dụng       https://app.muonnoi.org/
Xem hệ sinh thái   /ecosystem/
Tham gia Quests    /quests/
Tìm hiểu đầu tư    https://dautu.muonnoi.org/
Xem dự án          https://duan.muonnoi.org/
```

---

## 6. Docs Hub: docs.muonnoi.org

### Role

`docs.muonnoi.org` is the official documentation, public policy, operating doctrine, and launch archive for Muôn Nơi.

It must contain all plans in stable, readable, versioned form.

### Required Docs Sections

```txt
/docs/
  index
  public-launch/
  product/
  quests/
  ecosystem/
  trust-security/
  legal/
  dev-handoff/
  pilot-dalat/
  partners/
  changelog/
```

### Required Docs Files

```txt
/public-launch/MUONNOI_PUBLIC_ANNOUNCEMENT_2026.md
/public-launch/MUONNOI_PUBLIC_LAUNCH_PACKAGE_2026.md
/public-launch/MUONNOI_SUBDOMAIN_HOMEPAGE_PACKAGE_2026.md

/product/MUONNOI_PRODUCT_DEFINITION_2026.md
/product/MUONNOI_HUMAN_LIFE_OS_ARCHITECTURE.md
/product/MUONNOI_ROADMAP_2026_2027.md

/quests/MUONNOI_LIFE_QUEST_OS_MASTER_PLAN_2026.md
/quests/MUONNOI_QUESTS_PUBLIC_OVERVIEW.md
/quests/QUEST_TAXONOMY_V1.md
/quests/PROOF_REVIEW_AND_REWARD_RULES.md

/pilot-dalat/DEV_HANDOFF_DULICH_MUONNOI_30_DAY_MVP.md
/pilot-dalat/DULICH_MUONNOI_DALAT_PILOT_PLAN.md
/pilot-dalat/HOST_VERIFICATION_AND_SAFETY_POLICY.md

/ecosystem/MUONNOI_ECOSYSTEM_8_LAYERS.md
/ecosystem/MUONNOI_SUBDOMAIN_STRATEGY_2026.md
/ecosystem/MUONNOI_FAMILY_LAYER_PLAN.md
/ecosystem/MUONNOI_NHACHUNG_LAYER_PLAN.md

/trust-security/MUONNOI_SECURITY_AND_TRUST_LAYER.md
/trust-security/MUONNOI_VERIFY_LAYER_PLAN.md
/trust-security/MUONNOI_COMPLAINTS_AND_REVIEW_LOOP.md
/trust-security/MUONNOI_NO_TRACKING_NO_ADS_POLICY.md

/dev-handoff/DEV_HANDOFF_PUBLIC_PAGES_MUONNOI_2026.md
/dev-handoff/DEV_HANDOFF_SUBDOMAIN_HOMEPAGES_2026.md
/dev-handoff/DEV_HANDOFF_DOCS_MUONNOI_2026.md
/dev-handoff/MISSION_ENGINE_SCHEMA.sql
/dev-handoff/MISSION_ENGINE_API_CONTRACT.md

/legal/privacy.md
/legal/terms.md
/legal/cookies.md
/legal/dmca.md
/legal/investment-disclosure.md
```

### Docs Homepage Copy

H1:

```txt
Muôn Nơi Docs
```

Description:

```txt
Tài liệu công bố, vận hành, bảo mật, sản phẩm, quests, hệ sinh thái và kế hoạch triển khai của Muôn Nơi.
```

Primary sections:

```txt
Public Launch
Product Definition
Life Quest OS
Ecosystem
Trust & Security
Đà Lạt Pilot
Developer Handoff
Legal
Changelog
```

---

## 7. Subdomain Homepage Package

All subdomain homepages must follow the same structure:

1. Product definition
2. Human value
3. Core use cases
4. How it works
5. Trust and safety
6. How to join
7. Relationship to Muôn Nơi
8. CTA
9. Docs link

All subdomains must use claim-safe language and link back to:

```txt
https://muonnoi.org/
https://docs.muonnoi.org/
https://muonnoi.org/security/
https://muonnoi.org/guide/
```

---

## 8. app.muonnoi.org Homepage

### Role

Social core / user-facing application.

### Public Positioning

```txt
Ứng dụng Muôn Nơi là nơi người dùng bắt đầu social core: hồ sơ, feed, thảo luận, xác minh, cộng đồng và các hành động đời sống có bằng chứng.
```

### Sections

1. Enter the app
2. Social core
3. Feed without addiction
4. Profile and trust
5. Quests entry
6. Privacy by default
7. CTA to sign in

### CTA

```txt
Đăng nhập
Tạo tài khoản
Xem hướng dẫn
```

---

## 9. ai.muonnoi.org Homepage

### Role

AI social + AI discussion + workflow platform.

### Public Positioning

```txt
AI Muôn Nơi là không gian đối thoại và workflow nơi con người dùng AI để làm rõ vấn đề, tóm tắt, phản biện, xây flow và tạo giá trị thật mà không đánh mất vai trò của con người.
```

### Sections

1. AI Discussion
2. AI Feed
3. Builder / Flow MVP
4. Execution history
5. Human-in-the-loop
6. Shared AI layer
7. Relationship to Muôn Nơi

### CTA

```txt
Mở AI Muôn Nơi
Xem builder
Đọc docs AI layer
```

Docs link:

```txt
https://docs.muonnoi.org/product/ai-muon-noi
```

---

## 10. dulich.muonnoi.org Homepage

### Role

Travel Quest flagship pilot.

### Safe Public Positioning

```txt
Đường Muôn Nơi là hệ nhiệm vụ du lịch đời sống, nơi mỗi điểm đến là một thử thách, mỗi thử thách mang một cuộc gặp, và mỗi hành trình tạo ra bằng chứng sống thật.
```

### Claim-Safe Pilot Copy

```txt
Giai đoạn khởi động tại Đà Lạt bắt đầu từ tháng 5/2026, với mục tiêu xây dựng 30 nhiệm vụ đầu tiên và mạng lưới Local Host được tuyển chọn, xác minh.
```

### Sections

1. Hero
2. Why Travel Quest
3. See / Do / Connect / Prove
4. Đà Lạt pilot
5. Local Host
6. Traveler flow
7. Safety and trust
8. Proof and receipt
9. CTA

### CTA

```txt
Tham gia hành trình
Trở thành Local Host
Đọc kế hoạch pilot
```

Docs link:

```txt
https://docs.muonnoi.org/pilot-dalat/DULICH_MUONNOI_DALAT_PILOT_PLAN
```

---

## 11. hoctap.muonnoi.org Homepage

### Role

Learn Quest / Học Đời.

### Positioning

```txt
Học Đời là nơi mỗi người học một kỹ năng đời nhỏ mỗi ngày, thực hành trong đời thật, nộp bằng chứng và xây bản đồ kỹ năng của chính mình.
```

### Sections

1. Hero
2. Learn by doing
3. Micro skills
4. Proof-based learning
5. Peer validation
6. AI tutor
7. Skill map
8. CTA

### CTA

```txt
Bắt đầu học
Xem lộ trình kỹ năng
Đọc docs Học Đời
```

---

## 12. family.muonnoi.org Homepage

### Role

Family Operating Layer.

### Positioning

```txt
Family Muôn Nơi là không gian nơi các gia đình cùng chia sẻ, học hỏi, chăm sóc, đối thoại và lớn lên cùng nhau với sự hỗ trợ của AI nhưng không đánh mất giá trị con người.
```

### Sections

1. Hero
2. Family is the first human layer
3. Family quests
4. Parenting and care
5. Family finance education
6. Family memory
7. Safety and privacy
8. CTA

### CTA

```txt
Tạo Family Space
Xem Family Mission
Đọc guide gia đình
```

Docs link:

```txt
https://docs.muonnoi.org/ecosystem/MUONNOI_FAMILY_LAYER_PLAN
```

---

## 13. suckhoe.muonnoi.org Homepage

### Role

Wellness and habit quest.

### Positioning

```txt
Một Ngày Khỏe là hệ nhiệm vụ sức khỏe nhẹ, giúp mỗi người xây một hành động nhỏ mỗi ngày để sống khỏe hơn cùng gia đình và cộng đồng.
```

### Legal-Safe Wording

```txt
Một Ngày Khỏe không chẩn đoán, điều trị hoặc thay thế tư vấn y tế. Đây là không gian wellness, thói quen và giáo dục sức khỏe đời sống.
```

### CTA

```txt
Bắt đầu một ngày khỏe
Xem nhiệm vụ sức khỏe
Đọc safety guide
```

---

## 14. lamviec.muonnoi.org Homepage

### Role

Work / operator gateway / quest work layer.

### Positioning

```txt
Làm Việc Muôn Nơi là nơi con người, đội nhóm và tổ chức kết nối qua nhiệm vụ, dự án, kỹ năng và bằng chứng công việc thật.
```

### Sections

1. Work gateway
2. Missions and projects
3. Skill proof
4. Reputation
5. Organization use cases
6. Quest work
7. CTA

### CTA

```txt
Mở cổng làm việc
Xem nhiệm vụ
Dành cho tổ chức
```

---

## 15. sangtao.muonnoi.org Homepage

### Role

Creative Quest / Vườn Sáng Tạo.

### Positioning

```txt
Vườn Sáng Tạo là nơi mỗi người tạo một thứ nhỏ, nhận phản hồi thật, tìm người đồng xây dựng và biến ý tưởng thành sản phẩm có giá trị.
```

### CTA

```txt
Tạo tác phẩm đầu tiên
Xem thử thách sáng tạo
Tìm người đồng xây dựng
```

---

## 16. congdong.muonnoi.org Homepage

### Role

Community Hero / civic impact quest.

### Positioning

```txt
Cồng là nơi mỗi tuần một việc tốt cho cộng đồng được thực hiện, xác minh và ghi nhận bằng bằng chứng thật.
```

### Sections

1. Community trust
2. Impact quests
3. Multi-witness proof
4. Local chapters
5. NGO and city partners
6. CTA

### CTA

```txt
Tham gia một việc tốt
Tạo nhiệm vụ cộng đồng
Dành cho tổ chức
```

---

## 17. nhachung.muonnoi.org Homepage

### Role

Living / co-living layer.

### Positioning

```txt
Nhà Chung Muôn Nơi là lớp không gian sống, nơi con người có thể ở, chia sẻ, đồng hành và xây cộng đồng sống có niềm tin.
```

### Sections

1. What is Nhà Chung
2. Co-living with trust
3. Homes and members
4. Booking/request flow
5. Family and community integration
6. Safety and verification
7. CTA

### CTA

```txt
Tìm Nhà Chung
Đăng ký thành viên
Đăng không gian
```

Docs:

```txt
https://docs.muonnoi.org/ecosystem/MUONNOI_NHACHUNG_LAYER_PLAN
```

---

## 18. dautu.muonnoi.org Homepage

### Role

Investor outreach / investment information.

### Legal Rule

This page must be legally reviewed before publishing. It must not promise returns, guarantee profit, or publicly solicit investment in restricted jurisdictions.

### Safe Positioning

```txt
Đầu Tư Muôn Nơi là không gian thông tin dành cho những người quan tâm đến cấu trúc đầu tư, dự án và hệ sinh thái giá trị dài hạn của Muôn Nơi.
```

### Required Disclosures

- Not an offer to sell securities.
- No guaranteed return.
- Information only.
- Access to detailed materials may require eligibility review.
- Jurisdiction-specific restrictions apply.

### CTA

```txt
Đọc thông tin đầu tư
Gửi yêu cầu tìm hiểu
Xem disclosure
```

Docs:

```txt
https://docs.muonnoi.org/legal/investment-disclosure
```

---

## 19. duan.muonnoi.org Homepage

### Role

Project portfolio.

### Positioning

```txt
Dự Án Muôn Nơi là danh mục các dự án đang được phát triển trong hệ sinh thái, từ công nghệ, du lịch, giáo dục, nhà ở, wellness, làm việc đến cộng đồng.
```

### Sections

1. Project portfolio
2. Project categories
3. Project status labels
4. Featured projects
5. How projects connect to Muôn Nơi
6. CTA

### Status Labels

Use only:

```txt
Live
Pilot
In Development
Planned
Research
```

No exaggerated claims.

---

## 20. verify.muonnoi.org Homepage

### Role

Identity and trust verification.

### Positioning

```txt
Verify Muôn Nơi giúp làm rõ tín hiệu tin cậy của tài khoản, host, tổ chức, dự án và đóng góp trong hệ sinh thái.
```

### CTA

```txt
Bắt đầu xác minh
Đọc verify guide
Xem trust principles
```

---

## 21. trust.muonnoi.org Homepage

### Role

Public trust surface.

### Positioning

```txt
Trust Muôn Nơi là bề mặt công khai giúp người dùng hiểu các claim, bằng chứng, trạng thái và cơ chế xác minh trong hệ.
```

### Rule

Every trust claim must be supported by a source, proof, status, or disclosure.

---

## 22. docs.muonnoi.org Publishing Plan

### Docs Must Publish These Collections First

Priority 1:

```txt
/public-launch/MUONNOI_PUBLIC_ANNOUNCEMENT_2026.md
/public-launch/MUONNOI_PUBLIC_LAUNCH_PACKAGE_2026.md
/public-launch/MUONNOI_SUBDOMAIN_HOMEPAGE_PACKAGE_2026.md
```

Priority 2:

```txt
/quests/MUONNOI_LIFE_QUEST_OS_MASTER_PLAN_2026.md
/pilot-dalat/DULICH_MUONNOI_DALAT_PILOT_PLAN.md
/pilot-dalat/DEV_HANDOFF_DULICH_MUONNOI_30_DAY_MVP.md
```

Priority 3:

```txt
/ecosystem/MUONNOI_ECOSYSTEM_8_LAYERS.md
/trust-security/MUONNOI_SECURITY_AND_TRUST_LAYER.md
/dev-handoff/DEV_HANDOFF_PUBLIC_PAGES_MUONNOI_2026.md
```

---

## 23. DEV File Implementation Checklist

### Root Public Pages

```txt
apps/web/public/index.html
apps/web/public/manifesto/index.html
apps/web/public/about/index.html
apps/web/public/ecosystem/index.html
apps/web/public/roadmap/index.html
apps/web/public/security/index.html
apps/web/public/guide/index.html
apps/web/public/quests/index.html
apps/web/public/quests/dulich/index.html
apps/web/public/quests/hoctap/index.html
apps/web/public/quests/family/index.html
apps/web/public/quests/suckhoe/index.html
apps/web/public/quests/lamviec/index.html
apps/web/public/quests/sangtao/index.html
apps/web/public/quests/congdong/index.html
apps/web/public/host/index.html
apps/web/public/partners/index.html
apps/web/public/press/index.html
apps/web/public/status/index.html
apps/web/public/newsletter/index.html
```

### Shared Assets

```txt
apps/web/public/assets/ui.css
apps/web/public/assets/ui.js
apps/web/public/_headers
apps/web/public/_redirects
apps/web/public/manifest.json
apps/web/public/robots.txt
apps/web/public/sitemap.xml
```

### Docs Pages

If docs uses static pages:

```txt
apps/docs/public/index.html
apps/docs/public/public-launch/index.html
apps/docs/public/product/index.html
apps/docs/public/quests/index.html
apps/docs/public/ecosystem/index.html
apps/docs/public/trust-security/index.html
apps/docs/public/legal/index.html
apps/docs/public/dev-handoff/index.html
apps/docs/public/pilot-dalat/index.html
apps/docs/public/changelog/index.html
```

---

## 24. Sitemap Additions

Add all public root routes:

```xml
<url><loc>https://muonnoi.org/</loc></url>
<url><loc>https://muonnoi.org/manifesto/</loc></url>
<url><loc>https://muonnoi.org/about/</loc></url>
<url><loc>https://muonnoi.org/ecosystem/</loc></url>
<url><loc>https://muonnoi.org/roadmap/</loc></url>
<url><loc>https://muonnoi.org/security/</loc></url>
<url><loc>https://muonnoi.org/guide/</loc></url>
<url><loc>https://muonnoi.org/quests/</loc></url>
<url><loc>https://muonnoi.org/quests/dulich/</loc></url>
<url><loc>https://muonnoi.org/quests/hoctap/</loc></url>
<url><loc>https://muonnoi.org/quests/family/</loc></url>
<url><loc>https://muonnoi.org/quests/suckhoe/</loc></url>
<url><loc>https://muonnoi.org/quests/lamviec/</loc></url>
<url><loc>https://muonnoi.org/quests/sangtao/</loc></url>
<url><loc>https://muonnoi.org/quests/congdong/</loc></url>
<url><loc>https://muonnoi.org/host/</loc></url>
<url><loc>https://muonnoi.org/partners/</loc></url>
<url><loc>https://muonnoi.org/press/</loc></url>
<url><loc>https://muonnoi.org/status/</loc></url>
<url><loc>https://muonnoi.org/newsletter/</loc></url>
```

---

## 25. Redirect Additions

```txt
/manifesto      /manifesto/index.html      200
/manifesto/     /manifesto/index.html      200
/about          /about/index.html          200
/about/         /about/index.html          200
/quests         /quests/index.html         200
/quests/        /quests/index.html         200
/quests/dulich  /quests/dulich/index.html  200
/quests/dulich/ /quests/dulich/index.html  200
/host           /host/index.html           200
/host/          /host/index.html           200
/partners       /partners/index.html       200
/partners/      /partners/index.html       200
/press          /press/index.html          200
/press/         /press/index.html          200
/status         /status/index.html         200
/status/        /status/index.html         200
/newsletter     /newsletter/index.html     200
/newsletter/    /newsletter/index.html     200
```

Add other quest routes similarly.

---

## 26. Launch Checklist

Before publishing:

- [ ] Every CTA points to a real page or external live subdomain.
- [ ] No `#` placeholder links.
- [ ] No unverified partner claims.
- [ ] No investment ROI language.
- [ ] No “guaranteed earning” language.
- [ ] No token or speculative reward language.
- [ ] All pages use shared UI system.
- [ ] Tiếng Việt/English toggle works or is hidden until ready.
- [ ] Dark/light theme works.
- [ ] Mobile menu works.
- [ ] Sitemap updated.
- [ ] Redirects updated.
- [ ] Security headers reviewed.
- [ ] Docs package published in `docs.muonnoi.org`.

---

## 27. Final Public Closing Lines

Vietnamese:

```txt
Đi ra thế giới thật.
Gặp người thật.
Sống đời thật.
```

English:

```txt
Out into the real world.
With real people.
Living a real life.
```

---

## 28. Final Direction For Team

Muôn Nơi must be published as one coherent public system.

Do not publish separate subdomains with different language, different UI, different promises, or unverified claims.

Every page must reinforce the same foundation:

```txt
social-first · privacy-first · life-first · proof-first · trust-first
```
