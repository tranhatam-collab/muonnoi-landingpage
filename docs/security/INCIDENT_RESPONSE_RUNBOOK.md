# INCIDENT RESPONSE RUNBOOK · MUONNOI 2026

## Severity
P0:
- private data exposure
- payment/email broken in production
- auth/session broken
- proof data corruption
- admin compromise
- production rollback unavailable

P1:
- API partial outage
- wrong notification or email content
- live public claim error
- route matrix regression
- upload queue failure

P2:
- copy issue
- non-critical SEO issue
- visual defect

## Response flow
1. Name incident commander.
2. Freeze deploys on affected surface.
3. Preserve logs.
4. Identify affected users/routes/data.
5. Apply rollback or mitigation.
6. Verify live behavior.
7. Write incident note.
8. Add prevention task.

## Required incident note
- time started
- surface affected
- root cause if known
- user impact
- mitigation
- rollback/deploy id
- evidence links
- follow-up owner

## Push disable rule
If notifications or email are wrong, disable sending before debugging copy.

## Payment disable rule
If payment state is inconsistent, pause checkout or paid flow before retrying provider actions.
