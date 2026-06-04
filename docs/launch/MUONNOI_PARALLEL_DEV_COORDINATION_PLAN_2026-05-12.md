# MUONNOI PARALLEL DEV COORDINATION PLAN · 2026-05-12

## Verdict

PARALLEL_DEV_READY_WITH_EXPLICIT_GATES

This file is the routing layer for teams working after the 11-agent batch. It does not replace the master plans. It tells each team what to read first, what files they own, what they can change in parallel, and what gates block release claims.

## Current true state

### Complete
- Main repo branch `main` is pushed through commit `fbbfecd` for the 11-agent planning batch.
- Payment/email blocked evidence is recorded through commit `9032bda`.
- Mobile planning bundle is complete at documentation level: app plan, API endpoints, offline sync, privacy/store compliance, QA/release checklist.
- Người Việt Muôn Nơi planning bundle exists and the Cloudflare Pages preview is live.
- Brand lint and Người Việt smoke scripts exist.

### Not complete
- Payment/email production endpoints are not deployed.
- Payment/email providers and production secrets are not configured.
- Payment/email QA scenarios cannot execute until API and Platform deploy live endpoints.
- `nguoiviet.muonnoi.org` source was local-only after the batch and must be committed before teams can safely work from repo.
- `nguoiviet.muonnoi.org` DNS swap from Wix to Cloudflare Pages is still a manual owner action.
- `og.png` raster is still pending; `og.svg` exists.
- Wix legacy redirect is Phase 5 after stable DNS.

## Source of truth

Teams must not work from chat summaries. Start from these files.

Core status:
- `docs/launch/MUONNOI_MASTER_PLAN_STATUS_2026-05-11.md`
- `docs/launch/TEAM_READ_ORDER_2026-05-11.md`
- `docs/launch/MUONNOI_TEAM_HANDOFF_EXECUTION_PLAN_2026-05-12.md`
- `docs/launch/MUONNOI_PARALLEL_DEV_COORDINATION_PLAN_2026-05-12.md`

Payment and email gate:
- `qa/release-gates/MUONNOI_PAYMENT_EMAIL_PRODUCTION_GATE_CHECKLIST_2026-05-12.md`
- `docs/platform/MUONNOI_API_DEPLOYMENT_EVIDENCE_2026-05-12.md`
- `qa/release-gates/MUONNOI_PAYMENT_EMAIL_TEST_EVIDENCE_2026-05-12.md`
- `scripts/verify-payment-email-gate.sh`

Mobile:
- `docs/launch/MUONNOI_MOBILE_TEAM_HANDOFF_INDEX_2026-05-12.md`
- `apps/mobile/MUONNOI_MOBILE_APP_PLAN_2026-05-12.md`
- `apps/mobile/MOBILE_API_ENDPOINTS_MUONNOI_2026-05-12.md`
- `apps/mobile/MOBILE_OFFLINE_SYNC_PROTOCOL_2026-05-12.md`
- `apps/mobile/MOBILE_PRIVACY_AND_STORE_COMPLIANCE_2026-05-12.md`
- `apps/mobile/MOBILE_QA_AND_RELEASE_CHECKLIST_2026-05-12.md`

Nguoi Viet:
- `docs/launch/NGUOIVIET_TEAM_HANDOFF_2026-05-12.md`
- `docs/launch/NGUOIVIET_QA_CHECKLIST_2026-05-12.md`
- `nguoiviet.muonnoi.org/README.md`
- `nguoiviet.muonnoi.org/docs/DEV_HANDOFF_NGUOIVIET_MUONNOI_SUBDOMAIN_2026-05-12.md`
- `nguoiviet.muonnoi.org/docs/NGUOIVIET_MUONNOI_MASTER_PLAN_2026-05-12.md`
- `scripts/qa-nguoiviet-smoke.sh`

Cuoc Song:
- `docs/launch/CUOCSONG_MUONNOI_SOURCE_AUDIT_2026-05-13.md`
- `docs/launch/CUOCSONG_MUONNOI_MASTER_PLAN_2026-05-13.md`
- `docs/launch/CUOCSONG_MUONNOI_PUBLIC_SITE_CONTENT_MAP_2026-05-13.md`
- `docs/launch/CUOCSONG_MUONNOI_DEV_HANDOFF_2026-05-13.md`
- `docs/launch/CUOCSONG_MUONNOI_QA_AND_RELEASE_CHECKLIST_2026-05-13.md`
- `docs/launch/CUOCSONG_MUONNOI_TEAM_EXECUTION_AND_AUTOMATION_PLAN_2026-05-13.md`
- `docs/superpowers/plans/2026-05-13-cuoc-song-muon-noi-subdomain.md`

Brand:
- `docs/brand/MUONNOI_BRANDPRO_ADOPTION_PLAN_2026.md`
- `docs/brand/MUONNOI_BRAND_STYLE_LOCK_2026.md`
- `docs/brand/MUONNOI_VISUAL_IDENTITY_LOGO_AND_TOKENS_2026.md`
- `docs/brand/MUONNOI_BRAND_GUARDIAN_AND_QA_GATE_2026.md`
- `scripts/brand-lint-muonnoi.sh`

## Parallel work lanes

| Lane | Owner | Can start now | Blocked by | Primary files | Required verification |
|---|---|---:|---|---|---|
| API payment/email | API team | Yes | provider decision, implementation | `docs/api/*`, `qa/release-gates/*` | `scripts/verify-payment-email-gate.sh` |
| Platform payment/email | Platform team | Yes | Cloudflare secrets, Worker deploy | `docs/platform/*`, `ai.muonnoi.org/workers/api` if used | health, CORS, rollback evidence |
| QA payment/email | QA team | Prep only | live API endpoints | `qa/release-gates/*` | 10 scenario evidence file |
| Nguoi Viet web | Web team | Yes | DNS only for canonical host | `nguoiviet.muonnoi.org/public/*` | `scripts/qa-nguoiviet-smoke.sh` |
| Nguoi Viet content | Content team | Yes | Founder/legal copy decisions | `nguoiviet.muonnoi.org/docs/*` | route/page review and no claim drift |
| Nguoi Viet DNS/SEO | Platform + SEO | After DNS owner action | manual DNS swap | DNS matrix, sitemap, robots | `dig`, `curl -I`, Search Console |
| Cuoc Song planning | Product + Content + Legal/Trust | Yes | source-path decision, claim review | `docs/launch/CUOCSONG_MUONNOI_*` | source audit and QA checklist review |
| Cuoc Song web | Web team | Yes | Team 4/5 route-level signoff and remaining route coverage | `cuocsong.muonnoi.org/*` | local route smoke, claim scan, metadata audit |
| Cuoc Song DNS/SEO | Platform + SEO | Prep only | preview QA and Cloudflare source | DNS matrix, `cuocsong.muonnoi.org/wrangler.toml`, future preview evidence | `dig`, `curl -I`, body parity |
| Mobile planning | Mobile team | Yes | none for Sprint 0 | `apps/mobile/*.md` | file-by-file acceptance review |
| Mobile implementation | Mobile team | No | Travel Quest web pilot stable, API mobile endpoints | future app scaffold | Gate 1 approval |
| Brand guardian | Brand team | Yes | none | `docs/brand/*`, live public files | `scripts/brand-lint-muonnoi.sh .` |
| Docs publishing | Docs team | Yes | docs host deployment ownership | `docs/launch/*`, `docs.muonnoi.org/*` | docs route smoke |

## Hard dependencies

Payment/email gate:
- API and Platform must deploy real endpoints before QA can execute payment/email tests.
- Public expansion, paid wording, receipt claims and host payment wording remain blocked until `PAYMENT_EMAIL_REAL_OPERATION_PASS`.

Nguoi Viet:
- Source must live in the repo before team changes begin.
- DNS swap must happen before canonical SEO and Search Console work can be called complete.
- `og.png` must exist before social-share readiness can be called complete.

Cuoc Song:
- Drive source is historical material and must not be copied directly to public routes.
- Source path is locked as `cuocsong.muonnoi.org/`.
- Product, Content and Legal/Trust must approve first-sprint routes before preview deployment and wider route expansion.
- `cuocsong.muonnoi.org` now has a local source tree, no DNS answer, no Cloudflare Pages project, and Gate 5 metadata passes on the implemented route set, now including `/da-lat/`, as of 2026-05-13.
- Public homepage CTAs remain blocked until DNS matrix marks the host `LIVE_LINK_ALLOWED`.

Mobile:
- React Native + Expo is the selected direction.
- Expo SDK must be stable latest at implementation time. Do not lock the plan to SDK 52+.
- Native mobile implementation starts only after the Travel Quest web pilot is stable for at least one month and the mobile backend endpoints are ready.

## Team update protocol

Every team update must include:
- `Status`: DONE, IN_PROGRESS, BLOCKED or NEEDS_DECISION.
- `Files touched`: exact paths.
- `Evidence`: command output, URL, screenshot path or checklist section.
- `Next owner`: team or person.
- `Release impact`: BLOCKS_RELEASE, BLOCKS_PUBLIC_EXPANSION, BLOCKS_MOBILE, or NO_RELEASE_BLOCK.

Do not write vague states such as `almost done`, `ready enough`, `ok`, or `looks good`.

## Commit discipline

- Commit only the lane being changed.
- Do not stage legacy clone folders unless the lane explicitly owns them.
- Do not commit `.wrangler`, `.env`, provider secrets, token output, screenshots containing secrets, or local machine caches.
- Use small commits by lane:
  - `docs(plan): update parallel dev coordination`
  - `feat(nguoiviet): add public site source`
  - `docs(mobile): update api handoff`
  - `docs(gate): attach payment email evidence`

## Immediate next work order

1. Commit `nguoiviet.muonnoi.org` source without `.wrangler` cache.
2. Align Người Việt QA checklist route names with the actual source and sitemap.
3. Re-run `scripts/brand-lint-muonnoi.sh .`.
4. Re-run `scripts/qa-nguoiviet-smoke.sh https://nguoiviet-muonnoi-org.pages.dev`.
5. Update this plan and `TEAM_READ_ORDER` with the final source-of-truth state.
6. Team 4 and Team 8 route-level brand, metadata, language-label and internal-link evidence is now recorded for the implemented Cuộc Sống route set, including `/cau-hoi/`.
7. Team 7 should stay in preview/DNS prep only and update its source-of-truth docs for the current Cuộc Sống route set, now including `/cau-hoi/` and `/da-lat/`; do not attach DNS or claim preview/live readiness yet.
8. Team 1 automation now runs every 5 minutes as a single coordinator loop from `docs/launch/CUOCSONG_MUONNOI_TEAM_EXECUTION_AND_AUTOMATION_PLAN_2026-05-13.md`.

## Gate status

| Gate | Status | Reason |
|---|---|---|
| Public shell routes | PASS | Route audit passed on planned launch routes |
| Brand lint | PASS | `bash scripts/brand-lint-muonnoi.sh .` passed after Nguoi Viet source was added |
| Nguoi Viet preview | PASS | `bash scripts/qa-nguoiviet-smoke.sh https://nguoiviet-muonnoi-org.pages.dev` passed |
| Nguoi Viet canonical DNS | BLOCKED | manual DNS swap required |
| Cuoc Song planning | PASS | source audit, master plan, content map, dev handoff, QA checklist and implementation plan exist |
| Cuoc Song source/DNS | BLOCKED | local source exists and Gate 5 passes on implemented routes, but there is still no DNS answer, no Cloudflare Pages project and no preview evidence yet |
| Payment/email real operation | BLOCKED | no deployed endpoints, providers, secrets or QA evidence |
| Mobile Sprint 0 planning | PASS | 5-doc mobile bundle complete |
| Mobile native build | BLOCKED | gate requires web pilot stability and mobile backend endpoints |

## Verification snapshot

2026-05-12:
- Brand lint: PASS across `apps/web/public`, `docs.muonnoi.org/public` and `nguoiviet.muonnoi.org/public`.
- Nguoi Viet smoke: PASS on preview URL.
- Nguoi Viet route coverage: 11 main routes, 3 system routes, 4 legal routes.
- Nguoi Viet sitemap: 15 URLs with canonical `https://nguoiviet.muonnoi.org/` prefix.
- Nguoi Viet internal links: 12/12 returned `200`.
- Diff hygiene: `git diff --check` PASS.

## Final rule

Teams may work in parallel, but release claims are sequential. A lane can be `READY_FOR_TEAM_DEV` without being `RELEASE_READY`.
