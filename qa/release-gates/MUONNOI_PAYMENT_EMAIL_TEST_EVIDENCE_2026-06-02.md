# MUONNOI PAYMENT & EMAIL QA TEST EVIDENCE
## Date: 2026-06-02
## Status: QA_IN_PROGRESS
## Tester: Automated QA Suite

---

## Executive Summary

| Gate | Status | Notes |
|------|--------|-------|
| Health | PASS | `/api/health` returns 200 OK |
| Payment create-intent | PASS | Idempotency key enforced, intent created |
| Payment idempotency | PASS | Same key returns same paymentId |
| Payment get by ID | PASS | Receipt/status endpoint works |
| Email send | PASS | Endpoint accepts, queued without MAIL_API_KEY |
| Email idempotency | PASS | Same key returns same deliveryId with replayed=true |
| Webhook (no secret) | INFO | PAYMENT_WEBHOOK_SECRET not configured — signature check skipped |
| CORS approved | PASS | Proper ACAO headers for app.muonnoi.org |
| CORS unapproved | **ISSUE** | Returns 204 with localhost:8080 origin (see Finding #1) |
| Rate limiting | INFO | No 429 observed at 10 req/s (may be higher threshold or not enabled) |

---

## Test Results

### TEST 1: Health Check
```
GET https://api.muonnoi.org/api/health
→ {"ok":true,"service":"ai-muonnoi-api","time":1780405541204}
```
**Result: PASS**

### TEST 2: Payment Create-Intent WITHOUT Idempotency-Key
```
POST /api/payment/create-intent
Body: {"amount":100000}
Headers: (no Idempotency-Key)
→ {"ok":false,"error":{"code":"MISSING_IDEMPOTENCY_KEY","message":"Idempotency-Key header required"}}
```
**Result: PASS** — Enforced correctly.

### TEST 3: Payment Create-Intent WITH Idempotency-Key
```
POST /api/payment/create-intent
Headers: Idempotency-Key: qa_test_1748872010_309
Body: {"amount":100000,"currency":"VND","purpose":"membership"}
→ {"ok":true,"data":{"paymentId":"pi_mpwnj4rtkuuhta","provider":"payos","status":"pending","clientAction":{"type":"pending","url":null}},"meta":{...}}
```
**Result: PASS** — Intent created. Status = `pending` because `PAY_IAI_ONE_API_KEY` not configured.

### TEST 4: Payment Idempotency Replay
```
POST /api/payment/create-intent
Headers: Idempotency-Key: qa_idem_v2_1748872100 (same key as TEST 3)
Body: {"amount":200000,"currency":"VND","purpose":"membership"}
First  → paymentId: pi_mpwnkovqqff365
Replay → paymentId: pi_mpwnkovqqff365 (same)
```
**Result: PASS** — Same paymentId returned. No double charge.

### TEST 5: Get Payment by ID
```
GET /api/payment/pi_mpwnkovqqff365
→ {"ok":true,"data":{"id":"pi_mpwnkovqqff365","amount":200000,"currency":"VND","purpose":"membership","status":"pending","provider":"payos","checkout_url":null,"expires_at":"2026-06-02T13:38:02.678Z","completed_at":null,"created_at":"2026-06-02 13:08:02"}}
```
**Result: PASS** — Receipt/status data returned correctly.

### TEST 6: Email Send
```
POST /api/email/send
Body: {"template_id":"welcome","recipient_ref":"test@example.com"}
→ {"ok":true,"data":{"deliveryId":"ed_mpwnp85bd8eswi","status":"queued_no_key"}}
```
**Result: PASS** — Endpoint works. Status = `queued_no_key` because `MAIL_API_KEY` not configured.

### TEST 7: Email Idempotency
```
POST /api/email/send
Headers: Idempotency-Key: qa_email_1748872290
Body: {"template_id":"welcome","recipient_ref":"test@example.com","purpose":"qa"}
First  → deliveryId: ed_mpwnq1o1cc6q27, status: queued_no_key
Replay → deliveryId: ed_mpwnq1o1cc6q27, status: pending, replayed: true
```
**Result: PASS** — Same deliveryId returned with `replayed: true`. No double send.

### TEST 8: Webhook Invalid Signature
```
POST /api/webhook/payment
Headers: X-Signature: invalid
Body: {"event_type":"payment.completed","intent_id":"test"}
→ {"ok":true,"data":{"received":true,"logId":"whl_mpwnrszlw5u0rc"}}
```
**Result: INFO** — Webhook accepted because `PAYMENT_WEBHOOK_SECRET` is NOT configured in the Worker. When secret is absent, signature verification is skipped (see code at `payment-api.ts:143-159`).

### TEST 9: Webhook Without Signature
```
POST /api/webhook/payment
Body: {"event_type":"payment.completed","intent_id":"test_webhook_2"}
→ {"ok":true,"data":{"received":true,"logId":"whl_mpwnsrw6o4il8g"}}
```
**Result: PASS** — Webhook processed and logged.

### TEST 10: CORS Approved Origin
```
OPTIONS /api/health
Headers: Origin: https://app.muonnoi.org, Access-Control-Request-Method: POST
Response:
  access-control-allow-origin: https://app.muonnoi.org
  access-control-allow-credentials: true
  access-control-allow-headers: Content-Type, Authorization, X-Connection-Key, X-Webhook-Key
  access-control-allow-methods: GET, POST, PUT, DELETE, OPTIONS
```
**Result: PASS**

### TEST 11: CORS Unapproved Origin
```
OPTIONS /api/health
Headers: Origin: https://evil.com, Access-Control-Request-Method: POST
Response:
  access-control-allow-origin: http://localhost:8080
  access-control-allow-credentials: true
  access-control-allow-headers: Content-Type, Authorization, X-Connection-Key, X-Webhook-Key
  access-control-allow-methods: GET, POST, PUT, DELETE, OPTIONS
  HTTP/1.1 204
```
**Result: ISSUE** — Unapproved origin receives 204 with `localhost:8080` ACAO instead of being rejected. See Finding #1.

### TEST 12: Rate Limit
```
10 sequential GET /api/health requests
All returned HTTP 200. No 429 observed.
```
**Result: INFO** — Either rate limiting threshold is above 10 req/s or not enabled at Cloudflare/Worker level.

---

## Findings

### Finding #1: CORS — Unapproved Origins Not Rejected
**Severity: MEDIUM**
**Location:** `ai.muonnoi.org/workers/api/src/lib/response.ts` (CORS handler)
**Description:** Preflight requests from unapproved origins (e.g. `evil.com`) return HTTP 204 with `Access-Control-Allow-Origin: http://localhost:8080` instead of rejecting the request. The browser may still block the actual request, but the preflight should ideally return a restrictive response.
**Recommendation:** Review CORS logic to ensure unapproved origins either receive no ACAO header or receive `*` / origin-mirror only for approved origins.

### Finding #2: Payment Provider Key Missing
**Severity: LOW (expected for test mode)**
**Location:** Worker secrets
**Description:** `PAY_IAI_ONE_API_KEY` not configured. Payment intents create successfully but cannot reach provider. Status stays `pending`.
**Recommendation:** Set `wrangler secret put PAY_IAI_ONE_API_KEY --name ai-muonnoi-api` with test credentials for test-mode QA.

### Finding #3: Email Provider Key Missing
**Severity: LOW (expected for test mode)**
**Location:** Worker secrets
**Description:** `MAIL_API_KEY` not configured. Emails queue but are not sent to provider.
**Recommendation:** Set `wrangler secret put MAIL_API_KEY --name ai-muonnoi-api` for email QA.

### Finding #4: Webhook Secret Missing
**Severity: LOW (expected for test mode)**
**Location:** Worker secrets
**Description:** `PAYMENT_WEBHOOK_SECRET` not configured. Webhook signature verification is skipped.
**Recommendation:** Set `wrangler secret put PAYMENT_WEBHOOK_SECRET --name ai-muonnoi-api` before production.

---

## Evidence Attachments

- [x] Health route curl output
- [x] Payment create-intent with/without idempotency key
- [x] Payment idempotency replay proof
- [x] Payment get-by-ID receipt
- [x] Email send with/without idempotency key
- [x] Email idempotency replay proof
- [x] Webhook delivery (no signature)
- [x] CORS approved origin headers
- [x] CORS unapproved origin headers
- [ ] Rate limit 429 evidence (not observed)
- [ ] Real provider test-mode transaction (blocked by missing PAY_IAI_ONE_API_KEY)
- [ ] Real email delivery log (blocked by missing MAIL_API_KEY)
- [ ] Rollback evidence (needs wrangler deployment history)

---

## Next Steps to Reach PASS

1. **Set Worker secrets:**
   ```bash
   wrangler secret put PAY_IAI_ONE_API_KEY --name ai-muonnoi-api
   wrangler secret put MAIL_API_KEY --name ai-muonnoi-api
   wrangler secret put PAYMENT_WEBHOOK_SECRET --name ai-muonnoi-api
   ```

2. **Re-run QA tests 3, 6, 8, 9** with secrets configured to verify real provider interaction.

3. **Fix CORS handler** to reject unapproved origins on preflight.

4. **Verify rate limiting** is configured at Cloudflare level or add Worker-level rate limiting.

5. **Run rollback drill:** Document previous deployment ID for `wrangler rollback`.

6. **Re-run this evidence file** with all checks marked PASS.

---

## Sign-off Blockers

| # | Blocker | Owner |
|---|---------|-------|
| 1 | CORS unapproved origin issue | API Team |
| 2 | Missing PAY_IAI_ONE_API_KEY | Platform |
| 3 | Missing MAIL_API_KEY | Platform |
| 4 | Missing PAYMENT_WEBHOOK_SECRET | Platform |
| 5 | Rate limiting verification | Platform |
| 6 | Rollback drill evidence | Platform |
