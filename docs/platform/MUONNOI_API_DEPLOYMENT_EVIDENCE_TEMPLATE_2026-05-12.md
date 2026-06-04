# MUONNOI API DEPLOYMENT EVIDENCE TEMPLATE · 2026-05-12

Status: `TEMPLATE_READY`
Gate: `PAYMENT_EMAIL_REAL_OPERATION_PASS`

## Required deployment evidence
Fill this file only with redacted production or approved test-mode evidence.

## Worker route
- Host: `api.muonnoi.org`
- Health path: `https://api.muonnoi.org/api/health`
- Expected: `200`
- Evidence command:

```bash
curl -I -L --max-time 15 -s https://api.muonnoi.org/api/health
```

## Latest deployment
- Worker name:
- Deployment id:
- Deployment timestamp:
- Source branch:
- Source commit:
- Deployed by:
- Rollback candidate deployment id:

## Secrets
Record names only. Do not record values.

Required secret names:
- payment provider secret name:
- email provider secret name:
- webhook signing secret name:
- session/JWT secret name:

Evidence command:

```bash
wrangler secret list
```

## CORS evidence
Approved origin command:

```bash
curl -I -H "Origin: https://www.muonnoi.org" https://api.muonnoi.org/api/health
```

Unapproved origin command:

```bash
curl -I -H "Origin: https://evil.example" https://api.muonnoi.org/api/health
```

Expected:
- approved origin has allowed CORS behavior.
- unapproved origin is blocked or does not receive approval headers.

## Rollback evidence
- rollback command:
- rollback owner:
- rollback tested at:
- rollback result:

## Current state
`DEPLOYMENT_EVIDENCE_TEMPLATE_READY`
`DEPLOYMENT_EVIDENCE_NOT_ATTACHED`
