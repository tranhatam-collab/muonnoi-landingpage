# CUOC SONG MUONNOI TEAM 9 API OPS GATE NOTES · 2026-05-13

## Status

`BLOCKED_BY_PAYMENT_EMAIL_PROOF_GATES`

This is a planning-only contract note. It does not approve deployment and does not unlock payment, email or proof features.

## Scope

Team 9 owns the later integration phase for:

- Intake routing from Cuoc Song pages to app surfaces.
- Receipt and proof event handoff.
- Email follow-up and audit trace.
- Host or mentor onboarding integration points.

This file defines what can be prepared now and what must stay blocked.

## Allowed Now

- Read and align with:
  - `docs/launch/CUOCSONG_MUONNOI_MASTER_PLAN_2026-05-13.md`
  - `docs/launch/CUOCSONG_MUONNOI_PUBLIC_SITE_CONTENT_MAP_2026-05-13.md`
  - `docs/launch/CUOCSONG_MUONNOI_QA_AND_RELEASE_CHECKLIST_2026-05-13.md`
  - `docs/launch/MUONNOI_SUBDOMAIN_DNS_CUSTOM_DOMAIN_MATRIX_2026-05-12.md`
- Prepare API/Ops contract notes only.
- Define placeholder event names and payload shape in docs.
- Define evidence expectations for unblocking.

## Not Allowed Now

- No payment form.
- No donation or investment form.
- No email capture form.
- No production email send flow.
- No proof receipt claim in public UI.
- No release claim that Team 9 is production-ready.

## Blocking Gates

| Gate | Required evidence | Current |
|---|---|---|
| Payment gate | Real payment production readiness evidence from owner lane | `BLOCKED` |
| Email gate | Verified sending domain, mailbox and delivery/readback evidence | `BLOCKED` |
| Proof gate | Receipt/proof event integrity and readback evidence | `BLOCKED` |

Team 9 may start implementation only when all three gates are marked pass with dated evidence.

## Current True State

As of `2026-05-13 07:40 ICT`:

- `cuocsong.muonnoi.org` remains a local-only source lane with no public intake form.
- Payment/email production gate is still blocked in the wider Muon Noi system.
- No consent-approved intake field set is available for Team 9 to wire into production.
- Team 9 must stay in contract-note mode only.
- Gate 5 now passes for the implemented route set, which now includes `/da-lat/`, and Team 7 is the active next owner for preview-prep documentation only.
- Gate 6 now has a recorded accessibility baseline but still remains `NOT_PASS` because keyboard traversal, contrast proof, and mobile text-overlap evidence are missing.
- Team 9 still remains off the active critical path because preview, DNS, accessibility, payment, email and proof evidence are all still incomplete.

## Next Owner And Unblock Order

1. `API/Platform payment-email owner lane`
   - must produce real deployment and provider evidence
2. `Team 5 legal/trust`
   - must sign off consent boundaries and allowed intake fields
3. `Team 8 QA`
   - must add Team 9 verification commands and pass/fail evidence to release checklists

Until that order is satisfied, Team 9 remains `BLOCKED`.

## Contract Draft (Non-Deployed)

### Intake contract

- Goal: capture non-sensitive intent and route to the correct Muon Noi module.
- Required fields (draft): route, language, intent type, timestamp.
- Sensitive fields are excluded until legal and trust gates explicitly allow collection.

### Receipt/proof contract

- Goal: map approved user actions to a future proof record.
- Required fields (draft): actor id reference, action id, source route, created at.
- No reward, payment or entitlement claim is allowed in this phase.

### Email follow-up contract

- Goal: send approved follow-up templates after gate pass.
- Required fields (draft): template id, locale, recipient reference, audit id.
- No real send action until email gate is pass.

## Unblock Checklist

- [ ] Payment gate pass evidence is linked from owner lane.
- [ ] Email domain and mailbox evidence is verified and linked.
- [ ] Proof/receipt readback evidence is verified and linked.
- [ ] Legal/trust signs off on intake fields and consent text.
- [ ] QA adds Team 9 checks into release checklist with command evidence.

## Handoff Rule

When the three gates pass, Team 1 updates this file status to `READY_FOR_IMPLEMENTATION` and assigns Team 9 one scoped build task per run.
