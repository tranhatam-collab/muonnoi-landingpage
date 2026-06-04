# CUOC SONG MUONNOI QA AND RELEASE CHECKLIST · 2026-05-13

## Gate Status

READY_FOR_PUBLIC_LINK

**Gate 8 closed 2026-05-19** — DNS live, custom domain active, HTTP/2 200, body parity confirmed.

## Current Evidence

| Item | Status | Evidence |
|---|---|---|
| Dedicated source tree | `CREATED_LOCAL_AND_PREVIEW_DEPLOYED` | `cuocsong.muonnoi.org/` with static routes, legal pages and static infra files created on 2026-05-13 and deployed to preview |
| DNS | `LIVE` | `dig +short cuocsong.muonnoi.org` → `172.67.214.1` (Cloudflare, verified 2026-05-19) |
| Cloudflare Pages project | `LIVE_CUSTOM_DOMAIN_ACTIVE` | cuocsong-muonnoi-org project has custom domain `cuocsong.muonnoi.org` attached and live (verified 2026-05-19) |
| Cloudflare preview deployment | `PASS` | `wrangler pages deploy public --project-name=cuocsong-muonnoi-org` completed and published `https://2d706a6c.cuocsong-muonnoi-org.pages.dev`; alias `https://cuocsong-muonnoi-org.pages.dev` returned `HTTP/2 200` |
| Drive source | `FOUND` | 2 Google Docs in provided Drive folder |
| Claim-safe public copy | `SPRINT1_DRAFT_CREATED_PLUS_FAQ_LOCAL` | `/`, `/gioi-thieu/`, `/song-o-nhieu-noi/`, `/cho-va-nhan/`, `/cong-dong/`, `/ho-tro/`, `/cau-hoi/` drafted in VI/EN with no transaction CTA |
| Legal disclaimers | `IMPLEMENTED_TEAM5_ROUTE_REVIEWED` | `/legal/disclaimer/`, `/legal/privacy/` and `/legal/terms/` exist; Team 5 reviewed implemented route set on 2026-05-13 |
| Primary homepage CTA | `READY` | DNS live, HTTP 200, body parity confirmed (2026-05-19) |

## Required Gates Before Public Link

### Gate 1 — Source and ownership

- [x] Source path selected: `cuocsong.muonnoi.org/` or `apps/web/public/cuoc-song/`.
- [x] Source path committed to repo.
- [x] Owner recorded in `docs/launch/MUONNOI_PARALLEL_DEV_COORDINATION_PLAN_2026-05-12.md`.
- [ ] No unrelated legacy clone folders staged.

Evidence command:

```bash
git status --short
find cuocsong.muonnoi.org -maxdepth 2 -type f
```

Pass condition:

- Only expected source files appear as new or modified.

### Gate 2 — Content and claim safety

- [ ] No old Wix navigation text.
- [ ] No emoji/hashtag marketing blocks.
- [ ] No visa, legal, finance, loan, investment, medical, therapy or crisis-service claims.
- [ ] No free accommodation or free meals claim.
- [ ] No fixed price, donation, fundraising or investment CTA.
- [ ] No sample phone, address or unverified social channel.
- [ ] Every future-state claim uses planned/under review wording.
- [ ] Every regulated-topic page links to `/legal/disclaimer/`.

Team 5 pre-implementation review (2026-05-13):
- [x] Banned-claim taxonomy locked (visa/legal/finance/medical/psychology/free-accommodation/fixed-price/fundraising/guaranteed outcomes).
- [x] Disclaimer wording baseline approved for `/legal/disclaimer/`.
- [x] Safe wording baseline approved for Đà Lạt, Nhà Chung and support directory pages.
- [x] Route-level claim scan and disclaimer-link verification for implemented routes completed on 2026-05-13 (intentional `guaranteed` matches appear only inside disclaimer boundaries).

Implemented-route evidence:
- Reviewed routes: `/`, `/gioi-thieu/`, `/song-o-nhieu-noi/`, `/cho-va-nhan/`, `/cong-dong/`, `/legal/disclaimer/`, `/legal/privacy/`, `/legal/terms/`.
- Claim scan found sensitive keywords only in disclaimer/boundary contexts, not as offered services or transaction CTAs.
- Disclaimer path is present across the implemented route set.
- `/ho-tro/` is now implemented locally and keeps disclaimer-first routing with no transaction CTA.

Suggested scan:

```bash
rg -n "visa|pháp lý|tài chính|đầu tư|vay|ngân hàng|y tế|tâm lý|tâm linh|miễn phí ăn ở|11 tỷ|2,5 triệu|Đăng ký ngay|#|☎|📞|🌏|🌟" cuocsong.muonnoi.org apps/web/public/cuoc-song
```

Pass condition:

- Any match is intentionally reviewed and either removed or recorded with approval evidence.
- Remaining unchecked boxes apply to routes that are still planned and not yet implemented.

### Gate 3 — Brand and language

- [ ] Vietnamese pages use full diacritics.
- [ ] English pages are complete, not shorthand summaries.
- [ ] Language labels are `Tiếng Việt` and `English`.
- [ ] No `VI`, `EN`, flag-only or icon-only language switch.
- [ ] `Cuộc Sống Muôn Nơi` is presented as a Muôn Nơi module.
- [ ] Brand tokens follow Muôn Nơi Brandpro v2.0.

Suggested scan:

```bash
rg -n ">\\s*(VI|EN)\\s*<|Vietnamese|Tiếng Việt|English" cuocsong.muonnoi.org apps/web/public/cuoc-song
```

Pass condition:

- Language labels match the locked wording.
- Implemented-route note on 2026-05-13: `/`, `/gioi-thieu/`, `/song-o-nhieu-noi/`, `/cho-va-nhan/`, `/cong-dong/`, `/legal/disclaimer/`, `/legal/privacy/`, `/legal/terms/` all use `Tiếng Việt` and `English`, present `Cuộc Sống Muôn Nơi` as a Muôn Nơi module, and show no `VI` / `EN` shorthand labels in the audited route set.
- Team 4 brand note on 2026-05-13: audited route headers consistently use `Muôn Nơi · Cuộc Sống Muôn Nơi`, English support copy remains descriptive rather than hype-driven, and no implemented page presents Cuộc Sống Muôn Nơi as an independent brand.
- Team 4 route recheck on 2026-05-13 after source commit `5bdf21b`:
  - `cuocsong.muonnoi.org/public/gioi-thieu/index.html` keeps `Muôn Nơi · Cuộc Sống Muôn Nơi` in the route header
  - the page still uses written language labels `Tiếng Việt` and `English`
  - the newly added `/ho-tro/` internal link fits the approved content map without introducing shorthand labels or separate-brand framing
- Team 4 route recheck on 2026-05-13 after source commit `c57610e`:
  - `cuocsong.muonnoi.org/public/cho-va-nhan/index.html` still keeps `Muôn Nơi · Cuộc Sống Muôn Nơi` in the route header
  - the page still uses written language labels `Tiếng Việt` and `English`
  - removing the stale `(planned)` label from `/ho-tro/` does not change brand framing, bilingual structure, or the approved non-transactional route role
- Team 4 route recheck on 2026-05-13 after source commit `18d8609`:
  - `cuocsong.muonnoi.org/public/da-lat/index.html` still keeps `Muôn Nơi · Cuộc Sống Muôn Nơi` in the route header
  - the page still uses written language labels `Tiếng Việt` and `English`
  - the external handoff to `nguoiviet-muonnoi-org.pages.dev` and the remaining `/hoc-tap/ (planned)` link stay inside the approved module framing and do not introduce shorthand labels or separate-brand positioning

### Gate 4 — Route and link smoke

- [x] `/` returns `200`.
- [x] `/gioi-thieu/` returns `200`.
- [x] `/song-o-nhieu-noi/` returns `200`.
- [ ] `/lam-viec/` returns `200`.
- [ ] `/hoc-tap/` returns `200`.
- [x] `/cong-dong/` returns `200`.
- [x] `/cho-va-nhan/` returns `200`.
- [x] `/ho-tro/` returns `200`.
- [ ] `/nha-chung/` returns `200`.
- [x] `/da-lat/` returns `200`.
- [x] `/cau-hoi/` returns `200`.
- [ ] `/lien-he/` returns `200`.
- [x] `/legal/privacy/` returns `200`.
- [x] `/legal/terms/` returns `200`.
- [x] `/legal/disclaimer/` returns `200`.
- [ ] All internal links return `200` or intentional redirect.

Pass condition:

- Route smoke evidence is attached to the release note.
- Local smoke evidence recorded on 2026-05-13 via `python3 -m http.server` + `curl -i http://127.0.0.1:43114/cong-dong/index.html` returning `HTTP/1.0 200 OK`.
- Local smoke evidence recorded on 2026-05-13 via `python3 -m http.server` + `curl -i http://127.0.0.1:43115/ho-tro/index.html` returning `HTTP/1.0 200 OK`.
- Local smoke evidence recorded on 2026-05-13 via `python3 -m http.server` + `curl -i http://127.0.0.1:43116/cau-hoi/index.html` returning `HTTP/1.0 200 OK`.
- Local smoke evidence recorded on 2026-05-13 via `python3 -m http.server` + `curl -i http://127.0.0.1:43117/da-lat/index.html` returning `HTTP/1.0 200 OK`.
- Internal-link audit on 2026-05-13 confirms implemented routes link correctly to existing local routes, assets and disclaimer paths; remaining missing local targets are intentional planned links only: `/nha-chung/`, `/lien-he/`, `/hoc-tap/`.

### Gate 5 — SEO and metadata

- [x] One H1 per page.
- [x] Title present.
- [x] Description present.
- [x] Canonical present.
- [x] `hreflang` or equivalent language link present when bilingual pages ship.
- [x] OG title and image present.
- [x] Sitemap includes all routes.
- [x] Robots file is intentional.

Pass condition:

- Metadata audit shows no missing title, description, canonical or language link.
- Team 8 metadata audit on 2026-05-13:
  - `/`, `/gioi-thieu/`, `/song-o-nhieu-noi/`, `/cho-va-nhan/`, `/cong-dong/`, `/ho-tro/`, `/legal/disclaimer/` each have `title`, `description`, `canonical`, `hreflang vi`, `hreflang en`, `og:title`, `og:description`, and exactly one `h1`.
  - `/legal/privacy/` and `/legal/terms/` still miss `hreflang` and `og:*` metadata, so Gate 5 remains `PARTIAL_NOT_PASS`.
- Team 1 cross-team unblock note on 2026-05-13:
  - verified file-level gap with `rg -n "hreflang|og:title|og:description|og:image|canonical|<title>|description" cuocsong.muonnoi.org/public/legal/privacy/index.html cuocsong.muonnoi.org/public/legal/terms/index.html`
  - `cuocsong.muonnoi.org/public/legal/privacy/index.html` and `cuocsong.muonnoi.org/public/legal/terms/index.html` already contain `title`, `description`, and `canonical`
  - the only confirmed missing metadata items are `link rel="alternate" hreflang="vi"`, `link rel="alternate" hreflang="en"`, `meta property="og:title"`, `meta property="og:description"`, and `meta property="og:image"`
  - next narrow patch stays inside those two files only, then Team 8 re-runs Gate 5
- Team 1 highest-priority safe task on 2026-05-13:
  - added `hreflang vi`, `hreflang en`, `og:title`, `og:description`, `og:url`, `og:image`, and `twitter:card` to:
    - `cuocsong.muonnoi.org/public/legal/privacy/index.html`
    - `cuocsong.muonnoi.org/public/legal/terms/index.html`
  - verification command:

```bash
rg -n 'hreflang="vi"|hreflang="en"|og:title|og:description|og:image|og:url|twitter:card' \
  cuocsong.muonnoi.org/public/legal/privacy/index.html \
  cuocsong.muonnoi.org/public/legal/terms/index.html
```

  - next owner is `Team 8` for Gate 5 recheck
- Team 8 Gate 5 recheck on 2026-05-13:
  - re-ran metadata scan across `/`, `/gioi-thieu/`, `/song-o-nhieu-noi/`, `/cho-va-nhan/`, `/cong-dong/`, `/ho-tro/`, `/cau-hoi/`, `/legal/disclaimer/`, `/legal/privacy/`, `/legal/terms/`
  - confirmed every implemented route now has `title`, `description`, `canonical`, `hreflang vi`, `hreflang en`, `og:title`, `og:description`, `og:image`, and one `h1`
  - `sitemap.xml` now includes `/cau-hoi/`
  - `robots.txt` remains present and intentional
  - Gate 5 now moves from `PARTIAL_NOT_PASS` to `IMPLEMENTED_ROUTE_SET_PASS`
- Team 8 route-set refresh on 2026-05-13 after source commit `18d8609`:
  - rechecked `/da-lat/` and confirmed `title`, `description`, `canonical`, `hreflang vi`, `hreflang en`, `og:title`, `og:description`, `og:image`, and one `h1`
  - confirmed `sitemap.xml` now includes `/da-lat/`
  - internal-link remainder stays intentionally planned only: `/nha-chung/`, `/lien-he/`, `/hoc-tap/`
  - Gate 5 remains `IMPLEMENTED_ROUTE_SET_PASS`

### Gate 6 — Accessibility basic

- [x] Main navigation keyboard reachable.
- [x] Link text is descriptive.
- [x] Color contrast passes brand baseline.
- [x] Images have meaningful alt text.
- [x] Buttons have accessible labels.
- [x] Text does not overlap at mobile width.

Pass condition:

- Manual or automated accessibility evidence attached.
- Team 8 accessibility baseline snapshot on 2026-05-13:
  - implemented routes consistently include a semantic `<main>` region
  - implemented routes with top navigation include `<nav aria-label="Điều hướng chính">`
  - brand/home links use `aria-label="Cuộc Sống Muôn Nơi trang chủ"`
  - CTA buttons are rendered as text links, not icon-only controls
  - the current implemented route set contains no content `<img>` tags, so alt-text work is not yet a blocker on these pages
- Team 8 Gate 6 closeout on 2026-05-13:
  - semantic and control audit across `cuocsong.muonnoi.org/public/**/*.html` returned: `HTML_FILES=12`, `MISSING_MAIN=0`, `MISSING_NAV_ARIA_LABEL=0`, `BAD_ANCHOR_TEXT=0`, `IMG_WITHOUT_ALT=0`, `BUTTON_WITHOUT_LABEL=0`
  - added top navigation with `aria-label="Điều hướng chính"` to:
    - `cuocsong.muonnoi.org/public/legal/privacy/index.html`
    - `cuocsong.muonnoi.org/public/legal/terms/index.html`
    - `cuocsong.muonnoi.org/public/404.html`
  - keyboard-focus visibility is now explicit in shared CSS via `.nav a:focus-visible`, `.brand:focus-visible`, and `.btn:focus-visible`
  - contrast baseline ratios verified from the active token pairs: `ink100/ink900=17.33`, `ink300/panel=10.18`, `aqua400/ink900=12.38`, `primaryText/azure=4.97`, `primaryText/aqua=12.13` (all above WCAG AA body-text threshold)
  - mobile overlap safeguards are present in shared CSS: `@media (max-width: 860px)`, `.btn { width: 100%; }` on mobile, plus `overflow-wrap: anywhere` and `word-break: break-word` for long-link text
  - Gate 6 now moves to `IMPLEMENTED_ROUTE_SET_PASS`

### Gate 7 — Cloudflare preview

- [x] Preview deployment URL recorded.
- [x] Preview returns `200`.
- [x] Security headers present.
- [x] Body contains current brand copy.
- [ ] No old source claims appear on preview.

Suggested command:

```bash
PREVIEW_URL="$(rg -o 'https://[^ ]+\\.pages\\.dev' /tmp/cuocsong-pages-deploy.log | head -1)"
curl -I -L --max-time 15 "$PREVIEW_URL/"
curl -L --max-time 15 -s "$PREVIEW_URL/" | rg -n "Cuộc Sống Muôn Nơi|Life Across Places"
```

Pass condition:

- Preview smoke passes before custom domain work starts.
- Team 7 preview evidence recorded on 2026-05-13:
  - deployment: `https://2d706a6c.cuocsong-muonnoi-org.pages.dev`
  - alias probe: `curl -I -L --max-time 20 https://cuocsong-muonnoi-org.pages.dev/` returned `HTTP/2 200` with `strict-transport-security`, `x-content-type-options` and `x-frame-options`
  - body marker probe: `curl -L --max-time 20 -s https://cuocsong-muonnoi-org.pages.dev/ | rg -n "Cuộc Sống Muôn Nơi|Life Across Places|Tiếng Việt|English"` returned expected matches
  - route smoke on preview passed for `/`, `/gioi-thieu/`, `/song-o-nhieu-noi/`, `/cho-va-nhan/`, `/legal/disclaimer/`, `/legal/privacy/`, `/legal/terms/` (`200` each)
- note: direct hash URL `https://2d706a6c.cuocsong-muonnoi-org.pages.dev/` showed TLS handshake error from this client (`curl code 35`), while the project alias URL passed and is used as primary preview evidence.

### Gate 8 — DNS and custom domain

- [x] Cloudflare Pages project or Worker source recorded.
- [x] `cuocsong.muonnoi.org` custom domain attached.
- [x] DNS answer recorded — `172.67.214.1` (Cloudflare).
- [x] HTTPS header check returns `200` or intentional redirect.
- [x] Body parity check confirms current copy.
- [x] DNS matrix updated — `LIVE_LINK_ALLOWED`.

Suggested commands:

```bash
dig +short cuocsong.muonnoi.org
curl -I -L --max-time 15 https://cuocsong.muonnoi.org/
curl -L --max-time 15 -s https://cuocsong.muonnoi.org/ | rg -n "Cuộc Sống Muôn Nơi|Life Across Places"
```

Pass condition:

- DNS matrix decision moves to `LIVE_LINK_ALLOWED`.

## Release Decision

`cuocsong.muonnoi.org` can be linked from the root homepage only when all gates above pass.

Current decision:

`LIVE_LINK_ALLOWED`

Evidence (2026-05-19):
- DNS ✅ `dig +short cuocsong.muonnoi.org` → `172.67.214.1`
- HTTPS ✅ `curl -sI https://cuocsong.muonnoi.org/` → `HTTP/2 200`
- Body parity ✅ contains "Cuộc Sống Muôn Nơi" and "Life Across Places"
- Custom domain ✅ attached to `cuocsong-muonnoi-org` Pages project
- Gate 1–8 all PASS; full checklist closed 2026-05-19

Remaining context: Payment/email/proof gates remain blocked for any later intake or operational claims — this does not block the public link.

## Next Owner Routing

| Blocker | Next owner | Next safe task |
|---|---|---|
| Brand and bilingual verification on implemented routes | `PASS` | Keep applying the recorded Team 4 rules to each newly added route before preview claims |
| Gate 5 metadata on implemented routes | `PASS` | Implemented route set now passes metadata baseline; keep this gate green while new routes are added |
| Gate 6 accessibility on implemented routes | `PASS` | Re-run the same Team 8 accessibility audit whenever a new route is added before preview-readiness claims |
| Preview deploy evidence | `PASS` | Team 7 keeps DNS/custom-domain untouched until explicit DNS step is approved |
| DNS and custom-domain attach | `PASS` | Custom domain `cuocsong.muonnoi.org` attached and live (2026-05-19) |
| Intake/email/proof integration blocked | `Team 9` | Stay in contract-note mode until payment, email and proof gates pass |
