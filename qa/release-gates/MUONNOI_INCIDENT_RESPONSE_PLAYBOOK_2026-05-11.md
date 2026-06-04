# Muonnoi Mobile Incident Response Playbook

Date: 2026-05-11
Scope: Mobile/API incident handling.

## Incident severity

P0:
- data exposure
- auth/session compromise
- proof data loss
- wrong user notification
- app unusable for majority of users

P1:
- proof upload degraded
- quest join degraded
- validation delayed
- crash spike
- permission flow broken

P2:
- visual regression
- copy issue
- non-critical notification delay

## Incident roles

Incident lead:
- Platform

Product communication:
- Product

Technical owner:
- API, Mobile or Platform depending on source

Trust owner:
- QA/Trust

## First 30 minutes

1. Confirm severity.
2. Freeze non-essential deploys.
3. Identify affected surface.
4. Disable risky push category if notification-related.
5. Start incident note.
6. Decide rollback, hotfix or mitigation.

## Communication rule

Communicate only verified facts:
- what is affected
- what is not affected
- current mitigation
- next update time

Do not speculate about cause publicly.

## Closeout

Every P0/P1 incident requires:
- timeline
- root cause
- user impact
- fix summary
- prevention task
- release gate update if needed

