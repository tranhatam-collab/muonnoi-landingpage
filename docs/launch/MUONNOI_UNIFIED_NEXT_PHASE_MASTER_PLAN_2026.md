# MUONNOI UNIFIED NEXT PHASE MASTER PLAN · 2026

## 1. Purpose
This plan orders all next phases after payment and email are operating for real.

It aligns old and new Muonnoi planning files so teams can work in parallel without overlapping ownership.

## 2. Current rule
Payment and email operations come first.

Do not open the next public launch phase until:
- payment route has live evidence
- email send/receive has live evidence
- rollback path is documented
- production secrets are stored outside the repo
- monitoring owner is named
- `qa/release-gates/MUONNOI_PAYMENT_EMAIL_PRODUCTION_GATE_CHECKLIST_2026-05-12.md` is fully checked by API, Platform and QA

## 3. Phase sequence
### Phase 0A - Brandpro Adoption And Brand Gate
Owner: Founder/Product + Brand Guardian + Web/Public + Docs + QA

Scope:
- style lock
- visual identity
- verbal identity
- bilingual messaging
- subdomain naming
- brand QA gate

Exit gate:
`MUONNOI_BRAND_GATE_ACTIVE`

### Phase 0 - Payment and Email Operations
Owner: Platform + API + QA

Scope:
- payment provider wiring
- receipt email
- support email
- domain email authentication
- rollback and incident path

Exit gate:
`PAYMENT_EMAIL_REAL_OPERATION_PASS`

### Phase 1 - Public Launch Cleanup
Owner: Web/Public + Product + Legal

Scope:
- claim cleanup
- no dead CTA
- real pages for `/manifesto/`, `/about/`, `/press/`, `/newsletter/`
- sitemap and redirects
- homepage copy aligned with claim-safe package

Exit gate:
`PUBLIC_LAUNCH_CLAIM_SAFE_PASS`

### Phase 2 - Docs Hub And Handoff Publishing
Owner: Docs + Product + Security

Scope:
- docs.muonnoi.org structure
- public launch collection
- product definition
- Life Quest OS collection
- legal collection
- dev handoff collection

Exit gate:
`DOCS_HUB_SOURCE_OF_TRUTH_PASS`

### Phase 3 - Subdomain Homepage Rollout
Owner: Web/Public + Platform + QA

Scope:
- app.muonnoi.org
- ai.muonnoi.org
- dulich.muonnoi.org
- hoctap.muonnoi.org
- family.muonnoi.org
- suckhoe.muonnoi.org
- lamviec.muonnoi.org
- sangtao.muonnoi.org
- congdong.muonnoi.org
- nhachung.muonnoi.org
- dautu.muonnoi.org
- duan.muonnoi.org
- verify.muonnoi.org
- trust.muonnoi.org

Rule:
Do Cloudflare source/domain check before creating or deploying any subdomain page.

Exit gate:
`SUBDOMAIN_HOMEPAGE_MATRIX_PASS`

### Phase 4 - Life Quest OS Pilot
Owner: Product + Community Ops + API + QA

Scope:
- Đà Lạt travel pilot
- host onboarding
- proof submission
- review and appeal
- receipt with hash only after production proof layer exists

Exit gate:
`DALAT_PILOT_READY_WITH_EVIDENCE`

### Phase 5 - Mobile iOS And Android
Owner: Mobile + API + Platform + QA

Scope:
- React Native + Expo + TypeScript recommendation
- auth/session
- quest hub
- proof draft
- offline queue
- notifications
- store readiness

Exit gate:
`MOBILE_ALPHA_READY`

### Phase 6 - Security, Infra And Scale
Owner: Security + Platform + API

Scope:
- Cloudflare edge/security
- AWS core backend path
- Supabase/Neon Postgres early stage
- R2 + S3/B2 storage backup
- GitHub branch protection
- ASVS 5.0.0 application security baseline
- CIS Controls v8/v8.1 operational baseline

Exit gate:
`SECURITY_INFRA_BASELINE_PASS`

## 4. Parallel team map
Product:
- owns claim language, feature priority, user value and acceptance criteria

Web/Public:
- owns public pages, internal links, sitemap, redirects, shared UI consistency and public brand implementation

Docs:
- owns docs.muonnoi.org structure, versioned source-of-truth publishing and brand docs publishing

API/AI:
- owns contracts, auth, proof, notification, payment and email endpoints

Mobile:
- owns iOS/Android app shell, navigation, permissions, offline and store builds

Platform/DevOps:
- owns Cloudflare, DNS, deploy, secrets, CI/CD, rollback and environment separation

Security/Legal:
- owns data protection, source protection, ASVS/CIS mapping, investment language and incident policy

Brand Guardian:
- owns brand style lock, logo usage, voice, language labels, subdomain naming and quarterly brand audit

QA/Release:
- owns route matrix, live evidence, accessibility/basic SEO, release go/no-go and final report

## 5. Non-negotiable rules
- No unverified Local Host numbers.
- No partner name without permission.
- No Tourism Board claim without written evidence.
- No hash receipt claim until proof layer exists.
- No ROI or guaranteed earning language.
- No `#newsletter` placeholder.
- No public-ready claim without route and live evidence.
- No deploy before Cloudflare project/domain check.
- No visible language switch label using `VI`, `EN` or `VI/EN`; public UI must use `Tiếng Việt` and `English`.
- No public brand surface can be called brand-ready before passing the Brand Guardian QA gate.

## 6. Completion signal
Only report `MUONNOI_PUBLIC_AND_DEV_PLAN_SYNC_COMPLETE` when all required plan files exist, all old/new documents point to the same order, and each team has a named owner lane.

## 7. Execution checkpoint 2026-05-12
DONE:
- Public launch cleanup implemented in source for `/about/`, `/manifesto/`, `/press/`, `/newsletter/`.
- Redirects and sitemap updated.
- Homepage/ecosystem link continuity updated.
- Deployed to Cloudflare Pages project `muonnoi`:
`https://d4c10a26.muonnoi.pages.dev`
- Brandpro adoption docs created under `docs/brand`.
- Brandpro live-surface pass started on root public shell: brand subtitle, homepage metadata, palette tokens, typography fallback and reduced-motion handling.
- DNS/custom-domain evidence matrix locked:
`docs/launch/MUONNOI_SUBDOMAIN_DNS_CUSTOM_DOMAIN_MATRIX_2026-05-12.md`
- Payment/email gate checklist created:
`qa/release-gates/MUONNOI_PAYMENT_EMAIL_PRODUCTION_GATE_CHECKLIST_2026-05-12.md`

IN_PROGRESS:
- Docs hub publishing consistency across `docs/launch`, `docs/public-launch`, `docs/dev-handoff`.
- Custom-domain source ownership for `ai.muonnoi.org` and `lamviec.muonnoi.org`.
- Payment/email production evidence capture.

BLOCKED:
- `PAYMENT_EMAIL_REAL_OPERATION_PASS` is still pending; no phase advancement claim beyond gate 0.

NEXT_30_MIN:
- Resolve `ai.muonnoi.org` and `lamviec.muonnoi.org` source/custom-domain ownership.
- Attach payment/email transaction, webhook, email delivery, idempotency, rate-limit and rollback evidence.
