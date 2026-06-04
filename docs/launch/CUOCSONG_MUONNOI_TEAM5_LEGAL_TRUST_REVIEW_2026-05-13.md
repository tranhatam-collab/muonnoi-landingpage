# CUOC SONG MUONNOI TEAM 5 LEGAL TRUST REVIEW · 2026-05-13

## Verdict

TEAM5_IMPLEMENTED_ROUTE_REVIEW_DONE_RELEASE_PENDING

Team 5 completed the planning-layer legal and trust review and then reviewed the currently implemented routes in `cuocsong.muonnoi.org/public`.

This is not a release pass. Public release remains blocked because preview, DNS and full route coverage are still incomplete.

## Scope Reviewed

- `docs/launch/CUOCSONG_MUONNOI_SOURCE_AUDIT_2026-05-13.md`
- `docs/launch/CUOCSONG_MUONNOI_MASTER_PLAN_2026-05-13.md`
- `docs/launch/CUOCSONG_MUONNOI_PUBLIC_SITE_CONTENT_MAP_2026-05-13.md`
- `docs/launch/CUOCSONG_MUONNOI_DEV_HANDOFF_2026-05-13.md`
- `docs/launch/CUOCSONG_MUONNOI_QA_AND_RELEASE_CHECKLIST_2026-05-13.md`
- `docs/launch/CUOCSONG_MUONNOI_TEAM_EXECUTION_AND_AUTOMATION_PLAN_2026-05-13.md`
- `cuocsong.muonnoi.org/public/index.html`
- `cuocsong.muonnoi.org/public/gioi-thieu/index.html`
- `cuocsong.muonnoi.org/public/song-o-nhieu-noi/index.html`
- `cuocsong.muonnoi.org/public/cho-va-nhan/index.html`
- `cuocsong.muonnoi.org/public/legal/disclaimer/index.html`
- `cuocsong.muonnoi.org/public/legal/privacy/index.html`
- `cuocsong.muonnoi.org/public/legal/terms/index.html`

## Team 5 Decisions

### 1) Banned claim taxonomy locked

Blocked for public copy unless separately verified and approved:

- Visa, immigration or legal-process services.
- Financial, banking, loan, fundraising or investment claims.
- Medical, psychology, therapy, crisis or emergency-support claims.
- Free accommodation, free meals or guaranteed support claims.
- Fixed-price, donation, fundraising or investment CTA.
- Guaranteed outcomes (job, relocation, settlement, scholarship, support).

### 2) Disclaimer wording baseline approved

Required direction for `/legal/disclaimer/`:

- Muôn Nơi and Cuộc Sống Muôn Nơi provide orientation, community learning and verified-directory references.
- They do not replace licensed legal, immigration, financial, medical, mental-health or emergency services.
- Public content is informational and readiness-oriented, not professional advice.
- Partner and directory references must be marked as planned, under review or verified, with no guaranteed outcomes.

### 3) Safe wording baseline approved

For Đà Lạt, Nhà Chung and support-directory mentions:

- Present as pilot context, community practice and verified-directory navigation.
- Do not promise accommodation, legal outcomes, visas, earnings or investment returns.
- Keep CTA non-transactional until payment/email/proof gates pass.

## Evidence Snapshot

Planning-doc scan command executed:

```bash
rg -n "Đăng ký ngay|donation|fundraising|đầu tư|investment|visa|immigration|pháp lý|medical|y tế|therapy|tâm lý|free accommodation|miễn phí ăn ở|guaranteed" docs/launch/CUOCSONG_MUONNOI_*_2026-05-13.md
```

Observed state:

- Risk keywords appear in policy and warning contexts, not as release-ready CTA claims.
- Implemented routes explicitly deny legal, immigration, financial, medical, therapy, free-accommodation and guaranteed-outcome promises.
- Implemented routes link users to `/legal/disclaimer/` before or alongside claim-sensitive guidance.

## Route-Level Review On Implemented Pages

Implemented routes reviewed:

- `/`
- `/gioi-thieu/`
- `/song-o-nhieu-noi/`
- `/cho-va-nhan/`
- `/cong-dong/`
- `/ho-tro/`
- `/da-lat/`
- `/cau-hoi/`
- `/legal/disclaimer/`
- `/legal/privacy/`
- `/legal/terms/`

Route-level findings:

- No transaction CTA found.
- No donation, fundraising, fixed-price or investment solicitation found.
- No visa, immigration, legal, financial, medical or therapy service claim found as an offered service.
- No free accommodation or guaranteed support claim found.
- Disclaimer path is present in the implemented navigation or footer paths.

Still pending:

- Planned routes not yet implemented: `/lam-viec/`, `/hoc-tap/`, `/nha-chung/`, `/lien-he/`.
- Preview parity, DNS and live-host review.

Incremental note on `2026-05-13 02:20 ICT`:

- Re-scan of the implemented route set after recent copy edits still shows risk keywords only in disclaimer or prohibition contexts.
- `/cong-dong/` is now part of the reviewed implemented route set.

Incremental note on `2026-05-13 03:20 ICT`:

- `/ho-tro/` is part of the reviewed implemented route set and remains disclaimer-first, non-transactional, and free of regulated-service promises.
- `/gioi-thieu/` now includes `/ho-tro/` in its internal-link block; the added route remains within approved support-boundary framing and does not introduce contact, payment, or guaranteed-outcome claims.

Incremental note on `2026-05-13 07:20 ICT`:

- `/da-lat/` is now part of the reviewed implemented route set and remains pilot-context only, with no accommodation, relocation, investment, or guaranteed-support claim.
- `/cau-hoi/` is also part of the reviewed implemented route set and continues to deflect regulated assumptions instead of opening intake, payment, or service promises.
- The implemented route set continues to route claim-sensitive guidance through `/legal/disclaimer/` and keeps remaining missing local targets limited to planned routes only.

## Gate Mapping

| Gate | Team 5 status |
|---|---|
| Gate 2 (content and claim safety) | `IMPLEMENTED_ROUTES_REVIEWED_PENDING_REMAINING_ROUTE_COVERAGE` |
| Gate 4 (route smoke) | `PARTIAL_ROUTE_SET_EXISTS_PENDING_TEAM8_EVIDENCE` |
| Gate 7 (preview claim parity) | `BLOCKED_BY_MISSING_PREVIEW_DEPLOY` |
| Release decision | Keep `DO_NOT_LINK_PRIMARY` |

## Next Owner

- Team 4: complete route-level brand and bilingual QA on the implemented routes.
- Team 6: finish the remaining planned routes before preview.
- Team 8: run internal-link, metadata and route-smoke evidence on the implemented route set.
