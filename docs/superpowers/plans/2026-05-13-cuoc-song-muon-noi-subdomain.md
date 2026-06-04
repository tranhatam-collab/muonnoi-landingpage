# Cuoc Song Muonnoi Subdomain Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build `cuocsong.muonnoi.org` as the claim-safe living-practice layer of Muôn Nơi.

**Architecture:** Start from planning and content gates, then create a static source, deploy a Cloudflare preview, attach DNS only after preview QA passes, and promote links only after DNS/custom-domain evidence is recorded. The source must reuse Muôn Nơi Brandpro tokens and follow the shared claim-safety standard.

**Tech Stack:** Static HTML/CSS/JS or the existing Muôn Nơi public shell pattern, Cloudflare Pages, Muôn Nơi Brandpro v2.0, shell route smoke via `curl`, text scan via `rg`.

---

## File Structure

- Create: `cuocsong.muonnoi.org/README.md` — source ownership, run commands and release boundary.
- Create: `cuocsong.muonnoi.org/public/index.html` — Vietnamese-first homepage with full English language link.
- Create: `cuocsong.muonnoi.org/public/gioi-thieu/index.html` — module definition and ecosystem position.
- Create: `cuocsong.muonnoi.org/public/song-o-nhieu-noi/index.html` — living readiness guide.
- Create: `cuocsong.muonnoi.org/public/cho-va-nhan/index.html` — real-value give/receive rules.
- Create: `cuocsong.muonnoi.org/public/legal/disclaimer/index.html` — regulated-topic boundary.
- Create: `cuocsong.muonnoi.org/public/assets/ui.css` — Brandpro-aligned tokens if the site is standalone.
- Create: `cuocsong.muonnoi.org/public/sitemap.xml` — initial sitemap.
- Create: `cuocsong.muonnoi.org/public/robots.txt` — crawler policy.
- Create: `cuocsong.muonnoi.org/public/_headers` — security headers.
- Create: `cuocsong.muonnoi.org/wrangler.toml` — Cloudflare Pages config after source path is approved.
- Modify: `docs/launch/MUONNOI_SUBDOMAIN_DNS_CUSTOM_DOMAIN_MATRIX_2026-05-12.md` — DNS/custom-domain evidence.
- Modify: `docs/launch/MUONNOI_PARALLEL_DEV_COORDINATION_PLAN_2026-05-12.md` — team ownership and gate state.
- Modify: `docs/launch/TEAM_READ_ORDER_2026-05-11.md` — add Cuộc Sống read order.

## Task 1: Confirm source path and owner

**Files:**
- Modify: `docs/launch/MUONNOI_PARALLEL_DEV_COORDINATION_PLAN_2026-05-12.md`

- [ ] **Step 1: Record the source path decision**

Add the decision:

```markdown
Cuoc Song source path decision:
- Source path: `cuocsong.muonnoi.org/`
- Owner: Web/Public team
- Platform owner: Platform team after preview QA
- Decision: standalone static Pages source, not root-shell route
```

- [ ] **Step 2: Verify the decision is findable**

Run:

```bash
rg -n "Cuoc Song source path decision|cuocsong.muonnoi.org" docs/launch/MUONNOI_PARALLEL_DEV_COORDINATION_PLAN_2026-05-12.md
```

Expected:

```text
docs/launch/MUONNOI_PARALLEL_DEV_COORDINATION_PLAN_2026-05-12.md:<line>:Cuoc Song source path decision:
```

- [ ] **Step 3: Commit**

```bash
git add docs/launch/MUONNOI_PARALLEL_DEV_COORDINATION_PLAN_2026-05-12.md
git commit -m "docs(cuocsong): lock source ownership"
```

## Task 2: Write first-sprint claim-safe pages

**Files:**
- Create: `cuocsong.muonnoi.org/public/index.html`
- Create: `cuocsong.muonnoi.org/public/gioi-thieu/index.html`
- Create: `cuocsong.muonnoi.org/public/song-o-nhieu-noi/index.html`
- Create: `cuocsong.muonnoi.org/public/cho-va-nhan/index.html`
- Create: `cuocsong.muonnoi.org/public/legal/disclaimer/index.html`

- [ ] **Step 1: Create the route files**

Create each route from `docs/launch/CUOCSONG_MUONNOI_PUBLIC_SITE_CONTENT_MAP_2026-05-13.md`.

- [ ] **Step 2: Add required copy**

Each page must include:

```text
Language labels: Tiếng Việt, English
Root link: https://www.muonnoi.org/
Module name: Cuộc Sống Muôn Nơi
Claim boundary: no legal, immigration, finance, medical, therapy or investment advice
```

- [ ] **Step 3: Run claim scan**

Run:

```bash
rg -n "visa|pháp lý|tài chính|đầu tư|vay|ngân hàng|y tế|tâm lý|tâm linh|miễn phí ăn ở|11 tỷ|2,5 triệu|Đăng ký ngay|#|☎|📞|🌏|🌟" cuocsong.muonnoi.org/public
```

Expected:

```text
No unsafe public claims. Any regulated-topic match appears only on the disclaimer page.
```

- [ ] **Step 4: Commit**

```bash
git add cuocsong.muonnoi.org/public
git commit -m "feat(cuocsong): add first public route set"
```

## Task 3: Add static site operations files

**Files:**
- Create: `cuocsong.muonnoi.org/README.md`
- Create: `cuocsong.muonnoi.org/public/assets/ui.css`
- Create: `cuocsong.muonnoi.org/public/sitemap.xml`
- Create: `cuocsong.muonnoi.org/public/robots.txt`
- Create: `cuocsong.muonnoi.org/public/_headers`
- Create: `cuocsong.muonnoi.org/wrangler.toml`

- [ ] **Step 1: Add README**

Include:

```markdown
# cuocsong.muonnoi.org

Status: source prepared, not release-ready.

Deploy gate:
- claim-safe content pass
- route smoke pass
- brand pass
- preview deploy pass
- DNS/custom-domain evidence pass
```

- [ ] **Step 2: Add headers**

Use:

```text
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
```

- [ ] **Step 3: Add sitemap**

Include the first-sprint routes:

```xml
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://cuocsong.muonnoi.org/</loc></url>
  <url><loc>https://cuocsong.muonnoi.org/gioi-thieu/</loc></url>
  <url><loc>https://cuocsong.muonnoi.org/song-o-nhieu-noi/</loc></url>
  <url><loc>https://cuocsong.muonnoi.org/cho-va-nhan/</loc></url>
  <url><loc>https://cuocsong.muonnoi.org/legal/disclaimer/</loc></url>
</urlset>
```

- [ ] **Step 4: Commit**

```bash
git add cuocsong.muonnoi.org
git commit -m "feat(cuocsong): add static site operations files"
```

## Task 4: Run local static QA

**Files:**
- Modify: `docs/launch/CUOCSONG_MUONNOI_QA_AND_RELEASE_CHECKLIST_2026-05-13.md`

- [ ] **Step 1: Run diff hygiene**

Run:

```bash
git diff --check
```

Expected:

```text
No output.
```

- [ ] **Step 2: Run source scan**

Run:

```bash
rg -n "Cuộc Sống Muôn Nơi|Life Across Places|Tiếng Việt|English" cuocsong.muonnoi.org/public
```

Expected:

```text
Matches on each route.
```

- [ ] **Step 3: Update QA checklist with evidence**

Record command names, date and pass/fail result under the matching gate.

- [ ] **Step 4: Commit**

```bash
git add docs/launch/CUOCSONG_MUONNOI_QA_AND_RELEASE_CHECKLIST_2026-05-13.md
git commit -m "docs(cuocsong): record local qa evidence"
```

## Task 5: Deploy preview and update matrix

**Files:**
- Modify: `docs/launch/MUONNOI_SUBDOMAIN_DNS_CUSTOM_DOMAIN_MATRIX_2026-05-12.md`
- Modify: `docs/launch/CUOCSONG_MUONNOI_QA_AND_RELEASE_CHECKLIST_2026-05-13.md`

- [ ] **Step 1: Deploy preview**

Run from the source folder after Cloudflare project ownership is approved and save the deploy output:

```bash
wrangler pages deploy public --project-name=cuocsong-muonnoi-org 2>&1 | tee /tmp/cuocsong-pages-deploy.log
```

Expected:

```text
Deployment complete
```

- [ ] **Step 2: Smoke preview**

Run:

```bash
PREVIEW_URL="$(rg -o 'https://[^ ]+\\.pages\\.dev' /tmp/cuocsong-pages-deploy.log | head -1)"
curl -I -L --max-time 15 "$PREVIEW_URL/"
curl -L --max-time 15 -s "$PREVIEW_URL/" | rg -n "Cuộc Sống Muôn Nơi|Life Across Places"
```

Expected:

```text
HTTP 200 and current body text found.
```

- [ ] **Step 3: Update matrix**

Record:

```markdown
`cuocsong.muonnoi.org` | living-practice layer | DNS not attached yet | preview URL returned 200 | Pages project `cuocsong-muonnoi-org` | `PREVIEW_PASS_DNS_NOT_ATTACHED`
```

- [ ] **Step 4: Commit**

```bash
git add docs/launch/MUONNOI_SUBDOMAIN_DNS_CUSTOM_DOMAIN_MATRIX_2026-05-12.md docs/launch/CUOCSONG_MUONNOI_QA_AND_RELEASE_CHECKLIST_2026-05-13.md
git commit -m "docs(cuocsong): record preview evidence"
```

## Task 6: Attach custom domain after preview pass

**Files:**
- Modify: `docs/launch/MUONNOI_SUBDOMAIN_DNS_CUSTOM_DOMAIN_MATRIX_2026-05-12.md`
- Modify: `docs/launch/MUONNOI_PARALLEL_DEV_COORDINATION_PLAN_2026-05-12.md`

- [ ] **Step 1: Attach domain in Cloudflare**

Attach:

```text
cuocsong.muonnoi.org
```

- [ ] **Step 2: Verify DNS and HTTPS**

Run:

```bash
dig +short cuocsong.muonnoi.org
curl -I -L --max-time 15 https://cuocsong.muonnoi.org/
curl -L --max-time 15 -s https://cuocsong.muonnoi.org/ | rg -n "Cuộc Sống Muôn Nơi|Life Across Places"
```

Expected:

```text
DNS answer exists, HTTPS returns 200 or intentional redirect, body text found.
```

- [ ] **Step 3: Move decision to live-link allowed**

Update matrix decision:

```text
LIVE_LINK_ALLOWED
```

- [ ] **Step 4: Commit**

```bash
git add docs/launch/MUONNOI_SUBDOMAIN_DNS_CUSTOM_DOMAIN_MATRIX_2026-05-12.md docs/launch/MUONNOI_PARALLEL_DEV_COORDINATION_PLAN_2026-05-12.md
git commit -m "docs(dns): allow cuocsong public link"
```
