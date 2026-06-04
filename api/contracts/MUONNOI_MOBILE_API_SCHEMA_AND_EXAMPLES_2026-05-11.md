# Muonnoi Mobile API Schema And Examples

Date: 2026-05-11
Scope: Contract-first mobile API for Life Quest OS.

## Contract rules

- All mutation requests must include `idempotencyKey`.
- All list endpoints use cursor pagination.
- All timestamps are ISO 8601 UTC.
- All state fields are explicit enums.
- All errors return a machine code and human-safe message.

## Common response envelope

```json
{
  "ok": true,
  "data": {},
  "meta": {
    "requestId": "req_01",
    "serverTime": "2026-05-11T00:00:00.000Z"
  }
}
```

## Common error envelope

```json
{
  "ok": false,
  "error": {
    "code": "PROOF_UPLOAD_FAILED",
    "message": "Không thể gửi bằng chứng lúc này.",
    "retryable": true
  },
  "meta": {
    "requestId": "req_01"
  }
}
```

## Quest list

`GET /api/mobile/quests?module=dulich&cursor=cur_01&limit=20`

```json
{
  "ok": true,
  "data": {
    "items": [
      {
        "id": "quest_dalat_001",
        "module": "dulich",
        "title": "Đến một con đường ít người biết",
        "status": "open",
        "difficulty": "easy",
        "proofTypes": ["text", "photo", "location"],
        "estimatedMinutes": 45
      }
    ],
    "page": {
      "nextCursor": "cur_02",
      "hasMore": true
    }
  }
}
```

## Join quest

`POST /api/mobile/quests/{questId}/join`

```json
{
  "idempotencyKey": "idem_quest_join_001"
}
```

Response:

```json
{
  "ok": true,
  "data": {
    "questId": "quest_dalat_001",
    "participationId": "part_001",
    "state": "joined"
  }
}
```

## Submit proof

`POST /api/mobile/proofs`

```json
{
  "idempotencyKey": "idem_proof_001",
  "questId": "quest_dalat_001",
  "participationId": "part_001",
  "proof": {
    "text": "Tôi đã gặp host và ghi lại câu chuyện.",
    "photoAssetIds": ["asset_001"],
    "location": {
      "lat": 11.9404,
      "lng": 108.4583,
      "accuracyMeters": 25
    }
  }
}
```

Response:

```json
{
  "ok": true,
  "data": {
    "proofId": "proof_001",
    "state": "submitted",
    "reviewState": "ai_pre_review_pending"
  }
}
```

## Proof states

Allowed:
- `draft`
- `queued`
- `submitted`
- `ai_pre_review_pending`
- `validation_pending`
- `accepted`
- `rejected`
- `needs_more_info`

## Notification registration

`POST /api/mobile/push/register`

```json
{
  "idempotencyKey": "idem_push_001",
  "platform": "ios",
  "token": "push_token",
  "deviceId": "device_001"
}
```

Rule:
- Registration must be idempotent per user, platform and device.

