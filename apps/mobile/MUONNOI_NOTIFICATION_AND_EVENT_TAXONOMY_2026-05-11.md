# Muonnoi Notification And Event Taxonomy

Date: 2026-05-11
Scope: Mobile notifications and privacy-safe product events.

## Notification rules

Allowed notification categories:
- auth/security
- quest reminder requested by user
- proof review state
- validation request
- receipt accepted
- complaint/trust update

Forbidden notification categories:
- streak pressure
- shame or fear copy
- speculative earning promise
- engagement bait
- behavioral ad targeting

## Notification event names

- `auth.session_expiring`
- `quest.joined`
- `quest.reminder_due`
- `proof.upload_queued`
- `proof.submitted`
- `proof.ai_review_complete`
- `proof.validation_pending`
- `proof.accepted`
- `proof.rejected`
- `receipt.created`
- `host.validation_requested`
- `trust.complaint_update`

## Event taxonomy

Product events must be privacy-safe and minimal.

Allowed event fields:
- event name
- timestamp
- module
- state
- app version
- platform
- anonymized request id

Forbidden event fields:
- raw message content
- exact GPS unless required for proof and consented
- contact list
- photo/video payload
- behavioral ad identifiers

## Success definitions

Quest success:
- quest joined and completed with accepted proof.

Proof success:
- proof accepted by required validation path.

Notification success:
- user receives a necessary state update, not an engagement trap.

## Failure definitions

- permission denied
- upload failed
- review rejected
- validation expired
- complaint opened
- duplicate mutation conflict

