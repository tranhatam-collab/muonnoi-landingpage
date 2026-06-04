# MUONNOI PAYMENT API CONTRACT V1

Date: 2026-05-12
Status: `CONTRACT_TEMPLATE_READY`
Gate: `PAYMENT_EMAIL_REAL_OPERATION_PASS`

## Scope
This file defines the required production contract for payment operations before Muonnoi can claim payment readiness or expand paid/public subdomain flows.

No endpoint below authorizes public ROI, guaranteed return, token earning, fundraising, or investment promises.

## Common requirements
- Base URL: `https://api.muonnoi.org`
- Health URL: `GET /api/health`
- All mutations require an `Idempotency-Key` header or `idempotencyKey` field.
- All timestamps use ISO 8601 UTC.
- All logs must redact payment provider ids, tokens, cards, webhook signatures, emails and one-time codes.
- All responses use the common envelope:

```json
{
  "ok": true,
  "data": {},
  "meta": {
    "requestId": "req_01",
    "serverTime": "2026-05-12T00:00:00.000Z"
  }
}
```

Error envelope:

```json
{
  "ok": false,
  "error": {
    "code": "PAYMENT_CREATE_FAILED",
    "message": "Không thể tạo giao dịch lúc này.",
    "retryable": true
  },
  "meta": {
    "requestId": "req_01"
  }
}
```

## POST /api/payment/create-intent
Purpose: create a payment intent or provider-equivalent pending payment object.

Headers:
- `Content-Type: application/json`
- `Origin: https://www.muonnoi.org` or approved origin
- `Idempotency-Key: <uuid>`

Request:

```json
{
  "amount": 10000,
  "currency": "USD",
  "purpose": "membership",
  "returnUrl": "https://www.muonnoi.org/status/"
}
```

Success:

```json
{
  "ok": true,
  "data": {
    "paymentId": "pay_redacted",
    "provider": "provider_redacted",
    "status": "pending",
    "clientAction": {
      "type": "redirect",
      "url": "https://provider.example/redacted"
    }
  },
  "meta": {
    "requestId": "req_01",
    "serverTime": "2026-05-12T00:00:00.000Z"
  }
}
```

Required checks:
- duplicate idempotency key returns the same logical payment result.
- invalid amount returns `PAYMENT_INVALID_AMOUNT`.
- unapproved origin is blocked by CORS policy.

## POST /api/payment/confirm
Purpose: confirm provider-side payment state after redirect or provider callback.

Request:

```json
{
  "paymentId": "pay_redacted",
  "idempotencyKey": "idem_confirm_01"
}
```

Success:

```json
{
  "ok": true,
  "data": {
    "paymentId": "pay_redacted",
    "status": "succeeded",
    "receiptId": "rcpt_redacted"
  },
  "meta": {
    "requestId": "req_02",
    "serverTime": "2026-05-12T00:00:10.000Z"
  }
}
```

## POST /api/webhook/payment
Purpose: receive payment provider webhook events.

Headers:
- provider signature header
- provider timestamp header when available

Rules:
- valid signature required.
- replayed webhook rejected or idempotently ignored.
- unknown event type logged safely and returns accepted/ignored according to provider retry semantics.
- raw payload never stored with secrets exposed.

Expected events:
- `payment.created`
- `payment.succeeded`
- `payment.failed`
- `payment.refunded`

## GET /api/payment/{paymentId}
Purpose: check current payment status.

Success:

```json
{
  "ok": true,
  "data": {
    "paymentId": "pay_redacted",
    "status": "succeeded",
    "receiptId": "rcpt_redacted"
  },
  "meta": {
    "requestId": "req_03",
    "serverTime": "2026-05-12T00:00:20.000Z"
  }
}
```

## GET /api/receipt/{receiptId}
Purpose: fetch redacted receipt status.

Success:

```json
{
  "ok": true,
  "data": {
    "receiptId": "rcpt_redacted",
    "paymentId": "pay_redacted",
    "status": "issued",
    "emailDeliveryStatus": "queued"
  },
  "meta": {
    "requestId": "req_04",
    "serverTime": "2026-05-12T00:00:30.000Z"
  }
}
```

## Evidence required before PASS
- health route output.
- create intent transcript.
- duplicate idempotency transcript.
- webhook valid signature transcript.
- webhook invalid signature transcript.
- webhook replay transcript.
- status/receipt transcript.
- CORS approved and unapproved origin transcripts.
- provider dashboard evidence with sensitive data redacted.

## Current state
`CONTRACT_READY_FOR_API_IMPLEMENTATION`
`PRODUCTION_EVIDENCE_NOT_ATTACHED`
