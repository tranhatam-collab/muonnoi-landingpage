# MUONNOI EMAIL API CONTRACT V1

Date: 2026-05-12
Status: `CONTRACT_TEMPLATE_READY`
Gate: `PAYMENT_EMAIL_REAL_OPERATION_PASS`

## Scope
This file defines the required email contract for OTP, receipt, support and operational notifications before Muonnoi can claim email readiness.

## Common requirements
- Base URL: `https://api.muonnoi.org`
- All send mutations require idempotency.
- One-time codes must never be exposed in production logs.
- Email addresses must be redacted in stored evidence.
- Provider message ids must be redacted in public reports.

## POST /api/email/send
Purpose: send an operational email.

Headers:
- `Content-Type: application/json`
- `Origin: https://www.muonnoi.org` or approved origin
- `Idempotency-Key: <uuid>`

Request:

```json
{
  "template": "receipt",
  "to": "redacted@example.com",
  "locale": "vi",
  "data": {
    "receiptId": "rcpt_redacted"
  }
}
```

Success:

```json
{
  "ok": true,
  "data": {
    "emailId": "email_redacted",
    "status": "queued",
    "template": "receipt"
  },
  "meta": {
    "requestId": "req_email_01",
    "serverTime": "2026-05-12T00:00:00.000Z"
  }
}
```

## GET /api/email/{emailId}
Purpose: fetch delivery state.

Success:

```json
{
  "ok": true,
  "data": {
    "emailId": "email_redacted",
    "status": "delivered",
    "template": "receipt",
    "lastEventAt": "2026-05-12T00:01:00.000Z"
  },
  "meta": {
    "requestId": "req_email_02",
    "serverTime": "2026-05-12T00:01:05.000Z"
  }
}
```

## POST /api/webhook/email
Purpose: receive provider delivery events.

Rules:
- provider signature verification required when provider supports it.
- replayed delivery events must be idempotent.
- bounce, complaint and suppression events must be stored for future sends.

Expected events:
- `email.queued`
- `email.delivered`
- `email.bounced`
- `email.complained`
- `email.failed`

## Required templates
- `otp_login`
- `receipt`
- `support_acknowledgement`
- `security_alert`
- `host_application_received`

## Required test paths
- successful receipt email.
- duplicate idempotency returns the same logical email result.
- invalid recipient returns safe validation error.
- provider failure returns safe retryable or non-retryable state.
- webhook valid signature accepted.
- webhook invalid signature rejected.
- delivery status query works.

## Evidence required before PASS
- send transcript.
- duplicate idempotency transcript.
- provider delivery event transcript.
- bounce/failure transcript.
- status query transcript.
- provider dashboard evidence with addresses and message ids redacted.

## Current state
`CONTRACT_READY_FOR_API_IMPLEMENTATION`
`PRODUCTION_EVIDENCE_NOT_ATTACHED`
