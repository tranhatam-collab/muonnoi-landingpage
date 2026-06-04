# Muonnoi Team Read Order

Date: 2026-05-11
Scope: Sprint 0 / Sprint 1 kickoff for Muonnoi Life Quest OS mobile.

## Verdict

EXECUTION_READY_FOR_SPRINT_0_AND_SPRINT_1
FULL_DEV_PACKAGE_SYNCED_FOR_NEXT_PHASES

This read order is mandatory before implementation starts.

## Read order for all teams

1. `docs/launch/README_INDEX_MUONNOI_FULL_DEV_MASTER_PACKAGE_2026-05-11.md`
2. `docs/launch/MUONNOI_UNIFIED_NEXT_PHASE_MASTER_PLAN_2026.md`
3. `docs/brand/MUONNOI_BRANDPRO_ADOPTION_PLAN_2026.md`
4. `docs/brand/MUONNOI_BRAND_STYLE_LOCK_2026.md`
5. `docs/brand/MUONNOI_BRAND_ARCHITECTURE_AND_SUBDOMAIN_RULES_2026.md`
6. `docs/brand/MUONNOI_VERBAL_IDENTITY_AND_BILINGUAL_MESSAGING_2026.md`
7. `docs/brand/MUONNOI_VISUAL_IDENTITY_LOGO_AND_TOKENS_2026.md`
8. `docs/brand/MUONNOI_BRAND_GUARDIAN_AND_QA_GATE_2026.md`
9. `docs/launch/MUONNOI_PUBLIC_LAUNCH_DOCS_AND_SUBDOMAIN_PACKAGE_2026.md`
10. `docs/launch/MUONNOI_PUBLIC_ANNOUNCEMENT_2026.md`
11. `docs/launch/DEV_HANDOFF_PUBLIC_PAGES_MUONNOI_2026.md`
12. `docs/launch/README_INDEX_MUONNOI_MOBILE_PACKAGE_2026-05-11.md`
13. `docs/launch/MUONNOI_LIFE_QUEST_OS_INTEGRATED_MASTER_PLAN_2026.md`
14. `docs/launch/MUONNOI_LIFE_QUEST_OS_MOBILE_EXECUTION_MASTER_PLAN_2026-05-11.md`
15. `docs/launch/MUONNOI_MASTER_PLAN_STATUS_2026-05-11.md`
16. `docs/launch/MUONNOI_PARALLEL_DEV_COORDINATION_PLAN_2026-05-12.md`
17. `docs/launch/MUONNOI_DNS_AND_SUBDOMAIN_EXECUTION_STATUS_2026-05-11.md`
18. `docs/launch/MUONNOI_SUBDOMAIN_DNS_CUSTOM_DOMAIN_MATRIX_2026-05-12.md`
19. `docs/launch/NGUOIVIET_TEAM_HANDOFF_2026-05-12.md`
20. `docs/launch/NGUOIVIET_QA_CHECKLIST_2026-05-12.md`
21. `docs/launch/MUONNOI_MOBILE_TEAM_HANDOFF_INDEX_2026-05-12.md`
22. `docs/security/INFRASTRUCTURE_HOSTING_STRATEGY.md`
23. `docs/security/SECURITY_ARCHITECTURE_MUONNOI_2026.md`
24. `docs/security/SOURCE_CODE_PROTECTION_POLICY.md`
25. `docs/security/API_SECURITY_BASELINE_ASVS_5.md`
26. `docs/security/DATA_PROTECTION_AND_RETENTION_POLICY.md`
27. `docs/security/LIFE_QUEST_ANTI_FRAUD_AND_REWARD_SECURITY.md`
28. `docs/security/MULTI_CLOUD_DISASTER_RECOVERY_PLAN.md`
29. `docs/security/INCIDENT_RESPONSE_RUNBOOK.md`
30. `apps/mobile/MUONNOI_MOBILE_APP_PLAN_2026-05-12.md`
31. `apps/mobile/MOBILE_API_ENDPOINTS_MUONNOI_2026-05-12.md`
32. `apps/mobile/MOBILE_OFFLINE_SYNC_PROTOCOL_2026-05-12.md`
33. `apps/mobile/MOBILE_PRIVACY_AND_STORE_COMPLIANCE_2026-05-12.md`
34. `apps/mobile/MOBILE_QA_AND_RELEASE_CHECKLIST_2026-05-12.md`
35. `apps/mobile/MUONNOI_MOBILE_TEAM_HANDOFF_SPRINT_01_2026-05-11.md`
36. `apps/mobile/MUONNOI_MOBILE_INFORMATION_ARCHITECTURE_2026-05-11.md`
37. `apps/mobile/MUONNOI_MOBILE_SCREEN_FLOW_AND_STATE_MAP_2026-05-11.md`
38. `api/contracts/MUONNOI_MOBILE_API_SCHEMA_AND_EXAMPLES_2026-05-11.md`
39. `api/contracts/MUONNOI_SYNC_OFFLINE_CACHE_STRATEGY_2026-05-11.md`
40. `apps/mobile/MUONNOI_NOTIFICATION_AND_EVENT_TAXONOMY_2026-05-11.md`
41. `apps/mobile/MUONNOI_MOBILE_DESIGN_SYSTEM_LOCK_2026-05-11.md`
42. `docs/launch/MUONNOI_PRIVACY_CONSENT_AND_PERMISSIONS_MATRIX_2026-05-11.md`
43. `docs/launch/MUONNOI_STORE_SUBMISSION_REQUIREMENTS_2026-05-11.md`
44. `qa/release-gates/MUONNOI_MOBILE_RELEASE_GATES_2026-05-11.md`
45. `qa/release-gates/MUONNOI_RELEASE_RUNBOOK_2026-05-11.md`
46. `qa/release-gates/MUONNOI_INCIDENT_RESPONSE_PLAYBOOK_2026-05-11.md`
47. `qa/release-gates/MUONNOI_PAYMENT_EMAIL_PRODUCTION_GATE_CHECKLIST_2026-05-12.md`

## Team-specific first reads

Product:
- Read files 1-21 first.
- Then lock acceptance criteria from public, Life Quest and mobile files.

Mobile:
- Read files 21 and 30-41 first after files 1-18.
- Then implement against API and release gate files.

API/AI:
- Read files 31-32, 38-39, 22-29 and 47 first after files 1-18.
- Then align payment, email, proof, auth, notification and sync contracts.

Platform:
- Read files 16-29 and 44-47 first after files 1-11.
- Then lock Cloudflare, deploy, DNS, secrets, rollback and incident ownership.

QA/Trust:
- Read files 1-11, 16-29, 34-47 first.
- Then create route, claim, release, permission, proof, payment and email test matrices.

Web/Public:
- Read files 1-11 and all files in `docs/brand` before editing public pages.
- Then run brand QA, character hygiene, route and metadata gates.

Nguoi Viet:
- Read files 16, 19, 20 and `nguoiviet.muonnoi.org/README.md` first.
- Then edit only `nguoiviet.muonnoi.org/public`, `nguoiviet.muonnoi.org/docs` and the related launch QA files.

Cuoc Song:
- Read `docs/launch/CUOCSONG_MUONNOI_SOURCE_AUDIT_2026-05-13.md` first.
- Then read `docs/launch/CUOCSONG_MUONNOI_MASTER_PLAN_2026-05-13.md`.
- Then read `docs/launch/CUOCSONG_MUONNOI_PUBLIC_SITE_CONTENT_MAP_2026-05-13.md`.
- Then read `docs/launch/CUOCSONG_MUONNOI_DEV_HANDOFF_2026-05-13.md`.
- Then read `docs/launch/CUOCSONG_MUONNOI_QA_AND_RELEASE_CHECKLIST_2026-05-13.md`.
- Then read `docs/launch/CUOCSONG_MUONNOI_TEAM_EXECUTION_AND_AUTOMATION_PLAN_2026-05-13.md`.
- Implementation workers must follow `docs/superpowers/plans/2026-05-13-cuoc-song-muon-noi-subdomain.md`.
- Do not create DNS, Cloudflare custom domains or homepage CTAs for `cuocsong.muonnoi.org` until the QA checklist and DNS matrix both move it out of `DO_NOT_LINK_PRIMARY`.

## Day-1 rule

No team starts coding from memory or chat notes. Every Sprint 0 task must reference one of the files above.

Brand rule:
- No team edits public copy, logo, language labels, subdomain naming or store text before reading files 3-8.

## Payment and email gate

No team starts public expansion work until payment and email operations are marked `PAYMENT_EMAIL_REAL_OPERATION_PASS` in the master plan.
The closeout checklist is `qa/release-gates/MUONNOI_PAYMENT_EMAIL_PRODUCTION_GATE_CHECKLIST_2026-05-12.md`.

Payment/email support files:
- `docs/api/MUONNOI_PAYMENT_API_CONTRACT_V1.md`
- `docs/api/MUONNOI_EMAIL_API_CONTRACT_V1.md`
- `docs/platform/MUONNOI_API_DEPLOYMENT_EVIDENCE_TEMPLATE_2026-05-12.md`
- `qa/release-gates/MUONNOI_PAYMENT_EMAIL_TEST_EVIDENCE_TEMPLATE_2026-05-12.md`
- `qa/release-gates/MUONNOI_EVIDENCE_REDACTION_GUIDELINES_2026-05-12.md`

Verification scripts:
- `scripts/verify-payment-email-gate.sh`
- `scripts/recheck-dns-body-parity.sh`
- `scripts/validate-subdomain-sources.sh`
- `scripts/audit-routes.sh`

## Live progress update 2026-05-12
DONE:
- Public launch routes implemented and deployed:
`/about/`, `/manifesto/`, `/press/`, `/newsletter/`.
- Deployment:
`https://d4c10a26.muonnoi.pages.dev`
- Brandpro gate applied to docs and live public tokens.
- DNS/custom-domain matrix locked with Cloudflare Pages, DNS and HTTPS evidence.
- Payment/email production gate checklist created for API + Platform + QA.
- Production deploy completed on Cloudflare Pages project `muonnoi`:
`https://95e0ea23.muonnoi.pages.dev`
- Payment/email support contracts, evidence templates, redaction guide and verification scripts created.
- DNS/body parity recheck passed on `https://www.muonnoi.org/` with header `200`, current brand text in body, and no legacy `Social Operating Space` phrase.
- Public route audit passed with `200` on 27 planned launch routes.
- 11-agent planning batch landed on `main` through commit `fbbfecd`.
- Mobile 5-doc bundle completed and indexed in `docs/launch/MUONNOI_MOBILE_TEAM_HANDOFF_INDEX_2026-05-12.md`.
- Người Việt Muôn Nơi source and docs are now controlled by the coordination plan in `docs/launch/MUONNOI_PARALLEL_DEV_COORDINATION_PLAN_2026-05-12.md`.
- Cuộc Sống Muôn Nơi planning lane created from Drive source audit:
`docs/launch/CUOCSONG_MUONNOI_SOURCE_AUDIT_2026-05-13.md`,
`docs/launch/CUOCSONG_MUONNOI_MASTER_PLAN_2026-05-13.md`,
`docs/launch/CUOCSONG_MUONNOI_DEV_HANDOFF_2026-05-13.md`,
`docs/launch/CUOCSONG_MUONNOI_PUBLIC_SITE_CONTENT_MAP_2026-05-13.md`,
`docs/launch/CUOCSONG_MUONNOI_QA_AND_RELEASE_CHECKLIST_2026-05-13.md`,
`docs/launch/CUOCSONG_MUONNOI_TEAM_EXECUTION_AND_AUTOMATION_PLAN_2026-05-13.md`.

NEED:
- Docs hub publishing synchronization on `docs.muonnoi.org`.
- Production payment/email transaction, webhook, email delivery and rollback evidence.
- Source ownership lock for `ai.muonnoi.org`, `lamviec.muonnoi.org` and every planned public subdomain before those hosts become primary CTAs.
- Commit and maintain `nguoiviet.muonnoi.org` source so Web, SEO, Brand, Legal and Ops can work from the same tree.
- Create approved source for `cuocsong.muonnoi.org` only after the first-sprint content map and claim boundaries are accepted.
- Keep `cuocsong.muonnoi.org` out of primary homepage CTAs until DNS, Cloudflare preview, route QA, SEO and claim-safety gates pass.

NEXT:
1. Platform resolves custom-domain source ownership for `ai.muonnoi.org`, `lamviec.muonnoi.org`, `lqos.muonnoi.org`, `dautu.muonnoi.org`, `duan.muonnoi.org`, `family.muonnoi.org` and `dulich.muonnoi.org`.
2. Docs publish synchronized launch collections.
3. API/Platform close payment-email gate evidence.
4. Người Việt team closes DNS swap, `og.png`, Search Console and Wix redirect gates.
5. Product/Content/Legal review the Cuộc Sống Muôn Nơi source audit and approve the first four claim-safe routes before Web creates source.

Route matrix note:
- Production host validation completed on `2026-05-12 +07` with `200` on launch routes and sitemap core routes.
