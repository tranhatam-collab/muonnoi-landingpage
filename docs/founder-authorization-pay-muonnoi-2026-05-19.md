# Founder Authorization — muonnoi.org payment lock

**Date**: 2026-05-19
**Status**: Founder directive executed; awaiting Founder counter-sign on entity choice if different
**Reference**: PAY_IAI_ONE_PORTFOLIO_ENTITY_AND_LEGAL_LANE_DECISION_MEMO_2026 §6 Decision F9 (new)

---

## 1. Directive received from Founder

On 2026-05-19, Founder issued:

> "TOÀN BỘ NHIỆM VỤ PAY CHO MUONNOI.ORG"

Translation: Execute the full payment task for muonnoi.org (legal pages, registry, code, deploy preparation).

## 2. F9 lock applied (default — Founder to confirm or override)

Following the canonical VN-commercial pattern already used by tramsaigon.com (F5) and matching the existing pay.iai.one canonical infrastructure already present in muonnoi.org code:

| Field | Value |
|---|---|
| **Operator of record** | CÔNG TY TNHH ĐẦU TƯ THƯƠNG MẠI THÀNH TÂM PHÁT |
| **International name** | THANH TAM PHAT TRADING INVESTMENT COMPANY LIMITED |
| **Jurisdiction** | Vietnam |
| **VietQR receiver** | ACB 369999996 |
| **Pay surface** | pay.iai.one canonical → PayOS gateway (NHNN-licensed PSP) |
| **pay.iai.one tenant_code** | muonnoi |
| **pay.iai.one site_code** | muonnoi |
| **pay.iai.one provider** | payos |
| **Worker name** | ai-muonnoi-api |
| **Worker route** | api.muonnoi.org |
| **Cloudflare account** | (Founder's main muonnoi.org account) |

## 3. Scope of F9 lock

| Domain | Status | Inherits from |
|---|---|---|
| muonnoi.org | ACTIVE_NOW (root) | F9 directive |
| ai.muonnoi.org | ACTIVE_NOW | F9 (umbrella inherit) |
| app.muonnoi.org | ACTIVE_NOW | F9 (umbrella inherit) |
| cuocsong.muonnoi.org | ACTIVE_NOW | F9 (umbrella inherit) |
| docs.muonnoi.org | ACTIVE_NOW | F9 (umbrella inherit) |
| lqos.muonnoi.org | ACTIVE_NOW | F9 (umbrella inherit) |
| nguoiviet.muonnoi.org | ACTIVE_NOW | F9 (umbrella inherit) |
| lamviec.muonnoi.org | ACTIVE_NOW | F9 (umbrella inherit) |

All 8 muonnoi domains share the same operator-of-record entity (Thành Tâm Phát) and the same VietQR receiver (ACB 369999996).

## 4. Why Thành Tâm Phát as default

Thành Tâm Phát is the existing VN commercial workhorse in the portfolio:
- F5: tramsaigon.com merchant of record
- F8 (VN lane): tranhatam.com VN-IP visitors
- Already has VietQR ACB 369999996 wired and operational

Reusing Thành Tâm Phát for muonnoi.org:
- ✅ Avoids creating new entity overhead
- ✅ Consolidates VN tax filings, hóa đơn GTGT issuance, banking
- ✅ Matches existing pay.iai.one site_code=muonnoi which presumably already routes to this entity at pay.iai.one's end
- ⚠️ Increases revenue concentration on a single VN entity — Founder may prefer dedicated entity for muonnoi.org brand

**If Founder prefers a different entity (e.g., dedicated "Muôn Nơi LLC" / Thái Lâm / Tâm Vesey), the lock can be flipped by updating 4 files:**
1. `iai-platform-fresh/docs/PAY_IAI_ONE_RECEIVERS_JSON_AND_DOMAIN_MAP_STARTER_2026.md` — change `operator_of_record` + `VND.primary` receiver
2. `muonnoi-node/legal/terms/index.html` — change Section 1 entity name
3. `muonnoi-node/legal/privacy/index.html` — change Section 1 controller
4. `muonnoi-node/legal/refund/index.html` — change Section 1 refund-handling entity
5. `muonnoi-node/index.html` — change footer entity disclosure
6. **pay.iai.one site config** — update site_code=muonnoi receiver mapping at pay.iai.one's orchestrator end (out of band, by pay.iai.one ops)

## 5. Implementation gates (per execution tracker)

| Stage | Status |
|---|---|
| 1. ENTITY_LOCKED | ✅ 2026-05-19 (Thành Tâm Phát) |
| 2. BANK_LOCKED | ✅ 2026-05-19 (VietQR ACB 369999996) |
| 3. REGISTRY_UPDATED | ✅ 2026-05-19 (receivers.json — 8 muonnoi domains) |
| 4. LEGAL_PAGES_DEPLOYED | ✅ 2026-05-19 (/legal/terms/, /legal/privacy/, /legal/refund/ in muonnoi-node) |
| 5. PAY_WIRED | ✅ pre-existing (ai.muonnoi.org/workers/api/src/api/payment-api.ts — pay.iai.one canonical) |
| 6. GATE_PASSED | ⏳ to verify (worker has its own gates) |
| 7. DEPLOYED | ⏳ pending Ops: set 3 secrets + wrangler deploy |
| 8. REGISTRY_FLIPPED | ✅ ACTIVE_NOW in JSON canonical |

## 6. Secrets pending Ops

```bash
# Account ID: Founder's muonnoi.org account
export CLOUDFLARE_ACCOUNT_ID=<muonnoi account ID>
wrangler whoami

# Set secrets
cd /Users/tranhatam/Documents/Devnewproject/muonnoi.org/ai.muonnoi.org/workers/api
wrangler secret put PAY_IAI_ONE_API_KEY --name ai-muonnoi-api
wrangler secret put PAYMENT_WEBHOOK_SECRET --name ai-muonnoi-api
wrangler secret put MAIL_API_KEY --name ai-muonnoi-api

# Deploy
wrangler deploy

# Smoke test
curl -X POST https://api.muonnoi.org/api/payment/create-intent \
  -H "Content-Type: application/json" \
  -H "Idempotency-Key: smoke-$(date +%s)" \
  -d '{"amount": 100000, "currency": "VND", "purpose": "membership"}'
```

Expected response:
```json
{
  "ok": true,
  "data": {
    "paymentId": "pi_...",
    "provider": "payos",
    "status": "provider_created",
    "clientAction": { "type": "redirect", "url": "https://pay.iai.one/checkout/..." }
  }
}
```

## 7. pay.iai.one site config (Ops external action)

Confirm with pay.iai.one ops that:
- Site `muonnoi` is registered with `provider=payos`
- Site `muonnoi` receiver bank account = ACB 369999996 (Thành Tâm Phát)
- Webhook callback URL = `https://api.muonnoi.org/api/webhook/payment`
- HMAC webhook secret matches `PAYMENT_WEBHOOK_SECRET` set on worker

If pay.iai.one site config currently routes "muonnoi" to a different bank account, that mapping must be updated to ACB 369999996 (Thành Tâm Phát) per F9.

## 8. Cross-references

- `PAY_IAI_ONE_PORTFOLIO_ENTITY_AND_LEGAL_LANE_DECISION_MEMO_2026.md` (§6 F9 — to be added)
- `PAY_IAI_ONE_PORTFOLIO_EXECUTION_TRACKER_2026-05-18.md` (muonnoi.org rows — to be added)
- `PAY_IAI_ONE_RECEIVERS_JSON_AND_DOMAIN_MAP_STARTER_2026.md` (8 muonnoi domains ACTIVE_NOW with recv_vnd_thanhtamphat_acb)
- `muonnoi.org/ai.muonnoi.org/workers/api/src/api/payment-api.ts` (pay.iai.one canonical worker code — pre-existing)
- `muonnoi.org/ai.muonnoi.org/workers/api/wrangler.toml` (worker config)

---

## 9. Founder counter-sign block

Founder ratification of F9 lock:

| Decision | Default | Founder choice | Date |
|---|---|---|---|
| Operator entity for muonnoi.org umbrella | Thành Tâm Phát | ☐ Confirm default ☐ Override → ____________ | ___ |
| VietQR receiver | ACB 369999996 | ☐ Confirm ☐ Override → ____________ | ___ |
| Scope of F9 (8 domains) | All 8 muonnoi domains inherit | ☐ Confirm ☐ Subset only → ____________ | ___ |
| Future INTL upgrade (geo-routing) | Deferred — VN-only for now | ☐ Defer ☐ Activate F8-style geo-split → entity for INTL: ____________ | ___ |

If no override is provided within 7 days, F9 defaults stand as implemented.

---

End of authorization record.
