# Muonnoi Mobile Release Runbook

Date: 2026-05-11
Scope: Mobile release operations.

## Release owner

Platform owns the release button.
Product owns release approval.
QA owns gate pass/fail.

## Release stages

1. Internal build
2. QA candidate
3. Pilot cohort
4. Staged rollout
5. Public rollout

## Pre-release checklist

- build number updated
- API contract version confirmed
- mobile release gates pass
- privacy/permission copy unchanged or approved
- push notification categories reviewed
- rollback plan ready
- incident channel ready

## Rollback criteria

Rollback or halt rollout if:
- crash-free sessions drop below agreed threshold
- proof upload fails for main path
- auth/session failure is widespread
- notification spam or wrong recipient risk appears
- privacy or permission regression appears
- API degradation breaks main quest flow

## Hotfix lane

Hotfix requires:
- issue id
- severity
- affected version
- fix owner
- test evidence
- release owner approval

## Production notes

- Do not change public claim language during emergency release unless Product approves.
- Do not bypass QA gates for privacy, trust or auth fixes.

