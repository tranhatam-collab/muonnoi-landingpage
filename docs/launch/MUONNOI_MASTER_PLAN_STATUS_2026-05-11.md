# MUONNOI · MASTER PLAN STATUS · 2026-05-11

## 1. Executive status
Muôn Nơi hiện có 4 lớp đang hình thành rõ:
- public shell
- social/app layer
- trust layer
- life quest layer

Mobile plan đã được thêm vào như execution layer, không thay đổi định nghĩa lõi.

Payment and email operations remain the first gate before the public launch/subdomain expansion work.

## 1.1 Checkpoint 2026-05-12
### Đã làm
- Added public launch routes live in source:
`/about/`, `/manifesto/`, `/press/`, `/newsletter/`.
- Updated internal linking on homepage and ecosystem to include public announcement pages and subdomain map continuity.
- Updated sitemap and redirects for the new public launch routes.
- Enforced footer-link consistency via shared script for all public pages.
- Deployed to Cloudflare Pages project `muonnoi`:
`https://d4c10a26.muonnoi.pages.dev`
alias:
`https://brand-v2-0-voice-and-place.muonnoi.pages.dev`

### Cần làm
- Complete docs publishing lane on `docs.muonnoi.org` using the new launch package collections.
- Lock per-subdomain DNS/custom-domain ownership evidence for:
`dulich`, `hoctap`, `suckhoe`, `sangtao`, `congdong`, `lamviec`, `nhachung`, `dautu`, `duan`, `trust`.

### Sắp làm
- Phase 0 gate closeout:
payment/email production evidence and rollback evidence.
- Phase 1 claim-safe sweep on public copy and metadata.
- Phase 2 docs hub publishing and handoff verification.

### Production matrix update
- Confirmed `200` on `www.muonnoi.org` for public launch routes:
`/about/`, `/manifesto/`, `/press/`, `/newsletter/`.
- Confirmed `200` on `www.muonnoi.org` for core and quest routes listed in sitemap.

## 1.2 Checkpoint 2026-05-12 06:52 +07
### Đã làm
- Applied Brandpro live-surface token updates to the public shell:
brand subtitle, homepage title/metadata, primary palette, typography fallback and reduced-motion handling.
- Updated brand lint to scan the actual live public shell under `apps/web/public` instead of legacy clones or governance docs.
- Locked DNS/custom-domain evidence in:
`docs/launch/MUONNOI_SUBDOMAIN_DNS_CUSTOM_DOMAIN_MATRIX_2026-05-12.md`.
- Created payment/email closeout checklist in:
`qa/release-gates/MUONNOI_PAYMENT_EMAIL_PRODUCTION_GATE_CHECKLIST_2026-05-12.md`.

### Evidence
- Cloudflare Pages list confirmed custom domains for:
`muonnoi`, `app-muonnoi-org`, `docs-muonnoi-org`.
- Cloudflare Pages production deployment completed:
`https://95e0ea23.muonnoi.pages.dev`
environment `Production`, branch `main`, source `4f73c35`.
- Cloudflare Pages preview deployment completed:
`https://e04b01ec.muonnoi.pages.dev`
environment `Preview`, branch `brand/v2.0-voice-and-place`, source `4f73c35`.
- `https://www.muonnoi.org/` returned `200`.
- `https://app.muonnoi.org/` returned `200`.
- `https://docs.muonnoi.org/` returned `200`.
- `https://ai.muonnoi.org/` returned `200`, but Pages custom-domain source was not visible in the current Pages project list.
- `https://api.muonnoi.org/api/health` returned `200`; `/health` returned `404`, so `/api/health` is the canonical health check.

### Cần làm
- Re-check `https://www.muonnoi.org/` body after DNS/edge propagation; local DNS briefly returned resolution failures during the immediate post-deploy check.
- Resolve source ownership/custom-domain evidence for `ai.muonnoi.org` and `lamviec.muonnoi.org`.
- Keep `lqos`, `dautu`, `duan`, `family`, `dulich`, `hoctap`, `suckhoe`, `sangtao`, `congdong`, `trust`, `nhachung` as internal roadmap/quest links until Cloudflare custom-domain and HTTPS evidence pass.
- Attach production or approved test-mode evidence for payment creation, webhook receipt, email delivery, idempotency, rate-limit and rollback.

## 2. Đã khóa
### Public shell
- homepage direction
- ecosystem page direction
- roadmap page direction
- security page direction
- guide page direction
- verify page direction

### Life Quest OS
- 7 systems defined
- purposeful play
- proof-based economy
- flagship pilot direction

### Mobile
- iOS + Android plan
- 30/90/180 roadmap
- release gates
- team ownership
- KPI value-first
- read order
- ownership decision matrix
- information architecture
- screen/state map
- API schema examples
- offline/sync strategy
- notification/event taxonomy
- mobile design system lock
- privacy/permissions matrix
- store submission requirements
- release runbook
- incident response playbook
- mobile scaffold

### Public Launch / Docs / Subdomains
- public launch docs and subdomain package imported
- public announcement file created with claim-safe wording
- public page dev handoff created
- unified next-phase master plan created
- security and infrastructure baseline files created

### Brandpro / Brand Governance
- Brandpro-AAL and Brandpro kit reviewed
- Muonnoi-specific brand adoption plan created
- style lock created for `Muôn Nơi`, `Muốn Nói`, `Muon Noi`, `MN`
- brand architecture and subdomain naming rules created
- verbal identity and bilingual messaging rules created
- visual identity, logo and token rules created
- Brand Guardian and QA gate created

## 3. Đang làm
- chuẩn hóa content public shell
- chuẩn hóa handoff docs
- proof layer / trust layer page continuity
- mobile execution pack
- DNS/subdomain execution lock and evidence refresh
- payment/email production gate checklist execution

### Update 2026-05-11
- public shell preview deploy completed:
`https://c40d0df9.muonnoi.pages.dev`
- alias:
`https://brand-v2-0-voice-and-place.muonnoi.pages.dev`
- link hardening completed for public pages that referenced not-yet-verified subdomains.

## 4. Chưa khóa hoàn toàn
- feed/index page final production copy
- complaints page final
- admin public page final
- status public page final
- live API implementation behind mobile contracts
- real store assets and signed builds
- full DNS evidence matrix for all announced subdomains
- payment/email real-operation evidence
- `/manifesto/`, `/about/`, `/press/`, `/newsletter/` public HTML routes
- docs.muonnoi.org publishing collections for public launch, product, quests, ecosystem, trust-security, legal and dev-handoff

### Public content completeness check
- missing placeholder pages in `apps/web/public`: none found by keyword scan (`TODO`, `TBD`, `placeholder`, `coming soon`, `đang cập nhật`).
- remaining task is live DNS verification per announced ecosystem domains, not copy completeness.

### Brand completeness check
- Brand docs exist in `docs/brand`.
- Brand has been applied to the root public shell tokens and homepage messaging.
- Pending: logo asset pack, full subdomain homepage audit and cross-subdomain live implementation.

## 5. Dependencies
### To ship mobile alpha
Need:
- stable auth/session
- feed read shell
- quest hub data
- proof draft local queue
- privacy/safety/support URLs live

### To ship beta
Need:
- push notification baseline
- proof upload retry
- profile/trust shell
- device QA baseline

### To ship public mobile RC
Need:
- store assets
- policies published
- release gates pass
- crash and offline metrics acceptable

## 6. Top open decisions
1. Final mobile stack confirmation (recommended: React Native + Expo + TS)
2. Auth mechanism final shape for mobile
3. Proof upload media constraints
4. Feature flags per quest vertical
5. Store launch scope by geography
6. Payment provider and receipt/email final production path
7. Docs publishing structure for docs.muonnoi.org
8. Secondary DNS and backup storage provider timing

## 7. Red lines
- no tracker-based growth hacks
- no token-first economy
- no addictive feed design
- no module explosion before core stability

## 8. Status summary by lane
### Product
Green with clarifications needed
### Public shell
Yellow-green
### Mobile
Green for Sprint 0/Sprint 1 planning, Yellow for implementation
### API
Yellow, contracts defined but implementation pending
### QA / Release
Yellow, gates/runbook defined but execution evidence pending

### Payment / Email
Yellow, gate checklist exists; production transaction, webhook, email delivery and rollback evidence still required before public launch expansion

### Security / Infra
Green for planning, Yellow for implementation evidence

### Docs / Public Launch
Green for package structure, Yellow for missing route implementation

### Brand
Green for governance docs, Yellow for full asset and live-surface implementation

## 10. DNS and public-link continuity
Status file:
- `docs/launch/MUONNOI_DNS_AND_SUBDOMAIN_EXECUTION_STATUS_2026-05-11.md`

Latest action:
- public shell links that pointed to not-yet-verified subdomains were redirected to safe internal routes (`/ecosystem/`, `/roadmap/`) to avoid dead-end user paths.

## 11. Full Dev Master Package

Status: `FULL_DEV_MASTER_PACKAGE_CREATED`

New source files:
- `docs/launch/README_INDEX_MUONNOI_FULL_DEV_MASTER_PACKAGE_2026-05-11.md`
- `docs/launch/MUONNOI_UNIFIED_NEXT_PHASE_MASTER_PLAN_2026.md`
- `docs/launch/MUONNOI_PUBLIC_LAUNCH_DOCS_AND_SUBDOMAIN_PACKAGE_2026.md`
- `docs/launch/MUONNOI_PUBLIC_ANNOUNCEMENT_2026.md`
- `docs/launch/DEV_HANDOFF_PUBLIC_PAGES_MUONNOI_2026.md`

Security and infra files:
- `docs/security/INFRASTRUCTURE_HOSTING_STRATEGY.md`
- `docs/security/SECURITY_ARCHITECTURE_MUONNOI_2026.md`
- `docs/security/SOURCE_CODE_PROTECTION_POLICY.md`
- `docs/security/API_SECURITY_BASELINE_ASVS_5.md`
- `docs/security/DATA_PROTECTION_AND_RETENTION_POLICY.md`
- `docs/security/LIFE_QUEST_ANTI_FRAUD_AND_REWARD_SECURITY.md`
- `docs/security/MULTI_CLOUD_DISASTER_RECOVERY_PLAN.md`
- `docs/security/INCIDENT_RESPONSE_RUNBOOK.md`

## 9. Mobile Sprint 0 / Sprint 1 execution pack

Status: STRUCTURED_EXECUTION_READY

Team files:
- `docs/launch/TEAM_READ_ORDER_2026-05-11.md`
- `docs/launch/TEAM_OWNERSHIP_AND_DECISION_MATRIX_2026-05-11.md`
- `apps/mobile/README.md`
- `apps/mobile/MUONNOI_MOBILE_INFORMATION_ARCHITECTURE_2026-05-11.md`
- `apps/mobile/MUONNOI_MOBILE_SCREEN_FLOW_AND_STATE_MAP_2026-05-11.md`
- `apps/mobile/MUONNOI_NOTIFICATION_AND_EVENT_TAXONOMY_2026-05-11.md`
- `apps/mobile/MUONNOI_MOBILE_DESIGN_SYSTEM_LOCK_2026-05-11.md`
- `api/contracts/MUONNOI_MOBILE_API_SCHEMA_AND_EXAMPLES_2026-05-11.md`
- `api/contracts/MUONNOI_SYNC_OFFLINE_CACHE_STRATEGY_2026-05-11.md`
- `docs/launch/MUONNOI_PRIVACY_CONSENT_AND_PERMISSIONS_MATRIX_2026-05-11.md`
- `docs/launch/MUONNOI_STORE_SUBMISSION_REQUIREMENTS_2026-05-11.md`
- `qa/release-gates/MUONNOI_RELEASE_RUNBOOK_2026-05-11.md`
- `qa/release-gates/MUONNOI_INCIDENT_RESPONSE_PLAYBOOK_2026-05-11.md`

Scaffold:
- `apps/mobile/app`
- `apps/mobile/src/navigation`
- `apps/mobile/src/screens`
- `apps/mobile/src/features`
- `apps/mobile/src/components`
- `apps/mobile/src/lib`
- `apps/mobile/src/theme`
- `apps/mobile/src/contracts`

## Update 2026-05-12 — Nguoiviet layer integrated

### What changed
- New Cloudflare Pages project `nguoiviet-muonnoi-org` deployed at `https://nguoiviet-muonnoi-org.pages.dev/`.
- Subdomain `nguoiviet.muonnoi.org` registered, custom domain attached to the Pages project (DNS pending swap from Wix).
- Main shell `www.muonnoi.org` homepage updated with an `infoCard` linking to Người Việt Muôn Nơi, integrating it into the public ecosystem entry surface.
- DNS matrix updated (commit `75c3236`) to include the new subdomain alongside `dulich`, `hoctap`, `suckhoe`, `sangtao`, `congdong`, `lamviec`, `nhachung`, `dautu`, `duan`, `trust`.
- Master plan for the Vietnamese Global Journey branch published at `nguoiviet.muonnoi.org/docs/NGUOIVIET_MUONNOI_MASTER_PLAN_2026-05-12.md` (rubric 92/100 at deploy time).

### New layer position
The ecosystem map now reads:

- Layer 1 — Public shell: `www.muonnoi.org` (homepage, ecosystem, roadmap, manifesto, about, press, newsletter, security, guide, verify).
- Layer 1b — Diaspora / Vietnamese Global Journey: `nguoiviet.muonnoi.org` (NEW; brand v2.0, Azure/Whisper/Gold tokens, Be Vietnam Pro). This sits beside the public shell and feeds into the quest layer for the Đà Lạt pilot intake.
- Layer 2 — Social / app: `app.muonnoi.org`.
- Layer 3 — Trust: `trust.muonnoi.org` (planned).
- Layer 4 — Life Quest verticals: `dulich`, `hoctap`, `suckhoe`, `sangtao`, `congdong`, `lamviec`, `nhachung`, `dautu`, `duan`.
- Docs/API: `docs.muonnoi.org`, `api.muonnoi.org`, `ai.muonnoi.org`.

`nguoiviet.muonnoi.org` is the canonical surface for diaspora-facing content; legacy Wix site `nguoivietmuonnoi.com` will be redirected to it in Phase 5.

### Migration context
- Source: `nguoivietmuonnoi.com` (Wix, legacy).
- Target: `nguoiviet.muonnoi.org` (Cloudflare Pages, brand v2.0).
- Master plan: `nguoiviet.muonnoi.org/docs/NGUOIVIET_MUONNOI_MASTER_PLAN_2026-05-12.md`.
- Rubric: 92/100 at deploy time, target 100/100 after DNS swap + assets + legal pages.

### Next gates
1. DNS swap (manual user step in the Cloudflare dashboard) to move `nguoiviet.muonnoi.org` off the Wix CNAME chain.
2. `og.png` brand asset for OpenGraph/Twitter card sharing.
3. Privacy, Terms and Refund pages published under `nguoiviet.muonnoi.org/legal/`.
4. Wix to new redirect on the legacy `nguoivietmuonnoi.com` domain (Phase 5).
5. Search Console submission for `nguoiviet.muonnoi.org` (property + sitemap).

## Update 2026-05-12 — Mobile workstream rebooted (RN+Expo)

### What changed
- Mobile master plan v1.0 ban hành: `apps/mobile/MUONNOI_MOBILE_APP_PLAN_2026-05-12.md`.
- Tech stack đổi từ Capacitor (legacy `app.muonnoi.org` mobile-shell) sang React Native + Expo (stable latest tại thời điểm triển khai, không khoá cứng SDK).
- 4 file deliverable đi kèm (do agents khác viết song song): API endpoints, offline sync protocol, privacy + store compliance, QA + release checklist.
- Trạng thái: PLANNED — build sau khi Travel Quest web pilot Đà Lạt ổn (gate dependency).

### Tech stack lock
- Framework: React Native + Expo (stable latest, không khoá SDK version)
- Build: EAS Build
- Updates: EAS Update (JS-only changes)
- Navigation: Expo Router (file-based, universal links built-in)
- State: Zustand (client) + TanStack Query v5 (server)
- Auth: JWT SSO với `identity.muonnoi.org` + biometric local (Keychain/Keystore)
- Backend: `api.muonnoi.org` existing Cloudflare Workers + D1 + R2 (mobile endpoints extension)
- Crash/Perf: Sentry (minimal, no third-party analytics)
- Push: APNs (iOS) + FCM messaging-only (Android, KHÔNG bật Firebase Analytics)

### Nguyên tắc bất biến mobile (10 điều)
1. Không tracking pixel.
2. Không third-party analytics SDK (no Firebase Analytics, GA, Mixpanel, Amplitude, AppsFlyer, Adjust, Crashlytics).
3. Không tối ưu time spent.
4. Không infinite scroll gây nghiện.
5. Camera/GPS chỉ dùng khi người dùng thực hiện proof.
6. Dữ liệu tối thiểu, khai báo đúng App Store Privacy + Google Play Data Safety.
7. Offline-first bắt buộc cho Travel Quest.
8. Push notification mặc định opt-in, giới hạn tần suất (max 1 push/day per user).
9. App đồng bộ với `muonnoi.org`, `app.muonnoi.org`, `dulich.muonnoi.org` và Life Quest OS.
10. Link bền (universal links / deep links).

### Gate dependencies
1. Travel Quest web pilot ≥ 1 tháng stable trên `dulich.muonnoi.org`.
2. Backend proof/reward endpoints có ≥ 100 receipt issued (real data, not test).
3. 50+ Local Host onboarded (Đà Lạt pilot baseline).
4. `api.muonnoi.org` extended với mobile-specific endpoints (`/api/mobile/*`).

### Timeline target
- MVP: Tháng 7-9 2026 (12 tuần sprint, sau Đà Lạt soft launch May-June 2026).
- V1: Tháng 10-12 2026 (multi-quest: Học Đời + Family + chochoi hub + EN).
- V2: Q1-Q2 2027 (full 7-quest ecosystem + AI tools + chat + VC receipt export).

### Legacy Capacitor `app.muonnoi.org` mobile-shell
- Status: deprecated cho mobile native app.
- Vẫn giữ làm PWA bridge cho web/mobile fallback (không gỡ).
- KHÔNG mở rộng feature trên Capacitor — feature mới đi vào RN+Expo plan.
- Predecessor doc: `apps/mobile/MUONNOI_MOBILE_TEAM_HANDOFF_SPRINT_01_2026-05-11.md` (Capacitor era, superseded).

### Team handoff index
- New doc: `docs/launch/MUONNOI_MOBILE_TEAM_HANDOFF_INDEX_2026-05-12.md` (consolidates 5 deliverable files + roles + sprint plan + approval gates).

## Update 2026-05-12 — Parallel dev coordination locked

### What changed
- Created `docs/launch/MUONNOI_PARALLEL_DEV_COORDINATION_PLAN_2026-05-12.md` as the shared routing layer for API, Platform, QA, Web, Nguoi Viet, Mobile, Brand, Docs and Ops teams.
- Updated `docs/launch/TEAM_READ_ORDER_2026-05-11.md` to include the 11-agent batch files, Nguoi Viet handoff and mobile 5-doc bundle.
- Aligned `docs/launch/NGUOIVIET_TEAM_HANDOFF_2026-05-12.md` and `docs/launch/NGUOIVIET_QA_CHECKLIST_2026-05-12.md` with the actual shipped route structure in `nguoiviet.muonnoi.org/public/sitemap.xml`.
- Moved the Nguoi Viet source-of-truth into the repo lane: `nguoiviet.muonnoi.org/`.

### True state after coordination pass
- Nguoi Viet preview source is ready for team development from the repo.
- Canonical DNS remains blocked by manual CNAME swap from Wix to Cloudflare Pages.
- Payment/email real-operation gate remains blocked by missing implementation, provider credentials, Cloudflare secrets and QA execution.
- Mobile native implementation remains gated behind Travel Quest web pilot stability and mobile backend endpoint readiness.

### Team rule
Every parallel team may proceed only in its owned lane. Release claims remain sequential and must follow the gate evidence files.

## Update 2026-05-13 — Cuộc Sống Muôn Nơi planning lane added

### What changed
- Checked local repo, DNS, Cloudflare Pages and the provided Drive folder for `cuocsong.muonnoi.org`.
- No dedicated `cuocsong.muonnoi.org` source tree was found.
- `dig +short cuocsong.muonnoi.org` returned no DNS answer.
- `wrangler pages project list | rg -i "cuoc|song|cuocsong"` returned no matching Pages project or custom domain.
- The Drive folder contains two legacy source documents for `Cuộc Sống Muôn Nơi`; they are useful for taxonomy and history, but not safe for direct public publishing.

### New files
- `docs/launch/CUOCSONG_MUONNOI_SOURCE_AUDIT_2026-05-13.md`
- `docs/launch/CUOCSONG_MUONNOI_MASTER_PLAN_2026-05-13.md`
- `docs/launch/CUOCSONG_MUONNOI_DEV_HANDOFF_2026-05-13.md`
- `docs/launch/CUOCSONG_MUONNOI_PUBLIC_SITE_CONTENT_MAP_2026-05-13.md`
- `docs/launch/CUOCSONG_MUONNOI_QA_AND_RELEASE_CHECKLIST_2026-05-13.md`
- `docs/launch/CUOCSONG_MUONNOI_TEAM_EXECUTION_AND_AUTOMATION_PLAN_2026-05-13.md`
- `docs/superpowers/plans/2026-05-13-cuoc-song-muon-noi-subdomain.md`

### Layer position
`Cuộc Sống Muôn Nơi` is now defined as the living-practice layer:
- It sits beside `nguoiviet.muonnoi.org`, which remains the Vietnamese Global Journey layer.
- It routes into `dulich`, `lamviec`, `nhachung`, `hoctap`, `family`, `suckhoe`, `congdong` and `sangtao` only when those modules have link-safe evidence.
- It must use the shared Muôn Nơi trust, brand, language, claim-safety and release-evidence gates.

### True state
- Status: `READY_FOR_TEAM_PLANNING`.
- Release state: `NOT_RELEASE_READY`.
- DNS state: `NOT_CONFIGURED`.
- Cloudflare state: `NO_PROJECT_FOUND`.
- Content state: `NEEDS_CLAIM_SAFE_REWRITE`.
- Source path: `cuocsong.muonnoi.org/`.
- Automation state: `SINGLE_30_MIN_COORDINATOR_LOOP_ACTIVE` (`muonnoi-cuocsong-auto-dev-30m`).

### Next gates
1. Product approves the route priority and source path.
2. Content writes the first four claim-safe routes plus the disclaimer page.
3. Legal/Trust reviews blocked claims from the source audit.
4. Web creates source only after the first content sprint is approved.
5. Platform attaches Cloudflare preview and DNS only after route, brand, claim and SEO QA pass.

## Update 2026-05-17 — Brand Identity System Design Brief completed

### What changed
- Comprehensive brand identity system design brief completed and delivered to design team.
- File: `docs/brand/MUONNOI_BRAND_IDENTITY_SYSTEM_2026_DESIGN_BRIEF.md` (15,000+ words)
- Scope: Master brand identity + NGƯỜI VIỆT sub-brand with detailed visual systems for 8 subdomains

### Master brand identity specifications
- **Color palette**: 
  - Primary: Azure #3B7EFF, Whisper #7FE0E5, Gold #D4AF37
  - Neutral: Charcoal #0a0f14, White #FFFFFF
  - Semantic: Success #10B981, Warning #F59E0B, Error #EF4444
- **Typography**: Inter/Roboto (body/display), JetBrains Mono (code), with Vietnamese diacritics support, 1.6 line height
- **Logo system**: Circular badge (32px min digital, 10mm print), 5 lockup formats (horizontal, vertical, icon-only, monochrome, reversed)
- **Voice & tone**: Evidence-led over hype, warm over distant, community-builder energy
- **Component specifications**: Buttons, forms, cards, status indicators, navigation patterns with accessibility (WCAG 2.1 AA)

### NGƯỜI VIỆT sub-brand identity
- **Color extensions**: Vermillion #D84315 (cultural warmth), Teal #00897B (journey depth), Cream #FFFBF0 (traditional aesthetic)
- **7-stage journey narrative**: Con người → Mắc kẹt → Môi trường → Va chạm → Trí tuệ → Hệ quả → Quay trở về
- **8 subdomain visual systems**:
  1. Root (người-việt.muonnoi.org): Hero + Vietnam map + journey visualization
  2. Hành Trình (Journeys): Timeline vertical scroll, Vermillion→Azure→Teal gradient
  3. Tìm Kiếm (Discovery): Search + map view interface
  4. Cộng Đồng (Community): Hexagonal grid community groups layout
  5. Câu Chuyện (Stories): Magazine-style full-bleed hero images
  6. Tài Nguyên (Resources): Card grid color-coded by category
  7. Bạn Trẻ (Mentorship): Profile cards + matching quiz + compatibility scoring
  8. Điểm Dừng (Way-stations): Map-centric regional hubs with city accent colors

### Responsive design & accessibility
- Breakpoints: Mobile (<768px), Tablet (768–1279px), Desktop (1280px+)
- Dark mode mapping and implementation rules
- WCAG 2.1 AA compliance: 4.5:1 minimum contrast, Vietnamese diacritics support
- 40+ design QA verification points

### Design deliverables checklist
**Tier 1 (Essential)**:
- Figma component library (atoms, molecules, organisms)
- CSS token export and design tokens documentation
- Brand guidelines PDF (6-12 pages)

**Tier 2 (NGƯỜI VIỆT specific)**:
- Journey visualization interactive prototype
- 8 subdomain layout templates
- City-specific accent color palette for Way-stations

**Tier 3 (Responsive & Accessibility)**:
- Mobile-first responsive grid system
- Dark mode color map + implementation guide
- Accessibility audit report (WCAG 2.1 AA)

**Tier 4 (Implementation)**:
- React component examples (Hero, StoryCard, ProfileCard)
- Tailwind CSS configuration with design tokens
- Icon library (SVG source + React wrapper)

### Sign-off criteria
Design team approves when:
- All Figma components match design brief specifications
- CSS tokens export successfully with no missing values
- 10 sample pages (5 light, 5 dark) pass accessibility audit
- NGƯỜI VIỆT 8 subdomain layout templates render correctly across all breakpoints
- Brand guidelines PDF matches visual delivery

### Next gates
1. Design team creates Figma library from design brief specifications
2. CSS token export and Tailwind configuration
3. React component development and storybook setup
4. NGƯỜI VIỆT subdomain implementation begins after design approval
5. Design QA validation on all 8 NGƯỜI VIỆT subdomains
