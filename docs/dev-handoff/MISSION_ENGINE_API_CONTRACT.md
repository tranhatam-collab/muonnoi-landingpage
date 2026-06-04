# MISSION ENGINE API CONTRACT

Base target:
- `api.muonnoi.org`

Required endpoints:
- `GET /api/mobile/quests`
- `GET /api/mobile/quests/{questId}`
- `POST /api/mobile/quests/{questId}/join`
- `POST /api/mobile/proofs`
- `GET /api/mobile/proofs/{proofId}`
- `POST /api/mobile/push/register`

Rules:
- idempotent mutations where possible
- explicit status fields
- no silent location capture
- audit log for proof review
