# Người Việt Muôn Nơi · QA Checklist 100/100 — 2026-05-12

Target: rubric 100/100 trên `nguoiviet.muonnoi.org` trước Gate 5 (2026-05-26). 100 điểm chia thành 10 nhóm theo rubric trong master plan. Tick từng item bằng `[x]` khi verified, kèm evidence (output curl, link Lighthouse, screenshot) nếu cần.

Canonical routes are the routes currently shipped in `nguoiviet.muonnoi.org/public/sitemap.xml`: `/`, `/manifesto/`, `/journeys/`, `/journeys/dalat/`, `/start/`, `/host/`, `/stories/`, `/partners/`, `/members/`, `/resources/`, `/contact/`, `/privacy/`, `/terms/`, `/refund/`, `/community-guidelines/`.

Verification convention:
- `curl -I <url>` để check status + headers.
- `curl -s <url> | grep <pattern>` để check inline content.
- Lighthouse: chạy desktop + mobile, score >= 95 mỗi category.
- Manual: ghi chú browser + version (Chrome 122 / Safari 17 / Firefox 124).

## 1. Technical & Routing (15 items)

- [ ] `curl -I https://nguoiviet.muonnoi.org/` returns `200` and `cf-ray` header (Cloudflare edge).
- [ ] `curl -I https://nguoiviet.muonnoi.org/manifesto/` returns `200`.
- [ ] `curl -I https://nguoiviet.muonnoi.org/journeys/` returns `200`.
- [ ] `curl -I https://nguoiviet.muonnoi.org/journeys/dalat/` returns `200`.
- [ ] `curl -I https://nguoiviet.muonnoi.org/start/` returns `200`.
- [ ] `curl -I https://nguoiviet.muonnoi.org/host/` returns `200`.
- [ ] `curl -I https://nguoiviet.muonnoi.org/stories/` returns `200`.
- [ ] `curl -I https://nguoiviet.muonnoi.org/partners/` returns `200`.
- [ ] `curl -I https://nguoiviet.muonnoi.org/members/` returns `200`.
- [ ] `curl -I https://nguoiviet.muonnoi.org/resources/` returns `200`.
- [ ] `curl -I https://nguoiviet.muonnoi.org/contact/` returns `200`.
- [ ] `curl -I https://nguoiviet.muonnoi.org/privacy/` returns `200`.
- [ ] `curl -I https://nguoiviet.muonnoi.org/terms/` returns `200`.
- [ ] `curl -I https://nguoiviet.muonnoi.org/refund/` returns `200`.
- [ ] `curl -I https://nguoiviet.muonnoi.org/community-guidelines/` returns `200`.
- [ ] `curl https://nguoiviet.muonnoi.org/sitemap.xml` returns `200 + application/xml`, contains all 15 canonical routes.
- [ ] `curl https://nguoiviet.muonnoi.org/robots.txt` returns `200`, contains `Sitemap:` directive.
- [ ] `curl https://nguoiviet.muonnoi.org/manifest.json` returns `200 + application/manifest+json`.
- [ ] `_headers` + `_redirects` parse correctly in Cloudflare Pages build log; 404 page renders custom design (not default Cloudflare).

## 2. Content & UX (15 items)

- [ ] Hero section renders headline VI + EN subtitle, primary CTA `/start/`.
- [ ] Manifesto section presents 3-5 core principles, claim-safe wording (no income promises).
- [ ] Journey Map section illustrates diaspora flow (đi - về - kết nối).
- [ ] Quest grid links to all 7 quest verticals on `*.muonnoi.org`.
- [ ] Trust strip displays partners/credentials with logos.
- [ ] Pilot CTA section links to `/journeys/dalat/` and `/start/`.
- [ ] Newsletter intent is present only when backed by a real route or safe contact path.
- [ ] Ecosystem cross-links section points to `www.muonnoi.org` and sibling subdomains.
- [ ] FAQ section answers 8-12 common questions.
- [ ] Footer matches `www.muonnoi.org` structure (4 columns + legal links).
- [ ] Mobile (375px viewport) renders without horizontal scroll on all 11 routes.
- [ ] Dark mode toggle works (system preference + manual override) and persists via localStorage.
- [ ] VI/EN toggle works and persists across navigation.
- [ ] Skip-link visible on Tab focus, jumps to `#main`.
- [ ] `prefers-reduced-motion: reduce` honored (no auto-playing animations).

## 3. Brand & Design (12 items)

- [ ] CSS variables include `--color-azure: #0E4F8B`, `--color-whisper: #F4F1EA`, `--color-gold: #C4A24C`.
- [ ] Primary font stack uses `Be Vietnam Pro` with fallback `system-ui, sans-serif`.
- [ ] Header matches `www.muonnoi.org`: logo left, nav center, CTA right.
- [ ] Footer matches `www.muonnoi.org`: 4 columns, copyright line, legal links.
- [ ] No Wix CSS classes (`wix-*`, `vc-*`) in DOM (grep page source).
- [ ] No `static.wixstatic.com` asset URLs in DOM.
- [ ] No Avenir/Helvetica fallback fonts referenced (Wix default).
- [ ] Logo uses brand v2.0 SVG (sharp at 2x DPI).
- [ ] Buttons follow brand kit: primary Azure background, Gold accent on hover.
- [ ] Typography scale: H1 32-48px, H2 24-32px, body 16-18px, line-height 1.5+.
- [ ] Brand lint script `scripts/brand-lint.sh nguoiviet/` returns 0 warnings.
- [ ] Color contrast all text/background >= 4.5:1 (WCAG AA).

## 4. SEO (10 items)

- [ ] Every page has `<link rel="canonical">` pointing to its own URL.
- [ ] Every page has `<meta property="og:image">` pointing to `/assets/og.png` after the raster asset is created.
- [ ] Every page has `<meta name="twitter:card" content="summary_large_image">`.
- [ ] Homepage contains JSON-LD `Organization` block with `name`, `url`, `logo`.
- [ ] Homepage contains JSON-LD `WebSite` block with `potentialAction` (SearchAction).
- [ ] All routes have `<link rel="alternate" hreflang="vi">` and `hreflang="en"` and `hreflang="x-default"`.
- [ ] Sitemap submitted to Google Search Console, status `Success`.
- [ ] Sitemap submitted to Bing Webmaster Tools, status `Submitted`.
- [ ] DNS TXT verification record for Search Console present (verify with `dig TXT nguoiviet.muonnoi.org`).
- [ ] Each route has unique `<title>` (max 60 chars) and `<meta description>` (max 160 chars).

## 5. Trust & Legal (8 items)

- [ ] `/privacy/` exists, includes GDPR + CCPA + Luật An ninh mạng VN sections.
- [ ] `/terms/` exists, defines user obligations, liability limits.
- [ ] `/refund/` exists, defines refund window for pilot fees (if applicable).
- [ ] `/community-guidelines/` exists, defines behavior standards.
- [ ] No income/salary promises across all pages (grep for `lương`, `thu nhập`, `kiếm tiền`, `salary`, `income`).
- [ ] Footer disclaimer present on all 11 routes: "Người Việt Muôn Nơi không cam kết thu nhập...".
- [ ] Privacy page lists data controller contact email.
- [ ] Founder signed off on legal pages (Gate 1 evidence).

## 6. Ecosystem Integration (10 items)

- [ ] Block on `www.muonnoi.org` homepage shows infoCard linking to `nguoiviet.muonnoi.org`.
- [ ] DNS matrix doc (`docs/launch/MUONNOI_SUBDOMAIN_DNS_CUSTOM_DOMAIN_MATRIX_2026-05-12.md`) lists `nguoiviet` with status `active`.
- [ ] Cross-link to `dulich.muonnoi.org` in quest grid + footer.
- [ ] Cross-link to `hoctap.muonnoi.org` in quest grid + footer.
- [ ] Cross-link to `suckhoe.muonnoi.org` in quest grid + footer.
- [ ] Cross-link to `sangtao.muonnoi.org` in quest grid + footer.
- [ ] Cross-link to `congdong.muonnoi.org` in quest grid + footer.
- [ ] Cross-link to `lamviec.muonnoi.org` in quest grid + footer.
- [ ] Cross-link to `nhachung.muonnoi.org` in quest grid + footer.
- [ ] All cross-links return `200` via `curl -I` (or note `pending` in matrix if subdomain not yet live).

## 7. Wix Migration (10 items)

- [ ] Legacy Wix URL `/about` redirects 301 to `/manifesto/`.
- [ ] Legacy Wix URL `/contact` redirects 301 to `/contact/`.
- [ ] Legacy Wix URL `/blog` redirects 301 to `/stories/`.
- [ ] Legacy Wix URL `/dalat` redirects 301 to `/journeys/dalat/`.
- [ ] Legacy Wix URL `/cuoc-song-muon-noi` redirects 301 to `/journeys/`.
- [ ] Legacy Wix URL `/hanh-trinh` redirects 301 to `/journeys/`.
- [ ] Legacy Wix URL `/csmn` redirects 301 to `/journeys/`.
- [ ] Legacy Wix URL `/tham-gia` redirects 301 to `/start/`.
- [ ] Legacy Wix URL `/groups` redirects 301 to `/members/`.
- [ ] Legacy Wix URL `/plans-pricing` redirects 301 to `/start/`.
- [ ] Legacy Wix URL `/file-share` redirects 301 to `/resources/`.
- [ ] Legacy Wix URL `/book-online` redirects 301 to `/start/`.
- [ ] Legacy Wix URL `/policy` redirects 301 to `/privacy/`.
- [ ] Legacy Wix URL `/refund-policy` redirects 301 to `/refund/`.
- [ ] Archive docs exist under `nguoiviet.muonnoi.org/docs/wix-content-archive/`.
- [ ] All 13 redirects verified with `curl -I` returning `301 + Location:` header.

## 8. Operations (10 items)

- [ ] Cloudflare Pages project `nguoiviet-muonnoi-org` exists in dashboard.
- [ ] Production deploy ID recorded in `docs/launch/MUONNOI_SUBDOMAIN_DNS_CUSTOM_DOMAIN_MATRIX_2026-05-12.md`.
- [ ] Custom domain `nguoiviet.muonnoi.org` status `Active` (not `Pending verification`).
- [ ] SSL certificate issued (verify with `curl -vI https://nguoiviet.muonnoi.org/ 2>&1 | grep "SSL certificate"`).
- [ ] Pages project access locked to authorized team only (no public deploy hooks).
- [ ] Build settings: framework preset `None`, build command empty, output `/`.
- [ ] Branch `main` is production branch; preview branches isolated.
- [ ] Deploy webhook configured for CI/CD (or noted as manual).
- [ ] Pages Functions disabled (static-only site) unless intake form requires Worker.
- [ ] Pilot intake form posts to backend successfully (test record in Notion CRM).

## 9. Accessibility (5 items)

- [ ] WCAG AA color contrast verified for all text (axe DevTools 0 violations).
- [ ] All `<img>` tags have meaningful `alt` text (or empty `alt=""` for decorative).
- [ ] Keyboard navigation works on all interactive elements (Tab order logical, focus visible).
- [ ] Skip-link `<a href="#main">` is first focusable element on every page.
- [ ] `@media (prefers-reduced-motion: reduce)` removes all transitions and animations.

## 10. Performance (5 items)

- [ ] Lighthouse Mobile LCP (Largest Contentful Paint) < 2.5s.
- [ ] Lighthouse Mobile CLS (Cumulative Layout Shift) < 0.1.
- [ ] Lighthouse Mobile INP (Interaction to Next Paint) < 200ms.
- [ ] No render-blocking JS on critical path (defer/async on all `<script>` tags except inline theme guard).
- [ ] All below-the-fold images use `loading="lazy"` and `decoding="async"`.

---

## Scoring

Total items: 105. Target: 100/100 means 100% of items checked. Pass threshold for each Gate:

- Gate 1 (Day 1): nhóm 5 Legal 8/8 + nhóm 1 routes 11/15.
- Gate 2 (Day 2): nhóm 4 SEO 10/10.
- Gate 3 (Day 3): nhóm 1 routes 15/15 + nhóm 8 operations 8/10 + nhóm 3 brand 12/12.
- Gate 4 (Day 7): nhóm 7 Wix migration 15/15.
- Gate 5 (Day 14): tổng 105/105.

Evidence repo: lưu screenshot/log dưới `docs/launch/evidence/nguoiviet/2026-05-{date}/` theo từng Gate.
