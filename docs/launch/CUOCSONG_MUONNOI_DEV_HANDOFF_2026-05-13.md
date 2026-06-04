# CUOC SONG MUONNOI DEV HANDOFF · 2026-05-13

## Status

READY_FOR_TEAM_PLANNING

Not ready for deployment. Not ready for public homepage CTA. Not ready for payment, email, donation, investment or host intake.

## Read First

All teams working on this lane must read these files in order:

1. `docs/launch/CUOCSONG_MUONNOI_SOURCE_AUDIT_2026-05-13.md`
2. `docs/launch/CUOCSONG_MUONNOI_MASTER_PLAN_2026-05-13.md`
3. `docs/launch/CUOCSONG_MUONNOI_PUBLIC_SITE_CONTENT_MAP_2026-05-13.md`
4. `docs/launch/CUOCSONG_MUONNOI_QA_AND_RELEASE_CHECKLIST_2026-05-13.md`
5. `docs/brand/MUONNOI_BRAND_STYLE_LOCK_2026.md`
6. `docs/brand/MUONNOI_VERBAL_IDENTITY_AND_BILINGUAL_MESSAGING_2026.md`
7. `docs/launch/MUONNOI_SUBDOMAIN_DNS_CUSTOM_DOMAIN_MATRIX_2026-05-12.md`

## Working Boundary

This lane may create future source under:

- `cuocsong.muonnoi.org/`

Source path is locked by Team 1 on 2026-05-13:

- `cuocsong.muonnoi.org/`

Do not create a parallel root-shell source unless the coordination plan explicitly approves a migration route.

## Content Source Rule

Use the Drive documents as source history, not as publish-ready copy.

Required rewrite rules:

- Replace "support visa/legal/finance/health/psychology" with "orientation and verified directory only".
- Replace guaranteed outcomes with readiness language.
- Remove sample phone, address and unverified social accounts.
- Remove fixed price, fundraising and investment lines from public copy.
- Replace "free accommodation/food" with "pilot benefits only when verified and approved".
- Keep Vietnamese with full diacritics.
- Add complete English pages if bilingual release is in scope.

## Team Tasks

### Product Team

Owner files:

- `docs/launch/CUOCSONG_MUONNOI_MASTER_PLAN_2026-05-13.md`
- `docs/launch/CUOCSONG_MUONNOI_PUBLIC_SITE_CONTENT_MAP_2026-05-13.md`

Tasks:

- Confirm route priority.
- Confirm whether launch starts as subdomain or internal root route.
- Confirm which CTAs are allowed before payment/email gate.
- Confirm whether Đà Lạt and Nhà Chung references are framed as historical context, planned pilot or active pilot.

Acceptance:

- Every route has a role, H1, canonical, internal links and gate status.
- No route asks the user for money, regulated data or sensitive identity.

### Content Team

Owner files:

- Future route markdown or HTML files after source path is chosen.
- Content map sections for each route.

Tasks:

- Rewrite the first four Vietnamese pages: `/`, `/gioi-thieu/`, `/song-o-nhieu-noi/`, `/cho-va-nhan/`.
- Draft English equivalents with full language labels.
- Add disclaimers around legal, finance, health, travel and host topics.
- Link to Muôn Nơi modules only when the DNS matrix allows the target host.

Acceptance:

- No old Wix navigation text.
- No emojis or hashtag blocks.
- No unverified contact details.
- No "Đăng ký ngay" CTA until email/contact gate is approved.

### Brand Team

Owner files:

- `docs/brand/*`
- Future CSS/token files for the chosen source path.

Tasks:

- Apply Muôn Nơi naming: `Muôn Nơi`, `Muốn Nói`, `Muon Noi`, `MN` only where context requires.
- Lock language switch labels as `Tiếng Việt` and `English`.
- Keep `Cuộc Sống Muôn Nơi` as a module name, not a separate brand system.

Acceptance:

- Brand lint passes after source exists.
- Public copy avoids hype and promise language.
- UI language labels are not abbreviated.

### Web Team

Owner files after source decision:

- `cuocsong.muonnoi.org/public/*` or `apps/web/public/cuoc-song/*`
- `sitemap.xml`
- `_headers`
- `_redirects`
- `robots.txt`

Tasks:

- Create static route shell.
- Add route-level metadata and canonical URLs.
- Add full internal links across all content pages.
- Add legal pages before regulated-topic references.
- Use Brandpro tokens from current Muôn Nơi style.

Acceptance:

- Local smoke returns `200` for all planned routes.
- `git diff --check` passes.
- No temporary draft strings remain.

### Platform Team

Owner files:

- `docs/launch/MUONNOI_SUBDOMAIN_DNS_CUSTOM_DOMAIN_MATRIX_2026-05-12.md`
- Future `cuocsong.muonnoi.org/wrangler.toml` if created.

Tasks:

- Do not create DNS before source and preview QA pass.
- If using Cloudflare Pages, create or connect one project only after Web confirms source path.
- Attach `cuocsong.muonnoi.org` only after preview smoke and claim QA pass.
- Record project name, preview URL, DNS answer and HTTPS evidence in the matrix.

Acceptance:

- DNS matrix row moves from `PLANNED_NOT_CONFIGURED` to `LIVE_LINK_ALLOWED` only with fresh evidence.

### Legal/Trust Team

Owner files:

- `docs/launch/CUOCSONG_MUONNOI_QA_AND_RELEASE_CHECKLIST_2026-05-13.md`
- future legal pages under the chosen source path.

Tasks:

- Review the blocked claim list in the source audit.
- Approve disclaimers for legal, finance, health, travel and community support.
- Approve partner directory wording before any external partner is named.

Acceptance:

- Every regulated-topic page has boundary language.
- No partner, price, fund or support claim is published without evidence.

### QA Team

Owner files:

- `docs/launch/CUOCSONG_MUONNOI_QA_AND_RELEASE_CHECKLIST_2026-05-13.md`

Tasks:

- Prepare route smoke.
- Prepare link audit.
- Prepare metadata audit.
- Prepare claim-safety scan.
- Prepare accessibility basic check.

Acceptance:

- The QA checklist shows command evidence for every release gate before public linking.

## Suggested Implementation Order

1. Confirm source path.
2. Approve first four page briefs from the content map.
3. Write Vietnamese copy.
4. Write English copy.
5. Create static source.
6. Add legal pages.
7. Run local route smoke and claim scan.
8. Deploy preview.
9. Run preview smoke.
10. Update DNS/custom-domain matrix.
11. Attach custom domain.
12. Add root homepage link only after `LIVE_LINK_ALLOWED`.

Current status:

- Step 1 is done: source path is `cuocsong.muonnoi.org/`.
- Step 2 is next.

## Commit Plan

Use small commits:

- `docs(cuocsong): add source audit and master plan`
- `feat(cuocsong): add static public routes`
- `docs(cuocsong): record preview qa evidence`
- `docs(dns): allow cuocsong public link after dns evidence`

Do not commit:

- `.wrangler`
- `.env`
- provider tokens
- screenshots containing email, phone, payment or identity data
- generated caches
