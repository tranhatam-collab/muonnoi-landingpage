# MUONNOI API Deployment Evidence · 2026-05-13

## Deployment Status: DEPLOYED — PAYMENT_EMAIL_INFRA_LIVE

Updated: 2026-05-13

---

### API Endpoints — Deployed

| Endpoint | Status | Notes |
|---|---|---|
| GET /api/health | ✅ LIVE — `{"ok":true,"service":"ai-muonnoi-api"}` | Verified 2026-05-13 |
| POST /api/payment/create-intent | ✅ LIVE — returns `{"ok":true,"data":{"status":"pending"}}` | Verified 2026-05-13 |
| POST /api/webhook/payment | ✅ LIVE — HMAC-SHA256 signature gate + replay guard via event_id | Deployed 2026-05-13 |
| GET /api/payment/:id | ✅ LIVE | Deployed 2026-05-13 |
| POST /api/email/send | ✅ LIVE — routes via mail.iai.one when MAIL_API_KEY set | Deployed 2026-05-13 |
| GET /api/email/:id | ✅ LIVE | Deployed 2026-05-13 |

All mutations require `Idempotency-Key` header (enforced at application layer).  
Sensitive fields redacted from logs. Failure responses use safe machine codes.

### Database

- D1 database: `iai-flow-db` (`3ceac8b1-1c0f-47c3-ad05-2b9da0983c32`)
- Migration `0008_payment_email.sql` applied 2026-05-13:
  - `payment_intents` — tracks checkout sessions + pay.iai.one provider refs
  - `payment_webhook_log` — replay-protected event audit trail
  - `email_deliveries` — idempotent send tracking per delivery

### Provider Credentials (Secrets Required)

| Secret | Status |
|---|---|
| PAY_IAI_ONE_API_KEY | ⚠️ NOT SET — request from Team Pay (tenant: `muonnoi`, site: `muonnoi`) |
| PAYMENT_WEBHOOK_SECRET | ⚠️ NOT SET — `openssl rand -hex 32` + `wrangler secret put PAYMENT_WEBHOOK_SECRET --name ai-muonnoi-api` |
| MAIL_API_KEY | ⚠️ NOT SET — source from mail.iai.one workspace or IAI VPS `/opt/iai-mail-api/.env` |

### Deployment Record

- Worker name: `ai-muonnoi-api`
- Version ID: `adf57744-b085-4321-aa96-d72b8ddcb606`
- Custom domain: `api.muonnoi.org`
- CORS origins: `https://app.muonnoi.org`, `https://www.muonnoi.org`, `https://muonnoi.org`
- Deployed: 2026-05-13
- Rollback: `wrangler rollback --name ai-muonnoi-api` or re-deploy via Cloudflare dashboard

### Payment Routing

- Gateway: `pay.iai.one` (canonical IAI gateway)
- Provider: `payos` (VietQR / PayOS)
- Tenant: `muonnoi` / site: `muonnoi`
- Callback: `https://api.muonnoi.org/api/webhook/payment`
- Success redirect: `https://www.muonnoi.org/`

### Gate Status

**INFRA_DEPLOYED — SECRETS_REQUIRED**

Endpoints live. Migration applied. Build verified.  
Gate blockers remaining:
1. `PAY_IAI_ONE_API_KEY` → Team Pay must provision for muonnoi tenant
2. `PAYMENT_WEBHOOK_SECRET` → generate and push to Worker
3. `MAIL_API_KEY` → source from IAI infrastructure

Verify after secrets set:
```bash
bash scripts/verify-payment-email-gate.sh
```
