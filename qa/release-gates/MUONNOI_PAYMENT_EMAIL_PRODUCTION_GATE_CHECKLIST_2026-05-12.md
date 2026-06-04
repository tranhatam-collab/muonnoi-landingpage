# MUONNOI PAYMENT AND EMAIL PRODUCTION GATE CHECKLIST · 2026-05-12

## Gate name
`PAYMENT_EMAIL_REAL_OPERATION_PASS`

## Scope
This checklist is the shared closeout gate for API, Platform and QA before Muonnoi expands public subdomain CTAs, paid flows, receipts, host payments, investment information capture or store submission copy.

This gate does not authorize financial promises. It only proves the operational payment and email plumbing works with production configuration, rollback and evidence.

## Current true state
`BLOCKED_BY_PRODUCTION_EVIDENCE`

Known evidence from this run:
- `https://api.muonnoi.org/api/health` returned `200`.
- `https://api.muonnoi.org/health` returned `404`; the valid health path is `/api/health`.
- Cloudflare Worker route exists in `ai.muonnoi.org/workers/api/wrangler.toml` with `pattern = "api.muonnoi.org"` and `custom_domain = true`.
- Payment and email API contract templates exist in `docs/api/`.
- Platform and QA evidence templates exist, but the real evidence files without `TEMPLATE` in the filename are not attached yet.
- `scripts/verify-payment-email-gate.sh` returned `BLOCKED` because real production evidence is incomplete.
- `scripts/recheck-dns-body-parity.sh` passed on `https://www.muonnoi.org/`.
- `scripts/audit-routes.sh` passed on the planned public launch routes.
- Production payment/email transaction evidence is not attached in this repo.
- Rollback evidence is not attached in this repo.

## API checklist
Required before API can mark `PASS`:
- [ ] Production API health route returns `200` on `https://api.muonnoi.org/api/health`.
- [ ] Payment create/intent endpoint contract is documented.
- [ ] Payment webhook endpoint contract is documented.
- [ ] Email send endpoint contract is documented.
- [ ] Receipt/status endpoint contract is documented.
- [ ] Every payment/email mutation requires `idempotencyKey`.
- [ ] Webhook signature verification is enabled.
- [ ] Webhook replay protection is enabled.
- [ ] Request and response logs redact secrets, tokens, payment IDs where required and email one-time codes.
- [ ] CORS allowlist includes only approved production origins.
- [ ] Failure responses use safe machine codes and do not leak provider details.
- [ ] D1 or primary database has the required migration applied for production data.
- [ ] Rate limiting exists per IP, user and action for auth, payment and email endpoints.

API evidence to attach:
- command output or screenshot for health route.
- endpoint contract links.
- `docs/api/MUONNOI_PAYMENT_API_CONTRACT_V1.md`.
- `docs/api/MUONNOI_EMAIL_API_CONTRACT_V1.md`.
- successful test payment or provider test-mode equivalent if real money is not approved yet.
- webhook delivery log with sensitive fields redacted.
- email delivery log with sensitive fields redacted.
- database migration status.

## Platform checklist
Required before Platform can mark `PASS`:
- [ ] Cloudflare Worker deployed from clean source.
- [ ] `api.muonnoi.org` custom-domain/route ownership confirmed.
- [ ] Production secrets are set through platform secret storage, not committed to repo.
- [ ] Payment provider production or approved test-mode keys are present in the correct environment.
- [ ] Email provider production or approved sandbox keys are present in the correct environment.
- [ ] Rollback command and previous deployment id are documented.
- [ ] DNS/custom-domain matrix is current.
- [ ] Observability target exists for API errors.
- [ ] Alert recipient or incident channel is defined.
- [ ] Provider dashboards are accessible to the release owner.

Platform evidence to attach:
- Worker deploy id and timestamp.
- `wrangler` route/custom-domain evidence.
- `docs/platform/MUONNOI_API_DEPLOYMENT_EVIDENCE_2026-05-12.md`.
- redacted secret list or provider environment screenshot.
- rollback drill note or previous deployment id.
- monitor/alert link.

## QA checklist
Required before QA can mark `PASS`:
- [ ] Happy path: payment event creates expected receipt/status.
- [ ] Happy path: email sends to allowed recipient.
- [ ] Retry path: duplicate idempotency key does not double charge, double receipt or double email.
- [ ] Failure path: provider failure returns safe retryable/non-retryable state.
- [ ] Webhook path: valid webhook accepted.
- [ ] Webhook abuse path: invalid signature rejected.
- [ ] CORS path: approved origins pass.
- [ ] CORS abuse path: unapproved origins fail.
- [ ] Rate limit path: repeated auth/payment/email requests are throttled.
- [ ] Rollback path: release owner can return to prior deploy.
- [ ] Audit path: sensitive events are logged without leaking secrets.

QA evidence to attach:
- route matrix.
- payment/email test transcript with redacted user data.
- `qa/release-gates/MUONNOI_PAYMENT_EMAIL_TEST_EVIDENCE_2026-05-12.md`.
- webhook verification result.
- rate-limit result.
- rollback evidence.

## Blockers
- `CLOUDFLARE_API_TOKEN` may be required for deployment, D1 migration and Worker evidence.
- Payment provider production credentials are not present in repo and must not be committed.
- Email provider production credentials are not present in repo and must not be committed.
- No public page may claim payment/email production readiness until this gate passes.

## Team command
API:
- document payment, webhook, email and receipt/status contracts before implementation changes.
- keep `/api/health` as the canonical health route unless a redirect is intentionally added.

Platform:
- verify Worker custom-domain ownership and deployment id.
- keep secrets in Cloudflare/provider secret stores only.

QA:
- build the payment/email route matrix from this checklist.
- do not mark `PAYMENT_EMAIL_REAL_OPERATION_PASS` without fresh production or approved test-mode evidence.

Scripts:
- run `scripts/verify-payment-email-gate.sh` before requesting sign-off.
- run `scripts/recheck-dns-body-parity.sh` before claiming custom-domain body parity.
- run `scripts/validate-subdomain-sources.sh` before promoting any planned subdomain as a primary CTA.
- run `scripts/audit-routes.sh` before public release reports.

## Hard stop
Do not expand public subdomain CTAs, paid flows, receipt claims, host payment wording, investment lead capture or store submission copy if any API, Platform or QA checklist item above is still unchecked.
