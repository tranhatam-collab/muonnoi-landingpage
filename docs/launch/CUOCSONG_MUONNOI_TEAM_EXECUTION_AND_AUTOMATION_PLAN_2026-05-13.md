# CUOC SONG MUONNOI TEAM EXECUTION AND AUTOMATION PLAN · 2026-05-13

## Verdict

TEAM_EXECUTION_READY_WITH_SINGLE_AUTOMATION

This file assigns the Cuộc Sống Muôn Nơi work across teams and defines the automatic dev loop.

The automation must be a single coordinator loop. Do not create many background model jobs. The loop picks the safest highest-priority task, updates evidence, commits scoped work and reports progress.

## Source Path Decision

Decision: `cuocsong.muonnoi.org/`

Reason:
- The user asked for `cuocsong.muonnoi.org`.
- A standalone source keeps the living-practice layer separate from the root shell.
- The root homepage can link to it only after DNS and QA pass.
- It avoids mixing claim-sensitive Cuộc Sống content into `www.muonnoi.org` before legal/trust review.

## Team Map

| Team | Role | Primary ownership | Can work now | Release impact |
|---|---|---|---:|---|
| Team 1 | Admin, coordination, release evidence | This file, master status, read order, DNS matrix, automation reports | Yes | Blocks bad coordination |
| Team 2 | Product and content architecture | Route priority, content map, page acceptance criteria | Yes | Blocks content source |
| Team 3 | Content writing | Vietnamese and English page drafts, internal link logic | Yes | Blocks web source |
| Team 4 | Brand and bilingual QA | Brandpro voice, names, language labels, UI wording | Yes | Blocks brand gate |
| Team 5 | Legal, trust and claim safety | Disclaimers, banned claims, partner/regulated-topic boundary | Yes | Blocks public release |
| Team 6 | Web implementation | `cuocsong.muonnoi.org/public/*`, sitemap, headers, redirects | Yes (no deploy/DNS actions before Team 4/5/8 gates) | Blocks preview |
| Team 7 | Platform and DNS | Cloudflare Pages, preview deploy, custom domain, DNS evidence | After source and preview QA | Blocks live host |
| Team 8 | QA, SEO and evidence | Route smoke, metadata, accessibility, claim scan, release checklist | Prep now, execute after source | Blocks homepage link |
| Team 9 | API/Ops later phase | Intake, email receipt, proof/host integration | No | Blocked by payment/email/proof gates |

## Team 1 Admin Duties

Team 1 owns coordination and reporting.

Required every automated run:
- Read current git status.
- Read the Cuộc Sống source audit, master plan, content map, handoff and QA checklist.
- Read the parallel dev coordination plan and DNS matrix.
- Pick one highest-priority safe task.
- Do not touch payment, email, DNS or custom domain unless the relevant evidence gate is ready.
- Commit and push only scoped files.
- Update this file or the QA checklist only when facts changed.
- Report: done, blocked, next owner, next safe task.

Team 1 must not claim:
- `RELEASE_READY`
- `WEB_READY`
- `LIVE_LINK_ALLOWED`
- `PAYMENT_EMAIL_REAL_OPERATION_PASS`

unless the evidence files show it.

## Current Active Handoff

As of `2026-05-13 07:45 ICT`:

- Current next owner: `Team 7`
- Current highest-priority safe task: keep preview and DNS prep docs aligned to the implemented route set while Gate 6 accessibility remains explicitly open and preview remains blocked from any claim or deployment action
- Current downstream blocker: preview deploy and DNS attach still remain blocked because Gate 6 accessibility has a recorded baseline but is still `NOT_PASS`; no custom-domain action is allowed yet
- Current hard blocker: payment, email and proof gates remain closed for Team 9

## Parallel Work Allocation

### Team 2 — Product and Content Architecture

Files:
- `docs/launch/CUOCSONG_MUONNOI_MASTER_PLAN_2026-05-13.md`
- `docs/launch/CUOCSONG_MUONNOI_PUBLIC_SITE_CONTENT_MAP_2026-05-13.md`

Tasks:
1. Confirm first sprint pages:
   - `/`
   - `/gioi-thieu/`
   - `/song-o-nhieu-noi/`
   - `/cho-va-nhan/`
   - `/cong-dong/`
   - `/ho-tro/`
   - `/cau-hoi/`
   - `/legal/disclaimer/`
   - `/legal/privacy/`
   - `/legal/terms/`
2. Confirm CTA rule:
   - No payment.
   - No donation.
   - No investment.
   - No "Đăng ký ngay" before email/contact gate.
3. Confirm subdomain source path:
   - `cuocsong.muonnoi.org/`.

Output:
- Route acceptance criteria for Team 3 and Team 6.

### Team 3 — Content Writing

Files after source starts:
- `cuocsong.muonnoi.org/public/index.html`
- `cuocsong.muonnoi.org/public/gioi-thieu/index.html`
- `cuocsong.muonnoi.org/public/song-o-nhieu-noi/index.html`
- `cuocsong.muonnoi.org/public/cho-va-nhan/index.html`
- `cuocsong.muonnoi.org/public/legal/disclaimer/index.html`

Tasks:
1. Write Vietnamese content first.
2. Write English content as full copy, not summary.
3. Use language labels `Tiếng Việt` and `English`.
4. Preserve internal links from the content map.
5. Avoid old Drive copy, emojis and hashtag blocks.

Output:
- Claim-safe first-sprint route copy.

### Team 4 — Brand and Bilingual QA

Files:
- `docs/brand/*`
- future `cuocsong.muonnoi.org/public/assets/ui.css`

Tasks:
1. Apply Muôn Nơi naming rules.
2. Check Vietnamese diacritics.
3. Check no `VI` or `EN` shorthand labels.
4. Check the module is presented as `Cuộc Sống Muôn Nơi`, not as a separate brand.
5. Check tone is useful, grounded and non-hype.

Output:
- Brand gate note in the QA checklist.

### Team 5 — Legal, Trust and Claim Safety

Files:
- `docs/launch/CUOCSONG_MUONNOI_SOURCE_AUDIT_2026-05-13.md`
- `docs/launch/CUOCSONG_MUONNOI_QA_AND_RELEASE_CHECKLIST_2026-05-13.md`
- `docs/launch/CUOCSONG_MUONNOI_TEAM5_LEGAL_TRUST_REVIEW_2026-05-13.md`
- future legal pages.

Tasks:
1. Review banned claim list.
2. Approve disclaimer wording.
3. Block old claims about visa, legal service, finance, medical, psychology, free accommodation, fixed price, fundraising and guaranteed outcomes.
4. Approve safe wording for Đà Lạt, Nhà Chung and support directory.

Output:
- Legal/trust pass or blocker note in `docs/launch/CUOCSONG_MUONNOI_TEAM5_LEGAL_TRUST_REVIEW_2026-05-13.md`.

### Team 6 — Web Implementation

Files:
- `cuocsong.muonnoi.org/README.md`
- `cuocsong.muonnoi.org/public/*`
- `cuocsong.muonnoi.org/wrangler.toml`

Tasks:
1. Create source tree.
2. Build first-sprint routes.
3. Add `sitemap.xml`, `robots.txt`, `_headers`.
4. Add Brandpro-aligned CSS.
5. Add internal links and metadata.
6. Run local route and text checks.

Output:
- Static source ready for preview deploy.

### Team 7 — Platform and DNS

Files:
- `docs/launch/MUONNOI_SUBDOMAIN_DNS_CUSTOM_DOMAIN_MATRIX_2026-05-12.md`
- future `cuocsong.muonnoi.org/wrangler.toml`

Tasks:
1. Create or connect Cloudflare Pages project after source QA.
2. Deploy preview.
3. Record preview URL.
4. Attach `cuocsong.muonnoi.org` only after preview passes.
5. Record DNS, HTTPS and body parity evidence.

Output:
- Matrix state moves from `PLANNED_NOT_CONFIGURED` to preview pass, then live-link allowed only with evidence.

### Team 8 — QA, SEO and Evidence

Files:
- `docs/launch/CUOCSONG_MUONNOI_QA_AND_RELEASE_CHECKLIST_2026-05-13.md`

Tasks:
1. Run claim scan.
2. Run route smoke.
3. Run internal link audit.
4. Check H1, title, description, canonical, OG and language links.
5. Check accessibility basics.
6. Update checklist with actual command evidence.

Output:
- Release checklist with pass/fail evidence.

### Team 9 — API/Ops Later Phase

Status: blocked.

Files:
- `docs/launch/CUOCSONG_MUONNOI_TEAM9_API_OPS_GATE_NOTES_2026-05-13.md`

Blocked by:
- Payment/email gate.
- Email/contact evidence.
- Proof and receipt readiness.

Allowed now:
- Read planning docs.
- Prepare non-deployed contract notes only.

Not allowed now:
- Payment form.
- Donation form.
- Investment form.
- Email capture form.
- Proof receipt claim.

Output:
- Team 9 contract/gate note stays updated until the three gates pass.

## Automation Loop

Cadence: every 5 minutes.

Reason:
- This matches the requested team staggering.
- It keeps one active coordinator instead of many simultaneous background jobs.
- It reduces idle gaps while still avoiding the RAM cost of multiple independent automations.

## Team Slot Rotation

One automation run happens every 5 minutes. Each run focuses on one team slot.

| Minute slot | Team focus | Expected action |
|---|---|---|
| `:00` | Team 1 | Admin coordination, status sync, blocker routing |
| `:05` | Team 2 | Product and route-priority confirmation |
| `:10` | Team 3 | Content writing and copy refinement |
| `:15` | Team 4 | Brand and bilingual QA |
| `:20` | Team 5 | Legal/trust claim review |
| `:25` | Team 6 | Web implementation |
| `:30` | Team 7 | Platform, preview and DNS evidence prep |
| `:35` | Team 8 | QA, SEO and release evidence |
| `:40` | Team 9 | API/Ops gate notes only until unblocked |
| `:45` | Team 1 | Cross-team unblock and checklist sync |
| `:50` | Team 1 | Highest-priority safe task regardless of team |
| `:55` | Team 1 | Final status sync before the next hourly cycle |

Loop input files:
- `docs/launch/CUOCSONG_MUONNOI_SOURCE_AUDIT_2026-05-13.md`
- `docs/launch/CUOCSONG_MUONNOI_MASTER_PLAN_2026-05-13.md`
- `docs/launch/CUOCSONG_MUONNOI_PUBLIC_SITE_CONTENT_MAP_2026-05-13.md`
- `docs/launch/CUOCSONG_MUONNOI_DEV_HANDOFF_2026-05-13.md`
- `docs/launch/CUOCSONG_MUONNOI_QA_AND_RELEASE_CHECKLIST_2026-05-13.md`
- `docs/launch/CUOCSONG_AUTOMATION_RUN_LOG_2026-05-13.md`
- `docs/launch/CUOCSONG_MUONNOI_TEAM5_LEGAL_TRUST_REVIEW_2026-05-13.md`
- `docs/launch/CUOCSONG_MUONNOI_TEAM9_API_OPS_GATE_NOTES_2026-05-13.md`
- `docs/launch/CUOCSONG_MUONNOI_TEAM_EXECUTION_AND_AUTOMATION_PLAN_2026-05-13.md`
- `docs/launch/MUONNOI_PARALLEL_DEV_COORDINATION_PLAN_2026-05-12.md`
- `docs/launch/MUONNOI_SUBDOMAIN_DNS_CUSTOM_DOMAIN_MATRIX_2026-05-12.md`

Loop decision order:
1. Resolve the current run's team slot from the minute bucket.
2. Execute that team's highest-priority safe task first.
3. If the slot team is blocked, Team 1 routes the blocker and uses the run for the next safest cross-team task.
4. If source path is not locked, lock it.
5. If first-sprint content is not written, write or refine the next page.
6. If legal disclaimer is missing, write it before regulated-topic pages.
7. If source tree is missing, create source.
8. If source exists but QA is missing, run local QA and update checklist.
9. If local QA passes and no preview exists, deploy preview.

## Run visibility rule

Each automation run must append or update a factual entry in:

- `docs/launch/CUOCSONG_AUTOMATION_RUN_LOG_2026-05-13.md`

The log must include:
- ICT timestamp
- slot bucket
- effective team owner
- `DONE` or `BLOCKED`
- exact evidence such as commit id, checklist section or verification command
10. If preview passes and DNS is approved, attach custom domain.
11. If DNS/live checks pass, update homepage and DNS matrix.
12. If all gates pass, pause the automation and report `CUOCSONG_MUONNOI_COMPLETE`.

Hard stop rules:
- Do not deploy if claim scan fails.
- Do not attach DNS before preview QA passes.
- Do not add root homepage CTA before DNS matrix says `LIVE_LINK_ALLOWED`.
- Do not create payment/email/contact forms until payment/email gate passes.
- Do not stage unrelated untracked clone folders.

## Current Run State

Status: `AUTOMATION_ACTIVE`

Automation:
- ID: `muonnoi-cuocsong-auto-dev-30m`
- Type: single heartbeat coordinator loop
- Cadence: every 5 minutes
- Owner: Team 1 admin

Done:
- Team map created.
- Source path locked as `cuocsong.muonnoi.org/`.
- Single automation loop defined and activated.
- Team 5 policy baseline reviewed and recorded in `docs/launch/CUOCSONG_MUONNOI_TEAM5_LEGAL_TRUST_REVIEW_2026-05-13.md`.
- Automation prompt aligned to Team 6 web lane (`muonnoi-cuocsong-auto-dev-30m`).
- Team 6 created static source tree in `cuocsong.muonnoi.org/` with first-sprint routes and legal baseline pages.
- Local route smoke passed for `/`, `/gioi-thieu/`, `/song-o-nhieu-noi/`, `/cho-va-nhan/`, `/legal/disclaimer/`, `/legal/privacy/`, `/legal/terms/`.

Next safe task:
- Team 4 and Team 5 run route-level brand/legal signoff on implemented pages, then Team 8 executes internal-link and metadata audits before preview deploy gating.
